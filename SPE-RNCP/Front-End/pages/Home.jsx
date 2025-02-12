import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useFocusEffect } from '@react-navigation/native'
import { fetchDailyQuests } from '../services/api/fetchDailyQuests'

const Home = ({ navigation }) => {
  const themes = [
    { id: 1, name: 'Mathématiques', icon: 'calculator-outline' },
    { id: 2, name: 'Physique-Chimie', icon: 'flask-outline' },
    { id: 3, name: 'Français', icon: 'book-outline' },
    { id: 4, name: 'Anglais', icon: 'language-outline' }
  ]

  const [lastCourse, setLastCourse] = useState(null)
  const [lastExercise, setLastExercise] = useState(null)

  const [quests, setQuests] = useState([])
  const [userId, setUserId] = useState(null)

  const fetchUserIdAndQuests = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId')
      if (storedUserId) {
        setUserId(storedUserId)
        await fetchDailyQuests(storedUserId, setQuests)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération de l'ID utilisateur", error)
    }
  }

  const fetchLastViewedItems = async () => {
    try {
      const cours = await AsyncStorage.getItem('lastViewedCours')
      const exercice = await AsyncStorage.getItem('lastViewedExercice')

      if (cours) setLastCourse(JSON.parse(cours))
      if (exercice) setLastExercise(JSON.parse(exercice))
    } catch (error) {
      console.error('Erreur lors de la récupération du derniers cours/exercice', error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchUserIdAndQuests()
      fetchLastViewedItems()
    }, [])
  )

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Bienvenue</Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quêtes du jour</Text>
        <View style={styles.largeBox}>
          {quests.length > 0 ? (
            quests.map((quest) => (
              <View key={quest._id} style={styles.row}>
                <Text style={[styles.leftText, quest.progress >= quest.goal && styles.completedText]}>
                  {quest.name}
                </Text>
                <Text style={[styles.rightText]}>
                  {quest.progress}/{quest.goal}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.leftText}>Aucune quête disponible</Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Thèmes à venir</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
          {themes.map((theme) => (
            <View key={theme.id} style={styles.themeBox}>
              <Ionicons name={theme.icon} size={40} color="#ffffff" style={styles.icon} />
              <Text style={styles.themeText}>{theme.name}</Text>
            </View>
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dernier cours</Text>
        <TouchableOpacity
          disabled={!lastCourse}
          style={[styles.box, styles.row, !lastCourse && styles.disabledButton]}
          onPress={() => {
            navigation.navigate('SelectorCours', {
              screen: 'Cours',
              params: {
                level: lastCourse.level,
                subject: lastCourse.subject,
                chapter: lastCourse.chapter
              }
            })
          }}
        >
          <Text style={styles.leftText}>{lastCourse ? `${lastCourse.chapter}` : 'Aucun cours visualisé'}</Text>
          <Ionicons name="arrow-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dernier exercice</Text>
        <TouchableOpacity
          disabled={!lastExercise}
          style={[styles.box, styles.row, !lastExercise && styles.disabledButton]}
          onPress={() => {
            navigation.navigate('SelectorExercice', {
              screen: 'Exercice',
              params: {
                level: lastExercise.level,
                subject: lastExercise.subject,
                chapter: lastExercise.chapter
              }
            })
          }}
        >
          <Text style={styles.leftText}>{lastExercise ? `${lastExercise.chapter}` : 'Aucun exercice effectué'}</Text>
          <Ionicons name="arrow-forward" size={20} color="#333" />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
    marginTop: 30
  },
  welcome: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#4e5174'
  },
  section: {
    marginTop: 15,
    marginBottom: 25,
    overflow: 'hidden',
    borderRadius: 10
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 15,
    color: '#4e5174'
  },
  box: {
    height: 50,
    backgroundColor: '#96F7D2',
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomWidth: 5,
    borderBottomColor: '#5DDDAC',
    overflow: 'hidden'
  },
  largeBox: {
    height: 100,
    backgroundColor: '#F5B5FC',
    paddingHorizontal: 15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    justifyContent: 'center',
    borderBottomWidth: 5,
    borderBottomColor: '#DB7FE6',
    overflow: 'hidden'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4e5174'
  },
  rightText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4e5174'
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#888'
  },
  scrollContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5
  },
  themeBox: {
    borderRadius: 12,
    padding: 5,
    width: 115,
    alignItems: 'center',
    justifyContent: 'center'
  },
  themeText: {
    fontSize: 12,
    color: '#464547',
    fontWeight: 'semibold',
    marginTop: 10,
    textAlign: 'center'
  },
  icon: {
    backgroundColor: '#99DCFF',
    padding: 15,
    borderRadius: 20
  }
})

export default Home
