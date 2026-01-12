/**
 * Test Email API Route
 * 
 * Development-only endpoint to test email templates.
 * Not available in production.
 */

import { NextRequest, NextResponse } from 'next/server';
import { 
  sendWelcomeEmail,
  sendTrialEndingEmail,
  sendTrialExpiredEmail,
  sendSubscriptionActivatedEmail,
  sendRenewalReminderEmail,
  sendSubscriptionExpiredEmail
} from '@/lib/email/send';

export async function POST(request: NextRequest) {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json(
      { error: 'Test emails are disabled in production' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { type, email } = body;

    if (!type || !email) {
      return NextResponse.json(
        { error: 'Missing required fields: type, email' },
        { status: 400 }
      );
    }

    const testBusinessName = 'Test Business';
    const testDate = new Date();
    testDate.setDate(testDate.getDate() + 3);

    let result;

    switch (type) {
      case 'welcome':
        result = await sendWelcomeEmail(email, testBusinessName, testDate);
        break;
      case 'trial_ending':
        result = await sendTrialEndingEmail(email, testBusinessName, testDate);
        break;
      case 'trial_expired':
        result = await sendTrialExpiredEmail(email, testBusinessName);
        break;
      case 'subscription_activated':
        result = await sendSubscriptionActivatedEmail(
          email, 
          testBusinessName, 
          'Pro — Founder Launch', 
          testDate, 
          30
        );
        break;
      case 'renewal_reminder':
        result = await sendRenewalReminderEmail(
          email, 
          testBusinessName, 
          'Pro — Founder Launch', 
          testDate, 
          3
        );
        break;
      case 'subscription_expired':
        result = await sendSubscriptionExpiredEmail(
          email, 
          testBusinessName, 
          'Pro — Founder Launch'
        );
        break;
      default:
        return NextResponse.json(
          { error: `Unknown email type: ${type}` },
          { status: 400 }
        );
    }

    return NextResponse.json({
      success: result.success,
      emailId: result.id,
      error: result.error,
      type,
      sentTo: email,
    });
  } catch (error) {
    console.error('[Test Email] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
