import './styles/AppSidebar.css';

export default function AppSidebar({ isVisible  }: { isVisible: boolean }) {
  return (
    <div className={`sidebar ${isVisible ? 'show' : ''}`}>
      <ul>
        <li>Dashboard</li>
        <li>Gestión de Reservas</li>
        <li>Gestión de Espacios deportivos</li>
        <li>Reportes</li>
      </ul>
    </div>
  );
}