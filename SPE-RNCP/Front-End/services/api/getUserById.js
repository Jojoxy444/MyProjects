export const getUserById = async (userId) => {
  try {
    const response = await fetch(`http://192.168.1.138:4444/api/users/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération de l'utilisateur`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur :", error)
    throw error
  }
}
