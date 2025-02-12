const mongoose = require("mongoose");

const questSchema = new mongoose.Schema({
  name: { type: String, required: true },
  goal: { type: Number, required: true },
  type: { type: String, required: true },
});

module.exports = mongoose.model("Quests", questSchema);
