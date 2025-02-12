import { api } from '../api'

export const getAllGames = async () => {
  return api.get('/games').then((response) => {
    return response.data
  })
}

export const getAllGamesAlphabeticalSortedbyPlatform = async (platform: string) => {
  return api.get('/games?platform=' + platform + '&sort-by=alphabetical').then((response) => {
    return response.data
  })
}

export const getAllGamesReleaseDateSortedbyPlatform = async (platform: string) => {
  return api.get('/games?platform=' + platform + '&sort-by=release-date').then((response) => {
    return response.data
  })
}

export const getAllGamesAlphabeticalSortedbyCategoryAndPlatform = async (category: string, platform: string) => {
  return api.get('/games?category=' + category + '&platform=' + platform + '&sort-by=alphabetical').then((response) => {
    return response.data
  })
}

export const getAllGamesReleaseDateSortedbyCategoryAndPlatform = async (category: string, platform: string) => {
  return api.get('/games?category=' + category + '&platform=' + platform + '&sort-by=release-date').then((response) => {
    return response.data
  })
}

export const getAllGamesRelevanceSortedbyPlatform = async (platform: string) => {
  return api.get('/games?platform=' + platform + '&sort-by=relevance').then((response) => {
    return response.data
  })
}

export const getAllGamesRelevanceSortedbyCategoryAndPlatform = async (category: string, platform: string) => {
  return api.get('/games?category=' + category + '&platform=' + platform + '&sort-by=relevance').then((response) => {
    return response.data
  })
}

export const getAllGamesbyPlatform = async (platform: string) => {
  return api.get('/games?platform=' + platform).then((response) => {
    return response.data
  })
}

export const getGamebyId = async (id: number) => {
  return api.get('/game?id=' + id).then((response) => {
    return response.data
  })
}
