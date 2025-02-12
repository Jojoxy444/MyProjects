export const login = async (email, password) => {
  try {
    const response = await fetch(`http://192.168.1.138:4444/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    })
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Erreur lors de la connexion :', error)
    throw error
  }
}
