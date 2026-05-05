import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Search, Bell, User, Bus, Map as MapIcon, Settings, LogOut, Menu, X, Info, AlertTriangle, Moon, Sun, Type } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('map'); 
  const [activePanel, setActivePanel] = useState(null); 
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSize, setFontSize] = useState(14);

  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
  }, [fontSize]);

  const routes = [
    { id: 1, name: 'P3 - Autopista', color: '#00A859', price: '$2.800', seats: 12, coords: [[7.11, -73.12], [7.115, -73.125], [7.125, -73.135]] },
    { id: 2, name: 'P8 - Piedecuesta', color: '#FFD100', price: '$3.000', seats: 5, coords: [[7.10, -73.11], [7.05, -73.10], [7.00, -73.09]] },
    { id: 3, name: 'RE1 - Universidades', color: '#007AFF', price: '$2.800', seats: 20, coords: [[7.13, -73.12], [7.14, -73.13]] }
  ];

  const filteredRoutes = routes.filter(r => r.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const notifications = [
    { id: 1, title: 'Retraso Grave', desc: 'Bloqueo en la autopista.', type: 'alert', time: '14:20', icon: <AlertTriangle size={18} color="#ff4444" /> },
    { id: 2, title: 'Info Clima', desc: 'Lluvia ligera en el Norte.', type: 'info', time: '12:00', icon: <Info size={18} color="#007AFF" /> }
  ];

  const handleLogout = () => {
    if(window.confirm('¿Cerrar sesión?')) navigate('/');
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', damping: 20, stiffness: 300 } }
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
          <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab(activeTab === 'settings' ? 'map' : 'settings')}><Settings size={20} /> <span>Ajustes</span></button>
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
              <input type="text" placeholder="Buscar ruta o destino..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
          </div>
          <div className="user-actions">
            <button className="action-btn" onClick={() => setActivePanel(activePanel === 'notif' ? null : 'notif')}><Bell size={20} /></button>
            <div className="user-profile" onClick={() => setActivePanel(activePanel === 'user' ? null : 'user')}>
              <span>J. Bermudez</span>
              <div className="avatar"><User size={20} color="white" /></div>
            </div>

            <AnimatePresence>
              {activePanel === 'notif' && (
                <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="hidden" className="dropdown-panel">
                  <div className="panel-header" style={{ marginBottom: '15px' }}><h4>Alertas</h4></div>
                  <div className="notif-list">
                    {notifications.map(n => (
                      <div key={n.id} className={`notif-item ${n.type}`}>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          {n.icon}
                          <div><strong>{n.title}</strong><p style={{ margin: '3px 0', fontSize: '12px', opacity: 0.8 }}>{n.desc}</p></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {activePanel === 'user' && (
                <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="hidden" className="dropdown-panel user-dropdown">
                  <button className="nav-item"><User size={18} /> Perfil</button>
                  <button className="nav-item" onClick={() => {setActiveTab('settings'); setActivePanel(null)}}><Settings size={18} /> Ajustes</button>
                  <hr style={{ opacity: 0.1, margin: '10px 0' }} />
                  <button className="logout-btn" onClick={handleLogout}><LogOut size={18} /> Salir</button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className="content-container">
          <AnimatePresence>
            {activeTab === 'routes' && (
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="side-panel">
                <div className="panel-header"><h4>Rutas ({filteredRoutes.length})</h4><button className="close-btn" onClick={() => setActiveTab('map')}><X size={18} /></button></div>
                <div className="route-list">
                  {filteredRoutes.map(r => (
                    <div key={r.id} className="route-item" onClick={() => setSelectedRoute(r)}>
                      <div className="route-indicator" style={{ background: r.color }}></div>
                      <div><strong>{r.name}</strong><p style={{ margin: '5px 0 0', fontSize: '12px', opacity: 0.6 }}>{r.price}</p></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="side-panel">
                <div className="panel-header"><h4>Ajustes</h4><button className="close-btn" onClick={() => setActiveTab('map')}><X size={18} /></button></div>
                <div className="settings-section">
                  <label><Type size={18} /> Tamaño de letra</label>
                  <input type="range" min="12" max="20" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                  <div style={{ marginTop: '20px' }}>
                    <label><Moon size={18} /> Modo Nocturno</label>
                    <button className="action-btn" style={{ width: '100%', marginTop: '10px' }}>Activado</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="map-wrapper">
            <MapContainer center={[7.1193, -73.1227]} zoom={13} className="leaflet-map">
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {filteredRoutes.map(route => (
                <Polyline key={route.id} positions={route.coords} color={route.color} weight={selectedRoute?.id === route.id ? 8 : 4} eventHandlers={{ click: () => setSelectedRoute(route) }} />
              ))}
            </MapContainer>
          </div>

          <AnimatePresence>
            {selectedRoute && (
              <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="route-detail-panel">
                <div className="detail-header"><h3>{selectedRoute.name}</h3><button className="close-btn" onClick={() => setSelectedRoute(null)}><X size={18} /></button></div>
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
