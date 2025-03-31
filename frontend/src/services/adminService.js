import axios from 'axios';

const API_BASE = '/api/admin/reservas';

// ✅ Obtiene todas o filtra por fechas según parámetros
const obtenerReservas = async (token, fechaInicio, fechaFin) => {
  const tieneFechas = fechaInicio && fechaFin;
  const url = tieneFechas ? `${API_BASE}/filter` : API_BASE;

  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${token}` },
    params: tieneFechas ? { fechaInicio, fechaFin } : {}
  });

  return res.data;
};

const eliminarReserva = async (id, token) => {
  const res = await axios.delete(`${API_BASE}/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const actualizarReserva = async (id, data, token) => {
  const res = await axios.put(`${API_BASE}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

const editarReserva = async (id, data, token) => {
  const res = await axios.put(`${API_BASE}/${id}`, data, {
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
