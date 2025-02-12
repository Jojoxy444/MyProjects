import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { addXPToUser } from '../services/api/addXPToUser'
import { updateDailyQuestsByType } from '../services/api/updateDailyQuestsByType'

const { width: screenWidth } = Dimensions.get('window')

const Exercice = ({ navigation, route }) => {
  const { level, subject, chapter } = route.params

  const [exerciceData, setExerciceData] = useState(null)
  const [selectedChoice, setSelectedChoice] = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchExercice = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://192.168.1.138:4444/api/exercices/${level}/${subject}/${chapter}`)

        if (response.ok) {
          const data = await response.json()
          if (data && Object.keys(data).length > 0) {
            setExerciceData(data)
          } else {
            setExerciceData(null)
          }
        } else {
          setExerciceData(null)
        }
      } catch (error) {
        console.error("Erreur lors de la récupération de l'exercice :", error)
        setExerciceData(null)
      } finally {
        setIsLoading(false)
      }
    }

    fetchExercice()
  }, [level, subject, chapter])

  const saveLastViewedExercice = async (level, subject, chapter) => {
    const exerciceInfo = {
      level,
      subject,
      chapter
    }
    await AsyncStorage.setItem('lastViewedExercice', JSON.stringify(exerciceInfo))
  }

  useEffect(() => {
    saveLastViewedExercice(level, subject, chapter)
  }, [level, subject, chapter])

  const handleValidation = async () => {
    if (!exerciceData) return

    const correctAnswer = exerciceData.reponse
    if (selectedChoice === correctAnswer) {
      setIsCorrect(true)

      try {
        const userId = await AsyncStorage.getItem('userId')
        if (userId) {
          await addXPToUser(userId, subject, 5)
          await updateDailyQuestsByType(userId, 'exercice', 1)
        } else {
          console.error('ID utilisateur non trouvé')
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout d'XP : ", error)
      }
    } else {
      setIsCorrect(false)
    }
  }

  const renderChoices = () => {
    if (!exerciceData || !exerciceData.choix) return null

    return exerciceData.choix.map((choice, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.choiceButton,
          selectedChoice === choice ? (isCorrect === null ? styles.selectedButton : null) : null,
          selectedChoice === choice && isCorrect === true ? styles.correctAnswer : null,
          selectedChoice === choice && isCorrect === false ? styles.wrongAnswer : null,
          choice === exerciceData.reponse && isCorrect === false ? styles.correctAnswer : null
        ]}
        onPress={() => setSelectedChoice(choice)}
        disabled={isCorrect !== null}
      >
        <Text style={styles.choiceText}>{choice}</Text>
      </TouchableOpacity>
    ))
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {isLoading ? (
        <Text style={styles.loadingText}>Chargement...</Text>
      ) : exerciceData ? (
        <>
          <Text style={styles.title}>{exerciceData.enonce}</Text>
          <View style={styles.choicesContainer}>{renderChoices()}</View>

          <TouchableOpacity
            style={styles.validateButton}
            onPress={handleValidation}
            disabled={!selectedChoice || isCorrect !== null}
          >
            <Text style={styles.buttonText}>Valider</Text>
          </TouchableOpacity>
        </>
      ) : (
        <Text style={styles.emptyMessage}>Aucun exercice trouvé pour ce niveau et cette matière</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    padding: 1
  },
  choicesContainer: {
    marginBottom: 20,
    width: screenWidth * 0.8
  },
  choiceButton: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9'
  },
  selectedButton: {
    backgroundColor: '#cce5ff',
    borderColor: '#007bff'
  },
  choiceText: {
    textAlign: 'center',
    fontSize: 16
  },
  validateButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#007BFF',
    borderRadius: 10
  },
  correctAnswer: {
    backgroundColor: '#A9F797',
    borderColor: '#8AEB74'
  },
  wrongAnswer: {
    backgroundColor: '#E95252',
    borderColor: '#DD3737'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  emptyMessage: {
    padding: 10,
    fontSize: 20,
    color: '#888',
    textAlign: 'center'
  },
  loadingText: {
    fontSize: 18,
    color: '#888'
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 0,
    zIndex: 1,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5
  }
})

export default Exercice
