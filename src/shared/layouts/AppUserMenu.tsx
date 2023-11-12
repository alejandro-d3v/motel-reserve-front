import { useAuthenticatedUserStore } from '../stores/authenticatedUserStore';

import './styles/AppUserMenu.css';

export default function AppUserMenu() {
  const { user } = useAuthenticatedUserStore();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} className="border-solid border-2 rounded-full w-10 h-10 flex justify-center text-white items-center cursor-pointer hover:bg-white hover:text-primary">
        <span className='text-lg uppercase'>{user ? user.names.charAt(0) : '-'}</span>
      </div>

      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-1 z-[1] p-2 shadow bg-base-100 rounded w-52">
        <li>
          <a className="p-2">Profile</a>
        </li>

        <li>
          <a className='p-2'>Logout</a>
        </li>
      </ul>
    </div>
  );
}