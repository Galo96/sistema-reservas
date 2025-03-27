import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || '/api/auth';

const login = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return {
      token: response.data.token,
      role: response.data.role
    };
  } catch (error) {
    throw error;
  }
};

const register = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/register`, credentials);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// ✅ Exportación con nombre para evitar advertencias
const authService = {
  login,
  register
};

export default authService;