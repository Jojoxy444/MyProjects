export const deleteUserById = async (userId) => {
  const response = await fetch(`http://192.168.1.138:4444/api/users/${userId}`, {
    method: 'DELETE'
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || 'Erreur lors de la suppression du compte')
  }

  return await response.json()
}
