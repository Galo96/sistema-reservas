import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Calendario from '../components/Calendario';
import FormReserva from '../components/FormReserva';
import reservaService from '../services/reservaService';
import Modal from '../components/Modal';
import HistorialReservas from '../components/HistorialReservas';
import { jwtDecode } from 'jwt-decode';


const Dashboard = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [reservaData, setReservaData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const historialRef = useRef(null);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setUsername(decoded.username);
    }
  }, []);

  const navigate = useNavigate();
  const rol = localStorage.getItem('rol');

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleReservaSubmit = async (formData, resetForm) => {
    try {
      const token = localStorage.getItem('token');
      console.log('TOKEN ENCONTRADO:', token);

      if (!token) {
        alert('Debe iniciar sesión para hacer una reserva.');
        return;
      }

      const data = {
        ...formData,
        fechaVisita: selectedDate,
      };

      const response = await reservaService.crearReserva(data, token);
      console.log('respuesta', response);

      alert('✅ Reserva guardada correctamente.');
      setReservaData(response.reserva);
      setShowModal(true);
      setSelectedDate(null);
      resetForm();

      if (historialRef.current) {
        historialRef.current.recargar();
      }

    } catch (error) {
      console.error('❌ Error al guardar la reserva:', error);
      const msg = error.response?.data?.error || 'Ocurrió un error al guardar.';
      alert(msg);
    }
  };

  return (
    <div style={styles.container}>
      <h1>Dashboard</h1>
      <p style={styles.subtitulo}>Bienvenido al sistema de reservas. <strong>{username}</strong> 👋</p>

      {rol === 'admin' && (
        <div style={{ marginTop: '10px' }}>
          <p style={{ fontStyle: 'italic', color: '#555' }}>
            👑 Acceso administrador activado
          </p>
          <button onClick={() => navigate('/admin')} style={styles.botonAdmin}>
            🔧 Ir al panel de administración
          </button>
        </div>
      )}

      <div style={styles.calendarioWrapper}>
        <div style={styles.card}>
          <Calendario onDateChange={handleDateChange} />
        </div>
        <div style={styles.card}>
          <FormReserva selectedDate={selectedDate} onSubmit={handleReservaSubmit} />
        </div>
      </div>

      {reservaData && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <div style={styles.resumen}>
            <h3>✅ Reserva registrada</h3>
            <p><strong>Usuario:</strong> {reservaData?.usuarioNombre}</p>
            <p><strong>Proyecto:</strong> {reservaData?.proyectoNombre}</p>
            <p><strong>Fecha:</strong> {new Date(reservaData?.fechaVisita).toLocaleDateString()}</p>
            <p><strong>Hora:</strong> {reservaData?.horaVisita}</p>
            <p><strong>Actividad:</strong> {reservaData?.actividad}</p>
            <p><strong>Equipo:</strong> {reservaData?.equipo}</p>
          </div>
        </Modal>
      )}

      <HistorialReservas ref={historialRef} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '40px auto',
    padding: '0 20px',
    fontFamily: 'Arial, sans-serif'
  },
  subtitulo: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '20px'
  },
  calendarioWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '30px',
  },
  card: {
    backgroundColor: '#ffffff',
    padding: '20px',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    width: '100%',
    maxWidth: '420px',
  },
  resumen: {
    textAlign: 'left',
    padding: '10px',
  },
  botonAdmin: {
    marginTop: '10px',
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    fontSize: '1rem',
    cursor: 'pointer',
  }
};

export default Dashboard;
