// Appel multer
const multer = require("multer");

// Dictionnaire des extentions utilisées pour les images
const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

// Objet de configuration de multer pour enresgistrer les images sur le disque
const storage = multer.diskStorage({
  // savoir ou enregister le fichier
  destination: (req, file, callback) => {
    callback(null, "images"); // null pour dire aucune erreur et images c'est le nom du dossier
  },
  // nommer le fichier avec un nom unique
  filename: (req, file, callback) => {
    // génère le nouveau nom avec le nom d'origine en remplacant les espaces par un underscore
    const name = file.originalname.split(" ").join("_");
    // Pour enlever la première extension qui reste dans le name
    const nameFile = name.split(".")[0];
    // Appliquer une extension au fichier
    const extension = MIME_TYPES[file.mimetype];
    // nom complet name + heure a la milli seconde  + . + extension
    callback(null, nameFile + Date.now() + "." + extension);
  },
});

// exporter avec la méthode multer avec l'objet storage avec la méthode single pour dire que c'est un fichier unique.
module.exports = multer({ storage: storage }).single("image");
