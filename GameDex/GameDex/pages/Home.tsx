import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View, Image, FlatList, Dimensions, TouchableOpacity, RefreshControl } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import {
  getAllGames,
  getAllGamesReleaseDateSortedbyPlatform,
  getAllGamesbyPlatform
} from '../services/api/games/requests'
import { usePlatformContext } from '../context/PlatformContext'
import { useUserContext } from '../context/UserContext'

const { width: windowWidth, height: windowHeight } = Dimensions.get('window')

export default function Home() {
  const navigation = useNavigation()
  const { platform } = usePlatformContext()
  const { user } = useUserContext()

  const [games, setGames] = useState([])
  const [currentGameIndex, setCurrentGameIndex] = useState(0)
  const [refreshing, setRefreshing] = useState(false)
  const [favoriteGames, setFavoriteGames] = useState([])
  const [selectedTab, setSelectedTab] = useState(0)

  const popularGameIds = [474, 57, 523, 570, 23, 541, 229, 226, 286, 220]

  const getPopularGames = async () => {
    try {
      const allGames = await getAllGames()
      const popularGames = allGames.filter((game: any) => popularGameIds.includes(game.id))
      return popularGames
    } catch (error) {
      console.error('Error fetching popular games:', error)
      throw error
    }
  }

  const getRecentGames = async () => {
    try {
      return await getAllGamesReleaseDateSortedbyPlatform(platform)
    } catch (error) {
      console.error('Error fetching recent games:', error)
      throw error
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    switch (selectedTab) {
      case 0:
        getPopularGames()
          .then((data) => {
            setGames(data.slice(0, 10))
            fetchUserFavoritesGames(user.id)
            setRefreshing(false)
          })
          .catch((error) => {
            console.error('Error fetching popular games:', error)
            setRefreshing(false)
          })
        break
      case 1:
        getRecentGames()
          .then((data) => {
            setGames(data.slice(0, 10))
            fetchUserFavoritesGames(user.id)
            setRefreshing(false)
          })
          .catch((error) => {
            console.error('Error fetching recent games:', error)
            setRefreshing(false)
          })
        break
      case 2:
        getAllGamesbyPlatform(platform)
          .then((data) => {
            const shuffledGames = data.sort(() => 0.5 - Math.random())
            const selectedGames = shuffledGames.slice(0, 10)
            setGames(selectedGames)
            fetchUserFavoritesGames(user.id)
            setRefreshing(false)
          })
          .catch((error) => {
            console.error('Error fetching random games:', error)
            setRefreshing(false)
          })
        break
      default:
        setRefreshing(false)
    }
    fetchUserFavoritesGames(user.id)
  }, [platform, selectedTab])

  useEffect(() => {
    onRefresh()
  }, [onRefresh])

  const fetchUserFavoritesGames = async (userId: number) => {
    try {
      const response = await fetch(`http://172.16.27.166:4444/api/favorite/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setFavoriteGames(data.favoriteGames)
        return data.favoriteGames || []
      } else {
        return []
      }
    } catch (error) {
      console.error("Erreur lors de  récupération des favoris de l'utilisateur:", error)
      return []
    }
  }

  const handleFavoriteGame = async (gameId: number) => {
    try {
      const userFavorites = await fetchUserFavoritesGames(user.id)
      setFavoriteGames(userFavorites)

      if (userFavorites.includes(gameId)) {
        await removeGameFromFavorites(gameId)
        console.log('false')
      } else {
        await addGameToFavorites(gameId)
        console.log('true')
      }
    } catch (error) {
      console.error('Erreur lors de la gestion des favoris du jeu:', error)
    }
  }

  const addGameToFavorites = async (gameId: number) => {
    try {
      const response = await fetch('http://172.16.27.166:4444/api/favorite/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, gameId })
      })
      if (response.ok) {
        setFavoriteGames([...favoriteGames, gameId])
        console.log('Jeu ajouté aux favoris avec succès.')
      } else {
        return
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du jeu aux favoris:", error)
    }
  }

  const removeGameFromFavorites = async (gameId: number) => {
    try {
      const response = await fetch('http://172.16.27.166:4444/api/favorite/remove', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, gameId })
      })
      if (response.ok) {
        setFavoriteGames(favoriteGames.filter((id) => id !== gameId))
        console.log('Jeu retiré des favoris avec succès.')
      } else {
        console.error('Erreur lors du retrait du jeu des favoris:', response.statusText)
      }
    } catch (error) {
      console.error('Erreur lors du retrait du jeu des favoris:', error)
    }
  }

  const renderItem = useCallback(
    ({ item }: any) => {
      const isFavorite = favoriteGames.includes(item.id)
      return (
        <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('Details', { id: item.id })}>
          <View style={styles.slide}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: item.thumbnail }} style={styles.slideImage} />
              <TouchableOpacity onPress={() => handleFavoriteGame(item.id)} style={styles.star}>
                <Ionicons name={isFavorite ? 'star' : 'star-outline'} size={24} color={'yellow'} />
              </TouchableOpacity>
            </View>
            <Text style={styles.slideTitle}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      )
    },
    [navigation, favoriteGames]
  )

  const flatListOptimizationProps = {
    initialNumToRender: 0,
    maxToRenderPerBatch: 1,
    removeClippedSubviews: true,
    scrollEventThrottle: 16,
    windowSize: 2,
    keyExtractor: useCallback((item: any) => String(item.id), []),
    getItemLayout: useCallback(
      (_: any, index: number) => ({
        index,
        length: windowWidth,
        offset: index * windowWidth
      }),
      []
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.userinfo}>
          <View style={styles.userinfo}>
            {user && user.picture ? (
              <>
                <Image source={{ uri: user.picture }} style={styles.userImage} />
                <Text style={styles.welcomeTextWithImage}>Hey {user ? user.firstname : 'Utilisateur'} !</Text>
              </>
            ) : (
              <>
                <Ionicons name="person-circle-outline" size={70} color={'white'} style={styles.user_icon} />
                <Text style={styles.welcomeTextWithoutImage}>Hey {user ? user.firstname : 'Utilisateur'} !</Text>
              </>
            )}
          </View>
        </View>
        <View style={styles.subheader}>
          <Text style={styles.textHeader1}>Explorons</Text>
          <View style={styles.search}>
            <Text style={styles.textHeader2}>Jeux</Text>
            <Ionicons style={styles.searchIcon} name="search" color="#393F4B" size={30} />
          </View>
        </View>
      </View>
      <View style={styles.gameparams}>
        <TouchableOpacity onPress={() => setSelectedTab(0)}>
          <Text style={[styles.params, selectedTab === 0 && styles.selectedParams]}>Populaires</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab(1)}>
          <Text style={[styles.params, selectedTab === 1 && styles.selectedParams]}>Nouveaux</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab(2)}>
          <Text style={[styles.params, selectedTab === 2 && styles.selectedParams]}>Recommandés</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={games}
        style={styles.carousel}
        renderItem={({ item }) => renderItem({ item })}
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={(event) => {
          const slideSize = windowWidth
          const index = event.nativeEvent.contentOffset.x / slideSize
          setCurrentGameIndex(Math.round(index))
        }}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        {...flatListOptimizationProps}
      />
      <View style={styles.pagination}>
        {games.map((_, i) => (
          <View
            key={i}
            style={[
              styles.paginationDot,
              currentGameIndex === i ? styles.paginationDotActive : styles.paginationDotInactive
            ]}
          />
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2228'
  },
  header: {
    padding: 10,
    marginTop: 30,
    marginRight: 250,
    alignItems: 'center'
  },
  userinfo: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 120
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 10,
    marginLeft: 40
  },
  userImage: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 70,
    height: 70,
    borderRadius: 70,
    marginRight: 100
  },
  user_icon: {
    position: 'absolute',
    right: 105
  },
  welcomeTextWithImage: {
    fontSize: 24,
    color: 'white',
    width: 200,
    marginTop: 15,
    right: 80
  },
  welcomeTextWithoutImage: {
    fontSize: 24,
    color: 'white',
    width: 200,
    marginTop: 15,
    right: 90
  },
  subheader: {
    marginTop: 50
  },
  textHeader1: {
    fontSize: 13,
    color: '#7B8395'
  },
  search: {
    display: 'flex',
    flexDirection: 'row'
  },
  searchIcon: {
    position: 'relative',
    marginTop: 10,
    left: 250
  },
  textHeader2: {
    fontSize: 30,
    color: 'white'
  },
  gameparams: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  params: {
    color: 'white'
  },
  selectedParams: {
    borderBottomWidth: 2,
    borderColor: 'white'
  },
  carousel: {
    flex: 1,
    marginBottom: 70
  },
  imageContainer: {
    position: 'relative',
    width: 300,
    height: 200,
    borderRadius: 20,
    overflow: 'hidden'
  },
  star: {
    position: 'absolute',
    top: 10,
    right: 10
  },
  slide: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2228'
  },
  selectedSlide: {
    borderBottomWidth: 2,
    borderColor: 'white'
  },
  slideImage: {
    width: 300,
    height: 200,
    borderRadius: 20,
    objectFit: 'fill'
  },
  slideTitle: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold'
  },
  pagination: {
    position: 'absolute',
    bottom: 8,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 2,
    backgroundColor: 'gray'
  },
  paginationDotActive: {
    backgroundColor: 'white'
  },
  paginationDotInactive: {
    backgroundColor: 'gray'
  }
})
