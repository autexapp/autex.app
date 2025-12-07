-- Migration: Add selected_size and selected_color to orders table
-- Purpose: Track which size/color the customer selected for their order
-- Date: 2025-12-06

-- ============================================
-- COLUMN ADDITIONS
-- ============================================

-- selected_size: The size the customer chose (e.g., "M", "L", "XL")
-- Nullable for backward compatibility with existing orders
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS selected_size TEXT;

-- selected_color: The color the customer chose (e.g., "Red", "Blue")
-- Nullable because not all products have color variants
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS selected_color TEXT;

-- size_stock_id: Reference for future per-size stock tracking
-- Can be used to track which specific stock unit was sold
ALTER TABLE public.orders
ADD COLUMN IF NOT EXISTS size_stock_id TEXT;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON COLUMN public.orders.selected_size IS 'Customer selected size (e.g., M, L, XL). Nullable for old orders.';
COMMENT ON COLUMN public.orders.selected_color IS 'Customer selected color (e.g., Red, Blue). Nullable for products without colors.';
COMMENT ON COLUMN public.orders.size_stock_id IS 'Reference ID for size-specific stock tracking (future use).';

-- ============================================
-- INDEX (Optional - for filtering orders by size/color)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_orders_selected_size ON public.orders(selected_size);
CREATE INDEX IF NOT EXISTS idx_orders_selected_color ON public.orders(selected_color);
