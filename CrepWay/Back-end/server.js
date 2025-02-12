const express = require("express");
const cors = require("cors");
const app = express();
app.use(express.json());

require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
  user: "joan",
  host: "localhost",
  database: "CrepWay",
  password: "jojoxy",
  port: 5432,
});

app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let result = await pool.query(
      "SELECT id, prenom, nom, email, password, adresse, telephone, 'utilisateur' AS status FROM utilisateurs WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      return res.status(200).json({ message: "Connexion réussie", user });
    }

    result = await pool.query(
      "SELECT id, prenom, nom, email, password, adresse, telephone, 'administrateur' AS status FROM administrateurs WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length > 0) {
      const user = result.rows[0];
      return res.status(200).json({ message: "Connexion réussie", user });
    }

    res.status(401).json({ message: "Email ou mot de passe incorrect" });
  } catch (error) {
    console.error("Erreur lors de la connexion :", error);
    res.status(500).json({ message: "Erreur lors de la connexion" });
  }
});

app.post("/api/register", async (req, res) => {
  const {
    prenom,
    nom,
    email,
    password,
    adresse,
    telephone,
    status,
    adminPassword,
  } = req.body;
  try {
    if (
      status === "administrateur" &&
      adminPassword !== process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(403)
        .json({ message: "Mot de passe administrateur incorrect" });
    }

    if (status === "administrateur") {
      await pool.query(
        "INSERT INTO administrateurs (prenom, nom, email, password, adresse, telephone) VALUES ($1, $2, $3, $4, $5, $6)",
        [prenom, nom, email, password, adresse, telephone]
      );
    } else if (status === "utilisateur") {
      await pool.query(
        "INSERT INTO utilisateurs (prenom, nom, email, password, adresse, telephone) VALUES ($1, $2, $3, $4, $5, $6)",
        [prenom, nom, email, password, adresse, telephone]
      );
    }

    res.status(201).json({ message: "Utilisateur inscrit avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    res
      .status(500)
      .json({ message: "Impossible de créer le compte utilisateur" });
  }
});

app.post("/api/addOrder", async (req, res) => {
  const {
    productName,
    ingredients,
    unitPrice,
    quantity,
    totalPrice,
    firstname,
    lastname,
  } = req.body;

  try {
    await pool.query(
      "INSERT INTO panier (produit, ingredients, prix_unitaire, quantite, prix_total, prenom, nom) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        productName,
        ingredients,
        unitPrice,
        quantity,
        totalPrice,
        firstname,
        lastname,
      ]
    );

    res.status(201).json({ message: "Commande ajoutée avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de la commande:", error);
    res.status(500).json({ message: "Impossible d'ajouter la commande" });
  }
});

app.get("/api/panier/:prenom/:nom", async (req, res) => {
  const { prenom, nom } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM panier WHERE prenom = $1 AND nom = $2",
      [prenom, nom]
    );

    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des commandes" });
  }
});

app.delete("/api/deleteOrder/:id", async (req, res) => {
  const commandeId = req.params.id;

  try {
    const result = await pool.query("DELETE FROM panier WHERE id = $1", [
      commandeId,
    ]);

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Commande supprimée avec succès" });
    } else {
      res.status(404).json({ message: "La commande n'a pas été trouvée" });
    }
  } catch (error) {
    console.error("Erreur lors de la suppression de la commande :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la suppression de la commande" });
  }
});

app.post("/api/validerPanier", async (req, res) => {
  const { produits, prixTotal, date, prenom, nom, adresse, telephone } =
    req.body;

  const formattedDate = new Date(date).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  try {
    await pool.query("DELETE FROM panier WHERE prenom = $1 AND nom = $2", [
      prenom,
      nom,
    ]);

    await pool.query(
      "INSERT INTO commandes (produits, prix, date, prenom, nom, adresse, telephone) VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [produits, prixTotal, formattedDate, prenom, nom, adresse, telephone]
    );

    res.status(201).json({ message: "Panier validé avec succès !" });
  } catch (error) {
    console.error("Erreur lors de la validation du panier :", error);
    res.status(500).json({ message: "Erreur lors de la validation du panier" });
  }
});

app.get("/api/admin/commandes", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM commandes");

    res.json(result.rows);
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes :", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des commandes" });
  }
});

app.post("/api/avis", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    await pool.query(
      "INSERT INTO avis (name, email, commentaire) VALUES ($1, $2, $3)",
      [name, email, message]
    );

    res.status(201).json({ message: "Avis ajouté avec succès" });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'avis :", error);
    res.status(500).json({ message: "Erreur lors de l'ajout de l'avis" });
  }
});

app.post("/api/validateOrder", async (req, res) => {
  const { orderId } = req.body;
  try {
    await pool.query("UPDATE commandes SET finished = true WHERE id = $1", [
      orderId,
    ]);
    res.status(200).json({ message: "Commande validée avec succès" });
  } catch (error) {
    console.error(
      "Erreur lors de la validation de la commande dans la base de données:",
      error
    );
    res.status(500).json({
      message:
        "Erreur lors de la validation de la commande dans la base de données",
    });
  }
});

const PORT = process.env.PORT || 7777;

app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
