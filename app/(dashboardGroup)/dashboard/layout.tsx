import Navbar from "@/components/shared/navbar"
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { getMe } from "@/service/getMe"
import DashboardSidebar from "./_components/dashboardSidebar"
import { TooltipProvider } from "@/components/ui/tooltip"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
const user = await getMe()

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar user={user} />
      <TooltipProvider>
        <SidebarProvider className="flex-1 min-h-0">
          <DashboardSidebar user={user} />
          <main className="flex-1 min-w-0 flex flex-col overflow-auto bg-muted/20">
            <header className="p-4 flex items-center gap-4 border-b bg-background sticky top-0 z-10 shadow-sm">
              <SidebarTrigger className="h-9 w-9 bg-background border border-border hover:bg-accent hover:text-accent-foreground transition-colors rounded-md" />
              <h1 className="text-lg font-semibold tracking-tight text-foreground/80">
                Dashboard Overview
              </h1>
            </header>
            <div className="flex-1 p-4 md:p-6 lg:p-8">
              {children}
            </div>
          </main>
        </SidebarProvider>
      </TooltipProvider>
    </div>
  )
}