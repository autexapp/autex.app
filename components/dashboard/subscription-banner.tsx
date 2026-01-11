/**
 * SubscriptionBanner Component
 * 
 * Persistent banner for expired/paused subscription state.
 * Appears at top of dashboard pages, dismissible but reappears on page change.
 * Non-blocking per user preference - allows read-only dashboard access.
 */

'use client'

import { useState, useEffect } from 'react'
import { useSubscription } from '@/hooks/use-subscription'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { 
  AlertTriangle, 
  X, 
  MessageCircle,
  PauseCircle
} from 'lucide-react'
import { PaymentModal } from './payment-modal'

interface SubscriptionBannerProps {
  className?: string
}

export function SubscriptionBanner({ className }: SubscriptionBannerProps) {
  const { subscription, contact, workspaceName, isLoading } = useSubscription()
  const [dismissed, setDismissed] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Reset dismissed state when subscription status changes
  useEffect(() => {
    setDismissed(false)
  }, [subscription?.status, subscription?.isPaused])

  // Don't show if loading, or if subscription is active
  if (isLoading) return null
  if (!subscription) return null
  if (subscription.canUseBot && !subscription.isPaused) return null
  if (dismissed) return null

  const isExpired = subscription.status === 'expired' || !subscription.canUseBot
  const isPaused = subscription.isPaused

  return (
    <>
      <div 
        className={cn(
          "flex items-center justify-between gap-4 px-4 py-3 mb-4 rounded-lg border",
          isExpired && "bg-red-50 dark:bg-red-900/10 border-red-200 dark:border-red-800",
          isPaused && "bg-orange-50 dark:bg-orange-900/10 border-orange-200 dark:border-orange-800",
          className
        )}
      >
        <div className="flex items-center gap-3">
          {isExpired && !isPaused && (
            <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0" />
          )}
          {isPaused && (
            <PauseCircle className="h-5 w-5 text-orange-500 flex-shrink-0" />
          )}
          
          <div>
            <p className={cn(
              "text-sm font-medium",
              isExpired && "text-red-700 dark:text-red-300",
              isPaused && "text-orange-700 dark:text-orange-300"
            )}>
              {isPaused 
                ? 'Your subscription is paused by admin' 
                : 'Your subscription has expired'}
            </p>
            <p className={cn(
              "text-xs",
              isExpired && "text-red-600/80 dark:text-red-400/80",
              isPaused && "text-orange-600/80 dark:text-orange-400/80"
            )}>
              {isPaused 
                ? subscription.pausedReason || 'Bot is currently not responding to messages'
                : 'Bot is paused. Renew to continue automated responses.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          {!isPaused && (
            <Button
              size="sm"
              className="bg-red-600 hover:bg-red-700 text-white h-8 text-xs"
              onClick={() => setShowPaymentModal(true)}
            >
              <MessageCircle className="h-3 w-3 mr-1.5" />
              Renew Now
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            onClick={() => setDismissed(true)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <PaymentModal 
        open={showPaymentModal} 
        onOpenChange={setShowPaymentModal}
        workspaceName={workspaceName || undefined}
      />
    </>
  )
}
