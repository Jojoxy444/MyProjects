import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getUserById } from '../services/api/getUserById'
import { getUserXP } from '../services/api/getUserXP'
import badgeImages from '../services/utils/badgeImages'
import { useFocusEffect } from '@react-navigation/native'

const { width: screenWidth } = Dimensions.get('window')

const Profil = ({ navigation }) => {
  const [userData, setUserData] = useState(null)
  const [xpData, setXpData] = useState([])
  const [activeSlide, setActiveSlide] = useState(0)
  const flatListRef = useRef(null)

  const fetchUserData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId')
      if (!userId) return console.error('ID utilisateur introuvable')

      const [user, xp] = await Promise.all([getUserById(userId), getUserXP(userId)])

      if (user) setUserData(user)
      if (xp) setXpData(xp)
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error)
    }
  }

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData()
    }, [])
  )

  const calculateLevel = (xp) => {
    let level = 0
    let xpRequired = 5
    let totalXp = 0

    while (xp >= totalXp + xpRequired) {
      totalXp += xpRequired
      level++
      xpRequired += 5 * level
    }

    const remainder = xp - totalXp
    return { level, remainder, xpRequired }
  }

  const getRank = (level) => {
    if (level === 0) return 'fer'
    if (level <= 9) return 'bronze'
    if (level <= 19) return 'argent'
    if (level <= 39) return 'or'
    if (level <= 54) return 'platine'
    if (level <= 74) return 'diamant'
    if (level <= 99) return 'maitre'
    return 'grand_maitre'
  }

  const getBadgeImage = (subject, rank) => {
    return badgeImages[subject]?.[rank]
  }

  const handleLogout = async () => {
    await AsyncStorage.removeItem('userId')
    navigation.navigate('Login')
  }

  const renderItem = ({ item }) => {
    const { level, remainder, xpRequired } = calculateLevel(item.xp)

    return (
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Image source={item.badge} style={styles.badgeImage} resizeMode="contain" />
        </View>
        <Text style={styles.subjectName}>{item.subject}</Text>
        <Text style={styles.levelText}>Niveau {level}</Text>

        <View style={styles.progressBar}>
          <View
            style={{
              width: `${(remainder / xpRequired) * 100}%`,
              height: '100%',
              backgroundColor: '#F5A623',
              borderRadius: 5
            }}
          />
        </View>
        <Text style={styles.xpText}>
          Exp. {remainder} / {xpRequired}
        </Text>
      </View>
    )
  }

  const handlePaginationPress = (index) => {
    setActiveSlide(index)
    flatListRef.current.scrollToIndex({ index, animated: true })
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate('Settings')}>
        <Ionicons name="settings-outline" size={28} color="#4e5174" />
      </TouchableOpacity>
      <View style={styles.circleContainer}>
        <View style={styles.profileCircle}>
          <Text style={styles.profileLetter}>{userData?.firstname[0]}</Text>
        </View>
        <Text style={styles.profileName}>{userData?.firstname}</Text>
        <Text style={styles.profileEmail}>{userData?.email}</Text>
      </View>

      <FlatList
        ref={flatListRef}
        data={
          xpData.length > 0
            ? xpData.map((xp) => {
                const { level } = calculateLevel(xp.xp)
                const rank = getRank(level)
                return {
                  ...xp,
                  badge: getBadgeImage(xp.subject.toLowerCase(), rank)
                }
              })
            : [{ id: 'empty' }]
        }
        renderItem={({ item }) => {
          if (item.id === 'empty') {
            return (
              <View style={styles.emptyCard}>
                <Text style={styles.emptyText}>
                  Réussissez des exercices ou accomplissez vos quêtes quotidiennes pour gagner en niveau et obtenir des
                  récompenses
                </Text>
              </View>
            )
          }
          return renderItem({ item })
        }}
        keyExtractor={(item) => item.subject || item.id}
        horizontal={true}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        onScroll={(e) => {
          const index = Math.floor(e.nativeEvent.contentOffset.x / (screenWidth * 0.85))
          setActiveSlide(index)
        }}
        style={styles.flatList}
      />

      <View style={styles.pagination}>
        {xpData.map((_, index) => (
          <TouchableOpacity key={index} onPress={() => handlePaginationPress(index)}>
            <View style={[styles.dot, { backgroundColor: index === activeSlide ? '#000' : '#ccc' }]} />
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Déconnexion</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  settingsButton: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10
  },
  circleContainer: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40
  },
  profileCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileLetter: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold'
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10
  },
  profileEmail: {
    color: '#898989',
    fontSize: 14,
    marginTop: 5
  },
  card: {
    width: screenWidth * 0.85,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5B5FC',
    borderRadius: 15,
    marginHorizontal: 10
  },
  iconContainer: {
    marginBottom: 20
  },
  subjectName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff'
  },
  progressBar: {
    width: '80%',
    height: 15,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    marginTop: 20,
    overflow: 'hidden'
  },
  xpText: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff'
  },
  levelText: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10
  },
  emptyCard: {
    width: screenWidth * 0.85,
    height: 350,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5B5FC',
    borderRadius: 15,
    marginHorizontal: 10,
    paddingHorizontal: 20
  },
  emptyText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center'
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 30,
    alignSelf: 'center',
    width: 200
  },
  buttonText: {
    fontSize: 18,
    color: '#fff'
  },
  flatList: {
    flexGrow: 0
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
  badgeImage: {
    width: 200,
    height: 150
  }
})

export default Profil
