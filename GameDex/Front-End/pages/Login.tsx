import React, { useState } from 'react'
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Image } from 'react-native'
import { useUserContext } from '../context/UserContext'
import { useNavigation } from '@react-navigation/native'

export default function Login({ setIsLogged }: any) {
  const navigation = useNavigation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const { setUser } = useUserContext()

  const handleLogin = async () => {
    try {
      const response = await fetch('http://172.16.27.166:4444/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        setIsLogged(true)
        setUser(data.user)
      } else {
        setErrorMessage(data.message || 'Email ou mot de passe incorrect')
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error)
      setErrorMessage('Erreur lors de la connexion')
    }
  }

  const handleRegister = () => {
    navigation.navigate('Register')
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} tintColor="white" />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="white"
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>S'inscrire</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2228',
    alignItems: 'center',
    justifyContent: 'center'
  },
  logo: {
    width: 300,
    height: 300
  },
  input: {
    width: '80%',
    color: 'white',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    width: '40%',
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    width: '80%',
    textAlign: 'center'
  }
})
