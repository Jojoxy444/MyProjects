const mongoose = require("mongoose");
const Exercice = require("../Models/Exercices");
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

const addExercice = async (exerciceData) => {
  try {
    const exercice = new Exercice(exerciceData);
    await exercice.save();
    console.log(`Exercice ajouté : ${exercice.enonce}`);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'exercice :", error);
  }
};

const exerciceData = {
  niveau: "2nde",
  matiere: "Physique-Chimie",
  chapitre: "La notation symbolique d'un noyau",
  enonce:
    "Quelle est la composition du noyau d'aliminium,\n en sachant que son numéro atomique est Z = 13\n et que son nombre de masse est A = 27",
  choix: [
    "Il possède 13 protons et 27 neutrons",
    "Il possède 27 protons et 13 neutrons",
    "Il possède 13 protons et 14 neutrons",
    "Il possède 14 protons et 13 neutrons",
  ],
  reponse: "Il possède 13 protons et 14 neutrons",
};

const run = async () => {
  await addExercice(exerciceData);
  mongoose.connection.close();
};

run();
