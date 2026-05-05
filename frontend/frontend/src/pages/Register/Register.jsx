import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, ArrowLeft, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css'; // Reutilizamos los estilos base del Login

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registrando usuario...', formData);
    
    // Simulación de éxito
    alert('¡Cuenta creada con éxito! Ahora puedes iniciar sesión.');
    navigate('/');
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="login-card glass"
      >
        <div className="login-header">
          <div className="logo-badge" style={{ background: 'var(--secondary)' }}>
            <UserPlus size={32} color="var(--bg-dark)" />
          </div>
          <h1>Crea tu cuenta</h1>
          <p className="text-muted">Únete a la red de transporte inteligente</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Nombre Completo</label>
            <div className="input-wrapper">
              <User className="input-icon" size={18} />
              <input 
                type="text" 
                placeholder="Juan Pérez" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Correo Electrónico</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                placeholder="ejemplo@correo.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <div className="input-wrapper">
              <Lock className="input-icon" size={18} />
              <input 
                type="password" 
                placeholder="••••••••" 
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
            </div>
          </div>

          <button type="submit" className="btn-primary login-btn" style={{ marginTop: '20px' }}>
            Crear Cuenta
            <CheckCircle size={18} />
          </button>
        </form>

        <div className="login-footer">
          <button 
            onClick={() => navigate('/')} 
            style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', margin: '0 auto' }}
          >
            <ArrowLeft size={14} /> Volver al Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
