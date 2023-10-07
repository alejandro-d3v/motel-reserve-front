import './styles/AppUserMenu.css';

export default function AppUserMenu() {
  return (
    <div className="user-menu">
      <span>Usuario</span>

      <div className="user-menu-dropdown">
        <a href="#">Perfil</a>
        <a href="#">Cerrar Sesión</a>
      </div>
    </div>
  );
}