import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import AppLoading from "../../../shared/components/AppLoading";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";

import { ItemDto } from "../dtos/item.dto";
import { ModuleDto } from "../dtos/module.dto";
import { RolItemsDto } from "../dtos/rolItems.dto";
import { RoleDto } from "../../../shared/dto/role.dto";

import { GetRoleService } from "../services/getRole.service";
import { GetModulesService } from "../services/getModules.service";
import { GetRolItemsService } from "../services/getRolItems.service";
import { CreatePermissionService } from "../services/createPermission.service";
import { DeletePermissionService } from "../services/deletePermission.service";
import { GetItemsByModuleIdService } from "../services/getItemsByModuleId.service";

const getItemsByModuleIdService = new GetItemsByModuleIdService();
const createPermissionService = new CreatePermissionService();
const deletePermissionService = new DeletePermissionService();
const getRolItemsService = new GetRolItemsService();
const getModulesService = new GetModulesService();
const getRoleService = new GetRoleService();

export default function RoleAccess () {
  const params = useParams();

  const [permissions, setPermissions] = useState<RolItemsDto[]>([]);
  const [moduleId, setModuleId] = useState<number | null>(null);
  const [rolItems, setRolItems] = useState<ItemDto[]>([]);
  const [modules, setModules] = useState<ModuleDto[]>([]);
  const [rol, setRol] = useState<RoleDto | null>(null);
  const [items, setItems] = useState<ItemDto[]>([]);

  const [loadingItems, setLoadingItems] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      try {
        setRol(await getRoleService.run(params.rolId));
        setModules(await getModulesService.run());
      } catch (e) {
        console.error('err:', e);
        setTimeout(() => setLoading(false), 300);
      }

      setTimeout(() => setLoading(false), 300);
    };

    getData();
    getRolItems();
  }, []);

  const getRolItems =  async () => {
    try {
      const res = await getRolItemsService.run(params.rolId);

      const items = res.map(element => element.item);

      setRolItems(items);
      setPermissions(res);
    } catch (e) {
      console.log('err', e);
    }
  }

  useEffect(() => {
    const getItems = async () => {
      setLoadingItems(true);

      try {
        if (moduleId) {
          setItems(await getItemsByModuleIdService.run(parseInt(moduleId as any)));
        }
      } catch (e) {
        console.error('err:', e);
        setLoadingItems(false);
      }

      setLoadingItems(false);
    };

    getItems();
  }, [moduleId]);

  const addPermission = async (itemId: number) => {
    try {
      const dataSend = {
        roleId: params.rolId ? parseInt(params.rolId) : 0,
        itemId: itemId
      };

      await createPermissionService.run(dataSend);

      await getRolItems();
    } catch (e) {
      console.log('err', e);
    }
  };
  const removePermission = async (itemId: number) => {
    try {
      const rolItem = permissions.filter(element => element.item.id == itemId)[0];

      await deletePermissionService.run(rolItem.id);

      await getRolItems();
    } catch (e) {
      console.log('err', e);
    }
  };

  return (
    <>
      {loading ? ( <AppLoading /> ) : (
        <>
          {rol && (
            <div className="px-8 pt-4">
              <div className="flex justify-between items-center">
                <h1 className="text-3xl font-semibold mb-0">{rol.name}</h1>

                <div className="flex gap-2 items-end">
                  <Link to="/access/roles">
                    <button className="btn btn-outline">Volver</button>
                  </Link>

                  <div className="form-control w-48">
                    <label className="label">
                      <span className="label-text">Módulos <span className="hidden">{moduleId}</span></span>
                    </label>

                    <select className="select select-bordered" value={moduleId || ''} onChange={(e: any) => setModuleId(e.target.value)}>
                      <option value=""></option>
                      { modules.map(item => <option key={item.id} value={item.id}>{item.name}</option>) }
                    </select>
                  </div>
                </div>
              </div>

              <div className="divider"></div>

              {loadingItems ? ( <AppLoading /> ) : (
                <>
                  <table className="table">
                    <thead>
                      <tr>
                        <th className="p-3 font-semibold text-left">Nombre</th>
                        <th className="p-3 font-semibold text-left">URL</th>
                        <th className="p-3 font-semibold text-center">Acción</th>
                      </tr>
                    </thead>

                    <tbody>
                      { !items.length ? ( <tr><td colSpan={3}><AppEmptyResponse /></td></tr> ) : (
                        <>
                          {items.map((item, index) => (
                            <tr key={index}>
                              <td className={`p-3 ${!item.itemId && !item.url ? 'font-bold' : ''}`}>
                                <span className={`${item.itemId ? 'ms-3' : ''}`}>{item.name}</span>
                              </td>
                              <td className="p-3">{item.url}</td>

                              <td className="p-3 text-center">
                                {item.url && (
                                  <>
                                    {rolItems.some(element => element.id == item.id) ? 
                                      ( <div className="badge badge-neutral cursor-pointer" onClick={() => removePermission(item.id)}>Con acceso</div> ) : 
                                      ( <div className="badge badge-neutral badge-outline cursor-pointer" onClick={() => addPermission(item.id)}>Sin acceso</div> )
                                    }
                                  </>
                                )}
                              </td>
                            </tr>
                          ))}
                        </>
                      )}
                    </tbody>
                  </table>
                </>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
}