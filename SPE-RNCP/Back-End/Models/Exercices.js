const mongoose = require("mongoose");

const exerciceSchema = new mongoose.Schema({
  niveau: { type: String, required: true },
  matiere: { type: String, required: true },
  chapitre: { type: String, required: true },
  enonce: { type: String, required: true },
  choix: { type: [String], required: true },
  reponse: { type: String, required: true },
});

module.exports = mongoose.model("Exercices", exerciceSchema);
