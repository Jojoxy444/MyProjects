'use client'
import { useState, useEffect } from 'react'
import Styles from './panier.module.css'
import Footer from '../components/Footer'
import Header from '../components/Header'
import { FaTrash } from 'react-icons/fa'
import jwt from 'jsonwebtoken'

const Panier = () => {
  const [commandes, setCommandes] = useState([])

  useEffect(() => {
    const storedToken = localStorage.getItem('ecommerce_jwt')
    if (storedToken) {
      const decodedToken = jwt.decode(storedToken)
      const userId = decodedToken.nameid
      fetchUserData(userId)
    }
  }, [])

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:9999/api/users/${userId}`)
      if (response.ok) {
        const data = await response.json()
        const user = data.data
        const panierIds = user.panier
        fetchProducts(panierIds)
      } else {
        console.error("Erreur lors de la récupération des informations de l'utilisateur :", response.statusText)
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des informations de l'utilisateur :", error)
    }
  }

  const fetchProducts = async (ids) => {
    try {
      const products = await Promise.all(
        ids.map(async (id) => {
          const response = await fetch(`http://localhost:9999/api/products/${id}`)
          if (response.ok) {
            const data = await response.json()
            return {
              ...data.data,
              quantite: 1
            }
          } else {
            console.error(`Erreur lors de la récupération du produit avec l'ID ${id} :`, response.statusText)
            return null
          }
        })
      )
      setCommandes(products.filter((product) => product !== null))
    } catch (error) {
      console.error('Erreur lors de la récupération des produits :', error)
    }
  }

  const increaseQuantity = (id) => {
    const updatedItems = [...commandes]
    const index = updatedItems.findIndex((item) => item.id === id)
    if (index !== -1) {
      updatedItems[index].quantite += 1
      setCommandes(updatedItems)
    }
  }

  const decreaseQuantity = (id) => {
    const updatedItems = [...commandes]
    const index = updatedItems.findIndex((item) => item.id === id)
    if (index !== -1 && updatedItems[index].quantite > 1) {
      updatedItems[index].quantite -= 1
      setCommandes(updatedItems)
    }
  }

  const deleteOrder = async (id) => {
    try {
      const storedToken = localStorage.getItem('ecommerce_jwt')
      if (!storedToken) {
        console.error('Token non trouvé.')
        return
      }

      const response = await fetch(`http://localhost:9999/api/paniers/remove/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${storedToken}`
        }
      })

      if (response.ok) {
        const updatedItems = commandes.filter((item) => item.id !== id)
        setCommandes(updatedItems)
        console.log(`Le produit avec l'ID ${id} a été supprimé du panier avec succès.`)
      } else {
        const errorData = await response.json()
        console.error('Erreur lors de la suppression du produit :', errorData.Message || response.statusText)
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error)
    }
  }

  const handleValiderPanier = async () => {
    try {
      const storedToken = localStorage.getItem('ecommerce_jwt')
      if (!storedToken) {
        console.error('Token non trouvé.')
        return
      }

      await Promise.all(
        commandes.map(async (item) => {
          await deleteOrder(item.id)
        })
      )

      alert('Le panier a été vidé avec succès.')
    } catch (error) {
      console.error('Erreur lors de la validation du panier :', error)
    }
  }

  const calculateTotalPrice = () => {
    return commandes.reduce((total, item) => total + item.price * item.quantite, 0).toFixed(2)
  }

  return (
    <div>
      <Header />
      <div className={Styles.container}>
        <main className={Styles.main}>
          <h1 className={Styles.title}>Votre panier</h1>
          <div className={Styles.orderDetails}>
            {commandes.length === 0 ? (
              <p className={Styles.noCommandMessage}>Aucun produit ajouté au panier !</p>
            ) : (
              <div className={Styles.centerBlock}>
                <div className={Styles.orderedItems}>
                  {commandes.map((item) => (
                    <div key={item.id} className={Styles.item}>
                      <div className={Styles.itemHeader}>
                        <p className={Styles.itemName}>{item.name}</p>
                        <div className={Styles.quantityControls}>
                          <button className={Styles.quantityBtn} onClick={() => decreaseQuantity(item.id)}>
                            -
                          </button>
                          <span className={Styles.quantity}>{item.quantite}</span>
                          <button className={Styles.quantityBtn} onClick={() => increaseQuantity(item.id)}>
                            +
                          </button>
                        </div>
                        <p className={Styles.itemPrice}>{(item.price * item.quantite).toFixed(2)} €</p>
                        <FaTrash className={Styles.deleteIcon} onClick={() => deleteOrder(item.id)} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className={Styles.totalPriceContainer}>
                  <p className={Styles.totalPriceText}>Total :</p>
                  <p className={Styles.totalPrice}>{calculateTotalPrice()} €</p>
                </div>
                <button onClick={() => handleValiderPanier()} className={Styles.backLink}>
                  Valider le panier
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Panier
