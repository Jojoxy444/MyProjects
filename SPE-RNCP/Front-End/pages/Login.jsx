import React, { useState } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native'
import { login } from '../services/api/login'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    try {
      const response = await login(email, password)
      if (response.user) {
        await AsyncStorage.setItem('userId', response.user._id)
        navigation.navigate('Home')
      } else {
        alert('Email ou mot de passe incorrect')
      }
    } catch (error) {
      alert('Connexion impossible')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
      </View>
      <Text style={styles.title}>Connexion</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>Mot de passe oublié ?</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Se connecter</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.buttonText}>S'inscrire</Text>
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
  forgotText: {
    color: '#007BFF',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20
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

export default Login
