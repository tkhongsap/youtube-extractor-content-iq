"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, Line, LineChart, XAxis, YAxis } from "recharts"

export default function AnalyticsPage() {
  const videoData = [
    { name: 'Jan', total: 12 },
    { name: 'Feb', total: 18 },
    { name: 'Mar', total: 23 },
    { name: 'Apr', total: 27 },
    { name: 'May', total: 34 },
    { name: 'Jun', total: 37 },
  ]

  const engagementData = [
    { name: 'Jan', total: 76 },
    { name: 'Feb', total: 82 },
    { name: 'Mar', total: 85 },
    { name: 'Apr', total: 83 },
    { name: 'May', total: 88 },
    { name: 'Jun', total: 89 },
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">Track your research progress and insights</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Videos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">254</div>
            <p className="text-xs text-muted-foreground">+20% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Analysis Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.3 min</div>
            <p className="text-xs text-muted-foreground">-5% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top Topic</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Web Dev</div>
            <p className="text-xs text-muted-foreground">30% of analyses</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89%</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Analysis Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <BarChart data={videoData} width={800} height={350}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="total" fill="hsl(var(--primary))" />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Video Analysis Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <BarChart data={videoData} width={800} height={350}>
                <XAxis dataKey="name" />
                <YAxis />
                <Bar dataKey="total" fill="hsl(var(--primary))" />
              </BarChart>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Engagement Over Time</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px] w-full">
              <LineChart data={engagementData} width={800} height={350}>
                <XAxis dataKey="name" />
                <YAxis />
                <Line type="monotone" dataKey="total" stroke="hsl(var(--primary))" />
              </LineChart>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 