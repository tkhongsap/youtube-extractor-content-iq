"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import Image from "next/image"

interface AnalyzedVideo {
  id: string;
  transcript: Array<{ text: string; offset: number }>;
  metadata: {
    title: string;
    channel: string;
    views: string;
    thumbnailUrl: string;
    timestamp: string;
  };
}

export default function AnalyticsPage() {
  const [analyzedVideos, setAnalyzedVideos] = useState<AnalyzedVideo[]>([])

  useEffect(() => {
    // Load all analyzed videos from localStorage
    const loadAnalyzedVideos = () => {
      const videos: AnalyzedVideo[] = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key?.startsWith('analysis_')) {
          const videoId = key.replace('analysis_', '')
          const data = JSON.parse(localStorage.getItem(key) || '{}')
          videos.push({
            id: videoId,
            transcript: data.transcript || [],
            metadata: {
              title: data.metadata?.title || 'Untitled Video',
              channel: data.metadata?.channel || 'Unknown Channel',
              views: data.metadata?.views || '0',
              thumbnailUrl: data.metadata?.thumbnailUrl || '/placeholder.svg',
              timestamp: data.timestamp || new Date().toISOString()
            }
          })
        }
      }
      // Sort by most recent first
      videos.sort((a, b) => new Date(b.metadata.timestamp).getTime() - new Date(a.metadata.timestamp).getTime())
      setAnalyzedVideos(videos)
    }

    loadAnalyzedVideos()
  }, [])

  function formatTimestamp(isoString: string): string {
    return new Date(isoString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your research progress and insights</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analyzed Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyzedVideos.length}</div>
            <p className="text-xs text-muted-foreground">Total videos analyzed</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Analyses</CardTitle>
          <CardDescription>Your recently analyzed videos and their transcripts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {analyzedVideos.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No videos analyzed yet.</p>
                <Link href="/dashboard/search">
                  <Button className="mt-4">Analyze Videos</Button>
                </Link>
              </div>
            ) : (
              analyzedVideos.map((video) => (
                <Card key={video.id} className="overflow-hidden">
                  <div className="flex gap-4 p-4">
                    <div className="w-48 h-28 relative rounded-md overflow-hidden flex-shrink-0">
                      <Image
                        src={video.metadata.thumbnailUrl}
                        alt={video.metadata.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg truncate">{video.metadata.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {video.metadata.channel} • {video.metadata.views} views
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Analyzed on {formatTimestamp(video.metadata.timestamp)}
                      </p>
                      <div className="mt-4">
                        <Link href={`/dashboard/video-analysis/${video.id}`}>
                          <Button variant="outline">View Full Analysis</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="border-t">
                    <div className="p-4 max-h-40 overflow-y-auto">
                      <h4 className="font-medium mb-2">Transcript Preview</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        {video.transcript.slice(0, 3).map((item, index) => (
                          <p key={index}>{item.text}</p>
                        ))}
                        {video.transcript.length > 3 && (
                          <p className="text-sm text-muted-foreground italic">
                            ... and {video.transcript.length - 3} more lines
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 