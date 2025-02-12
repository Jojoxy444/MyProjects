import React, { useEffect } from 'react'
import { useState } from 'react'
import Modal from 'react-modal'
import Image from 'next/image'
import styles from '../styles/shop.module.css'

const Bases = [
  { id: 1, name: 'Emmental', price: 0, image: 'emmental.png', category: 'Bases' },
  { id: 2, name: 'Mozzarella', price: 0, image: 'mozzarella.png', category: 'Bases' },
  { id: 3, name: 'Aucune Base', price: 0, image: '', category: 'Bases' }
]

const Fromages = [
  { id: 4, name: 'Emmental', price: 0.6, image: 'emmental.png', category: 'Fromages' },
  { id: 5, name: 'Mozzarella', price: 0.6, image: 'mozzarella.png', category: 'Fromages' },
  { id: 6, name: 'Cheddar', price: 0.6, image: 'cheddar.png', category: 'Fromages' },
  { id: 7, name: 'Chevre', price: 0.6, image: 'chevre.png', category: 'Fromages' },
  { id: 8, name: 'Boursin', price: 0.6, image: 'boursin.png', category: 'Fromages' },
  { id: 9, name: 'Vache qui rit', price: 0.6, image: 'vache_qui_rit.png', category: 'Fromages' },
  { id: 10, name: 'Reblochon', price: 0.6, image: 'reblochon.png', category: 'Fromages' },
  { id: 11, name: 'Raclette', price: 0.6, image: 'raclette.png', category: 'Fromages' }
]

const LegumesEtOeufs = [
  { id: 12, name: 'Oeuf', price: 0.5, image: 'oeuf.png', category: 'LegumesEtOeufs' },
  { id: 13, name: 'Champignons', price: 0.5, image: 'champignons.png', category: 'LegumesEtOeufs' },
  { id: 14, name: 'Poivrons', price: 0.5, image: 'poivrons.png', category: 'LegumesEtOeufs' },
  { id: 15, name: 'Pomme de terre', price: 0.5, image: 'pomme_de_terre.png', category: 'LegumesEtOeufs' },
  { id: 16, name: 'Olives noires', price: 0.5, image: 'olives_noires.png', category: 'LegumesEtOeufs' },
  { id: 17, name: 'Tomates', price: 0.5, image: 'tomates.png', category: 'LegumesEtOeufs' },
  { id: 18, name: 'Oignons frits', price: 0.5, image: 'oignons_frits.png', category: 'LegumesEtOeufs' },
  { id: 19, name: 'Oignons rouges', price: 0.5, image: 'oignons_rouges.png', category: 'LegumesEtOeufs' },
  { id: 20, name: 'Cornichons', price: 0.5, image: 'cornichons.png', category: 'LegumesEtOeufs' }
]

const ViandesEtPoissons = [
  { id: 21, name: 'Emincé de poulet', price: 1.2, image: 'emincé_de_poulet.png', category: 'ViandesEtPoissons' },
  { id: 22, name: 'Viande hachée', price: 1.2, image: 'viande_hachée.png', category: 'ViandesEtPoissons' },
  { id: 23, name: 'Bolognaise', price: 1.2, image: 'bolognaise.png', category: 'ViandesEtPoissons' },
  { id: 24, name: 'Merguez', price: 1.2, image: 'merguez.png', category: 'ViandesEtPoissons' },
  { id: 25, name: 'Kebab', price: 1.2, image: 'kebab.png', category: 'ViandesEtPoissons' },
  { id: 26, name: 'Thon', price: 1.2, image: 'thon.png', category: 'ViandesEtPoissons' },
  { id: 27, name: 'Cordon bleu', price: 1.2, image: 'cordon_bleu.png', category: 'ViandesEtPoissons' },
  { id: 28, name: 'Tenders', price: 1.2, image: 'tenders.png', category: 'ViandesEtPoissons' },
  { id: 29, name: 'Saumon', price: 2.2, image: 'saumon.png', category: 'ViandesEtPoissons' }
]

