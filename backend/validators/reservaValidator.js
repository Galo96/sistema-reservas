const { body } = require('express-validator');

exports.reservaValidator = [
  body('fechaVisita')
    .notEmpty().withMessage('La fecha de visita es obligatoria')
    .isISO8601().withMessage('Fecha inválida'),
  body('horaVisita')
    .notEmpty().withMessage('La hora de visita es obligatoria')
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Hora inválida'),
  body('actividad')
    .notEmpty().withMessage('La actividad es obligatoria')
    .isLength({ min: 3 }).withMessage('La actividad debe tener al menos 3 caracteres'),
  body('equipo')
    .notEmpty().withMessage('El equipo es obligatorio'),
  body('codigoProyecto')
    .notEmpty().withMessage('El código de proyecto es obligatorio')
];

exports.updateReservaValidator = [
  body('fechaVisita')
    .optional()
    .isISO8601().withMessage('Fecha inválida'),
  body('horaVisita')
    .optional()
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/).withMessage('Hora inválida'),
  body('actividad')
    .optional()
    .isLength({ min: 3 }).withMessage('La actividad debe tener al menos 3 caracteres'),
  body('equipo')
    .optional()
    .notEmpty().withMessage('El equipo no puede estar vacío')
];
