import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import AppLoading from "../../../shared/components/AppLoading";
import AppLoadingProgress from "../../../shared/components/AppLoadingProgress";

import { UserWithRoleDto } from "../../../shared/dto/user.dto";
import { RoleDto } from "../../../shared/dto/role.dto";

import { GetRolesService } from "../services/getRoles.service";
import { CreateOrUpdateUserService } from "../services/createOrUpdateUser.service";

const createOrUpdateUserService = new CreateOrUpdateUserService();
const getRolesService = new GetRolesService();

interface IProps {
  user?: UserWithRoleDto | null;
}

export default function UsersForm ({ user }: IProps) {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const password = useRef(null);
  password.current = watch("password", "");

  const [roles, setRoles] = useState<RoleDto[] | []>([]);

  const [loadingSave, setLoadingSave] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getRoles = async () => {
      setLoading(true);

      try {
        setRoles(await getRolesService.run());
      } catch (e) {
        console.error('err:', e);
        setLoading(false);
      }

      setLoading(false);
    };

    getRoles();
  }, []);

  const save = handleSubmit(async (data) => {
    setLoadingSave(true);

    try {
      const dataSend: any = {
        roleId: data.roleId ? parseInt(data.roleId) : null,
        names: data.names,
        lastNames: data.lastNames,
        user: data.user,
        isActive: data.isActive ? 1 : 0,
      };

      if (data.password) dataSend.password = data.password;
      if (data.file && data.file[0]) dataSend.file = data.file[0];
      if (user?.id && user.avatar && !(data.file && data.file[0])) dataSend.urlImg = user.avatar;

      console.log('data', data);
      console.log('dataSend', dataSend);

      await createOrUpdateUserService.run(dataSend, user?.id);

      navigate('/access/users');
    } catch (e) {
      console.log('err', e);
      setLoadingSave(false);
    }

    setLoadingSave(false);
  });

  return (
    <>
      <form className="px-8 pt-4" onSubmit={save}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-0">{user ? 'Editar' : 'Agregar'}</h1>

          <div className="flex gap-2">
            <Link to="/access/users">
              <button className="btn btn-outline">Volver</button>
            </Link>

            <button className="btn btn-active btn-neutral">Guardar</button>
          </div>
        </div>

        <div className="divider"></div> 

        {loading ? ( <AppLoading /> ) : (  
          <section>
            {loadingSave && <AppLoadingProgress />}

            <div className="flex space-x-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Foto de perfil</span>
                </label>

                <input 
                  type="file" 
                  className="file-input file-input-bordered w-full" 
                  {...register('file')}
                />

                {errors.file && <span className="text-red-600 text-right">{errors.file.message as any}</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Rol</span>
                </label>

                <select 
                  className="select select-bordered w-full"
                  {...register('roleId', {
                    value: user?.roleId,
                    required: {
                      value: true,
                      message: "El rol es requerido"
                    }
                  })}
                >
                  {roles.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
                </select>

                {errors.roleId && <span className="text-red-600 text-right">{errors.roleId.message as any}</span>}
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nombres</span>
                </label>

                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  {...register('names', {
                    value: user?.names,
                    required: {
                      value: true,
                      message: "Los nombres son requeridos"
                    }
                  })}
                />

                {errors.names && <span className="text-red-600 text-right">{errors.names.message as any}</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Apellidos</span>
                </label>

                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  {...register('lastNames', {
                    value: user?.lastNames,
                    required: {
                      value: true,
                      message: "Los apellidos son requeridos"
                    }
                  })} 
                />

                {errors.lastNames && <span className="text-red-600 text-right">{errors.lastNames.message as any}</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Nombre de usuario</span>
                </label>

                <input 
                  type="text" 
                  className="input input-bordered w-full" 
                  {...register('user', {
                    value: user?.user,
                    required: {
                      value: true,
                      message: "El nombre de usuario es requerido"
                    }
                  })}
                />

                {errors.user && <span className="text-red-600 text-right">{errors.user.message as any}</span>}
              </div>
            </div>

            <div className="flex space-x-4">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Contraseña</span>
                </label>

                <input 
                  type="password" 
                  className="input input-bordered w-full" 
                  {...register('password', {
                    required: {
                      value: user?.id ? false : true,
                      message: "La contraseña es requerida"
                    }
                  })}
                />

                {errors.password && <span className="text-red-600 text-right">{errors.password.message as any}</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Confirmar contraseña</span>
                </label>

                <input 
                  type="password" 
                  className="input input-bordered w-full" 
                  {...register('confirmPassword', {
                    required: {
                      value: user?.id ? false : true,
                      message: "La confirmacion de contraseña es requerida"
                    },
                    validate: (value) => value == password.current || "Las contraseñas no coinciden",
                  })}
                />

                {errors.confirmPassword && <span className="text-red-600 text-right">{errors.confirmPassword.message as any}</span>}
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Usuario activo?</span>
                </label>

                <div className="flex items-center h-12">
                  <input 
                    type="checkbox" 
                    className="toggle" 
                    { ...register('isActive', {
                      value: user?.isActive ? true : false,
                    })}
                  />
                </div>
              </div>
            </div>
          </section>
        )}
      </form>
    </>
  );
}