from flask import Flask, render_template, request, jsonify
import os
import uuid
import requests
import json
from azure.cognitiveservices.vision.computervision import ComputerVisionClient
from msrest.authentication import CognitiveServicesCredentials
import azure.cognitiveservices.speech as speechsdk
from azure.ai.textanalytics import TextAnalyticsClient
from azure.core.credentials import AzureKeyCredential

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'static/uploads/'


subscription_key = 'c92d93d7038643c1bc0d8ceb6e131931'
endpoint = 'https://etna.cognitiveservices.azure.com/'


computervision_client = ComputerVisionClient(
    endpoint, CognitiveServicesCredentials(subscription_key))


speech_key = 'eba0e51b88384a599942377ff419c871'
speech_region = 'westeurope'


text_analytics_key = '7d3e30538ce14cec81cbaa3a2cff1354'
text_analytics_endpoint = 'https://analysetextetna.cognitiveservices.azure.com/'


text_analytics_client = TextAnalyticsClient(
    endpoint=text_analytics_endpoint,
    credential=AzureKeyCredential(text_analytics_key)
)


translator_key = '757cc74cb0d9478eb0f59feab6172ab4'
translator_endpoint = 'https://api.cognitive.microsofttranslator.com'
translator_location = 'francecentral'


@app.route('/')
def index():
    return render_template('form.html')


@app.route('/submit', methods=['POST'])
def submit():
    if 'image' not in request.files:
        return jsonify({'error': 'Aucune image fournie'}), 400

    image = request.files['image']
    if image.filename == '':
        return jsonify({'error': 'Aucune image fournie'}), 400

    if not (image.mimetype == 'image/jpeg' or image.mimetype == 'image/png'):
        return jsonify({'error': 'Veuillez choisir une image avec un format correct (JPG ou PNG)'}), 400

    image_path = os.path.join(app.config['UPLOAD_FOLDER'], image.filename)
    image.save(image_path)

    data = {
        "text": request.form['text'],
        "limit": int(request.form['number'])
    }

    people_detected = detect_people(image_path)
    data['people_detected'] = people_detected

    if people_detected > data['limit']:
        language = detect_language(data['text'])
        print(f"Detected language: {language}")

        if language == 'fr':

            english_text = translate_text(data['text'], 'en')
            print(f"Original French text: {data['text']}")
            print(f"Translated English text: {english_text}")

            french_speech_file_path = generate_speech(data['text'], 'fr')
            english_speech_file_path = generate_speech(english_text, 'en')

            data['french_speech_file'] = french_speech_file_path
            data['english_speech_file'] = english_speech_file_path
        else:
            english_text = data['text']
            print(f"Text (no translation needed): {english_text}")

            french_speech_file_path = generate_speech(data['text'], 'fr')
            english_speech_file_path = generate_speech(english_text, 'en')

            data['french_speech_file'] = french_speech_file_path
            data['english_speech_file'] = english_speech_file_path

    config_file_path = 'data/config.json'
    os.makedirs(os.path.dirname(config_file_path), exist_ok=True)

    try:
        with open(config_file_path, 'w') as config_file:
            json.dump(data, config_file, indent=4)
    except Exception as e:
        print(f"Error saving config file: {e}")

    return jsonify(data)


def detect_people(image_path):
    with open(image_path, "rb") as image_stream:
        analysis = computervision_client.detect_objects_in_stream(image_stream)

    people_count = sum(
        1 for obj in analysis.objects if obj.object_property == "person")
    return people_count


def detect_language(text):
    response = text_analytics_client.detect_language(documents=[text])
    language = response[0].primary_language.iso6391_name
    return language


def translate_text(text, to_language='en'):
    try:

        path = '/translate'
        constructed_url = translator_endpoint + path
        params = {
            'api-version': '3.0',
            'to': [to_language]
        }
        headers = {
            'Ocp-Apim-Subscription-Key': translator_key,
            'Ocp-Apim-Subscription-Region': translator_location,
            'Content-type': 'application/json',
            'X-ClientTraceId': str(uuid.uuid4())
        }

        body = [{
            'text': text
        }]
        print(f"Request body for translation: {body}")

        response = requests.post(
            constructed_url, params=params, headers=headers, json=body)
        response_json = response.json()

        print(f"Translation API response: {
              json.dumps(response_json, indent=4)}")

        if 'error' in response_json:
            raise Exception(response_json['error']['message'])

        translated_text = response_json[0]['translations'][0]['text']
        print(f"Translated text: {translated_text}")
        return translated_text
    except Exception as e:
        print(f"Error in translate_text: {e}")
        return text


def generate_speech(text, language):
    audio_filename = f'static/audio/speech_{language}.wav'

    try:
        if not os.path.exists('static/audio'):
            os.makedirs('static/audio')

        speech_config = speechsdk.SpeechConfig(
            subscription=speech_key, region=speech_region)

        if language == 'fr':
            speech_config.speech_synthesis_voice_name = "fr-FR-HenriNeural"
        elif language == 'en':
            speech_config.speech_synthesis_voice_name = "en-US-JennyNeural"

        audio_config = speechsdk.audio.AudioOutputConfig(
            filename=audio_filename)

        synthesizer = speechsdk.SpeechSynthesizer(
            speech_config=speech_config, audio_config=audio_config)
        result = synthesizer.speak_text(text)

        if result.reason == speechsdk.ResultReason.SynthesizingAudioCompleted:
            print(f"Successfully synthesized the text in {language}.")
        else:
            print(f"Speech synthesis failed for {
                  language}: {result.error_details}")

        return audio_filename
    except Exception as e:
        print(f"Error in generate_speech: {e}")
        return None


if __name__ == '__main__':
    app.run(debug=True)
