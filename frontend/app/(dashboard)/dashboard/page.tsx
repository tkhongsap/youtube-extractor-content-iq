import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Manage your saved analyses and content</p>
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Content</SelectItem>
            <SelectItem value="summaries">Summaries</SelectItem>
            <SelectItem value="hooks">Hooks</SelectItem>
            <SelectItem value="flashcards">Flashcards</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs defaultValue="recent" className="w-full">
        <TabsList>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="saved">Saved</TabsTrigger>
          <TabsTrigger value="favorites">Favorites</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="mt-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader className="p-0">
                  <Image
                    src="/placeholder.svg?height=200&width=400"
                    alt="Video thumbnail"
                    width={400}
                    height={200}
                    className="rounded-t-lg object-cover"
                  />
                </CardHeader>
                <CardContent className="p-4">
                  <CardTitle className="text-lg">How to Build a Next.js App</CardTitle>
                  <CardDescription>Analyzed on Jan 5, 2024</CardDescription>
                  <div className="mt-4 flex gap-2">
                    <Link href={`/dashboard/video-analysis/${i}`} className="flex-1">
                      <Button variant="outline" className="w-full">View Analysis</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="saved">
          <p className="text-muted-foreground">Your saved analyses will appear here.</p>
        </TabsContent>
        <TabsContent value="favorites">
          <p className="text-muted-foreground">Your favorite analyses will appear here.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
}

