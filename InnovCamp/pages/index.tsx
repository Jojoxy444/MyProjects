import React, { useState } from "react";
import { useRouter } from "next/router";
import styles from "./index.module.css";

const LoginForm = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = () => {
    const correctEmail = process.env.ADDRESS;
    const correctPassword = process.env.PASSWORD;

    if (email === correctEmail && password === correctPassword) {
      router.push("/welcome_admin");
    } else {
      setErrorMessage("Email ou Mot de passe incorrect");
    }
  };

  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <form className={styles.form}>
          <p className={styles.p}>Bienvenue</p>
          <input
            className={styles.input}
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className={styles.input}
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />
          <input
            className={styles.input}
            type="button"
            value="Connexion"
            onClick={handleLogin}
          />
          <br />
          <a className={styles.a} href="/welcome">
            Continuer en tant qu'invité
          </a>
          {errorMessage && <h1 className={styles.wrong}>{errorMessage}</h1>}
        </form>

        <div className={`${styles.drop} ${styles.drop1}`}></div>
        <div className={`${styles.drop} ${styles.drop2}`}></div>
        <div className={`${styles.drop} ${styles.drop3}`}></div>
        <div className={`${styles.drop} ${styles.drop4}`}></div>
        <div className={`${styles.drop} ${styles.drop}`}></div>
      </div>
    </main>
  );
};

export default LoginForm;
