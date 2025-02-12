const express = require("express");
const router = express.Router();
const Users = require("../Models/Users");
const bcrypt = require("bcryptjs");

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await Users.findById(userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'utilisateur : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
});

router.put("/:userId", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  try {
    const user = await Users.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    if (firstname) user.firstname = firstname;
    if (lastname) user.lastname = lastname;
    if (email) user.email = email;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }
    await user.save();

    res.json({ message: "Utilisateur mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'utilisateur : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour de l'utilisateur" });
  }
});

router.post("/reset-password", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await Users.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({
      success: true,
      message: "Mot de passe réinitialisé avec succès",
    });
  } catch (error) {
    console.error(
      "Erreur lors de la réinitialisation du mot de passe : ",
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la réinitialisation du mot de passe" });
  }
});

router.delete("/:userId", async (req, res) => {
  try {
    const user = await Users.findByIdAndDelete(req.params.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ message: "Utilisateur supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'utilisateur : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de l'utilisateur" });
  }
});

module.exports = router;
