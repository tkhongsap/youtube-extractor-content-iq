import { MainNav } from "@/app/components/main-nav"
import { Sidebar } from "@/components/sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-16 items-center">
        <MainNav />
      </div>
      <div className="flex">
        <aside className="fixed left-0 w-[240px] h-[calc(100vh-4rem)] bg-background">
          <div className="flex flex-col h-full py-4">
            <div className="px-3 py-2">
              <Sidebar />
            </div>
          </div>
        </aside>
        <main className="pl-[240px] w-full">
          <div className="flex-1 p-8">
            <div className="mx-auto max-w-6xl">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

