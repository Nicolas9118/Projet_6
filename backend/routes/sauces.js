// Appel d'Express + création d'un router via Express
const express = require("express");
const router = express.Router();

// Import des middlewares des controllers que l'on a besoin
const authorize = require("../middleware/authorize");
const multer = require("../middleware/multer_config");
const saucesCtrl = require("../controllers/sauces");

// Création des routes
router.get("/", saucesCtrl.getAllSauces);
router.get("/:id", saucesCtrl.getOneSauce);
router.post("/", authorize, multer, saucesCtrl.createSauces);

module.exports = router;
