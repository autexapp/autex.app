"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  DollarSign,
  TrendingUp,
  RefreshCw,
  Loader2,
  PieChart as PieChartIcon,
} from "lucide-react"
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import Link from "next/link"

interface CostsData {
  summary: {
    totalCost: number
    totalRequests: number
    todayCost: number
    weekCost: number
    monthCost: number
    avgCostPerConversation: string
    conversationsThisMonth: number
  }
  breakdown: Array<{
    type: string
    rawType: string
    cost: number
    count: number
    percentage: number
  }>
  history: Array<{
    date: string
    displayDate: string
    cost: number
  }>
  perWorkspace: Array<{
    id: string
    name: string
    today: number
    week: number
    month: number
  }>
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function AdminCostsPage() {
  const [data, setData] = useState<CostsData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const response = await fetch('/api/admin/costs')
      if (!response.ok) throw new Error('Failed to fetch')
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error('Error fetching costs:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
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
          <h1 className="text-2xl font-bold">Cost Analysis</h1>
          <p className="text-muted-foreground">System-wide API usage and spending</p>
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

      {/* Cost Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳{(data?.summary.todayCost || 0).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳{(data?.summary.weekCost || 0).toFixed(2)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">৳{(data?.summary.monthCost || 0).toFixed(2)}</div>
            <p className="text-sm text-muted-foreground mt-1">
              ৳{data?.summary.avgCostPerConversation}/conversation avg
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Target Check */}
      <Card className={Number(data?.summary.avgCostPerConversation || 0) <= 2 
        ? 'bg-green-500/10 border-green-500/20' 
        : 'bg-yellow-500/10 border-yellow-500/20'
      }>
        <CardContent className="py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-lg">
                {Number(data?.summary.avgCostPerConversation || 0) <= 2 ? '✅' : '⚠️'}
              </span>
              <span className="font-medium">Cost Target: ৳2.00/conversation</span>
            </div>
            <span className={`font-bold ${
              Number(data?.summary.avgCostPerConversation || 0) <= 2 
                ? 'text-green-600' 
                : 'text-yellow-600'
            }`}>
              Current: ৳{data?.summary.avgCostPerConversation}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost History Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Cost Trend (Last 30 Days)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data?.history || []}>
                  <defs>
                    <linearGradient id="costGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="displayDate" className="text-xs fill-muted-foreground" />
                  <YAxis className="text-xs fill-muted-foreground" tickFormatter={(value) => `৳${value}`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      borderColor: "hsl(var(--border))",
                      borderRadius: "0.5rem",
                    }}
                    formatter={(value: number) => [`৳${value.toFixed(2)}`, "Cost"]}
                  />
                  <Area
                    type="monotone"
                    dataKey="cost"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    fill="url(#costGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Cost Distribution Pie */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChartIcon className="h-5 w-5 text-primary" />
              Cost Distribution
            </CardTitle>
            <CardDescription>Breakdown by API type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data?.breakdown || []}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="cost"
                    nameKey="type"
                    label={({ percent }) => percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
                  >
                    {(data?.breakdown || []).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [`৳${value.toFixed(2)}`, "Cost"]} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Breakdown</CardTitle>
            <CardDescription>Usage by feature type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {(data?.breakdown || []).map((item, index) => (
                <div key={item.rawType} className="flex items-center justify-between p-3 rounded-lg border border-border bg-muted/30">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <div>
                      <p className="font-medium text-sm">{item.type}</p>
                      <p className="text-xs text-muted-foreground">{item.count} calls</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-mono font-medium text-sm">৳{item.cost.toFixed(2)}</p>
                    <p className="text-xs text-muted-foreground">{item.percentage.toFixed(1)}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Per Workspace Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Cost by Workspace</CardTitle>
          <CardDescription>Compare spending across users</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Workspace</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground text-sm">Today</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground text-sm">This Week</th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground text-sm">This Month</th>
                </tr>
              </thead>
              <tbody>
                {(data?.perWorkspace || []).map((ws) => (
                  <tr key={ws.id} className="border-b border-border/50 hover:bg-muted/30">
                    <td className="py-3 px-4">
                      <Link href={`/admin/workspaces/${ws.id}`} className="font-medium text-sm hover:underline">
                        {ws.name}
                      </Link>
                    </td>
                    <td className="text-right py-3 px-4 font-mono text-sm">৳{ws.today.toFixed(2)}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">৳{ws.week.toFixed(2)}</td>
                    <td className="text-right py-3 px-4 font-mono text-sm">৳{ws.month.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
