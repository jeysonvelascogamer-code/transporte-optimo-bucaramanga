import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import { Search, Bell, User, Bus, Map as MapIcon, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  // Coordenadas de Bucaramanga
  const position = [7.1193, -73.1227];

  // Datos simulados de rutas (Mock Data)
  const routes = [
    { id: 1, name: 'P3 - Autopista', color: '#00A859', coords: [[7.11, -73.12], [7.12, -73.13], [7.13, -73.14]] },
    { id: 2, name: 'P8 - Piedecuesta', color: '#FFD100', coords: [[7.10, -73.11], [7.05, -73.10], [7.00, -73.09]] }
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar Lateral */}
      <aside className="sidebar glass">
        <div className="sidebar-header">
          <div className="logo-small">
            <Bus size={24} color="white" />
          </div>
          <h3>SmartTrans</h3>
        </div>

        <nav className="sidebar-nav">
          <button className="nav-item active"><MapIcon size={20} /> Mapa</button>
          <button className="nav-item"><Bus size={20} /> Rutas</button>
          <button className="nav-item"><Bell size={20} /> Alertas</button>
          <button className="nav-item"><Settings size={20} /> Ajustes</button>
        </nav>

        <div className="sidebar-footer">
          <button onClick={() => navigate('/')} className="logout-btn">
            <LogOut size={18} /> Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Área Principal */}
      <main className="main-content">
        {/* Top Header */}
        <header className="top-header glass">
          <div className="search-bar">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="¿A dónde quieres ir hoy?" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="user-actions">
            <div className="notification-bell">
              <Bell size={20} />
              <span className="badge"></span>
            </div>
            <div className="user-profile">
              <span>Jeyson Bermudez</span>
              <div className="avatar"><User size={20} /></div>
            </div>
          </div>
        </header>

        {/* Contenedor del Mapa */}
        <section className="map-wrapper">
          <MapContainer center={position} zoom={13} scrollWheelZoom={true} className="leaflet-map">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {routes.map(route => (
              <Polyline key={route.id} positions={route.coords} color={route.color} weight={5} opacity={0.7}>
                <Popup>{route.name}</Popup>
              </Polyline>
            ))}
            <Marker position={position}>
              <Popup>Centro de Bucaramanga</Popup>
            </Marker>
          </MapContainer>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
