'use client'

import { Sidebar } from "@/components/dashboard/sidebar"
import { MobileNav } from "@/components/dashboard/mobile-nav"
import { WorkspaceProvider, useWorkspace } from "@/lib/workspace-provider"
import { PremiumLoader } from "@/components/ui/premium/premium-loader"
import { useSubscription } from "@/hooks/use-subscription"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, PauseCircle, XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { PaymentModal } from "@/components/dashboard/payment-modal"

function SubscriptionBanner() {
  const { subscription, isLoading, workspaceName } = useSubscription()
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  if (isLoading || !subscription) return null

  // Show banner for paused or expired subscriptions
  if (subscription.isPaused) {
    return (
      <>
        <Alert className="border-orange-400 bg-orange-50 dark:bg-orange-950/30 rounded-none border-x-0 border-t-0">
          <PauseCircle className="h-5 w-5 text-orange-600 dark:text-orange-400" />
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ml-2">
            <div>
              <span className="font-bold text-orange-800 dark:text-orange-300">⚠️ Subscription Paused by Admin</span>
              <p className="text-sm text-orange-700 dark:text-orange-400 mt-0.5">
                Your bot is temporarily disabled. {subscription.pausedReason ? `Reason: ${subscription.pausedReason}` : 'Please contact support.'}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setShowPaymentModal(true)}
              className="border-orange-400 text-orange-700 hover:bg-orange-100 dark:border-orange-500 dark:text-orange-300 dark:hover:bg-orange-900/30 whitespace-nowrap"
            >
              Contact Support
            </Button>
          </AlertDescription>
        </Alert>
        <PaymentModal 
          open={showPaymentModal} 
          onOpenChange={setShowPaymentModal}
          workspaceName={workspaceName || undefined}
        />
      </>
    )
  }

  if (subscription.status === 'expired' || !subscription.canUseBot) {
    return (
      <>
        <Alert className="border-red-400 bg-red-50 dark:bg-red-950/30 rounded-none border-x-0 border-t-0">
          <XCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
          <AlertDescription className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ml-2">
            <div>
              <span className="font-bold text-red-800 dark:text-red-300">🚫 Subscription Expired</span>
              <p className="text-sm text-red-700 dark:text-red-400 mt-0.5">
                Your bot is no longer responding to customers. Renew now to restore service.
              </p>
            </div>
            <Button
              size="sm"
              onClick={() => setShowPaymentModal(true)}
              className="bg-red-600 hover:bg-red-700 text-white whitespace-nowrap"
            >
              Renew Now
            </Button>
          </AlertDescription>
        </Alert>
        <PaymentModal 
          open={showPaymentModal} 
          onOpenChange={setShowPaymentModal}
          workspaceName={workspaceName || undefined}
        />
      </>
    )
  }

  return null
}

function DashboardContent({ children }: { children: React.ReactNode }) {
  const { loading } = useWorkspace()

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="lg:pl-72 relative min-h-screen flex flex-col">
        {/* Subscription Warning Banner */}
        <SubscriptionBanner />
        <main className="flex-1 relative flex flex-col min-h-screen">
          {loading ? <PremiumLoader /> : children}
        </main>
      </div>
      <MobileNav />
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <WorkspaceProvider>
      <DashboardContent>{children}</DashboardContent>
    </WorkspaceProvider>
  )
}
