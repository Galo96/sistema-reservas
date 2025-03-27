// /backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, verifyAdmin } = require('../middlewares/authMiddleware');

router.use(authenticateToken);
router.use(verifyAdmin);

router.get('/reservas', adminController.getAllReservas);
router.get('/reservas/filter', adminController.filterReservas);
router.delete('/reservas/:id', adminController.deleteReserva);
router.put('/reservas/:id', adminController.updateReserva);

module.exports = router;