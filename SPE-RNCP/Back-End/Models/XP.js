const mongoose = require("mongoose");

const xpSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  subject: { type: String, required: true },
  xp: { type: Number, required: true },
});

module.exports = mongoose.model("XP", xpSchema);
