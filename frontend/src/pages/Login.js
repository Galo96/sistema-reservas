import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import authService from '../services/authService';
import useAuthStatus from '../hooks/useAuthStatus';

const Login = () => {
  const [mode, setMode] = useState('login');
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const navigate = useNavigate();
  const { expired } = useAuthStatus();

  // ✅ Redirige tras login exitoso
  useEffect(() => {
    if (redirectToDashboard) {
      navigate('/dashboard');
    }
  }, [redirectToDashboard, navigate]);

  // ✅ Si ya está logueado, no mostramos el login
  if (!expired) {
    return <Navigate to="/dashboard" />;
  }

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
        const tokenData = await authService.login(credentials);

        if (!tokenData || !tokenData.token) {
          alert('Error de autenticación');
          return;
        }

        localStorage.setItem('token', tokenData.token);
        localStorage.setItem('rol', tokenData.role);
        setRedirectToDashboard(true);
      } else {
        await authService.register(credentials);
        alert('Registro exitoso. Por favor, inicia sesión.');
        setMode('login');
      }
    } catch (error) {
      alert(error.response?.data?.error || 'Ocurrió un error');
    }
  };

  // ...imports y lógica previa igual...

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

      {/* 🔴 Botón de alternar entre login/registro comentado */}
      {/*
      <button onClick={toggleMode} style={styles.toggleButton}>
        {mode === 'login'
          ? '¿No tienes una cuenta? Regístrate'
          : '¿Ya tienes cuenta? Inicia sesión'}
      </button>
      */}

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