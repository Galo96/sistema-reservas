// /backend/routes/reservaRoutes.js
const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reservaController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { generateReservaPDF } = require('../utils/pdfGenerator');
const Reserva = require('../models/Reserva');

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

module.exports = router;
