"use client"

import Link from "next/link"
import { cn } from "@/lib/utils"

interface MainNavProps {
  className?: string
}

export function MainNav({ className }: MainNavProps) {
  return (
    <nav className={cn("flex items-center", className)}>
      <Link
        href="/dashboard"
        className="text-xl font-bold text-purple-600 hover:text-purple-500 transition-colors px-8 py-4"
      >
        ContentIQ
      </Link>
    </nav>
  )
} 