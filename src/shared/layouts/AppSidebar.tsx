import { Link } from 'react-router-dom';

import './styles/AppSidebar.css';

import { settings } from '../constant/settings.contants';

import { useRoleStore } from '../stores/role.store';
import { useAuthenticatedUserStore } from '../stores/authenticatedUserStore';

import { UserPermissionsService } from '../services/userPermissions.service';

const userPermissionsService = new UserPermissionsService();

export default function AppSidebar({ isVisible  }: { isVisible: boolean }) {
  const { user } = useAuthenticatedUserStore();
  const { role } = useRoleStore();

  const items = userPermissionsService.get().map(element => element.item);

  return (
    <div className={`sidebar bg-primary ${isVisible ? 'show' : ''} px-2 pt-3`}>
      <div>
        <div className="mb-3">
          <Link to="/">
            <div className="flex items-center">
              <img src={settings.appLogo} alt="Logo" className="w-7 h-7 mr-2" />
              <span className="text-white text-sm font-bold font-sans">{settings.appName}</span>
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-center flex-col">
        <div className='border-2 w-16 h-16 rounded-full flex items-center justify-center text-white'>
          <span className='text-3xl uppercase'>{user ? user.names.charAt(0) : '-'}</span>
        </div>

        <div className='mt-2 text-white'>
          <div className='text-center'>
            <span>{`${user?.names} ${user?.lastNames}`}</span>
          </div>
          <div className='text-center'>
            <span className='text-white text-opacity-70'>{role?.name ?? '--'}</span>
          </div>
        </div>
      </div>

      <hr className='border-2 rounded border-white border-opacity-5 my-3' />

      <div className='mb-2'>
        <h5 className='text-white text-opacity-50 font-bold uppercase'>General</h5>

        <ul className="menu px-0">
          {(items.some(element => element.url == "/admin/home") || (role?.name == "Administrador")) && (
            <li className='mb-0.5'>
              <Link to="/admin/home" className='hover:bg-secondary'>
                <div className='text-white'>Inicio</div>
              </Link>
            </li>
          )}

          {(items.some(element => element.itemId == 2) || (role?.name == "Administrador")) && (
            <li>
              <details>
                <summary className='text-white hover:text-white hover:bg-white hover:bg-opacity-10'>Dashboards</summary>

                <ul>
                  {(items.some(element => element.url == "/admin/dashboard") || (role?.name == "Administrador")) && (
                    <li>
                      <Link to="/admin/dashboard" className='hover:bg-secondary'>
                        <div className='text-white'>Dashboard General</div>
                      </Link>
                    </li>
                  )}

                  {(items.some(element => element.url == "/admin/reports") || (role?.name == "Administrador")) && (
                    <li>
                      <Link to="/admin/reports" className='hover:bg-secondary'>
                        <div className='text-white'>Reportes</div>
                      </Link>
                    </li>
                  )}
                </ul>
              </details>
            </li>
          )}
        </ul>
      </div>

      <div className='mb-2'>
        <h5 className='text-white text-opacity-50 font-bold uppercase'>Gestión</h5>

        <ul className="menu px-0">
          {(items.some(element => element.itemId == 5) || (role?.name == "Administrador")) && (
            <li>
              <details>
                <summary className='text-white hover:text-white hover:bg-white hover:bg-opacity-10' >
                  Administrar Usuarios
                </summary>

                <ul>
                  {(items.some(element => element.url == "/access/roles") || (role?.name == "Administrador")) && (
                    <li>
                      <Link to="/access/roles" className='hover:bg-secondary'>
                        <div className='text-white'>Roles</div>
                      </Link>
                    </li>
                  )}

                  {(items.some(element => element.url == "/access/users") || (role?.name == "Administrador")) && (
                    <li>
                      <Link to="/access/users" className='hover:bg-secondary'>
                        <div className='text-white'>Usuarios</div>
                      </Link>
                    </li>
                  )}
                </ul>
              </details>
            </li>
          )}

          {(items.some(element => element.url == "/admin-service") || (role?.name == "Administrador")) && (
            <li className='mb-0.5'>
              <Link to="/admin-service" className='hover:bg-secondary'>
                <div className='text-white'>Servicios</div>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}