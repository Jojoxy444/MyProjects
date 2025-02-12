'use client'
import React, { useEffect, useState } from 'react'
import { fetchAllbycca3, getCountryNamebycca3 } from '../services/countries/countriesHelper'
import { CountryDetailsData } from '../types'
import '../pages/globals.css'
import { Navbar2 } from '../components/CountryInfo'

const CountryDetail: React.FC = () => {
  const [countryData, setCountryData] = useState<CountryDetailsData[]>([])
  const [borderCountries, setBorderCountries] = useState<{ countryName: string; cca3: string }[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const urlParams = new URLSearchParams(window.location.search)
        const cca3 = urlParams.get('cca3')

        if (cca3) {
          const data = await fetchAllbycca3(cca3)
          setCountryData(data)

          if (data[0].borders && data[0].borders.length > 0) {
            const borderCountriesData = await Promise.all(
              data[0].borders.map(async (cca3: any) => {
                const countryName = await getCountryNamebycca3(cca3)
                return { countryName, cca3 }
              })
            )
            setBorderCountries(borderCountriesData)
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des données du pays : ', error)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <div>
        <Navbar2 />
      </div>
      {countryData && countryData.length > 0 ? (
        <div className="country-info">
          <h1 className="name">{countryData[0].name.common}</h1>
          <img className="flag" src={countryData[0].flags.svg} alt={`Flag of ${countryData[0].name.common}`} />
          <h1>Basic Country Information</h1>
          <div className="div1">
            <div className="div2">
              <h2 className="title">Common Name : </h2>
              <p>{countryData[0].name.common ? countryData[0].name.common : 'Aucun'}</p>
            </div>
            <div className="div2">
              <h2 className="title">Official Name : </h2>
              <p>{countryData[0].name.official ? countryData[0].name.official : 'Aucun'}</p>
            </div>
            <div className="div2">
              <h2 className="title">Native Name :</h2>
              {countryData && countryData[0].name.nativeName ? (
                Object.values(countryData[0].name.nativeName || {})
                  .reduce((uniqueNames: string[], nativeName: any) => {
                    if (!uniqueNames.includes(nativeName.common)) {
                      uniqueNames.push(nativeName.common)
                    }
                    return uniqueNames
                  }, [])
                  .map((uniqueNativeName: string, index: number) => (
                    <div key={index}>
                      <p>{uniqueNativeName}</p>
                    </div>
                  ))
              ) : (
                <p>Aucun</p>
              )}
            </div>
            <div className="div2">
              <h2 className="title">Official Native Name :</h2>
              {countryData && countryData[0].name.nativeName ? (
                Object.values(countryData[0].name.nativeName || {})
                  .reduce((uniqueNames: string[], nativeName: any) => {
                    if (!uniqueNames.includes(nativeName.common)) {
                      uniqueNames.push(nativeName.common)
                    }
                    return uniqueNames
                  }, [])
                  .map((uniqueNativeName: string, index: number) => (
                    <div key={index}>
                      <p>{uniqueNativeName}</p>
                    </div>
                  ))
              ) : (
                <p>Aucun</p>
              )}
            </div>
            <div className="div2">
              <h2 className="title">TLD : </h2>
              <p>{countryData[0].tld ? countryData[0].tld : 'Aucun'}</p>
            </div>
          </div>
          <br></br>
          <h1>Geographical Data</h1>
          <div className="div1">
            <div className="div2">
              <h2 className="title">Latitude : </h2>
              <p>{countryData[0].latlng[0] ? countryData[0].latlng[0] : 'Aucune'}</p>
            </div>
            <div className="div2">
              <h2 className="title">Longitude : </h2>
              <p>{countryData[0].latlng[1] ? countryData[0].latlng[1] : 'Aucune'}</p>
            </div>
            <div className="div2">
              <h2 className="title">Superficie : </h2>
              <p>{countryData[0].area ? countryData[0].area + ' km²' : 'Aucune'}</p>
            </div>
            <div className="div2">
              <h2 className="title">Pays en bordure : </h2>
              <p>
                {borderCountries.length > 0
                  ? borderCountries.map(({ cca3, countryName }, index) => (
                      <span key={index}>
                        <a href={`/pages?cca3=${cca3}`}>{countryName}</a>
                        {index !== borderCountries.length - 1 && ', '}
                      </span>
                    ))
                  : 'Aucune bordure'}
              </p>
            </div>
            <div className="div2">
              <h2 className="title">Région : </h2>
              <p>{countryData[0].region ? countryData[0].region : 'Aucune'}</p>
            </div>
            <div className="div2">
              <h2 className="title">Sous-Région : </h2>
              <p>{countryData[0].subregion ? countryData[0].subregion : 'Aucune'}</p>
            </div>
          </div>
          <br></br>
          <h1>Political and Administrative Data</h1>
          <div className="div3">
            <p>
              <span className="first-part">Capitale : </span>
              <span>{countryData[0].capital ? countryData[0].capital : 'Aucune'}</span>
            </p>
            <p>
              <span className="first-part">Indépendance : </span>
              <span>{countryData[0].independent ? 'oui' : 'non'}</span>
            </p>
            <p>
              <span className="first-part">Membre de l'UN : </span>
              <span>{countryData[0].unMember ? 'oui' : 'non'}</span>
            </p>
          </div>
          <br></br>
          <h1>Economic and Demographic Data</h1>
          <p>
            <span className="first-part">Nombre d'habitants : </span>
            <span>{countryData[0].population ? countryData[0].population : 'Aucun'}</span>
          </p>
          {countryData && countryData[0].currencies ? (
            <div className="devises-container">
              <p className="first-part">
                Devises :&nbsp;&nbsp;
                <div>
                  {Object.keys(countryData[0].currencies).map((key, index) => (
                    <span key={key}>
                      {index === 0 ? (
                        <span>
                          <span className="debold">{countryData[0].currencies[key].name}&nbsp;&nbsp;&nbsp;</span>
                          <span className="currency-symbol">{countryData[0].currencies[key].symbol}</span>
                        </span>
                      ) : (
                        <span>
                          <br />
                          <span className="debold">{countryData[0].currencies[key].name}&nbsp;&nbsp;&nbsp;</span>
                          <span className="currency-symbol">{countryData[0].currencies[key].symbol}</span>
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              </p>
            </div>
          ) : (
            <p>
              <span className="first-part">Devises : </span>
              <span>Aucune</span>
            </p>
          )}
          {countryData && countryData[0].gini ? (
            Object.keys(countryData[0].gini).map((key) => (
              <div key={key}>
                {countryData[0].gini && countryData[0].gini[key] !== undefined ? (
                  <p>
                    <span className="first-part">Coefficient GINI ({key}) : </span>
                    <span>{countryData[0].gini[key]} %</span>
                  </p>
                ) : (
                  <p>
                    <span className="first-part">Coefficient GINI ({key}) : </span>
                    <span>Aucun</span>
                  </p>
                )}
              </div>
            ))
          ) : (
            <p>
              <span className="first-part">Coefficient GINI : </span>
              <span>Aucun</span>
            </p>
          )}
          <br></br>
          <h1>Cultural Data</h1>
          {countryData[0].languages ? (
            <div>
              <span className="first-part">Languages :</span>
              {Object.keys(countryData[0].languages).map((key, index) => (
                <p key={index}>{countryData[0].languages[key]}</p>
              ))}
            </div>
          ) : (
            <p>
              <span className="first-part">Languages :</span>&nbsp;&nbsp;
              <span>Aucun</span>
            </p>
          )}

          <br></br>
          <span className="first-part">Demonyms :</span>
          <div className="demonyms-container">
            {Object.keys(countryData[0].demonyms).map((key) => (
              <div key={key} className="demonym">
                <p className="demonym-name">
                  {key === 'eng' ? <h3>England :</h3> : key === 'fra' ? <h3>France :</h3> : key}
                </p>
                <div className="demonym-details">
                  <div className="gender-column">
                    <p>
                      <span className="bold">Female : </span>
                      <span>{countryData[0].demonyms[key]['f']}</span>
                    </p>
                    <p>
                      <span className="bold">Male : </span>
                      <span>{countryData[0].demonyms[key]['m']}</span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  )
}

export default CountryDetail
