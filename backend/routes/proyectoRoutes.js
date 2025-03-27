const express = require('express');
const router = express.Router();
const proyectoController = require('../controllers/proyectoController');

// Crear nuevo proyecto
router.post('/', proyectoController.createProyecto);

// ----------------------
router.get('/buscar', proyectoController.buscarProyectos);


// Buscar por código
router.get('/:codigo', proyectoController.getProyectoByCodigo);

module.exports = router;