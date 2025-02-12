const express = require("express");
const Quests = require("../Models/Quests");
const UserQuests = require("../Models/UserQuests");
const router = express.Router();

router.get("/getDailyQuests/:userId", async (req, res) => {
  const { userId } = req.params;
  const today = new Date().toLocaleDateString();

  try {
    let userQuests = await UserQuests.findOne({ userId, date: today });

    if (!userQuests) {
      const randomQuests = await Quests.aggregate([{ $sample: { size: 2 } }]);

      const newUserQuests = randomQuests.map((quest) => ({
        questId: quest._id,
        name: quest.name,
        goal: quest.goal,
        type: quest.type,
        progress: 0,
        completed: false,
      }));

      userQuests = new UserQuests({
        userId,
        quests: newUserQuests,
        date: today,
      });

      await userQuests.save();
    }

    res.json(userQuests.quests);
  } catch (error) {
    console.error("Erreur lors de la récupération des quêtes : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des quêtes" });
  }
});

router.post("/updateDailyQuestsByType", async (req, res) => {
  const { userId, type, increment = 1 } = req.body;

  try {
    const userQuests = await UserQuests.findOne({ userId });

    if (!userQuests) {
      return res
        .status(404)
        .json({ message: "Aucune quête trouvée pour cet utilisateur" });
    }

    let updated = false;

    userQuests.quests.forEach((quest) => {
      if (quest.type === type && !quest.completed) {
        quest.progress += increment;
        updated = true;

        if (quest.progress >= quest.goal) {
          quest.progress = quest.goal;
          quest.completed = true;
        }
      }
    });

    if (updated) {
      await userQuests.save();
      return res.json(userQuests.quests);
    } else {
      return res.status(200).json({ message: "Aucune quête à mettre à jour" });
    }
  } catch (error) {
    console.error("Erreur lors de la mise à jour des quêtes : ", error);
    res
      .status(500)
      .json({ message: "Erreur lors de la mise à jour des quêtes" });
  }
});

module.exports = router;
