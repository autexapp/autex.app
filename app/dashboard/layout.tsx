'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { WorkspaceProvider, useWorkspace } from "@/lib/workspace-provider"

import { PremiumLoader } from "@/components/ui/premium/premium-loader"

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { loading } = useWorkspace()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-72 relative min-h-screen flex flex-col">
        <main className="flex-1 relative flex flex-col min-h-screen">
          {loading ? <PremiumLoader /> : children}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceProvider>
      <DashboardContent>{children}</DashboardContent>
    </WorkspaceProvider>
  )
}
