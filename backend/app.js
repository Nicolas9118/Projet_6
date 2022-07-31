// Appel d'Express + Mongoose + path + helmet
const express = require("express");
const mongoose = require("mongoose"); // Base de donnée
const path = require("path"); // système de fichier, donne un accès
const helmet = require("helmet"); // sécuritée en-tête HTTP
const mongoSanitize = require("express-mongo-sanitize"); //protège des attaques par injection NoSQL(MongoDB) en nettoyant les données et supprime les clés incriminées

// Import de la route
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

// Création de app qui utilise le frameword "Express"
const app = express();

// Connexion à la base de données MongoDb

mongoose
  .connect(
    "mongodb+srv://nicolas:rolland@cluster0.ld2m2mw.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Middleware permettant que tout le monde puisse effectuer des requêtes aisni ne plus avoir les erreurs CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json());
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(mongoSanitize());

app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/api/sauces", saucesRoutes);

module.exports = app;
