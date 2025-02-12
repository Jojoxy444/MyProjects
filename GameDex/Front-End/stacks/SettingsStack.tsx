import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Settings from '../pages/Settings'
import Plateforms from '../pages/Plateforms'
import PersonalInformations from '../pages/PersonalInformations'

const AppStack = createNativeStackNavigator()

export default function SettingsStack({ route }: any) {
  const { setIsLogged } = route.params

  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="SettingsPage"
        component={Settings}
        options={{ headerShown: false }}
        initialParams={{ setIsLogged }}
      />
      <AppStack.Screen name="Plateforms" component={Plateforms} options={{ headerShown: false }} />
      <AppStack.Screen
        name="PersonalInformations"
        component={PersonalInformations}
        options={{ headerShown: false }}
        initialParams={{ setIsLogged }}
      />
    </AppStack.Navigator>
  )
}
