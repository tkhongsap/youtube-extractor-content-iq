import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Search } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function SearchPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Find YouTube Videos</h1>
        <p className="text-muted-foreground">Search and analyze YouTube videos for your research</p>
        <div className="flex w-full max-w-2xl gap-2">
          <Input 
            placeholder="Enter YouTube URL or search keywords..." 
            className="flex-1"
          />
          <Button className="gradient-bg">
            <Search className="mr-2 h-4 w-4" />
            Search
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="p-0">
              <div className="aspect-video relative">
                <Image
                  src="/placeholder.svg"
                  alt="Video thumbnail"
                  fill
                  className="object-cover rounded-t-lg"
                />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg">How to Build Better Products</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">Channel Name • 100K views</p>
              <p className="text-sm mt-2 line-clamp-2">
                Learn the essential principles of building products that users love. This comprehensive guide covers everything from user research to launch strategies.
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