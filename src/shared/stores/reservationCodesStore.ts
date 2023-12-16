import { create } from "zustand";

interface IReservationCodesStore {
  codes: string[];
  set: (codes: string[]) => void;
  clear: () => void;
}

export const reservationCodesStore = create<IReservationCodesStore>((set) => ({
  codes: [],
  set: (codes: string[]) => set((state) => ({ ...state, codes })),
  clear: () => set(() => ({ codes: [] }))
}))