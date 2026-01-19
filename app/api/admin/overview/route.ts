import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// System-wide overview stats with AI metrics and funnels
export async function GET(request: NextRequest) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

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
      apiUsageByTypeResult,
      conversationsWithOrdersResult,
      workspacesWithProductsResult,
      workspacesWithPagesResult,
    ] = await Promise.all([
      // Workspaces with subscription status
      supabase.from('workspaces').select('id, subscription_status, admin_paused'),
      
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
      
      // API usage by type (for AI metrics)
      supabase
        .from('api_usage')
        .select('api_type, cost')
        .gte('created_at', monthStart),
      
      // Conversations that result in orders (for funnel)
      supabase
        .from('orders')
        .select('conversation_id')
        .gte('created_at', monthStart),
      
      // Workspaces with products (for onboarding check)
      supabase
        .from('products')
        .select('workspace_id'),
      
      // Workspaces with connected pages
      supabase
        .from('facebook_pages')
        .select('workspace_id'),
    ]);

    const USD_TO_BDT = 120;
    const sumCost = (data: any[]) => 
      (data || []).reduce((sum, row) => sum + (Number(row.cost) || 0), 0) * USD_TO_BDT;

    const todayCost = sumCost(todayCostResult.data || []);
    const weekCost = sumCost(weekCostResult.data || []);
    const monthCost = sumCost(monthCostResult.data || []);

    const workspaces = workspacesResult.data || [];
    const totalWorkspaces = workspaces.length;
    const totalConversations = conversationsResult.count || 0;
    const totalOrders = ordersResult.count || 0;
    const successRate = totalConversations > 0 
      ? ((totalOrders / totalConversations) * 100).toFixed(1)
      : '0.0';

    // Subscription counts
    const subscriptionCounts = {
      trial: workspaces.filter(w => w.subscription_status === 'trial').length,
      active: workspaces.filter(w => w.subscription_status === 'active' && !w.admin_paused).length,
      expired: workspaces.filter(w => w.subscription_status === 'expired').length,
      paused: workspaces.filter(w => w.admin_paused).length,
    };

    // AI Performance metrics
    const apiUsageData = apiUsageByTypeResult.data || [];
    const cacheHits = apiUsageData.filter(u => 
      u.api_type === 'TIER1_HASH_MATCH' || u.api_type === 'CACHE_HIT'
    ).length;
    const totalApiCalls = apiUsageData.length;
    const cacheHitRate = totalApiCalls > 0 
      ? ((cacheHits / totalApiCalls) * 100).toFixed(1)
      : '0.0';

    // AI cost breakdown
    const aiCostBreakdown = apiUsageData.reduce((acc, u) => {
      const type = u.api_type || 'unknown';
      if (!acc[type]) acc[type] = { count: 0, cost: 0 };
      acc[type].count += 1;
      acc[type].cost += (Number(u.cost) || 0) * USD_TO_BDT;
      return acc;
    }, {} as Record<string, { count: number; cost: number }>);

    // Conversation funnel (this month)
    const conversationsThisMonth = await supabase
      .from('conversations')
      .select('id', { count: 'exact', head: true })
      .gte('created_at', monthStart);
    
    const startedConversations = conversationsThisMonth.count || 0;
    const ordersThisMonth = (conversationsWithOrdersResult.data || []).length;
    
    // Calculate funnel rates
    const orderConversionRate = startedConversations > 0
      ? ((ordersThisMonth / startedConversations) * 100).toFixed(1)
      : '0.0';

    // Action items (smart insights)
    const workspacesWithProducts = new Set((workspacesWithProductsResult.data || []).map(p => p.workspace_id));
    const workspacesWithPages = new Set((workspacesWithPagesResult.data || []).map(p => p.workspace_id));
    
    const incompleteOnboarding = workspaces.filter(w => 
      !workspacesWithProducts.has(w.id) || !workspacesWithPages.has(w.id)
    ).length;

    // High cost users (>৳10/day average this month)
    const costByWorkspace = await supabase
      .from('api_usage')
      .select('workspace_id, cost')
      .gte('created_at', monthStart);
    
    const workspaceCosts = (costByWorkspace.data || []).reduce((acc, u) => {
      if (!acc[u.workspace_id]) acc[u.workspace_id] = 0;
      acc[u.workspace_id] += (Number(u.cost) || 0) * USD_TO_BDT;
      return acc;
    }, {} as Record<string, number>);
    
    const daysInMonth = Math.max(1, now.getDate());
    const highCostUsers = Object.entries(workspaceCosts).filter(
      ([, cost]) => (cost / daysInMonth) > 10
    ).length;

    const actionItems = [];
    if (incompleteOnboarding > 0) {
      actionItems.push({
        type: 'onboarding',
        message: `${incompleteOnboarding} workspace${incompleteOnboarding > 1 ? 's' : ''} with incomplete setup`,
        severity: 'warning',
      });
    }
    if (highCostUsers > 0) {
      actionItems.push({
        type: 'cost',
        message: `${highCostUsers} high API cost user${highCostUsers > 1 ? 's' : ''} (>৳10/day)`,
        severity: 'info',
      });
    }

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
        totalWorkspaces,
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
      subscriptionCounts,
      aiMetrics: {
        cacheHitRate: parseFloat(cacheHitRate),
        totalApiCalls,
        cacheHits,
        costBreakdown: aiCostBreakdown,
      },
      conversationFunnel: {
        started: startedConversations,
        ordered: ordersThisMonth,
        conversionRate: parseFloat(orderConversionRate),
      },
      actionItems,
      recentConversations,
    });
  } catch (error) {
    console.error('Admin overview error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
