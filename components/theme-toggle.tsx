"use client"

import { useTheme } from "./theme-provider"
import { Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <Button variant="outline" size="sm" className="w-[100px] h-[32px]"></Button>
  }

  return (
    <Button variant="outline" size="sm" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4 mr-1" />
          Light Mode
        </>
      ) : (
        <>
          <Moon className="h-4 w-4 mr-1" />
          Dark Mode
        </>
      )}
    </Button>
  )
}

