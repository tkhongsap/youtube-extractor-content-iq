"use client"

import { useState } from 'react'
import { Header } from '@/components/Header'
import { Sidebar } from '@/components/Sidebar'
import { MainContent } from '@/components/MainContent'

export default function Home() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Header />
      <Sidebar isCollapsed={isSidebarCollapsed} />
      <MainContent />
    </div>
  )
}

