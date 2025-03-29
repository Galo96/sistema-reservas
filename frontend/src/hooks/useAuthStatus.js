import { useEffect, useState } from 'react';
import { getUserFromToken, isTokenExpired } from '../utils/tokenUtils';

const useAuthStatus = () => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('token');
    const user = getUserFromToken(token);
    const expired = token ? isTokenExpired(token) : true;

    return {
      token,
      user,
      rol: user?.role || null,
      expired,
    };
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const token = localStorage.getItem('token');
      const user = getUserFromToken(token);
      const expired = token ? isTokenExpired(token) : true;
      setAuth({ token, user, rol: user?.role || null, expired });
    }, 500); // actualiza cada medio segundo

    return () => clearInterval(interval);
  }, []);

  return auth;
};

export default useAuthStatus;
