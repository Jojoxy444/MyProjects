'use client'
import { useState, useEffect } from 'react'
import Styles from './panier.module.css'
import Footer from '../components/Footer'
import Header from '../components/Header_Connect'
import { FaTrash } from 'react-icons/fa'

const Panier = () => {
  const [userData, setUserData] = useState(null)
  const [commandes, setCommandes] = useState([])

  useEffect(() => {
    const storedUserData = localStorage.getItem('user')
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData))
      fetchCommandes(JSON.parse(storedUserData))
    }
  }, [])

  const fetchCommandes = async (user) => {
    try {
      const response = await fetch(`http://172.16.27.166:7777/api/panier/${user.prenom}/${user.nom}`)
      if (response.ok) {
        const data = await response.json()
        const commandesAvecIngredients = data.map((commande) => {
          if (commande.ingredients) {
            const ingredientsParCategorie = {}
            commande.ingredients.forEach((ingredient) => {
              const parsedIngredient = JSON.parse(ingredient)
              if (!ingredientsParCategorie[parsedIngredient.category]) {
                ingredientsParCategorie[parsedIngredient.category] = []
              }
              ingredientsParCategorie[parsedIngredient.category].push(parsedIngredient.name)
            })
            const ingredientsAvecCategorie = Object.entries(ingredientsParCategorie).map(
              ([category, ingredients]) => `${category} : ${ingredients.join(', ')}`
            )
            return { ...commande, ingredientsAvecCategorie, showIngredients: false }
          } else {
            return { ...commande, ingredientsAvecCategorie: [], showIngredients: false }
          }
        })
        setCommandes(commandesAvecIngredients)
        console.log(commandesAvecIngredients)
      } else {
        console.error('Erreur lors de la récupération des commandes :', response.statusText)
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes :', error)
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

  const toggleIngredients = (id) => {
    const updatedItems = [...commandes]
    const index = updatedItems.findIndex((item) => item.id === id)
    if (index !== -1) {
      updatedItems[index].showIngredients = !updatedItems[index].showIngredients
      setCommandes(updatedItems)
    }
  }

  const deleteOrder = async (id) => {
    try {
      const response = await fetch(`http://172.16.27.166:7777/api/deleteOrder/${id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const updatedItems = commandes.filter((item) => item.id !== id)
        setCommandes(updatedItems)
        console.log(`La commande avec l'ID ${id} a été supprimée avec succès de la base de données.`)
      } else {
        console.error('Une erreur est survenue lors de la suppression de la commande :', response.statusText)
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la suppression de la commande :', error)
    }
  }

  const calculateTotalPrice = () => {
    let totalPrice = 0
    commandes.forEach((commande) => {
      totalPrice += parseFloat(commande.prix_unitaire) * parseInt(commande.quantite)
    })
    return totalPrice.toFixed(2)
  }

  const handleValiderPanier = async () => {
    try {
      const response = await fetch('http://172.16.27.166:7777/api/validerPanier', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          produits: commandes.map((commande) => ({
            produit: commande.produit,
            prix_unitaire: commande.prix_unitaire,
            quantite: commande.quantite,
            prix_total: (commande.prix_unitaire * commande.quantite).toFixed(2),
            ingredients: commande.ingredientsAvecCategorie
          })),
          prixTotal: calculateTotalPrice(),
          date: new Date().toISOString(),
          prenom: userData.prenom,
          nom: userData.nom,
          adresse: userData.adresse,
          telephone: userData.telephone
        })
      })

      if (response.ok) {
        fetchCommandes(userData)
        console.log('Le panier a été validé avec succès')
      } else {
        console.error('Une erreur est survenue lors de la validation du panier.')
      }
    } catch (error) {
      console.error('Une erreur est survenue lors de la validation du panier.')
      console.error('Erreur lors de la validation du panier :', error)
    }
  }

  return (
    <div>
      <Header />
      <div className={Styles.container}>
        <main className={Styles.main}>
          <h1 className={Styles.title}>Votre panier</h1>
          <div className={Styles.orderDetails}>
            {commandes.length === 0 ? (
              <p className={Styles.noCommandMessage}>Aucune commande trouvée pour le moment.</p>
            ) : (
              <div className={Styles.centerBlock}>
                <div className={Styles.orderedItems}>
                  {commandes.map((item) => (
                    <div key={item.id} className={Styles.item}>
                      <div className={Styles.itemHeader}>
                        <div className={Styles.itemName}>
                          <p>{item.produit}</p>
                          <div className={Styles.arrow} onClick={() => toggleIngredients(item.id)}>
                            {item.showIngredients ? '▼' : '▶'}
                          </div>
                        </div>
                        <div className={Styles.quantityControls}>
                          <button className={Styles.quantityBtn} onClick={() => decreaseQuantity(item.id)}>
                            -
                          </button>
                          <span className={Styles.quantity}>{item.quantite}</span>
                          <button className={Styles.quantityBtn} onClick={() => increaseQuantity(item.id)}>
                            +
                          </button>
                        </div>
                        <p className={Styles.itemPrice}>{(item.prix_unitaire * item.quantite).toFixed(2)} €</p>
                        <FaTrash className={Styles.deleteIcon} onClick={() => deleteOrder(item.id)}>
                          Supprimer
                        </FaTrash>
                      </div>
                      {item.showIngredients && item.ingredientsAvecCategorie && (
                        <div className={Styles.ingredient}>
                          <ul className={Styles.ingredientsList}>
                            {item.ingredientsAvecCategorie.map((ingredient, i) => (
                              <li key={i}>{ingredient}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className={Styles.totalPriceContainer}>
                  <p className={Styles.totalPriceText}>Total:</p>
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
