import { create } from "zustand";

import { UserDto } from "../dto/user.dto";

interface IAuthenticatedUserStore {
  user: UserDto | null;
  set: (user: UserDto) => void;
  clear: () => void;
}

export const useAuthenticatedUserStore = create<IAuthenticatedUserStore>((set) => ({
  user: null,
  set: (user: UserDto) => set((state) => ({ ...state, user })),
  clear: () => set(() => ({ user: null }))
}))