import { useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import { VideoCard } from './VideoCard'
import { cn } from '@/lib/utils'

const categories = [
  'All',
  'AI',
  'Programming',
  'Tech News',
  'Tutorials',
  'Data Science',
  'Machine Learning',
  'Web Development',
  'Mobile Development',
  'DevOps',
  'Blockchain',
  'Cybersecurity',
]

// Mock data for demonstration
const mockVideos = Array(20).fill(null).map((_, i) => ({
  id: i.toString(),
  thumbnail: \`https://picsum.photos/seed/\${i}/640/360\`,
  title: \`Sample Video Title \${i + 1} - This is a longer title to demonstrate multiple lines\`,
  channel: \`Channel \${i + 1}\`,
  views: Math.floor(Math.random() * 1000000),
  timeAgo: '3 days ago',
  duration: '10:30',
  isAnalyzed: Math.random() > 0.7,
}))

export function MainContent() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { current: container } = scrollContainerRef
      const scrollAmount = direction === 'left' ? -200 : 200
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  return (
    <main className="flex-1 min-h-screen pt-16 pl-[72px]">
      {/* Categories navigation */}
      <div className="sticky top-16 z-40 bg-white dark:bg-gray-900 border-b">
        <div className="relative flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 z-10"
            onClick={() => scroll('left')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div
            ref={scrollContainerRef}
            className="flex items-center gap-3 px-4 py-3 overflow-x-auto scrollbar-hide"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors',
                  selectedCategory === category
                    ? 'bg-gray-900 text-white dark:bg-white dark:text-gray-900'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700'
                )}
              >
                {category}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 z-10"
            onClick={() => scroll('right')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Video grid */}
      <div className="max-w-[2400px] mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4">
          {mockVideos.map((video) => (
            <VideoCard key={video.id} {...video} />
          ))}
        </div>
      </div>
    </main>
  )
} 