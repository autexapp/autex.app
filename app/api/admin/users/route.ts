import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createClient as createAdminClient } from '@supabase/supabase-js';
import type { Database } from '@/types/supabase';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use admin client to access auth.users
    const supabaseAdmin = createAdminClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch all users from auth.users
    const { data: authUsers, error: usersError } = await supabaseAdmin.auth.admin.listUsers();

    if (usersError) {
      console.error('Error fetching users:', usersError);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }

    // Fetch profiles for additional info
    const { data: profiles } = await supabaseAdmin
      .from('profiles')
      .select('id, business_name, phone');

    // Fetch workspaces for workspace names
    const { data: workspaces } = await supabaseAdmin
      .from('workspaces')
      .select('id, name, owner_id');

    // Create lookup maps
    const profilesMap = new Map(profiles?.map(p => [p.id, p]) || []);
    const workspacesMap = new Map(workspaces?.map(w => [w.owner_id, w]) || []);

    // Combine data
    const users = authUsers.users.map(authUser => {
      const profile = profilesMap.get(authUser.id);
      const workspace = workspacesMap.get(authUser.id);
      
      return {
        id: authUser.id,
        email: authUser.email || '',
        business_name: profile?.business_name || authUser.user_metadata?.business_name || '-',
        phone: profile?.phone || authUser.user_metadata?.phone || '-',
        workspace_name: workspace?.name || '-',
        created_at: authUser.created_at,
        last_sign_in: authUser.last_sign_in_at,
      };
    });

    // Sort by created_at descending (newest first)
    users.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());

    return NextResponse.json({
      users,
      total: users.length
    });

  } catch (error) {
    console.error('Error in admin users API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
