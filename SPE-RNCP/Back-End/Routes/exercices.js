const express = require("express");
const router = express.Router();
const Exercices = require("../Models/Exercices");

router.get("/:level/:subject/:chapter", async (req, res) => {
  try {
    const { level, subject, chapter } = req.params;

    const exercice = await Exercices.findOne({
      niveau: level,
      matiere: subject,
      chapitre: chapter,
    });

    if (!exercice || exercice.length === 0) {
      return res.status(404).json({
        message: "Aucun exercice trouvé pour ce niveau et cette matière",
      });
    }

    res.json(exercice);
  } catch (error) {
    console.error("Erreur lors de la récupération des exercices :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

module.exports = router;
