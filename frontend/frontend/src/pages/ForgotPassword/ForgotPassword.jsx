import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { KeyRound, Mail, ArrowLeft, Send } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../Login/Login.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSent, setIsSent] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Enviando instrucciones a...', email);
    setIsSent(true);
  };

  return (
    <div className="login-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="login-card glass"
      >
        <div className="login-header">
          <div className="logo-badge" style={{ background: '#6366f1' }}>
            <KeyRound size={32} color="white" />
          </div>
          <h1>Recuperar acceso</h1>
          <p className="text-muted">
            {isSent 
              ? 'Revisa tu bandeja de entrada' 
              : 'Ingresa tu correo y te enviaremos instrucciones'}
          </p>
        </div>

        {!isSent ? (
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

            <button type="submit" className="btn-primary login-btn" style={{ marginTop: '10px' }}>
              Enviar Instrucciones
              <Send size={18} />
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="success-message"
            style={{ textAlign: 'center', padding: '20px 0' }}
          >
            <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '20px' }}>
              ¡Listo! Si el correo existe en nuestra base, recibirás un enlace en unos minutos.
            </p>
            <button onClick={() => navigate('/')} className="btn-primary" style={{ width: '100%' }}>
              Volver al Login
            </button>
          </motion.div>
        )}

        <div className="login-footer">
          {!isSent && (
            <button 
              onClick={() => navigate('/')} 
              style={{ background: 'none', border: 'none', color: 'var(--primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', margin: '0 auto' }}
            >
              <ArrowLeft size={14} /> Volver al Login
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
