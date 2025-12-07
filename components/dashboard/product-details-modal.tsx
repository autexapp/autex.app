'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SizeStockItem {
  size: string;
  quantity: number;
}

interface Product {
  id: string;
  name: string;
  price: number;
  stock_quantity: number;
  description?: string | null;
  category?: string | null;
  image_urls?: string[];
  colors?: string[] | null;
  sizes?: string[] | null;
  size_stock?: SizeStockItem[] | null;
}

interface ProductDetailsModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

export function ProductDetailsModal({ product, open, onClose }: ProductDetailsModalProps) {
  if (!product) return null;

  // Use size_stock if available, otherwise fall back to sizes array
  const sizeStock = product.size_stock || 
    (product.sizes?.map(size => ({ size, quantity: Math.floor(product.stock_quantity / (product.sizes?.length || 1)) })) || []);

  const totalStock = sizeStock.reduce((sum, item) => sum + item.quantity, 0);
  const hasLowStock = sizeStock.some(item => item.quantity > 0 && item.quantity < 5);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Product Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Product Image */}
          {product.image_urls?.[0] && (
            <div className="relative w-full h-48 rounded-lg overflow-hidden bg-muted">
              <Image
                src={product.image_urls[0]}
                alt={product.name}
                fill
                className="object-contain"
              />
            </div>
          )}

          {/* Product Info */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-2xl font-bold text-primary">৳{product.price.toLocaleString()}</p>
            
            {product.description && (
              <p className="text-sm text-muted-foreground">{product.description}</p>
            )}

            {product.category && (
              <Badge variant="secondary">{product.category}</Badge>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Colors</h4>
              <div className="flex flex-wrap gap-1">
                {product.colors.map((color) => (
                  <Badge key={color} variant="outline">
                    🎨 {color}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Size Stock Table */}
          {sizeStock.length > 0 && (
            <div>
              <h4 className="text-sm font-medium mb-2">Stock by Size</h4>
              <div className="border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="px-4 py-2 text-left font-medium">Size</th>
                      <th className="px-4 py-2 text-right font-medium">Stock</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {sizeStock.map((item, index) => (
                      <tr key={index}>
                        <td className="px-4 py-2 font-medium">{item.size}</td>
                        <td className={cn(
                          "px-4 py-2 text-right",
                          item.quantity === 0 && "text-destructive font-medium",
                          item.quantity > 0 && item.quantity < 5 && "text-yellow-600 dark:text-yellow-400 font-medium"
                        )}>
                          {item.quantity} pcs
                          {item.quantity === 0 && " ❌"}
                          {item.quantity > 0 && item.quantity < 5 && " ⚠️"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-muted/30">
                    <tr>
                      <td className="px-4 py-2 font-semibold">Total</td>
                      <td className={cn(
                        "px-4 py-2 text-right font-semibold",
                        totalStock === 0 && "text-destructive"
                      )}>
                        {totalStock} pcs
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
              
              {hasLowStock && (
                <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-2">
                  ⚠️ Some sizes have low stock (less than 5 pcs)
                </p>
              )}
            </div>
          )}

          {/* No sizes defined */}
          {sizeStock.length === 0 && (
            <div className="text-center py-4 text-muted-foreground">
              <p>No size variations defined</p>
              <p className="text-sm">Total Stock: {product.stock_quantity} pcs</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
