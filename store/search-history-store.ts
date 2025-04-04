import { create } from "zustand"
import { persist } from "zustand/middleware"

interface SearchHistoryState {
  searchHistory: string[]
  addSearchTerm: (term: string) => void
  clearHistory: () => void
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set, get) => ({
      searchHistory: [],
      addSearchTerm: (term) => {
        const trimmedTerm = term.trim()
        if (!trimmedTerm) return

        set((state) => {
          // Remove the term if it already exists to avoid duplicates
          const filteredHistory = state.searchHistory.filter((item) => item.toLowerCase() !== trimmedTerm.toLowerCase())

          // Add the new term at the beginning and limit to 5 items
          return {
            searchHistory: [trimmedTerm, ...filteredHistory].slice(0, 5),
          }
        })
      },
      clearHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: "search-history-storage",
    },
  ),
)

