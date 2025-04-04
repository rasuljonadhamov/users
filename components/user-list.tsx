
"use client"

import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { useUserFilterStore } from "@/store/user-filter-store"
import type { User } from "@/types/user"
import UserCard from "./user-card"
import SearchInput from "./search-input"
import { Pagination } from "./ui/pagination"
import { Button } from "./ui/button"
import { type SortOptions, useUserSortStore } from "@/store/user-sort-store"
import { UserSkeleton } from "./user-skeleton"
import { useToast } from "@/hooks/use-toast"
import { useSearchHistoryStore } from "@/store/search-history-store"
import { fetchUsers } from "@/services/api"

export default function UserList() {
  const { nameFilter, setNameFilter } = useUserFilterStore()
  const { sortBy, sortOrder, setSortBy, setSortOrder } = useUserSortStore()
  const { addSearchTerm, searchHistory } = useSearchHistoryStore()
  const { toast } = useToast()

  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

    const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

    const filteredUsers = Array.isArray(users) 
  ? users.filter((user: User) => user.name.toLowerCase().includes(nameFilter.toLowerCase())) 
  : [];

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    let comparison = 0

    if (sortBy === "name") {
      comparison = a.name.localeCompare(b.name)
    } else if (sortBy === "username") {
      comparison = a.username.localeCompare(b.username)
    } else if (sortBy === "email") {
      comparison = a.email.localeCompare(b.email)
    } else if (sortBy === "company") {
      comparison = a.company.name.localeCompare(b.company.name)
    }

    return sortOrder === "asc" ? comparison : -comparison
  })

  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage)
  const paginatedUsers = sortedUsers.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (term: string) => {
    setNameFilter(term)
    if (term.trim()) {
      addSearchTerm(term)
      toast({
        title: "Search applied",
        description: `Showing results for "${term}"`,
      })
    }
    setCurrentPage(1)
  }

  const handleSortChange = (field: SortOptions) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortBy(field)
      setSortOrder("asc")
    }
    setCurrentPage(1) 
  }

  const renderSortIndicator = (field: SortOptions) => {
    if (sortBy !== field) return null
    return sortOrder === "asc" ? " ↑" : " ↓"
  }

  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700 my-4">
        <h3 className="font-semibold">Error loading users</h3>
        <p>{error.message}</p>
        <Button className="mt-2" variant="outline" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </div>
    )

  return (
    <div>
      <div className="mb-6 space-y-4">
        <SearchInput
          value={nameFilter}
          onChange={setNameFilter}
          onSubmit={handleSearch}
          placeholder="Filter users by name..."
          recentSearches={searchHistory}
        />

        <div className="flex flex-wrap gap-2 items-center text-sm">
          <span className="font-medium">Sort by:</span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSortChange("name")}
            className={sortBy === "name" ? "font-semibold" : ""}
          >
            Name{renderSortIndicator("name")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSortChange("username")}
            className={sortBy === "username" ? "font-semibold" : ""}
          >
            Username{renderSortIndicator("username")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSortChange("email")}
            className={sortBy === "email" ? "font-semibold" : ""}
          >
            Email{renderSortIndicator("email")}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSortChange("company")}
            className={sortBy === "company" ? "font-semibold" : ""}
          >
            Company{renderSortIndicator("company")}
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6)
            .fill(0)
            .map((_, index) => (
              <UserSkeleton key={index} />
            ))}
        </div>
      ) : paginatedUsers.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg dark:bg-gray-800">
          <p className="text-gray-500 dark:text-gray-400 mb-2">No users match your search criteria</p>
          {nameFilter && (
            <Button variant="outline" onClick={() => setNameFilter("")}>
              Clear Filter
            </Button>
          )}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {paginatedUsers.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </>
      )}
    </div>
  )
}


