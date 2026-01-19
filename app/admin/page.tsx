"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { SmartCard } from "@/components/ui/premium/smart-card"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/dashboard/stats-card"
import { PremiumLoader } from "@/components/ui/premium/premium-loader"
import {
  Building2,
  MessageSquare,
  ShoppingCart,
  DollarSign,
  TrendingUp,
  Users,
  Zap,
  RefreshCw,
  AlertTriangle,
  Sparkles,
  Activity,
  Target,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"

interface OverviewData {
  stats: {
    totalWorkspaces: number
    totalConversations: number
    totalOrders: number
    successRate: number
    todayCost: number
    weekCost: number
    monthCost: number
    avgCostPerConversation: string
  }
  subscriptionCounts: {
    trial: number
    active: number
    expired: number
    paused: number
  }
  aiMetrics: {
    cacheHitRate: number
    totalApiCalls: number
    cacheHits: number
  }
  conversationFunnel: {
    started: number
    ordered: number
    conversionRate: number
  }
  actionItems: Array<{
    type: string
    message: string
    severity: string
  }>
  recentConversations: Array<{
    id: string
    customerName: string
    workspaceName: string
    state: string
    lastMessageAt: string
  }>
}

interface SubscriptionMetrics {
  counts: {
    total: number
    trial: number
    active: number
    expired: number
    paused: number
  }
  conversion: {
    trialToPaidRate: number
    avgDaysToConvert: number
    retentionRate: number
    paidUsers: number
    churnedUsers: number
  }
  revenue: {
    total: number
    thisMonth: number
    lastMonth: number
    monthlyTrend: Array<{ month: string; revenue: number }>
    avgPerUser: number
  }
  expiringSoon: Array<{
    id: string
    name: string
    type: string
    expiresAt: string
  }>
}

const SUBSCRIPTION_COLORS = {
  trial: '#8B5CF6',
  active: '#10B981',
  expired: '#EF4444',
  paused: '#F59E0B',
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null)
  const [metrics, setMetrics] = useState<SubscriptionMetrics | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const [overviewRes, metricsRes] = await Promise.all([
        fetch('/api/admin/overview'),
        fetch('/api/admin/subscription-metrics'),
      ])
      
      if (overviewRes.ok) setData(await overviewRes.json())
      if (metricsRes.ok) setMetrics(await metricsRes.json())
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const getStateEmoji = (state: string) => {
    if (state === 'IDLE') return '✅'
    if (state?.includes('COLLECT') || state?.includes('AWAIT')) return '⏳'
    return '🔄'
  }

  if (loading) {
    return <PremiumLoader />
  }

  const subscriptionData = [
    { name: 'Trial', value: metrics?.counts.trial || 0, color: SUBSCRIPTION_COLORS.trial },
    { name: 'Active', value: metrics?.counts.active || 0, color: SUBSCRIPTION_COLORS.active },
    { name: 'Expired', value: metrics?.counts.expired || 0, color: SUBSCRIPTION_COLORS.expired },
    { name: 'Paused', value: metrics?.counts.paused || 0, color: SUBSCRIPTION_COLORS.paused },
  ].filter(d => d.value > 0)

  const revenueGrowth = metrics?.revenue.lastMonth && metrics.revenue.lastMonth > 0
    ? Math.round((metrics.revenue.thisMonth - metrics.revenue.lastMonth) / metrics.revenue.lastMonth * 100)
    : 0

  return (
    <div className="p-4 lg:p-6 space-y-8 max-w-[1600px] mx-auto">
      {/* Header - Editorial Style */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-border/40 pb-6">
        <div>
          <h2 className="text-3xl lg:text-4xl font-serif text-foreground tracking-tight">
            Command Center
          </h2>
          <div className="flex items-center gap-2 mt-2 text-muted-foreground">
            <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <p className="text-sm font-medium">All systems operational</p>
          </div>
        </div>
        
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => fetchData(true)}
          disabled={refreshing}
          className="h-9 font-medium shadow-sm active:scale-95 transition-all"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Stats Grid - Using Dashboard StatsCard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Monthly Revenue"
          value={`৳${(metrics?.revenue.thisMonth || 0).toLocaleString()}`}
          trend={revenueGrowth !== 0 ? {
            value: `${revenueGrowth > 0 ? '+' : ''}${revenueGrowth}%`,
            direction: revenueGrowth >= 0 ? "up" : "down",
            isPositive: revenueGrowth >= 0
          } : { value: "", direction: "up", isPositive: true }}
          comparison={`৳${metrics?.revenue.avgPerUser || 0} avg/user`}
          icon={DollarSign}
          isCurrency
        />
        <StatsCard
          title="Total Users"
          value={(metrics?.counts.total || 0).toString()}
          trend={{ value: "", direction: "up", isPositive: true }}
          comparison={`${metrics?.counts.active || 0} paying`}
          icon={Users}
        />
        <StatsCard
          title="Conversion Rate"
          value={`${metrics?.conversion.trialToPaidRate || 0}%`}
          trend={{ value: "", direction: "up", isPositive: true }}
          comparison={`${metrics?.conversion.avgDaysToConvert || 0} days avg`}
          icon={TrendingUp}
        />
        <StatsCard
          title="AI Success Rate"
          value={`${data?.stats.successRate || 0}%`}
          trend={{ value: "", direction: "up", isPositive: true }}
          comparison={`${data?.aiMetrics?.cacheHitRate || 0}% cache hit`}
          icon={Zap}
        />
      </div>

      {/* Revenue Chart & Subscription Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend */}
        <SmartCard className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Revenue Trend
            </CardTitle>
            <CardDescription>Last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                revenue: {
                  label: "Revenue",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[240px] w-full"
            >
              <AreaChart data={metrics?.revenue.monthlyTrend || []}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  strokeOpacity={0.3}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `৳${v >= 1000 ? (v / 1000).toFixed(0) + 'k' : v}`}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="hsl(var(--chart-1))"
                  strokeWidth={2.5}
                  fill="url(#revenueGradient)"
                  dot={false}
                  activeDot={{ r: 6, fill: "hsl(var(--chart-1))" }}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </SmartCard>

        {/* Subscription Breakdown */}
        <SmartCard>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Subscriptions
            </CardTitle>
            <CardDescription>{metrics?.counts.total || 0} total users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[160px]">
              <ChartContainer config={{}} className="h-full w-full">
                <PieChart>
                  <Pie
                    data={subscriptionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={65}
                    dataKey="value"
                    stroke="none"
                  >
                    {subscriptionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ChartContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4">
              {[
                { label: 'Trial', count: metrics?.counts.trial || 0, color: SUBSCRIPTION_COLORS.trial },
                { label: 'Active', count: metrics?.counts.active || 0, color: SUBSCRIPTION_COLORS.active },
                { label: 'Expired', count: metrics?.counts.expired || 0, color: SUBSCRIPTION_COLORS.expired },
                { label: 'Paused', count: metrics?.counts.paused || 0, color: SUBSCRIPTION_COLORS.paused },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-2 text-sm">
                  <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.label}</span>
                  <span className="font-medium ml-auto">{item.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </SmartCard>
      </div>

      {/* Conversion Funnel & AI Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Conversion Funnel */}
        <SmartCard>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Conversion Funnel
            </CardTitle>
            <CardDescription>Trial to paid user journey</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Signups</span>
                    <span className="font-medium">{metrics?.counts.total || 0}</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Converted to Paid</span>
                    <span className="font-medium">{metrics?.conversion.paidUsers || 0}</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(100, metrics?.conversion.trialToPaidRate || 0)}%` }} 
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Retained (Repeat)</span>
                    <span className="font-medium">{metrics?.conversion.retentionRate || 0}%</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(100, metrics?.conversion.retentionRate || 0)}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                  <p className="text-2xl font-bold font-mono text-emerald-500">{metrics?.conversion.trialToPaidRate || 0}%</p>
                  <p className="text-xs text-muted-foreground">Conversion Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold font-mono">{metrics?.conversion.avgDaysToConvert || 0}</p>
                  <p className="text-xs text-muted-foreground">Avg Days to Convert</p>
                </div>
              </div>
            </div>
          </CardContent>
        </SmartCard>

        {/* AI Performance */}
        <SmartCard>
          <CardHeader>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              AI Performance
            </CardTitle>
            <CardDescription>This month's bot metrics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Conversations Started</span>
                    <span className="font-medium">{data?.conversationFunnel?.started || 0}</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }} />
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Orders Placed</span>
                    <span className="font-medium">{data?.conversationFunnel?.ordered || 0}</span>
                  </div>
                  <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-emerald-500 rounded-full transition-all duration-1000" 
                      style={{ width: `${Math.min(100, data?.conversationFunnel?.conversionRate || 0)}%` }} 
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-xl font-bold font-mono">{data?.conversationFunnel?.conversionRate || 0}%</p>
                  <p className="text-xs text-muted-foreground">Order Rate</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-xl font-bold font-mono">{data?.aiMetrics?.cacheHitRate || 0}%</p>
                  <p className="text-xs text-muted-foreground">Cache Hit</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-xl font-bold font-mono">৳{data?.stats.avgCostPerConversation || 0}</p>
                  <p className="text-xs text-muted-foreground">Cost/Convo</p>
                </div>
                <div className="text-center p-3 rounded-lg bg-muted/50">
                  <p className="text-xl font-bold font-mono">{data?.aiMetrics?.totalApiCalls?.toLocaleString() || 0}</p>
                  <p className="text-xs text-muted-foreground">API Calls</p>
                </div>
              </div>
            </div>
          </CardContent>
        </SmartCard>
      </div>

      {/* API Costs & Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Action Items */}
        {(data?.actionItems?.length || 0) > 0 && (
          <SmartCard className="border-amber-200 dark:border-amber-900/50">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Action Items
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {data?.actionItems?.map((item, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="text-amber-500 mt-0.5">•</span>
                    <span>{item.message}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </SmartCard>
        )}

        {/* API Costs */}
        <SmartCard className={`${(data?.actionItems?.length || 0) > 0 ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              API Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <p className="text-xl font-bold font-mono">৳{(data?.stats.todayCost || 0).toFixed(4)}</p>
                <p className="text-sm text-muted-foreground">Today</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <p className="text-xl font-bold font-mono">৳{(data?.stats.weekCost || 0).toFixed(4)}</p>
                <p className="text-sm text-muted-foreground">This Week</p>
              </div>
              <div className="text-center p-4 rounded-lg bg-muted/30">
                <p className="text-xl font-bold font-mono">৳{(data?.stats.monthCost || 0).toFixed(4)}</p>
                <p className="text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </SmartCard>
      </div>

      {/* Recent Activity */}
      <SmartCard>
        <CardHeader>
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Conversations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data?.recentConversations?.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No conversations yet</p>
          ) : (
            <div className="space-y-2">
              {data?.recentConversations?.map((conv) => (
                <Link
                  key={conv.id}
                  href={`/admin/conversations/${conv.id}`}
                  className="flex items-center justify-between p-3 rounded-lg border border-border/50 hover:bg-muted/50 hover:border-primary/30 transition-all duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getStateEmoji(conv.state)}</span>
                    <div>
                      <p className="font-medium text-sm">{conv.workspaceName}</p>
                      <p className="text-xs text-muted-foreground">{conv.customerName}</p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </SmartCard>
    </div>
  )
}
