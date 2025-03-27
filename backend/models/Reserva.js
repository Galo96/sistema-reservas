// /backend/models/Reserva.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Reserva = sequelize.define('Reserva', {
  fechaVisita: { type: DataTypes.DATE, allowNull: false },
  horaVisita: { type: DataTypes.TIME, allowNull: false },
  actividad: { type: DataTypes.STRING, allowNull: false },
  equipo: { type: DataTypes.STRING, allowNull: false }
});

module.exports = Reserva;