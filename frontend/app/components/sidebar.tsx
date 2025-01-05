import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Home, Search, BarChart2, BookOpen, History } from 'lucide-react'
import Link from "next/link"

export function Sidebar() {
  return (
    <div className="pb-12 min-h-screen">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
            <Link href="/dashboard/search">
              <Button variant="ghost" className="w-full justify-start">
                <Search className="mr-2 h-4 w-4" />
                Search
              </Button>
            </Link>
            <Link href="/dashboard/analytics">
              <Button variant="ghost" className="w-full justify-start">
                <BarChart2 className="mr-2 h-4 w-4" />
                Analytics
              </Button>
            </Link>
            <Link href="/dashboard/library">
              <Button variant="ghost" className="w-full justify-start">
                <BookOpen className="mr-2 h-4 w-4" />
                Library
              </Button>
            </Link>
          </div>
        </div>
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">Recent Analysis</h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start font-normal">
                <History className="mr-2 h-4 w-4" />
                How to build an AI app
              </Button>
              <Button variant="ghost" className="w-full justify-start font-normal">
                <History className="mr-2 h-4 w-4" />
                Next.js 14 Tutorial
              </Button>
              <Button variant="ghost" className="w-full justify-start font-normal">
                <History className="mr-2 h-4 w-4" />
                React Server Components
              </Button>
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  )
} 