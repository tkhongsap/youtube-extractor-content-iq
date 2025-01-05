import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search } from 'lucide-react'
import Link from "next/link"
import Image from "next/image"

export default function LibraryPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Library</h1>
        <div className="flex items-center gap-4">
          <div className="flex w-full max-w-sm items-center space-x-2">
            <Input type="text" placeholder="Search library..." />
            <Button type="submit" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="title">Title A-Z</SelectItem>
              <SelectItem value="popular">Most Popular</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="summaries">Summaries</TabsTrigger>
          <TabsTrigger value="hooks">Hooks</TabsTrigger>
          <TabsTrigger value="flashcards">Flashcards</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <div className="aspect-video relative mb-4">
                    <Image
                      src="/placeholder.svg"
                      alt="Video thumbnail"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                  <CardTitle>Video Analysis {i + 1}</CardTitle>
                  <CardDescription>Created on Jan {i + 1}, 2024</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    This analysis includes a summary, key hooks, and a set of flashcards for effective learning.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link href={`/dashboard/analysis/${i}`} className="w-full">
                    <Button className="w-full gradient-bg">View Analysis</Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="summaries">
          <p className="text-muted-foreground">Your video summaries will appear here.</p>
        </TabsContent>
        <TabsContent value="hooks">
          <p className="text-muted-foreground">Your content hooks will appear here.</p>
        </TabsContent>
        <TabsContent value="flashcards">
          <p className="text-muted-foreground">Your flashcards will appear here.</p>
        </TabsContent>
      </Tabs>
    </div>
  )
} 