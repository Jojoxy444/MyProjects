import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { getUserById } from '../services/api/getUserById'
import { updateUserById } from '../services/api/updateUserById'
import { deleteUserById } from '../services/api/deleteUserById'

const Settings = ({ navigation }) => {
  const [userId, setUserId] = useState(null)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserId = await AsyncStorage.getItem('userId')
        if (storedUserId) {
          setUserId(storedUserId)
          const userData = await getUserById(storedUserId)
          if (userData) {
            setFirstname(userData.firstname || '')
            setLastname(userData.lastname || '')
            setEmail(userData.email || '')
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur : ', error)
      }
    }

    fetchUserData()
  }, [])

  const handleUpdate = async () => {
    if (!firstname || !lastname || !email) {
      Alert.alert('Erreur', 'Veuillez remplir obligatoirement les champs Prénom, Nom, et Email !')
      return
    }

    try {
      const updatedData = {
        firstname,
        lastname,
        email
      }

      if (password) {
        updatedData.password = password
      }

      await updateUserById(userId, updatedData)
      Alert.alert('Succès', 'Vos informations ont été mises à jour avec succès')
      navigation.goBack()
    } catch (error) {
      console.error('Erreur lors de la mise à jour du profil : ', error)
      Alert.alert('Erreur', "Une erreur s'est produite lors de la mise à jour de vos informations")
    }
  }

  const handleDeleteAccount = async () => {
    Alert.alert(
      'Suppression du compte',
      'Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.',
      [
        {
          text: 'Annuler',
          style: 'cancel'
        },
        {
          text: 'Supprimer',
          onPress: async () => {
            try {
              await deleteUserById(userId)
              await AsyncStorage.removeItem('userId')
              Alert.alert('Compte supprimé', 'Votre compte a été supprimé avec succès.')
              navigation.navigate('Login')
            } catch (error) {
              console.error('Erreur lors de la suppression du compte : ', error)
              Alert.alert('Erreur', "Une erreur s'est produite lors de la suppression du compte.")
            }
          },
          style: 'destructive'
        }
      ]
    )
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Ionicons name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.title}>Paramètres du profil</Text>

      <Text style={styles.label}>Prénom</Text>
      <TextInput
        style={styles.input}
        value={firstname}
        onChangeText={(text) => setFirstname(text)}
        placeholder="Votre prénom"
      />

      <Text style={styles.label}>Nom</Text>
      <TextInput
        style={styles.input}
        value={lastname}
        onChangeText={(text) => setLastname(text)}
        placeholder="Votre nom"
      />

      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={(text) => setEmail(text)}
        placeholder="Votre email"
        keyboardType="email-address"
      />

      <Text style={styles.label}>Mot de passe</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={(text) => setPassword(text)}
        placeholder="Nouveau mot de passe"
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Enregistrer</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
        <Text style={styles.deleteButtonText}>Supprimer mon compte</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9'
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 0,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 10,
    borderRadius: 5
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 30,
    color: '#4e5174',
    textAlign: 'center'
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    color: '#4e5174'
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 30
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  },
  deleteButton: {
    marginTop: 30,
    backgroundColor: '#FF3B30',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 10
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
})

export default Settings
