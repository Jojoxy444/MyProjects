import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native'
import { resetPassword } from '../services/api/resetPassword'

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleResetPassword = async () => {
    if (!email || !newPassword || !confirmPassword) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs')
      return
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Erreur', 'Les mots de passe ne correspondent pas')
      return
    }

    try {
      const response = await resetPassword(email, newPassword)
      if (response.success) {
        Alert.alert('Succès', 'Mot de passe réinitialisé avec succès')
        navigation.goBack()
      } else {
        Alert.alert('Erreur', 'Email non trouvé')
      }
    } catch (error) {
      Alert.alert('Erreur', 'Impossible de réinitialiser le mot de passe')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>

      <Text style={styles.title}>Réinitialisation du mot de passe</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Réinitialiser</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#ffffff'
  },
  logoContainer: {
    alignItems: 'center'
  },
  logo: {
    width: 300,
    height: 200,
    marginBottom: 30
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
})

export default ForgotPassword
