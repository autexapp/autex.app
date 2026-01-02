-- Migration: Add hybrid control mode fields to conversations and messages tables
-- Purpose: Enable manual control capability so owners can reply and pause bot
-- Date: 2025-12-09

-- ============================================
-- CONVERSATIONS TABLE - Control Mode Fields
-- ============================================

-- control_mode: Determines who is controlling the conversation
-- - 'bot': AI handles all responses (default)
-- - 'manual': Owner is handling this conversation manually
-- - 'hybrid': AI and owner can both respond
ALTER TABLE public.conversations
ADD COLUMN IF NOT EXISTS control_mode TEXT DEFAULT 'bot'
  CHECK (control_mode IN ('bot', 'manual', 'hybrid'));

-- last_manual_reply_at: Timestamp of the last manual reply by owner
-- Used to track when owner last intervened
ALTER TABLE public.conversations
ADD COLUMN IF NOT EXISTS last_manual_reply_at TIMESTAMPTZ;

-- last_manual_reply_by: User ID of the person who last replied manually
-- Can be owner or workspace member
ALTER TABLE public.conversations
ADD COLUMN IF NOT EXISTS last_manual_reply_by TEXT;

-- bot_pause_until: Temporarily pause bot responses until this time
-- Useful for giving owner time to handle conversation without bot interference
ALTER TABLE public.conversations
ADD COLUMN IF NOT EXISTS bot_pause_until TIMESTAMPTZ;

-- ============================================
-- MESSAGES TABLE - Sender Type Field
-- ============================================

-- sender_type: Distinguishes between different types of senders
-- - 'customer': Message from the customer
-- - 'bot': Automated response from AI
-- - 'owner': Manual response from business owner/staff
ALTER TABLE public.messages
ADD COLUMN IF NOT EXISTS sender_type TEXT DEFAULT 'customer'
  CHECK (sender_type IN ('customer', 'bot', 'owner'));

-- ============================================
-- COLUMN COMMENTS
-- ============================================

COMMENT ON COLUMN public.conversations.control_mode IS 'Controls who handles responses: bot (AI), manual (owner), or hybrid (both)';
COMMENT ON COLUMN public.conversations.last_manual_reply_at IS 'Timestamp of last manual reply by owner/staff';
COMMENT ON COLUMN public.conversations.last_manual_reply_by IS 'User ID of person who last replied manually';
COMMENT ON COLUMN public.conversations.bot_pause_until IS 'Bot is paused until this timestamp (nullable = not paused)';
COMMENT ON COLUMN public.messages.sender_type IS 'Type of sender: customer, bot, or owner';

-- ============================================
-- PERFORMANCE INDEXES
-- ============================================

-- Index for filtering conversations by control mode (e.g., find all manual conversations)
CREATE INDEX IF NOT EXISTS idx_conversations_control_mode 
  ON public.conversations(control_mode);

-- Composite index for finding conversations with recent manual replies
CREATE INDEX IF NOT EXISTS idx_conversations_manual_reply 
  ON public.conversations(last_manual_reply_at DESC NULLS LAST)
  WHERE last_manual_reply_at IS NOT NULL;

-- Index for filtering messages by sender type
CREATE INDEX IF NOT EXISTS idx_messages_sender_type 
  ON public.messages(sender_type);
