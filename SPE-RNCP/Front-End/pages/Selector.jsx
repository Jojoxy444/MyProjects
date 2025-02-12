import React, { useState, useEffect, useCallback } from 'react'
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'

const Selector = ({ navigation, mode }) => {
  const [levels, setLevels] = useState([])
  const [selectedLevel, setSelectedLevel] = useState(null)
  const [subjects, setSubjects] = useState([])
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [chapters, setChapters] = useState([])
  const [selectedChapter, setSelectedChapter] = useState(null)

  useEffect(() => {
    fetch('http://192.168.1.138:4444/api/selector/niveaux')
      .then((response) => response.json())
      .then((data) => setLevels(data))
      .catch((error) => console.error('Erreur lors de la récupération des niveaux :', error))
  }, [])

  useEffect(() => {
    if (selectedLevel) {
      fetch(`http://192.168.1.138:4444/api/selector/matieres/${selectedLevel}`)
        .then((response) => response.json())
        .then((data) => setSubjects(data))
        .catch((error) => console.error('Erreur lors de la récupération des matières :', error))
    }
  }, [selectedLevel])

  useEffect(() => {
    if (selectedLevel && selectedSubject) {
      fetch(`http://192.168.1.138:4444/api/selector/chapitres/${selectedLevel}/${selectedSubject}`)
        .then((response) => response.json())
        .then((data) => setChapters(data))
        .catch((error) => console.error('Erreur lors de la récupération des chapitres :', error))
    }
  }, [selectedLevel, selectedSubject])

  useFocusEffect(
    useCallback(() => {
      setSelectedLevel(null)
      setSelectedSubject(null)
      setSelectedChapter(null)
    }, [])
  )

  const handleLevelSelection = (level) => {
    setSelectedLevel(level)
    setSelectedSubject(null)
    setSelectedChapter(null)
  }

  const handleSubjectSelection = (subject) => {
    setSelectedSubject(subject)
    setSelectedChapter(null)
  }

  const handleChapterSelection = (chapter) => {
    setSelectedChapter(chapter)

    if (mode === 'Cours') {
      navigation.navigate('Cours', { level: selectedLevel, subject: selectedSubject, chapter })
    } else if (mode === 'Exercice') {
      navigation.navigate('Exercice', { level: selectedLevel, subject: selectedSubject, chapter })
    }
  }

  const handleBackToLevel = () => {
    setSelectedSubject(null)
    setSelectedChapter(null)
  }

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {/* Sélection du niveau */}
        {!selectedLevel && (
          <View style={styles.section}>
            <Text style={styles.title}>Choisissez un niveau :</Text>
            <FlatList
              data={levels}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => handleLevelSelection(item)}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}

        {/* Sélection de la matière */}
        {selectedLevel && !selectedSubject && (
          <View style={styles.section}>
            <Text style={styles.title}>Choisissez une matière pour le niveau {selectedLevel} :</Text>
            <FlatList
              data={subjects}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => handleSubjectSelection(item)}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedLevel(null)}>
              <Text style={styles.backButtonText}>Retour au niveau</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Sélection du chapitre */}
        {selectedLevel && selectedSubject && !selectedChapter && (
          <View style={styles.section}>
            <Text style={styles.title}>
              Choisissez un chapitre en {selectedSubject} pour le niveau {selectedLevel} :
            </Text>
            <FlatList
              data={chapters}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.item} onPress={() => handleChapterSelection(item)}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.backButton} onPress={handleBackToLevel}>
              <Text style={styles.backButtonText}>Retour à la matière</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  section: {
    maxHeight: '100%',
    width: '100%',
    justifyContent: 'center',
    marginVertical: 10,
    paddingHorizontal: 10
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  item: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    alignItems: 'center'
  },
  itemText: {
    fontSize: 18
  },
  backButton: {
    backgroundColor: '#d0d0d0',
    padding: 10,
    marginTop: 20,
    borderRadius: 8,
    alignItems: 'center'
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: 'bold'
  }
})

export default Selector
