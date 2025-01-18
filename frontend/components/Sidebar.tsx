import { Home, Library, History, Clock, FolderOpen, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import Link from 'next/link'

interface SidebarProps {
  isCollapsed: boolean
}

export function Sidebar({ isCollapsed }: SidebarProps) {
  const mainNavItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Library, label: 'Library', href: '/library' },
    { icon: History, label: 'History', href: '/history' },
    { icon: FolderOpen, label: 'Your Analyses', href: '/analyses' },
    { icon: Clock, label: 'Watch Later', href: '/watch-later' },
  ]

  const categories = [
    'AI',
    'Programming',
    'Tech News',
    'Tutorials',
    'Data Science',
    'Machine Learning',
    'Web Development',
  ]

  return (
    <aside
      className={cn(
        'fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white dark:bg-gray-900 border-r transition-all duration-300',
        isCollapsed ? 'w-[72px]' : 'w-60'
      )}
    >
      <div className="p-3">
        <nav className="space-y-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-800',
                !isCollapsed && 'w-full'
              )}
            >
              <item.icon className="h-5 w-5" />
              {!isCollapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>

        {!isCollapsed && (
          <>
            <div className="mt-6 pt-6 border-t">
              <h3 className="px-3 mb-2 text-sm font-semibold">Categories</h3>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <Link
                    key={category}
                    href={`/category/${category.toLowerCase().replace(' ', '-')}`}
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-50 dark:hover:bg-gray-800"
                  >
                    <span>{category}</span>
                  </Link>
                ))}
              </nav>
              <button className="flex items-center gap-2 px-3 py-2 mt-2 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50">
                <ChevronDown className="h-4 w-4" />
                <span>Show more</span>
              </button>
            </div>
          </>
        )}
      </div>
    </aside>
  )
} 