/**
 * SubscriptionCard Component
 * 
 * Dynamic subscription status widget for the sidebar.
 * Shows trial countdown, active plan, or expired state with renewal CTA.
 * Uses SmartCard per GEMINI.md design system.
 */

'use client'

import { useState } from 'react'
import { SmartCard } from '@/components/ui/premium/smart-card'
import { Button } from '@/components/ui/button'
import { useSubscription } from '@/hooks/use-subscription'
import { cn } from '@/lib/utils'
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  MessageCircle,
  Sparkles,
  PauseCircle,
  ExternalLink,
  Loader2
} from 'lucide-react'
import { PaymentModal } from './payment-modal'

export function SubscriptionCard() {
  const { subscription, contact, workspaceName, isLoading, error } = useSubscription()
  const [showPaymentModal, setShowPaymentModal] = useState(false)

  // Loading state
  if (isLoading) {
    return (
      <div className="p-4 mx-4 mb-6">
        <SmartCard variant="static" className="p-5">
          <div className="flex items-center justify-center py-4">
            <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
          </div>
        </SmartCard>
      </div>
    )
  }

  // Error state
  if (error || !subscription) {
    return null // Don't show anything if error
  }

  const { status, daysRemaining, statusText, isPaused, canUseBot, planName } = subscription

  // Determine card variant and colors based on status
  const getStatusConfig = () => {
    if (isPaused) {
      return {
        icon: PauseCircle,
        iconColor: 'text-orange-500',
        bgGlow: 'bg-orange-500/10',
        label: 'Paused',
        labelColor: 'text-orange-500',
      }
    }

    switch (status) {
      case 'trial':
        return {
          icon: Sparkles,
          iconColor: 'text-purple-500',
          bgGlow: 'bg-purple-500/10',
          label: 'Trial',
          labelColor: 'text-purple-500',
        }
      case 'active':
        return {
          icon: CheckCircle,
          iconColor: 'text-green-500',
          bgGlow: 'bg-green-500/10',
          label: planName || 'Active',
          labelColor: 'text-green-500',
        }
      case 'expired':
        return {
          icon: AlertTriangle,
          iconColor: 'text-red-500',
          bgGlow: 'bg-red-500/10',
          label: 'Expired',
          labelColor: 'text-red-500',
        }
      default:
        return {
          icon: Clock,
          iconColor: 'text-gray-500',
          bgGlow: 'bg-gray-500/10',
          label: 'Unknown',
          labelColor: 'text-gray-500',
        }
    }
  }

  const config = getStatusConfig()
  const StatusIcon = config.icon

  return (
    <>
      <div className="p-4 mx-4 mb-6">
        <SmartCard variant="static" className="p-5 relative overflow-hidden">
          {/* Background glow */}
          <div className={cn(
            "absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-700",
            config.bgGlow
          )} />

          {/* Header */}
          <div className="flex items-center justify-between mb-3 relative z-10">
            <div className="flex items-center gap-2">
              <StatusIcon className={cn("h-4 w-4", config.iconColor)} />
              <span className={cn("text-[10px] font-bold uppercase tracking-widest", config.labelColor)}>
                {config.label}
              </span>
            </div>
            {canUseBot && (
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
            )}
          </div>

          {/* Content based on status */}
          <div className="relative z-10 space-y-3">
            {/* Trial or Active State */}
            {(status === 'trial' || status === 'active') && !isPaused && (
              <>
                <div>
                  <p className="text-sm font-semibold text-zinc-700 dark:text-zinc-200">
                    {daysRemaining} day{daysRemaining !== 1 ? 's' : ''} remaining
                  </p>
                  {subscription.expiresAtFormatted && (
                    <p className="text-[10px] text-zinc-400 mt-1">
                      {status === 'trial' ? 'Trial ends' : 'Renews'}: {subscription.expiresAtFormatted}
                    </p>
                  )}
                </div>

                {status === 'trial' && (
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-xs h-8"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    Upgrade Now
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </Button>
                )}

                {status === 'active' && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="w-full text-xs h-7 text-muted-foreground"
                    onClick={() => setShowPaymentModal(true)}
                  >
                    Manage Subscription
                  </Button>
                )}
              </>
            )}

            {/* Paused State */}
            {isPaused && (
              <>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  Bot is paused by admin
                </p>
                {subscription.pausedReason && (
                  <p className="text-[10px] text-zinc-400">
                    Reason: {subscription.pausedReason}
                  </p>
                )}
              </>
            )}

            {/* Expired State */}
            {status === 'expired' && !isPaused && (
              <>
                <p className="text-sm text-red-600 dark:text-red-400">
                  Renew to continue using bot
                </p>
                
                <Button 
                  size="sm" 
                  className="w-full text-xs h-9 bg-zinc-900 text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-100"
                  onClick={() => setShowPaymentModal(true)}
                >
                  <MessageCircle className="h-3 w-3 mr-1.5" />
                  Contact WhatsApp
                </Button>
                
                {contact?.whatsapp && (
                  <p className="text-[10px] text-center text-zinc-400 font-mono">
                    {contact.whatsapp}
                  </p>
                )}
              </>
            )}
          </div>
        </SmartCard>
      </div>

      {/* Payment Modal */}
      <PaymentModal 
        open={showPaymentModal} 
        onOpenChange={setShowPaymentModal}
        workspaceName={workspaceName || undefined}
      />
    </>
  )
}
