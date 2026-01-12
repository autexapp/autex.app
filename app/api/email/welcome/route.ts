/**
 * Email API Route - Send Welcome Email
 * 
 * Can be called manually or via Supabase webhook.
 */

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { sendWelcomeEmail } from '@/lib/email/send';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { workspaceId, userId } = body;

    if (!workspaceId && !userId) {
      return NextResponse.json(
        { error: 'Missing required field: workspaceId or userId' },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let workspace;
    let userEmail;

    if (workspaceId) {
      // Get workspace by ID
      const { data: ws, error: wsError } = await supabase
        .from('workspaces')
        .select('name, owner_id, trial_ends_at')
        .eq('id', workspaceId)
        .single();

      if (wsError || !ws) {
        return NextResponse.json(
          { error: 'Workspace not found' },
          { status: 404 }
        );
      }
      workspace = ws;

      // Get owner email
      const { data: { user } } = await supabase.auth.admin.getUserById(ws.owner_id);
      userEmail = user?.email;
    } else if (userId) {
      // Get workspace by owner ID
      const { data: ws } = await supabase
        .from('workspaces')
        .select('name, owner_id, trial_ends_at')
        .eq('owner_id', userId)
        .single();

      if (!ws) {
        return NextResponse.json(
          { error: 'No workspace found for user' },
          { status: 404 }
        );
      }
      workspace = ws;

      // Get user email
      const { data: { user } } = await supabase.auth.admin.getUserById(userId);
      userEmail = user?.email;
    }

    if (!userEmail) {
      return NextResponse.json(
        { error: 'Could not find user email' },
        { status: 404 }
      );
    }

    if (!workspace?.trial_ends_at) {
      return NextResponse.json(
        { error: 'Workspace has no trial end date' },
        { status: 400 }
      );
    }

    // Send welcome email
    const result = await sendWelcomeEmail(
      userEmail,
      workspace.name,
      new Date(workspace.trial_ends_at)
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
      sentTo: userEmail,
    });
  } catch (error) {
    console.error('[Email API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
