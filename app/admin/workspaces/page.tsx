"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SubscriptionModal } from "@/components/admin/subscription-modal"
import {
  Building2,
  Search,
  RefreshCw,
  Loader2,
  ChevronRight,
  Settings2,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"

interface Workspace {
  id: string
  name: string
  businessName: string
  phone: string
  createdAt: string
  totalConversations: number
  totalOrders: number
  successRate: number
  todayCost: number
  lastActiveAt: string
  // Subscription fields
  subscriptionStatus: 'trial' | 'active' | 'expired'
  subscriptionPlan: string | null
  trialEndsAt: string | null
  subscriptionExpiresAt: string | null
  adminPaused: boolean
  lastPaymentDate: string | null
  totalPaid: number
}

export default function AdminWorkspacesPage() {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedWorkspace, setSelectedWorkspace] = useState<Workspace | null>(null)
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false)

  useEffect(() => {
    fetchWorkspaces()
  }, [])

  const fetchWorkspaces = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      const response = await fetch('/api/admin/workspaces')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setWorkspaces(data.workspaces || [])
    } catch (error) {
      console.error('Error fetching workspaces:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const filteredWorkspaces = workspaces.filter(ws =>
    ws.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ws.businessName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ws.phone.includes(searchQuery)
  )

  const getSuccessRateColor = (rate: number) => {
    if (rate >= 70) return 'text-green-600 dark:text-green-400'
    if (rate >= 50) return 'text-yellow-600 dark:text-yellow-400'
    return 'text-red-600 dark:text-red-400'
  }

  const getStatusBadge = (ws: Workspace) => {
    if (ws.adminPaused) {
      return <Badge variant="outline" className="bg-orange-100 text-orange-700 dark:bg-orange-900/20 dark:text-orange-400">Paused</Badge>
    }
    switch (ws.subscriptionStatus) {
      case 'trial':
        return <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400">Trial</Badge>
      case 'active':
        return <Badge className="bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400">Active</Badge>
      case 'expired':
        return <Badge variant="destructive">Expired</Badge>
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  const getDaysRemaining = (ws: Workspace) => {
    const expiryDate = ws.subscriptionStatus === 'trial' ? ws.trialEndsAt : ws.subscriptionExpiresAt
    if (!expiryDate) return '-'
    const diff = new Date(expiryDate).getTime() - Date.now()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
    return days > 0 ? `${days}d` : '0d'
  }

  const handleManageSubscription = (ws: Workspace, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedWorkspace(ws)
    setShowSubscriptionModal(true)
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Workspaces</h1>
          <p className="text-muted-foreground">{workspaces.length} registered businesses</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search workspaces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={() => fetchWorkspaces(true)}
            disabled={refreshing}
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </div>

      {/* Workspaces Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-sm">Workspace</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Status</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Days Left</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm hidden lg:table-cell">Convos</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm hidden lg:table-cell">Success</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm hidden md:table-cell">Cost</th>
                  <th className="text-center py-3 px-4 font-medium text-muted-foreground text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorkspaces.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-muted-foreground">
                      {searchQuery ? 'No workspaces match your search' : 'No workspaces found'}
                    </td>
                  </tr>
                ) : (
                  filteredWorkspaces.map((ws) => (
                    <tr 
                      key={ws.id} 
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer"
                      onClick={() => window.location.href = `/admin/workspaces/${ws.id}`}
                    >
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">{ws.businessName}</p>
                            <p className="text-xs text-muted-foreground">{ws.phone}</p>
                          </div>
                        </div>
                      </td>
                      <td className="text-center py-3 px-4">
                        {getStatusBadge(ws)}
                      </td>
                      <td className="text-center py-3 px-4 font-mono text-sm">
                        {getDaysRemaining(ws)}
                      </td>
                      <td className="text-center py-3 px-4 font-mono text-sm hidden lg:table-cell">
                        {ws.totalConversations}
                      </td>
                      <td className="text-center py-3 px-4 hidden lg:table-cell">
                        <span className={`font-medium text-sm ${getSuccessRateColor(ws.successRate)}`}>
                          {ws.successRate}%
                        </span>
                      </td>
                      <td className="text-center py-3 px-4 font-mono text-sm hidden md:table-cell">
                        ৳{ws.todayCost.toFixed(2)}
                      </td>
                      <td className="py-3 px-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => handleManageSubscription(ws, e)}
                          className="h-8 px-2"
                        >
                          <Settings2 className="h-4 w-4 mr-1" />
                          Manage
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Subscription Management Modal */}
      <SubscriptionModal
        workspace={selectedWorkspace ? {
          id: selectedWorkspace.id,
          name: selectedWorkspace.businessName,
          subscription_status: selectedWorkspace.subscriptionStatus,
          subscription_plan: selectedWorkspace.subscriptionPlan,
          trial_ends_at: selectedWorkspace.trialEndsAt,
          subscription_expires_at: selectedWorkspace.subscriptionExpiresAt,
          admin_paused: selectedWorkspace.adminPaused,
          last_payment_date: selectedWorkspace.lastPaymentDate,
          total_paid: selectedWorkspace.totalPaid,
        } : null}
        open={showSubscriptionModal}
        onOpenChange={setShowSubscriptionModal}
        onSuccess={() => fetchWorkspaces(true)}
      />
    </div>
  )
}
