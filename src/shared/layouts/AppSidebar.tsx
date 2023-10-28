import './styles/AppSidebar.css';

export default function AppSidebar({ isVisible  }: { isVisible: boolean }) {
  return (
    <div className={`sidebar bg-primary ${isVisible ? 'show' : ''} px-2 pt-3`}>
      <div className="flex items-center justify-center flex-col">
        <div className='border-2 w-16 h-16 rounded-full flex items-center justify-center text-white'>
          <span className='text-3xl'>A</span>
        </div>

        <div className='mt-2 text-white'>
          <div className='text-center'>
            <span>Angel Baldomero Minguez Pina</span>
          </div>
          <div className='text-center'>
            <span className='text-white text-opacity-70'>Administrador</span>
          </div>
        </div>
      </div>

      <hr className='border-2 rounded border-white border-opacity-5 my-3' />

      <div className='mb-2'>
        <h5 className='text-white text-opacity-50 font-bold uppercase'>General</h5>

        <ul className="menu px-0">
          <li className='mb-0.5'>
            <a href='/admin/home' className='text-white hover:text-white hover:bg-white hover:bg-opacity-10'>Inicio</a>
          </li>

          <li>
            <details open>
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
            <details open>
              <summary className='text-white hover:text-white hover:bg-white hover:bg-opacity-10'>Administrar Usuarios</summary>

              <ul>
                <li>
                  <a href='/access/roles' className='text-white hover:text-white hover:bg-white hover:bg-opacity-10'>Roles</a>
                </li>
                <li>
                  <a href='/access/users' className='text-white hover:text-white hover:bg-white hover:bg-opacity-10'>Usuarios</a>
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