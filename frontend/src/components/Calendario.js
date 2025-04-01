// /src/components/Calendario.js
import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const Calendario = ({ onDateChange }) => {
  const handleChange = (date) => {
    //const fechaLocal = date.toISOString().substring(0, 10);
    //onDateChange(fechaLocal); // Envía la fecha seleccionada al padre (Dashboard)

    const fecha = new Date(date); // aseguras tipo Date
    onDateChange(fecha);
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