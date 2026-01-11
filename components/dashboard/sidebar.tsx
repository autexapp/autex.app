"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { SubscriptionCard } from "@/components/dashboard/subscription-card"
import { WorkspaceProvider, useWorkspace } from "@/lib/workspace-provider"
import { Home, Package, ShoppingBag, MessageSquare, BarChart3, Bot, Settings, HelpCircle } from "lucide-react"

const navigation = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Orders", href: "/dashboard/orders", icon: Package },
  { name: "Products", href: "/dashboard/products", icon: ShoppingBag },
  { name: "Conversations", href: "/dashboard/conversations", icon: MessageSquare },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "AI Setup", href: "/dashboard/ai-setup", icon: Bot },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
  { name: "Help Center", href: "/dashboard/help", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const { needsReplyCount, pendingOrdersCount } = useWorkspace()

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-[280px] lg:fixed lg:inset-y-0 bg-white/80 dark:bg-black/40 backdrop-blur-xl border-r border-zinc-200 dark:border-white/5 z-50 transition-all duration-300">
      {/* Premium Logo Area */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-zinc-100 dark:border-white/5">
        <Link href="/dashboard" className="flex items-center gap-3 group cursor-pointer">
          <div className="relative h-9 w-9 transition-transform duration-500 group-hover:rotate-12 rounded-md overflow-hidden">
            <Image
              src="/autex logo.png"
              alt="Autex Logo"
              fill
              className="object-cover rounded-md drop-shadow-sm dark:drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]"
            />
          </div>
          <span className="text-xl font-serif tracking-tight font-bold text-zinc-900 dark:text-zinc-100">Autex AI</span>
        </Link>
        <ThemeToggle />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`)
          // Fix for dashboard home exact match
          const isExactDashboard = item.href === '/dashboard' && pathname === '/dashboard'
          const isActuallyActive = item.href === '/dashboard' ? isExactDashboard : isActive

          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ease-out relative overflow-hidden",
                isActuallyActive
                  ? "bg-zinc-900 text-white shadow-lg dark:bg-white/10 dark:text-white dark:shadow-[0_0_20px_rgba(255,255,255,0.1)] dark:border dark:border-white/10"
                  : "text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100/50 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-white/5"
              )}
            >
              <item.icon className={cn(
                "h-4 w-4 transition-transform duration-300 group-hover:scale-110",
                isActuallyActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-900 dark:text-zinc-500 dark:group-hover:text-white"
              )} />
              <span className="relative z-10 tracking-wide">{item.name}</span>
              
              {/* Active Glow for Light Mode to soften the black */}
              {isActuallyActive && (
                 <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-20" />
              )}
            </Link>
          )
        })}
      </nav>

      {/* Subscription Status Card - Dynamic */}
      <SubscriptionCard />
    </aside>
  )
}
