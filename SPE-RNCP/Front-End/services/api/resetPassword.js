export const resetPassword = async (email, newPassword) => {
  const response = await fetch(`http://192.168.1.138:4444/api/users/reset-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, newPassword })
  })

  return await response.json()
}
