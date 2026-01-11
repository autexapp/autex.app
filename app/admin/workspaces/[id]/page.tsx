"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatsCard } from "@/components/dashboard/stats-card"
import {
  ArrowLeft,
  MessageSquare,
  ShoppingCart,
  TrendingUp,
  DollarSign,
  RefreshCw,
  Loader2,
  ChevronRight,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface WorkspaceData {
  workspace: {
    id: string
    name: string
    businessName: string
    phone: string
    createdAt: string
  }
  stats: {
    totalConversations: number
    totalOrders: number
    successRate: number
    totalRevenue: number
    todayCost: number
    monthCost: number
    costPerConversation: string
    profit: number
  }
  costBreakdown: Array<{
    type: string
    rawType: string
    cost: number
    count: number
  }>
  conversations: Array<{
    id: string
    customerName: string
    state: string
    lastMessageAt: string
    createdAt: string
  }>
}

export default function WorkspaceDetailPage() {
  const params = useParams()
  const workspaceId = params.id as string
  
  const [data, setData] = useState<WorkspaceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    if (workspaceId) fetchData()
  }, [workspaceId])

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const response = await fetch(`/api/admin/workspaces/${workspaceId}`)
      if (!response.ok) throw new Error('Failed to fetch')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching workspace:', error)
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

  if (!data) {
    return (
      <div className="p-6">
        <p className="text-muted-foreground">Workspace not found</p>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/workspaces">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold">{data.workspace.businessName}</h1>
            <p className="text-muted-foreground">{data.workspace.phone}</p>
          </div>
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

      {/* Key Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Conversations"
          value={data.stats.totalConversations.toString()}
          icon={MessageSquare}
          comparison="total chats"
        />
        <StatsCard
          title="Orders"
          value={data.stats.totalOrders.toString()}
          icon={ShoppingCart}
          comparison={`${data.stats.successRate}% success`}
        />
        <StatsCard
          title="Revenue"
          value={`৳${data.stats.totalRevenue.toLocaleString()}`}
          icon={TrendingUp}
          comparison="total sales"
          isCurrency
        />
        <StatsCard
          title="Monthly Cost"
          value={`৳${data.stats.monthCost.toFixed(2)}`}
          icon={DollarSign}
          comparison={`৳${data.stats.costPerConversation}/convo`}
          isCurrency
        />
      </div>

      {/* Profit Card */}
      <Card className={data.stats.profit >= 0 ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <span className="font-medium">Net Profit (This Month)</span>
            <span className={`text-2xl font-bold ${data.stats.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              ৳{data.stats.profit.toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Cost Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            {data.costBreakdown.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No API usage yet</p>
            ) : (
              <div className="space-y-3">
                {data.costBreakdown.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                    <div>
                      <p className="font-medium text-sm">{item.type}</p>
                      <p className="text-xs text-muted-foreground">{item.count} calls</p>
                    </div>
                    <p className="font-mono font-medium">৳{item.cost.toFixed(2)}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Conversations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Conversations</CardTitle>
            <Link href={`/admin/workspaces/${workspaceId}/conversations`}>
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {data.conversations.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No conversations yet</p>
            ) : (
              <div className="space-y-2">
                {data.conversations.map((conv) => (
                  <Link
                    key={conv.id}
                    href={`/admin/conversations/${conv.id}`}
                    className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <span>{getStateEmoji(conv.state)}</span>
                      <span className="font-medium text-sm">{conv.customerName}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDistanceToNow(new Date(conv.lastMessageAt), { addSuffix: true })}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
