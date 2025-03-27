// /backend/controllers/adminController.js
const { Reserva } = require('../models/associations');
const { Op } = require('sequelize');

exports.getAllReservas = async (req, res) => {
  try {
    const reservas = await Reserva.findAll({
      include: ['User', 'Proyecto']
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener reservas' });
  }
};

exports.filterReservas = async (req, res) => {
  const { fechaInicio, fechaFin } = req.query;
  try {
    const reservas = await Reserva.findAll({
      where: {
        fechaVisita: {
          [Op.between]: [fechaInicio, fechaFin]
        }
      },
      include: ['User', 'Proyecto']
    });
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar reservas' });
  }
};

exports.deleteReserva = async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await Reserva.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Reserva no encontrada' });
    res.json({ message: 'Reserva eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar reserva' });
  }
};

exports.updateReserva = async (req, res) => {
  const { id } = req.params;
  const { fechaVisita, horaVisita, actividad, equipo } = req.body;
  try {
    const reserva = await Reserva.findByPk(id);
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    
    reserva.fechaVisita = fechaVisita;
    reserva.horaVisita = horaVisita;
    reserva.actividad = actividad;
    reserva.equipo = equipo;
    
    await reserva.save();
    res.json({ message: 'Reserva actualizada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar reserva' });
  }
};
