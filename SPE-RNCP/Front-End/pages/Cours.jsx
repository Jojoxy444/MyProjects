import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'
import Animated, { Easing, useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { updateDailyQuestsByType } from '../services/api/updateDailyQuestsByType'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window')

const CourseScreen = ({ navigation, route }) => {
  const { level, subject, chapter } = route.params
  const [activeSlide, setActiveSlide] = useState(0)
  const [courseSlides, setCourseSlides] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const opacity = useSharedValue(0)
  const questUpdated = useRef(false)

  useEffect(() => {
    const fetchCourses = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://192.168.1.138:4444/api/cours/${level}/${subject}/${chapter}`)
        const data = await response.json()

        if (Array.isArray(data) && data.length > 0 && Array.isArray(data[0].courseSlides)) {
          const slides = data[0].courseSlides.map((slide) => ({
            id: slide.id,
            titre: slide.titre || slide.title,
            contenu: slide.contenu || slide.content,
            exemple: slide.exemple
          }))

          setCourseSlides(slides)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des cours :', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchCourses()
    opacity.value = withTiming(1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease)
    })
  }, [level, subject, chapter])

  const saveLastViewedCours = async (level, subject, chapter) => {
    const coursInfo = {
      level,
      subject,
      chapter
    }
    await AsyncStorage.setItem('lastViewedCours', JSON.stringify(coursInfo))
  }

  useEffect(() => {
    saveLastViewedCours(level, subject, chapter)
  }, [level, subject, chapter])

  const handleProgressInCourseQuest = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId')
      if (userId && !questUpdated.current) {
        await updateDailyQuestsByType(userId, 'cours', 1)
        questUpdated.current = true
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des quêtes :', error)
    }
  }

  const handleCourseCompletion = (index) => {
    if (index === courseSlides.length - 1 && !questUpdated.current) {
      handleProgressInCourseQuest()
    }
  }

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value
    }
  })

  const renderItem = ({ item }) => (
    <View style={styles.slide}>
      <View style={styles.slideContainer}>
        <Animated.Text style={[styles.title, animatedStyle]}>{item.titre}</Animated.Text>
        <Text style={styles.content}>{item.contenu}</Text>
        {item.exemple && (
          <>
            <Text style={styles.subtitle}>Exemple :</Text>
            <Text style={styles.example}>{item.exemple}</Text>
          </>
        )}
      </View>
    </View>
  )

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('SelectorPage', { mode: 'Cours' })}
      >
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>

      {isLoading ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      ) : courseSlides.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyMessage}>Aucun cours trouvé pour ce niveau et cette matière.</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={courseSlides}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={(e) => {
              const index = Math.round(e.nativeEvent.contentOffset.x / screenWidth)
              setActiveSlide(index)
              handleCourseCompletion(index)
            }}
            style={styles.flatList}
          />
          <View style={styles.pagination}>
            {courseSlides.map((_, index) => (
              <View key={index} style={[styles.dot, { backgroundColor: index === activeSlide ? '#000' : '#ccc' }]} />
            ))}
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative'
  },
  flatList: {
    flexGrow: 0
  },
  slide: {
    width: screenWidth,
    height: screenHeight - 40,
    justifyContent: 'center',
    alignItems: 'center'
  },
  slideContainer: {
    width: 370,
    height: 520,
    backgroundColor: '#E1EFE6',
    borderTopLeftRadius: 50,
    borderBottomRightRadius: 50,
    borderTopRightRadius: 5,
    borderBottomLeftRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  content: {
    fontSize: 18,
    lineHeight: 32,
    textAlign: 'center',
    marginBottom: 20,
    padding: 10
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  example: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    padding: 10
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 20
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginBottom: 10,
    alignItems: 'center'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyMessage: {
    padding: 10,
    fontSize: 20,
    color: '#888',
    textAlign: 'center'
  },
  loadingText: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center'
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 0,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5
  }
})

export default CourseScreen
