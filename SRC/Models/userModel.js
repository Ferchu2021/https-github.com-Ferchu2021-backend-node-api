const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  nombre: { /* igual que antes */ },
  email: { /* igual que antes */ },
  password: { /* igual que antes */ },
  fechaCreacion: { /* igual que antes */ },
  rol: {
    type: String,
    enum: ['admin', 'usuario'],
    default: 'usuario'
  },
  estado: {
    type: Boolean,
    default: true
  }
});

// Hook para hash de contraseña
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;

