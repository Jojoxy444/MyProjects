import React from 'react'
import Home from '../pages/Home'
import Details from '../pages/Details'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { usePlatformContext } from '../context/PlatformContext'

const AppStack = createNativeStackNavigator()

export default function HomeStack() {
  const { platform } = usePlatformContext()

  return (
    <AppStack.Navigator>
      <AppStack.Screen name="HomePage" component={Home} options={{ headerShown: false }} initialParams={{ platform }} />
      <AppStack.Screen name="Details" component={Details} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}
