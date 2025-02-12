import React, { createContext, useContext, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

export type PlatformType = 'pc' | 'browser' | 'all'

interface PlatformContextType {
  platform: PlatformType
  setPlatform: (platform: PlatformType) => void
}

const PlatformContext = createContext<PlatformContextType>({
  platform: 'all',
  setPlatform: () => {}
})

export const usePlatformContext = () => useContext(PlatformContext)

export const PlatformProvider: React.FC = ({ children }: any) => {
  const [platform, setPlatform] = useState<PlatformType>('all')

  useEffect(() => {
    const getPlatform = async () => {
      try {
        const storedPlatform = await AsyncStorage.getItem('platform')
        if (storedPlatform) {
          setPlatform(storedPlatform as PlatformType)
        }
      } catch (error) {
        console.error('Error retrieving platform from AsyncStorage:', error)
      }
    }

    getPlatform()
  }, [])

  const updatePlatform = async (newPlatform: PlatformType) => {
    try {
      await AsyncStorage.setItem('platform', newPlatform)
      setPlatform(newPlatform)
    } catch (error) {
      console.error('Error setting platform in AsyncStorage:', error)
    }
  }

  return (
    <PlatformContext.Provider value={{ platform, setPlatform: updatePlatform }}>{children}</PlatformContext.Provider>
  )
}
