const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  quizId: String,
  body: Array,
});

module.exports = mongoose.model("Quiz", quizSchema);
