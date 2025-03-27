// /backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('reservas', 'postgres', 'kitgo12345', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
