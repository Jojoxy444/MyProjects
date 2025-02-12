const express = require("express");
const router = express.Router();
const XP = require("../Models/XP");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const userXP = await XP.find({ userId });
    res.status(200).json(userXP);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération de l'XP des matières de l'utilisateur : ",
      error
    );
    res.status(500).json({
      message:
        "Erreur lors de la récupération de l'XP des matières de l'utilisateur",
    });
  }
});

router.post("/add", async (req, res) => {
  const { userId, subject, xp } = req.body;

  if (!userId || !subject || !xp) {
    return res.status(400).json({ message: "Données manquantes" });
  }

  try {
    let userXP = await XP.findOne({ userId, subject });

    if (userXP) {
      userXP.xp += xp;
    } else {
      userXP = new XP({ userId, subject, xp });
    }

    await userXP.save();

    res.status(200).json({ message: "XP ajouté avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout d'XP : ", error);
    res.status(500).json({ message: "Erreur lors de l'ajout d'XP" });
  }
});

module.exports = router;
