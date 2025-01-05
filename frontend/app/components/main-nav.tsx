"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/dashboard",
      label: "Dashboard",
    },
  ]

  return (
    <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)}>
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className="text-sm font-medium transition-colors hover:text-primary"
        >
          {route.label}
        </Link>
      ))}
    </nav>
  )
} 