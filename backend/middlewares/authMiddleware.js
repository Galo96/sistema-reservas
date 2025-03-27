// /backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || 'secret_key';

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; 
  if (!token) return res.status(401).json({ error: 'Token requerido' });

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
}

function verifyAdmin(req, res, next) {
  if (req.user.role !== 'admin') return res.status(403).json({ error: 'Acceso denegado' });
  next();
}

module.exports = { authenticateToken, verifyAdmin };
