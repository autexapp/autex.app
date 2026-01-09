import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Manually load environment variables from .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, 'utf8');
  envConfig.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      const value = match[2].trim().replace(/^["'](.*)["']$/, '$1'); // Remove quotes
      if (!process.env[key]) {
        process.env[key] = value;
      }
    }
  });
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('❌ Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function migrateVariantStock() {
  console.log('🚀 Starting Variant Stock Migration...');
  
  try {
    // 1. Fetch products that need migration
    // Criteria: has size_stock (with items) AND (variant_stock is null OR variant_stock is empty)
    const { data: products, error } = await supabase
      .from('products')
      .select('id, name, colors, sizes, size_stock, variant_stock');
      
    if (error) throw error;
    
    if (!products || products.length === 0) {
      console.log('✅ No products found.');
      return;
    }
    
    console.log(`📋 Found ${products.length} total products. Checking for migration candidates...`);
    
    let migratedCount = 0;
    
    for (const product of products) {
      const sizeStock = product.size_stock as any[];
      const variantStock = product.variant_stock as any[];
      
      // Check if migration is needed
      const hasSizeStock = Array.isArray(sizeStock) && sizeStock.length > 0;
      const hasVariantStock = Array.isArray(variantStock) && variantStock.length > 0;
      
      if (hasSizeStock && !hasVariantStock) {
        console.log(`📦 Migrating product: "${product.name}" (${product.id})`);
        
        // Determine target color
        // Use the first color if available, otherwise 'Standard'
        let targetColor = 'Standard';
        if (product.colors && Array.isArray(product.colors) && product.colors.length > 0) {
          targetColor = product.colors[0];
        }
        
        // Map size_stock to variant_stock
        const newVariantStock = sizeStock.map(item => ({
          size: item.size,
          color: targetColor,
          quantity: item.quantity
        }));
        
        // Update product
        const { error: updateError } = await supabase
          .from('products')
          .update({ 
            variant_stock: newVariantStock,
            // We keep size_stock as is for backward compatibility (it acts as cached total)
            updated_at: new Date().toISOString()
          })
          .eq('id', product.id);
          
        if (updateError) {
          console.error(`❌ Failed to update product ${product.id}:`, updateError);
        } else {
          console.log(`   ✅ Migrated ${newVariantStock.length} sizes to Color: "${targetColor}"`);
          migratedCount++;
        }
      }
    }
    
    if (migratedCount === 0) {
      console.log('✨ All products are already up to date!');
    } else {
      console.log(`\n🎉 Successfully migrated ${migratedCount} products.`);
    }
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrateVariantStock();
