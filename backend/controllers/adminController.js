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
    if (!fechaInicio || !fechaFin) {
      return res.status(400).json({ error: 'Debe especificar fechaInicio y fechaFin' });
    }

    const inicio = new Date(fechaInicio);
    const fin = new Date(fechaFin);
    fin.setDate(fin.getDate() + 1); // ⬅️ sumamos un día completo

    console.log('⏱️ Filtro desde:', inicio.toISOString(), 'hasta:', fin.toISOString());

    const reservas = await Reserva.findAll({
      where: {
        fechaVisita: {
          [Op.gte]: inicio,
          [Op.lt]: fin // ⬅️ usamos "menor a" el día siguiente
        }
      },
      include: ['User', 'Proyecto'],
      order: [['fechaVisita', 'DESC']]
    });

    res.json(reservas);
  } catch (error) {
    console.error('Error al filtrar reservas:', error);
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
    if (horaVisita && !/^\d{2}:\d{2}$/.test(horaVisita)) {
      return res.status(400).json({ error: 'Formato de hora inválido. Usa HH:mm' });
    }
    if (fechaVisita) reserva.fechaVisita = fechaVisita;
    if (horaVisita) reserva.horaVisita = horaVisita;
    if (actividad?.trim()) reserva.actividad = actividad;
    if (equipo?.trim()) reserva.equipo = equipo;

    
    await reserva.save();
    res.json({ message: 'Reserva actualizada' });
  } catch (error) {
    console.error('🔴 Error al actualizar reserva:', error); // <-- muy importante
    res.status(500).json({ error: 'Error al actualizar reserva' });
  }
};
