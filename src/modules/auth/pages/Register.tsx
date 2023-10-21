import "../styles/Login.css";

export default function Register() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="bg-white p-8 rounded-lg shadow-lg w-2/4">
          <h2 className="text-2xl font-semibold mb-4">Registro</h2>

          <form>
            <div className="mb-4">
              <label htmlFor="nombre-establecimiento" className="block text-sm font-medium text-gray-700">Nombre del Establecimiento</label>
              <input 
                type="text" 
                id="nombre-establecimiento" 
                name="nombre-establecimiento" 
                className="mt-1 p-2 outline-none rounded-md w-full text-secondary shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-quaternary" 
                required 
              />
            </div>

            <div className="mb-4">
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario</label>
              <input 
                type="text" 
                id="usuario" 
                name="usuario" 
                className="mt-1 p-2 outline-none rounded-md w-full text-secondary shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-quaternary" 
                required 
              />
            </div>

            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
                <input 
                  type="password" 
                  id="contrasena" 
                  name="contrasena" 
                  className="mt-1 p-2 outline-none rounded-md w-full text-secondary shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-quaternary" 
                  required 
                />
              </div>

              <div className="flex-1">
                <label htmlFor="confirmar-contrasena" className="block text-sm font-medium text-gray-700">Confirmar Contraseña</label>
                <input 
                  type="password" 
                  id="confirmar-contrasena" 
                  name="confirmar-contrasena" 
                  className="mt-1 p-2 outline-none rounded-md w-full text-secondary shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-quaternary" 
                  required 
                />
              </div>
            </div>

            <button type="submit" className="bg-quaternary text-white p-2 rounded-md w-full">Registrarse</button>
          </form>
        </div>
      </div>
    </>
  );
}
