import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import AppLoading from "../../../shared/components/AppLoading";
import AppEmptyResponse from "../../../shared/components/AppEmptyResponse";

import { ItemDto } from "../dtos/item.dto";
import { ModuleDto } from "../dtos/module.dto";
import { RoleDto } from "../../../shared/dto/role.dto";

import { GetRoleService } from "../services/getRole.service";
import { GetModulesService } from "../services/getModules.service";
import { GetItemsByModuleIdService } from "../services/getItemsByModuleId.service";

const getItemsByModuleIdService = new GetItemsByModuleIdService();
const getModulesService = new GetModulesService();
const getRoleService = new GetRoleService();

export default function RoleAccess () {
  const params = useParams();

  const [moduleId, setModuleId] = useState<number | null>(null);
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
  }, []);

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
                        <th className="p-3 font-semibold text-left">Acción</th>
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