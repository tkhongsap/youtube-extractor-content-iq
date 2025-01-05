import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AppHomePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-3xl font-bold">Welcome to Content IQ</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Search Videos</CardTitle>
            <CardDescription>Find relevant YouTube videos for your research</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/app/search">
              <Button className="w-full">Go to Search</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Your Library</CardTitle>
            <CardDescription>Access your saved analyses and content</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/app/library">
              <Button className="w-full">View Library</Button>
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Track your content research progress</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/app/analytics">
              <Button className="w-full">View Analytics</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

