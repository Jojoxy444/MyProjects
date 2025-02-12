const mongoose = require("mongoose");

const userQuestSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  quests: [
    {
      questId: { type: mongoose.Schema.Types.ObjectId, ref: "Quest" },
      name: { type: String },
      goal: { type: Number },
      progress: { type: Number, default: 0 },
      type: { type: String },
      completed: { type: Boolean, default: false },
    },
  ],
  date: { type: String, required: true },
});

module.exports = mongoose.model("UserQuests", userQuestSchema);
