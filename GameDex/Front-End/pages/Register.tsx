import React, { useState } from 'react'
import { View, TextInput, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { useNavigation } from '@react-navigation/native'

export default function Register() {
  const navigation = useNavigation()
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleRegister = () => {
    if (!firstname || !lastname || !email || !password) {
      setErrorMessage('Tous les champs sont obligatoires')
      return
    }

    fetch('http://172.16.27.166:4444/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password
      })
    })
      .then((response) => {
        if (response.ok) {
          navigation.navigate('Login')
          return response.json()
        } else {
          console.log("Erreur lors de l'inscription")
          setErrorMessage('Email déjà utilisé')
          return
        }
      })
      .catch((error) => {
        console.error(error)
        setErrorMessage('Email déjà utilisé')
      })
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} tintColor="white" />
      <TextInput
        style={styles.input}
        placeholder="Firstname"
        value={firstname}
        onChangeText={setFirstname}
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.input}
        placeholder="Lastname"
        value={lastname}
        onChangeText={setLastname}
        placeholderTextColor="white"
      />
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
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="white"
      />
      {errorMessage ? <Text style={styles.errorMessage}>{errorMessage}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1F2228',
    padding: 20
  },
  logo: {
    width: 300,
    height: 300
  },
  input: {
    width: '100%',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'white'
  },
  button: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
    width: '45%'
  },
  buttonText: {
    fontSize: 16,
    color: 'white'
  },
  errorMessage: {
    color: 'red',
    marginTop: 10
  }
})
