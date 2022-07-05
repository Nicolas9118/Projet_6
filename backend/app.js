const express = require("express");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const app = express();

mongoose
  .connect(
    "mongodb+srv://nicolas:rolland@cluster0.ld2m2mw.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use("/api/auth", userRoutes);

module.exports = app;
