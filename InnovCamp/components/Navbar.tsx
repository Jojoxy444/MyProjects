import React from "react";
import styles from "./Navbar.module.css";

const Navbar = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <img
          className={styles.logo}
          src="../images_front/LinkCartoon.png"
          alt="link"
        />
        <h1 className={styles.name}>Joan Chenot</h1>
        <a className={styles.lien} href="/welcome">
          Home
        </a>
        <a className={styles.lien} href="/aboutMe">
          About Me
        </a>
        <a className={styles.lien} href="/myProjects">
          My Projects
        </a>
      </nav>
    </div>
  );
};

const Navbar_admin = () => {
  return (
    <div>
      <nav className={styles.navbar}>
        <img
          className={styles.logo}
          src="../images_front/LinkCartoon.png"
          alt="link"
        />
        <h1 className={styles.name}>Joan Chenot</h1>
        <a className={styles.lien} href="/welcome_admin">
          Home
        </a>
        <a className={styles.lien} href="/aboutMe_admin">
          About Me
        </a>
        <a className={styles.lien} href="/admin">
          My Projects
        </a>
      </nav>
    </div>
  );
};

export { Navbar, Navbar_admin };
