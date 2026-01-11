-- Migration: Add Manual Flag System to Conversations
-- Purpose: Track conversations that need manual owner response
-- Date: 2026-01-10

-- Add manual response tracking columns
ALTER TABLE conversations 
ADD COLUMN IF NOT EXISTS needs_manual_response BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS manual_flag_reason TEXT,
ADD COLUMN IF NOT EXISTS manual_flagged_at TIMESTAMPTZ;

-- Create partial index for quick filtering of flagged conversations only
-- This is more efficient than a full index since most conversations won't be flagged
CREATE INDEX IF NOT EXISTS idx_conversations_manual_flag 
ON conversations(workspace_id, needs_manual_response, manual_flagged_at DESC)
WHERE needs_manual_response = true;

-- Add comments for documentation
COMMENT ON COLUMN conversations.needs_manual_response IS 'True when AI flagged this conversation for owner attention because it lacks knowledge to answer';
COMMENT ON COLUMN conversations.manual_flag_reason IS 'Reason why AI flagged this conversation (e.g., "Warranty question - not configured in AI Setup")';
COMMENT ON COLUMN conversations.manual_flagged_at IS 'Timestamp when conversation was flagged, used for sorting oldest-first in dashboard';
