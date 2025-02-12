import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, RefreshControl, Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { getGamebyId } from '../services/api/games/requests'
import { useUserContext } from '../context/UserContext'

export default function FavoriteGames({ navigation }: any) {
  const { user } = useUserContext()
  const [favoriteGameIds, setFavoriteGameIds] = useState([])
  const [favoriteGames, setFavoriteGames] = useState([])
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchUserFavoritesGames(user.id)
  }, [user.id])

  const fetchUserFavoritesGames = async (userId: number) => {
    try {
      const response = await fetch(`http://172.16.27.166:4444/api/favorite/${userId}`)
      if (response.ok) {
        const data = await response.json()
        setFavoriteGameIds(data.favoriteGames || [])
      } else {
        console.error('Failed to fetch user favorite games')
      }
    } catch (error) {
      console.error('Error fetching user favorite games:', error)
    }
  }

  useEffect(() => {
    const fetchFavoriteGamesDetails = async () => {
      try {
        const favoriteGamesDetails = await Promise.all(
          favoriteGameIds.map(async (gameId: number) => {
            try {
              const gameDetails = await getGamebyId(gameId)
              return gameDetails
            } catch (error) {
              console.error(`Failed to fetch game details for game ID ${gameId}`)
              return null
            }
          })
        )

        const filteredFavoriteGames = favoriteGamesDetails.filter((game) => game !== null)
        setFavoriteGames(filteredFavoriteGames)
      } catch (error) {
        console.error('Error fetching favorite games details:', error)
      } finally {
        setRefreshing(false)
      }
    }

    fetchFavoriteGamesDetails()
  }, [favoriteGameIds])

  const onRefresh = async () => {
    setRefreshing(true)
    await fetchUserFavoritesGames(user.id)
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
        setFavoriteGames(favoriteGames.filter((game) => game.id !== gameId))
        console.log('Jeu retiré des favoris avec succès.')
      } else {
        console.error('Erreur lors du retrait du jeu des favoris:', response.statusText)
      }
    } catch (error) {
      console.error('Erreur lors du retrait du jeu des favoris:', error)
    }
  }

  const renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity onPress={() => navigation.navigate('Details', { id: item.id })}>
        <View style={styles.item}>
          <Image source={{ uri: item.thumbnail }} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
          <TouchableOpacity onPress={() => removeGameFromFavorites(item.id)}>
            <Ionicons name="star" color="yellow" size={24} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
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
          <Text style={styles.textHeader1}>Jeux</Text>
          <View style={styles.search}>
            <Text style={styles.textHeader2}>Favoris</Text>
            <Ionicons style={styles.searchIcon} name="search" color="#393F4B" size={30} />
          </View>
        </View>
      </View>
      <FlatList
        data={favoriteGames}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} progressBackgroundColor="white" />
        }
        ListEmptyComponent={
          <View style={styles.noFavoriteGames}>
            <Text style={styles.noFavoriteGamesText}>Aucun jeu n'a été mis en favori.</Text>
          </View>
        }
      />
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
    marginTop: 50,
    marginLeft: 20
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
    left: 212
  },
  textHeader2: {
    fontSize: 30,
    color: 'white'
  },
  item: {
    backgroundColor: '#333',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    marginLeft: 10
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  noFavoriteGames: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  noFavoriteGamesText: {
    fontSize: 16,
    color: 'white',
    marginTop: 150
  }
})
