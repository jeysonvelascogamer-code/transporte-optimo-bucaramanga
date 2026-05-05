import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Search, Bell, User, Bus, Map as MapIcon, Settings, LogOut, Menu, X, Info, Type, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('map'); // map, routes
  const [activePanel, setActivePanel] = useState(null); // notif, user
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [fontSize, setFontSize] = useState(14);
  const [mapStyle, setMapStyle] = useState('normal');

  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
  }, [fontSize]);

  const routes = [
    { id: 1, name: 'P3 - Autopista', color: '#00A859', price: '$2.800', seats: 12, coords: [[7.11, -73.12], [7.115, -73.125], [7.125, -73.135]] },
    { id: 2, name: 'P8 - Piedecuesta', color: '#FFD100', price: '$3.000', seats: 5, coords: [[7.10, -73.11], [7.05, -73.10], [7.00, -73.09]] }
  ];

  const notifications = [
    { id: 1, title: 'Retraso en Ruta P3', desc: 'Accidente en la cra 27.', type: 'alert', time: '14:20' },
    { id: 2, title: 'Nueva Ruta', desc: 'Llega la ruta alimentadora.', type: 'info', time: '12:00' }
  ];

  const handleLogout = () => {
    if(window.confirm('¿Deseas cerrar sesión?')) navigate('/');
  };

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-small"><Bus size={24} color="white" /></div>
          <h3>SmartTrans</h3>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}><MapIcon size={20} /> <span>Mapa</span></button>
          <button className={`nav-item ${activeTab === 'routes' ? 'active' : ''}`} onClick={() => setActiveTab(activeTab === 'routes' ? 'map' : 'routes')}><Bus size={20} /> <span>Rutas</span></button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> <span>Salir</span></button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Buscar destino..." />
            </div>
          </div>
          <div className="user-actions">
            <button className="action-btn" onClick={() => setActivePanel(activePanel === 'notif' ? null : 'notif')}>
              <Bell size={20} />
            </button>
            <div className="user-profile" onClick={() => setActivePanel(activePanel === 'user' ? null : 'user')}>
              <span>J. Bermudez</span>
              <div className="avatar"><User size={20} color="white" /></div>
            </div>

            <AnimatePresence>
              {activePanel === 'notif' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="dropdown-panel">
                  <h4 style={{ margin: '0 0 15px' }}>Notificaciones</h4>
                  <div className="notif-list">
                    {notifications.map(n => (
                      <div key={n.id} className={`notif-item ${n.type}`}>
                        <strong>{n.title}</strong><p style={{ margin: '5px 0', fontSize: '12px' }}>{n.desc}</p>
                        <span style={{ fontSize: '10px', opacity: 0.6 }}>{n.time}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activePanel === 'user' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="dropdown-panel" style={{ width: '200px' }}>
                  <button className="nav-item"><User size={18} /> Mi Perfil</button>
                  <button className="nav-item"><Settings size={18} /> Ajustes</button>
                  <hr style={{ border: '0.5px solid var(--border)', margin: '10px 0' }} />
                  <button className="logout-btn" onClick={handleLogout} style={{ border: 'none', background: 'none', padding: '10px' }}><LogOut size={18} /> Salir</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className="content-container">
          {activeTab === 'routes' && (
            <div className="side-panel">
              <div className="panel-header">
                <h4>Rutas Metrolínea</h4>
                <button className="close-btn" onClick={() => setActiveTab('map')}><X size={18} /></button>
              </div>
              <div className="route-list">
                {routes.map(r => (
                  <div key={r.id} className="route-item" onClick={() => setSelectedRoute(r)}>
                    <div className="route-indicator" style={{ background: r.color }}></div>
                    <div><strong>{r.name}</strong><p style={{ margin: '4px 0 0', fontSize: '12px', color: 'var(--text-muted)' }}>{r.price} - {r.seats} cupos</p></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="map-wrapper">
            <MapContainer center={[7.1193, -73.1227]} zoom={13} className="leaflet-map">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {routes.map(route => (
                <Polyline key={route.id} positions={route.coords} color={route.color} weight={selectedRoute?.id === route.id ? 8 : 4} eventHandlers={{ click: () => setSelectedRoute(route) }} />
              ))}
            </MapContainer>
          </div>

          <AnimatePresence>
            {selectedRoute && (
              <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="route-detail-panel">
                <div className="detail-header">
                  <h3>{selectedRoute.name}</h3>
                  <button className="close-btn" onClick={() => setSelectedRoute(null)}><X size={18} /></button>
                </div>
                <div className="detail-stats">
                  <div className="stat"><span>Precio</span><strong>{selectedRoute.price}</strong></div>
                  <div className="stat"><span>Cupos</span><strong>{selectedRoute.seats}</strong></div>
                  <div className="stat"><span>Estado</span><strong>OK</strong></div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
