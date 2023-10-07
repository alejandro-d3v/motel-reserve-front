import "../styles/Login.css";

export default function Register() {
  return (
    <div className="login-container">
      <h2>Registro</h2>

      <form action="#">

        <div className="form-group">
          <label htmlFor="name">Nombre Establecimiento:</label>
          <input type="text" id="name" name="name" required className="w-full md:w-1/2" />
          {/* La clase "w-full" hará que el ancho sea del 100% en dispositivos pequeños y "md:w-1/2" en dispositivos medianos */}
        </div>

        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input type="text" id="username" name="username" required className="w-full md:w-1/2" />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required className="w-full md:w-1/2" />
        </div>

        <button type="submit" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
}
