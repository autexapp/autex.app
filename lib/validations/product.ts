import { z } from 'zod';

// Size stock item schema
const sizeStockItemSchema = z.object({
  size: z.string().min(1),
  quantity: z.number().int().min(0),
});

// Variant stock item schema
const variantStockItemSchema = z.object({
  size: z.string().min(1),
  color: z.string().min(1),
  quantity: z.number().int().min(0),
});

/**
 * Schema for creating a new product
 */
export const createProductSchema = z.object({
  name: z.string().min(1, 'Product name is required').max(255),
  price: z.number().positive('Price must be positive'),
  description: z.string().optional(),
  category: z.string().optional(),
  stock_quantity: z.number().int().min(0, 'Stock quantity cannot be negative').optional(),
  variations: z.record(z.any()).optional(), // JSON object for variations
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  size_stock: z.array(sizeStockItemSchema).optional(),
  variant_stock: z.array(variantStockItemSchema).optional(), // NEW: variant stock tracking
});

/**
 * Schema for updating a product (all fields optional)
 */
export const updateProductSchema = createProductSchema.partial();

/**
 * Type for create product request
 */
export type CreateProductInput = z.infer<typeof createProductSchema>;

/**
 * Type for update product request
 */
export type UpdateProductInput = z.infer<typeof updateProductSchema>;

/**
 * Validates and parses FormData for product creation
 * @param formData - FormData from request
 * @returns Validated product data
 */
export function validateProductFormData(formData: FormData): CreateProductInput {
  // Parse size_stock JSON if present
  let sizeStock;
  if (formData.get('size_stock')) {
    try {
      sizeStock = JSON.parse(formData.get('size_stock') as string);
    } catch (e) {
      console.error('Failed to parse size_stock:', e);
    }
  }

  // Parse variant_stock JSON if present
  let variantStock;
  if (formData.get('variant_stock')) {
    try {
      variantStock = JSON.parse(formData.get('variant_stock') as string);
    } catch (e) {
      console.error('Failed to parse variant_stock:', e);
    }
  }

  const data = {
    name: formData.get('name') as string,
    price: parseFloat(formData.get('price') as string),
    description: (formData.get('description') as string) || undefined,
    category: (formData.get('category') as string) || undefined,
    stock_quantity: formData.get('stock_quantity') 
      ? parseInt(formData.get('stock_quantity') as string) 
      : undefined,
    variations: formData.get('variations')
      ? JSON.parse(formData.get('variations') as string)
      : undefined,
    colors: formData.get('colors')
      ? (formData.get('colors') as string).split(',').map(s => s.trim()).filter(Boolean)
      : undefined,
    sizes: formData.get('sizes')
      ? (formData.get('sizes') as string).split(',').map(s => s.trim()).filter(Boolean)
      : undefined,
    size_stock: sizeStock,
    variant_stock: variantStock,
  };

  return createProductSchema.parse(data);
}

/**
 * Validates and parses FormData for product update
 * @param formData - FormData from request
 * @returns Validated product data
 */
export function validateProductUpdateFormData(formData: FormData): UpdateProductInput {
  const data: any = {};

  if (formData.has('name')) data.name = formData.get('name') as string;
  if (formData.has('price')) data.price = parseFloat(formData.get('price') as string);
  if (formData.has('description')) data.description = formData.get('description') as string;
  if (formData.has('category')) data.category = formData.get('category') as string;
  if (formData.has('stock_quantity')) {
    data.stock_quantity = parseInt(formData.get('stock_quantity') as string);
  }
  if (formData.has('variations')) {
    data.variations = JSON.parse(formData.get('variations') as string);
  }
  if (formData.has('colors')) {
    data.colors = (formData.get('colors') as string).split(',').map((s: string) => s.trim()).filter(Boolean);
  }
  if (formData.has('sizes')) {
    data.sizes = (formData.get('sizes') as string).split(',').map((s: string) => s.trim()).filter(Boolean);
  }
  if (formData.has('size_stock')) {
    try {
      data.size_stock = JSON.parse(formData.get('size_stock') as string);
    } catch (e) {
      console.error('Failed to parse size_stock:', e);
    }
  }
  if (formData.has('variant_stock')) {
    try {
      data.variant_stock = JSON.parse(formData.get('variant_stock') as string);
    } catch (e) {
      console.error('Failed to parse variant_stock:', e);
    }
  }

  return updateProductSchema.parse(data);
}
