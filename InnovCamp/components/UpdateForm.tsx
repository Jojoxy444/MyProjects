import React, { useState, useEffect } from "react";
import styles from "./UpdateForm.module.css";

const UpdateFormMe = ({ formDataMe, onUpdateSubmitMe, onCloseMe }) => {
  const [updatedDataMe, setUpdatedDataMe] = useState(formDataMe);

  useEffect(() => {
    setUpdatedDataMe(formDataMe);
  }, [formDataMe]);

  const handleInputChangeMe = (key, value) => {
    setUpdatedDataMe((prevDataMe) => ({ ...prevDataMe, [key]: value }));
  };

  return (
    <div>
      <h2>Update Me</h2>
      <label>
        First Name :
        <input
          type="text"
          value={updatedDataMe.firstname}
          onChange={(e) => handleInputChangeMe("firstname", e.target.value)}
        />
      </label>
      {/* Ajouter d'autres champs d'entrée pour les données restantes */}
      <button onClick={() => onUpdateSubmitMe(updatedDataMe)}>
        Submit Update
      </button>
      <button onClick={onCloseMe}>Close</button>
    </div>
  );
};

const UpdateFormProject = ({
  formDataProject,
  onUpdateSubmitProject,
  onCloseProject,
}) => {
  const [updatedDataProject, setUpdatedDataProject] = useState(formDataProject);

  useEffect(() => {
    setUpdatedDataProject(formDataProject);
  }, [formDataProject]);

  const handleInputChangeProject = (key, value) => {
    if (key === "enabled") {
      setUpdatedDataProject((prevDataProject) => ({
        ...prevDataProject,
        [key]: value === "true",
      }));
    } else {
      setUpdatedDataProject((prevDataProject) => ({
        ...prevDataProject,
        [key]: value,
      }));
    }
  };

  return (
    <div className={styles.update_form}>
      <h2>Update Project</h2>
      <label>
        Title:
        <br />
        <input
          type="text"
          value={updatedDataProject.title}
          className={styles.input}
          onChange={(e) => handleInputChangeProject("title", e.target.value)}
        />
      </label>
      <br />
      <label>
        Description:
        <br />
        <input
          type="text"
          value={updatedDataProject.description}
          className={styles.input}
          onChange={(e) =>
            handleInputChangeProject("description", e.target.value)
          }
        />
      </label>
      <br />
      <label>
        Picture:
        <br />
        <input
          type="text"
          value={updatedDataProject.picture}
          className={styles.input}
          onChange={(e) => handleInputChangeProject("picture", e.target.value)}
        />
      </label>
      <br />
      <label>
        Enabled:
        <br />
        <select
          value={updatedDataProject.enabled ? "true" : "false"}
          className={styles.input}
          onChange={(e) => handleInputChangeProject("enabled", e.target.value)}
        >
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      </label>
      <br />
      <button onClick={() => onUpdateSubmitProject(updatedDataProject)}>
        Submit Update
      </button>
      <button onClick={onCloseProject}>Close</button>
    </div>
  );
};
export { UpdateFormMe, UpdateFormProject };
