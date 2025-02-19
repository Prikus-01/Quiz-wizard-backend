const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: "https://quiz-wizard-frontend.vercel.app", // Allow frontend URL
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};

app.use(cors(corsOptions));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const quizRoutes = require("./routes/quizRouter");
app.use("api/quiz", quizRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
