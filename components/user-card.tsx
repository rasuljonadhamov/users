import type { User } from "@/types/user"

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow dark:bg-gray-800">
      <h2 className="text-xl font-semibold mb-2">{user.name}</h2>
      <p className="text-gray-600 mb-1 dark:text-gray-300">@{user.username}</p>
      <p className="text-gray-600 mb-1 dark:text-gray-300">{user.email}</p>
      <p className="text-gray-600 mb-1 dark:text-gray-300">{user.phone}</p>
      <p className="text-gray-600 dark:text-gray-300">{user.website}</p>
      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-gray-700 font-medium dark:text-gray-200">Company</p>
        <p className="text-gray-600 dark:text-gray-300">{user.company.name}</p>
      </div>
    </div>
  )
}

