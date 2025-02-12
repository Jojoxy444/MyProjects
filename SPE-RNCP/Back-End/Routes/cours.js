const express = require("express");
const router = express.Router();
const Cours = require("../Models/Cours");

router.get("/:level/:subject/:chapter", async (req, res) => {
  try {
    const { level, subject, chapter } = req.params;

    const cours = await Cours.find({
      niveau: level,
      matiere: subject,
      chapitre: chapter,
    });

    if (!cours || cours.length === 0) {
      return res.status(404).json({
        message: "Aucun cours trouvé pour ce niveau et cette matière.",
      });
    }

    res.json(cours);
  } catch (error) {
    console.error("Erreur lors de la récupération des cours :", error);
    res.status(500).json({ message: "Erreur serveur." });
  }
});

module.exports = router;
