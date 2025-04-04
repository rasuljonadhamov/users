"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Search, X, Clock } from "lucide-react"

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  className?: string
  recentSearches?: string[]
}

export default function SearchInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Search...",
  className = "",
  recentSearches = [],
}: SearchInputProps) {
  const [showRecent, setShowRecent] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowRecent(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(value)
    }
  }

  const handleRecentSearch = (term: string) => {
    onChange(term)
    if (onSubmit) {
      onSubmit(term)
    }
    setShowRecent(false)
  }

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="pr-8"
            onFocus={() => recentSearches.length > 0 && setShowRecent(true)}
          />
          {value && (
            <button
              type="button"
              onClick={() => {
                onChange("")
                inputRef.current?.focus()
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {showRecent && recentSearches.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 shadow-lg rounded-md border border-gray-200 dark:border-gray-700 py-1 max-h-60 overflow-auto"
        >
          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400">Recent Searches</div>
          {recentSearches.map((term, index) => (
            <button
              key={index}
              className="flex items-center w-full px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
              onClick={() => handleRecentSearch(term)}
            >
              <Clock className="h-3 w-3 mr-2 text-gray-400" />
              {term}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

