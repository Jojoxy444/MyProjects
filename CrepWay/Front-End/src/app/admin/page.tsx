'use client'
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import styles from './admin.module.css'
import Header_Connected from '../components/Header_Connect'
import Footer from '../components/Footer'

const AdminPage = () => {
  const [orders, setOrders] = useState([])
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [filter, setFilter] = useState('all')

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
        console.log(data)
        const parsedData = data.map((commande) => ({
          id: commande.id,
          orderNumber: commande.id,
          customerName: `${commande.prenom} ${commande.nom}`,
          address: commande.adresse,
          phoneNumber: commande.telephone,
          status: 'current',
          produits: commande.produits.map((produitString) => JSON.parse(produitString))
        }))

        setOrders(parsedData)
        console.log(parsedData)
      } else {
        console.error('Erreur lors de la récupération des commandes :', response.statusText)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error)
    }
  }

  const handleValidateOrder = async () => {
    try {
      const response = await fetch('http://172.16.27.166:7777/api/validateOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ orderId: selectedOrder.id })
      })

      if (response.ok) {
        const updatedOrders = orders.map((order) => {
          if (order.id === selectedOrder.id) {
            return { ...order, status: 'validated' }
          }
          return order
        })
        setOrders(updatedOrders)
        setModalIsOpen(false)
        console.log('Commande validée avec succès')
      } else {
        console.error('Erreur lors de la validation de la commande:', response.statusText)
      }
    } catch (error) {
      console.error('Erreur lors de la validation de la commande:', error)
    }
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order)
    openModal()
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const filteredOrders =
    filter === 'all'
      ? orders
      : orders.filter((order) => {
          if (filter === 'current') {
            return !order.finished
          } else if (filter === 'past') {
            return order.finished
          } else {
            return true
          }
        })

  return (
    <div>
      <Header_Connected />
      <div className={styles.orderContainer}>
        <div className={styles.orderList}>
          <h2>Orders</h2>
          <div className={styles.orderWrapper}>
            {filteredOrders.map((order) => (
              <div key={order.id} className={styles.order} onClick={() => handleOrderClick(order)}>
                <p>Numéro de commande : {order.orderNumber}</p>
                <p>Nom : {order.customerName}</p>
                <p>Adresse : {order.address}</p>
                <p>Telephone : {order.phoneNumber}</p>
              </div>
            ))}
          </div>
        </div>

        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.modal}>
          {selectedOrder && (
            <div>
              <div className={styles.modalHeader}>
                <h2>Détails de la commande</h2>
                <button onClick={closeModal} className={styles.closeButton}>
                  X
                </button>
              </div>
              <p>Numéro de commande : {selectedOrder.orderNumber}</p>
              <p>Nom : {selectedOrder.customerName}</p>
              <p>Adresse : {selectedOrder.address}</p>
              <p>Telephone : {selectedOrder.phoneNumber}</p>
              <hr />
              <ul>
                {selectedOrder.produits.map((produit, index) => (
                  <li key={index}>
                    {produit.produit} x{produit.quantite} - Prix : {produit.prix_total} € <br />
                    {produit.ingredients ? produit.ingredients.join(', ') : 'Aucun ingrédient spécifié'}
                  </li>
                ))}
              </ul>
              <hr />
              <p>
                Total :{' '}
                {selectedOrder.produits
                  .reduce((total, produit) => total + parseFloat(produit.prix_total), 0)
                  .toFixed(2)}{' '}
                €
              </p>
              <button onClick={() => handleValidateOrder()} className={styles.validateBtn}>
                Valider la commande
              </button>
            </div>
          )}
        </Modal>
      </div>
      <Footer />
    </div>
  )
}

export default AdminPage
