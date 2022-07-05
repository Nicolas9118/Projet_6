const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/userconnect");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

module.exports = router;
