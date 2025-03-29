const { body } = require('express-validator');

exports.registerValidator = [
  body('username')
    .notEmpty().withMessage('El nombre de usuario es obligatorio')
    .isLength({ min: 3 }).withMessage('El usuario debe tener al menos 3 caracteres'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('role')
    .optional()
    .isIn(['user', 'admin']).withMessage('El rol debe ser user o admin')
];

exports.loginValidator = [
  body('username')
    .notEmpty().withMessage('El usuario es obligatorio'),
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
];