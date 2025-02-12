import React from 'react'
import Categories from '../pages/Categories'
import Details from '../pages/Details'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { usePlatformContext } from '../context/PlatformContext'

const AppStack = createNativeStackNavigator()

export default function CategoriesStack() {
  const { platform } = usePlatformContext()

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="CategoriesPage"
        component={Categories}
        options={{ headerShown: false }}
        initialParams={{ platform }}
      />
      <AppStack.Screen name="Details" component={Details} options={{ headerShown: false }} />
    </AppStack.Navigator>
  )
}
