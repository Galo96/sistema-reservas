import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import reservaService from '../services/reservaService';

const HistorialReservas = forwardRef((props, ref) => {
  const [reservas, setReservas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useImperativeHandle(ref, () => ({
    recargar: () => cargarHistorial()
  }));

  useEffect(() => {
    cargarHistorial();
  }, []);

  // 🔁 Este useEffect detecta cuándo se limpian los filtros
  useEffect(() => {
    if (fechaInicio === '' && fechaFin === '') {
      cargarHistorial();
    }
  }, [fechaInicio, fechaFin]);

  const cargarHistorial = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    console.log('Buscando reservas entre:', fechaInicio, fechaFin);

    try {
      const data = await reservaService.obtenerMisReservas(token, fechaInicio, fechaFin);
      setReservas(data);
    } catch (err) {
      console.error('Error cargando historial:', err);
    }
  };

  const limpiarFiltros = () => {
    setFechaInicio('');
    setFechaFin('');
  };

  return (
    <div style={styles.wrapper}>
      <h2>📋 Historial de mis reservas</h2>

      <div style={styles.filtros}>
        <label>Desde: <input type="date" value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} /></label>
        <label>Hasta: <input type="date" value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} /></label>
        <button onClick={cargarHistorial}>Filtrar</button>
        <button onClick={limpiarFiltros} style={styles.botonLimpiar}>Limpiar filtros</button>
      </div>

      {reservas.length === 0 ? (
        <p>No hay reservas registradas.</p>
      ) : (
        reservas.map((r) => (
          <div key={r.id} style={styles.card}>
            <p><strong>Fecha de visita:</strong> {new Date(r.fechaVisita).toLocaleDateString()}</p>
            <p><strong>Hora:</strong> {r.horaVisita}</p>
            <p><strong>Proyecto:</strong> {r.proyectoNombre}</p>
            <p><strong>Actividad:</strong> {r.actividad}</p>
            <p><strong>Equipo:</strong> {r.equipo}</p>
            <p style={{ fontSize: '0.85rem', color: 'gray' }}>Reservado el: {new Date(r.creadaEl).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
});

const styles = {
  wrapper: {
    marginTop: '40px',
    textAlign: 'left',
    padding: '0 20px',
  },
  filtros: {
    marginBottom: '20px',
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    flexWrap: 'wrap'
  },
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '15px',
    marginBottom: '15px',
    backgroundColor: '#f0f0f0',
    boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
  },
  botonLimpiar: {
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px'
  }
};

export default HistorialReservas;