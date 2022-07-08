// Import du package FS "file system"
const fs = require("fs");

// Import de notre model User
const Sauces = require("../models/Sauces");

exports.getAllSauces = (req, res, next) => {
  Sauces.find()
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.getOneSauce = (req, res, next) => {
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      res.status(200).json(sauces);
    })
    .catch((error) => {
      res.status(404).json({
        error: error,
      });
    });
};

exports.createSauces = (req, res, next) => {
  const saucesObject = JSON.parse(req.body.sauce);
  delete saucesObject._id;
  delete saucesObject._userId;
  const sauces = new Sauces({
    ...saucesObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
    likes: 0,
    dislikes: 0,
    usersLiked: [],
    usersDisliked: [],
  });
  sauces
    .save()
    .then(() => {
      res.status(201).json({
        message: "Sauce enregistrée !",
      });
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

exports.updateSauce = (req, res, next) => {
  const saucesObject = req.file // savoir si il y un champ file
    ? {
        ...JSON.parse(req.body.sauce), // recupere l'objet en le parsant
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`, // recrée l'URL de l'image
      }
    : { ...req.body }; // si pas de fichier récupère l'objet dans le corps de la requête
  // mesure de sécurité pour éviter que qqun créer une sauce à son nom puis le modifie pour le réatribué à qq d'autres
  delete saucesObject._userId;
  // Récupère l'objet en base de donnée
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      if (sauces.userId != req.auth.userId) {
        // si utilisateur ne correspond pas au l'auteur de la sauce
        res.status(401).json({ message: "Not authorized" });
      } else {
        // si utilisateur correspond à l'auteur de la sauce donc mettre a jour l'enregistrement
        Sauces.updateOne(
          { _id: req.params.id },
          { ...saucesObject, _id: req.params.id }
        )
          .then(() => res.status(200).json({ message: "Objet modifié!" }))
          .catch((error) => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

exports.deleteSauce = (req, res, next) => {
  // récupère l'objet en base de donnée
  Sauces.findOne({ _id: req.params.id })
    .then((sauces) => {
      if (sauces.userId != req.auth.userId) {
        // vérification si l'utilisateur est bien l'auteur
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = sauces.imageUrl.split("/images/")[1]; // récupere le nom de fichier dans l'URL de l'image
        fs.unlink(`images/${filename}`, () => {
          // supprime l'image
          Sauces.deleteOne({ _id: req.params.id }) // supprime l'objet de la base de donnée
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};
