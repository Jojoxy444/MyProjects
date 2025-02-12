export const addXPToUser = async (userId, subject, xp) => {
  try {
    const response = await fetch(`http://192.168.1.138:4444/api/xp/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, subject, xp })
    })

    if (!response.ok) {
      throw new Error("Erreur lors de l'ajout d'XP")
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Erreur lors de l'ajout de l'XP : `, error)
    throw error
  }
}
