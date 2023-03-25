const express = require("express");
const cors = require("cors");
const { json } = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

mongoose.connect(process.env.MONGO_URL);

//

app.get("/test", (req, res) => {
  res.json("test oke");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  res.json({ name, email, password });
});

app.listen(4000);
