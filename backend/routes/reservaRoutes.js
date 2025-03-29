// /backend/routes/reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { generateReservaPDF } = require('../utils/pdfGenerator');
const Reserva = require('../models/Reserva');
const { reservaValidator } = require('../validators/reservaValidator');
const { validationResult } = require('express-validator');

// Crear reserva
router.post('/', authenticateToken, reservaController.createReserva);
// Vista previa de la reserva


//router.get('/:id/preview', authenticateToken, reservaController.getReservaPreview);

// Generar PDF de la reserva
router.get('/:id/pdf', authenticateToken, async (req, res) => {
  try {
    const reserva = await Reserva.findOne({
      where: { id: req.params.id },
      include: ['User', 'Proyecto']
    });
    if (!reserva) return res.status(404).json({ error: 'Reserva no encontrada' });
    
    res.setHeader('Content-Type', 'application/pdf');
    const pdfDoc = generateReservaPDF(reserva);
    pdfDoc.pipe(res);
  } catch (error) {
    res.status(500).json({ error: 'Error al generar PDF' });
  }
});

//Ruta protegida 
router.get('/mis-reservas', authenticateToken, reservaController.getReservasDelUsuario);


router.post('/', authenticateToken, reservaValidator, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }
  next(); // sigue al controller
}, reservaController.createReserva);

module.exports = router;
