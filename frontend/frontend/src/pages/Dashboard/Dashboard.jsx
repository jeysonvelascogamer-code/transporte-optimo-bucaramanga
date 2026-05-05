import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Search, Bell, User, Bus, Map as MapIcon, Settings, LogOut, Menu, X, Info, AlertTriangle, Moon, Sun, Type, ChevronRight, Camera, Mail, Lock, ChevronLeft } from 'lucide-react';
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
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
  }, [fontSize]);

  const toggleSidebar = () => {
    if (!isSidebarCollapsed) {
      setActiveTab('map'); // Cerrar submenús al contraer
    }
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

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
    if(window.confirm('¿Deseas cerrar sesión?')) navigate('/');
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -10, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.2 } }
  };

  return (
    <div className={`dashboard-layout ${isDarkMode ? 'dark-theme' : 'light-theme'} ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-small"><Bus size={24} color="white" /></div>
          {!isSidebarCollapsed && <h3>SmartTrans</h3>}
          <button className="collapse-toggle" onClick={toggleSidebar}>
            {isSidebarCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </button>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}>
            <MapIcon size={20} /> {!isSidebarCollapsed && <span>Mapa</span>}
          </button>
          <button className={`nav-item ${activeTab === 'routes' ? 'active' : ''}`} onClick={() => { if(isSidebarCollapsed) setIsSidebarCollapsed(false); setActiveTab(activeTab === 'routes' ? 'map' : 'routes'); }}>
            <Bus size={20} /> {!isSidebarCollapsed && <span>Rutas</span>}
          </button>
          <button className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => { if(isSidebarCollapsed) setIsSidebarCollapsed(false); setActiveTab(activeTab === 'profile' ? 'map' : 'profile'); }}>
            <User size={20} /> {!isSidebarCollapsed && <span>Perfil</span>}
          </button>
          <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { if(isSidebarCollapsed) setIsSidebarCollapsed(false); setActiveTab(activeTab === 'settings' ? 'map' : 'settings'); }}>
            <Settings size={20} /> {!isSidebarCollapsed && <span>Ajustes</span>}
          </button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn">
            <LogOut size={18} /> {!isSidebarCollapsed && <span>Salir</span>}
          </button>
        </div>
      </aside>

      <main className="main-content">
        <header className="top-header">
          <div className="header-left">
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Buscar ruta..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <AnimatePresence>
                {searchQuery.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 5 }} className="search-suggestions glass">
                    {filteredRoutes.length > 0 ? filteredRoutes.map(r => (
                      <div key={r.id} className="suggestion-item" onClick={() => { setSelectedRoute(r); setSearchQuery(''); }}>
                        <Bus size={16} color={r.color} /> <span>{r.name}</span> <ChevronRight size={14} style={{ marginLeft: 'auto', opacity: 0.5 }} />
                      </div>
                    )) : <div className="suggestion-item">No hay resultados</div>}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="user-actions">
            <button className="action-btn bell-btn" onClick={() => setActivePanel(activePanel === 'notif' ? null : 'notif')}>
              <Bell size={20} /> {notifications.length > 0 && <span className="notif-badge"></span>}
            </button>
            <div className="user-profile" onClick={() => { setIsSidebarCollapsed(false); setActiveTab('profile'); }}>
              <span>J. Bermudez</span>
              <div className="avatar"><User size={20} color="white" /></div>
            </div>
            <AnimatePresence>
              {activePanel === 'notif' && (
                <motion.div variants={menuVariants} initial="hidden" animate="visible" exit="hidden" className="dropdown-panel">
                  <div className="dropdown-header"><h4>Alertas</h4><button className="close-btn" onClick={() => setActivePanel(null)}><X size={16} /></button></div>
                  <div className="notif-list">
                    {notifications.map(n => (
                      <div key={n.id} className={`notif-item ${n.type}`}>
                        <div style={{ display: 'flex', gap: '10px' }}>{n.icon}<div><strong>{n.title}</strong><p style={{ margin: '3px 0', fontSize: '12px' }}>{n.desc}</p></div></div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </header>

        <div className="content-container">
          <AnimatePresence>
            {activeTab === 'routes' && (
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="side-panel">
                <div className="panel-header"><h4>Rutas Metrolínea</h4><button className="close-btn" onClick={() => setActiveTab('map')}><X size={18} /></button></div>
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
            {activeTab === 'profile' && (
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="side-panel">
                <div className="panel-header"><h4>Mi Perfil</h4><button className="close-btn" onClick={() => setActiveTab('map')}><X size={18} /></button></div>
                <div className="profile-section">
                  <div className="profile-avatar-edit"><div className="big-avatar"><User size={40} color="white" /></div><button className="camera-btn"><Camera size={16} /></button></div>
                  <div className="input-group"><label><Mail size={16} /> Correo</label><input type="email" defaultValue="j.bermudez@transporte.com" /></div>
                  <div className="input-group"><label><Lock size={16} /> Contraseña</label><input type="password" placeholder="********" /></div>
                  <button className="action-btn" style={{ width: '100%', marginTop: '20px', background: 'var(--primary)', color: 'white' }}>Guardar</button>
                </div>
              </motion.div>
            )}
            {activeTab === 'settings' && (
              <motion.div initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="side-panel">
                <div className="panel-header"><h4>Ajustes</h4><button className="close-btn" onClick={() => setActiveTab('map')}><X size={18} /></button></div>
                <div className="settings-section">
                  <label><Type size={18} /> Letra: {fontSize}px</label>
                  <input type="range" min="12" max="22" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} />
                  <div style={{ marginTop: '30px' }}>
                    <label>{isDarkMode ? <Moon size={18} /> : <Sun size={18} />} Tema</label>
                    <button className="action-btn" style={{ width: '100%', marginTop: '10px', background: isDarkMode ? 'var(--primary)' : '#eee', color: isDarkMode ? 'white' : 'black' }} onClick={() => setIsDarkMode(!isDarkMode)}>
                      {isDarkMode ? 'Oscuro' : 'Claro'}
                    </button>
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
                <div className="detail-stats"><div className="stat"><span>Precio:</span><strong>{selectedRoute.price}</strong></div><div className="stat"><span>Cupos:</span><strong>{selectedRoute.seats}</strong></div><div className="stat"><span>Estado:</span><strong>OK</strong></div></div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
