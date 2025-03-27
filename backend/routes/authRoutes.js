const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Endpoint para registrar un nuevo usuario
router.post('/register', authController.register);
// Endpoint para login
router.post('/login', authController.login);

module.exports = router;
