'use client'
import React, { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Contacts.module.css'

const Contact = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleComment = async () => {
    try {
      const response = await fetch('http://172.16.27.166:7777/api/avis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          message
        })
      })

      if (response.ok) {
        console.log('Avis posté avec succès')
        setName('')
        setEmail('')
        setMessage('')
      } else {
        console.error("Erreur lors de l'envoi de l'avis")
      }
    } catch (error) {
      console.error('Erreur lors de la communication avec le serveur', error)
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.contact}>
        <h1 className={styles.title}>Contactez nous !</h1>
        <p className={styles.description}>Vous avez une question ? Une recommandation ? Faites-le nous savoir !</p>
        <form>
          <div>
            <label className={styles.label} htmlFor="name">
              Name
            </label>
            <input
              className={styles.input}
              id="name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="message">
              Message
            </label>
            <textarea
              className={styles.input}
              id="message"
              rows="6"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <button onClick={() => handleComment()} className={styles.button} type="button">
            Envoyer
          </button>
        </form>
      </div>
      <Footer />
    </div>
  )
}

export default Contact
