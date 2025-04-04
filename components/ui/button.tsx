import * as React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost" | "link"
  size?: "default" | "sm" | "lg"
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "default", size = "default", ...props }, ref) => {
    const variantClasses = {
      default: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
      ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
      link: "bg-transparent underline-offset-4 hover:underline text-gray-900 dark:text-gray-100 hover:bg-transparent",
    }

    const sizeClasses = {
      default: "h-10 py-2 px-4",
      sm: "h-8 px-3 text-sm",
      lg: "h-12 px-6",
    }

    const baseClasses =
      "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

    return (
      <button
        className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  },
)

Button.displayName = "Button"

type ButtonVariants = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

export function buttonVariants({
  variant,
  size,
  className,
}: {
  variant?: ButtonVariants
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
} = {}) {
  const variantClasses = {
    default: "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-200",
    outline: "border border-gray-300 bg-transparent hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800",
    ghost: "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800",
    link: "bg-transparent underline-offset-4 hover:underline text-gray-900 dark:text-gray-100 hover:bg-transparent",
    destructive: "bg-red-600 text-white hover:bg-red-500 dark:bg-red-900 dark:text-red-50 dark:hover:bg-red-700",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700",
  }

  const sizeClasses = {
    default: "h-10 py-2 px-4",
    sm: "h-8 px-3 text-sm",
    lg: "h-12 px-6",
    icon: "h-9 w-9",
  }

  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none"

  return `${baseClasses} ${variantClasses[variant || "default"]} ${sizeClasses[size || "default"]} ${className || ""}`
}

