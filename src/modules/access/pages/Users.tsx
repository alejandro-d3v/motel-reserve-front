import { useState } from "react";

export default function Users() {
  const [users] = useState([
    {
      id: 1,
      roleId: 1,
      names: 'John',
      lastnames: 'Doe',
      avatar: 'user1.jpg',
      username: 'johndoe',
      password: '********',
      isActive: 1,
      createdAt: '2023-10-26 10:00:00',
      updatedAt: '2023-10-26 10:00:00',
    },
    {
      id: 2,
      roleId: 2,
      names: 'Jane',
      lastnames: 'Smith',
      avatar: 'user2.jpg',
      username: 'janesmith',
      password: '********',
      isActive: 1,
      createdAt: '2023-10-26 10:15:00',
      updatedAt: '2023-10-26 10:15:00',
    },
    {
      id: 3,
      roleId: 1,
      names: 'Michael',
      lastnames: 'Johnson',
      avatar: 'user3.jpg',
      username: 'michaelj',
      password: '********',
      isActive: 1,
      createdAt: '2023-10-26 10:30:00',
      updatedAt: '2023-10-26 10:30:00',
    },
    {
      id: 4,
      roleId: 3,
      names: 'Sarah',
      lastnames: 'Brown',
      avatar: 'user4.jpg',
      username: 'sarahb',
      password: '********',
      isActive: 0,
      createdAt: '2023-10-26 10:45:00',
      updatedAt: '2023-10-26 10:45:00',
    },
    {
      id: 5,
      roleId: 2,
      names: 'David',
      lastnames: 'Wilson',
      avatar: 'user5.jpg',
      username: 'davidw',
      password: '********',
      isActive: 1,
      createdAt: '2023-10-26 11:00:00',
      updatedAt: '2023-10-26 11:00:00',
    },
    {
      id: 6,
      roleId: 1,
      names: 'Linda',
      lastnames: 'Davis',
      avatar: 'user6.jpg',
      username: 'lindad',
      password: '********',
      isActive: 1,
      createdAt: '2023-10-26 11:15:00',
      updatedAt: '2023-10-26 11:15:00',
    },
    {
      id: 7,
      roleId: 2,
      names: 'Christopher',
      lastnames: 'Lee',
      avatar: 'user7.jpg',
      username: 'christopherl',
      password: '********',
      isActive: 0,
      createdAt: '2023-10-26 11:30:00',
      updatedAt: '2023-10-26 11:30:00',
    },
  ]);

  return (
    <>
      <div className="px-8 pt-4">
        <h1 className="text-3xl font-semibold mb-4">Usuarios</h1>

        <div className="divider"></div> 

        <table className="table">
          <thead>
            <tr>
              <th className="p-3 font-semibold text-left">Nombres</th>
              <th className="p-3 font-semibold text-left">Username</th>
              <th className="p-3 font-semibold text-left">Estado</th>
              <th className="p-3 font-semibold text-left">Fecha de Creación</th>
              <th className="p-3 font-semibold text-left">Fecha de Actualización</th>
              <th className="p-3 font-semibold text-left">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td className="p-3">
                  <div className="flex items-center space-x-3">
                    <div>
                      <div className="font-bold">{user.names}</div>
                      <div className="text-sm opacity-50">{user.lastnames}</div>
                    </div>
                  </div>
                </td>
                <td className="p-3">{user.username}</td>
                <td className="p-3">{user.isActive ? 'Activo' : 'Inactivo'}</td>
                <td className="p-3">{user.createdAt}</td>
                <td className="p-3">{user.updatedAt}</td>
                <td className="p-3">
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}