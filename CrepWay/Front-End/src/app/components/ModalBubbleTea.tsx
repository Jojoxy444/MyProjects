import React, { useEffect } from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import styles from '../styles/shop.module.css'

const Base = [{ id: 1, name: 'Thé vert', price: 0, image: 'the_vert.png', category: 'Base' }]

const Saveurs = [
  { id: 2, name: 'Pastèque', price: 0, image: 'pasteque.png', category: 'Saveurs' },
  { id: 3, name: 'Mangue', price: 0, image: 'mangue.png', category: 'Saveurs' },
  { id: 4, name: 'Passion', price: 0, image: 'passion.png', category: 'Saveurs' },
  { id: 5, name: 'Fraise', price: 0, image: 'fraise.png', category: 'Saveurs' },
  { id: 6, name: 'Melon', price: 0, image: 'melon.png', category: 'Saveurs' }
]

const Toppings = [
  { id: 7, name: 'Passion', price: 0, image: 'passion.png', category: 'Toppings' },
  { id: 8, name: 'Litchi', price: 0, image: 'litchi.png', category: 'Toppings' },
  { id: 9, name: 'Pomme', price: 0, image: 'pomme.png', category: 'Toppings' },
  { id: 10, name: 'Fraise', price: 0, image: 'fraise.png', category: 'Toppings' },
  { id: 11, name: 'Mangue', price: 0, image: 'mangue.png', category: 'Toppings' },
  { id: 12, name: 'Cassis', price: 0, image: 'cassis.png', category: 'Toppings' },
  { id: 13, name: 'Pastèque', price: 0, image: 'pasteque.png', category: 'Toppings' }
]

const menuItems = [
  { type: 'Bases', items: Base },
  { type: 'Saveurs', items: Saveurs },
  { type: 'Toppings', items: Toppings }
]

const ModalBubbleTea = ({ isOpen, onRequestClose, user }: any) => {
  const [selectedBase, setSelectedBase] = useState(null)
  const [panier, setPanier] = useState([])
  const [totalPrice, setTotalPrice] = useState(5.0)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!isOpen) {
      setPanier([])
      setTotalPrice(5.0)
      setQuantity(1)
      setSelectedBase(null)
    }
  }, [isOpen])

  const handleCheckboxChange = (item) => {
    if (panier.some((cartItem) => cartItem.id === item.id)) {
      setPanier(panier.filter((cartItem) => cartItem.id !== item.id))
      setTotalPrice(totalPrice - item.price)
    } else {
      setPanier([...panier, { ...item, quantity: 1 }])
      setTotalPrice(totalPrice + item.price)
    }
  }

  const handleAddPanier = async () => {
    const commande = {
      productName: 'Bubble tea',
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

  const handleBaseChange = (base) => {
    setSelectedBase(base)
    setPanier([base])
    setTotalPrice(totalPrice + base.price)
  }

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} overlayClassName={styles.overlay} className={styles.modal}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h1 className={styles.modalHeaderText}>Compose ton bubble tea</h1>
          <h1>Price : {(totalPrice * quantity).toFixed(2)} €</h1>
        </div>
        {menuItems.map((category) => (
          <div className={styles.modalMenu} key={category.type}>
            <h2 className={styles.category}>{category.type}</h2>
            {category.items.map((item) => (
              <div key={item.id} className={styles.menu_item}>
                {category.type === 'Bases' ? (
                  <input
                    className={styles.radio}
                    type="radio"
                    id={item.id}
                    name="base"
                    checked={selectedBase && selectedBase.id === item.id}
                    onChange={() => handleBaseChange(item)}
                  />
                ) : (
                  <input
                    className={styles.checkbox}
                    type="checkbox"
                    checked={panier.some((cartItem) => cartItem.id === item.id)}
                    onChange={() => handleCheckboxChange(item)}
                  />
                )}
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

export default ModalBubbleTea
