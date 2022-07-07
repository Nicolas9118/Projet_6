// Appel de Mongoose + plugin
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Création du schéma de données pour l'utilisateur
const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Application du plugin a notre Schéma utilisateur
userSchema.plugin(uniqueValidator);

// Export du schéma sous forme de modèle de nom "User" de forme userSchema
module.exports = mongoose.model("User", userSchema);
