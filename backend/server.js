// /backend/server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');

// Importación de rutas
const authRoutes = require('./routes/authRoutes');
const reservaRoutes = require('./routes/reservaRoutes');
const adminRoutes = require('./routes/adminRoutes');
const proyectoRoutes = require('./routes/proyectoRoutes');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// Uso de rutas
app.use('/api/auth', authRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/proyectos', proyectoRoutes);

// Middleware para manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Algo salió mal!' });
});

// Sincronización con la base de datos y arranque del servidor
sequelize.sync()
  .then(() => {
    console.log('Base de datos conectada.');
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor corriendo en puerto ${PORT}`);
    });
  })
  .catch(err => console.error('Error al conectar con la BD:', err));
