import React from 'react'
import styles from '../styles/Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.SubContainer}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="Company Logo" />
          </div>
          <div className={styles.socialLinks}>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src="/twitter.svg" alt="Twitter" />
            </a>
            <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer">
              <img src="/snapchat.svg" alt="Facebook" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src="/instagram.svg" alt="Instagram" />
            </a>
          </div>
        </div>
        <div className={styles.info}>
          <div>
            <h3>Heures d'ouverture</h3>
            <p>Lundi - Samedi : 17h - 3h</p>
            <p>Dimanche : Fermé !</p>
            <p>Jours férié : Fermé !</p>
          </div>
          <div>
            <h3>Contacts</h3>
            <p>Email: crepway@gmail.com</p>
            <p>N° tél : +33.1.23.45.67.89</p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
