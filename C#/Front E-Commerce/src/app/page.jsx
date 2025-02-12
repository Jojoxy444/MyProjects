'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './styles/Login.module.css'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [role, setRole] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  const handleRoleChange = (e) => {
    setRole(e.target.value)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMessage('Tous les champs sont obligatoires')
      return
    }

    try {
      const response = await fetch('http://localhost:9999/api/auth/authentificate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()
      console.log(data)
      if (response.ok) {
        localStorage.setItem('ecommerce_jwt', data.token)
        console.log(localStorage)
        router.push('/accueil')
      } else {
        setErrorMessage(data.message || 'Email ou mot de passe incorrect')
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error)
      setErrorMessage('Erreur lors de la connexion')
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!email || !password || !confirmPassword || !role) {
      setErrorMessage('Tous les champs sont obligatoires')
      return
    }
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas')
      return
    }

    try {
      const response = await fetch('http://localhost:9999/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password, role })
      })

      const data = await response.json()
      if (response.ok) {
        setIsLogin(true)
      } else {
        setErrorMessage(data.message || 'Impossible de créer le compte')
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error)
      setErrorMessage('Impossible de créer le compte')
    }
  }

  const toggleForm = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.leftSide}>
        <div className={styles.cardContainer}>
          <div className={`${styles.card} ${isLogin ? styles.loginCard : ''}`}>
            <div className={`${styles.cardContent} ${isLogin ? styles.backface : ''}`}>
              {isLogin ? (
                <>
                  <form className={styles.form}>
                    <p className={styles.label}>Email</p>
                    <input
                      className={styles.input}
                      type="text"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                    <p className={styles.label}>Mot de passe</p>
                    <div className={styles.passwordField}>
                      <input
                        className={styles.input}
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Mot de passe"
                        required
                      />
                      <div className={styles.eyeIconContainer} onClick={togglePasswordVisibility}>
                        {passwordVisible ? (
                          <img src="/login_eye_on.svg" alt="Show Password" className={styles.eyeIcon} />
                        ) : (
                          <img src="/login_eye_off.svg" alt="Hide Password" className={styles.eyeIcon} />
                        )}
                      </div>
                    </div>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    <button onClick={handleLogin} className={styles.input} type="submit">
                      Connexion
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <form className={styles.form} action="#" method="post">
                    <p className={styles.label}>Email</p>
                    <input
                      className={styles.input}
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                    />
                    <p className={styles.label}>Mot de passe</p>
                    <div className={styles.passwordField}>
                      <input
                        className={styles.input}
                        type={passwordVisible ? 'text' : 'password'}
                        name="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className={styles.eyeIconContainer} onClick={togglePasswordVisibility}>
                        {passwordVisible ? (
                          <img src="/login_eye_on.svg" alt="Show Password" className={styles.eyeIcon} />
                        ) : (
                          <img src="/login_eye_off.svg" alt="Hide Password" className={styles.eyeIcon} />
                        )}
                      </div>
                    </div>
                    <p className={styles.label}>Confirmer le mot de passe</p>
                    <div className={styles.passwordField}>
                      <input
                        className={styles.input}
                        type={confirmPasswordVisible ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirmer le mot de passe"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                      <div className={styles.eyeIconContainer} onClick={toggleConfirmPasswordVisibility}>
                        {confirmPasswordVisible ? (
                          <img src="/login_eye_on.svg" alt="Show Password" className={styles.eyeIcon} />
                        ) : (
                          <img src="/login_eye_off.svg" alt="Hide Password" className={styles.eyeIcon} />
                        )}
                      </div>
                    </div>
                    <p className={styles.label}>Sélectionnez votre rôle</p>
                    <select className={styles.input} value={role} type="password" onChange={handleRoleChange}>
                      <option value="Utilisateur">Utilisateur</option>
                      <option value="Administrateur">Administrateur</option>
                    </select>
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                  </form>
                  <button className={styles.input} onClick={handleRegister} type="submit">
                    Inscription
                  </button>
                </>
              )}
              <p onClick={toggleForm} className={styles.toggleBtn}>
                {isLogin ? "Vous n'avez pas de compte ? Inscrivez-vous !" : 'Vous avez déjà un compte ? Connectez-vous'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.rightSide}>
        <div className={styles.text}>
          <h2>
            Bienvenue à <span style={{ color: '#E3D0AC' }}>La Whippinade</span>!{' '}
          </h2>
          <p>
            Votre destination gourmande pour des délices savoureux et rapides ! Connectez-vous dès maintenant pour
            découvrir notre menu délicieux et varié, rempli de crêpes fraîches et de garnitures alléchantes. Que vous
            soyez un amateur de sucré ou de salé, nous avons quelque chose pour satisfaire toutes vos envies.
            Rejoignez-nous pour une expérience culinaire inoubliable chez La Whippinade !
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
