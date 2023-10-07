import "../styles/Login.css"

export default function RestorePassword() {
  return (
    <div className="login-container">
      <h2>Restablecer Contraseña</h2>

      <form action="#">
        
        <div className="form-group">
          <label htmlFor="password">Nueva contraseña:</label>
          <input type="password" id="password" name="password" required />
        </div>

        <div className="form-group">
          <label htmlFor="password2">Confirmar contraseña:</label>
          <input type="password" id="password2" name="password2" required />
        </div>
        
        <button type="submit">Guardar</button>
      </form>
    </div>
  );
}