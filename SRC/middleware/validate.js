// Middleware/validate.js

const Joi = require('joi');

/**
 * Middleware de validación para Express usando Joi.
 * @param {Joi.Schema} schema - Esquema de validación para los datos entrantes.
 * @returns {Function} Middleware de Express.
 */
function validate(schema) {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      // Responde 400 Bad Request con los detalles del error de validación
      return res.status(400).json({
        error: "Datos inválidos",
        detalles: error.details.map(detail => detail.message)
      });
    }
    // Si pasa validación, seguir al siguiente middleware
    next();
  };
}

module.exports = validate;
