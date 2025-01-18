import { Search, Mic, Bell, Video, Menu } from 'lucide-react'
import Image from 'next/image'
import { Button } from './ui/button'
import { Input } from './ui/input'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white dark:bg-gray-900 border-b flex items-center px-4 justify-between z-50">
      {/* Left section */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
          <Menu className="h-6 w-6" />
        </Button>
        <div className="flex items-center gap-1">
          <Image 
            src="/logo.png" 
            alt="ContentIQ Logo" 
            width={40} 
            height={40}
            className="object-contain"
          />
          <span className="text-xl font-semibold">ContentIQ</span>
        </div>
      </div>

      {/* Center section - Search */}
      <div className="flex-1 max-w-2xl mx-4">
        <div className="flex items-center">
          <div className="flex-1 flex items-center border rounded-l-full px-4 py-1 bg-gray-50 dark:bg-gray-800">
            <Input
              type="text"
              placeholder="Search"
              className="border-0 focus:ring-0 bg-transparent w-full"
            />
          </div>
          <Button className="rounded-l-none rounded-r-full px-6 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="ml-2 hover:bg-gray-100 dark:hover:bg-gray-800">
            <Mic className="h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Right section */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" className="hover:bg-gray-100 dark:hover:bg-gray-800">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
            U
          </div>
        </Button>
      </div>
    </header>
  )
} 