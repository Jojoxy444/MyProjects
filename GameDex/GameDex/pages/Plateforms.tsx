import React from 'react'
import { StyleSheet, View, Text, Switch, TouchableOpacity } from 'react-native'
import { usePlatformContext, PlatformType } from '../context/PlatformContext'

export default function Plateforms() {
  const { platform, setPlatform } = usePlatformContext()

  const handlePlatformChange = (platform: PlatformType) => {
    setPlatform(platform)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plateformes</Text>
      <TouchableOpacity onPress={() => handlePlatformChange('pc')} style={styles.option}>
        <Text style={styles.label}>PC</Text>
        <Switch value={platform === 'pc'} onValueChange={() => handlePlatformChange('pc')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePlatformChange('browser')} style={styles.option}>
        <Text style={styles.label}>Browser</Text>
        <Switch value={platform === 'browser'} onValueChange={() => handlePlatformChange('browser')} />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handlePlatformChange('all')} style={styles.option}>
        <Text style={styles.label}>All</Text>
        <Switch value={platform === 'all'} onValueChange={() => handlePlatformChange('all')} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1F2228',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white'
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 10
  },
  label: {
    color: 'white'
  }
})
