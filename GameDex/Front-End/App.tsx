import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'

import HomeStack from './stacks/HomeStack'
import CategoriesStack from './stacks/CategoriesStack'
import Login from './pages/Login'
import { PlatformProvider } from './context/PlatformContext'
import { UserProvider } from './context/UserContext'
import FavoriteGamesStack from './stacks/FavoriteGamesStack'
import RegisterStack from './stacks/RegisterStack'
import SettingsStack from './stacks/SettingsStack'

const AuthStack = createNativeStackNavigator()
const AppStack = createBottomTabNavigator()

export default function App() {
  const [isLogged, setIsLogged] = useState(false)

  return (
    <PlatformProvider>
      <UserProvider>
        <NavigationContainer>
          {isLogged ? (
            <AppStack.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName

                  switch (route.name) {
                    case 'Home':
                      iconName = focused ? 'home' : 'home'
                      break
                    case 'Categories':
                      iconName = focused ? 'search' : 'search'
                      break
                    case 'Settings':
                      iconName = focused ? 'settings-outline' : 'settings-outline'
                      break
                    case 'Favorite':
                      iconName = focused ? 'heart-outline' : 'heart-outline'
                      break
                    default:
                      iconName = 'person'
                      break
                  }

                  return <Ionicons name={iconName} size={size} color={color} />
                },
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: 'gray',
                tabBarLabelStyle: styles.tabBarLabelStyle,
                tabBarStyle: styles.tabBarStyle,
                tabBarLabel: () => null,
                headerShown: null
              })}
            >
              <AppStack.Screen name="Home" component={HomeStack} />
              <AppStack.Screen name="Categories" component={CategoriesStack} />
              <AppStack.Screen name="Favorite" component={FavoriteGamesStack} />
              <AppStack.Screen name="Settings" component={SettingsStack} initialParams={{ setIsLogged }} />
            </AppStack.Navigator>
          ) : (
            <AuthStack.Navigator screenOptions={{ headerShown: false }}>
              <AuthStack.Screen name="Login">
                {({ navigation }) => <Login navigation={navigation} setIsLogged={setIsLogged} />}
              </AuthStack.Screen>
              <AuthStack.Screen name="Register" component={RegisterStack} />
            </AuthStack.Navigator>
          )}
        </NavigationContainer>
      </UserProvider>
    </PlatformProvider>
  )
}

const styles = StyleSheet.create({
  tabBarLabelStyle: {
    fontSize: 16
  },
  tabBarStyle: {
    backgroundColor: '#24282F',
    height: 53,
    width: '100%'
  }
})
