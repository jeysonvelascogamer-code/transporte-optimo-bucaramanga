import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Search, Bell, User, Bus, Map as MapIcon, Settings, LogOut, Menu, X, Info, Type, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('map'); // map, routes, alerts, settings
  const [activePanel, setActivePanel] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [fontSize, setFontSize] = useState(16);
  const [mapStyle, setMapStyle] = useState('normal');

  // Aplicar ajustes globales
  useEffect(() => {
    document.documentElement.style.setProperty('--base-font-size', `${fontSize}px`);
  }, [fontSize]);

  const position = [7.1193, -73.1227];

  const routes = [
    { id: 1, name: 'P3 - Autopista', color: '#00A859', price: '$2.800', seats: 12, coords: [[7.11, -73.12], [7.115, -73.125], [7.125, -73.135]] },
    { id: 2, name: 'P8 - Piedecuesta', color: '#FFD100', price: '$3.000', seats: 5, coords: [[7.10, -73.11], [7.05, -73.10], [7.00, -73.09]] }
  ];

  const notifications = [
    { id: 1, title: 'Retraso en Ruta P3', desc: 'Accidente en la cra 27 con calle 45.', type: 'alert', category: 'Tráfico', time: '14:20' },
    { id: 2, title: 'Nueva Ruta Disponible', desc: 'Prueba la nueva ruta alimentadora.', type: 'info', category: 'Sistema', time: '12:00' },
    { id: 3, title: 'Lluvias fuertes', desc: 'Se reportan retrasos por clima en el centro.', type: 'alert', category: 'Clima', time: '10:15' }
  ];

  const togglePanel = (panel) => {
    if (panel === 'notif') {
      setActiveTab('alerts');
      setActivePanel(null);
    } else {
      setActivePanel(activePanel === panel ? null : panel);
    }
  };

  const handleLogout = () => {
    if(window.confirm('¿Estás seguro que deseas cerrar sesión?')) {
      navigate('/');
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Sidebar Lateral */}
      <aside className={`sidebar glass ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-small"><Bus size={24} color="white" /></div>
          <h3>SmartTrans</h3>
          <button className="close-menu" onClick={() => setIsSidebarOpen(false)}><X size={20} /></button>
        </div>

        <nav className="sidebar-nav">
          <button className={`nav-item ${activeTab === 'map' ? 'active' : ''}`} onClick={() => setActiveTab('map')}><MapIcon size={20} /> Mapa</button>
          <button className={`nav-item ${activeTab === 'routes' ? 'active' : ''}`} onClick={() => setActiveTab('routes')}><Bus size={20} /> Rutas</button>
          <button className={`nav-item ${activeTab === 'alerts' ? 'active' : ''}`} onClick={() => setActiveTab('alerts')}><Bell size={20} /> Alertas</button>
          <button className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}><Settings size={20} /> Ajustes</button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={handleLogout} className="logout-btn"><LogOut size={18} /> Salir</button>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="main-content">
        <header className="top-header glass">
          <div className="header-left">
            <button className="menu-toggle" onClick={() => setIsSidebarOpen(true)}><Menu size={24} /></button>
            <div className="search-bar">
              <Search size={18} className="search-icon" />
              <input type="text" placeholder="Buscar destino o ruta..." />
            </div>
          </div>
          
          <div className="user-actions">
            <button className="action-btn" onClick={() => togglePanel('notif')}>
              <Bell size={20} />
              <span className="badge"></span>
            </button>
            <div className="user-profile" onClick={() => setActivePanel(activePanel === 'user' ? null : 'user')}>
              <span>J. Bermudez</span>
              <div className="avatar"><User size={20} color="white" /></div>
            </div>
          </div>
        </header>

        {/* Paneles de Contenido Dinámico */}
        <div className="content-container">
          <AnimatePresence mode='wait'>
            {activeTab === 'routes' && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="side-panel glass">
                <div className="panel-header">
                  <h4>Rutas Metrolínea</h4>
                  <button className="close-menu" onClick={() => setActiveTab('map')}><X size={20} /></button>
                </div>
                <div className="route-list">
                  {routes.map(r => (
                    <div key={r.id} className="route-item" onClick={() => { setSelectedRoute(r); setActiveTab('map'); }}>
                      <div className="route-indicator" style={{ background: r.color }}></div>
                      <div><strong>{r.name}</strong><p>{r.price} - {r.seats} cupos</p></div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'alerts' && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="side-panel glass">
                <div className="panel-header">
                  <h4>Alertas</h4>
                  <button className="close-menu" onClick={() => setActiveTab('map')}><X size={20} /></button>
                </div>
                <div className="notification-list">
                  {notifications.map(n => (
                    <div key={n.id} className={`notif-item ${n.type}`} style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '10px', textTransform: 'uppercase', color: 'var(--primary)', fontWeight: '700' }}>{n.category}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>{n.time}</span>
                      </div>
                      <strong>{n.title}</strong>
                      <p>{n.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -20, opacity: 0 }} className="side-panel glass">
                <div className="panel-header">
                  <h4>Configuración</h4>
                  <button className="close-menu" onClick={() => setActiveTab('map')}><X size={20} /></button>
                </div>
                <div className="settings-group">
                  <label><Type size={18} /> Tamaño de Letra</label>
                  <input type="range" min="12" max="24" value={fontSize} onChange={(e) => setFontSize(e.target.value)} />
                  <span>{fontSize}px</span>
                </div>
                <div className="settings-group">
                  <label><Eye size={18} /> Estilo de Mapa</label>
                  <select value={mapStyle} onChange={(e) => setMapStyle(e.target.value)}>
                    <option value="normal">Normal</option>
                    <option value="dark">Modo Oscuro</option>
                    <option value="sat">Satélite</option>
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mapa */}
          <section className="map-wrapper">
            <MapContainer center={position} zoom={13} className={`leaflet-map map-${mapStyle}`}>
              <TileLayer url={mapStyle === 'dark' ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"} />
              {routes.map(route => (
                <Polyline key={route.id} positions={route.coords} color={route.color} weight={selectedRoute?.id === route.id ? 8 : 5} eventHandlers={{ click: () => setSelectedRoute(route) }}>
                  <Popup><strong>{route.name}</strong></Popup>
                </Polyline>
              ))}
            </MapContainer>
          </section>
        </div>

        {/* Dropdowns de Header */}
        <AnimatePresence>
          {activePanel === 'user' && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="dropdown-panel glass profile-menu">
              <button className="nav-item" onClick={() => { setActiveTab('settings'); setActivePanel(null); }}><Settings size={18} /> Configuración</button>
              <button className="nav-item" onClick={() => { setActiveTab('map'); setActivePanel(null); }}><User size={18} /> Mi Perfil</button>
              <hr className="divider" />
              <button className="logout-btn" onClick={handleLogout}><LogOut size={18} /> Cerrar Sesión</button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Detalle de Ruta */}
        <AnimatePresence>
          {selectedRoute && (
            <motion.div initial={{ y: 100 }} animate={{ y: 0 }} exit={{ y: 100 }} className="route-detail-panel glass">
              <div className="detail-header">
                <div className="route-badge" style={{ background: selectedRoute.color }}></div>
                <h3>{selectedRoute.name}</h3>
                <button onClick={() => setSelectedRoute(null)}><X size={20} /></button>
              </div>
              <div className="detail-stats">
                <div className="stat"><span>Precio</span><strong>{selectedRoute.price}</strong></div>
                <div className="stat"><span>Cupos</span><strong>{selectedRoute.seats}</strong></div>
                <div className="stat"><span>Estado</span><strong>Operativo</strong></div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;
