import { useState } from "react";

export default function Roles() {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Administrador',
      description: 'Rol de administrador con todos los permisos.',
      createdAt: '2023-10-26 10:00:00',
      updatedAt: '2023-10-26 10:00:00',
    },
    {
      id: 2,
      name: 'Usuario',
      description: 'Rol de usuario estándar con permisos limitados.',
      createdAt: '2023-10-26 11:00:00',
      updatedAt: '2023-10-26 11:00:00',
    },
  ]);

  const [newRole, setNewRole] = useState({ name: '', description: '' });

  const handleAddRole = () => {
    if (newRole.name && newRole.description) {
      setRoles([...roles, { id: roles.length + 1, ...newRole, createdAt: new Date().toString(), updatedAt: new Date().toString() }]);
      setNewRole({ name: '', description: '' });
    }
  };

  return (
    <>
      <div className="px-8 pt-4">
        <h1 className="text-3xl font-semibold mb-4">Roles</h1>

        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Crear Nuevo Rol</h2>
          <div className="flex space-x-4">
            <input
              type="text"
              placeholder="Nombre del Rol"
              className="p-2 border rounded-md flex-grow"
              value={newRole.name}
              onChange={(e) => setNewRole({ ...newRole, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Descripción"
              className="p-2 border rounded-md flex-grow"
              value={newRole.description}
              onChange={(e) => setNewRole({ ...newRole, description: e.target.value })}
            />
            <button className="bg-primary text-white p-2 rounded-md" onClick={handleAddRole}>
              Agregar Rol
            </button>
          </div>
        </div>

        <div className="divider"></div> 

        <div className="grid grid-cols-3 gap-4">
          {roles.map((item) => (
            <div key={item.id} className="card card-compact bg-base-100 shadow-xl">
              <div className="card-body">

                <h2 className="card-title">{item.name}</h2>

                <p>{item.description}</p>

                <div className="divider my-2"></div> 

                <div className="card-actions justify-between">
                  <button className="btn btn-sm btn-neutral">Permisos</button>

                  <div className="join">
                    <button className="btn btn-sm join-item btn-outline btn-neutral">Eliminar</button>
                    <button className="btn btn-sm join-item btn-outline btn-neutral">Editar</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}