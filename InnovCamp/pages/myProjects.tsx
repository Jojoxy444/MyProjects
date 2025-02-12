import styles from "./myProjects.module.css";
import React, { useState, useEffect } from "react";

const Projects = () => {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("/api/getProjectData");
        if (response.ok) {
          const projects = await response.json();
          setProjectData(projects);
        } else {
          console.error("Failed to fetch project data:", await response.text());
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
      }
    };

    fetchProjects();
  }, []);

  const filteredProjects = projectData.filter(
    (project) => project.enabled === true
  );

  return (
    <>
      <header className={styles.header}>
        <div>
          <nav className={styles.navbar}>
            <img
              className={styles.logo}
              src="../images_front/LinkCartoon.png"
              alt="link"
            />
            <h1 className={styles.name}>Joan Chenot</h1>
            <div className={styles.liens}>
              <a className={styles.lien} href="/welcome">
                Home
              </a>
              <a className={styles.lien} href="/aboutMe">
                About Me
              </a>
              <a className={styles.lien} href="/myProjects">
                My Projects
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.personnelles}>My Projects</h1>
        <ul className={styles.list}>
          {filteredProjects.map((project) => (
            <li className={styles.item} key={project.id}>
              <h2>{project.title}</h2>
              <p>{project.description}</p>
              {project.picture && (
                <img
                  className={styles.images}
                  src={project.picture}
                  alt={project.title}
                />
              )}
              <p>Date de création : {project.date_created.substring(0, 10)}</p>
              <p>Dernier Update : {project.date_update.substring(0, 10)}</p>
            </li>
          ))}
        </ul>
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

export default Projects;
