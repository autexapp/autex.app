-- Migration: Add size_stock JSONB to products table
-- Purpose: Enable per-size stock tracking for products
-- Date: 2025-12-06

-- ============================================
-- COLUMN ADDITIONS
-- ============================================

-- size_stock: JSONB array storing stock quantity per size
-- Format: [{ "size": "M", "quantity": 10 }, { "size": "L", "quantity": 15 }]
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS size_stock JSONB DEFAULT '[]'::jsonb;

-- requires_size_selection: Whether this product requires customer to select a size
-- Default TRUE - most products need size selection
ALTER TABLE public.products
ADD COLUMN IF NOT EXISTS requires_size_selection BOOLEAN DEFAULT TRUE;

-- ============================================
-- COMMENTS
-- ============================================

COMMENT ON COLUMN public.products.size_stock IS 'JSONB array of {size, quantity} objects for per-size stock tracking';
COMMENT ON COLUMN public.products.requires_size_selection IS 'Whether customer must select a size before ordering';

-- ============================================
-- INDEX (For querying products with stock)
-- ============================================

CREATE INDEX IF NOT EXISTS idx_products_size_stock ON public.products USING GIN (size_stock);
CREATE INDEX IF NOT EXISTS idx_products_requires_size ON public.products(requires_size_selection);

-- ============================================
-- MIGRATION: Convert existing sizes array to size_stock format
-- Only runs if size_stock is empty but sizes is not
-- ============================================

-- This updates existing products that have sizes but no size_stock
-- Sets default quantity of 10 for each existing size
UPDATE public.products
SET size_stock = (
  SELECT jsonb_agg(
    jsonb_build_object('size', s, 'quantity', 10)
  )
  FROM unnest(sizes) AS s
)
WHERE 
  (size_stock IS NULL OR size_stock = '[]'::jsonb)
  AND sizes IS NOT NULL 
  AND array_length(sizes, 1) > 0;
