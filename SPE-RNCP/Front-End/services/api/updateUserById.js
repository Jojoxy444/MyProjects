export const updateUserById = async (userId, updatedData) => {
  try {
    const response = await fetch(`http://192.168.1.138:4444/api/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedData)
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || 'Erreur lors de la mise à jour des données')
    }

    return await response.json()
  } catch (error) {
    console.error('Erreur updateUserById:', error)
    throw error
  }
}
