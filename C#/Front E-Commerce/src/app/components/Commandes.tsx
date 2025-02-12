import React, { useEffect, useState } from 'react'
import styles from '../styles/Commandes.module.css'
import Modal from './Modal'

const Commandes = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [currentData, setCurrentData] = useState(null)
  const [commandes, setCommandes] = useState([])

  const handleOnclick = (commande) => {
    setCurrentData(commande)
    setIsOpen(true)
  }

  useEffect(() => {
    fetchCommandes()
    const interval = setInterval(fetchCommandes, 2000)
    return () => clearInterval(interval)
  }, [])

  const fetchCommandes = async () => {
    try {
      const response = await fetch('http://172.16.27.166:7777/api/admin/commandes')
      if (response.ok) {
        const data = await response.json()
        const parsedData = data.map((commande) => ({
          ...commande,
          produits: commande.produits.map((produit) => JSON.parse(produit))
        }))
        setCommandes(parsedData)
      } else {
        console.error('Erreur lors de la récupération des commandes :', response.statusText)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error)
    }
  }

  return (
    <div>
      <div className={styles.ordersContainer}>
        {commandes.map((commande) => (
          <div key={commande.id} className={styles.orderBlock} onClick={() => handleOnclick(commande)}>
            <div className={styles.orderNumber}>Commande N° {commande.id}</div>
            <ul className={styles.orderItems}>
              {commande.produits.slice(0, 3).map((produit, index) => (
                <li key={index}>{produit.produit}</li>
              ))}
              {commande.produits.length > 3 && <li>...</li>}
            </ul>
            <div className={styles.orderPrice}>{commande.prix} €</div>
          </div>
        ))}
      </div>
      <Modal isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
        {currentData && (
          <>
            <h1 className={styles.commande}>Commande N°{currentData.id}</h1>
            <div className={styles.containerModalprice}>
              Prix de la commande <h1 className={styles.Modalprice}>: {currentData.prix} €</h1>
            </div>
            <div className={styles.localisations}>
              <h1>
                Client: {currentData.prenom} {currentData.nom}
              </h1>
              <h1>Adresse de livraison : {currentData.adresse}</h1>
              <h1>Numéro de téléphone: {currentData.telephone}</h1>
            </div>
            <ul className={styles.Modalitems}>
              {currentData.produits.map((produit, index) => (
                <li key={index}>- {produit.produit}</li>
              ))}
            </ul>
          </>
        )}
      </Modal>
    </div>
  )
}

export default Commandes
