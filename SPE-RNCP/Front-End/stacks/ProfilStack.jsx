import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Profil from '../pages/Profil'
import Settings from '../pages/Settings'

const Stack = createNativeStackNavigator()

const ProfilStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ProfilPage" component={Profil} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={Settings} options={{ headerShown: false }} />
    </Stack.Navigator>
  )
}

export default ProfilStack
