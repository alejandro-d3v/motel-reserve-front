import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { LoginService } from "../services/login.service";

const loginService = new LoginService();

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = () => {
    setLoading(true);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataSend = { username, password };

        await loginService.run(dataSend);

        navigate('/admin/home');
        setTimeout(() => window.location.reload(), 500);
      } catch (e) {
        console.log('err', e);
      }

      setLoading(false);
    };

    if (loading) fetchData();
  }, [loading]);

  return (
    <>
      <div className="hero min-h-screen bg-primary">
        <div className="hero-content card flex-col lg:flex-row-reverse gap-1 bg-base-100 shadow-2xl">
          <div className="text-center p-8 pb-1 lg:pb-8">
            <h1 className="text-5xl font-bold">¡Bienvenido!</h1>
            <p className="py-6">Inicia sesión para acceder al Panel de Administración.</p>
          </div>

          <div className="divider lg:divider-horizontal m-0"></div> 

          <div className="card flex-shrink-0 w-full max-w-sm">
            <form className="card-body">
              {loading &&  (
                <div className="text-center">
                  <span className="loading loading-dots loading-lg"></span>
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Usuario</span>
                </label>

                <input 
                  type="email" placeholder="Usuario" 
                  className="input input-bordered" 
                  autoComplete="current-password"
                  value={ username } disabled={ loading }
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Contraseña</span>
                </label>

                <input 
                  type="password" placeholder="Contraseña" 
                  className="input input-bordered" 
                  autoComplete="current-password"
                  value={ password } disabled={ loading }
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={ loading } onClick={ login }>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
