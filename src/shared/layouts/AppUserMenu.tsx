import { Link } from 'react-router-dom';

import { useAuthenticatedUserStore } from '../stores/authenticatedUserStore';

import { SignOutService } from '../services/signOut.service';

const signOutService = new SignOutService();

export default function AppUserMenu() {
  const { user } = useAuthenticatedUserStore();

  const logout = () => {
    try {
      signOutService.run();

      setTimeout(() => window.location.reload(), 500);
    } catch (e) {
      console.log('err', e);
    }
  };

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="avatar placeholder">
        <div className='
            text-neutral-content rounded-full w-10 cursor-pointer
            ring ring-primary ring-offset-base-100 ring-offset-2'
          >
          <span className='text-2xl'>{user ? user.names.charAt(0) : '-'}</span>
        </div>
      </div>

      <ul tabIndex={0} className="dropdown-content z-[2] menu menu-sm mt-1 p-2 shadow bg-base-100 rounded w-52">
        <li>
          <a className="cursor-pointer p-2">Perfil</a>
        </li>

        <li>
          <Link to="/admin/home" className="cursor-pointer p-2">
            Administración
          </Link>
        </li>

        <li>
          {/* <div className='cursor-pointer p-2' onClick={ logout }>
            Cerrar sesión
          </div> */}

          <Link to="/" className="cursor-pointer p-2" onClick={ logout }>
            Cerrar sesión
          </Link>
        </li>
      </ul>
    </div>
  );
}