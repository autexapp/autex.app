-- Add out_of_stock_message column to workspace_settings table
-- This allows business owners to customize the message shown when a product is out of stock

ALTER TABLE workspace_settings
ADD COLUMN IF NOT EXISTS out_of_stock_message TEXT DEFAULT 'দুঃখিত! 😔 "{productName}" এখন স্টকে নেই।

আপনি চাইলে অন্য পণ্যের নাম লিখুন বা স্ক্রিনশট পাঠান। আমরা সাহায্য করতে পারবো! 🛍️';

-- Add comment for documentation
COMMENT ON COLUMN workspace_settings.out_of_stock_message IS 'Customizable message shown when customer tries to order an out-of-stock product. Use {productName} as placeholder.';
