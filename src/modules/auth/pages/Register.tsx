import "../styles/Login.css"

export default function Register() {
  return (
    <div className="login-container">
      <h2>Registro</h2>

      <form action="#">

      <div className="form-group">
          <label htmlFor="name">Nombre Establecimiento:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="username">Usuario:</label>
          <input type="text" id="username" name="username" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <button type="submit">Registrarse</button>
      </form>

    </div>
  );
}