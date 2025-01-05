"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { searchYouTubeVideos, getMyRecentVideos, type YouTubeVideo } from "@/lib/youtube"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load recent videos on mount
    loadRecentVideos()
  }, [])

  async function loadRecentVideos() {
    try {
      setIsLoading(true)
      const recentVideos = await getMyRecentVideos()
      setVideos(recentVideos)
    } catch (error) {
      console.error('Error loading recent videos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!searchQuery.trim()) return

    try {
      setIsLoading(true)
      const searchResults = await searchYouTubeVideos(searchQuery)
      setVideos(searchResults)
    } catch (error) {
      console.error('Error searching videos:', error)
    } finally {
      setIsLoading(false)
    }
  }

  function formatViewCount(count: string) {
    const num = parseInt(count)
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M'
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K'
    }
    return count
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Find YouTube Videos</h1>
        <p className="text-muted-foreground">Search and analyze YouTube videos for your research</p>
        <form onSubmit={handleSearch} className="flex w-full max-w-2xl gap-2">
          <Input 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Enter YouTube URL or search keywords..." 
            className="flex-1"
          />
          <Button type="submit" className="gradient-bg" disabled={isLoading}>
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="aspect-video relative">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {video.channelTitle} • {formatViewCount(video.viewCount)} views
              </p>
              <p className="text-sm mt-2 line-clamp-2 text-muted-foreground">
                {video.description}
              </p>
            </CardContent>
            <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
              <Button className="flex-1 gradient-bg">Analyze</Button>
              <Button variant="outline">Save</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 