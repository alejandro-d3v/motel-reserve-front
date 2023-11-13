import { Link } from 'react-router-dom';

import { settings } from '../constant/settings.contants';

import { useRoleStore } from '../stores/role.store';
import { useAuthenticatedUserStore } from '../stores/authenticatedUserStore';

import './styles/AppSidebar.css';

export default function AppSidebar({ isVisible  }: { isVisible: boolean }) {
  const { user } = useAuthenticatedUserStore();
  const { role } = useRoleStore();

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
          <li className='mb-0.5'>
            <Link to="/admin/home" className='hover:bg-secondary'>
              <div className='text-white'>Inicio</div>
            </Link>
          </li>

          <li>
            <details>
              <summary className='text-white hover:text-white hover:bg-white hover:bg-opacity-10'>Dashboards</summary>

              <ul>
                <li>
                  <a className='text-white hover:text-white hover:bg-white hover:bg-opacity-10'>Dashboard General</a>
                </li>
                <li>
                  <a className='text-white hover:text-white hover:bg-white hover:bg-opacity-10'>Reportes</a>
                </li>
              </ul>
            </details>
          </li>
        </ul>
      </div>

      <div className='mb-2'>
        <h5 className='text-white text-opacity-50 font-bold uppercase'>Gestión</h5>

        <ul className="menu px-0">
          <li>
            <details>
              <summary className='text-white hover:text-white hover:bg-white hover:bg-opacity-10' >
                Administrar Usuarios
              </summary>

              <ul>
                <li>
                  <Link to="/access/roles" className='hover:bg-secondary'>
                    <div className='text-white'>Roles</div>
                  </Link>
                </li>
                <li>
                  <Link to="/access/users" className='hover:bg-secondary'>
                    <div className='text-white'>Usuarios</div>
                  </Link>
                </li>
              </ul>
            </details>
          </li>

          <li className='mb-0.5'>
            <a className='text-white hover:text-white hover:bg-white hover:bg-opacity-10'>Servicios</a>
          </li>
        </ul>
      </div>
    </div>
  );
}