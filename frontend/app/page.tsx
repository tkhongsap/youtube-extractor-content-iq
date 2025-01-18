
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 text-center">
        <h1 className="font-heading text-4xl font-bold sm:text-6xl">
          Content IQ
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Analyze YouTube content with AI-powered insights. Understand your videos better.
        </p>
        <div className="flex gap-4">
          <Link href="/dashboard">
            <Button size="lg">Get Started</Button>
          </Link>
          <Link href="/dashboard/search">
            <Button variant="outline" size="lg">Try Demo</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
