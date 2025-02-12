import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import AsyncStorage from '@react-native-async-storage/async-storage'

import HomeStack from './stacks/HomeStack'
import LoginStack from './stacks/LoginStack'
import Register from './pages/Register'

const Stack = createStackNavigator()

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken')
        if (token) {
          setIsAuthenticated(true)
        } else {
          setIsAuthenticated(false)
        }
      } catch (error) {
        console.error("Erreur lors de la vérification de l'authentification", error)
      }
    }

    checkAuthStatus()
  }, [])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
        <Stack.Screen name="Login" component={LoginStack} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
