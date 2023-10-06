import { useState } from 'react';

import { Outlet } from 'react-router-dom';

import './styles/AppAdminLayout.css';

import AppNavbar from './AppNavbar';
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
        <AppNavbar toggleSidebar={toggleSidebar} />

        <div>
          <Outlet />
        </div>
      </div>
    </div>
  );
}