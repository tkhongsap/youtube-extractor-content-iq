import { MainNav } from "@/app/components/main-nav"
import { Sidebar } from "@/app/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <MainNav />
      <div className="flex">
        <aside className="w-64 hidden md:block">
          <Sidebar />
        </aside>
        <main className="flex-1">
          <div className="container mx-auto py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

