const mongoose = require("mongoose");
const Cours = require("../Models/Cours");
const dotenv = require("dotenv");

dotenv.config();

const mongoURI = process.env.MONGODB_URI;

mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à la base de données réussie !"))
  .catch((err) => console.error("Erreur de connexion :", err));

const addCourse = async (courseData) => {
  try {
    const course = new Cours(courseData);
    await course.save();
    console.log(`Cours ajouté : ${course.chapitre}`);
  } catch (error) {
    console.error("Erreur lors de l'ajout du cours :", error);
  }
};

const courseSlides = [
  {
    id: "1",
    titre: `Objectif : Trouver la notation symbolique d'un noyau`,
    exemple: `Le Bore (B)`,
  },
  {
    id: "2",
    titre: "Étape 1 : Trouver le nombre de protons",
    contenu:
      "Le nombre de protons correspond au numéro atomique (Z) de l'atome, c'est à dire sa place dans le tableau périodique",
    exemple: `Le Bore se situe à la cinquième place dans le tableau périodique, son nombre de protons est donc égale à 5`,
  },
  {
    id: "3",
    titre: "Étape 2 : Trouver le nombre de masse",
    contenu:
      "Le nombre de masse correspond au nombre total de nucléons d'un noyau, c'est à dire le nombre de protons + le nombre de neutrons",
    exemple:
      `Ici, le Bore possède 11 nucléons\n` +
      `On peut donc en déduire qu'il possède 11 - 5, soit 6 neutrons`,
  },
  {
    id: "4",
    titre: "Étape 3 : Ecrire la notation symbolique d'un noyau",
    contenu:
      `La notation symbolique d'un noyau s'écrit sous cette forme :\n` +
      `Au centre, le symbole du noyau\n` +
      `En haut à gauche, son nombre de masse\n` +
      `En bas à gauche, son numéro atomique`,
    exemple: `11\n` + `    B\n` + `5`,
  },
];

const run = async () => {
  const courseData = {
    niveau: "2nde",
    matiere: "Physique-Chimie",
    chapitre: "La notation symbolique d'un noyau",
    courseSlides: courseSlides,
  };

  await addCourse(courseData);
  mongoose.connection.close();
};

run();
