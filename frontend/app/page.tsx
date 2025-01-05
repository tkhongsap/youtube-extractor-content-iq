"use client"

import Link from "next/link"
import { Search, BookOpen, BarChart2, Sun, Moon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="font-semibold text-xl">ContentIQ</div>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/overview" className="text-sm font-medium">Overview</Link>
            <Link href="/pricing" className="text-sm font-medium">ContentIQ Plus</Link>
            <Button variant="ghost" size="icon">
              <span className="sr-only">Toggle theme</span>
              <Sun className="h-6 w-6 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-6 w-6 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
          <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
            <h1 className="text-6xl font-bold tracking-tight">
              Think{" "}
              <span className="bg-gradient-to-r from-blue-400 via-emerald-400 to-green-400 text-transparent bg-clip-text">
                Smarter
              </span>
              ,{" "}
              <br />
              Not Harder
            </h1>
            <p className="max-w-[42rem] leading-normal text-muted-foreground text-xl">
              The ultimate tool for understanding YouTube content that matters most to you, built with AI
            </p>
            <div className="flex gap-4">
              <Link href="/dashboard">
                <Button className="bg-black text-white hover:bg-black/90 rounded-full px-8 py-6 text-lg">
                  Try ContentIQ
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="container space-y-6 py-8 md:py-12 lg:py-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Your Personalized AI Research Assistant
          </h2>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <Search className="h-12 w-12 text-blue-400" />
                <div className="space-y-2">
                  <h3 className="font-bold">Keyword Research</h3>
                  <p className="text-sm text-muted-foreground">Find relevant YouTube videos based on your research topics</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <BookOpen className="h-12 w-12 text-emerald-400" />
                <div className="space-y-2">
                  <h3 className="font-bold">Content Analysis</h3>
                  <p className="text-sm text-muted-foreground">Get detailed summaries, hooks, and flashcards from videos</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg border bg-background p-2">
              <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
                <BarChart2 className="h-12 w-12 text-green-400" />
                <div className="space-y-2">
                  <h3 className="font-bold">Analytics</h3>
                  <p className="text-sm text-muted-foreground">Track and analyze your content research progress</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

