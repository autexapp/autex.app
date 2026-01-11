"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { MessageSquare, ShoppingBag, Users, BarChart3, Settings, CheckCircle2 } from "lucide-react"

interface PremiumLoaderProps {
  className?: string
  textClassName?: string
}

const LOADING_MESSAGES = [
  "Loading Modules...",
  "Syncing Conversations...",
  "Fetching Orders...",
  "Analyzing Data...",
  "Almost Ready..."
]

const ICONS = [
  { icon: MessageSquare, color: "text-blue-500", bg: "bg-blue-500/10" },
  { icon: ShoppingBag, color: "text-purple-500", bg: "bg-purple-500/10" },
  { icon: Users, color: "text-green-500", bg: "bg-green-500/10" },
  { icon: BarChart3, color: "text-orange-500", bg: "bg-orange-500/10" },
  { icon: Settings, color: "text-zinc-500", bg: "bg-zinc-500/10" },
]

export function PremiumLoader({ className, textClassName }: PremiumLoaderProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % (ICONS.length + 1))
    }, 800)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className={cn("absolute inset-0 z-40 flex flex-col items-center justify-center bg-zinc-50 dark:bg-black p-4 text-center", className)}>
      
      {/* Cycling Text */}
      <div className="mb-8 text-center space-y-2">
        <h3 className={cn("text-lg font-serif font-medium text-zinc-900 dark:text-white animate-in fade-in slide-in-from-bottom-2 duration-300 min-w-[240px]", textClassName)}>
          {LOADING_MESSAGES[Math.min(activeIndex, LOADING_MESSAGES.length - 1)]}
        </h3>
      </div>

      {/* Progress Bar Line */}
      <div className="relative w-64 h-1 bg-zinc-200 dark:bg-zinc-800 rounded-full mb-8 overflow-hidden">
         <div 
            className="absolute left-0 top-0 h-full bg-zinc-900 dark:bg-white transition-all duration-500 ease-out"
            style={{ width: `${(Math.min(activeIndex, ICONS.length) / ICONS.length) * 100}%` }}
         />
      </div>

      {/* Icons Row */}
      <div className="flex items-center gap-4 sm:gap-6">
        {ICONS.map((item, index) => {
          const Icon = item.icon
          const isActive = index <= activeIndex
          const isCurrent = index === activeIndex

          return (
            <div 
              key={index}
              className={cn(
                "relative flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl transition-all duration-500",
                isActive ? item.bg : "bg-zinc-100 dark:bg-zinc-900",
                isActive ? "scale-100" : "scale-95 opacity-50",
                isCurrent && "ring-2 ring-offset-2 ring-zinc-900 dark:ring-white dark:ring-offset-black scale-110"
              )}
            >
              <Icon 
                className={cn(
                  "h-5 w-5 sm:h-6 sm:w-6 transition-all duration-500",
                  isActive ? item.color : "text-zinc-400 dark:text-zinc-600"
                )} 
              />
              
              {isActive && (
                 <div className="absolute -bottom-1 -right-1 h-3 w-3 sm:h-4 sm:w-4 bg-white dark:bg-black rounded-full flex items-center justify-center">
                    <CheckCircle2 className={cn("h-3 w-3 sm:h-4 sm:w-4", item.color)} />
                 </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
