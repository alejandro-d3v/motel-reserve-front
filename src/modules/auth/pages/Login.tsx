import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/Login.css";

export default function Login() {
  const navigate = useNavigate()

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: any) => {
    e.preventDefault();

    console.log('form', { userName, password });

    navigate('/admin/home');
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <div className="bg-white p-8 rounded-lg shadow-lg w-1/4">
          <h2 className="text-2xl font-semibold mb-4">Iniciar Sesión</h2>

          <form onSubmit={handleFormSubmit}>
            <div className="mb-4">
              <label htmlFor="usuario" className="block text-sm font-medium text-gray-700">Usuario</label>
              <input 
                type="text" 
                id="usuario" 
                name="usuario" 
                className="mt-1 p-2 outline-none rounded-md w-full text-secondary shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-quaternary" 
                required 
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label htmlFor="contrasena" className="block text-sm font-medium text-gray-700">Contraseña</label>
              <input 
                type="password" 
                id="contrasena" 
                name="contrasena" 
                className="mt-1 p-2 outline-none rounded-md w-full text-secondary shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-inset focus:ring-quaternary" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="bg-quaternary text-white p-2 rounded-md w-full">Iniciar Sesión</button>

            <div className="forgot-password">
              <a href="#">¿Olvidaste tu contraseña?</a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
