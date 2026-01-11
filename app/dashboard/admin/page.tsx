"use client"

import { useState, useEffect } from "react"
import { TopBar } from "@/components/dashboard/top-bar"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PremiumLoader } from "@/components/ui/premium/premium-loader"
import { SubscriptionModal } from "@/components/admin/subscription-modal"
import {
  DollarSign,
  Activity,
  Zap,
  PieChart as PieChartIcon,
  TrendingUp,
  Users,
  Search,
  Settings2
} from "lucide-react"
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Cell,
  PieChart,
  Pie,
  Legend
} from "recharts"

interface UsageData {
  total_cost: number
  total_requests: number
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
}

interface UserData {
  id: string
  email: string
  business_name: string
  phone: string
  workspace_id: string | null
  workspace_name: string
  created_at: string
  last_sign_in: string | null
  // Subscription fields
  subscription_status: 'trial' | 'active' | 'expired'
  subscription_plan: string | null
  trial_ends_at: string | null
  subscription_expires_at: string | null
  admin_paused: boolean
  last_payment_date: string | null
  total_paid: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];
const USD_TO_BDT = 120; // Approximate exchange rate

// Admin email - only this user can access the admin page
const ADMIN_EMAIL = 'admin@gmail.com';

import { useRouter } from "next/navigation"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [data, setData] = useState<UsageData | null>(null)
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<UserData[]>([])
  const [usersLoading, setUsersLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null)

  useEffect(() => {
    checkAdminAccess()
  }, [])

  useEffect(() => {
    if (isAdmin === true) {
      fetchUsageData()
      fetchUsers()
    }
  }, [isAdmin])

  const checkAdminAccess = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (!response.ok) {
        router.push('/dashboard')
        return
      }
      const data = await response.json()
      if (data.user?.email !== ADMIN_EMAIL) {
        router.push('/dashboard')
        return
      }
      setIsAdmin(true)
    } catch {
      router.push('/dashboard')
    }
  }

  const fetchUsageData = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/admin/usage")
      if (!response.ok) throw new Error("Failed to fetch usage data")
      
      const usageData = await response.json()
      
      // Convert costs to BDT
      const convertedData = {
        ...usageData,
        total_cost: usageData.total_cost * USD_TO_BDT,
        breakdown: usageData.breakdown.map((item: any) => ({
          ...item,
          cost: item.cost * USD_TO_BDT
        })),
        history: usageData.history.map((item: any) => ({
          ...item,
          cost: item.cost * USD_TO_BDT
        }))
      }
      
      setData(convertedData)
    } catch (error) {
      console.error("Error fetching usage data:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchUsers = async () => {
    try {
      setUsersLoading(true)
      const response = await fetch("/api/admin/users")
      if (!response.ok) throw new Error("Failed to fetch users")
      
      const usersData = await response.json()
      setUsers(usersData.users || [])
    } catch (error) {
      console.error("Error fetching users:", error)
    } finally {
      setUsersLoading(false)
    }
  }

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.business_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.phone.includes(searchQuery)
  )

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  if (isAdmin === null || loading) {
    return <PremiumLoader />
  }

  return (
    <>
      <TopBar title="Admin Dashboard" />

      <div className="p-4 lg:p-6 space-y-6">
        <div className="flex flex-col gap-2">
          <h2 className="text-2xl font-semibold">AI Investment Tracker</h2>
          <p className="text-muted-foreground">Monitor your spending on OpenAI services (Converted to BDT).</p>
        </div>

        {data ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <StatsCard
                title="Total Investment"
                value={`৳${data.total_cost.toFixed(2)}`}
                trend={{ value: "Lifetime", direction: "up", isPositive: true }}
                comparison="spent on AI"
                icon={DollarSign}
                isCurrency
              />
              <StatsCard
                title="Total AI Calls"
                value={data.total_requests.toLocaleString()}
                trend={{ value: "", direction: "up", isPositive: true }}
                comparison="requests processed"
                icon={Activity}
              />
              <StatsCard
                title="Avg Cost per Call"
                value={`৳${data.total_requests > 0 ? (data.total_cost / data.total_requests).toFixed(2) : '0.00'}`}
                trend={{ value: "", direction: "down", isPositive: true }}
                comparison="average"
                icon={Zap}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Cost History Chart */}
              <Card className="bg-card border border-border shadow-sm lg:col-span-2">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Investment Over Time (Last 30 Days)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.history}>
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

              {/* Cost Distribution Pie Chart */}
              <Card className="bg-card border border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <PieChartIcon className="h-5 w-5 text-primary" />
                    Cost Distribution
                  </CardTitle>
                  <CardDescription>Breakdown by AI Feature</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={data.breakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="cost"
                          nameKey="type"
                          label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                            const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                            const x = cx + radius * Math.cos(-(midAngle || 0) * Math.PI / 180);
                            const y = cy + radius * Math.sin(-(midAngle || 0) * Math.PI / 180);
                            return (percent || 0) > 0.05 ? `${((percent || 0) * 100).toFixed(0)}%` : '';
                          }}
                        >
                          {data.breakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip 
                           formatter={(value: number) => [`৳${value.toFixed(2)}`, "Cost"]}
                           contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            borderColor: "hsl(var(--border))",
                            borderRadius: "0.5rem",
                          }}
                        />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Detailed Breakdown Table */}
              <Card className="bg-card border border-border shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Detailed Breakdown</CardTitle>
                  <CardDescription>Usage statistics by feature type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.breakdown.map((item, index) => (
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
          </>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            No usage data available
          </div>
        )}

        {/* Registered Users Section */}
        <div className="mt-8 space-y-6">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold">Registered Users</h2>
            <p className="text-muted-foreground">All users signed up on the platform.</p>
          </div>

          {/* User Stats Card */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <StatsCard
              title="Total Users"
              value={users.length.toString()}
              trend={{ value: "", direction: "up", isPositive: true }}
              comparison="registered users"
              icon={Users}
            />
          </div>

          {/* Users Table */}
          <Card className="bg-card border border-border shadow-sm">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    User List
                  </CardTitle>
                  <CardDescription>View all registered users and their details</CardDescription>
                </div>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search by email, name, phone..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {usersLoading ? (
                <div className="relative h-48 py-8">
                  <PremiumLoader className="bg-transparent" />
                </div>
              ) : filteredUsers.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  {searchQuery ? "No users found matching your search" : "No users registered yet"}
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Email</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Business Name</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden sm:table-cell">Phone</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground hidden md:table-cell">Workspace</th>
                        <th className="text-left py-3 px-2 font-medium text-muted-foreground">Signup Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr key={user.id} className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                          <td className="py-3 px-2">
                            <span className="font-medium">{user.email}</span>
                          </td>
                          <td className="py-3 px-2 text-muted-foreground">{user.business_name}</td>
                          <td className="py-3 px-2 text-muted-foreground hidden sm:table-cell">{user.phone}</td>
                          <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">{user.workspace_name}</td>
                          <td className="py-3 px-2 text-muted-foreground">{formatDate(user.created_at)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
