import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Search } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">YouTube Video Search</h1>
        <div className="flex w-full max-w-2xl gap-2">
          <Input placeholder="Enter keywords to search YouTube videos..." className="flex-1" />
          <Button>
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardContent className="p-0">
              <Image
                src="/placeholder.svg?height=200&width=400"
                alt="Video thumbnail"
                width={400}
                height={200}
                className="rounded-t-lg object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold">How to Build a Next.js Application</h3>
                <p className="text-sm text-muted-foreground">Channel Name • 100K views</p>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Link href={`/dashboard/video-analysis/${i}`} className="flex-1">
                <Button className="w-full">Analyze</Button>
              </Link>
              <Button variant="outline">Save</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

