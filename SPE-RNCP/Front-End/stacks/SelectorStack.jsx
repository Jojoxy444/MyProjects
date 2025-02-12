import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Selector from '../pages/Selector'
import Cours from '../pages/Cours'
import Exercice from '../pages/Exercice'

const Stack = createNativeStackNavigator()

const SelectorStack = ({ route }) => {
  return (
    <Stack.Navigator initialRouteName="Selector">
      <Stack.Screen
        name="SelectorPage"
        options={{
          headerShown: false
        }}
      >
        {(props) => <Selector {...props} mode={route.params.mode} />}
      </Stack.Screen>
      <Stack.Screen
        name="Cours"
        component={Cours}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name="Exercice"
        component={Exercice}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  )
}

export default SelectorStack
