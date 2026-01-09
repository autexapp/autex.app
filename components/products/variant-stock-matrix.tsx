'use client';

import { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
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
    <div className="border rounded-md overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="w-[100px]">Size</TableHead>
              {displayColors.map(color => (
                <TableHead key={color} className="text-center min-w-[80px]">
                  {color}
                </TableHead>
              ))}
              <TableHead className="text-center w-[80px] font-bold">Total</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sizes.map((size, index) => (
              <TableRow key={size}>
                <TableCell className="font-medium">{size}</TableCell>
                {displayColors.map(color => (
                  <TableCell key={`${size}-${color}`} className="p-2">
                    <Input
                      type="number"
                      min="0"
                      className="h-8 text-center"
                      value={getQuantity(size, color) || ''}
                      placeholder="0"
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : parseInt(e.target.value);
                        handleQuantityChange(size, color, isNaN(val) ? 0 : val);
                      }}
                    />
                  </TableCell>
                ))}
                <TableCell className="text-center font-bold text-muted-foreground">
                  {getSizeTotal(size)}
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onRemoveSize(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            
            {/* Totals Row */}
            {sizes.length > 0 && (
              <TableRow className="bg-muted/50 font-medium">
                <TableCell>Total</TableCell>
                {displayColors.map(color => (
                  <TableCell key={`total-${color}`} className="text-center">
                    {getColorTotal(color)}
                  </TableCell>
                ))}
                <TableCell className="text-center font-bold">{grandTotal}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
