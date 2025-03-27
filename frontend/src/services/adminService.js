import axios from 'axios';

const API_URL = '/api/admin/reservas';

const obtenerReservas = async (token, fechaInicio, fechaFin) => {
  const params = fechaInicio && fechaFin ? { fechaInicio, fechaFin } : {};
  const res = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
    params
  });
  return res.data;
};

const eliminarReserva = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const actualizarReserva = async (id, data, token) => {
  const res = await axios.put(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const editarReserva = async (id, data, token) => {
  const res = await axios.put(`/api/admin/reservas/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export default {
  obtenerReservas,
  eliminarReserva,
  actualizarReserva,
  editarReserva
};