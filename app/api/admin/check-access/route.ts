import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Admin email check API
export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get admin emails from environment variable
    const adminEmails = process.env.ADMIN_EMAILS?.split(',').map(e => e.trim().toLowerCase()) || [];
    const userEmail = user.email?.toLowerCase() || '';

    if (!adminEmails.includes(userEmail)) {
      return NextResponse.json({ error: 'Not an admin' }, { status: 403 });
    }

    return NextResponse.json({ 
      isAdmin: true,
      email: user.email 
    });
  } catch (error) {
    console.error('Admin check error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
