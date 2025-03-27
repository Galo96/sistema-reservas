import React, { useState, useEffect } from 'react';

const ModalEditarReserva = ({ reserva, isOpen, onClose, onSave }) => {
  const [form, setForm] = useState({
    fechaVisita: '',
    horaVisita: '',
    actividad: '',
    equipo: ''
  });

  useEffect(() => {
    if (reserva) {
      setForm({
        fechaVisita: reserva.fechaVisita?.slice(0, 10),
        horaVisita: reserva.horaVisita,
        actividad: reserva.actividad,
        equipo: reserva.equipo
      });
    }
  }, [reserva]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // ✅ VALIDACIÓN DE CAMPOS
    if (
      !form.fechaVisita ||
      !form.horaVisita ||
      !form.actividad.trim() ||
      !form.equipo.trim()
    ) {
      alert('Todos los campos son obligatorios y no pueden estar vacíos.');
      return;
    }

    onSave(form); // Enviar al componente padre
  };

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Editar Reserva</h3>

        <label>Fecha:</label>
        <input
          type="date"
          name="fechaVisita"
          value={form.fechaVisita}
          onChange={handleChange}
        />

        <label>Hora:</label>
        <input
          type="time"
          name="horaVisita"
          value={form.horaVisita}
          onChange={handleChange}
        />

        <label>Actividad:</label>
        <input
          type="text"
          name="actividad"
          value={form.actividad}
          onChange={handleChange}
        />

        <label>Equipo:</label>
        <textarea
          name="equipo"
          value={form.equipo}
          onChange={handleChange}
        />

        <div style={{ marginTop: '15px' }}>
          <button onClick={handleSubmit}>Guardar</button>
          <button onClick={onClose} style={{ marginLeft: '10px' }}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0, left: 0, width: '100vw', height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.4)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    zIndex: 999
  },
  modal: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    minWidth: '300px'
  }
};

export default ModalEditarReserva;