'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Trash2 } from 'lucide-react';

export interface VariantStockItem {
  size: string;
  color: string;
  quantity: number;
}

interface VariantStockMatrixProps {
  sizes: string[];
  colors: string[]; // From comma-separated input
  value: VariantStockItem[];
  onChange: (value: VariantStockItem[]) => void;
  onRemoveSize: (sizeIndex: number) => void;
}

export function VariantStockMatrix({ 
  sizes, 
  colors, 
  value, 
  onChange,
  onRemoveSize
}: VariantStockMatrixProps) {
  // Normalize colors (remove empty strings, trim)
  const activeColors = useMemo(() => 
    colors.map(c => c.trim()).filter(c => c.length > 0),
  [colors]);

  // If no colors defined, treat as single "Standard" column or just hide color headers?
  // User wanted matrix for colors. If no colors, maybe just show standard quantity input per size? 
  // But this component is specifically for the matrix.
  // Let's assume if activeColors is empty, we show one column header "Quantity" (acting as 'default' color)

  const displayColors = activeColors.length > 0 ? activeColors : ['Standard'];

  // Helper to get quantity for a specific size-color combo
  const getQuantity = (size: string, color: string) => {
    const item = value.find(v => v.size === size && v.color === color);
    return item ? item.quantity : 0;
  };

  // Helper to update quantity
  const handleQuantityChange = (size: string, color: string, newQty: number) => {
    // Remove existing entry for this combo if it exists
    const newValue = value.filter(v => !(v.size === size && v.color === color));
    
    // Add new entry if quantity > 0 or if we want to track 0 explicitly?
    // Let's track everything to be safe, but maybe filter zeros on save?
    // User requirement: "If someone removes that color, the quantity of that color will be subtracted"
    // So we should keep the state in sync with activeColors.
    
    newValue.push({ size, color, quantity: newQty });
    onChange(newValue);
  };

  // Calculate totals
  const getSizeTotal = (size: string) => {
    return value
      .filter(v => v.size === size && (activeColors.length === 0 || activeColors.includes(v.color) || (activeColors.length === 0 && v.color === 'Standard')))
      .reduce((sum, v) => sum + v.quantity, 0);
  };

  const getColorTotal = (color: string) => {
    return value
      .filter(v => v.color === color && sizes.includes(v.size))
      .reduce((sum, v) => sum + v.quantity, 0);
  };

  const grandTotal = value
    .filter(v => sizes.includes(v.size) && (activeColors.length === 0 || activeColors.includes(v.color) || (activeColors.length === 0 && v.color === 'Standard')))
    .reduce((sum, v) => sum + v.quantity, 0);

  return (
    <div className="space-y-3">
      {/* Header Row (Desktop only) */}
      <div className="hidden sm:grid sm:grid-cols-[100px_1fr_100px_50px] gap-2 px-4 py-2 text-xs font-semibold text-zinc-500 uppercase tracking-wider">
        <div>Size</div>
        <div className="text-center">Variants / Stock</div>
        <div className="text-center">Total</div>
        <div></div>
      </div>

      {sizes.map((size, index) => (
        <div 
          key={size}
          className="relative group bg-zinc-900/40 border border-white/5 rounded-xl p-4 sm:grid sm:grid-cols-[100px_1fr_100px_50px] sm:items-center sm:p-3 gap-4"
        >
          {/* Size Label */}
          <div className="flex items-center justify-between sm:justify-start mb-3 sm:mb-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10 text-white font-bold text-lg font-serif">
               {size}
            </div>
            
            {/* Mobile Delete Button (visible only on mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-zinc-400 hover:text-red-400 sm:hidden"
              onClick={() => onRemoveSize(index)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>

          {/* Variants Grid */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 justify-center">
            {displayColors.map(color => (
              <div key={`${size}-${color}`} className="bg-black/20 rounded-lg p-2 flex flex-col items-center border border-white/5 min-w-[80px]">
                <span className="text-[10px] text-zinc-400 mb-1 uppercase tracking-widest max-w-full truncate px-1" title={color}>
                  {color}
                </span>
                <Input
                  type="number"
                  min="0"
                  className="h-8 w-16 text-center text-sm font-mono bg-transparent border-white/10 focus:border-white/30 p-0"
                  value={getQuantity(size, color) || ''}
                  placeholder="0"
                  onChange={(e) => {
                    const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                    handleQuantityChange(size, color, isNaN(val) ? 0 : val);
                  }}
                />
              </div>
            ))}
          </div>

          {/* Usage Stats (Mobile: Row, Desktop: Col) */}
          <div className="flex sm:flex-col items-center justify-between sm:justify-center mt-3 sm:mt-0 pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
             <span className="sm:hidden text-xs text-zinc-500 font-medium uppercase">Total Stock</span>
             <div className="text-center">
               <span className="text-xl sm:text-lg font-mono font-bold text-white">{getSizeTotal(size)}</span>
               <span className="text-[10px] text-zinc-500 hidden sm:block">pcs</span>
             </div>
          </div>

          {/* Desktop Delete (hidden on mobile) */}
          <div className="hidden sm:flex justify-end">
             <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-zinc-500 hover:text-red-400 hover:bg-red-400/10"
                onClick={() => onRemoveSize(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
          </div>
        </div>
      ))}

      {sizes.length === 0 && (
         <div className="text-center py-8 text-zinc-500 text-sm border border-dashed border-white/10 rounded-xl bg-white/5">
            No sizes added yet. Use the quick add buttons above.
         </div>
      )}
      
      {/* Grand Total Footer */}
      {sizes.length > 0 && (
        <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-xl border border-white/10 mt-2">
           <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest">Grand Total</span>
           <span className="text-xl font-mono font-bold text-emerald-400">{grandTotal} <span className="text-sm font-sans text-emerald-400/50">units</span></span>
        </div>
      )}
    </div>
  );
}
