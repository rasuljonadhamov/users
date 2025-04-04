"use client"

import type React from "react"

import { useToast } from "@/hooks/use-toast"

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const { ToastContainer } = useToast()

  return (
    <>
      {children}
      <ToastContainer />
    </>
  )
}

