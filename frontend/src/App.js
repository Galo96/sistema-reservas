import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel';
import Navbar from './components/Navbar';
import useAuthStatus from './hooks/useAuthStatus'; // ✅ nuevo hook

function App() {
  const { rol, expired } = useAuthStatus(); // ✅ reactivo y seguro

  if (expired) {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  return (
    <div className="App">
      {!expired && <Navbar />} {/* ✅ Solo si está autenticado */}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={
          !expired ? <Dashboard /> : <Navigate to="/" />
        } />

        <Route path="/admin" element={
          !expired && rol === 'admin' ? <AdminPanel /> : <Navigate to="/" />
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;