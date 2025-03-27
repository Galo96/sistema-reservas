import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import AdminPanel from './pages/AdminPanel'; // ✅ Importamos el panel de administración

function App() {
  const rol = localStorage.getItem('rol');

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* ✅ Ruta protegida para admin */}
        <Route
          path="/admin"
          element={
            rol === 'admin' ? <AdminPanel /> : <Navigate to="/" />
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;

