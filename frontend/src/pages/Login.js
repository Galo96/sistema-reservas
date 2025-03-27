import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';

const Login = () => {
  // 'login' o 'register' determina el modo del formulario
  const [mode, setMode] = useState('login');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'login') {
        // Llamada al servicio de login
        const tokenData = await authService.login(credentials);
  
        if (!tokenData || !tokenData.token) {
          alert('Error de autenticación');
          return;
        }
  
        // Limpiar cualquier valor previo
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
  
        // ✅ Guardar token y rol correctamente
        localStorage.setItem('token', tokenData.token); // JWT válido
        localStorage.setItem('rol', tokenData.role);    // "admin" o "user"
  
        navigate('/dashboard');
      } else {
        // Llamada al servicio de registro
        await authService.register(credentials);
        alert('Registro exitoso. Por favor, inicia sesión.');
        setMode('login');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Ocurrió un error');
    }
  };

  return (
    <div style={styles.container}>
      <h1>{mode === 'login' ? 'Iniciar Sesión' : 'Registro de Usuario'}</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="username"
          placeholder="Usuario"
          value={credentials.username}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={credentials.password}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          {mode === 'login' ? 'Ingresar' : 'Registrarse'}
        </button>
      </form>
      <button onClick={toggleMode} style={styles.toggleButton}>
        {mode === 'login'
          ? '¿No tienes una cuenta? Regístrate'
          : '¿Ya tienes cuenta? Inicia sesión'}
      </button>

      <p>
  ¿No tienes cuenta? <a href="/register">Regístrate aquí</a>
</p>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    marginTop: '50px',
  },
  form: {
    display: 'inline-block',
    textAlign: 'left',
    marginTop: '20px',
  },
  input: {
    display: 'block',
    width: '300px',
    padding: '10px',
    margin: '10px 0',
  },
  button: {
    width: '320px',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  toggleButton: {
    marginTop: '20px',
    background: 'none',
    border: 'none',
    color: '#007BFF',
    cursor: 'pointer',
  },
};

export default Login;