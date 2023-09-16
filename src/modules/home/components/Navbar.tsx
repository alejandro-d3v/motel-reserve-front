import { settings } from '../../../shared/constant/settings.contants';

export default function Navbar() {
  return (
    <nav className="p-4 px-16 flex justify-between items-center">
      <div className="flex items-center">
        <img src={settings.appLogo} alt="Logo" className="w-14 h-8 mr-2" />
        <span className="text-primary text-xl font-bold">{settings.appName}</span>
      </div>

      <div className="space-x-2">
        <button className="bg-primary text-white px-4 py-2 rounded">
          Registrarse
        </button>

        <button className="border-solid border border-primary text-primary px-4 py-2 rounded hover:bg-primary hover:text-white">
          Iniciar Sesión
        </button>
      </div>
    </nav>
  );
}