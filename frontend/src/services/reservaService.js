// /frontend/src/services/reservaService.js
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/reservas';

const crearReserva = async (data, token) => {
  try {
    const res = await axios.post(API_URL, data, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const getReservaPreview = async (id, token) => {
  try {
    const res = await axios.get(`${API_URL}/${id}/preview`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return res.data;
  } catch (error) {
    console.error('Error en crearReserva:', error.response?.data || error.message);
    throw error;
  }
};

const obtenerMisReservas = async (token, fechaInicio, fechaFin) => {
  const params = fechaInicio && fechaFin ? { fechaInicio, fechaFin } : {};
  const res = await axios.get('/api/reservas/mis-reservas', {
    headers: { Authorization: `Bearer ${token}` },
    params
  });
  return res.data;
};
export default { crearReserva, getReservaPreview, obtenerMisReservas };
