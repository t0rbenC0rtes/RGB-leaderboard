const mongoose = require("mongoose");

const ScoreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 3,
    match: /^[A-Z]+$/, // Only uppercase letters
  },
  score: {
    type: Number,
    required: true,
    min: 1,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Score", ScoreSchema);
