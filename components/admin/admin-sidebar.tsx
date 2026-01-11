"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  DollarSign,
  AlertTriangle,
  ArrowLeft,
} from "lucide-react"

const adminNavItems = [
  {
    title: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Workspaces",
    href: "/admin/workspaces",
    icon: Building2,
  },
  {
    title: "Conversations",
    href: "/admin/conversations",
    icon: MessageSquare,
  },
  {
    title: "Costs",
    href: "/admin/costs",
    icon: DollarSign,
  },
  {
    title: "Errors",
    href: "/admin/errors",
    icon: AlertTriangle,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-border bg-card px-6 pb-4">
        {/* Header */}
        <div className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-sm">
            A
          </div>
          <span className="font-semibold text-lg">Admin Panel</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {adminNavItems.map((item) => {
                  const isActive = pathname === item.href || 
                    (item.href !== "/admin" && pathname.startsWith(item.href))
                  
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium transition-colors",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted"
                        )}
                      >
                        <item.icon className="h-5 w-5 shrink-0" />
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </li>

            {/* Back to Dashboard */}
            <li className="mt-auto">
              <Link
                href="/dashboard"
                className="group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                <ArrowLeft className="h-5 w-5 shrink-0" />
                Back to Dashboard
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  )
}
