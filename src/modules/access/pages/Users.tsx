import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AppLoading from "../../../shared/components/AppLoading";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";
import AppLoadingProgress from "../../../shared/components/AppLoadingProgress";

import { UserWithRoleDto } from "../../../shared/dto/user.dto";

import { GetUsersService } from "../services/getUsers.service";

const getUsersService = new GetUsersService();

export default function Users() {
  const [users, setUsers] = useState<UserWithRoleDto[]>([]);
  const [search, setSearch] = useState<any>(null);

  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    const getData = async () => {
      await getUsers();
      setLoadingSearch(false);
    };
  
    getData();
  }, [search]);

  const getUsers = async () => {
    try {
      const params: { search?: string } = {};
      if (search) params.search = search;

      setUsers(await getUsersService.run(params));
    } catch (e) {
      console.error("err:", e);
    }

    setLoading(false);
    setLoadingSearch(false);
  };

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoadingSearch(true);
    setSearch(event.target.value);
  };

  return (
    <>
      <div className="px-8 pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-0">Usuarios</h1>

          <Link to="create">
            <button className="btn btn-neutral" disabled={ loading }>
              Agregar Usuario
            </button>
          </Link>
        </div>

        <div className="divider"></div> 

        <div>
          <input
            type="text"
            placeholder="Buscar usuarios..."
            value={search || ''}
            onChange={handleSearchChange}
            className="input input-bordered w-full"
          />
        </div>

        {loadingSearch && <AppLoadingProgress />}

        <table className="table">
          <thead>
            <tr>
              <th className="p-3 font-semibold text-left">Nombres</th>
              <th className="p-3 font-semibold text-left">Username</th>
              <th className="p-3 font-semibold text-left">Estado</th>
              <th className="p-3 font-semibold text-left">Rol</th>
              <th className="p-3 font-semibold text-center w-32">Opciones</th>
            </tr>
          </thead>

          <tbody>
            {loading ? ( <tr><td colSpan={4}><AppLoading /></td></tr> ) : (
              <>
                { !users.length ? ( <tr><td colSpan={4}><AppEmptyResponse /></td></tr> ) : (
                  <>
                    {users.map((user) => (
                      <tr key={user.id}>
                        <td className="p-3">
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="font-bold">{user.names}</div>
                              <div className="text-sm opacity-50">{user.lastNames}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-3">{user.user}</td>
                        <td className="p-3">{user.isActive ? 'Activo' : 'Inactivo'}</td>
                        <td className="p-3"><div className="badge badge-neutral">{user.role?.name ?? '---'}</div></td>
                        <td>
                          <div className="flex justify-center">
                            <Link to={`${user.id}/edit`}>
                              <button className="btn btn-sm join-item btn-outline btn-neutral">
                                Editar
                              </button>
                            </Link>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </>
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}