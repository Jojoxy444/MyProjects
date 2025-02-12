import styles from "./aboutMe.module.css";
import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import React from "react";

const Home = () => {
  const [meData, setMeData] = useState(null);

  const handleDownload = async () => {
    const response = await fetch("/cv/cv.pdf");
    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "cv.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    fetch("/api/getMeData")
      .then((response) => response.json())
      .then((data) => setMeData(data))
      .catch((error) => console.error("Error fetching data:", error));
    console.log(meData);
  }, []);
  return (
    <>
      <header className={styles.header}>
        <Navbar />
      </header>

      <main className={styles.main}>
        <h1 className={styles.personnelles}>Informations Personnelles</h1>
        {meData && (
          <>
            <div className={styles.data}>
              <img
                className={styles.info}
                src="../images_front/info.png"
                alt="info"
              />
              <div className={styles.data_me}>
                <h1>{meData.firstname}</h1>
                <h1>{meData.lastname}</h1>
                <h1>{meData.birth_date}</h1>
                <h1>{meData.description}</h1>
              </div>
              <img
                className={styles.phone}
                src="../images_front/phone.png"
                alt="contact"
              />
              <div className={styles.data_contact}>
                <h1>{meData.email}</h1>
                <h1>{meData.phone}</h1>
              </div>
              <img
                className={styles.address}
                src="../images_front/address.gif"
                alt="address"
              />
              <div className={styles.data_address}>
                <h1>{meData.address}</h1>
                <h1>{meData.city}</h1>
                <h1>{meData.country}</h1>
              </div>
              <button className={styles.cv_button} onClick={handleDownload}>
                Télécharger le CV
              </button>
            </div>
          </>
        )}
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
