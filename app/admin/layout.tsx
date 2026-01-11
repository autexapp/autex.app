"use client"

import { AdminSidebar } from "@/components/admin/admin-sidebar"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    checkAdminAccess()
  }, [])

  const checkAdminAccess = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (!response.ok) {
        router.push('/login')
        return
      }
      
      const data = await response.json()
      const userEmail = data.user?.email
      
      // Get admin emails from API (server-side check is more secure)
      const adminCheck = await fetch('/api/admin/check-access')
      if (!adminCheck.ok) {
        setError('Not authorized')
        router.push('/dashboard')
        return
      }
      
      setIsAdmin(true)
    } catch {
      router.push('/dashboard')
    }
  }

  if (isAdmin === null) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Checking admin access...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-destructive">{error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="lg:pl-64">
        <main className="pb-20 lg:pb-0">{children}</main>
      </div>
    </div>
  )
}
