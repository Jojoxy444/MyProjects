import React, { useState, useEffect, useRef } from 'react'
import Styles from '../styles/Header.module.css'
import { FiMenu, FiX, FiUser, FiChevronDown } from 'react-icons/fi'
import Link from 'next/link'

const Header_Connect = () => {
  const [userData, setUserData] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false)
  const navbarRef = useRef(null)
  const accountWrapperRef = useRef(null)

  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  const toggleMenu = () => {
    setMenuOpen(!isMenuOpen)
    if (isAccountMenuOpen) {
      setAccountMenuOpen(false)
    }
  }

  const toggleAccountMenu = () => {
    setAccountMenuOpen(!isAccountMenuOpen)
    if (isMenuOpen) {
      setMenuOpen(false)
    }
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

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target) &&
        accountWrapperRef.current &&
        !accountWrapperRef.current.contains(event.target)
      ) {
        setMenuOpen(false)
        setAccountMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
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

        <nav className={Styles.navbar} data-navbar ref={navbarRef}>
          <ul className={`${Styles.navbarList} ${isMenuOpen ? Styles.open : ''}`}>
            <li className={Styles.navItem}>
              <Link href="/accueil#">
                <p className={Styles.navbarLink} data-nav-link>
                  Accueil
                </p>
              </Link>
            </li>
            <li className={Styles.navItem}>
              <Link href="/accueil#recommandations">
                <p className={Styles.navbarLink} data-nav-link>
                  Recommandations
                </p>
              </Link>
            </li>
            <li className={Styles.navItem}>
              <Link href="/Order_connect">
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
          </ul>
          <div className={Styles.accountWrapper} ref={accountWrapperRef}>
            <button className={Styles.accountToggle} onClick={toggleAccountMenu}>
              <FiUser />
              <FiChevronDown />
            </button>
            {isAccountMenuOpen && (
              <ul className={Styles.accountMenu}>
                <li>
                  <Link href="/panier">
                    <p className={Styles.accountMenuItem}>Mon panier</p>
                  </Link>
                </li>
                <li>
                  {userData.status === 'administrateur' && (
                    <Link href="/admin">
                      <p className={Styles.accountMenuItem}>Dashboard</p>
                    </Link>
                  )}
                </li>
                <li>
                  <Link href="/Login">
                    <p className={Styles.accountMenuItem}>Deconnexion</p>
                  </Link>
                </li>
              </ul>
            )}
          </div>
        </nav>

        <button className={`${Styles.navToggleBtn} ${Styles.mobileOnly}`} onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
    </header>
  )
}

export default Header_Connect
