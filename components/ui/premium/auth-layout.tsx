import { cn } from "@/lib/utils"

interface AuthLayoutProps {
  children: React.ReactNode
  className?: string
}

export function AuthLayout({ children, className }: AuthLayoutProps) {
  return (
    <div className={cn(
      "relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black selection:bg-white/20",
      className
    )}>
      {/* Background Gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-purple-500/10 blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute top-[20%] right-[20%] w-[20%] h-[20%] rounded-full bg-indigo-500/10 blur-[100px]" />
      
      {/* Content */}
      <div className="relative z-10 w-full p-4 flex items-center justify-center">
        {children}
      </div>
    </div>
  )
}
