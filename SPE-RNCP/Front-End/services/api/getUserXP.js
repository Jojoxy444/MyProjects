export const getUserXP = async (userId) => {
  try {
    const response = await fetch(`http://192.168.1.138:4444/api/xp/${userId}`)

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des XP des matières de l'utilisateur`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error(`Erreur lors de la récupération des XP des matières de l'utilisateur : `, error)
    return []
  }
}
