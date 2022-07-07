// Appel de bcrypt et jsonwebtoken
const bcrypt = require("bcrypt"); // crypter le password
const jwt = require("jsonwebtoken"); // attribuer un token à un utilisateur

// Import de notre model User
const User = require("../models/User");

// Enregistre un nouvel utilisateur et crypte son mot de passe
exports.signup = (req, res, next) => {
  // méthode hash de bcrypt sur le password et on lui fait faire 10 tours
  bcrypt
    .hash(req.body.password, 10)
    // création d'un nouvel utilisateur
    .then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });
      // on sauvegarde l'utilisateur dans le BdD
      user
        .save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// Connecte un utilisateur
exports.login = (req, res, next) => {
  // cherche si l'utilisateur est déjà crée
  User.findOne({ email: req.body.email })
    // Si pas connu alors non trouvé
    // si trouvé alors vérif des hashs si non valid MdP non correct / sinon assigne un nouveau token pour 24h
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};
