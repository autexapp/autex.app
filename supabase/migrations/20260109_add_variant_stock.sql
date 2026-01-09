-- Migration: Add variant_stock column to products table
-- Purpose: Track stock by Size × Color combination
-- Date: 2026-01-09

-- Add variant_stock JSONB column
-- Format: [{ size: "S", color: "Red", quantity: 10, sku?: "PROD-S-RED" }]
ALTER TABLE public.products 
ADD COLUMN IF NOT EXISTS variant_stock jsonb DEFAULT '[]'::jsonb;

-- Create index for faster variant lookups
CREATE INDEX IF NOT EXISTS idx_products_variant_stock 
ON public.products USING gin (variant_stock);

-- Comment for documentation
COMMENT ON COLUMN public.products.variant_stock IS 
'Stock tracking by Size × Color combination. Format: [{size, color, quantity, sku?}]';

