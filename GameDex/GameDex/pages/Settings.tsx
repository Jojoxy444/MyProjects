import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { useUserContext } from '../context/UserContext'

const Settings = ({ navigation, route }: any) => {
  const { user } = useUserContext()
  const { setIsLogged } = route.params

  const handleLogout = () => {
    setIsLogged(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.subheader}>
          <Text style={styles.textHeader1}>Vous êtes dans</Text>
          <View style={styles.search}>
            <Text style={styles.textHeader2}>Vos paramètres</Text>
          </View>
        </View>
      </View>
      <View style={styles.userinfo}>
        <View>
          {user && user.picture ? (
            <Image source={{ uri: user.picture }} style={styles.userImage} />
          ) : (
            <Ionicons name="person-circle-outline" size={150} color={'white'} />
          )}
        </View>
        <View style={styles.welcome}>
          <Text style={styles.welcomeText}>
            {user ? user.firstname : 'Utilisateur'} {user ? user.lastname : ''}
          </Text>
        </View>
      </View>
      <View style={styles.params}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PersonalInformations')}>
          <Text style={styles.optionText}>Informations personnelles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('Plateforms')}>
          <Text style={styles.optionText}>Plateforme de recherche</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Se déconnecter</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2228',
    padding: 20
  },
  header: {
    padding: 10,
    marginRight: 130,
    alignItems: 'center'
  },
  userinfo: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20
  },
  userImage: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginRight: 10
  },
  welcome: {
    marginTop: 15
  },
  welcomeText: {
    fontSize: 24,
    color: 'white',
    width: 200,
    marginTop: 35,
    marginLeft: 10
  },
  subheader: {
    marginTop: 50,
    marginLeft: 30
  },
  textHeader1: {
    fontSize: 13,
    color: '#7B8395',
    height: 20
  },
  search: {
    display: 'flex',
    flexDirection: 'row'
  },
  textHeader2: {
    fontSize: 30,
    color: 'white',
    width: 250
  },
  params: {
    marginTop: 100
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  optionText: {
    fontSize: 16,
    color: 'white'
  },
  logoutButton: {
    marginTop: 160,
    backgroundColor: 'red',
    paddingVertical: 15,
    alignItems: 'center',
    borderRadius: 20
  },
  logoutButtonText: {
    fontSize: 16,
    color: 'white'
  }
})

export default Settings
