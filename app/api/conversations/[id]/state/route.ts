import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { 
  ConversationState, 
  CONVERSATION_STATES, 
  getContextForStateChange 
} from '@/lib/conversation/state-machine';

/**
 * PATCH /api/conversations/[id]/state
 * Manually override conversation state
 * 
 * Used by shop owners to recover from stuck/confused bot states
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { newState } = body;

    // Validate newState
    const validStates = CONVERSATION_STATES.map(s => s.value);
    if (!validStates.includes(newState)) {
      return NextResponse.json(
        { error: `Invalid state: ${newState}. Valid states: ${validStates.join(', ')}` },
        { status: 400 }
      );
    }

    // Create Supabase admin client
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Fetch current conversation
    const { data: conversation, error: fetchError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', id)
      .single();

    if (fetchError || !conversation) {
      console.error('Conversation not found:', fetchError);
      return NextResponse.json(
        { error: 'Conversation not found' },
        { status: 404 }
      );
    }

    // Get current context
    const currentContext = conversation.context || { state: conversation.current_state };

    // Calculate new context based on state transition
    const { context: newContext, cleared } = getContextForStateChange(
      currentContext,
      newState as ConversationState
    );

    console.log(`🔧 [MANUAL STATE CHANGE] ${conversation.current_state} → ${newState}`);
    console.log(`   Cleared fields: ${cleared.length > 0 ? cleared.join(', ') : 'none'}`);

    // Update conversation in database
    const { data: updated, error: updateError } = await supabase
      .from('conversations')
      .update({
        current_state: newState,
        context: newContext,
        // Clear manual flag since owner is taking action
        needs_manual_response: false,
        manual_flag_reason: null,
        manual_flagged_at: null,
      })
      .eq('id', id)
      .select()
      .single();

    if (updateError) {
      console.error('Failed to update conversation:', updateError);
      return NextResponse.json(
        { error: 'Failed to update conversation state' },
        { status: 500 }
      );
    }

    console.log(`✅ [MANUAL STATE CHANGE] Success - ${id}`);

    return NextResponse.json({
      success: true,
      state: newState,
      cleared,
      conversation: {
        id: updated.id,
        current_state: updated.current_state,
        context: updated.context,
      }
    });

  } catch (error: any) {
    console.error('Error in PATCH /api/conversations/[id]/state:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
