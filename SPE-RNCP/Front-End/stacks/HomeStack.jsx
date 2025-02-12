import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomePage from '../pages/Home'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SelectorStack from './SelectorStack'
import ProfilStack from './ProfilStack'

const Tab = createBottomTabNavigator()

const HomeTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: '#c4c4c4',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 10
        }
      }}
    >
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          headerShown: false,
          tabBarLabel: 'Accueil',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={color === 'blue' ? 'home' : 'home-outline'} color={color} size={size} />
          )
        }}
      />
      <Tab.Screen
        name="SelectorCours"
        component={SelectorStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Cours',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={color === 'blue' ? 'book' : 'book-outline'} color={color} size={size} />
          )
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate('SelectorCours', {
              screen: 'Selector'
            })
          }
        })}
        initialParams={{ mode: 'Cours' }}
      />
      <Tab.Screen
        name="SelectorExercice"
        component={SelectorStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Exercice',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name={color === 'blue' ? 'checkmark-circle' : 'checkmark-circle-outline'}
              color={color}
              size={size}
            />
          )
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault()
            navigation.navigate('SelectorExercice', {
              screen: 'Selector'
            })
          }
        })}
        initialParams={{ mode: 'Exercice' }}
      />

      <Tab.Screen
        name="Profil"
        component={ProfilStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Profil',
          tabBarLabelStyle: { fontSize: 14 },
          tabBarIcon: ({ color, size }) => (
            <Ionicons name={color === 'blue' ? 'person-circle' : 'person-circle-outline'} color={color} size={size} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

export default HomeTab
