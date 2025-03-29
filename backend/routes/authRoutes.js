const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { registerValidator } = require('../validators/authValidator');
const { validationResult } = require('express-validator');
const { loginValidator } = require('../validators/authValidator');

// Endpoint para registrar un nuevo usuario
router.post('/register', authController.register);
// Endpoint para login
router.post('/login', authController.login);
// Endpoint para register
router.post('/register', registerValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next(); // si no hay errores, sigue al controller
  }, authController.register);

//Endpoint para seguridad de login
  router.post('/login', loginValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  }, authController.login);
  
module.exports = router;
