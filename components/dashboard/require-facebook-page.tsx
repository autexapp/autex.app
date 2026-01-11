"use client"

import { useEffect, useState } from "react"
import { Facebook, ArrowRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { AuthLayout } from "@/components/ui/premium/auth-layout"
import { GlassCard } from "@/components/ui/premium/glass-card"
import { PremiumButton } from "@/components/ui/premium/premium-button"
import { PremiumLoader } from "@/components/ui/premium/premium-loader"
import { useWorkspace } from "@/lib/workspace-provider"

export function RequireFacebookPage({ children }: { children: React.ReactNode }) {
  const { hasFacebookPage, loading: workspaceLoading } = useWorkspace()
  const [connecting, setConnecting] = useState(false)

  if (workspaceLoading) {
    return (
      <div className="relative min-h-[400px] w-full flex-1">
        <PremiumLoader />
      </div>
    )
  }

  if (hasFacebookPage) {
    return <>{children}</>
  }

  return (
    <AuthLayout className="h-[calc(100vh-4rem)]">
      <div className="w-full max-w-md">
        <GlassCard>
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Icon */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-xl animate-pulse" />
              <div className="relative h-16 w-16 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg border border-white/10">
                <Facebook className="h-8 w-8 text-white" />
              </div>
            </div>

            {/* Typography */}
            <div className="space-y-2">
              <h1 className="font-serif text-3xl font-medium tracking-tight text-white/90">
                Connect Your Facebook Page
              </h1>
              <p className="text-sm text-white/50 leading-relaxed max-w-[300px] mx-auto">
                Connect your business page to unlock powerful AI automation, order management, and analytics.
              </p>
            </div>

            {/* Action Button */}
            <PremiumButton
              loading={connecting}
              onClick={() => {
                setConnecting(true)
                window.location.href = '/auth/facebook/connect'
              }}
              className="w-full bg-white hover:bg-white/90 text-zinc-950 border-none shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
            >
              <Facebook className="h-4 w-4 text-[#1877F2] transition-transform duration-300 group-hover/btn:scale-110" />
              <span className="font-semibold tracking-wide">Connect Page</span>
              <ArrowRight className="h-4 w-4 text-zinc-400 transition-transform duration-300 group-hover/btn:translate-x-1" />
            </PremiumButton>
          </div>
        </GlassCard>
      </div>
    </AuthLayout>
  )
}
