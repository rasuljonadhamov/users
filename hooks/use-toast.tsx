"use client"

import { useState, useEffect } from "react"

type ToastProps = {
  title: string
  description?: string
  duration?: number
}

type Toast = ToastProps & {
  id: string
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const toast = ({ title, description, duration = 3000 }: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    const newToast = { id, title, description, duration }

    setToasts((prevToasts) => [...prevToasts, newToast])

    return id
  }

  const dismiss = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }

  // Auto dismiss toasts after their duration
  useEffect(() => {
    if (toasts.length === 0) return

    const timers = toasts.map((toast) => {
      return setTimeout(() => {
        dismiss(toast.id)
      }, toast.duration)
    })

    return () => {
      timers.forEach((timer) => clearTimeout(timer))
    }
  }, [toasts])

  // Render the toasts
  const ToastContainer = () => {
    if (toasts.length === 0) return null

    return (
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 max-w-sm animate-in slide-in-from-right"
          >
            <div className="flex justify-between items-start">
              <h3 className="font-medium">{toast.title}</h3>
              <button onClick={() => dismiss(toast.id)} className="text-gray-400 hover:text-gray-500">
                ×
              </button>
            </div>
            {toast.description && <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{toast.description}</p>}
          </div>
        ))}
      </div>
    )
  }

  return { toast, dismiss, ToastContainer }
}

