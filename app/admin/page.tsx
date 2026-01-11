"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-card"
import {
  Building2,
  MessageSquare,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  Activity,
  RefreshCw,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
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
  recentConversations: Array<{
    id: string
    customerName: string
    workspaceName: string
    state: string
    lastMessageAt: string
  }>
}

export default function AdminOverviewPage() {
  const [data, setData] = useState<OverviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const response = await fetch('/api/admin/overview')
      if (!response.ok) throw new Error('Failed to fetch')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching overview:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const getStateEmoji = (state: string) => {
    if (state === 'IDLE') return '✅'
    if (state.includes('COLLECT') || state.includes('AWAIT')) return '⏳'
    return '🔄'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">System-wide overview and monitoring</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => fetchData(true)}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* System Health Banner */}
      <Card className="bg-green-500/10 border-green-500/20">
        <CardContent className="py-3">
          <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="font-medium">System Healthy</span>
            <span className="text-sm opacity-80">• All services operational</span>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Workspaces"
          value={data?.stats.totalWorkspaces.toString() || '0'}
          icon={Building2}
          comparison="active businesses"
        />
        <StatsCard
          title="Conversations"
          value={data?.stats.totalConversations.toString() || '0'}
          icon={MessageSquare}
          comparison="total chats"
        />
        <StatsCard
          title="Orders"
          value={data?.stats.totalOrders.toString() || '0'}
          icon={ShoppingCart}
          comparison={`${data?.stats.successRate || 0}% success rate`}
        />
        <StatsCard
          title="Today's Cost"
          value={`৳${(data?.stats.todayCost || 0).toFixed(2)}`}
          icon={DollarSign}
          comparison={`৳${data?.stats.avgCostPerConversation || '0'}/convo`}
          isCurrency
        />
      </div>

      {/* Cost Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{(data?.stats.todayCost || 0).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{(data?.stats.weekCost || 0).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{(data?.stats.monthCost || 0).toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-primary" />
            Recent Conversations
          </CardTitle>
        </CardHeader>
        <CardContent>
          {data?.recentConversations.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No conversations yet</p>
          ) : (
            <div className="space-y-3">
              {data?.recentConversations.map((conv) => (
                <div
                  key={conv.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors cursor-pointer"
                  onClick={() => window.location.href = `/admin/conversations/${conv.id}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{getStateEmoji(conv.state)}</span>
                    <div>
                      <p className="font-medium text-sm">{conv.workspaceName}</p>
                      <p className="text-xs text-muted-foreground">{conv.customerName}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
