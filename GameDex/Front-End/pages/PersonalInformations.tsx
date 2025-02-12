import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, Button, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import { useUserContext } from '../context/UserContext'
import { Ionicons } from '@expo/vector-icons'

export default function PersonalInformations({ route }: any) {
  const { setIsLogged } = route.params
  const { user } = useUserContext()
  const [email, setEmail] = useState('')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newPicture, setNewPicture] = useState('')
  const [message, setMessage] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (user) {
      setEmail(user.email)
    }
  }, [user])

  const updatePersonalInformations = async () => {
    try {
      const response = await fetch('http://172.16.27.166:4444/api/updatePersonalInformations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id, email, oldPassword, newPassword, newPicture })
      })
      if (response.ok) {
        setModalVisible(false)
        setIsLogged(false)
      } else {
        const data = await response.json()
        setMessage(data.message)
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour des informations personnelles:', error)
      setMessage('Erreur lors de la mise à jour des informations personnelles')
    }
  }

  const deleteAccount = async () => {
    try {
      const response = await fetch('http://172.16.27.166:4444/api/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId: user.id })
      })
      if (response.ok) {
        setIsLogged(false)
      } else {
        const data = await response.json()
        setMessage(data.message)
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du compte:', error)
      setMessage('Erreur lors de la suppression du compte')
    }
  }

  return (
    <View style={styles.container}>
      {user && (
        <View style={styles.informationsContainer}>
          <Ionicons style={styles.personnal_icon} name="person-circle-outline" size={256} color={'white'} />
          <Text style={styles.name}>
            {user.firstname} {user.lastname}
          </Text>
          <Text style={styles.email}>{user.email}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.editButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.editButtonText}>Modifier mes informations</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={deleteAccount}>
        <Text style={styles.deleteButtonText}>Supprimer mon compte</Text>
      </TouchableOpacity>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Nouvel email :</Text>
            <TextInput style={styles.input} value={email} onChangeText={setEmail} />
            <Text style={styles.label}>Ancien mot de passe :</Text>
            <TextInput style={styles.input} secureTextEntry={true} value={oldPassword} onChangeText={setOldPassword} />
            <Text style={styles.label}>Nouveau mot de passe :</Text>
            <TextInput style={styles.input} secureTextEntry={true} value={newPassword} onChangeText={setNewPassword} />
            <Text style={styles.label}>Nouvelle photo de profil :</Text>
            <TextInput style={styles.input} value={newPicture} onChangeText={setNewPicture} />
            <TouchableOpacity style={styles.saveButton} onPress={updatePersonalInformations}>
              <Text style={styles.saveButtonText}>Enregistrer</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <Text style={styles.message}>{message}</Text>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2228',
    padding: 20
  },
  informationsContainer: {
    marginTop: 120
  },
  personnal_icon: {
    textAlign: 'center'
  },
  name: {
    fontSize: 24,
    color: 'white',
    textAlign: 'center'
  },
  email: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginTop: 20
  },
  editButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 120
  },
  editButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 20
  },
  deleteButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  modalContent: {
    backgroundColor: '#1F2228',
    padding: 20,
    borderRadius: 10,
    elevation: 5
  },
  label: {
    color: 'white',
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 10,
    color: 'white'
  },
  saveButton: {
    backgroundColor: '#3F51B5',
    paddingVertical: 15,
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 10
  },
  saveButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },
  cancelButton: {
    backgroundColor: 'red',
    paddingVertical: 15,
    borderRadius: 5,
    marginTop: 10
  },
  cancelButtonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },
  message: {
    marginTop: 20,
    color: 'red',
    textAlign: 'center'
  }
})
