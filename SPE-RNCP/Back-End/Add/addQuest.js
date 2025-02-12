require("dotenv").config();
const mongoose = require("mongoose");
const Quest = require("../Models/Quests");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((err) => console.error("Erreur de connexion à MongoDB", err));

const quests = [
  {
    name: "Réussir 3 exercices",
    goal: 3,
    type: "exercice",
  },
  {
    name: "Réussir 5 exercices",
    goal: 5,
    type: "exercice",
  },
  {
    name: "Lire 3 cours",
    goal: 3,
    type: "cours",
  },
  {
    name: "Lire 5 cours",
    goal: 5,
    type: "cours",
  },
];

const addQuests = async () => {
  try {
    const result = await Quest.insertMany(quests);
    console.log(`${result.length} quêtes ajoutées avec succès !`);
  } catch (error) {
    console.error("Erreur lors de l'ajout des quêtes :", error);
  } finally {
    mongoose.connection.close();
  }
};

addQuests();
