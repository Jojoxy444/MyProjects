import React from 'react'
import Link from 'next/link'
import '../components/styles.css'

const Navbar = ({ onInputChange, onRegionChange, regions }) => {
  const uniqueRegions = Array.from(new Set(regions))

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <select onChange={onRegionChange}>
          <option value="All">All</option>
          {uniqueRegions &&
            uniqueRegions.length > 0 &&
            uniqueRegions.map((region, index) => (
              <option key={index} value={region}>
                {region}
              </option>
            ))}
        </select>
        <a className="link" href="http://localhost:3000">
          World View
        </a>
        <input className="search" type="text" placeholder="Recherche par nom" onChange={onInputChange} />
      </div>
    </nav>
  )
}

const Navbar2 = () => {
  return (
    <nav className="navbar2">
      <div className="navbar2-container">
        <a className="link2" href="http://localhost:3000">
          World View
        </a>
      </div>
    </nav>
  )
}

const CountryInfo = ({ country }) => (
  <Link href={`/pages?cca3=${country.cca3}`}>
    <div className="country-info">
      <p className="name">{country.name.common}</p>
      <img className="flag" src={country.flags.svg} alt={`Flag of ${country.name.common}`} />
    </div>
  </Link>
)

export { CountryInfo, Navbar, Navbar2 }
