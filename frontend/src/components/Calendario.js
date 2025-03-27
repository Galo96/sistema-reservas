// /src/components/Calendario.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendario = ({ onDateChange }) => {
  const handleChange = (date) => {
    onDateChange(date); // Envía la fecha seleccionada al padre (Dashboard)
  };

  return (
    <div style={styles.wrapper}>
      <h3>Selecciona una fecha para tu visita:</h3>
      <Calendar onChange={handleChange} />
    </div>
  );
};

const styles = {
  wrapper: {
    marginTop: '20px',
    marginBottom: '20px',
  },
};

export default Calendario;