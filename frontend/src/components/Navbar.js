import React from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../utils/authUtils';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const rol = localStorage.getItem('rol');

  if (!token) return null; // No mostrar navbar si no está logueado

  return (
    <nav style={styles.nav}>
      <button style={styles.button} onClick={() => navigate('/dashboard')}>
        🏠 Dashboard
      </button>
      {rol === 'admin' && (
        <button style={styles.button} onClick={() => navigate('/admin')}>
          👑 Admin
        </button>
      )}
      <button style={styles.logout} onClick={logout}>
        🔓 Cerrar sesión
      </button>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    backgroundColor: '#f5f5f5',
    padding: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    position: 'sticky',
    top: 0,
    zIndex: 1000
  },
  button: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#007BFF',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  },
  logout: {
    padding: '10px 20px',
    border: 'none',
    backgroundColor: '#dc3545',
    color: 'white',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};

export default Navbar;