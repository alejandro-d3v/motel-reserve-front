import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import './styles/AppAdminLayout.css';

import AppSidebar from './AppSidebar';

export default function AppAdminLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div>
      <AppSidebar isVisible={isSidebarVisible} />

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