const mongoose = require("mongoose");

const SlideSchema = new mongoose.Schema({
  id: { type: String, required: true },
  titre: { type: String, required: true },
  contenu: { type: String },
  exemple: { type: String },
});

const CoursSchema = new mongoose.Schema({
  niveau: { type: String, required: true },
  matiere: { type: String, required: true },
  chapitre: { type: String, required: true },
  courseSlides: [SlideSchema],
});

module.exports = mongoose.model("Cours", CoursSchema);
