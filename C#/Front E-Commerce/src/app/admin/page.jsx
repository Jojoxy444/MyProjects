'use client'
import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import styles from './admin.module.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

const AdminPage = () => {
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [newProductModalOpen, setNewProductModalOpen] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '' })

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:9999/api/products')
        const data = await response.json()
        if (response.ok) {
          setProducts(data.data)
        } else {
          console.error(data.message)
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits :', error)
      }
    }

    fetchProducts()
  }, [])

  const handleProductClick = (product) => {
    setSelectedProduct(product)
    openModal()
  }

  const openModal = () => {
    setModalIsOpen(true)
  }

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const openNewProductModal = (isEditMode = false, product = null) => {
    setEditMode(isEditMode)
    if (isEditMode && product) {
      setNewProduct({
        name: product.name,
        price: product.price,
        description: product.description
      })
      setSelectedProduct(product)
    }
    setNewProductModalOpen(true)
  }

  const closeNewProductModal = () => {
    setNewProductModalOpen(false)
    setNewProduct({ name: '', price: '', description: '' })
  }

  const handleAddNewProduct = async () => {
    try {
      const token = localStorage.getItem('ecommerce_jwt')
      console.log(token)

      const response = await fetch('http://localhost:9999/api/products/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          description: newProduct.description
        })
      })

      if (response.ok) {
        const data = await response.json()
        setProducts([...products, data.data])
        closeNewProductModal()
      } else {
        console.error('Erreur lors de l’ajout du produit')
      }
    } catch (error) {
      console.error('Erreur lors de l’ajout du produit :', error)
    }
  }

  const handleEditProduct = async () => {
    try {
      const token = localStorage.getItem('ecommerce_jwt')

      const response = await fetch(`http://localhost:9999/api/products/update/${selectedProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          description: newProduct.description
        })
      })

      if (response.ok) {
        const data = await response.json()
        const updatedProducts = products.map((product) => (product.id === selectedProduct.id ? data.data : product))
        setProducts(updatedProducts)
        closeNewProductModal()
      } else {
        console.error('Erreur lors de la modification du produit')
      }
    } catch (error) {
      console.error('Erreur lors de la modification du produit :', error)
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('ecommerce_jwt')

      const response = await fetch(`http://localhost:9999/api/products/delete/${productId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      if (response.ok) {
        setProducts(products.filter((product) => product.id !== productId))
      } else {
        console.error('Erreur lors de la suppression du produit')
      }
    } catch (error) {
      console.error('Erreur lors de la suppression du produit :', error)
    }
  }

  return (
    <div>
      <Header />
      <div className={styles.productContainer}>
        <div className={styles.productList}>
          <h2>Produits</h2>
          <div className={styles.productWrapper}>
            {products.map((product) => (
              <div key={product.id} className={styles.product}>
                <div className={styles.cardContent} onClick={() => handleProductClick(product)}>
                  <p className={styles.cardName}>{product.name}</p>
                  <p className={styles.cardPrice}>{product.price} €</p>
                </div>
                <div className={styles.cardActions}>
                  <button onClick={() => openNewProductModal(true, product)} className={styles.editBtn}>
                    <img src="/addProduct.svg" alt="Modifier le produit" />
                  </button>
                  <button onClick={() => handleDeleteProduct(product.id)} className={styles.deleteBtn}>
                    <img src="/deleteProduct.svg" alt="Supprimer le produit" />
                  </button>
                </div>
              </div>
            ))}
            <div className={styles.addCard} onClick={() => openNewProductModal(false)}>
              <p className={styles.plusSign}>+</p>
            </div>
          </div>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          className={styles.modal}
          overlayClassName={styles.modalOverlay}
        >
          {selectedProduct && (
            <div>
              <div className={styles.modalHeader}>
                <h2>{selectedProduct.name}</h2>
                <button onClick={closeModal} className={styles.closeButton}>
                  X
                </button>
              </div>
              <p>Description: {selectedProduct.description}</p>
              <p>Prix: {selectedProduct.price} €</p>
            </div>
          )}
        </Modal>

        <Modal
          isOpen={newProductModalOpen}
          onRequestClose={closeNewProductModal}
          className={styles.modal}
          overlayClassName={styles.modalOverlay}
        >
          <div className={styles.modalHeader}>
            <h2>{editMode ? 'Modifier le produit' : 'Ajouter un nouveau produit'}</h2>
            <button onClick={closeNewProductModal} className={styles.closeButton}>
              X
            </button>
          </div>
          <div className={styles.modalBody}>
            <label>
              Nom:
              <input
                type="text"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </label>
            <label>
              Prix:
              <input
                type="number"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={newProduct.description}
                onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
              />
            </label>
            <button onClick={editMode ? handleEditProduct : handleAddNewProduct} className={styles.addBtn}>
              {editMode ? 'Modifier le produit' : 'Ajouter le produit'}
            </button>
          </div>
        </Modal>
      </div>
      <Footer />
    </div>
  )
}

export default AdminPage
