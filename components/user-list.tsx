"use client"
import { useQuery } from "@tanstack/react-query"
import { useUserFilterStore } from "@/store/user-filter-store"
import type { User } from "@/types/user"
import UserCard from "./user-card"
import SearchInput from "./search-input"
import { fetchUsers } from "@/services/api"

export default function UserList() {
  const { nameFilter, setNameFilter } = useUserFilterStore()

  const { data: users, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  const filteredUsers = Array.isArray(users) 
  ? users.filter((user: User) => user.name.toLowerCase().includes(nameFilter.toLowerCase())) 
  : [];

  if (isLoading) return <div className="flex justify-center py-8">Loading users...</div>

  if (error) return <div className="text-red-500">Error loading users: {error.message}</div>

  return (
    <div>
      <SearchInput value={nameFilter} onChange={setNameFilter} placeholder="Filter users by name..." className="mb-6" />

      {filteredUsers.length === 0 ? (
        <p className="text-center py-8 text-gray-500">No users match your search criteria</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUsers.map((user:User) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  )
}

