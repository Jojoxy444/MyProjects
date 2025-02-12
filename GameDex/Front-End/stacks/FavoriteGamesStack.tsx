import React from 'react'
import Home from '../pages/Home'
import Details from '../pages/Details'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import FavoriteGames from '../pages/FavoriteGames'

const AppStack = createNativeStackNavigator()

export default function HomeStack() {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="FavoriteGamesPage" component={FavoriteGames} options={{ headerShown: false }} />
      <AppStack.Screen name="Details" component={Details} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}
