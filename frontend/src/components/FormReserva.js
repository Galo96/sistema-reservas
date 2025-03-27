import React, { useState, useEffect } from 'react';
import proyectoService from '../services/proyectoService';

const FormReserva = ({ selectedDate, onSubmit }) => {
  const [hora, setHora] = useState('');
  const [codigoProyecto, setCodigoProyecto] = useState('');
  const [actividad, setActividad] = useState('');
  const [equipo, setEquipo] = useState('');
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [cargando, setCargando] = useState(false);
  const [sugerencias, setSugerencias] = useState([]);

  const handleCodigoInput = async (valor) => {
    const limpio = valor.toUpperCase().trim();
    setCodigoProyecto(limpio);
    setNombreProyecto('');
    setSugerencias([]);
  
    if (limpio.length >= 2) {
      try {
        const proyectos = await proyectoService.autocompletarProyectos(limpio);
        setSugerencias(proyectos);
      } catch (err) {
        console.error('Error buscando sugerencias:', err);
      }
    }
  };
  
  const seleccionarProyecto = (proyecto) => {
    setCodigoProyecto(proyecto.codigo);
    setNombreProyecto(proyecto.nombre);
    setSugerencias([]); // Cierra la lista
  };

  useEffect(() => {
    if (!codigoProyecto || codigoProyecto.length < 3) {
      setNombreProyecto('');
      return;
    }

    const delayDebounce = setTimeout(async () => {
      try {
        setCargando(true);
        const proyecto = await proyectoService.buscarProyectoPorCodigo(codigoProyecto);
        setNombreProyecto(proyecto.nombre);
      } catch (err) {
        setNombreProyecto('');
      } finally {
        setCargando(false);
      }
    }, 500); // Espera 0.5s tras escribir

    return () => clearTimeout(delayDebounce);
  }, [codigoProyecto]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      alert('Primero selecciona una fecha desde el calendario.');
      return;
    }

    const data = {
      fechaVisita: selectedDate,
      horaVisita: hora,
      codigoProyecto,
      actividad,
      equipo,
    };

    onSubmit(data, resetForm);
  };

  const resetForm = () => {
    setHora('');
    setCodigoProyecto('');
    setActividad('');
    setEquipo('');
    setNombreProyecto('');
    setSugerencias([]);
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h3>Completa los detalles de la reserva</h3>

      <input
        type="time"
        value={hora}
        onChange={(e) => setHora(e.target.value)}
        required
        style={styles.input}
      />
<input
  type="text"
  value={codigoProyecto}
  onChange={(e) => handleCodigoInput(e.target.value)}
  placeholder="Código del Proyecto"
  required
  style={styles.input}
/>
<ul style={styles.sugerencias}>
  {sugerencias.map((proy) => (
    <li
      key={proy.codigo}
      onClick={() => seleccionarProyecto(proy)}
      style={styles.sugerenciaItem}
    >
      {proy.codigo} - {proy.nombre}
    </li>
  ))}
</ul>
      <input
        type="text"
        value={actividad}
        onChange={(e) => setActividad(e.target.value)}
        placeholder="Actividad a realizar"
        required
        style={styles.input}
      />

      <textarea
        value={equipo}
        onChange={(e) => setEquipo(e.target.value)}
        placeholder="Miembros del equipo (separados por coma)"
        rows={3}
        required
        style={styles.textarea}
      />

      <button type="submit" style={styles.button}>
        Reservar Visita
      </button>
    </form>
  );
};

const styles = {
  form: {
    maxWidth: '400px',
    margin: '0 auto',
    textAlign: 'left',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
  },
  button: {
    width: '100%',
    padding: '10px',
    backgroundColor: '#28a745',
    color: '#fff',
    fontWeight: 'bold',
    border: 'none',
    cursor: 'pointer',
  },

  sugerencias: {
    listStyle: 'none',
    padding: 0,
    margin: '5px 0',
    border: '1px solid #ccc',
    maxHeight: '150px',
    overflowY: 'auto',
    backgroundColor: '#fff',
    zIndex: 1000,
    position: 'relative',
  },
  
  sugerenciaItem: {
    padding: '8px',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
  },

};


export default FormReserva;