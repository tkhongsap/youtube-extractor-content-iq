import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center space-x-2">
          <span className="text-xl font-semibold">Content IQ</span>
        </div>
        <div className="flex items-center space-x-4">
          <Link href="/overview" className="text-sm hover:underline">Overview</Link>
          <Link href="/pricing" className="text-sm hover:underline">Pricing</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 text-center max-w-[800px] mx-auto">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
          <span>Think </span>
          <span className="text-blue-500">Sm</span>
          <span className="text-teal-400">art</span>
          <span className="text-green-400">er</span>
          <span className="text-gray-900">,</span>
          <br />
          <span>Not Harder</span>
        </h1>
        
        <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 mb-12 max-w-[600px]">
          The ultimate tool for understanding your YouTube content performance, powered by advanced AI analysis
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md justify-center">
          <Link href="/dashboard" className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto h-12 px-8 text-lg bg-black dark:bg-white dark:text-black text-white hover:bg-gray-800 dark:hover:bg-gray-200">
              Try Content IQ
            </Button>
          </Link>
        </div>

        <p className="mt-24 text-2xl sm:text-3xl font-semibold">
          Your Personalized AI Video Analysis Assistant
        </p>
      </div>
    </div>
  )
}
