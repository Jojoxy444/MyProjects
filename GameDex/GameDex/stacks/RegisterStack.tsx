import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Register from '../pages/Register'
import Login from '../pages/Login'

const AppStack = createNativeStackNavigator()

export default function RegisterStack() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="RegisterPage" component={Register} options={{ headerShown: false }} />
      <AppStack.Screen name="Login" component={Login} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}
