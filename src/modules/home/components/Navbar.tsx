import { settings } from '../../../shared/constant/settings.contants';

import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="p-4 px-16 flex justify-between items-center bg-primary">
      <Link to="/">
        <div className="flex items-center">
          <img src={settings.appLogo} alt="Logo" className="w-12 h-12 mr-2" />
          <span className="text-white text-xl font-bold font-sans">{settings.appName}</span>
        </div>
      </Link>

      <div className="space-x-2">
        <Link to="/auth/register">
          <button className="bg-tertiary text-secondary px-4 py-2 rounded-full">
            Registrarse
          </button>
        </Link>

        <Link to="/auth/login">
          <button className="border-solid border border-tertiary text-tertiary px-4 py-2 rounded-full hover:bg-tertiary hover:text-secondary">
            Iniciar Sesión
          </button>
        </Link>
      </div>
    </nav>
  );
}