import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock, Bus, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Iniciando sesión...', { email, password });
    
    // Simulación de éxito (Mock Data)
    // En el futuro aquí llamaremos al backend de Alfonso
    if (email && password) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="login-card glass"
      >
        <div className="login-header">
          <div className="logo-badge">
            <Bus size={32} color="white" />
          </div>
          <h1>Bienvenido</h1>
          <p className="text-muted">Gestión Inteligente de Transporte - Bucaramanga</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <label>Correo Electrónico</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input 
                type="email" 
                placeholder="ejemplo@correo.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="login-options">
            <button 
              onClick={() => navigate('/forgot-password')} 
              className="forgot-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button type="submit" className="btn-primary login-btn">
            Entrar
            <ArrowRight size={18} />
          </button>
        </form>

        <div className="login-footer">
          <p>¿No tienes cuenta? <button onClick={() => navigate('/register')} style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}>Regístrate aquí</button></p>
        </div>
      </motion.div>

      <div className="footer-credits">
        <p>Proyecto de Grado - UNAD 2026</p>
      </div>
    </div>
  );
};

export default Login;
