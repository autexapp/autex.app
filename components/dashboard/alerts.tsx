import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { SmartCard } from "@/components/ui/premium/smart-card"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface Alert {
  id: string
  type: "warning" | "danger" | "info"
  message: string
  href: string
}

const alerts: Alert[] = [
  { id: "1", type: "warning", message: "3 orders need payment verification", href: "/dashboard/orders?filter=pending" },
  {
    id: "2",
    type: "danger",
    message: "AI usage at 280/300 screenshots (93% used) - Upgrade?",
    href: "/dashboard/settings/billing",
  },
  {
    id: "3",
    type: "info",
    message: "New feature: Multi-product cart now available",
    href: "/dashboard/settings/features",
  },
]

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
  info: { icon: Info, className: "text-blue-600 dark:text-blue-400", bgClassName: "bg-blue-50 dark:bg-blue-900/20" },
}

export function Alerts() {
  if (alerts.length === 0) return null

  return (
    <SmartCard>
      <CardHeader className="pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-md bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400">
            <AlertCircle className="h-4 w-4" />
          </div>
          <CardTitle className="text-base font-serif tracking-wide">Alerts & Notifications</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 space-y-2">
        {alerts.map((alert) => {
          const config = alertConfig[alert.type]
          const Icon = config.icon
          return (
            <Link
              key={alert.id}
              href={alert.href}
              className={cn(
                "group flex items-start gap-3 p-3 rounded-lg transition-all duration-200 border border-transparent",
                "hover:scale-[1.01] hover:shadow-sm",
                config.bgClassName,
                // Add border in light mode for crispness
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
