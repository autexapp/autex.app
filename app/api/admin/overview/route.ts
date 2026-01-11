import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// System-wide overview stats
export async function GET(request: NextRequest) {
  try {
    // Use admin client for cross-workspace queries
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Get date ranges
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
    const weekStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).toISOString();

    // Parallel queries for efficiency
    const [
      workspacesResult,
      conversationsResult,
      ordersResult,
      todayCostResult,
      weekCostResult,
      monthCostResult,
      recentConversationsResult,
    ] = await Promise.all([
      // Total workspaces
      supabase.from('workspaces').select('id', { count: 'exact', head: true }),
      
      // Total conversations
      supabase.from('conversations').select('id', { count: 'exact', head: true }),
      
      // Total orders
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      
      // Today's cost
      supabase
        .from('api_usage')
        .select('cost')
        .gte('created_at', todayStart),
      
      // This week's cost
      supabase
        .from('api_usage')
        .select('cost')
        .gte('created_at', weekStart),
      
      // This month's cost
      supabase
        .from('api_usage')
        .select('cost')
        .gte('created_at', monthStart),
      
      // Recent conversations (last 10)
      supabase
        .from('conversations')
        .select(`
          id,
          customer_name,
          current_state,
          last_message_at,
          workspace_id,
          workspaces!inner(name)
        `)
        .order('last_message_at', { ascending: false })
        .limit(10),
    ]);

    // Calculate costs (sum)
    const USD_TO_BDT = 120;
    const sumCost = (data: any[]) => 
      (data || []).reduce((sum, row) => sum + (Number(row.cost) || 0), 0) * USD_TO_BDT;

    const todayCost = sumCost(todayCostResult.data || []);
    const weekCost = sumCost(weekCostResult.data || []);
    const monthCost = sumCost(monthCostResult.data || []);

    // Get conversation count for success rate
    const totalConversations = conversationsResult.count || 0;
    const totalOrders = ordersResult.count || 0;
    const successRate = totalConversations > 0 
      ? ((totalOrders / totalConversations) * 100).toFixed(1)
      : '0.0';

    // Format recent conversations
    const recentConversations = (recentConversationsResult.data || []).map((conv: any) => ({
      id: conv.id,
      customerName: conv.customer_name || 'Unknown',
      workspaceName: conv.workspaces?.name || 'Unknown',
      state: conv.current_state,
      lastMessageAt: conv.last_message_at,
    }));

    return NextResponse.json({
      stats: {
        totalWorkspaces: workspacesResult.count || 0,
        totalConversations,
        totalOrders,
        successRate: parseFloat(successRate),
        todayCost,
        weekCost,
        monthCost,
        avgCostPerConversation: totalConversations > 0 
          ? (monthCost / totalConversations).toFixed(2)
          : '0.00',
      },
      recentConversations,
    });
  } catch (error) {
    console.error('Admin overview error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
