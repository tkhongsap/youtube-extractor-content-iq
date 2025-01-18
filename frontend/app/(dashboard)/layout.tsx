'use client'

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <main className="flex-1 min-h-screen pt-16 pl-[72px]">
        {children}
      </main>
    </div>
  )
}

