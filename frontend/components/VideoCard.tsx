import Image from 'next/image'
import { MoreVertical, PlayCircle } from 'lucide-react'
import { Button } from './ui/button'

interface VideoCardProps {
  id: string
  thumbnail: string
  title: string
  channel: string
  views: number
  timeAgo: string
  duration: string
  isAnalyzed?: boolean
}

export function VideoCard({
  id,
  thumbnail,
  title,
  channel,
  views,
  timeAgo,
  duration,
  isAnalyzed = false,
}: VideoCardProps) {
  const formatViews = (count: number) => {
    if (count >= 1000000) {
      return \`\${(count / 1000000).toFixed(1)}M\`
    }
    if (count >= 1000) {
      return \`\${(count / 1000).toFixed(1)}K\`
    }
    return count.toString()
  }

  return (
    <div className="group relative">
      {/* Thumbnail */}
      <div className="relative aspect-video rounded-xl overflow-hidden">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute bottom-2 right-2 px-1 py-0.5 rounded bg-black/80 text-white text-xs">
          {duration}
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
              <PlayCircle className="h-4 w-4 mr-1" />
              Play
            </Button>
            {!isAnalyzed && (
              <Button size="sm" variant="secondary" className="bg-white/90 hover:bg-white">
                Analyze
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Info section */}
      <div className="mt-3 flex gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-base font-semibold line-clamp-2 leading-tight">
            {title}
          </h3>
          <div className="mt-1 flex flex-col text-sm text-gray-500">
            <span>{channel}</span>
            <div className="flex items-center">
              <span>{formatViews(views)} views</span>
              <span className="mx-1">•</span>
              <span>{timeAgo}</span>
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 h-8 w-8"
        >
          <MoreVertical className="h-5 w-5" />
        </Button>
      </div>

      {/* Analysis status indicator */}
      {isAnalyzed && (
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-green-500 text-white text-xs">
          Analyzed
        </div>
      )}
    </div>
  )
} 