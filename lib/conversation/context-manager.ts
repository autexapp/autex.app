/**
 * Context Manager - Conversation Context Preservation System
 * 
 * Provides checkpoint/rollback functionality to prevent context corruption
 * during AI Director calls. Separate file for scalability and testability.
 */

import { ConversationContext, ConversationState } from '@/types/conversation';

// ============================================
// TYPES
// ============================================

interface ContextCheckpoint {
  context: ConversationContext;
  timestamp: number;
  reason: string;
}

interface IntegrityCheckResult {
  valid: boolean;
  issues: string[];
}

// ============================================
// VALID STATES (for integrity check)
// ============================================

const VALID_STATES: ConversationState[] = [
  'IDLE',
  'CONFIRMING_PRODUCT',
  'SELECTING_CART_ITEMS',
  'COLLECTING_MULTI_VARIATIONS',
  'COLLECTING_NAME',
  'COLLECTING_PHONE',
  'COLLECTING_ADDRESS',
  'CONFIRMING_ORDER',
  'COLLECTING_PAYMENT_DIGITS',
  'AWAITING_CUSTOMER_DETAILS',
];

// ============================================
// CONTEXT MANAGER CLASS
// ============================================

/**
 * Manages conversation context checkpoints for rollback on errors
 */
export class ContextManager {
  private checkpointStack: ContextCheckpoint[] = [];
  private maxCheckpoints = 5;
  
  /**
   * Save a checkpoint before risky operations (like AI calls)
   */
  saveCheckpoint(context: ConversationContext, reason: string = 'AI call'): void {
    const checkpoint: ContextCheckpoint = {
      context: JSON.parse(JSON.stringify(context)), // Deep clone
      timestamp: Date.now(),
      reason,
    };
    
    this.checkpointStack.push(checkpoint);
    
    // Keep only last N checkpoints
    while (this.checkpointStack.length > this.maxCheckpoints) {
      this.checkpointStack.shift();
    }
    
    console.log(`💾 Context checkpoint saved (${reason}). Stack size: ${this.checkpointStack.length}`);
  }
  
  /**
   * Rollback to previous checkpoint
   */
  rollback(steps: number = 1): ConversationContext | null {
    if (this.checkpointStack.length === 0) {
      console.log('⚠️ No checkpoints available for rollback');
      return null;
    }
    
    // Pop the specified number of checkpoints
    let lastCheckpoint: ContextCheckpoint | undefined;
    for (let i = 0; i < steps && this.checkpointStack.length > 0; i++) {
      lastCheckpoint = this.checkpointStack.pop();
    }
    
    if (!lastCheckpoint) {
      return null;
    }
    
    console.log(`⏪ Context rolled back to: ${lastCheckpoint.reason} (${new Date(lastCheckpoint.timestamp).toISOString()})`);
    return lastCheckpoint.context;
  }
  
  /**
   * Get the most recent checkpoint without removing it
   */
  getLastCheckpoint(): ConversationContext | null {
    if (this.checkpointStack.length === 0) {
      return null;
    }
    return this.checkpointStack[this.checkpointStack.length - 1].context;
  }
  
  /**
   * Clear all checkpoints (e.g., after successful order)
   */
  clearCheckpoints(): void {
    this.checkpointStack = [];
    console.log('🗑️ All context checkpoints cleared');
  }
  
  /**
   * Validate context integrity
   * Returns issues if context is corrupted
   */
  validateIntegrity(context: ConversationContext): IntegrityCheckResult {
    const issues: string[] = [];
    
    // 1. State must be valid
    if (!VALID_STATES.includes(context.state)) {
      issues.push(`Invalid state: ${context.state}`);
    }
    
    // 2. Cart items must have required fields
    if (context.cart && context.cart.length > 0) {
      context.cart.forEach((item, index) => {
        if (!item.productId) {
          issues.push(`Cart item ${index} missing productId`);
        }
        if (typeof item.productPrice !== 'number' || item.productPrice <= 0) {
          issues.push(`Cart item ${index} has invalid price: ${item.productPrice}`);
        }
        if (typeof item.quantity !== 'number' || item.quantity < 1) {
          issues.push(`Cart item ${index} has invalid quantity: ${item.quantity}`);
        }
      });
    }
    
    // 3. Phone format if provided
    if (context.checkout?.customerPhone) {
      const phone = context.checkout.customerPhone;
      const phoneRegex = /^01[3-9]\d{8}$/;
      if (!phoneRegex.test(phone.replace(/[\s-]/g, ''))) {
        issues.push(`Invalid phone format: ${phone}`);
      }
    }
    
    // 4. State consistency checks
    if (context.state === 'IDLE' && context.cart && context.cart.length > 0) {
      // IDLE state should have empty cart (unless user just added product)
      // This is a warning, not an error
      console.log('⚠️ Warning: IDLE state with non-empty cart');
    }
    
    if (context.state === 'CONFIRMING_ORDER') {
      // CONFIRMING_ORDER should have cart and checkout info
      if (!context.cart || context.cart.length === 0) {
        issues.push('CONFIRMING_ORDER state but cart is empty');
      }
      if (!context.checkout?.customerName) {
        issues.push('CONFIRMING_ORDER state but missing customer name');
      }
    }
    
    return {
      valid: issues.length === 0,
      issues,
    };
  }
}

// ============================================
// SINGLETON INSTANCE
// ============================================

// Export a singleton for consistent state across the app
let contextManagerInstance: ContextManager | null = null;

export function getContextManager(): ContextManager {
  if (!contextManagerInstance) {
    contextManagerInstance = new ContextManager();
  }
  return contextManagerInstance;
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Wrapper for safe context operations with automatic rollback
 */
export async function withContextSafety<T>(
  context: ConversationContext,
  operation: () => Promise<T>,
  onError?: (error: Error) => void
): Promise<{ result: T | null; context: ConversationContext }> {
  const manager = getContextManager();
  
  // Save checkpoint before operation
  manager.saveCheckpoint(context, 'Pre-operation checkpoint');
  
  try {
    const result = await operation();
    return { result, context };
  } catch (error) {
    console.error('❌ Operation failed, attempting rollback:', error);
    
    // Rollback to previous state
    const rolledBackContext = manager.rollback();
    
    if (onError && error instanceof Error) {
      onError(error);
    }
    
    return { 
      result: null, 
      context: rolledBackContext || context 
    };
  }
}
