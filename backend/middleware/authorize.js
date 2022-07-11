const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    //sépare le token avec le bearer et récupère que le token
    const token = req.headers.authorization.split(" ")[1];
    //vérifie si mon TOKEN utilise bien la même clé
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    // decode mon userId
    const userId = decodedToken.userId;
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
