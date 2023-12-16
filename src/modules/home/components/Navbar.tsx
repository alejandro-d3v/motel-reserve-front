import { Link } from 'react-router-dom';

import { useAuthenticatedUserStore } from '../../../shared/stores/authenticatedUserStore';
import { settings } from '../../../shared/constant/settings.contants';

import AppUserMenu from '../../../shared/layouts/AppUserMenu';

import { ReservationCodesService } from '../../../shared/services/reservationCodes.service';

const reservationCodesService = new ReservationCodesService();

export default function Navbar() {
  const { user } = useAuthenticatedUserStore();

  return (
    <>
      <div className="navbar p-4 px-16 bg-primary">
        <div className="flex-1">
          <Link to="/">
            <div className="flex items-center">
              <img src={settings.appLogo} alt="Logo" className="w-12 h-12 mr-2" />
              <span className="text-white text-xl font-bold font-sans">{settings.appName}</span>
            </div>
          </Link>
        </div>

        <div className="flex-none gap-2">
          {reservationCodesService.get().length && ( 
            <Link to="/reservations-list">
              <button className="border border-tertiary text-tertiary px-4 py-2 rounded-full">
                Mis reservaciones
              </button>
            </Link>
          )}

          {user ? (
            <AppUserMenu />
          ) : (
            <Link to="/auth/login">
              <button className="bg-tertiary text-secondary px-4 py-2 rounded-full">
                Iniciar Sesión
              </button>
            </Link>
          )}
        </div>
      </div>
    </>
  );
}