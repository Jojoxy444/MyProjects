'use client'
import React, { useEffect, useState } from 'react'
import { fetchAll } from '../app/services/countries/countriesHelper'
import { CountryInfo, Navbar } from '../app/components/CountryInfo'
import { CountryDetailsData } from './types'

const Home = () => {
  const [data, setData] = useState<CountryDetailsData[]>([])
  const [filterValue, setFilterValue] = useState('')
  const [regionFilter, setRegionFilter] = useState('All')
  const [searched, setSearched] = useState(false)

  useEffect(() => {
    fetchAll().then((fetchedData) => {
      const sortedData = fetchedData.sort((a: any, b: any) => {
        const countryA = a.name.common.toUpperCase()
        const countryB = b.name.common.toUpperCase()
        return countryA.localeCompare(countryB)
      })
      setData(sortedData)
    })
  }, [])

  const handleInputChange = (name: React.ChangeEvent<HTMLSelectElement>) => {
    setFilterValue(name.target.value)
    setSearched(true)
  }

  const handleRegionFilterChange = (name: React.ChangeEvent<HTMLSelectElement>) => {
    setRegionFilter(name.target.value)
  }

  const filteredCountries = data
    .filter((country) => country.name.common.toLowerCase().includes(filterValue.toLowerCase()))
    .filter((country) => regionFilter === 'All' || country.region === regionFilter)

  let content
  if (searched && filteredCountries.length === 0) {
    content = <p className="matching">No matching countries found.</p>
  } else {
    content = (
      <div className="country-container">
        {filteredCountries.map((country, index) => (
          <CountryInfo key={index} country={country} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <Navbar
        onInputChange={handleInputChange}
        onRegionChange={handleRegionFilterChange}
        regions={data.map((country) => country.region)}
      />
      {content}
    </div>
  )
}

export default Home
