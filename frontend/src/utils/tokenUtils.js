import { jwtDecode } from 'jwt-decode';

export const getUserFromToken = (token) => {
  try {
    return jwtDecode(token);
  } catch (error) {
    console.error('❌ Token inválido:', error);
    return null;
  }
};

export const isTokenExpired = (token) => {
  try {
    const { exp } = jwtDecode(token); // extraemos el campo 'exp' del payload
    const now = Date.now() / 1000;     // tiempo actual en segundos
    return exp < now;
  } catch (error) {
    console.error('❌ No se pudo verificar expiración del token:', error);
    return true; // Si hay error al decodificar, lo tratamos como expirado
  }
};


