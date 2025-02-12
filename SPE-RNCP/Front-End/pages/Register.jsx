import React, { useState } from 'react'
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { register } from '../services/api/register'

const Register = ({ navigation }) => {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleRegister = async () => {
    if (!firstname || !lastname || !email || !password) {
      Alert.alert('Error', 'Tous les champs doivent être remplis')
      return
    }

    try {
      const response = await register(firstname, lastname, email, password)
      if (response.message === 'Utilisateur inscrit avec succès') {
        navigation.navigate('Login')
      } else {
        Alert.alert('Erreur', response.message)
      }
    } catch (error) {
      Alert.alert('Error', "Erreur lors de l'inscription")
    }
  }

  const handleLogin = async () => {
    navigation.navigate('Login')
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Inscription</Text>
      <TextInput style={styles.input} placeholder="Prénom" value={firstname} onChangeText={setFirstname} />
      <TextInput style={styles.input} placeholder="Nom" value={lastname} onChangeText={setLastname} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Connexion</Text>
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
    borderRadius: 5,
    backgroundColor: '#fff'
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16
  }
})

export default Register
