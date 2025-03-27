import React, { useState } from 'react';
import authService from '../services/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'user'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.register(form);
      alert('Usuario registrado correctamente.');
      navigate('/login');
    } catch (err) {
      alert('Error al registrar');
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Registro de Usuario</h2>
      <input
        type="text"
        name="username"
        placeholder="Usuario"
        value={form.username}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <input
        type="password"
        name="password"
        placeholder="Contraseña"
        value={form.password}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
        <option value="user">Usuario normal</option>
        <option value="admin">Administrador</option>
      </select>
      <button type="submit" style={styles.button}>Registrar</button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '400px',
    margin: '40px auto',
    padding: '20px',
    borderRadius: '10px',
    backgroundColor: '#f7f7f7',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
  },
  input: {
    width: '100%',
    marginBottom: '15px',
    padding: '10px'
  },
  button: {
    padding: '10px',
    width: '100%',
    backgroundColor: '#28a745',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer'
  }
};

export default Register;