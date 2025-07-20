const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// LOGIN
exports.login = async (req, res) => {
  const { username, password } = req.body;

  // Validación básica y sanitización
  if (
    !username ||
    typeof username !== "string" ||
    !username.trim() ||
    !password ||
    typeof password !== "string" ||
    !password.trim()
  ) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña requeridos." });
  }

  try {
    // Busca el usuario y sanitiza el username
    const user = await User.findOne({ username: username.trim() });
    if (!user)
      return res.status(401).json({ error: "Usuario no encontrado" });

    // Comparación segura de contraseñas
    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: "Contraseña incorrecta" });

    // Genera token JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: "Error del servidor" });
  }
};

// REGISTER
exports.register = async (req, res) => {
  const { username, password } = req.body;

  // Validación básica y sanitización
  if (
    !username ||
    typeof username !== "string" ||
    !username.trim() ||
    !password ||
    typeof password !== "string" ||
    !password.trim()
  ) {
    return res
      .status(400)
      .json({ error: "Usuario y contraseña requeridos." });
  }

  try {
    // Evita registros duplicados por username
    const exists = await User.findOne({ username: username.trim() });
    if (exists) {
      return res
        .status(409)
        .json({ error: "El nombre de usuario ya está registrado." });
    }

    // Hashea la contraseña
    const hash = await bcrypt.hash(password, 10);

    // Crea el usuario sanitizando el username
    const user = new User({
      username: username.trim(),
      password: hash,
    });

    await user.save();
    res.status(201).json({ message: "Usuario creado" });
  } catch (err) {
    res.status(500).json({ error: "Error del servidor" });
  }
};
