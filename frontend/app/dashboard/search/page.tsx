"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search, Loader2 } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { YouTubeVideo, searchYouTubeVideos, getMyRecentVideos } from "@/lib/youtube"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [videos, setVideos] = useState<YouTubeVideo[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isAnalyzing, setIsAnalyzing] = useState<string | null>(null)
  const router = useRouter()

  // Load initial videos when the page mounts
  useEffect(() => {
    loadInitialVideos()
  }, [])

  const loadInitialVideos = async () => {
    setIsLoading(true)
    try {
      const initialVideos = await getMyRecentVideos()
      setVideos(initialVideos)
    } catch (error) {
      console.error("Failed to load initial videos:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return
    setIsLoading(true)
    try {
      const results = await searchYouTubeVideos(searchQuery)
      setVideos(results)
    } catch (error) {
      console.error("Search failed:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleAnalyze = async (videoId: string, videoUrl: string) => {
    setIsAnalyzing(videoId)
    try {
      const response = await fetch("https://brightify-snap-buzz-production.up.railway.app/extract", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ url: videoUrl }),
      })

      if (!response.ok) {
        throw new Error("Failed to analyze video")
      }

      const data = await response.json()
      
      // Store the analysis data
      localStorage.setItem(`analysis_${videoId}`, JSON.stringify({
        transcript: data.transcript,
        metadata: data.metadata,
        timestamp: new Date().toISOString()
      }))

      // Navigate to the analysis page
      router.push(`/dashboard/video-analysis/${videoId}`)
    } catch (error) {
      console.error("Analysis failed:", error)
      alert("Failed to analyze video. Please try again.")
    } finally {
      setIsAnalyzing(null)
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center text-center gap-4">
        <h1 className="text-3xl font-bold">Find YouTube Videos</h1>
        <p className="text-muted-foreground max-w-[600px]">Search and analyze YouTube videos for your research</p>
        <div className="flex w-full max-w-2xl gap-2">
          <Input 
            placeholder="Enter YouTube URL or search keywords..." 
            className="flex-1"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <Button 
            className="gradient-bg"
            onClick={handleSearch}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Search className="mr-2 h-4 w-4" />
            )}
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((video) => (
          <Card key={video.id} className="flex flex-col">
            <CardHeader className="p-0">
              <div className="aspect-video relative">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="flex-1 p-4">
              <CardTitle className="text-lg line-clamp-2">{video.title}</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                {video.channelTitle} • {video.viewCount} views
              </p>
              <p className="text-sm mt-2 line-clamp-2">{video.description}</p>
            </CardContent>
            <CardFooter className="px-4 pb-4 pt-0 flex gap-2">
              <Button 
                className="flex-1 gradient-bg"
                onClick={() => handleAnalyze(video.id, `https://www.youtube.com/watch?v=${video.id}`)}
                disabled={isAnalyzing === video.id}
              >
                {isAnalyzing === video.id ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze"
                )}
              </Button>
              <Button variant="outline">Save</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 