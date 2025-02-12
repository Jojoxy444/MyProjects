export const updateDailyQuestsByType = async (userId, type, increment = 1) => {
  try {
    const response = await fetch(`http://192.168.1.138:4444/api/quests/updateDailyQuestsByType`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId, type, increment })
    })

    if (!response.ok) {
      throw new Error('Impossible de mettre à jour les quêtes')
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des quêtes : ', error)
  }
}
