export interface CountryDetailsData {
  name: {
    common: string
    official: string
    nativeName: Record<string, { common: string; official: string }>
  }
  flags: {
    svg: string
  }
  tld: string
  borders: string[]
  latlng: number[]
  area: number
  region: string
  subregion: string
  capital: string
  independent: boolean
  unMember: boolean
  population: number
  currencies: Record<string, { name: string; symbol: string }>
  gini?: Record<string, number | undefined>
  languages: Record<string, string>
  demonyms: Record<string, { f: string; m: string }>
}
