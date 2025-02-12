import { useState, useEffect, useRef } from "react";
import axios from "axios";
import TypingAnimation from "../components/TypingAnimation";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/chatbot.module.css";
import { useStyleRegistry } from "styled-jsx";

export default function Home() {
  const router = useRouter();
  const [chatInputValue, setChatInputValue] = useState("");
  const [softSkillsInputValue, setSoftSkillsInputValue] = useState("");
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredList, setFilteredList] = useState([]);
  const [selectedSoftSkill, setSelectedSoftSkill] = useState(null);
  const [softSkillPercentages, setSoftSkillPercentages] = useState({
    Autonomie: 0,
    "Esprit d'équipe": 0,
    Ponctualité: 0,
    Leadership: 0,
    Curiosité: 0,
    "Gestion des conflits": 0,
    Créativité: 0,
    Adaptabilité: 0,
  });
  const messagesEndRef = useRef(null);
  const recognition = useRef(null);
  const [isRecognitionActive, setIsRecognitionActive] = useState(false);

  useEffect(() => {
    recognition.current = new window.webkitSpeechRecognition();
    recognition.current.continuous = true;
    recognition.current.interimResults = true;
    recognition.current.lang = "fr-FR";
    recognition.current.onresult = handleSpeechRecognition;
  }, []);

  const handleSpeechRecognition = (event) => {
    let transcript = "";
    for (let i = event.resultIndex; i < event.results.length; ++i) {
      transcript += event.results[i][0].transcript;
    }
    setChatInputValue(transcript);
  };

  const toggleRecognition = () => {
    if (!isRecognitionActive) {
      recognition.current.start();
    } else {
      recognition.current.stop();
    }
    setIsRecognitionActive(!isRecognitionActive);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [chatLog]);

  useEffect(() => {
    console.log("Soft Skill Percentages:", softSkillPercentages);
  }, [softSkillPercentages]);

  useEffect(() => {
    filterItems(softSkillsInputValue);
  }, [softSkillsInputValue]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleUserResponse(chatInputValue);
    setChatInputValue("");
  };

  const sendMessagewithAnswer = async (message) => {
    const url = "/api/chat";

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [...chatLog, { role: "assistant", content: message }],
    };

    setIsLoading(true);

    try {
      const response = await axios.post(url, data);

      if (response.data.choices && response.data.choices.length > 0) {
        const assistantResponse = response.data.choices[0].message.content;

        setChatLog((prevChatLog) => [
          ...prevChatLog,
          { role: "assistant", content: assistantResponse },
        ]);
        setIsLoading(false);

        return assistantResponse;
      }
      setIsLoading(false);
      return null;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return null;
    }
  };

  const sendMessagewithoutAnswer = async (message) => {
    const url = "/api/chat";

    const data = {
      model: "gpt-3.5-turbo-0301",
      messages: [...chatLog, { role: "assistant", content: message }],
    };

    setIsLoading(true);

    try {
      const response = await axios.post(url, data);

      if (response.data.choices && response.data.choices.length > 0) {
        const assistantResponse = response.data.choices[0].message.content;

        setIsLoading(false);

        return assistantResponse;
      }
      setIsLoading(false);
      return null;
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      return null;
    }
  };

  const handleSoftSkillClick = async (softSkill) => {
    setChatLog([]);
    setIsLoading(true);
    setSelectedSoftSkill(softSkill);
    await sendMessagewithAnswer(
      `Générer moi une seule question que je pourrais poser lors d'un recrutement sur le soft skill ${softSkill}`
    );
    setIsLoading(false);
  };

  const calculatePourcentage = async (user_answer) => {
    setIsLoading(true);
    console.log(selectedSoftSkill);
    console.log(user_answer);
    const assistant_answer = await sendMessagewithoutAnswer(
      `A partir de cette réponse : ${user_answer}, donne moi un pourcentage à combien il correspond à ce soft skill : ${selectedSoftSkill}`
    );
    const pourcentage = extractPercentage(assistant_answer);
    console.log(pourcentage);
    return pourcentage;
  };

  const extractPercentage = (response) => {
    if (response) {
      const match = response.match(/(\d{1,3})%/);
      if (match) {
        return parseInt(match[1]);
      }
    }
    return null;
  };

  const filterItems = (searchTerm) => {
    const filteredItems = [
      "Autonomie",
      "Esprit d'équipe",
      "Ponctualité",
      "Leadership",
      "Curiosité",
      "Gestion des conflits",
      "Créativité",
      "Adaptabilité",
    ].filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()));
    setFilteredList(filteredItems);
  };

  const calculateAverage = (currentPercentage, softSkill) => {
    setSoftSkillPercentages((prevState) => {
      const prevPercentage = parseFloat(prevState[softSkill]) || 0;
      let count;
      if (prevPercentage === 0) {
        count = 1;
      } else {
        count = 2;
      }
      const total = prevPercentage + currentPercentage;
      const average = total / count;
      console.log("Prev Percentage:", prevPercentage);
      console.log("Total:", total);
      console.log("Average:", average);

      return {
        ...prevState,
        [softSkill]: average,
      };
    });
  };

  const handleUserResponse = async (userResponse) => {
    setIsLoading(true);
    setChatLog((prevChatLog) => [
      ...prevChatLog,
      { role: "user", content: userResponse },
    ]);

    let percentage = await calculatePourcentage(userResponse);

    if (percentage !== null && selectedSoftSkill !== null) {
      calculateAverage(percentage, selectedSoftSkill);
      await sendNextQuestion();
    } else if (percentage === null) {
      let percentage = await calculatePourcentage(userResponse);
      calculateAverage(percentage, selectedSoftSkill);
      await sendNextQuestion();
    }
    setIsLoading(false);
    console.log();
  };

  const sendNextQuestion = async () => {
    await sendMessagewithAnswer(
      `Genere moi une seule question différente que je pourrais poser lors d'un entretien sur le soft skill : ${selectedSoftSkill}`
    );
  };

  const handleSeeResultsClick = () => {
    const percentages = Object.values(softSkillPercentages);
    const queryParams = percentages.join(",");
    router.push(`/results?percentages=${queryParams}`);
  };

  return (
    <div className={styles.main}>
      <div className={styles.filterBlock}>
        <div className={styles.searchBar}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search a Soft Skill"
            value={softSkillsInputValue}
            onChange={(e) => setSoftSkillsInputValue(e.target.value)}
          />
          <div className={styles.searchIcon}>
            <img alt="" src="loupe_icon.svg" />
          </div>
        </div>

        <div className={styles.filterList}>
          {filteredList.map((item, index) => (
            <div
              key={index}
              className={styles.filterItem}
              onClick={() => handleSoftSkillClick(`${item}`)}
            >
              {item}
            </div>
          ))}
          <button
            className={styles.result_button}
            onClick={handleSeeResultsClick}
          >
            <a className={styles.result_link} href="./results">
              Voir les résultats
            </a>
          </button>
        </div>
      </div>

      <div className={styles.chatBlock}>
        <Link href="/">
          <img alt="logo" src="logo.png" />
        </Link>
        <div className={styles.chatDisplay}>
          {chatLog.map((message, index) => (
            <div
              key={index}
              className={`${styles.chatMessage} ${
                message.role === "user"
                  ? styles.userMessage
                  : styles.assistantMessage
              }`}
            >
              {message.content}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className={styles.chatInputForm}>
          <input
            type="text"
            value={chatInputValue}
            onChange={(e) => setChatInputValue(e.target.value)}
            className={styles.chatInput}
            placeholder="Tapez votre message ici..."
          />
          <style>
            {`
                    ::placeholder { 
                        color: white;
                    }`}
          </style>
          <button type="submit" className={styles.sendButton}>
            <img alt="" src="Vector.svg"></img>
          </button>
          <button
            className={styles.button2}
            type="button"
            onClick={toggleRecognition}
          >
            <img
              src={isRecognitionActive ? "micro-off.svg" : "micro.svg"}
              alt="Microphone"
            />
          </button>
        </form>

        {isLoading && <TypingAnimation />}
      </div>
    </div>
  );
}
