const { Proyecto } = require('../models/associations');
const { Op } = require('sequelize');

exports.buscarProyectos = async (req, res) => {
  const q = req.query.q?.toUpperCase().trim() || '';
  try {
    const proyectos = await Proyecto.findAll({
      where: {
        codigo: { [Op.like]: `%${q}%` },
      },
      limit: 10,
      order: [['codigo', 'ASC']],
    });

    res.json(proyectos);
  } catch (err) {
    console.error('Error al buscar proyectos:', err);
    res.status(500).json({ error: 'Error al buscar proyectos' });
  }
};




exports.getProyectoByCodigo = async (req, res) => {
  const { codigo } = req.params;
  try {
    const proyecto = await Proyecto.findOne({ where: { codigo } });
    if (!proyecto) return res.status(404).json({ error: 'Proyecto no encontrado' });
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ error: 'Error al buscar el proyecto' });
  }
};

exports.createProyecto = async (req, res) => {
  const { codigo, nombre } = req.body;

  try {
    const existente = await Proyecto.findOne({ where: { codigo } });
    if (existente) {
      return res.status(400).json({ error: 'Ya existe un proyecto con ese código' });
    }

    const nuevo = await Proyecto.create({ codigo, nombre });
    res.status(201).json({ message: 'Proyecto creado correctamente', proyecto: nuevo });
  } catch (err) {
    console.error('Error al crear proyecto:', err);
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
};