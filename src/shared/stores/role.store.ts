import { create } from "zustand";

import { RoleDto } from "../dto/role.dto";

interface IRoleStore {
  role: RoleDto | null;
  set: (user: RoleDto) => void;
  clear: () => void;
}

export const useRoleStore = create<IRoleStore>((set) => ({
  role: null,
  set: (role: RoleDto) => set((state) => ({ ...state, role })),
  clear: () => set(() => ({ role: null }))
}))