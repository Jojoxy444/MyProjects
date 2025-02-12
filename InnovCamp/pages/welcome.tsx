import styles from "./welcome.module.css";
import { Navbar } from "../components/Navbar";

import React from "react";

const Home = () => {
  return (
    <>
      <header className={styles.header}>
        <Navbar />
      </header>

      <main className={styles.main}>
        <img
          className={styles.fond}
          src="../images_front/fond.png"
          alt="fond"
        />
        <h1 className={styles.welcome}>Welcome to my Portfolio !</h1>
      </main>

      <footer className={styles.footer}>
        <span className={styles.copyright}>&copy; 2024 Joan Chenot</span>
        <div className={styles.div_reseaux}>
          <a
            className={styles.reseaux}
            href="https://github.com/Jojoxy444/Projects"
          >
            <img
              className={styles.images_reseaux1}
              src="../images_front/github.png"
              alt="Github"
            />
          </a>
          <a
            className={styles.reseaux}
            href="https://www.linkedin.com/in/joan-chenot"
          >
            <img
              className={styles.images_reseaux2}
              src="../images_front/linkedin.png"
              alt="Linkedin"
            />
          </a>
          <a
            className={styles.reseaux}
            href="https://www.youtube.com/@Jojoxy/featured"
          >
            <img
              className={styles.images_reseaux3}
              src="../images_front/youtube.png"
              alt="Youtube"
            />
          </a>
        </div>
      </footer>
    </>
  );
};

export default Home;
