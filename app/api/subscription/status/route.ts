/**
 * GET /api/subscription/status
 * 
 * Returns the current subscription status for the authenticated user's workspace.
 * Used by the subscription card in the sidebar and various UI components.
 */

import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { 
  getSubscriptionStatus, 
  formatSubscriptionStatus,
  formatExpiryDate,
  getWhatsAppLink,
  SUBSCRIPTION_PLANS,
  CONTACT_NUMBERS,
} from '@/lib/subscription/utils'

export async function GET() {
  try {
    const supabase = await createClient()
    
    // Get authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user's workspace
    const { data: workspace, error: workspaceError } = await supabase
      .from('workspaces')
      .select('id, name')
      .eq('owner_id', user.id)
      .single()

    if (workspaceError || !workspace) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      )
    }

    // Get subscription status
    const status = await getSubscriptionStatus(workspace.id)

    return NextResponse.json({
      success: true,
      subscription: {
        status: status.status,
        plan: status.plan,
        planName: status.plan ? SUBSCRIPTION_PLANS[status.plan].name : null,
        planPrice: status.plan ? SUBSCRIPTION_PLANS[status.plan].price : null,
        daysRemaining: status.daysRemaining,
        expiresAt: status.expiresAt?.toISOString() || null,
        expiresAtFormatted: formatExpiryDate(status.expiresAt),
        trialEndsAt: status.trialEndsAt?.toISOString() || null,
        canUseBot: status.canUseBot,
        isPaused: status.isPaused,
        pausedReason: status.pausedReason,
        statusText: formatSubscriptionStatus(status),
        lastPaymentDate: status.lastPaymentDate?.toISOString() || null,
        totalPaid: status.totalPaid,
      },
      contact: {
        whatsapp: CONTACT_NUMBERS.whatsapp,
        bkash: CONTACT_NUMBERS.bkash,
        whatsappLink: getWhatsAppLink(workspace.name),
      },
      plans: SUBSCRIPTION_PLANS,
      workspaceName: workspace.name,
    })
  } catch (error) {
    console.error('Error fetching subscription status:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
