// /backend/routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authenticateToken, verifyAdmin } = require('../middlewares/authMiddleware');
const { updateReservaValidator } = require('../validators/reservaValidator');
const { validationResult } = require('express-validator');


router.use(authenticateToken);
router.use(verifyAdmin);

router.get('/reservas', adminController.getAllReservas);
router.get('/reservas/filter', adminController.filterReservas);
router.delete('/reservas/:id', adminController.deleteReserva);

router.put('/reservas/:id', updateReservaValidator, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ error: errors.array()[0].msg });
    }
    next();
  }, adminController.updateReserva);

module.exports = router;