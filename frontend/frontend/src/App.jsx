import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';

// Placeholder para el Mapa/Dashboard que crearemos en la siguiente tarea
const DashboardPlaceholder = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h1>Mapa de Bucaramanga</h1>
    <p>Próximamente: Integración con Leaflet</p>
    <button className="btn-primary" onClick={() => window.location.href = '/'}>
      Cerrar Sesión
    </button>
  </div>
);

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<DashboardPlaceholder />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
