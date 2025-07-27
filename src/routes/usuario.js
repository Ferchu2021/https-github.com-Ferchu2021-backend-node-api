const express = require('express');
const router = express.Router();
// Importa el modelo de Usuario (ajusta la ruta a minúsculas y relativa)
const Usuario = require('./models/usuario');

/**
 * GET /api/usuarios
 * Lista todos los usuarios existentes
 */
router.get('/', async (req, res) => {
  try {
    const usuarios = await Usuario.find();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

/**
 * POST /api/usuarios
 * Registra un nuevo usuario
 * Espera en el body: { nombre, email, password }
 */
router.post('/', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    const nuevoUsuario = new Usuario({ nombre, email, password });
    await nuevoUsuario.save();
    res.status(201).json(nuevoUsuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al crear el usuario' });
  }
});

/**
 * GET /api/usuarios/:id
 * Busca un usuario por su ID
 */
router.get('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'ID inválido o error en la consulta' });
  }
});

/**
 * PUT /api/usuarios/:id
 * Actualiza los datos de un usuario existente
 */
router.put('/:id', async (req, res) => {
  try {
    const datosActualizados = req.body;
    const usuario = await Usuario.findByIdAndUpdate(
      req.params.id,
      datosActualizados,
      { new: true } // Devuelve el usuario actualizado
    );
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(400).json({ error: 'Error al actualizar usuario' });
  }
});

/**
 * DELETE /api/usuarios/:id
 * Elimina un usuario por su ID
 */
router.delete('/:id', async (req, res) => {
  try {
    const usuario = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.json({ mensaje: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: 'Error al eliminar usuario' });
  }
});

// Ruta para verificar que la ruta funciona
router.get('/salud', (req, res) => {
  res.json({ mensaje: 'Ruta de usuarios funcionando correctamente 🚀' });
});

module.exports = router;

