const { Reserva, Proyecto, User } = require('../models/associations');
const { Op } = require('sequelize');

// Crear una nueva reserva
exports.createReserva = async (req, res) => {
  const { fechaVisita, horaVisita, codigoProyecto, actividad, equipo } = req.body;
  const userId = req.user.id;

  try {
    const proyecto = await Proyecto.findOne({ where: { codigo: codigoProyecto } });
    if (!proyecto) {
      return res.status(400).json({ error: 'Código de proyecto no válido' });
    }

    const reserva = await Reserva.create({
      fechaVisita,
      horaVisita,
      actividad,
      equipo,
      userId,
      proyectoId: proyecto.id
    });

    const usuario = await User.findByPk(userId);

    res.status(201).json({
      message: 'Reserva creada exitosamente',
      reserva: {
        ...reserva.toJSON(),
        proyectoNombre: proyecto.nombre,
        usuarioNombre: usuario.username
      }
    });
  } catch (error) {
    console.error('Error al crear reserva:', error);
    res.status(500).json({ error: 'Error al guardar la reserva' });
  }
};

// Obtener historial de reservas del usuario, con opción de filtrar por fechas
exports.getReservasDelUsuario = async (req, res) => {
  const userId = req.user.id;
  const { fechaInicio, fechaFin } = req.query;

  try {
    const filtros = { userId };

    if (fechaInicio && fechaFin) {
      const inicio = new Date(fechaInicio);
      const fin = new Date(fechaFin);
      fin.setDate(fin.getDate() + 1);
    
      console.log('🔍 Historial del usuario: desde', inicio.toISOString(), 'hasta', fin.toISOString());
    
      filtros.fechaVisita = {
        [Op.gte]: inicio,
        [Op.lt]: fin
      };
    }
    

    const reservas = await Reserva.findAll({
      where: filtros,
      include: [{ model: Proyecto, attributes: ['nombre'] }],
      order: [['fechaVisita', 'DESC']]
    });

    const historial = reservas.map(r => ({
      id: r.id,
      fechaVisita: r.fechaVisita,
      horaVisita: r.horaVisita,
      actividad: r.actividad,
      equipo: r.equipo,
      proyectoNombre: r.Proyecto.nombre,
      creadaEl: r.createdAt
    }));

    res.json(historial);
  } catch (err) {
    console.error('Error al obtener historial de reservas:', err);
    res.status(500).json({ error: 'Error al obtener el historial' });
  }
};

