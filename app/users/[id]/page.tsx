"use client"

import { useQuery } from "@tanstack/react-query"
import type { User } from "@/types/user"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building } from "lucide-react"

export default function UserDetailPage() {
  const params = useParams()
  const router = useRouter()
  const userId = params.id as string

  const {
    data: user,
    isLoading,
    error,
  } = useQuery<User>({
    queryKey: ["user", userId],
    queryFn: async () => {
      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      if (!response.ok) {
        throw new Error("Failed to fetch user")
      }
      return response.json()
    },
  })

  if (isLoading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="max-w-3xl mx-auto">
          <div className="h-8 w-48 bg-gray-200 dark:bg-gray-700 rounded mb-4"></div>
          <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-8"></div>
          <div className="space-y-6">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !user) {
    return (
      <div className="container mx-auto py-8 px-4">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>
        <div className="bg-red-50 p-4 rounded-md border border-red-200 text-red-700 my-4 max-w-3xl mx-auto">
          <h3 className="font-semibold">Error loading user</h3>
          <p>{error?.message || "User not found"}</p>
          <Button className="mt-2" variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold mb-1">{user.name}</h1>
              <p className="text-gray-600 dark:text-gray-300">@{user.username}</p>
            </div>
            <div className="w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-2xl font-semibold">
              {user.name.charAt(0)}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2 border-gray-200 dark:border-gray-700">
                Contact Information
              </h2>

              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                  <a href={`mailto:${user.email}`} className="hover:underline">
                    {user.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                  <a href={`tel:${user.phone}`} className="hover:underline">
                    {user.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
                  <a
                    href={`https://${user.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {user.website}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-lg font-semibold border-b pb-2 border-gray-200 dark:border-gray-700">Address</h2>

              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                  <p>
                    {user.address.street}, {user.address.suite}
                    <br />
                    {user.address.city}, {user.address.zipcode}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Geo: {user.address.geo.lat}, {user.address.geo.lng}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold border-b pb-2 mb-4 border-gray-200 dark:border-gray-700">
            Company Information
          </h2>

          <div className="flex items-start gap-3">
            <Building className="w-5 h-5 text-gray-500 dark:text-gray-400 mt-1" />
            <div>
              <h3 className="font-medium">{user.company.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 italic mt-1">"{user.company.catchPhrase}"</p>
              <p className="text-gray-500 dark:text-gray-400 mt-2">{user.company.bs}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

