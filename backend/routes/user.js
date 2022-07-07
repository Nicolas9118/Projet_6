// Appel d'Express + création d'un router via Express
const express = require("express");
const router = express.Router();

// Import des middlewares des controllers que l'on a besoin
const authorize = require("../middleware/authorize");
const userCtrl = require("../controllers/user");

//création des routes pour s'inscrire et se connecter
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
