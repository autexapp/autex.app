/**
 * Email API Route - Send Subscription Activated Email
 * 
 * Called by admin when activating a user's subscription.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendSubscriptionActivatedEmail } from '@/lib/email/send';
import { SUBSCRIPTION_PLANS } from '@/lib/subscription/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workspaceId, plan, expiryDate, durationDays } = body;

    if (!workspaceId || !plan || !expiryDate) {
      return NextResponse.json(
        { error: 'Missing required fields: workspaceId, plan, expiryDate' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get workspace and owner details
    const { data: workspace, error: wsError } = await supabase
      .from('workspaces')
      .select('name, owner_id')
      .eq('id', workspaceId)
      .single();

    if (wsError || !workspace) {
      return NextResponse.json(
        { error: 'Workspace not found' },
        { status: 404 }
      );
    }

    // Get owner email
    const { data: { user }, error: userError } = await supabase.auth.admin.getUserById(
      workspace.owner_id
    );

    if (userError || !user?.email) {
      return NextResponse.json(
        { error: 'Could not find user email' },
        { status: 404 }
      );
    }

    // Get plan name
    const planInfo = SUBSCRIPTION_PLANS[plan as keyof typeof SUBSCRIPTION_PLANS];
    const planName = planInfo?.name || plan;

    // Send email
    const result = await sendSubscriptionActivatedEmail(
      user.email,
      workspace.name,
      planName,
      new Date(expiryDate),
      durationDays || 30
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to send email' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      emailId: result.id,
      sentTo: user.email,
    });
  } catch (error) {
    console.error('[Email API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
