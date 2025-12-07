/**
 * Size Stock Helper Functions
 * 
 * Provides utilities for working with the size_stock JSONB column in products table.
 * Format: [{ size: "M", quantity: 10 }, { size: "L", quantity: 15 }]
 */

export interface SizeStockItem {
  size: string;
  quantity: number;
}

export type SizeStock = SizeStockItem[];

/**
 * Extract sizes array from size_stock JSONB
 * @param sizeStock - The size_stock JSONB array from products table
 * @returns Array of size names (e.g., ["M", "L", "XL"])
 */
export function getSizesFromStock(sizeStock: unknown): string[] {
  if (!sizeStock || !Array.isArray(sizeStock)) {
    return [];
  }
  
  return sizeStock
    .filter((item): item is SizeStockItem => 
      item !== null && 
      typeof item === 'object' && 
      'size' in item && 
      typeof item.size === 'string'
    )
    .map(item => item.size);
}

/**
 * Get stock quantity for a specific size
 * @param sizeStock - The size_stock JSONB array from products table
 * @param size - The size to look up (e.g., "M")
 * @returns Stock quantity for that size, or 0 if not found
 */
export function getStockForSize(sizeStock: unknown, size: string): number {
  if (!sizeStock || !Array.isArray(sizeStock)) {
    return 0;
  }
  
  const normalized = size.trim().toUpperCase();
  
  const item = sizeStock.find(
    (item): item is SizeStockItem => 
      item !== null && 
      typeof item === 'object' && 
      'size' in item && 
      typeof item.size === 'string' &&
      item.size.trim().toUpperCase() === normalized
  );
  
  return item?.quantity ?? 0;
}

/**
 * Check if a specific size is available (stock > 0)
 * @param sizeStock - The size_stock JSONB array from products table
 * @param size - The size to check
 * @returns True if size exists and has stock > 0
 */
export function isSizeAvailable(sizeStock: unknown, size: string): boolean {
  return getStockForSize(sizeStock, size) > 0;
}

/**
 * Get total stock across all sizes
 * @param sizeStock - The size_stock JSONB array from products table
 * @returns Total quantity across all sizes
 */
export function getTotalStock(sizeStock: unknown): number {
  if (!sizeStock || !Array.isArray(sizeStock)) {
    return 0;
  }
  
  return sizeStock.reduce((total, item) => {
    if (item && typeof item === 'object' && 'quantity' in item && typeof item.quantity === 'number') {
      return total + item.quantity;
    }
    return total;
  }, 0);
}

/**
 * Get available sizes only (stock > 0)
 * @param sizeStock - The size_stock JSONB array from products table
 * @returns Array of sizes that have stock > 0
 */
export function getAvailableSizes(sizeStock: unknown): string[] {
  if (!sizeStock || !Array.isArray(sizeStock)) {
    return [];
  }
  
  return sizeStock
    .filter((item): item is SizeStockItem => 
      item !== null && 
      typeof item === 'object' && 
      'size' in item && 
      typeof item.size === 'string' &&
      'quantity' in item &&
      typeof item.quantity === 'number' &&
      item.quantity > 0
    )
    .map(item => item.size);
}

/**
 * Format size stock for display (e.g., "M (10), L (15), XL (5)")
 * @param sizeStock - The size_stock JSONB array from products table
 * @returns Formatted string for display
 */
export function formatSizeStock(sizeStock: unknown): string {
  if (!sizeStock || !Array.isArray(sizeStock)) {
    return '';
  }
  
  return sizeStock
    .filter((item): item is SizeStockItem => 
      item !== null && 
      typeof item === 'object' && 
      'size' in item && 
      'quantity' in item
    )
    .map(item => `${item.size} (${item.quantity})`)
    .join(', ');
}

/**
 * Validate size stock data structure
 * @param sizeStock - Data to validate
 * @returns True if valid size_stock format
 */
export function isValidSizeStock(sizeStock: unknown): sizeStock is SizeStock {
  if (!Array.isArray(sizeStock)) {
    return false;
  }
  
  return sizeStock.every(
    item => 
      item !== null && 
      typeof item === 'object' && 
      'size' in item && 
      typeof item.size === 'string' &&
      item.size.trim().length > 0 &&
      'quantity' in item && 
      typeof item.quantity === 'number' &&
      item.quantity >= 0
  );
}

/**
 * Create a new size stock array from sizes and default quantity
 * @param sizes - Array of size names
 * @param defaultQuantity - Default quantity for each size (default: 10)
 * @returns SizeStock array
 */
export function createSizeStock(sizes: string[], defaultQuantity: number = 10): SizeStock {
  return sizes.map(size => ({
    size: size.trim(),
    quantity: defaultQuantity
  }));
}

/**
 * Update quantity for a specific size in size_stock
 * @param sizeStock - Current size_stock array
 * @param size - Size to update
 * @param quantity - New quantity
 * @returns Updated size_stock array
 */
export function updateSizeQuantity(sizeStock: SizeStock, size: string, quantity: number): SizeStock {
  const normalized = size.trim().toUpperCase();
  
  return sizeStock.map(item => {
    if (item.size.trim().toUpperCase() === normalized) {
      return { ...item, quantity: Math.max(0, quantity) };
    }
    return item;
  });
}

/**
 * Decrement stock for a size (after order)
 * @param sizeStock - Current size_stock array
 * @param size - Size to decrement
 * @param amount - Amount to decrement (default: 1)
 * @returns Updated size_stock array
 */
export function decrementSizeStock(sizeStock: SizeStock, size: string, amount: number = 1): SizeStock {
  const current = getStockForSize(sizeStock, size);
  return updateSizeQuantity(sizeStock, size, current - amount);
}
