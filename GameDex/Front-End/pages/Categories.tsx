import React, { useCallback, useEffect, useState } from 'react'
import { Ionicons } from '@expo/vector-icons'
import {
  ScrollView,
  StyleSheet,
  Text,
  ImageBackground,
  View,
  TouchableOpacity,
  TextInput,
  RefreshControl
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { usePlatformContext } from '../context/PlatformContext'
import { Game } from '../types/types'
import { useNavigation } from '@react-navigation/native'
import {
  getAllGamesAlphabeticalSortedbyPlatform,
  getAllGamesReleaseDateSortedbyPlatform,
  getAllGamesAlphabeticalSortedbyCategoryAndPlatform,
  getAllGamesReleaseDateSortedbyCategoryAndPlatform,
  getAllGamesRelevanceSortedbyPlatform,
  getAllGamesRelevanceSortedbyCategoryAndPlatform
} from '../services/api/games/requests'
import { useUserContext } from '../context/UserContext'

const categories = [
  'all',
  'mmorpg',
  'shooter',
  'strategy',
  'moba',
  'racing',
  'sports',
  'social',
  'sandbox',
  'open-world',
  'survival',
  'pvp',
  'pve',
  'pixel',
  'voxel',
  'zombie',
  'turn-based',
  'first-person',
  'third-Person',
  'top-down',
  'tank',
  'space',
  'sailing',
  'side-scroller',
  'superhero',
  'permadeath',
  'card',
  'battle-royale',
  'mmo',
  'mmofps',
  'mmotps',
  '3d',
  '2d',
  'anime',
  'fantasy',
  'sci-fi',
  'fighting',
  'action-rpg',
  'action',
  'military',
  'martial-arts',
  'flight',
  'low-spec',
  'tower-defense',
  'horror',
  'mmorts'
]

export default function Categories() {
  const { platform } = usePlatformContext()
  const navigation = useNavigation()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSorting, setSelectedSorting] = useState('Alphabetical')
  const [searchQuery, setSearchQuery] = useState('')
  const [games, setGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([])
  const [favoriteGames, setFavoriteGames] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const { user } = useUserContext()

  const fetchGames = async () => {
    try {
      let gamesData
      if (selectedCategory === 'all') {
        if (selectedSorting === 'Alphabetical') {
          gamesData = await getAllGamesAlphabeticalSortedbyPlatform(platform)
        } else if (selectedSorting === 'Release Date') {
          gamesData = await getAllGamesReleaseDateSortedbyPlatform(platform)
        } else if (selectedSorting === 'Relevance') {
          gamesData = await getAllGamesRelevanceSortedbyPlatform(selectedCategory)
        }
      } else {
        if (selectedSorting === 'Alphabetical') {
          gamesData = await getAllGamesAlphabeticalSortedbyCategoryAndPlatform(selectedCategory, platform)
        } else if (selectedSorting === 'Release Date') {
          gamesData = await getAllGamesReleaseDateSortedbyCategoryAndPlatform(selectedCategory, platform)
        } else if (selectedSorting === 'Relevance') {
          gamesData = await getAllGamesRelevanceSortedbyCategoryAndPlatform(selectedCategory, platform)
        }
      }
      setGames(gamesData)
      setFilteredGames(gamesData)
    } catch (error) {
      console.error('Error fetching games:', error)
    }
  }

  useEffect(() => {
    fetchGames()
  }, [selectedCategory, selectedSorting, platform])

  const fetchUserFavoriteGames = async () => {
    try {
      const response = await fetch(`http://172.16.27.166:4444/api/favorite/${user.id}`)
      if (response.ok) {
        const data = await response.json()
        setFavoriteGames(data.favoriteGames || [])
      } else {
        console.error('Failed to fetch user favorite games')
      }
    } catch (error) {
      console.error('Error fetching user favorite games:', error)
    }
  }

  useEffect(() => {
    fetchUserFavoriteGames()
  }, [user.id])

  useEffect(() => {
    const filtered = games.filter((game) => game.title.toLowerCase().includes(searchQuery.toLowerCase()))
    setFilteredGames(filtered)
  }, [searchQuery, games])

  const getPlatformIcon = (gamePlatform: string, gameId: number) => {
    if (gamePlatform === 'PC (Windows)') {
      return (
        <View style={styles.platformIcons}>
          <Ionicons name="desktop-outline" size={24} color="white" />
          <TouchableOpacity onPress={() => handleFavoriteGame(gameId)}>
            <Ionicons
              name={isGameFavorite(gameId) ? 'star' : 'star-outline'}
              size={24}
              color={'yellow'}
              style={styles.star}
            />
          </TouchableOpacity>
        </View>
      )
    } else if (gamePlatform === 'Web Browser') {
      return (
        <View style={styles.platformIcons}>
          <Ionicons name="globe-outline" size={24} color="white" />
          <TouchableOpacity onPress={() => handleFavoriteGame(gameId)}>
            <Ionicons
              name={isGameFavorite(gameId) ? 'star' : 'star-outline'}
              size={24}
              color={'yellow'}
              style={styles.star}
            />
          </TouchableOpacity>
        </View>
      )
    } else if (gamePlatform === 'PC (Windows), Web Browser') {
      return (
        <View style={styles.platformIcons}>
          <Ionicons name="desktop-outline" size={24} color="white" style={styles.Icons} />
          <Ionicons name="globe-outline" size={24} color="white" />
          <TouchableOpacity onPress={() => handleFavoriteGame(gameId)}>
            <Ionicons
              name={isGameFavorite(gameId) ? 'star' : 'star-outline'}
              size={24}
              color={'yellow'}
              style={styles.star}
            />
          </TouchableOpacity>
        </View>
      )
    } else {
      return null
    }
  }

  const isGameFavorite = (gameId: number) => {
    return favoriteGames.includes(gameId)
  }

  const handleFavoriteGame = async (gameId: number) => {
    try {
      const isFavorite = isGameFavorite(gameId)

      if (isFavorite) {
        await removeGameFromFavorites(gameId)
        setFavoriteGames((prevFavoriteGames) => prevFavoriteGames.filter((id) => id !== gameId))
      } else {
        await addGameToFavorites(gameId)
        setFavoriteGames((prevFavoriteGames) => [...prevFavoriteGames, gameId])
      }
    } catch (error) {
      console.error('Error handling favorite game:', error)
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
        setFavoriteGames((prevFavoriteGames) => [...prevFavoriteGames, gameId])
        console.log('Jeu ajouté aux favoris avec succès.')
      } else {
        console.error("Erreur lors de l'ajout du jeu aux favoris:", response.statusText)
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
        setFavoriteGames((prevFavoriteGames) => prevFavoriteGames.filter((id) => id !== gameId))
        console.log('Jeu retiré des favoris avec succès.')
      } else {
        console.error('Erreur lors du retrait du jeu des favoris:', response.statusText)
      }
    } catch (error) {
      console.error('Erreur lors du retrait du jeu des favoris:', error)
    }
  }

  const onRefresh = useCallback(() => {
    setRefreshing(true)
    fetchGames()
    fetchUserFavoriteGames()
      .then(() => setRefreshing(false))
      .catch(() => setRefreshing(false))
  }, [fetchGames])

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer2}>
        <Picker
          selectedValue={selectedSorting}
          onValueChange={(itemValue) => setSelectedSorting(itemValue)}
          style={styles.picker}
          dropdownIconColor={'white'}
        >
          <Picker.Item label="Alphabetical" value="Alphabetical" />
          <Picker.Item label="Release Date" value="Release Date" />
          <Picker.Item label="Relevance" value="Relevance" />
        </Picker>
      </View>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={selectedCategory}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          style={styles.picker}
          dropdownIconColor={'white'}
        >
          {categories.map((category, index) => (
            <Picker.Item key={index} label={category} value={category} />
          ))}
        </Picker>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search game by name"
        placeholderTextColor={'white'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <ScrollView
        contentContainerStyle={styles.gamesContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['black']} tintColor={'white'} />
        }
      >
        {filteredGames.map((game: Game) => (
          <TouchableOpacity
            key={game.id}
            activeOpacity={1}
            onPress={() => navigation.navigate('Details', { id: game.id })}
          >
            <ImageBackground style={styles.imageContainer} imageStyle={styles.image} source={{ uri: game.thumbnail }}>
              <View style={styles.gameInfo}>
                <Text style={styles.title}>{game.title}</Text>
                {getPlatformIcon(game.platform, game.id)}
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2228',
    padding: 20,
    position: 'relative'
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    right: 10,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    width: 170,
    height: 50
  },
  pickerContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 20,
    left: 10,
    zIndex: 1,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    overflow: 'hidden',
    width: 170,
    height: 50
  },
  picker: {
    color: 'white',
    width: 170,
    height: 50,
    backgroundColor: '#1F2228'
  },
  searchInput: {
    color: 'white',
    backgroundColor: '#1F2228',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginTop: 80,
    marginBottom: 20
  },
  gamesContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  imageContainer: {
    height: 200,
    width: 300,
    marginBottom: 50,
    borderRadius: 20,
    overflow: 'hidden'
  },
  image: {
    flex: 1,
    objectFit: 'fill'
  },
  title: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  platformIcons: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  Icons: {
    marginRight: 5
  },
  star: {
    position: 'relative',
    bottom: 1,
    left: 5
  },
  short_desc: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold'
  },
  gameInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10
  }
})