const Charcuteries = [
  { id: 30, name: 'Lardons', price: 1.2, image: 'bolognaise.png', category: 'Charcuteries' },
  { id: 31, name: 'Poulet fumé', price: 1.2, image: 'poulet_fumé.png', category: 'Charcuteries' },
  { id: 32, name: 'Jambon de dinde', price: 1.2, image: 'jambon_de_dinde.png', category: 'Charcuteries' },
  { id: 33, name: 'Bacon', price: 1.2, image: 'bacon.png', category: 'Charcuteries' },
  { id: 34, name: 'Salami', price: 1.2, image: 'salami.png', category: 'Charcuteries' },
  { id: 35, name: 'Chorizo', price: 1.2, image: 'chorizo.png', category: 'Charcuteries' }
]

const Sauces = [
  { id: 36, name: 'Poivre', price: 0.2, image: 'poivre.png', category: 'Sauces' },
  { id: 37, name: 'Harissa', price: 0.2, image: 'harissa.png', category: 'Sauces' },
  { id: 38, name: 'Barbecue', price: 0.2, image: 'barbecue.png', category: 'Sauces' },
  { id: 39, name: 'Crème fraiche', price: 0.2, image: 'crème_fraiche.png', category: 'Sauces' },
  { id: 40, name: 'Fish', price: 0.2, image: 'fish.png', category: 'Sauces' },
  { id: 41, name: 'Biggy', price: 0.2, image: 'biggy.png', category: 'Sauces' },
  { id: 42, name: 'Chili thai', price: 0.2, image: 'chili_thai.png', category: 'Sauces' },
  { id: 43, name: 'Cheesy', price: 0.2, image: 'cheesy.png', category: 'Sauces' },
  { id: 44, name: 'Mayonnaise', price: 0.2, image: 'mayonnaise.png', category: 'Sauces' },
  { id: 45, name: 'Curry', price: 0.2, image: 'curry.png', category: 'Sauces' },
  { id: 46, name: 'Samourai', price: 0.2, image: 'samourai.png', category: 'Sauces' },
  { id: 47, name: 'Blanche', price: 0.2, image: 'blanche.png', category: 'Sauces' },
  { id: 48, name: 'Algérienne', price: 0.2, image: 'algérienne.png', category: 'Sauces' },
  { id: 49, name: 'Andalouse', price: 0.2, image: 'andalouse.png', category: 'Sauces' },
  { id: 50, name: 'Ketchup', price: 0.2, image: 'ketchup.png', category: 'Sauces' },
  { id: 51, name: 'Tabasco', price: 0.2, image: 'tabasco.png', category: 'Sauces' },
  { id: 52, name: 'Moutarde', price: 0.2, image: 'moutarde.png', category: 'Sauces' }
]

const menuItems = [
  { type: 'Bases', items: Bases },
  { type: 'Fromages', items: Fromages },
  { type: 'Legumes et Oeufs', items: LegumesEtOeufs },
  { type: 'Viandes et Poissons', items: ViandesEtPoissons },
  { type: 'Charcuteries', items: Charcuteries },
  { type: 'Sauces', items: Sauces }
]

const ModalCrepeSalee = ({ isOpen, onRequestClose, user }: any) => {
  const [selectedBase, setSelectedBase] = useState(null)
  const [panier, setPanier] = useState([])
  const [totalPrice, setTotalPrice] = useState(3.5)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    if (!isOpen) {
      setPanier([])
      setTotalPrice(3.5)
      setQuantity(1)
      setSelectedBase(null)
    }
  }, [isOpen])

  const handleCheckboxChange = (item: any) => {
    if (item.category === 'Bases') {
      setPanier([item])
      setTotalPrice(item.price)
    } else {
      if (panier.some((cartItem: any) => cartItem.id === item.id)) {
        setPanier(panier.filter((cartItem: any) => cartItem.id !== item.id))
        setTotalPrice(totalPrice - item.price)
      } else {
        setPanier([...panier, { ...item, quantity: 1 }])
        setTotalPrice(totalPrice + item.price)
      }
    }
  }

  const handleBaseChange = (base: any) => {
    setSelectedBase(base)
    setPanier([base])
    setTotalPrice(totalPrice + base.price)
  }

  const handleAddPanier = async () => {
    const commande = {
      productName: 'Crêpe salée',
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
          <h1 className={styles.modalHeaderText}>Compose ta crêpe salée</h1>
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
                    disabled={item.category === 'Bases' && panier.length > 0 && panier[0].id !== item.id}
                  />
                )}
                <h2>{item.name}</h2>
                {category.type !== 'Bases' && <p>+ {item.price.toFixed(2)} €</p>}
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

export default ModalCrepeSalee
