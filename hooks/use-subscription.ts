/**
 * useSubscription Hook
 * 
 * React hook for fetching and managing subscription state.
 * Used by subscription card, banner, and other UI components.
 * 
 * Features:
 * - Fetches subscription status on mount
 * - Polls every 60 seconds for updates
 * - Listens for realtime workspace changes
 * - Provides refetch function for manual refresh
 */

'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { SUBSCRIPTION_PLANS, CONTACT_NUMBERS, type SubscriptionPlan } from '@/lib/subscription/utils'
import { createClient } from '@/lib/supabase/client'
import { useWorkspace } from '@/lib/workspace-provider'

export interface SubscriptionState {
  status: 'trial' | 'active' | 'expired'
  plan: SubscriptionPlan | null
  planName: string | null
  planPrice: number | null
  daysRemaining: number
  expiresAt: string | null
  expiresAtFormatted: string | null
  trialEndsAt: string | null
  canUseBot: boolean
  isPaused: boolean
  pausedReason: string | null
  statusText: string
  lastPaymentDate: string | null
  totalPaid: number
}

export interface ContactInfo {
  whatsapp: string
  bkash: string
  whatsappLink: string
}

export interface UseSubscriptionReturn {
  subscription: SubscriptionState | null
  contact: ContactInfo | null
  plans: typeof SUBSCRIPTION_PLANS
  workspaceName: string | null
  isLoading: boolean
  error: string | null
  refetch: () => Promise<void>
}

// Polling interval in milliseconds (60 seconds)
const POLLING_INTERVAL = 60 * 1000

export function useSubscription(): UseSubscriptionReturn {
  const { workspaceId } = useWorkspace()
  const [subscription, setSubscription] = useState<SubscriptionState | null>(null)
  const [contact, setContact] = useState<ContactInfo | null>(null)
  const [workspaceName, setWorkspaceName] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const pollingRef = useRef<NodeJS.Timeout | null>(null)

  const fetchSubscription = useCallback(async () => {
    try {
      // Don't set loading on refetch to avoid flickering
      if (!subscription) {
        setIsLoading(true)
      }
      setError(null)

      const response = await fetch('/api/subscription/status', {
        // Prevent caching to always get fresh data
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      
      if (!response.ok) {
        if (response.status === 401) {
          setError('Not authenticated')
          return
        }
        throw new Error('Failed to fetch subscription status')
      }

      const data = await response.json()

      if (data.success) {
        setSubscription(data.subscription)
        setContact(data.contact)
        setWorkspaceName(data.workspaceName)
      } else {
        setError(data.error || 'Unknown error')
      }
    } catch (err) {
      console.error('Error fetching subscription:', err)
      setError(err instanceof Error ? err.message : 'Unknown error')
    } finally {
      setIsLoading(false)
    }
  }, [subscription])

  // Initial fetch and polling
  useEffect(() => {
    fetchSubscription()

    // Set up polling interval
    pollingRef.current = setInterval(() => {
      fetchSubscription()
    }, POLLING_INTERVAL)

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current)
      }
    }
  }, []) // Only run on mount

  // Realtime subscription to workspace changes
  useEffect(() => {
    if (!workspaceId) return

    const supabase = createClient()

    const channel = supabase
      .channel(`workspace-subscription-${workspaceId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'workspaces',
          filter: `id=eq.${workspaceId}`,
        },
        (payload) => {
          console.log('[Subscription] Workspace updated, refetching...', payload)
          fetchSubscription()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [workspaceId, fetchSubscription])

  return {
    subscription,
    contact,
    plans: SUBSCRIPTION_PLANS,
    workspaceName,
    isLoading,
    error,
    refetch: fetchSubscription,
  }
}

/**
 * Helper to check if user has active subscription
 */
export function useCanUseBot(): boolean {
  const { subscription, isLoading } = useSubscription()
  
  if (isLoading) return true // Optimistic - don't block while loading
  return subscription?.canUseBot ?? false
}

/**
 * Helper to check if subscription is in expired state
 */
export function useIsExpired(): boolean {
  const { subscription, isLoading } = useSubscription()
  
  if (isLoading) return false
  return subscription?.status === 'expired' || subscription?.canUseBot === false
}
