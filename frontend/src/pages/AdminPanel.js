import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';
import ModalEditarReserva from '../components/ModalEditarReserva';

const AdminPanel = () => {
  const [reservas, setReservas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [reservaSeleccionada, setReservaSeleccionada] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [limpiando, setLimpiando] = useState(false); // 🆕

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

  const handleGuardarEdicion = async (data) => {
    const token = localStorage.getItem('token');
    try {
      await adminService.editarReserva(reservaSeleccionada.id, data, token);
      setMostrarModal(false);
      cargarReservas();
      alert('Reserva actualizada correctamente.');
    } catch (err) {
      alert('Error al actualizar la reserva.');
      console.error(err);
    }
    console.log('🚀 handleGuardarEdicion ejecutado con:', data);

  };

  useEffect(() => {
    cargarReservas();
  }, []);

  // 🆕 Efecto que se dispara después de limpiar filtros
  useEffect(() => {
    if (limpiando) {
      cargarReservas();
      setLimpiando(false);
    }
  }, [limpiando]);

  return (
    <div style={styles.container}>
      <h2>📋 Panel de Administración de Reservas</h2>

      <div style={styles.filtros}>
        <label>Desde: <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} /></label>
        <label>Hasta: <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} /></label>

        <button onClick={() => {
          if (!fechaInicio || !fechaFin) {
            alert('Por favor selecciona ambas fechas para aplicar el filtro.');
            return;
          }
          cargarReservas();
        }}>
          Buscar
        </button>

        <button
          onClick={() => {
            setFechaInicio('');
            setFechaFin('');
            setLimpiando(true); // ✅ activa efecto que recarga sin filtros
          }}
          style={{ marginLeft: '10px', backgroundColor: '#6c757d', color: '#fff' }}
        >
          Limpiar filtros
        </button>
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
              <button onClick={() => {
                setReservaSeleccionada(r);
                setMostrarModal(true);
              }}>✏️ Editar</button>
              <button onClick={() => handleEliminar(r.id)} style={{ backgroundColor: '#dc3545' }}>🗑 Eliminar</button>
            </div>
          </div>
        ))
      )}

      <ModalEditarReserva
        reserva={reservaSeleccionada}
        isOpen={mostrarModal}
        onClose={() => setMostrarModal(false)}
        onSave={handleGuardarEdicion}
      />
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
    marginBottom: '20px'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  botones: {
    display: 'flex',
    gap: '10px',
    marginTop: '10px'
  }
};

export default AdminPanel;