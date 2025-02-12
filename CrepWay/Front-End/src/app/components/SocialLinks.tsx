import React from 'react'
import styles from '../styles/SocialLinks.module.css'

const SocialLinks = () => {
  return (
    <div className={styles.socialLinksEtiquette}>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
        <img src="/twitter.svg" alt="Twitter" />
      </a>
      <a href="https://snapchat.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
        <img src="/snapchat.svg" alt="Snapchat" />
      </a>
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
        <img src="/instagram.svg" alt="Instagram" />
      </a>
    </div>
  )
}

export default SocialLinks
