import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
  TouchableHighlight
} from 'react-native'
import { getGamebyId } from '../services/api/games/requests'
import { Game } from '../types/types'

export default function Details({ route }: any) {
  const { id } = route.params
  const [gameDetails, setGameDetails] = useState<Game | null>(null)
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    getGamebyId(id)
      .then((game: Game) => {
        setGameDetails(game)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching game details:', error)
        setLoading(false)
      })
  }, [id])

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      {gameDetails ? (
        <View style={styles.container}>
          <ImageBackground
            source={{ uri: gameDetails.thumbnail }}
            style={styles.thumbnail}
            imageStyle={styles.thumbnail}
          ></ImageBackground>
          <View style={styles.infoContainer}>
            <Text style={styles.requirementsTitle}>Game Informations</Text>
            <Text style={styles.infoText}>Status : {gameDetails.status}</Text>
            <Text style={styles.infoText}>Genre : {gameDetails.genre}</Text>
            <Text style={styles.infoText}>Plateforme : {gameDetails.platform}</Text>
            <Text style={styles.infoText}>Publisher : {gameDetails.publisher}</Text>
            <Text style={styles.infoText}>Developer : {gameDetails.developer}</Text>
            <Text style={styles.infoText}>Release Date : {gameDetails.release_date}</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Text style={styles.descriptionButton}>Voir la description</Text>
            </TouchableOpacity>
          </View>
          {gameDetails.minimum_system_requirements ? (
            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Minimum System Requirements</Text>
              <Text style={styles.requirementsText}>OS : {gameDetails.minimum_system_requirements.os || 'Aucun'}</Text>
              <Text style={styles.requirementsText}>
                Processor : {gameDetails.minimum_system_requirements.processor || 'Aucun'}
              </Text>
              <Text style={styles.requirementsText}>
                Memory : {gameDetails.minimum_system_requirements.memory || 'Aucun'}
              </Text>
              <Text style={styles.requirementsText}>
                Graphics : {gameDetails.minimum_system_requirements.graphics || 'Aucun'}
              </Text>
              <Text style={styles.requirementsText}>
                Storage : {gameDetails.minimum_system_requirements.storage || 'Aucun'}
              </Text>
            </View>
          ) : null}

          <Text style={styles.screenshotsTitle}>Screenshots</Text>
          <View style={styles.screenshotsContainer}>
            {gameDetails.screenshots.map((screenshot, index) => (
              <Image key={index} source={{ uri: screenshot.image }} style={styles.screenshot} />
            ))}
          </View>
          <TouchableOpacity onPress={() => Linking.openURL(gameDetails.game_url)}>
            <Text style={styles.gameLinkText}>Voir la page officielle du jeu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text style={styles.text}>Aucun détail trouvé pour cet ID de jeu.</Text>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible)
        }}
      >
        <ScrollView style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalDescription}>{gameDetails?.description}</Text>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: '#2196F3' }}
              onPress={() => {
                setModalVisible(!modalVisible)
              }}
            >
              <Text style={styles.textStyle}>Fermer</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#1F2228',
    alignItems: 'center',
    paddingVertical: 20
  },
  container: {
    alignItems: 'center'
  },
  thumbnail: {
    width: 370,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    objectFit: 'fill'
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white'
  },
  infoContainer: {
    backgroundColor: '#36393F',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20,
    width: 370
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
    textAlign: 'center'
  },
  requirementsContainer: {
    backgroundColor: '#36393F',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: 370
  },
  requirementsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center'
  },
  requirementsText: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
    textAlign: 'center'
  },
  screenshotsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10
  },
  screenshotsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  screenshot: {
    width: 133,
    height: 130,
    marginBottom: 10
  },
  gameLinkText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    textDecorationLine: 'underline'
  },
  text: {
    color: 'white',
    fontSize: 16
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#1F2228',
    alignItems: 'center',
    justifyContent: 'center'
  },
  descriptionButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 10,
    textDecorationLine: 'underline',
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    marginTop: 190
  },
  modalContent: {
    backgroundColor: '#1F2228',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
    textAlign: 'center'
  },
  modalDescription: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center'
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    marginTop: 20
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  }
})
