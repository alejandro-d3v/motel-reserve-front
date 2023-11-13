import { useState } from "react";

import AppFormModal from "../../../shared/components/Modal/AppFormModal";

import { RoleDto } from "../../../shared/dto/role.dto";

import { CreateOrUpdateRoleService } from "../services/createOrUpdateRole.service";

const createOrUpdateRoleService = new CreateOrUpdateRoleService();

interface AppFormModalProps {
  onClose: () => void;
  data: RoleDto | null;
}

export default function RoleForm ({ onClose, data }: AppFormModalProps) {
  const [name, setName] = useState<string>(data?.name ?? '');
  const [description, setDescription] = useState<string>(data?.description ?? '');

  const save = async () => {
    try {
      if (name && description) {
        const dataSend = { name, description };

        await createOrUpdateRoleService.run(dataSend, data?.id);
      }
    } catch (e) {
      console.log('err', e);
    }
  };

  return (
    <AppFormModal
      onClose={ onClose }
      title={ !data ? 'Nuevo Rol' : 'Editar Rol' }
      content={
        <div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Nombre</span>
            </label>

            <input 
              type="text" 
              className="input input-bordered w-full"
              value={ name }
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="form-control">
            <label className="label">
              <span className="label-text">Descripción</span>
            </label>

            <textarea 
              className="textarea textarea-bordered h-24"
              value={ description }
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
        </div>
      }
      actions={
        // <button className="btn btn-neutral" onClick={ () => {save(); onClose} }>Guardar</button>
        // <button className="btn btn-neutral" onClick={ () => {onClose; save()} }>Guardar</button>
        <button id="btnSave" className="btn btn-neutral" onClick={async () => { await save(); onClose(); }}>Guardar</button>
      }
    />
  );
}