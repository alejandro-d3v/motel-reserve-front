import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import RoleForm from "../components/RoleForm";
import AppLoading from "../../../shared/components/AppLoading";
import AppModal from "../../../shared/components/Modal/AppModal";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";

import { RoleDto } from "../../../shared/dto/role.dto";

import { GetRolesService } from "../services/getRoles.service";
import { DeleteRoleService } from "../services/deleteRole.service";
import AppConfirmDeleteModal from "../../../shared/components/Modal/AppConfirmDeleteModal";

const deleteRoleService = new DeleteRoleService();
const getRolesService = new GetRolesService();

export default function Roles() {
  const [roles, setRoles] = useState<RoleDto[] | []>([]);
  const [role, setRole] = useState<RoleDto | null>(null);

  const [deleteModal, setDeleteModal] = useState(false);
  const [formModal, setFormModal] = useState(false);
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

  const openFormModal = (role: RoleDto | null = null) => {
    setFormModal(true);
    setRole(role);
  };
  const closeModalForm = async (d: any = null) => {
    if (!d || d.target.id != 'btnCloseModal') {
      try {
        setRoles(await getRolesService.run());
      } catch (e) {
        console.log('err', e);
      }
    }

    setFormModal(false);
    setRole(null);
  };

  const openDeleteModal = (role: RoleDto) => {
    console.log('openDeleteModal');

    setDeleteModal(true);
    setRole(role);
  };
  const closeDeleteModal = async (d: any = null) => {
    if (d.target.id != 'btnCloseModal') {
      if (role) {
        try {
          await deleteRoleService.run(role.id);

          setRoles(await getRolesService.run());
        } catch (e) {
          console.log('err', e);
        }
      }
    }

    setDeleteModal(false);
    setRole(null);
  };

  return (
    <>
      <div className="px-8 pt-4">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-semibold mb-0">Roles</h1>

          <button className="btn btn-neutral" disabled={ loading } onClick={ () => openFormModal() }>
            Agregar Rol
          </button>
        </div>

        <div className="divider"></div>

        {loading ? ( <AppLoading /> ) : (
          <>
            { !roles.length ? ( <AppEmptyResponse /> ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {roles.map((item) => (
                  <div key={item.id} className="card card-compact bg-base-100 shadow-xl">
                    <div className="card-body">
                      <h2 className="card-title">{item.name}</h2>

                      <p>{item.description}</p>

                      <div className="card-actions justify-between">
                        { item.name === "Administrador" ? ( <div></div> ) : (
                          <Link to={`${item.id}/access`}>
                            <button className="btn btn-sm join-item btn-outline btn-neutral">
                              Accesos
                            </button>
                          </Link>
                        )}

                        <div className="join">
                          <button className="btn btn-sm join-item btn-outline btn-neutral" onClick={ () => openDeleteModal(item) }>
                            Eliminar
                          </button>

                          <button className="btn btn-sm join-item btn-outline btn-neutral" onClick={ () => openFormModal(item) }>
                            Editar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <AppModal isOpen={ formModal } onClose={ closeModalForm }>
        <RoleForm data={ role } onClose={ closeModalForm } />
      </AppModal>

      <AppModal isOpen={ deleteModal } onClose={ closeDeleteModal }>
        <AppConfirmDeleteModal onClose={ closeDeleteModal } />
      </AppModal>
    </>
  );
}