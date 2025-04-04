import { create } from "zustand"

export type SortOptions = "name" | "username" | "email" | "company"
export type SortOrder = "asc" | "desc"

interface UserSortState {
  sortBy: SortOptions
  sortOrder: SortOrder
  setSortBy: (field: SortOptions) => void
  setSortOrder: (order: SortOrder) => void
}

export const useUserSortStore = create<UserSortState>((set) => ({
  sortBy: "name",
  sortOrder: "asc",
  setSortBy: (field) => set({ sortBy: field }),
  setSortOrder: (order) => set({ sortOrder: order }),
}))

