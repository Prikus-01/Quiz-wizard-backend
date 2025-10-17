const express = require("express");
const Quiz = require("../models/Quiz");
const router = express.Router();



// Create a Quiz
router.post("/create", async (req, res) => {
  const newQuiz = new Quiz({
    quizId: Date.now().toString(),
    body: req.body.body,
  });
  await newQuiz.save();
  res.json({ quizId: newQuiz.quizId });
});

// Fetch a Quiz
router.get("/:quizId", async (req, res) => {
  try {
    const quiz = await Quiz.findOne({ quizId: req.params.quizId });
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz.body);
  } catch (error) {
    res.status(500).send("server error");
  }
});

module.exports = router;
