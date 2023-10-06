import './styles/AppNavbar.css';

export default function AppNavbar({ toggleSidebar }: { toggleSidebar: any }) {
  return (
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
  );
}