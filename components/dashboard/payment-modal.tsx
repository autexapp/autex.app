/**
 * PaymentModal Component
 * 
 * Modal displaying payment instructions for subscription renewal.
 * Shows bKash number, pricing plans, and WhatsApp contact button.
 */

'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useSubscription } from '@/hooks/use-subscription'
import { cn } from '@/lib/utils'
import { 
  Copy, 
  Check, 
  MessageCircle, 
  CreditCard,
  ExternalLink,
  Smartphone
} from 'lucide-react'
import { toast } from 'sonner'

interface PaymentModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  workspaceName?: string
}

export function PaymentModal({ open, onOpenChange, workspaceName }: PaymentModalProps) {
  const { plans, contact } = useSubscription()
  const [copiedBkash, setCopiedBkash] = useState(false)

  const handleCopyBkash = async () => {
    if (!contact?.bkash) return
    
    try {
      await navigator.clipboard.writeText(contact.bkash)
      setCopiedBkash(true)
      toast.success('bKash number copied!')
      setTimeout(() => setCopiedBkash(false), 2000)
    } catch {
      toast.error('Failed to copy')
    }
  }

  const handleOpenWhatsApp = () => {
    if (!contact?.whatsappLink) return
    window.open(contact.whatsappLink, '_blank')
  }

  const planEntries = [
    { key: 'starter', ...plans.starter },
    { key: 'pro', ...plans.pro },
    { key: 'business', ...plans.business },
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5 text-primary" />
            Renew Subscription
          </DialogTitle>
          <DialogDescription>
            Follow these steps to activate your Autex subscription.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Step 1: Payment */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="h-6 w-6 p-0 flex items-center justify-center rounded-full text-xs">
                1
              </Badge>
              <span className="font-medium text-sm">Send bKash Payment</span>
            </div>
            
            <div className="ml-8 space-y-2">
              <div className="flex items-center gap-2 p-3 bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 rounded-lg">
                <Smartphone className="h-5 w-5 text-pink-600 dark:text-pink-400" />
                <span className="font-mono font-semibold text-pink-700 dark:text-pink-300">
                  {contact?.bkash}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-auto h-7 px-2"
                  onClick={handleCopyBkash}
                >
                  {copiedBkash ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Personal Account</p>
            </div>
          </div>

          {/* Step 2: Choose Plan */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="h-6 w-6 p-0 flex items-center justify-center rounded-full text-xs">
                2
              </Badge>
              <span className="font-medium text-sm">Choose Your Plan</span>
            </div>
            
            <div className="ml-8 grid gap-2">
              {planEntries.map((plan) => (
                <div 
                  key={plan.key}
                  className={cn(
                    "flex items-center justify-between p-2.5 rounded-lg border transition-colors",
                    plan.key === 'pro' 
                      ? "bg-primary/5 border-primary/20" 
                      : "bg-muted/30 border-border"
                  )}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{plan.name}</span>
                    {plan.key === 'pro' && (
                      <Badge variant="secondary" className="text-[10px] h-4">Popular</Badge>
                    )}
                  </div>
                  <span className="font-mono font-semibold text-sm">
                    ৳{plan.price}<span className="text-xs text-muted-foreground">/mo</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Contact WhatsApp */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="h-6 w-6 p-0 flex items-center justify-center rounded-full text-xs">
                3
              </Badge>
              <span className="font-medium text-sm">Send Screenshot via WhatsApp</span>
            </div>
            
            <div className="ml-8 space-y-2">
              <Button 
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleOpenWhatsApp}
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                Open WhatsApp
                <ExternalLink className="h-3 w-3 ml-2" />
              </Button>
              <p className="text-xs text-muted-foreground">
                Include your workspace name: <span className="font-medium">{workspaceName || 'Your Business'}</span>
              </p>
            </div>
          </div>

          {/* Step 4: Activation */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="h-6 w-6 p-0 flex items-center justify-center rounded-full text-xs">
                4
              </Badge>
              <span className="font-medium text-sm">We'll Activate Within 30 Minutes!</span>
            </div>
            <p className="ml-8 text-xs text-muted-foreground">
              Once we verify your payment, your bot will resume working automatically.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
