'use client'
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { TopBar } from "@/components/dashboard/top-bar"
import { StatsCard } from "@/components/dashboard/stats-card"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { TopProducts } from "@/components/dashboard/top-products"
import { RecentOrders } from "@/components/dashboard/recent-orders"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { Alerts } from "@/components/dashboard/alerts"
import { Button } from "@/components/ui/button"
import { Package, Wallet, MessageSquare, Bot, Settings } from "lucide-react"
import Link from "next/link"
import { useWorkspace } from "@/lib/workspace-provider"
import { RequireFacebookPage } from "@/components/dashboard/require-facebook-page"
import { PremiumLoader } from "@/components/ui/premium/premium-loader"

interface DashboardStats {
  ordersToday: number
  revenueToday: number
  messagesToday: number
  aiCostThisMonth: number
  trends: {
    orders: number
    revenue: number
  }
}

interface FacebookPage {
  id: string
  page_id: string
  page_name: string
  created_at: string
  bot_enabled: boolean
}

export default function DashboardPage() {
  const { user } = useWorkspace()
  const [stats, setStats] = useState<DashboardStats>({
    ordersToday: 0,
    revenueToday: 0,
    messagesToday: 0,
    aiCostThisMonth: 0,
    trends: { orders: 0, revenue: 0 },
  })
  const [loading, setLoading] = useState(true)
  const [facebookPage, setFacebookPage] = useState<FacebookPage | null>(null)

  useEffect(() => {
    fetchStats()
    fetchFacebookPage()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Failed to fetch stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchFacebookPage = async () => {
    try {
      const response = await fetch('/api/facebook/pages')
      if (response.ok) {
        const data = await response.json()
        if (data.pages && data.pages.length > 0) {
          setFacebookPage(data.pages[0])
        }
      }
    } catch (error) {
      console.error('Failed to fetch Facebook page:', error)
    }
  }

  if (loading) {
    return <PremiumLoader />
  }

  return (
    <RequireFacebookPage>
      <TopBar title="Overview" />

      <div className="p-4 lg:p-6 space-y-8 max-w-[1600px] mx-auto">
        {/* Welcome Section - Editorial Style */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border/40 pb-6">
          <div>
            {!facebookPage ? (
              <div className="space-y-2">
                <div className="h-8 w-48 bg-muted/50 rounded animate-pulse" />
                <div className="h-4 w-32 bg-muted/50 rounded animate-pulse" />
              </div>
            ) : (
              <>
                <h2 className="text-3xl lg:text-4xl font-serif text-foreground tracking-tight">
                  Good afternoon, {facebookPage.page_name}
                </h2>
                <div className="flex items-center gap-2 mt-2 text-muted-foreground">
                  <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <p className="text-sm font-medium">System operational</p>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center gap-3">
            {facebookPage && (
              <Button asChild variant="outline" size="sm" className="h-9 font-medium shadow-sm active:scale-95 transition-all">
                <Link href="/dashboard/settings?tab=facebook" className="flex items-center">
                  <Settings className="h-4 w-4 mr-2" />
                  Configure AI
                  <span className={cn("ml-2 h-2 w-2 rounded-full ring-2 ring-background", facebookPage.bot_enabled ? "bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]" : "bg-red-400")} />
                </Link>
              </Button>
            )}
            <Button asChild size="sm" className="h-9 bg-zinc-900 text-white hover:bg-zinc-800 shadow-sm dark:bg-white dark:text-zinc-950 dark:hover:bg-white/90 dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] dark:hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] border-none active:scale-95 transition-all">
              <Link href="/dashboard/products/new">
                <Package className="h-4 w-4 mr-2" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid - Floating Glass Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatsCard
            title="Orders Today"
            value={loading ? "..." : stats.ordersToday.toString()}
            trend={{
              value: `${stats.trends.orders > 0 ? '+' : ''}${stats.trends.orders}%`,
              direction: stats.trends.orders >= 0 ? "up" : "down",
              isPositive: stats.trends.orders >= 0
            }}
            comparison="vs last week"
            icon={Package}
          />
          <StatsCard
            title="Revenue Today"
            value={loading ? "..." : `৳${stats.revenueToday.toLocaleString()}`}
            trend={{
              value: `${stats.trends.revenue > 0 ? '+' : ''}${stats.trends.revenue}%`,
              direction: stats.trends.revenue >= 0 ? "up" : "down",
              isPositive: stats.trends.revenue >= 0
            }}
            comparison="vs last week"
            icon={Wallet}
            isCurrency
          />
          <StatsCard
            title="Messages Today"
            value={loading ? "..." : stats.messagesToday.toString()}
            trend={{ value: "+8%", direction: "up", isPositive: true }}
            comparison="vs last week"
            icon={MessageSquare}
          />
        </div>

        {/* AI Command Console (Bot Status) */}
        {facebookPage && (
           <Link href="/dashboard/settings?tab=facebook" className="block group">
            <div className={cn(
              "relative overflow-hidden rounded-xl border p-1 transition-all duration-300",
               facebookPage.bot_enabled 
                ? "bg-white border-zinc-200 shadow-sm dark:bg-gradient-to-br dark:from-gray-900 dark:to-black dark:border-white/10" 
                : "bg-red-50 border-red-100 dark:bg-red-950/30 dark:border-red-900/50"
            )}>
              {/* Glass Glint Effect */}
              <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className={cn(
                "relative flex items-center justify-between p-4 rounded-lg",
                facebookPage.bot_enabled ? "bg-zinc-50/50 dark:bg-white/5 backdrop-blur-sm" : "bg-transparent"
              )}>
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center shadow-inner",
                    facebookPage.bot_enabled 
                      ? "bg-green-500/20 text-green-400 ring-1 ring-green-500/50" 
                      : "bg-red-500/10 text-red-500 ring-1 ring-red-500/20"
                  )}>
                    <Bot className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                       <h3 className={cn("text-lg font-serif tracking-tight", facebookPage.bot_enabled ? "text-foreground dark:text-white" : "text-red-700 dark:text-red-400")}>
                        {facebookPage.bot_enabled ? 'AI Agent Active' : 'AI Agent Standby'}
                       </h3>
                       {facebookPage.bot_enabled && (
                         <span className="flex h-2 w-2">
                           <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                           <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                         </span>
                       )}
                    </div>
                    <p className={cn("text-sm", facebookPage.bot_enabled ? "text-gray-400" : "text-red-600/80 dark:text-red-400/80")}>
                      {facebookPage.bot_enabled 
                        ? 'Monitoring inbox and processing orders automatically.' 
                        : 'Auto-reply is disabled. Manual intervention required.'}
                    </p>
                  </div>
                </div>
                
                <div className={cn(
                  "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono border transition-colors",
                  facebookPage.bot_enabled 
                    ? "border-zinc-200 bg-zinc-100 text-zinc-500 group-hover:bg-zinc-900 group-hover:text-white dark:border-white/10 dark:bg-black/20 dark:text-gray-400 dark:group-hover:bg-white/10 dark:group-hover:text-white" 
                    : "border-red-200 text-red-600 bg-red-100/50 dark:border-red-900/40 dark:bg-red-900/20 dark:text-red-400"
                )}>
                  <span>CONFIGURE</span>
                  <Settings className="h-3 w-3" />
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* Alerts Section - Now Premium Style */}
        <Alerts />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <SalesChart />
            <RecentOrders />
          </div>
          <div className="lg:col-span-1 space-y-6">
            <TopProducts />
            <QuickActions botActive={facebookPage?.bot_enabled} />
          </div>
        </div>
      </div>
    </RequireFacebookPage>
  )
}
