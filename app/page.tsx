import UserList from "@/components/user-list"
import { ThemeToggle } from "@/components/theme-toggle"

export default function Home() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Users</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Hello...</p>
        </div>
        <ThemeToggle />
      </div>

      <UserList />
    </main>
  )
}

