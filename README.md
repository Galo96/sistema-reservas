# 🗓️ Sistema de Reservas de Visitas

Este proyecto es una aplicación web para gestionar reservas de visitas a campo. Incluye autenticación con roles (usuario y administrador), generación de PDF, historial de reservas y panel administrativo.

---

## 📁 Estructura del proyecto

/backend
  ├── controllers
  │     ├── authController.js
  │     ├── reservaController.js
  │     └── adminController.js
  ├── middlewares
  │     └── authMiddleware.js
  ├── models
  │     ├── User.js
  │     ├── Proyecto.js
  │     └── Reserva.js
  ├── routes
  │     ├── authRoutes.js
  │     ├── reservaRoutes.js
  │     └── adminRoutes.js
  ├── utils
  │     └── pdfGenerator.js
  └── server.js

/frontend
  ├── public
  ├── src
  │     ├── components
  │     │     ├── Calendario.js
  │     │     ├── FormReserva.js
  │     │     └── VistaPreviaPDF.js
  │     ├── pages
  │     │     ├── Login.js
  │     │     ├── Dashboard.js
  │     │     └── AdminPanel.js
  │     ├── services
  │     │     ├── authService.js
  │     │     └── reservaService.js
  │     └── App.js
  └── package.json



## 🚀 Tecnologías utilizadas

- **Frontend:** React, Axios, React Router
- **Backend:** Node.js, Express, Sequelize, JWT
- **Base de datos:** PostgreSQL
- **Autenticación:** Login con roles (`admin`, `user`)
- **PDF:** Generación de PDF con reservas

---

## ⚙️ Cómo ejecutar el proyecto

### 🔧 1. Backend

```bash
cd backend
npm install
npm run dev

### 🔧 1. Frontend
cd frontend
npm install
npm start


🔐 Roles disponibles
admin: Acceso total al sistema, panel de administración, eliminar/editar reservas.

user: Solo puede ver, filtrar y crear sus propias reservas.

📦 Funcionalidades principales
Registro y login de usuarios con rol

Reservas por calendario y formulario

Resumen en ventana emergente

Historial de reservas con filtro por fecha

PDF y vista previa de reservas

Panel de administrador para gestionar todas las reservas



🧠 Autor
Desarrollado por Aldhair Quiñónez — Proyecto laboral / profesional ✨