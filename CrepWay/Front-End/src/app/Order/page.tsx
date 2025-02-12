'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Order.module.css'

import ModalCrepeSalee from '../components/ModalCrepeSalee'
import ModalCrepeSucree from '../components/ModalCrepeSucree'
import ModalMilkshake from '../components/ModalMilkshake'
import ModalSmoothie from '../components/ModalSmoothie'
import ModalBubbleTea from '../components/ModalBubbleTea'

const OrderPage = () => {
  const propositions = [
    { category: 'Crêpes Sucrées', name: 'Crêpe Sucrée', price: 'À partir de 2.50', image: '/crepe1.png' },
    { category: 'Crêpes Salées', name: 'Crêpe Salée', price: 'À partir de 3.50', image: '/crepe2.png' },
    { category: 'Smoothies & Milkshakes', name: 'Smoothie', price: 'À partir de 3.90', image: '/smoothie.png' },
    { category: 'Smoothies & Milkshakes', name: 'Milkshake', price: 'À partir de 2.90', image: '/milkshake.png' },
    { category: 'Bubble Tea', name: 'Bubbletea', price: 'À partir de 5.00', image: '/bubbletea.png' }
  ]

  const [selectedCategory, setSelectedCategory] = useState('All')

  const filteredPropositions =
    selectedCategory === 'All' ? propositions : propositions.filter((prop) => prop.category === selectedCategory)

  const [userData, setUserData] = useState(null)
  const [crepeSaleeModalOpen, setCrepeSaleeModalOpen] = useState(false)
  const [crepeSucreeModalOpen, setCrepeSucreeModalOpen] = useState(false)
  const [milkshakeModalOpen, setMilkshakeModalOpen] = useState(false)
  const [smoothieModalOpen, setSmoothieModalOpen] = useState(false)
  const [bubbleTeaModalOpen, setBubbleTeaModalOpen] = useState(false)

  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
    }
  }, [])

  const toggleModal = (modalName) => {
    switch (modalName) {
      case 'Crêpe Sucrée':
        setCrepeSucreeModalOpen((prev) => !prev)
        break
      case 'Crêpe Salée':
        setCrepeSaleeModalOpen((prev) => !prev)
        break
      case 'Smoothie':
        setSmoothieModalOpen((prev) => !prev)
        break
      case 'Milkshake':
        setMilkshakeModalOpen((prev) => !prev)
        break
      case 'Bubbletea':
        setBubbleTeaModalOpen((prev) => !prev)
        break
      default:
        break
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.categories}>
          <div className={styles.category} onClick={() => setSelectedCategory('All')}>
            Tous nos produits
          </div>
          <div className={styles.category} onClick={() => setSelectedCategory('Crêpes Sucrées')}>
            Crêpes Sucrées
          </div>
          <div className={styles.category} onClick={() => setSelectedCategory('Crêpes Salées')}>
            Crêpes Salées
          </div>
          <div className={styles.category} onClick={() => setSelectedCategory('Smoothies & Milkshakes')}>
            Smoothies & Milkshakes
          </div>
          <div className={styles.category} onClick={() => setSelectedCategory('Bubble Tea')}>
            Bubble Tea
          </div>
        </div>

        <div className={styles.propositionsContainer}>
          {filteredPropositions.map((prop, index) => (
            <div key={index} className={styles.proposition}>
              <img src={prop.image} alt={prop.name} className={styles.image} />
              <div className={styles.cardInfo}>
                <h3 className={styles.name}>{prop.name}</h3>
                <div className={styles.cardSubInfo}>
                  <p className={styles.price}>{prop.price} €</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ModalCrepeSalee
          isOpen={crepeSaleeModalOpen}
          onRequestClose={() => toggleModal('Crêpe Salée')}
          user={userData}
        />
        <ModalCrepeSucree
          isOpen={crepeSucreeModalOpen}
          onRequestClose={() => toggleModal('Crêpe Sucrée')}
          user={userData}
        />
        <ModalMilkshake isOpen={milkshakeModalOpen} onRequestClose={() => toggleModal('Milkshake')} user={userData} />
        <ModalSmoothie isOpen={smoothieModalOpen} onRequestClose={() => toggleModal('Smoothie')} user={userData} />
        <ModalBubbleTea isOpen={bubbleTeaModalOpen} onRequestClose={() => toggleModal('Bubbletea')} user={userData} />
      </div>
      <Footer />
    </div>
  )
}

export default OrderPage
