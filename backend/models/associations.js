const User = require('./User');
const Proyecto = require('./Proyecto');
const Reserva = require('./Reserva');

// Relaciones
User.hasMany(Reserva, { foreignKey: 'userId' });
Reserva.belongsTo(User, { foreignKey: 'userId' });

Proyecto.hasMany(Reserva, { foreignKey: 'proyectoId' });
Reserva.belongsTo(Proyecto, { foreignKey: 'proyectoId' });

module.exports = { User, Proyecto, Reserva };

