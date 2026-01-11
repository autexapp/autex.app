import * as React from "react"
import { cn } from "@/lib/utils"

interface SmartCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "active" | "ghost" | "static"
}

export function SmartCard({ className, variant = "default", ...props }: SmartCardProps) {
  return (
    <div
      className={cn(
        // Base Layout & Animation
        "relative overflow-hidden rounded-xl transition-all duration-300",
        
        // Light Mode: Editorial Paper
        // Solid white, subtle border, crisp shadow
        "bg-white border border-zinc-200 shadow-[0_2px_8px_rgba(0,0,0,0.04)]",
        "data-[state=active]:border-primary/20",

        // Dark Mode: Digital Glass
        // Translucent, blur, glowing border
        "dark:bg-white/5 dark:backdrop-blur-md dark:border-white/10",
        "dark:shadow-none", // Glass relies on depth, not shadow
        
        // Hover State (Interactive feel) - Only if NOT static
        variant !== "static" && "hover:shadow-md dark:hover:bg-white/10 dark:hover:border-white/20",
        
         // Variant: Active (Selected state)
         variant === "active" && "border-primary/50 bg-primary/5 dark:bg-primary/20 dark:border-primary/50",
         
        className
      )}
      {...props}
    />
  )
}
