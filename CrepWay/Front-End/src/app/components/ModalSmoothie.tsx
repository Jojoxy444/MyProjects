import React, { useEffect } from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import styles from '../styles/shop.module.css'

const Fruits = [
  { id: 1, name: 'Framboise', price: 0, image: 'framboise.png', category: 'Fruits' },
  { id: 2, name: 'Ananas', price: 0, image: 'ananas.png', category: 'Fruits' },
  { id: 3, name: 'Banane', price: 0, image: 'banane.png', category: 'Fruits' },
  { id: 4, name: 'Fraise', price: 0, image: 'fraise.png', category: 'Fruits' },
  { id: 5, name: 'Poire', price: 0, image: 'poire.png', category: 'Fruits' },
  { id: 6, name: 'Mangue', price: 0, image: 'mangue.png', category: 'Fruits' },
  { id: 7, name: 'Passion', price: 0, image: 'passion.png', category: 'Fruits' }
]

const menuItems = [{ type: 'Fruits (2 au choix)', items: Fruits }]

const ModalSmoothie = ({ isOpen, onRequestClose, user }: any) => {
  const [panier, setPanier] = useState([])
  const [totalPrice, setTotalPrice] = useState(3.9)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!isOpen) {
      setPanier([])
      setTotalPrice(3.9)
      setQuantity(1)
    }
  }, [isOpen])

  const handleCheckboxChange = (item) => {
    if (panier.some((cartItem) => cartItem.id === item.id)) {
      setPanier(panier.filter((cartItem) => cartItem.id !== item.id))
      setTotalPrice(totalPrice - item.price)
    } else if (panier.length < 2) {
      setPanier([...panier, { ...item, quantity: 1 }])
      setTotalPrice(totalPrice + item.price)
    }
  }

  const handleAddPanier = async () => {
    const commande = {
      productName: 'Smoothie',
      ingredients: panier.map((item: any) => ({ category: item.category, name: item.name })),
      unitPrice: totalPrice.toFixed(2),
      quantity: quantity,
      totalPrice: (totalPrice * quantity).toFixed(2),
      firstname: user.prenom,
      lastname: user.nom
    }

    console.log(commande)

    try {
      const response = await fetch('http://172.16.27.166:7777/api/addOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commande)
      })

      if (response.ok) {
        console.log('Commande ajoutée avec succès')
      } else {
        console.error("Erreur lors de l'ajout de la commande")
      }
    } catch (error) {
      console.error('Erreur lors de la communication avec le serveur', error)
    }

    onRequestClose()
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName={styles.overlay} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalHeaderText}>Compose ton smoothie</h1>
          <h1>Price : {(totalPrice * quantity).toFixed(2)} €</h1>
        </div>
        {menuItems.map((category) => (
          <div className={styles.modalMenu} key={category.type}>
            <h2 className={styles.category}>{category.type}</h2>
            {category.items.map((item) => (
              <div key={item.id} className={styles.menu_item}>
                <input
                  className={styles.checkbox}
                  type="checkbox"
                  checked={panier.some((cartItem) => cartItem.id === item.id)}
                  onChange={() => handleCheckboxChange(item)}
                  disabled={panier.length === 2 && !panier.some((cartItem) => cartItem.id === item.id)}
                />
                <h2>{item.name}</h2>
              </div>
            ))}
          </div>
        ))}
        <div className={styles.modalFooter}>
          <button className={styles.closeModal} onClick={onRequestClose}>
            x
          </button>
          <div className={styles.quantityContainer}>
            <button
              className={styles.quantityButton}
              onClick={() => setQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </button>
            <h1 className={styles.quantityNumber}>Quantité : {quantity}</h1>
            <button className={styles.quantityButton} onClick={() => setQuantity(quantity + 1)}>
              +
            </button>
          </div>
          <button className={styles.addpanier} onClick={handleAddPanier}>
            <Image
              className={styles.logoaddpanier}
              src="/addpanier.png"
              alt="Ajouter au panier"
              width={40}
              height={40}
            />
          </button>
        </div>
      </div>
    </Modal>
  )
}

export default ModalSmoothie
