import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Save } from 'lucide-react'

export default function VideoAnalysisPage({ params }: { params: { videoId: string } }) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">Video Analysis</h1>
          <p className="text-muted-foreground">Analyzing video ID: {params.videoId}</p>
        </div>
        <Button>
          <Save className="mr-2 h-4 w-4" />
          Save Analysis
        </Button>
      </div>

      <div className="aspect-video">
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          className="h-full w-full rounded-lg"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      <Tabs defaultValue="summary" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="hooks">Hooks</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
          <TabsTrigger value="thoughts">Final Thoughts</TabsTrigger>
        </TabsList>
        <TabsContent value="summary">
          <Card>
            <CardHeader>
              <CardTitle>Video Summary</CardTitle>
              <CardDescription>A comprehensive overview of the video content</CardDescription>
            </CardHeader>
            <CardContent>
              <p>This video covers the fundamentals of building modern web applications...</p>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="hooks">
          <Card>
            <CardHeader>
              <CardTitle>Content Hooks</CardTitle>
              <CardDescription>Key attention-grabbing moments from the video</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-4 space-y-2">
                <li>Introduction to the problem (0:00 - 1:30)</li>
                <li>Demonstration of the solution (1:30 - 3:45)</li>
                <li>Real-world application (3:45 - 5:00)</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="flashcards">
          <Card>
            <CardHeader>
              <CardTitle>Flashcards</CardTitle>
              <CardDescription>Quick review cards generated from the video content</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-4">
                    <p className="font-semibold">Question {i + 1}</p>
                    <p className="text-muted-foreground">What is the main concept discussed in this section?</p>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="thoughts">
          <Card>
            <CardHeader>
              <CardTitle>Final Thoughts</CardTitle>
              <CardDescription>Overall analysis and key takeaways</CardDescription>
            </CardHeader>
            <CardContent>
              <p>The video effectively explains the concepts and provides practical examples...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

