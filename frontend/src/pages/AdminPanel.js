import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';

const AdminPanel = () => {
  const [reservas, setReservas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const cargarReservas = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const data = await adminService.obtenerReservas(token, fechaInicio, fechaFin);
      setReservas(data);
    } catch (err) {
      console.error('Error al cargar reservas:', err);
    }
  };

  const handleEliminar = async (id) => {
    const confirm = window.confirm('¿Seguro que deseas eliminar esta reserva?');
    if (!confirm) return;

    const token = localStorage.getItem('token');
    try {
      await adminService.eliminarReserva(id, token);
      setReservas(reservas.filter(r => r.id !== id));
      alert('Reserva eliminada.');
    } catch (err) {
      alert('Error al eliminar reserva.');
      console.error(err);
    }
  };

  useEffect(() => {
    cargarReservas();
  }, []);

  return (
    <div style={styles.container}>
      <h2>📋 Panel de Administración de Reservas</h2>

      <div style={styles.filtros}>
        <label>Desde: <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} /></label>
        <label>Hasta: <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} /></label>
        <button onClick={cargarReservas}>Buscar</button>
      </div>

      {reservas.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        reservas.map((r) => (
          <div key={r.id} style={styles.card}>
            <p><strong>Usuario:</strong> {r.User?.username}</p>
            <p><strong>Proyecto:</strong> {r.Proyecto?.nombre}</p>
            <p><strong>Fecha:</strong> {new Date(r.fechaVisita).toLocaleDateString()}</p>
            <p><strong>Hora:</strong> {r.horaVisita}</p>
            <p><strong>Actividad:</strong> {r.actividad}</p>
            <p><strong>Equipo:</strong> {r.equipo}</p>
            <div style={styles.botones}>
              <button onClick={() => console.log('Editar reserva', r.id)}>✏️ Editar</button>
              <button onClick={() => handleEliminar(r.id)} style={{ backgroundColor: '#dc3545' }}>🗑 Eliminar</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '20px',
    maxWidth: '900px',
    margin: '0 auto',
    backgroundColor: '#f3f3f3',
    borderRadius: '10px',
    marginTop: '40px'
  },
  filtros: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap'
  },
  card: {
    backgroundColor: '#fff',
    padding: '15px',
    marginBottom: '15px',
    borderRadius: '8px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  botones: {
    marginTop: '10px',
    display: 'flex',
    gap: '10px'
  }
};

export default AdminPanel;