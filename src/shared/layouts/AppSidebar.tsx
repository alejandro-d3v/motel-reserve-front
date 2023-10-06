import './styles/AppSidebar.css';

export default function AppSidebar({ isVisible  }: { isVisible: boolean }) {
  return (
    <div className={`sidebar ${isVisible ? 'show' : ''}`}>
      <ul>
        <li>Inicio</li>
        <li>Configuración</li>
        <li>Perfil</li>
      </ul>
    </div>
  );
}