const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const authRoutes = require("./Routes/auth");
const coursRoutes = require("./Routes/cours");
const exercicesRoutes = require("./Routes/exercices");
const selectorRoutes = require("./Routes/selector");
const usersRoutes = require("./Routes/users");
const xpRoutes = require("./Routes/xp");
const questRoutes = require("./Routes/quests");

dotenv.config();

const app = express();
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connexion à la base de données réussie !"))
  .catch((err) => console.error("Erreur de connexion MongoDB : ", err));

app.use(
  cors({
    origin: "http://192.168.1.138:8081",
    methods: ["GET", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/cours", coursRoutes);
app.use("/api/exercices", exercicesRoutes);
app.use("/api/selector", selectorRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/xp", xpRoutes);
app.use("/api/quests", questRoutes);

const PORT = process.env.PORT || 4444;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
