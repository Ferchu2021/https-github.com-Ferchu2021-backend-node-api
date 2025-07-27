// 1. Cargar variables de entorno (.env)
require('dotenv').config();

// 2. Importar dependencias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 3. Middlewares generales
app.use(express.json());
app.use(cors());

// 4. Conexión a MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Conectado a MongoDB Atlas'))
.catch(error => {
  console.error('❌ Error conectando a MongoDB:', error.message);
  process.exit(1);
});

// 5. Rutas de ejemplo (ajusta la ruta al archivo real)
const userRoutes = require('./routes/users'); // Cambia si tu archivo tiene otro nombre
app.use('/api/users', userRoutes);

// Ruta pública para probar el estado de la API
app.get('/', (req, res) => {
  res.json({ mensaje: '¡Backend desplegado correctamente en Vercel!' });
});
module.exports = app; // Importante para Vercel

// 6. Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Servidor escuchando en puerto ${PORT}`);
});
