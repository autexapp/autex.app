-- Migration: Create Payment History Table
-- Purpose: Track all subscription payments for admin verification

-- ========================================
-- Create Payment History Table
-- ========================================

CREATE TABLE IF NOT EXISTS payment_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Reference to workspace
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  
  -- Payment details
  amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL DEFAULT 'bkash',
  transaction_id TEXT,
  payment_proof_url TEXT,
  
  -- What was activated
  plan_activated TEXT NOT NULL,
  duration_days INTEGER NOT NULL DEFAULT 30,
  
  -- Admin notes and tracking
  notes TEXT,
  activated_by TEXT, -- Admin user email who verified the payment
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ========================================
-- Add Comments for Documentation
-- ========================================

COMMENT ON TABLE payment_history IS 'Tracks all subscription payments for manual verification workflow';
COMMENT ON COLUMN payment_history.payment_method IS 'bkash, nagad, rocket, or other payment method';
COMMENT ON COLUMN payment_history.transaction_id IS 'bKash TrxID or other reference number';
COMMENT ON COLUMN payment_history.payment_proof_url IS 'URL to payment screenshot if uploaded';
COMMENT ON COLUMN payment_history.plan_activated IS 'starter, pro, business, or enterprise';
COMMENT ON COLUMN payment_history.activated_by IS 'Email of admin who verified and activated';

-- ========================================
-- Performance Indexes
-- ========================================

-- Index for finding payments by workspace
CREATE INDEX IF NOT EXISTS idx_payment_history_workspace ON payment_history(workspace_id);

-- Index for sorting by date (most recent first)
CREATE INDEX IF NOT EXISTS idx_payment_history_created ON payment_history(created_at DESC);

-- Composite index for admin dashboard queries
CREATE INDEX IF NOT EXISTS idx_payment_history_workspace_date ON payment_history(workspace_id, created_at DESC);

-- ========================================
-- RLS Policies (if RLS is enabled)
-- ========================================

-- Enable RLS
ALTER TABLE payment_history ENABLE ROW LEVEL SECURITY;

-- Admin can see all payments (using service role, no policy needed)

-- Users can see their own payment history
CREATE POLICY "Users can view own payment history" ON payment_history
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM workspaces 
      WHERE workspaces.id = payment_history.workspace_id 
        AND workspaces.owner_id = auth.uid()
    )
  );

-- Only admin (service role) can insert/update/delete payments
-- No additional policies needed as service role bypasses RLS

-- ========================================
-- Done! Summary:
-- ========================================
-- Created payment_history table with:
--   - workspace_id (FK to workspaces)
--   - amount, payment_method, transaction_id
--   - plan_activated, duration_days
--   - notes, activated_by
--   - created_at
-- 
-- Added indexes for performance
-- Added RLS policy for user read access
