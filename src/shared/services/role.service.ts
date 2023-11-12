import { useRoleStore } from "../stores/role.store";

import { RoleDto } from "../dto/role.dto";

export class RoleService {
  private key = 'rol';

  get(): RoleDto | null {
    const rol = localStorage.getItem(this.key);

    if (rol) return JSON.parse(rol);
    return null;
  }

  set(rol: RoleDto): void {
    localStorage.setItem(this.key, JSON.stringify(rol));

    const store = useRoleStore.getState();
    store.set(rol);
  }
}