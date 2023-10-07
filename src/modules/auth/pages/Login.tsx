import "../styles/Login.css";

export default function Login() {
  return (
    <div className="login-container">
      <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
        Iniciar Sesión
      </h2>

      <form action="#">
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input
            type="text"
            id="username"
            name="username"
            required
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 border rounded-md"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 px-4 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-md"
        >
          Iniciar Sesión
        </button>
      </form>

      <div className="forgot-password">
        <a href="#">¿Olvidaste tu contraseña?</a>
      </div>
    </div>
  );
}
