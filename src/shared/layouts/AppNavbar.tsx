import './styles/AppNavbar.css';

import AppUserMenu from './AppUserMenu';

export default function AppNavbar({ toggleSidebar }: { toggleSidebar: any }) {
  return (
    <div className="navbar">
      <div className="toggle-sidebar" onClick={toggleSidebar}>&#9776;</div>

      <AppUserMenu />
    </div>
  );
}