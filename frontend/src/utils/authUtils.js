export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('rol'); // por compatibilidad si aún lo usas
    window.location.href = '/'; // recarga y redirige al login
  };
  