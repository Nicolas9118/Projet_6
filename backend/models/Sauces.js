// Appel de Mongoose
const mongoose = require("mongoose");

// Création du schéma de données pour l'utilisateur
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: { type: Number, required: true },
  likes: { type: Number },
  dislikes: { type: Number },
  usersLiked: { type: [String] },
  usersDisliked: { type: [String] },
});

// Export du schéma sous forme de modèle de nom "Sauces" de forme sauceSchema
module.exports = mongoose.model("Sauces", sauceSchema);
