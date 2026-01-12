"use client"

import { useEffect, useState } from "react"
import { SmartCard } from "@/components/ui/premium/smart-card"
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bell } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { formatDistanceToNow } from "date-fns"

type OrderStatus = "pending" | "processing" | "completed" | "cancelled"

interface RecentOrder {
  id: string
  orderNumber: string
  customer: string
  product: string
  amount: number
  status: string
  date: string
}

const statusConfig: Record<string, { label: string; className: string }> = {
  pending: { label: "Pending", className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  processing: { label: "Processing", className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" },
  completed: { label: "Completed", className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  cancelled: { label: "Cancelled", className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
}

export function RecentOrders() {
  const [orders, setOrders] = useState<RecentOrder[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchRecentOrders()
  }, [])

  const fetchRecentOrders = async () => {
    try {
      const response = await fetch('/api/dashboard/recent-orders?limit=5')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.recentOrders || [])
      }
    } catch (error) {
      console.error('Failed to fetch recent orders:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <SmartCard className="w-full">
      <CardHeader className="pb-4 border-b border-border/40">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2.5">
             <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400">
               <Bell className="h-5 w-5" />
             </div>
             <CardTitle className="text-lg font-serif tracking-wide">Recent Orders</CardTitle>
           </div>
           <Button variant="ghost" size="sm" asChild className="text-xs font-mono h-8">
             <Link href="/dashboard/orders">VIEW ALL</Link>
           </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="text-center text-muted-foreground py-12">Loading...</div>
        ) : orders.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">No orders yet</div>
        ) : (
          <>
            {/* Desktop Table (Premium Glass Rows) */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full table-fixed">
                <thead>
                  <tr className="text-left border-b border-border/50">
                    <th className="py-3 pl-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-[90px]">Order ID</th>
                    <th className="py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-[120px]">Customer</th>
                    <th className="py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-[150px]">Product</th>
                    <th className="py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-[70px]">Amount</th>
                    <th className="py-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider w-[80px]">Status</th>
                    <th className="py-3 pr-3 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider text-right w-[100px]">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                  {orders.map((order) => (
                    <tr key={order.id} className="group hover:bg-muted/30 transition-colors">
                      <td className="py-3 pl-3">
                        <Link
                          href={`/dashboard/orders`}
                          className="font-mono text-xs font-medium text-primary hover:text-primary/80 transition-colors"
                        >
                          #{order.orderNumber}
                        </Link>
                      </td>
                      <td className="py-3 pr-2">
                        <p className="font-medium text-xs text-foreground line-clamp-2 leading-snug">{order.customer}</p>
                      </td>
                      <td className="py-3 pr-2">
                        <p className="text-xs text-muted-foreground line-clamp-2 leading-snug">{order.product}</p>
                      </td>
                      <td className="py-3 font-mono text-xs font-bold text-foreground">৳{order.amount.toLocaleString()}</td>
                      <td className="py-3">
                        <Badge 
                          variant="secondary" 
                          className={cn(
                            "text-[9px] px-1.5 py-0.5 font-bold uppercase tracking-wider shadow-none border transition-colors", 
                            statusConfig[order.status]?.className || statusConfig.pending.className
                          )}
                        >
                          {statusConfig[order.status]?.label || order.status}
                        </Badge>
                      </td>
                      <td className="py-3 pr-3 text-[10px] text-muted-foreground text-right font-mono whitespace-nowrap">
                        {formatDistanceToNow(new Date(order.date), { addSuffix: true })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards (Stacked Glass) */}
            <div className="md:hidden space-y-3 pt-4">
              {orders.map((order) => (
                <div key={order.id} className="p-4 rounded-xl bg-muted/20 border border-border/50 hover:bg-muted/40 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <Link href={`/dashboard/orders`} className="font-mono text-sm font-bold text-primary">
                      #{order.orderNumber}
                    </Link>
                    <Badge 
                      variant="secondary" 
                      className={cn("text-[10px] px-2 py-0.5 font-bold uppercase tracking-wider", statusConfig[order.status]?.className || statusConfig.pending.className)}
                    >
                      {statusConfig[order.status]?.label || order.status}
                    </Badge>
                  </div>
                  
                  <div className="flex justify-between items-start gap-4 mb-3">
                    <div>
                        <p className="font-semibold text-sm text-foreground">{order.customer}</p>
                        <p className="text-xs text-muted-foreground line-clamp-1">{order.product}</p>
                    </div>
                    <span className="font-mono text-sm font-bold text-foreground whitespace-nowrap">৳{order.amount.toLocaleString()}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-border/30">
                    <span className="text-xs text-muted-foreground font-mono">
                      {formatDistanceToNow(new Date(order.date), { addSuffix: true })}
                    </span>
                     <Button variant="link" size="sm" className="h-auto p-0 text-xs" asChild>
                         <Link href="/dashboard/orders">Details</Link>
                     </Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </CardContent>
    </SmartCard>
  )
}
