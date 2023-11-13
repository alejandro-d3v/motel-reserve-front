import AppUserMenu from './AppUserMenu';

export default function AppNavbar({ toggleSidebar }: { toggleSidebar: any }) {
  return (
    <div className="navbar px-4 bg-primary">
      <div className="navbar-start">
        <div className="text-white cursor-pointer" onClick={toggleSidebar}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </div>
      </div>

      <div className="navbar-end">
        <AppUserMenu />
      </div>
    </div>
  );
}