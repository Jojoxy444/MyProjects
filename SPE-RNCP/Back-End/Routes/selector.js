const express = require("express");
const router = express.Router();
const Cours = require("../Models/Cours");

router.get("/niveaux", async (req, res) => {
  try {
    const niveaux = await Cours.distinct("niveau");

    if (!niveaux || niveaux.length === 0) {
      return res.status(404).json({
        message: "Aucun niveau trouvé.",
      });
    }

    const ordreNiveaux = [
      "6ème",
      "5ème",
      "4ème",
      "3ème",
      "2nde",
      "1ère",
      "Terminale",
    ];

    const niveauxTries = niveaux.sort((a, b) => {
      return ordreNiveaux.indexOf(a) - ordreNiveaux.indexOf(b);
    });

    res.json(niveauxTries);
  } catch (error) {
    console.error("Erreur lors de la récupération des niveaux :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

router.get("/matieres/:level", async (req, res) => {
  try {
    const { level } = req.params;

    const matieres = await Cours.find({ niveau: level }).distinct("matiere");

    if (!matieres || matieres.length === 0) {
      return res.status(404).json({
        message: "Aucune matière trouvée pour ce niveau.",
      });
    }

    res.json(matieres);
  } catch (error) {
    console.error("Erreur lors de la récupération des matières :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

router.get("/chapitres/:level/:subject", async (req, res) => {
  try {
    const { level, subject } = req.params;

    const chapitres = await Cours.find({
      niveau: level,
      matiere: subject,
    }).distinct("chapitre");

    if (!chapitres || chapitres.length === 0) {
      return res.status(404).json({
        message: "Aucun chapitre trouvé pour cette matière et ce niveau.",
      });
    }

    res.json(chapitres);
  } catch (error) {
    console.error("Erreur lors de la récupération des chapitres :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
