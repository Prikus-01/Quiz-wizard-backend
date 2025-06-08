const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: [
      "https://quiz-wizard-frontend.vercel.app",
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
// app.use(cors({ origin: "*" }));
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get('/',(req,res) => {
  res.send("server is running");
});
const quizRoutes = require("./routes/quizRouter");
app.use("/api/quiz", quizRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));
