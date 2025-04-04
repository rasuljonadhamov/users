"use client"

import type { User } from "@/types/user"
import Link from "next/link"
import { useState } from "react"
import { Button } from "./ui/button"
import { Mail, Phone, Globe, Building, ChevronDown, ChevronUp } from "lucide-react"

interface UserCardProps {
  user: User
}

export default function UserCard({ user }: UserCardProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow dark:bg-gray-800 flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-xl font-semibold mb-1">{user.name}</h2>
          <p className="text-gray-600 mb-2 dark:text-gray-300">@{user.username}</p>
        </div>
        <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-lg font-semibold">
          {user.name.charAt(0)}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Mail className="w-4 h-4" />
          <a href={`mailto:${user.email}`} className="hover:underline">
            {user.email}
          </a>
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Phone className="w-4 h-4" />
          <a href={`tel:${user.phone}`} className="hover:underline">
            {user.phone}
          </a>
        </div>

        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
          <Globe className="w-4 h-4" />
          <a href={`https://${user.website}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
            {user.website}
          </a>
        </div>
      </div>

      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700 space-y-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Building className="w-4 h-4" />
              <p className="text-gray-700 font-medium dark:text-gray-200">Company</p>
            </div>
            <p className="text-gray-600 dark:text-gray-300 pl-6">{user.company.name}</p>
            <p className="text-gray-500 dark:text-gray-400 text-sm italic pl-6">"{user.company.catchPhrase}"</p>
          </div>

          <div>
            <p className="text-gray-700 font-medium dark:text-gray-200 mb-1">Address</p>
            <p className="text-gray-600 dark:text-gray-300">
              {user.address.street}, {user.address.suite}
              <br />
              {user.address.city}, {user.address.zipcode}
            </p>
          </div>
        </div>
      )}

      <div className="mt-auto pt-4">
        <div className="flex justify-between items-center">
          <Link href={`/users/${user.id}`}>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </Link>

          <Button variant="ghost" size="sm" onClick={() => setExpanded(!expanded)} className="flex items-center gap-1">
            {expanded ? (
              <>
                Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                More <ChevronDown className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}

