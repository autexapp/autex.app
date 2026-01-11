import { SmartCard } from "@/components/ui/premium/smart-card"
import { CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"

interface StatsCardProps {
  title: string
  value: string
  trend?: {
    value: string
    direction: "up" | "down"
    isPositive: boolean
  }
  comparison: string
  icon: LucideIcon
  isCurrency?: boolean
}

export function StatsCard({ title, value, trend, comparison, icon: Icon, isCurrency = false }: StatsCardProps) {
  return (
    <SmartCard className="h-full">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground font-medium">{title}</p>
            <p className={cn("text-3xl font-bold mt-2 font-mono tracking-tight", isCurrency && "font-mono")}>{value}</p>
            <div className="flex items-center gap-2 mt-2">
              {trend && (
                <span
                  className={cn(
                    "text-xs font-medium px-1.5 py-0.5 rounded",
                    trend.isPositive 
                      ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300" 
                      : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300",
                  )}
                >
                  {trend.value} {trend.direction === "up" ? "↗" : "↘"}
                </span>
              )}
              <span className="text-xs text-muted-foreground">{comparison}</span>
            </div>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/5 dark:bg-white/10 dark:backdrop-blur-sm">
            <Icon className="h-6 w-6 text-primary dark:text-white" />
          </div>
        </div>
      </CardContent>
    </SmartCard>
  )
}

