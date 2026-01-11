import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
}

export function GlassCard({ children, className, ...props }: GlassCardProps) {
  return (
    <div 
      className={cn(
        "group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-2xl shadow-2xl transition-all duration-500 hover:bg-white/[0.07]",
        className
      )}
      {...props}
    >
      {children}
      {/* Decorative bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}
