import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import './styles/AppAdminLayout.css';

export default function AppAdminLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <div className={`sidebar ${isSidebarVisible ? 'show' : ''}`}>
        <ul>
          <li>Inicio</li>
          <li>Configuración</li>
          <li>Perfil</li>
        </ul>
      </div>

      <div className={`content ${!isSidebarVisible ? 'expand' : ''}`}>
        <div className="navbar">
          <div className="toggle-sidebar" onClick={toggleSidebar}>&#9776;</div>

          <div className="user-menu">
            <span>Usuario</span>
            <div className="user-menu-dropdown">
              <a href="#">Perfil</a>
              <a href="#">Cerrar Sesión</a>
            </div>
          </div>
        </div>

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}