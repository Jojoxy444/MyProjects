const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

const { Pool } = require("pg");

const pool = new Pool({
  user: "joan",
  host: "localhost",
  database: "Gamedexdb",
  password: "jojoxy",
  port: 5432,
});

app.use(
  cors({
    origin: "http://172.16.27.166:8081",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/api/register", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  try {
    await pool.query(
      "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)",
      [firstname, lastname, email, password]
    );
    res.status(201).json({ message: "Utilisateur inscrit avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res
      .status(500)
      .json({ message: "Impossible de créer le compte utilisateur" });
  }
});

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      "SELECT id, firstname, lastname, email, picture FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );
    if (result.rows.length > 0) {
      const user = result.rows[0];
      res.status(200).json({ message: "Connexion réussie", user });
    } else {
      res.status(401).json({ message: "Email ou mot de passe incorrect" });
    }
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

app.get("/api/favorite/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const result = await pool.query(
      "SELECT favoritegames FROM users WHERE id = $1",
      [userId]
    );
    if (result.rows.length > 0) {
      const favoriteGames = result.rows[0].favoritegames;
      res.status(200).json({ favoriteGames });
    } else {
      res.status(404).json({ message: "Utilisateur non trouvé" });
    }
  } catch (error) {
    console.error("Erreur lors de la récupération des jeux favoris :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des jeux favoris" });
  }
});

app.post("/api/favorite/add", async (req, res) => {
  const { userId, gameId } = req.body;
  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await pool.query(
      "UPDATE users SET favoritegames = array_append(favoritegames, $1) WHERE id = $2",
      [gameId, userId]
    );
    res.status(200).json({ message: "Jeu ajouté aux favoris avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout du jeu aux favoris:", error);
    res
      .status(500)
      .json({ message: "Erreur lors de l'ajout du jeu aux favoris" });
  }
});

app.post("/api/favorite/remove", async (req, res) => {
  const { userId, gameId } = req.body;
  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await pool.query(
      "UPDATE users SET favoritegames = array_remove(favoritegames, $1) WHERE id = $2",
      [gameId, userId]
    );
    res.status(200).json({ message: "Jeu retiré des favoris avec succès" });
  } catch (error) {
    console.error("Erreur lors du retrait du jeu des favoris:", error);
    res
      .status(500)
      .json({ message: "Erreur lors du retrait du jeu des favoris" });
  }
});

app.post("/api/updatePersonalInformations", async (req, res) => {
  const { userId, email, oldPassword, newPassword, newPicture } = req.body;
  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const user = userCheck.rows[0];
    if (newPassword && !oldPassword) {
      return res.status(400).json({
        message:
          "Veuillez fournir l'ancien mot de passe pour mettre à jour le mot de passe",
      });
    }

    if (oldPassword && newPassword && user.password !== oldPassword) {
      return res
        .status(400)
        .json({ message: "L'ancien mot de passe est incorrect" });
    }

    const updateValues = [];
    let updateQuery = "UPDATE users SET ";
    if (email) {
      updateQuery += "email = $1";
      updateValues.push(email);
    }
    if (newPassword) {
      if (email) updateQuery += ", ";
      updateQuery += "password = $" + (updateValues.length + 1);
      updateValues.push(newPassword);
    }
    if (newPicture) {
      if (email || newPassword) updateQuery += ", ";
      updateQuery += "picture = $" + (updateValues.length + 1);
      updateValues.push(newPicture);
    }
    updateQuery += " WHERE id = $" + (updateValues.length + 1);
    updateValues.push(userId);

    await pool.query(updateQuery, updateValues);
    res
      .status(200)
      .json({ message: "Informations personnelles mises à jour avec succès" });
  } catch (error) {
    console.error(
      "Erreur lors de la mise à jour des informations personnelles:",
      error
    );
    res.status(500).json({
      message: "Erreur lors de la mise à jour des informations personnelles",
    });
  }
});

app.post("/api/delete", async (req, res) => {
  const { userId } = req.body;
  try {
    const userCheck = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    if (userCheck.rows.length === 0) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    await pool.query("DELETE FROM users WHERE id = $1", [userId]);
    res.status(200).json({ message: "Compte supprimé avec succès" });
  } catch (error) {
    console.error(
      "Erreur lors de la suppression du compte utilisateur:",
      error
    );
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression du compte" });
  }
});

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
