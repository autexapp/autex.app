import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // 1. Security Check
    // Verify authentication signature from Vercel Cron or custom secret
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;
    
    // Allow if running in development or if secret matches
    const isDev = process.env.NODE_ENV === 'development';
    const isValidAuth = cronSecret && authHeader === `Bearer ${cronSecret}`;
    
    // Also allow Vercel Cron signature verification if needed, 
    // but simple secret is often enough for MVP
    if (!isDev && !isValidAuth) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const now = new Date().toISOString();

    // 2. Expire Trials
    const { data: expiredTrials, error: trialError } = await supabase
      .from('workspaces')
      .update({ subscription_status: 'expired' })
      .eq('subscription_status', 'trial')
      .lt('trial_ends_at', now)
      .select('id, name');

    if (trialError) {
      console.error('Error expiring trials:', trialError);
    }

    // 3. Expire Active Subscriptions
    const { data: expiredSubs, error: subError } = await supabase
      .from('workspaces')
      .update({ subscription_status: 'expired' })
      .eq('subscription_status', 'active')
      .lt('subscription_expires_at', now)
      .select('id, name');

    if (subError) {
      console.error('Error expiring subscriptions:', subError);
    }

    const trialCount = expiredTrials?.length || 0;
    const subCount = expiredSubs?.length || 0;

    console.log(`[Cron] Processed expiries. Trials expired: ${trialCount}, Subs expired: ${subCount}`);

    return NextResponse.json({
      success: true,
      processed: {
        expiredTrials: trialCount,
        expiredSubscriptions: subCount,
        total: trialCount + subCount
      },
      timestamp: now
    });

  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
