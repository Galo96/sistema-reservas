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
      const horaRaw = reserva.horaVisita || '';
      const horaFormateada = horaRaw.substring(0, 5);

      setForm({

        fechaVisita: typeof reserva.fechaVisita === 'string'? reserva.fechaVisita.substring(0, 10): '',
        horaVisita: horaFormateada,
        actividad: reserva.actividad || '',
        equipo: reserva.equipo || ''
      });
    }
  }, [reserva]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (
      !form.fechaVisita ||
      !form.horaVisita ||
      !form.actividad.trim() ||
      !form.equipo.trim()
    ) {
      alert('Todos los campos son obligatorios.');
      return;
    }

    if (!/^\d{2}:\d{2}$/.test(form.horaVisita)) {
      alert('La hora debe tener formato HH:mm');
      return;
    }

    onSave(form);
  };

  if (!isOpen) return null;

  return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h2 style={styles.title}>✏️ Editar Reserva</h2>

        <div style={styles.field}>
          <label style={styles.label}>Fecha de visita:</label>
          <input type="date" name="fechaVisita" value={form.fechaVisita} onChange={handleChange} style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Hora de visita:</label>
          <input type="time" name="horaVisita" value={form.horaVisita} onChange={handleChange} style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Actividad:</label>
          <input type="text" name="actividad" value={form.actividad} onChange={handleChange} style={styles.input} />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Equipo:</label>
          <input type="text" name="equipo" value={form.equipo} onChange={handleChange} style={styles.input} />
        </div>

        <div style={styles.botones}>
          <button onClick={handleSubmit} style={styles.save}>Guardar</button>
          <button onClick={onClose} style={styles.cancel}>Cancelar</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center'
  },
  modal: {
    backgroundColor: '#fff', padding: '25px', borderRadius: '12px', width: '420px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.3)', fontFamily: 'Arial, sans-serif'
  },
  title: {
    marginBottom: '20px', fontSize: '20px', fontWeight: 'bold'
  },
  field: {
    marginBottom: '15px'
  },
  label: {
    display: 'block', fontWeight: 'bold', marginBottom: '5px'
  },
  input: {
    width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc'
  },
  botones: {
    display: 'flex', justifyContent: 'flex-end', gap: '10px'
  },
  save: {
    backgroundColor: '#007bff', color: '#fff', border: 'none', padding: '8px 16px',
    borderRadius: '4px', cursor: 'pointer'
  },
  cancel: {
    backgroundColor: '#dc3545', color: '#fff', border: 'none', padding: '8px 16px',
    borderRadius: '4px', cursor: 'pointer'
  }
};

export default ModalEditarReserva;
