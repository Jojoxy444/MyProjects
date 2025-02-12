'use client'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import styles from '../styles/Order.module.css'

const OrderPage = () => {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [jwtToken, setJwtToken] = useState(null)

  useEffect(() => {
    fetch('http://localhost:9999/api/products')
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.data)
      })
      .catch((error) => console.error('Erreur lors de la récupération des produits:', error))
  }, [])

  useEffect(() => {
    const token = localStorage.getItem('ecommerce_jwt')
    if (token) {
      setJwtToken(token)
    }
  }, [])

  const addToCart = async (productId) => {
    const jwtToken = localStorage.getItem('ecommerce_jwt')

    if (!jwtToken) {
      console.error('Token JWT non trouvé')
      return
    }

    try {
      const response = await fetch(`http://localhost:9999/api/paniers/add/${productId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwtToken}`
        }
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error("Erreur lors de l'ajout au panier:", errorData.Message)
        alert(errorData.Message)
      } else {
        const data = await response.json()
        alert('Produit ajouté avec succès à votre panier')
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier:", error)
    }
  }

  const filteredProducts =
    selectedCategory === 'All' ? products : products.filter((prop) => prop.category === selectedCategory)

  return (
    <div>
      <Header />
      <div className={styles.container}>
        <div className={styles.categories}>
          <div className={styles.category} onClick={() => setSelectedCategory('All')}>
            Tous nos produits
          </div>
        </div>

        <div className={styles.propositionsContainer}>
          {filteredProducts.map((product, index) => (
            <div key={index} className={styles.proposition}>
              <div className={styles.cardInfo}>
                <h3 className={styles.name}>{product.name}</h3>
                <p className={styles.description}>{product.description}</p>
                <div className={styles.cardSubInfo}>
                  <p className={styles.price}>À partir de {product.price} €</p>
                  <button onClick={() => addToCart(product.id)}>Ajouter</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default OrderPage
