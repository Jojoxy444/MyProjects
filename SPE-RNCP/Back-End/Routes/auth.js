const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../Models/Users");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "L'email est déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    res.status(201).json({ message: "Utilisateur inscrit avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res
      .status(500)
      .json({ message: "Impossible de créer le compte utilisateur" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      return res.status(200).json({ message: "Connexion réussie", user });
    }

    return res.status(401).json({ message: "Email ou mot de passe incorrect" });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    return res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

module.exports = router;
