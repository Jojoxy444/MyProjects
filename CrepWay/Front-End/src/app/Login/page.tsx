'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from '../styles/Login.module.css'

const Login = () => {
  const [isLogin, setIsLogin] = useState(true)
  const router = useRouter()
  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [adresse, setAdresse] = useState('')
  const [telephone, setTelephone] = useState('')
  const [status, setStatus] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)
  const [adminPassword, setAdminPassword] = useState('')
  const [adminPasswordVisible, setAdminPasswordVisible] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  const toggleAdminPasswordVisibility = () => {
    setAdminPasswordVisible(!adminPasswordVisible)
  }

  const handleStatusChange = (e: any) => {
    setStatus(e.target.value)
  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    if (!email || !password) {
      setErrorMessage('Tous les champs sont obligatoires')
      return
    }

    try {
      const response = await fetch('http://192.168.15.33:7777/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      })
      const data = await response.json()
      if (response.ok) {
        setStatus(data.user.status)
        console.log(data.user)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/accueil')
      } else {
        setErrorMessage(data.message || 'Email ou mot de passe incorrect')
      }
    } catch (error) {
      console.error('Erreur lors de la connexion :', error)
      setErrorMessage('Erreur lors de la connexion')
    }
  }

  const handleRegister = async (e: any) => {
    e.preventDefault()
    if (!prenom || !nom || !email || !password || !confirmPassword || !adresse || !telephone || !status) {
      setErrorMessage('Tous les champs sont obligatoires')
      return
    }
    if (password !== confirmPassword) {
      setErrorMessage('Les mots de passe ne correspondent pas')
      return
    }

    try {
      const response = await fetch('http://172.16.27.166:7777/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ prenom, nom, email, password, adresse, telephone, status, adminPassword })
      })
      if (response.ok) {
        setIsLogin(!isLogin)
        console.log('Inscrit')
      } else {
        throw new Error('Impossible de créer le compte')
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
                    <p className={styles.label}>Prenom</p>
                    <input
                      className={styles.input}
                      type="text"
                      name="prenom"
                      value={prenom}
                      onChange={(e) => setPrenom(e.target.value)}
                      placeholder="Prenom"
                      required
                    />
                    <p className={styles.label}>Nom</p>
                    <input
                      className={styles.input}
                      type="text"
                      name="nom"
                      value={nom}
                      onChange={(e) => setNom(e.target.value)}
                      placeholder="Nom"
                      required
                    />
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
                    <p className={styles.label}>Adresse</p>
                    <input
                      className={styles.input}
                      type="text"
                      name="adresse"
                      value={adresse}
                      onChange={(e) => setAdresse(e.target.value)}
                      placeholder="Adresse"
                      required
                    />
                    <p className={styles.label}>Numéro de telephone</p>
                    <input
                      className={styles.input}
                      type="text"
                      name="telephone"
                      value={telephone}
                      onChange={(e) => setTelephone(e.target.value)}
                      placeholder="Numéro de telephone"
                      required
                    />
                    <p className={styles.label}>Sélectionnez votre rôle</p>
                    <select className={styles.input} value={status} type="password" onChange={handleStatusChange}>
                      <option value="utilisateur">Utilisateur</option>
                      <option value="administrateur">Administrateur</option>
                    </select>
                    {status === 'administrateur' && (
                      <>
                        <p className={styles.label}>Mot de passe Administrateur</p>
                        <div className={styles.passwordField}>
                          <input
                            className={styles.input}
                            type={adminPasswordVisible ? 'text' : 'password'}
                            name="secretPassword"
                            placeholder="Secret Password"
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                            required
                          />
                          <div className={styles.eyeIconContainer} onClick={toggleAdminPasswordVisibility}>
                            {adminPasswordVisible ? (
                              <img src="/login_eye_on.svg" alt="Show Password" className={styles.eyeIcon} />
                            ) : (
                              <img src="/login_eye_off.svg" alt="Hide Password" className={styles.eyeIcon} />
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    {errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}
                    <button className={styles.input} onClick={handleRegister} type="submit">
                      Inscription
                    </button>
                  </form>
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
            Bienvenue sur <span style={{ color: '#fbeb00' }}>Crep'Way</span>!{' '}
          </h2>
          <p>
            Votre destination gourmande pour des délices savoureux et rapides ! Connectez-vous dès maintenant pour
            découvrir notre menu délicieux et varié, rempli de crêpes fraîches et de garnitures alléchantes. Que vous
            soyez un amateur de sucré ou de salé, nous avons quelque chose pour satisfaire toutes vos envies.
            Rejoignez-nous pour une expérience culinaire inoubliable chez Crep'Way !
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
