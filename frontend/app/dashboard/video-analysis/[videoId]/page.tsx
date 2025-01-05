"use client"

import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save, Loader2 } from 'lucide-react'

interface VideoAnalysis {
  transcript: Array<{ text: string; offset: number }>;
  metadata: {
    title: string;
    channel: string;
    views: string;
    likes: string;
    duration: string;
    thumbnailUrl: string;
  };
}

export default function VideoAnalysisPage({ params }: { params: { videoId: string } }) {
  const [analysis, setAnalysis] = useState<VideoAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Load analysis data from localStorage
    const savedAnalysis = localStorage.getItem(`analysis_${params.videoId}`)
    if (savedAnalysis) {
      setAnalysis(JSON.parse(savedAnalysis))
    }
    setIsLoading(false)
  }, [params.videoId])

  function formatTimestamp(offset: number): string {
    const minutes = Math.floor(offset / 60)
    const seconds = Math.floor(offset % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] gap-4">
        <h2 className="text-xl font-semibold">Analysis not found</h2>
        <p className="text-muted-foreground">The analysis for this video could not be found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{analysis.metadata.title}</h1>
          <p className="text-muted-foreground">
            {analysis.metadata.channel} • {analysis.metadata.views} views
          </p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Analysis
        </Button>
      </div>

      <div className="aspect-video">
        <iframe
          src={`https://www.youtube.com/embed/${params.videoId}`}
          className="h-full w-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <Tabs defaultValue="transcript" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="transcript">Transcript</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="hooks">Hooks</TabsTrigger>
          <TabsTrigger value="keypoints">Key Points</TabsTrigger>
        </TabsList>

        <TabsContent value="transcript">
          <Card>
            <CardHeader>
              <CardTitle>Video Transcript</CardTitle>
              <CardDescription>Complete transcript of the video content</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {analysis.transcript.map((item, index) => (
                <p key={index} className="relative pl-16 py-1 hover:bg-muted/50 rounded">
                  <span className="absolute left-2 text-sm font-mono text-muted-foreground">
                    {formatTimestamp(item.offset)}
                  </span>
                  {item.text}
                </p>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
              <CardDescription>AI-generated summary of the video content</CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Implement AI summary generation */}
              <p>Summary will be generated using AI analysis of the transcript.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hooks">
          <Card>
            <CardHeader>
              <CardTitle>Content Hooks</CardTitle>
              <CardDescription>Key moments and attention-grabbing points</CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Implement hooks extraction */}
              <p>Content hooks will be identified using AI analysis.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="keypoints">
          <Card>
            <CardHeader>
              <CardTitle>Key Points</CardTitle>
              <CardDescription>Main ideas and important concepts</CardDescription>
            </CardHeader>
            <CardContent>
              {/* TODO: Implement key points extraction */}
              <p>Key points will be extracted using AI analysis.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
} 