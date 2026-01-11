"use client"

import { useEffect, useState } from "react"
import { SmartCard } from "@/components/ui/premium/smart-card"
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { BarChart3 } from "lucide-react"
import { format } from "date-fns"

interface SalesData {
  date: string
  revenue: number
  orders: number
}

export function SalesChart() {
  const [salesData, setSalesData] = useState<SalesData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSalesData()
  }, [])

  const fetchSalesData = async () => {
    try {
      const response = await fetch('/api/dashboard/sales?days=7')
      if (response.ok) {
        const data = await response.json()
        setSalesData(data.chartData || [])
      }
    } catch (error) {
      console.error('Failed to fetch sales data:', error)
    } finally {
      setLoading(false)
    }
  }

  // Format data for display
  const chartData = salesData.map(item => ({
    day: format(new Date(item.date), 'EEE'),
    orders: item.orders,
    revenue: item.revenue,
  }))

  return (
    <SmartCard className="w-full">
      <CardHeader className="pb-4 border-b border-border/40">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-primary/10 dark:bg-primary/20 text-primary">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div>
            <CardTitle className="text-lg font-serif tracking-wide">Revenue Analytics</CardTitle>
            <CardDescription className="text-xs">Revenue vs Orders (Last 7 Days)</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        {loading ? (
          <div className="h-[300px] flex flex-col items-center justify-center text-muted-foreground gap-2">
            <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">Calibrating data...</span>
          </div>
        ) : chartData.length === 0 ? (
          <div className="h-[300px] flex items-center justify-center text-muted-foreground">
            No sales data available
          </div>
        ) : (
          <ChartContainer
            config={{
              orders: {
                label: "Orders",
                // Use a vibrant "Neon Emerald" for the line
                color: "oklch(0.696 0.17 162.48)", 
              },
              revenue: {
                label: "Revenue",
                 // Use a deep "Electric Purple" for secondary metric or fill
                color: "oklch(0.627 0.265 303.9)", 
              }
            }}
            className="h-[300px] w-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillOrders" x1="0" y1="0" x2="0" y2="1">
                    {/* Premium Gradient: Emerald to Transparent */}
                    <stop offset="5%" stopColor="var(--color-orders)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="var(--color-orders)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} strokeOpacity={0.1} />
                <XAxis
                  dataKey="day"
                  stroke="var(--muted-foreground)"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickMargin={12}
                  fontWeight={500}
                />
                <YAxis 
                  stroke="var(--muted-foreground)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `${value}`}
                  fontWeight={500}
                />
                <ChartTooltip 
                  content={<ChartTooltipContent indicator="line" className="bg-background/95 backdrop-blur-md border-border/50 shadow-xl" />} 
                  cursor={{ stroke: "var(--muted-foreground)", strokeWidth: 1, strokeDasharray: "4 4" }}
                />
                <Area
                  type="monotone"
                  dataKey="orders"
                  stroke="var(--color-orders)"
                  strokeWidth={3}
                  fill="url(#fillOrders)"
                  activeDot={{ r: 6, strokeWidth: 0, fill: "var(--color-orders)" }}
                  animationDuration={1500}
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        )}
      </CardContent>
    </SmartCard>
  )
}
