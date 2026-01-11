import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Single workspace detail with full metrics
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

    const USD_TO_BDT = 120;

    // Get workspace (simplified query without FK join)
    const { data: workspace, error: wsError } = await supabase
      .from('workspaces')
      .select('id, name, created_at, owner_id')
      .eq('id', id)
      .single();

    if (wsError) {
      console.error('Workspace query error:', wsError);
      return NextResponse.json({ error: 'Workspace not found', details: wsError.message }, { status: 404 });
    }
    
    if (!workspace) {
      return NextResponse.json({ error: 'Workspace not found' }, { status: 404 });
    }

    // Get profile separately
    let businessName = workspace.name;
    let phone = '-';
    if (workspace.owner_id) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('business_name, phone')
        .eq('id', workspace.owner_id)
        .single();
      if (profile) {
        businessName = profile.business_name || workspace.name;
        phone = profile.phone || '-';
      }
    }

    // Get date ranges
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    // Parallel queries
    const [
      convResult,
      orderResult,
      revenueResult,
      todayCostResult,
      monthCostResult,
      costBreakdownResult,
      recentConversationsResult,
    ] = await Promise.all([
      // Conversations
      supabase
        .from('conversations')
        .select('id', { count: 'exact', head: true })
        .eq('workspace_id', id),
      
      // Orders
      supabase
        .from('orders')
        .select('id', { count: 'exact', head: true })
        .eq('workspace_id', id),
      
      // Total revenue
      supabase
        .from('orders')
        .select('total_amount')
        .eq('workspace_id', id),
      
      // Today's cost
      supabase
        .from('api_usage')
        .select('cost')
        .eq('workspace_id', id)
        .gte('created_at', todayStart),
      
      // Month cost
      supabase
        .from('api_usage')
        .select('cost')
        .eq('workspace_id', id)
        .gte('created_at', monthStart),
      
      // Cost breakdown by type
      supabase
        .from('api_usage')
        .select('api_type, cost')
        .eq('workspace_id', id),
      
      // Recent conversations
      supabase
        .from('conversations')
        .select(`
          id,
          customer_name,
          current_state,
          last_message_at,
          created_at
        `)
        .eq('workspace_id', id)
        .order('last_message_at', { ascending: false })
        .limit(10),
    ]);

    // Calculate metrics
    const totalConversations = convResult.count || 0;
    const totalOrders = orderResult.count || 0;
    const totalRevenue = (revenueResult.data || []).reduce(
      (sum, row) => sum + (Number(row.total_amount) || 0), 0
    );
    const todayCost = (todayCostResult.data || []).reduce(
      (sum, row) => sum + (Number(row.cost) || 0) * USD_TO_BDT, 0
    );
    const monthCost = (monthCostResult.data || []).reduce(
      (sum, row) => sum + (Number(row.cost) || 0) * USD_TO_BDT, 0
    );
    const successRate = totalConversations > 0
      ? ((totalOrders / totalConversations) * 100).toFixed(1)
      : '0.0';

    // Cost breakdown
    const breakdown: Record<string, { cost: number; count: number }> = {};
    (costBreakdownResult.data || []).forEach((row: any) => {
      const type = row.api_type || 'unknown';
      if (!breakdown[type]) breakdown[type] = { cost: 0, count: 0 };
      breakdown[type].cost += (Number(row.cost) || 0) * USD_TO_BDT;
      breakdown[type].count += 1;
    });

    const costBreakdown = Object.entries(breakdown)
      .map(([type, stats]) => ({
        type: formatApiType(type),
        rawType: type,
        cost: stats.cost,
        count: stats.count,
      }))
      .sort((a, b) => b.cost - a.cost);

    // Format conversations
    const conversations = (recentConversationsResult.data || []).map((conv: any) => ({
      id: conv.id,
      customerName: conv.customer_name || 'Unknown',
      state: conv.current_state,
      lastMessageAt: conv.last_message_at,
      createdAt: conv.created_at,
    }));

    return NextResponse.json({
      workspace: {
        id: workspace.id,
        name: workspace.name,
        businessName,
        phone,
        createdAt: workspace.created_at,
      },
      stats: {
        totalConversations,
        totalOrders,
        successRate: parseFloat(successRate),
        totalRevenue,
        todayCost,
        monthCost,
        costPerConversation: totalConversations > 0 ? (monthCost / totalConversations).toFixed(2) : '0.00',
        profit: totalRevenue - monthCost,
      },
      costBreakdown,
      conversations,
    });
  } catch (error) {
    console.error('Workspace detail error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

function formatApiType(type: string): string {
  switch (type) {
    case 'openai_vision': return 'Vision API (Tier 3)';
    case 'auto_tagging': return 'Product Tagging';
    case 'gpt-4-turbo': case 'gpt-4': return 'AI Director (GPT-4)';
    case 'gpt-3.5-turbo': return 'AI Director (GPT-3.5)';
    case 'hash_match': return 'Cache Hit';
    default: return type.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }
}
