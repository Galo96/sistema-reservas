const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/associations');
const secret = process.env.JWT_SECRET || 'secret_key';

exports.register = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const existente = await User.findOne({ where: { username } });
    if (existente) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await User.create({
      username,
      password: hashedPassword,
      role: role === 'admin' ? 'admin' : 'user' // validación básica
    });

    res.status(201).json({ message: 'Usuario registrado', user: nuevoUsuario });
  } catch (err) {
    console.error('Error al registrar:', err);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ where: { username } });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });
    
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(400).json({ error: 'Contraseña incorrecta' });
    
    // Generar el token JWT
    const token = jwt.sign(
      { id: user.id, role: user.role, username: user.username },
      secret,
      { expiresIn: '1h' }
    );
    res.json({ message: 'Login exitoso', token, role: user.role });
  } catch (error) {
    res.status(500).json({ error: 'Error al autenticar el usuario' });
  }
};
