import React, { useState, useEffect, useRef } from 'react'
import Styles from '../styles/Header.module.css'
import { FiMenu, FiX, FiUser, FiChevronDown } from 'react-icons/fi'
import Link from 'next/link'
import jwt from 'jsonwebtoken'

const Header = () => {
  const [userData, setUserData] = useState(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setMenuOpen] = useState(false)
  const [isAccountMenuOpen, setAccountMenuOpen] = useState(false)
  const navbarRef = useRef(null)
  const accountWrapperRef = useRef(null)
  const [userRole, setUserRole] = useState(null)

  useEffect(() => {
    const storedToken = localStorage.getItem('ecommerce_jwt')
    if (storedToken) {
      const decodedToken = jwt.decode(storedToken)
      setUserRole(decodedToken.role)
      setUserData(decodedToken)
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
          <a href="/accueil#" className={Styles.logo}>
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
              <Link href="/order">
                <p className={Styles.navbarLink} data-nav-link>
                  Menu
                </p>
              </Link>
            </li>
            {userRole === 'Administrateur' && (
              <li className={Styles.navItem}>
                <Link href="/admin">
                  <p className={Styles.navbarLink} data-nav-link>
                    Admin
                  </p>
                </Link>
              </li>
            )}
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
                  <Link href="/">
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

export default Header
