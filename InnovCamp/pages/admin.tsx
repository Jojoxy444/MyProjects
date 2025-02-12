import styles from "./admin.module.css";
import React, { useState, useEffect } from "react";
import { UpdateFormProject } from "../components/UpdateForm";
import axios from "axios";
import Modal from "react-modal";
import { userInfo } from "os";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#modale_root");

const Projects = () => {
  const [meData, setMeData] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [formDataMe, setFormDataMe] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    birth_date: "",
    description: "",
  });
  const [formDataProject, setFormDataProject] = useState({
    title: "",
    description: "",
    picture: "",
  });
  const [updateFormDataMe, setUpdateFormDataMe] = useState({
    id: null,
    newData: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      birth_date: "",
      description: "",
    },
  });
  const [updateFormDataProject, setUpdateFormDataProject] = useState({
    id: null,
    newData: {
      title: "",
      description: "",
      picture: "",
    },
  });
  const [isUpdateFormMeVisible, setUpdateFormMeVisibility] = useState(false);
  const [isUpdateFormProjectVisible, setUpdateFormProjectVisibility] =
    useState(false);

  const [uploading, setUploading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(false);

  const fetchMeData = async () => {
    try {
      const response = await fetch("/api/getMeData");
      const MeData = await response.json();
      console.log("Fetched Me data:", MeData);
      setMeData(MeData);
    } catch (error) {
      console.error("Error fetching Me data:", error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch("/api/getProjectData");
      const ProjectData = await response.json();
      console.log("Fetched Project data:", ProjectData);
      setProjectData(ProjectData);
    } catch (error) {
      console.error("Error fetching Project data:", error);
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [isCreateProjectModalVisible, setCreateProjectModalVisibility] =
    useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const openCreateProjectModal = () => {
    setCreateProjectModalVisibility(true);
  };

  const closeCreateProjectModal = () => {
    setCreateProjectModalVisibility(false);
  };

  const [isEnabled, setisEnabled] = useState(true);

  useEffect(() => {
    fetchMeData();
    fetchProjects();
  }, []);

  const handleInputChangeMe = (key, value) => {
    setFormDataMe((prevDataMe) => ({ ...prevDataMe, [key]: value }));
  };

  const handleSaveMe = async () => {
    try {
      const response = await fetch("/api/createMe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataMe),
      });

      if (response.ok) {
        const newPost = await response.json();
        console.log("Post created successfully:", newPost);

        fetchMeData();
      } else {
        console.error("Failed to create post:", await response.text());
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleDeleteMe = async (id) => {
    try {
      const response = await fetch("/api/deleteMeData", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const deletedDataMe = await response.json();
        console.log("Data deleted successfully:", deletedDataMe);

        fetchMeData();
      } else {
        console.error("Failed to delete data:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleUpdateMe = (id) => {
    // Set the current data in the form for updating
    const currentDataMe = meData.find((meItem) => meItem.id === id);
    setUpdateFormDataMe({
      id,
      newData: { ...currentDataMe },
    });

    // Display the update form
    setUpdateFormMeVisibility(true);
  };

  const handleUpdateSubmitMe = async (updatedDataMe) => {
    try {
      const response = await fetch("/api/updateMeData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedDataMe.id,
          newMeData: updatedDataMe,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Data updated successfully:", updatedData);

        fetchMeData();
      } else {
        console.error("Failed to update data:", await response.text());
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }

    setUpdateFormMeVisibility(false);
  };

  const handleCloseUpdateFormMe = () => {
    setUpdateFormMeVisibility(false);
  };

  const handleInputChangeProject = (key, value) => {
    if (key === "enabled") {
      setisEnabled(value === "true" ? true : false);
    } else {
      setFormDataProject((prevDataProject) => ({
        ...prevDataProject,
        [key]: value,
      }));
    }
  };

  const handleSaveProject = async () => {
    try {
      let picturePath = "";

      if (selectedFile) {
        const formData = new FormData();
        const { data } = await axios.post("/api/UploadImage", formData);
        console.log(data);
      }
      const response = await fetch("/api/createProject", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formDataProject,
          enabled: isEnabled,
        }),
      });
      if (response.ok) {
        const newProject = await response.json();
        console.log("Project created successfully:", newProject);
        fetchProjects();
      } else {
        console.error("Failed to create project:", await response.text());
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  const handleDeleteProject = async (id) => {
    try {
      const response = await fetch("/api/deleteProject", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        const deletedProject = await response.json();
        console.log("Project deleted successfully:", deletedProject);

        fetchProjects();
      } else {
        console.error("Failed to delete project:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const handleUpdateProject = (id) => {
    const currentDataProject = projectData.find(
      (projectItem) => projectItem.id === id
    );
    setUpdateFormDataProject({
      id,
      newData: { ...currentDataProject },
    });
    setSelectedProjectId(id);
    setUpdateFormProjectVisibility(true);
  };

  const handleUpdateSubmitProject = async (updatedDataProject) => {
    try {
      const response = await fetch("/api/updateProjectData", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: updatedDataProject.id,
          newProjectData: updatedDataProject,
        }),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Data updated successfully:", updatedData);

        fetchProjects();
      } else {
        console.error("Failed to update data:", await response.text());
      }
    } catch (error) {
      console.error("Error updating data:", error);
    }

    setUpdateFormProjectVisibility(false);
  };

  const handleCloseUpdateFormProject = () => {
    setUpdateFormProjectVisibility(false);
    setSelectedProjectId(null);
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      if (!selectedFile) return;
      const formData = new FormData();
      formData.append("myImage", selectedFile);
      const { data } = await axios.post("/api/UploadImage", formData);
      console.log(data);

      setFormDataProject((prevDataProject) => ({
        ...prevDataProject,
        picture: `../images/${data.filename}.png`,
      }));
    } catch (error: any) {
      console.log(error.response?.data);
    }
    setUploading(false);
  };

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
              <a className={styles.lien} href="/welcome_admin">
                Home
              </a>
              <a className={styles.lien} href="/aboutMe_admin">
                About Me
              </a>
              <a className={styles.lien} href="/admin">
                My Projects
              </a>
            </div>
          </nav>
        </div>
      </header>

      <main className={styles.main}>
        <h1 className={styles.personnelles}>My Projects</h1>
        <ul className={styles.list}>
          {projectData.map((project) => (
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
              <button onClick={() => handleUpdateProject(project.id)}>
                Update
              </button>
              <button onClick={() => handleDeleteProject(project.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
        <div className={styles.create}>
          <button
            className={styles.create_button}
            onClick={openCreateProjectModal}
          >
            Create Project
          </button>
        </div>
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

      <div id="modale_root">
        <Modal
          isOpen={isCreateProjectModalVisible}
          onRequestClose={closeCreateProjectModal}
          style={customStyles}
          contentLabel="Create Project Modal"
          className={styles.create_modale}
        >
          <div className={styles.create_form}>
            <h2>Create Project</h2>
            <label>
              Title:
              <br />
              <input
                type="text"
                value={formDataProject.title}
                className={styles.input}
                onChange={(e) =>
                  handleInputChangeProject("title", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Description:
              <br />
              <input
                type="text"
                value={formDataProject.description}
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
                value={formDataProject.picture}
                className={styles.input}
                onChange={(e) =>
                  handleInputChangeProject("picture", e.target.value)
                }
              />
            </label>
            <br />
            <label>
              Enabled:
              <br />
              <select
                value={isEnabled ? "true" : "false"}
                className={styles.input}
                onChange={(e) =>
                  handleInputChangeProject("enabled", e.target.value)
                }
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </label>
          </div>
          <div>
            <button
              onClick={() => {
                handleSaveProject();
                closeCreateProjectModal();
              }}
            >
              Save Project
            </button>
            <button onClick={closeCreateProjectModal}>Close</button>
          </div>
        </Modal>

        <Modal
          isOpen={isUpdateFormProjectVisible}
          onRequestClose={handleCloseUpdateFormProject}
          style={customStyles}
          contentLabel="Update Project Modal"
          className={styles.update_modale}
        >
          {isUpdateFormProjectVisible && (
            <UpdateFormProject
              formDataProject={updateFormDataProject.newData}
              onUpdateSubmitProject={handleUpdateSubmitProject}
              onCloseProject={handleCloseUpdateFormProject}
            />
          )}
        </Modal>
      </div>
    </>
  );
};

export default Projects;
