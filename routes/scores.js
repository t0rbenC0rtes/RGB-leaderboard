const express = require("express");
const Score = require("../models/Score"); // Ensure this path is correct
const router = express.Router();

// POST: Save new score
router.post("/", async (req, res) => {
  console.log("Received POST request:", req.body); // Add this line for debugging

  try {
    const { name, score } = req.body;

    if (!name || !score) {
      console.log("❌ Missing name or score"); // Debugging
      return res.status(400).json({ error: "Name and score are required" });
    }

    const newScore = new Score({ name: name.toUpperCase(), score });
    await newScore.save();

    console.log("✅ Score saved:", newScore); // Debugging
    res.status(201).json({ message: "Score saved!", newScore });
  } catch (error) {
    console.error("❌ Error saving score:", error); // Debugging
    res.status(500).json({ error: error.message });
  }
});

// GET: Fetch top 100 scores
router.get("/", async (req, res) => {
  try {
    const topScores = await Score.find().sort({ score: 1 }).limit(100);
    res.json(topScores);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
