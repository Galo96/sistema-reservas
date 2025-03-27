import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api/proyectos';

const buscarProyectoPorCodigo = async (codigo) => {
  const res = await axios.get(`${API_URL}/${codigo}`);
  return res.data;
};

const autocompletarProyectos = async (query) => {
  const res = await axios.get(`/api/proyectos/buscar?q=${query}`);
  return res.data;
};

export default {
  buscarProyectoPorCodigo,
  autocompletarProyectos,
};

