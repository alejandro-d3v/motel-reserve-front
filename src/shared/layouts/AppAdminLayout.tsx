import { Outlet } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useState } from 'react';

import { settings } from '../constant/settings.contants';

import './styles/AppAdminLayout.css';

import AppNavbar from './AppNavbar';
import AppSidebar from './AppSidebar';

export default function AppAdminLayout() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <>
      <Helmet>
        <title>{settings.appName}</title>
        <link rel="icon" href={settings.appFavicon} />
      </Helmet>

      <AppSidebar isVisible={isSidebarVisible} />

      <div className={`content ${!isSidebarVisible ? 'expand' : ''}`}>
        <AppNavbar toggleSidebar={toggleSidebar} />

        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}