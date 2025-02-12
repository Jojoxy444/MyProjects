export const fetchDailyQuests = async (userId, setQuests) => {
  try {
    const response = await fetch(`http://192.168.1.138:4444/api/quests/getDailyQuests/${userId}`)
    if (!response.ok) {
      throw new Error('Erreur lors de la récupération des quêtes')
    }
    const quests = await response.json()
    setQuests(quests)
  } catch (error) {
    console.error('Impossible de récupérer les quêtes :', error)
  }
}
