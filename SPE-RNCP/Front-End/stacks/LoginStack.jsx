import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../pages/Login'
import ForgotPassword from '../pages/ForgotPassword'

const Stack = createNativeStackNavigator()

const LoginStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="LoginPage" component={Login} options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default LoginStack
