"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  RefreshCw,
  Loader2,
  AlertCircle,
  Info,
} from "lucide-react"
import { formatDistanceToNow } from "date-fns"

interface ErrorLog {
  id: string
  type: string
  message: string
  severity: 'critical' | 'warning' | 'info'
  workspaceName: string | null
  conversationId: string | null
  createdAt: string
  metadata: any
}

export default function AdminErrorsPage() {
  const [errors, setErrors] = useState<ErrorLog[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    fetchErrors()
  }, [])

  const fetchErrors = async (isRefresh = false) => {
    if (isRefresh) setRefreshing(true)
    else setLoading(true)

    try {
      // For now, show placeholder since we don't have analytics_events table yet
      // In production, this would fetch from the database
      setErrors([])
    } catch (error) {
      console.error('Error fetching errors:', error)
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }

  const getSeverityInfo = (severity: string) => {
    switch (severity) {
      case 'critical': return { icon: AlertCircle, color: 'text-red-600 bg-red-500/10', label: 'Critical' }
      case 'warning': return { icon: AlertTriangle, color: 'text-yellow-600 bg-yellow-500/10', label: 'Warning' }
      default: return { icon: Info, color: 'text-blue-600 bg-blue-500/10', label: 'Info' }
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
          <h1 className="text-2xl font-bold">Error Logs</h1>
          <p className="text-muted-foreground">Monitor system errors and warnings</p>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => fetchErrors(true)}
          disabled={refreshing}
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="h-8 w-8 text-red-600" />
              <div>
                <p className="text-3xl font-bold text-red-600">0</p>
                <p className="text-sm text-muted-foreground">Critical Errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-yellow-500/10 border-yellow-500/20">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-3xl font-bold text-yellow-600">0</p>
                <p className="text-sm text-muted-foreground">Warnings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-green-500/10 border-green-500/20">
          <CardContent className="py-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                ✓
              </div>
              <div>
                <p className="text-lg font-bold text-green-600">System Healthy</p>
                <p className="text-sm text-muted-foreground">No critical errors</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Info Card */}
      <Card>
        <CardContent className="py-6">
          <div className="text-center space-y-4">
            <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center mx-auto">
              <AlertTriangle className="h-8 w-8 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Error Logging Coming Soon</h3>
              <p className="text-muted-foreground mt-2 max-w-md mx-auto">
                After running the SQL migrations, this page will show real-time error logs 
                from the <code className="bg-muted px-1 rounded">analytics_events</code> table.
              </p>
            </div>
            <div className="pt-4">
              <p className="text-sm text-muted-foreground">
                For now, check{' '}
                <a 
                  href="https://sentry.io" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Sentry Dashboard
                </a>
                {' '}for error monitoring.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error List (will populate after migrations) */}
      {errors.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Errors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {errors.map((error) => {
                const severity = getSeverityInfo(error.severity)
                const Icon = severity.icon
                return (
                  <div 
                    key={error.id}
                    className={`flex items-start gap-3 p-4 rounded-lg ${severity.color}`}
                  >
                    <Icon className="h-5 w-5 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-sm">{error.type}</p>
                        <span className="text-xs text-muted-foreground shrink-0">
                          {formatDistanceToNow(new Date(error.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm opacity-80 mt-1">{error.message}</p>
                      {error.workspaceName && (
                        <p className="text-xs text-muted-foreground mt-2">
                          Workspace: {error.workspaceName}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
