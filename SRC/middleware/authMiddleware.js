const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Verifica que exista el header de autenticación y el token
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    // Devuelve un único mensaje genérico, sin distinción del tipo de error,
    // para evitar dar pistas a posibles atacantes
    return res.status(401).json({ error: "No autorizado" });
  }
};

