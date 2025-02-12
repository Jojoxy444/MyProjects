import React, { useEffect } from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import styles from '../styles/shop.module.css'

const Indispensables = [
  { id: 1, name: 'Nutella', price: 0.8, image: 'nutella.png', category: 'Indispensables' },
  { id: 2, name: 'Crème speculos', price: 0.8, image: 'creme_speculos.png', category: 'Indispensables' },
  { id: 3, name: 'Bonne maman', price: 0.8, image: 'bonne_maman.png', category: 'Indispensables' },
  { id: 4, name: 'Amande', price: 0.8, image: 'amande.png', category: 'Indispensables' },
  { id: 5, name: 'Coco', price: 0.8, image: 'coco.png', category: 'Indispensables' },
  { id: 6, name: 'Speculos', price: 0.8, image: 'speculos.png', category: 'Indispensables' },
  { id: 7, name: 'Cookies', price: 0.8, image: 'cookies.png', category: 'Indispensables' },
  { id: 8, name: 'Miel', price: 0.8, image: 'miel.png', category: 'Indispensables' },
  { id: 9, name: 'Palet breton', price: 0.8, image: 'palet_breton.png', category: 'Indispensables' }
]

const Irrésistibles = [
  { id: 10, name: 'Caramel', price: 1.0, image: 'caramel.png', category: 'Irrésistibles' },
  { id: 11, name: 'Kinder country', price: 1.0, image: 'kinder_country.png', category: 'Irrésistibles' },
  { id: 12, name: 'Kinder bueno', price: 1.0, image: 'kinder_bueno.png', category: 'Irrésistibles' },
  { id: 13, name: 'Kinder maxi', price: 1.0, image: 'kinder_maxi.png', category: 'Irrésistibles' },
  { id: 14, name: 'Galak', price: 1.0, image: 'galak.png', category: 'Irrésistibles' },
  { id: 15, name: 'Milka', price: 1.0, image: 'milka.png', category: 'Irrésistibles' },
  { id: 16, name: 'Crunch', price: 1.0, image: 'crunch.png', category: 'Irrésistibles' },
  { id: 17, name: 'Crunch white', price: 1.0, image: 'crunch_white.png', category: 'Irrésistibles' },
  { id: 18, name: 'Haribo tagada', price: 1.0, image: 'haribo_tagada.png', category: 'Irrésistibles' },
  { id: 19, name: 'Choco bon', price: 1.0, image: 'choco_bon.png', category: 'Irrésistibles' },
  { id: 20, name: 'Daim', price: 1.0, image: 'daim.png', category: 'Irrésistibles' },
  { id: 21, name: 'Snickers', price: 1.0, image: 'snickers.png', category: 'Irrésistibles' },
  { id: 22, name: 'Kit kat', price: 1.0, image: 'kit_kat.png', category: 'Irrésistibles' },
  { id: 23, name: 'Oreo', price: 1.0, image: 'oreo.png', category: 'Irrésistibles' },
  { id: 24, name: 'Twix', price: 1.0, image: 'twix.png', category: 'Irrésistibles' },
  { id: 25, name: 'Brownie', price: 1.0, image: 'brownie.png', category: 'Irrésistibles' },
  { id: 26, name: 'Bueno white', price: 1.0, image: 'bueno_white.png', category: 'Irrésistibles' }
]

const Fruits = [
  { id: 27, name: 'Framboise', price: 1.0, image: 'framboise.png', category: 'Fruits' },
  { id: 28, name: 'Banane', price: 1.0, image: 'banane.png', category: 'Fruits' },
  { id: 29, name: 'Fraise', price: 1.0, image: 'fraise.png', category: 'Fruits' },
  { id: 30, name: 'Poire', price: 1.0, image: 'poire.png', category: 'Fruits' }
]

const menuItems = [
  { type: 'Indispensables', items: Indispensables },
  { type: 'Irrésistibles', items: Irrésistibles },
  { type: 'Fruits', items: Fruits }
]

const ModalMilkshake = ({ isOpen, onRequestClose, user }: any) => {
  const [panier, setPanier] = useState([])
  const [totalPrice, setTotalPrice] = useState(2.9)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!isOpen) {
      setPanier([])
      setTotalPrice(2.9)
      setQuantity(1)
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
      productName: 'Milkshake',
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
          <h1 className={styles.modalHeaderText}>Compose ton milkshake</h1>
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
                />
                <h2>{item.name}</h2>
                <p>+ {item.price.toFixed(2)} €</p>
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

export default ModalMilkshake
