import React, { useState, useEffect } from 'react'
import Styles from '../styles/Header.module.css'
import { FiMenu, FiX } from 'react-icons/fi'
import Link from 'next/link'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
  }

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${Styles.header} ${isScrolled ? Styles.scrolled : ''}`} data-header>
      <div className={Styles.container}>
        <h1>
          <a href="#" className={Styles.logo}>
            <img src="/logo.png" width={170} alt="Logo"></img>
          </a>
        </h1>

        <nav className={Styles.navbar} data-navbar>
          <ul className={`${Styles.navbarList} ${isMenuOpen ? Styles.open : ''}`}>
            <li className={Styles.navItem}>
              <Link href="/#">
                <p className={Styles.navbarLink} data-nav-link>
                  Accueil
                </p>
              </Link>
            </li>
            <li className={Styles.navItem}>
              <Link href="/#recommandations">
                <p className={Styles.navbarLink} data-nav-link>
                  Recommandations
                </p>
              </Link>
            </li>
            <li className={Styles.navItem}>
              <Link href="/Order">
                <p className={Styles.navbarLink} data-nav-link>
                  Menu
                </p>
              </Link>
            </li>
            <li className={Styles.navItem}>
              <Link href="/contacts">
                <p className={Styles.navbarLink} data-nav-link>
                  Contacts
                </p>
              </Link>
            </li>
            <li className={Styles.navItem}>
              <Link href="/Login">
                <button className={`${Styles.SignUpBtn} ${Styles.mobileOnly}`}>Connexion</button>
              </Link>
            </li>
          </ul>
        </nav>

        <button className={`${Styles.navToggleBtn} ${Styles.mobileOnly}`} onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  )
}

export default Header
