import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// List conversations for a specific workspace
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get workspace name
    const { data: workspace, error: wsError } = await supabase
      .from('workspaces')
      .select('id, name')
      .eq('id', id)
      .single();

    if (wsError || !workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    // Get conversations
    const { data: conversations, error } = await supabase
      .from('conversations')
      .select('id, customer_name, current_state, last_message_at')
      .eq('workspace_id', id)
      .order('last_message_at', { ascending: false });

    if (error) {
      console.error('Conversations error:', error);
      return NextResponse.json({ error: 'Failed to fetch conversations' }, { status: 500 });
    }

    // Get message counts and order status
    const conversationsWithDetails = await Promise.all(
      (conversations || []).map(async (conv: any) => {
        const [msgResult, orderResult] = await Promise.all([
          supabase
            .from('messages')
            .select('id', { count: 'exact', head: true })
            .eq('conversation_id', conv.id),
          supabase
            .from('orders')
            .select('id')
            .eq('conversation_id', conv.id)
            .limit(1),
        ]);

        return {
          id: conv.id,
          customerName: conv.customer_name || 'Unknown',
          state: conv.current_state,
          messageCount: msgResult.count || 0,
          lastMessageAt: conv.last_message_at,
          hasOrder: (orderResult.data || []).length > 0,
        };
      })
    );

    return NextResponse.json({
      workspace: {
        id: workspace.id,
        name: workspace.name,
      },
      conversations: conversationsWithDetails,
      total: conversationsWithDetails.length,
    });
  } catch (error) {
    console.error('Workspace conversations error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
