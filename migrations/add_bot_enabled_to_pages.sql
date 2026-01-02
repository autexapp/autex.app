-- Migration: Add bot_enabled column to facebook_pages table
-- Purpose: Global master switch to enable/disable bot for entire page
-- Date: 2025-12-10

-- Add bot_enabled column with default true
-- NOT NULL ensures existing pages have bot enabled by default
ALTER TABLE public.facebook_pages 
ADD COLUMN bot_enabled BOOLEAN NOT NULL DEFAULT true;

-- Add comment for documentation
COMMENT ON COLUMN public.facebook_pages.bot_enabled IS 'Master switch to enable/disable bot for this Facebook page. When false, bot will not process any messages for this page.';
