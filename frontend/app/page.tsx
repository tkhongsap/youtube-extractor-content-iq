import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, Search, BookOpen, BarChart2 } from 'lucide-react'
import { MainNav } from "@/app/components/main-nav"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNav />
      <div className="flex-1 flex flex-col gap-16 pb-8">
        <section className="mx-auto flex max-w-[980px] flex-col items-center gap-4 py-8 md:py-12 md:pb-8 lg:py-24 lg:pb-20">
          <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-6xl lg:leading-[1.1]">
            Unlock the Power of YouTube Insights
          </h1>
          <p className="max-w-[750px] text-center text-lg text-muted-foreground sm:text-xl">
            Extract valuable insights, summaries, and ideas from YouTube videos. Make your content research smarter and more efficient.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Link href="/dashboard/search">
              <Button size="lg">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard/dashboard">
              <Button variant="outline" size="lg">
                View Dashboard
              </Button>
            </Link>
          </div>
        </section>

        <section className="mx-auto grid max-w-5xl gap-8 px-4 sm:grid-cols-2 md:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <Search className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-bold">Keyword Research</h3>
            <p className="text-center text-muted-foreground">
              Find relevant YouTube videos based on your research topics
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <BookOpen className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-bold">Content Analysis</h3>
            <p className="text-center text-muted-foreground">
              Get detailed summaries, hooks, and flashcards from videos
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-4">
            <BarChart2 className="h-8 w-8 text-primary" />
            <h3 className="text-xl font-bold">Analytics</h3>
            <p className="text-center text-muted-foreground">
              Track and analyze your content research progress
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

