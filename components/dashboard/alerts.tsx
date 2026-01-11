'use client'

import { useEffect, useState } from "react"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SmartCard } from "@/components/ui/premium/smart-card"
import { AlertCircle, AlertTriangle, Info, Clock, CreditCard, MessageSquare, Package, PauseCircle, Sparkles } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { useSubscription } from "@/hooks/use-subscription"
import { useWorkspace } from "@/lib/workspace-provider"

interface Alert {
  id: string
  type: "warning" | "danger" | "info" | "success"
  message: string
  href: string
  icon?: React.ElementType
}

const alertConfig = {
  warning: {
    icon: AlertTriangle,
    className: "text-amber-600 dark:text-amber-400",
    bgClassName: "bg-amber-50 dark:bg-amber-900/20",
  },
  danger: {
    icon: AlertCircle,
    className: "text-red-600 dark:text-red-400",
    bgClassName: "bg-red-50 dark:bg-red-900/20",
  },
  info: { 
    icon: Info, 
    className: "text-blue-600 dark:text-blue-400", 
    bgClassName: "bg-blue-50 dark:bg-blue-900/20" 
  },
  success: {
    icon: Sparkles,
    className: "text-green-600 dark:text-green-400",
    bgClassName: "bg-green-50 dark:bg-green-900/20",
  },
}

export function Alerts() {
  const { subscription, isLoading: subscriptionLoading } = useSubscription()
  const { needsReplyCount, pendingOrdersCount } = useWorkspace()
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    const dynamicAlerts: Alert[] = []

    // 1. Subscription-based alerts
    if (subscription) {
      // Paused subscription alert
      if (subscription.isPaused) {
        dynamicAlerts.push({
          id: "sub-paused",
          type: "danger",
          message: `Subscription paused by admin${subscription.pausedReason ? `: ${subscription.pausedReason}` : ''}`,
          href: "/dashboard/settings?tab=billing",
          icon: PauseCircle,
        })
      }
      // Expired subscription alert
      else if (subscription.status === 'expired' || !subscription.canUseBot) {
        dynamicAlerts.push({
          id: "sub-expired",
          type: "danger",
          message: "Your subscription has expired. Renew to restore bot.",
          href: "/dashboard/settings?tab=billing",
          icon: CreditCard,
        })
      }
      // Trial expiring soon (3 days or less)
      else if (subscription.status === 'trial' && subscription.daysRemaining <= 3) {
        dynamicAlerts.push({
          id: "trial-ending",
          type: "warning",
          message: `Trial ending in ${subscription.daysRemaining} day${subscription.daysRemaining !== 1 ? 's' : ''} — Upgrade to continue`,
          href: "/dashboard/settings?tab=billing",
          icon: Clock,
        })
      }
      // Subscription expiring soon (5 days or less)
      else if (subscription.status === 'active' && subscription.daysRemaining <= 5) {
        dynamicAlerts.push({
          id: "sub-expiring",
          type: "warning",
          message: `Subscription renews in ${subscription.daysRemaining} day${subscription.daysRemaining !== 1 ? 's' : ''}`,
          href: "/dashboard/settings?tab=billing",
          icon: Clock,
        })
      }
    }

    // 2. Orders needing attention
    if (pendingOrdersCount > 0) {
      dynamicAlerts.push({
        id: "pending-orders",
        type: "warning",
        message: `${pendingOrdersCount} order${pendingOrdersCount !== 1 ? 's' : ''} awaiting confirmation`,
        href: "/dashboard/orders?filter=pending",
        icon: Package,
      })
    }

    // 3. Conversations needing reply
    if (needsReplyCount > 0) {
      dynamicAlerts.push({
        id: "needs-reply",
        type: "info",
        message: `${needsReplyCount} conversation${needsReplyCount !== 1 ? 's' : ''} need${needsReplyCount === 1 ? 's' : ''} your reply`,
        href: "/dashboard/conversations?filter=needs_reply",
        icon: MessageSquare,
      })
    }

    setAlerts(dynamicAlerts)
  }, [subscription, needsReplyCount, pendingOrdersCount])

  // Don't show section if loading or no alerts
  if (subscriptionLoading) return null
  if (alerts.length === 0) return null

  return (
    <SmartCard>
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <AlertCircle className="h-4 w-4" />
          </div>
          <CardTitle className="text-base font-serif tracking-wide">Alerts & Notifications</CardTitle>
          <span className="ml-auto text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
            {alerts.length}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-2">
        {alerts.map((alert) => {
          const config = alertConfig[alert.type]
          const Icon = alert.icon || config.icon
          return (
            <Link
              key={alert.id}
              href={alert.href}
              className={cn(
                "group flex items-start gap-3 p-3 rounded-lg transition-all duration-200 border border-transparent",
                "hover:scale-[1.01] hover:shadow-sm",
                config.bgClassName,
                "border-black/5 dark:border-transparent" 
              )}
            >
              <Icon className={cn("h-5 w-5 mt-0.5 shrink-0", config.className)} />
              <div className="flex-1">
                <span className={cn("text-sm font-medium block group-hover:underline decoration-wavy decoration-2 underline-offset-4", config.className)}>
                  {alert.message}
                </span>
              </div>
            </Link>
          )
        })}
      </CardContent>
    </SmartCard>
  )
}

