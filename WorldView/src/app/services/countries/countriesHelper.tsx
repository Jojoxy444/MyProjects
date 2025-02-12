import { api } from '../servicesHelper'

export const fetchAll = async () => {
  return await api.get('/all/').then((response) => response.data)
}

export const fetchAllbycca3 = async (cca3: any) => {
  return await api.get('/alpha/' + cca3).then((response2) => response2.data)
}

export const getCountryNamebycca3 = async (cca3: any) => {
  return await api.get('/alpha/' + cca3).then((response3) => response3.data[0].name.common)
}
