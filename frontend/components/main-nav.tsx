import Link from "next/link"
import { Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ModeToggle } from "./mode-toggle"
import { UserNav } from "./user-nav"

export function MainNav() {
  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-4">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="font-bold">Content IQ</span>
          </Link>
        </div>
        <div className="ml-auto flex items-center space-x-4">
          <form className="flex w-full max-w-sm items-center space-x-2">
            <Input
              type="search"
              placeholder="Search videos..."
              className="w-[300px]"
            />
            <Button type="submit" variant="ghost" size="icon">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
          <ModeToggle />
          <UserNav />
        </div>
      </div>
    </div>
  )
}

