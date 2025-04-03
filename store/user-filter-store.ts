import { create } from "zustand"

interface UserFilterState {
  nameFilter: string
  setNameFilter: (name: string) => void
}

export const useUserFilterStore = create<UserFilterState>((set) => ({
  nameFilter: "",
  setNameFilter: (name) => set({ nameFilter: name }),
}))

