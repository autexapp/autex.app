/**
 * AI Director - Action Validator
 * 
 * This module validates AI Director decisions before execution to prevent:
 * - Invalid state transitions
 * - Hallucinated product IDs
 * - Order creation without required info
 * - Invalid phone numbers
 * - Invalid cart operations
 */

import { ConversationContext, ConversationState, CartItem } from '@/types/conversation';
import { AIDirectorDecision } from './ai-director';
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// ============================================
// TYPES
// ============================================

export interface ValidationResult {
  /** Whether the decision is valid */
  valid: boolean;
  
  /** Error message if invalid */
  error?: string;
  
  /** Suggestion for fixing the issue */
  suggestion?: string;
  
  /** Type of validation that failed */
  failedValidation?: 
    | 'INVALID_PRODUCT'
    | 'INVALID_STATE_TRANSITION'
    | 'MISSING_CHECKOUT_INFO'
    | 'INVALID_PHONE'
    | 'EMPTY_CART'
    | 'INVALID_ACTION';
}

// ============================================
// VALID STATE TRANSITIONS
// ============================================

/**
 * Map of valid state transitions
 * Key = current state, Value = array of valid next states
 */
export const VALID_STATE_TRANSITIONS: Record<ConversationState, ConversationState[]> = {
  'IDLE': [
    'CONFIRMING_PRODUCT',
    'SELECTING_CART_ITEMS',
    'COLLECTING_NAME',  // For quick checkout
    'IDLE',  // Stay in IDLE
  ],
  
  'CONFIRMING_PRODUCT': [
    'COLLECTING_NAME',
    'COLLECTING_MULTI_VARIATIONS',
    'SELECTING_CART_ITEMS',  // Added more images
    'IDLE',  // User declined
    'CONFIRMING_PRODUCT',  // Asking clarifying question
  ],
  
  'SELECTING_CART_ITEMS': [
    'COLLECTING_NAME',
    'COLLECTING_MULTI_VARIATIONS',
    'IDLE',  // User cancelled
    'SELECTING_CART_ITEMS',  // Still selecting
  ],
  
  'COLLECTING_MULTI_VARIATIONS': [
    'COLLECTING_NAME',
    'COLLECTING_MULTI_VARIATIONS',  // Collecting next item's variation
    'IDLE',  // User cancelled
  ],
  
  'COLLECTING_NAME': [
    'COLLECTING_PHONE',
    'IDLE',  // User cancelled
    'COLLECTING_NAME',  // Re-prompting
  ],
  
  'COLLECTING_PHONE': [
    'COLLECTING_ADDRESS',
    'IDLE',  // User cancelled
    'COLLECTING_PHONE',  // Re-prompting
  ],
  
  'COLLECTING_ADDRESS': [
    'CONFIRMING_ORDER',
    'IDLE',  // User cancelled
    'COLLECTING_ADDRESS',  // Re-prompting
  ],
  
  'CONFIRMING_ORDER': [
    'IDLE',  // Order completed or cancelled
    'COLLECTING_PAYMENT_DIGITS',  // If payment needed
    'CONFIRMING_ORDER',  // Answering questions
    'COLLECTING_NAME',    // User wants to update name
    'COLLECTING_PHONE',   // User wants to update phone
    'COLLECTING_ADDRESS', // User wants to update address
  ],
  
  'COLLECTING_PAYMENT_DIGITS': [
    'IDLE',  // Order completed
    'COLLECTING_PAYMENT_DIGITS',  // Re-prompting
  ],
  
  'AWAITING_CUSTOMER_DETAILS': [
    'CONFIRMING_ORDER',  // Quick form submitted
    'COLLECTING_NAME',  // Fallback to conversational
    'IDLE',  // User cancelled
    'AWAITING_CUSTOMER_DETAILS',  // Re-prompting
  ],
};

// ============================================
// PHONE VALIDATION
// ============================================

/**
 * Validates Bangladesh phone number
 * Valid formats: 01XXXXXXXXX (11 digits starting with 01)
 */
export function isValidBangladeshPhone(phone: string): boolean {
  if (!phone) return false;
  
  // Remove spaces, dashes, and country codes
  const cleaned = phone
    .replace(/[\s-]/g, '')
    .replace(/^\+?880/, '0')
    .replace(/^880/, '0');
  
  // Must be 11 digits starting with 01, followed by 3-9, then 8 more digits
  const phoneRegex = /^01[3-9]\d{8}$/;
  return phoneRegex.test(cleaned);
}

// ============================================
// MAIN VALIDATION FUNCTION
// ============================================

/**
 * Validates an AI Director decision before execution
 * 
 * @param decision - The AI Director's decision
 * @param context - Current conversation context
 * @param workspaceId - Workspace ID for product validation
 * @returns ValidationResult indicating if decision is valid
 */
export async function validateAIDecision(
  decision: AIDirectorDecision,
  context: ConversationContext,
  workspaceId: string
): Promise<ValidationResult> {
  console.log('\n🔍 VALIDATING AI DECISION');
  console.log(`Action: ${decision.action}`);
  console.log(`Current State: ${context.state}`);
  console.log(`New State: ${decision.newState || 'unchanged'}`);
  
  // ========================================
  // VALIDATION 1: State Transition
  // ========================================
  
  if (decision.newState && decision.newState !== context.state) {
    const validTransitions = VALID_STATE_TRANSITIONS[context.state] || [];
    
    if (!validTransitions.includes(decision.newState)) {
      console.log(`❌ Invalid state transition: ${context.state} → ${decision.newState}`);
      console.log(`Valid transitions: ${validTransitions.join(', ')}`);
      
      return {
        valid: false,
        error: `Invalid state transition from ${context.state} to ${decision.newState}`,
        suggestion: `Valid next states: ${validTransitions.join(', ')}`,
        failedValidation: 'INVALID_STATE_TRANSITION',
      };
    }
  }
  
  // ========================================
  // VALIDATION 2: Action-specific validation
  // ========================================
  
  switch (decision.action) {
    case 'ADD_TO_CART':
      return await validateAddToCart(decision, context, workspaceId);
    
    case 'CREATE_ORDER':
      return validateCreateOrder(context);
    
    case 'UPDATE_CHECKOUT':
      return validateUpdateCheckout(decision);
    
    case 'REMOVE_FROM_CART':
      return validateRemoveFromCart(decision, context);
    
    default:
      // Other actions don't need special validation
      break;
  }
  
  console.log('✅ Validation passed');
  return { valid: true };
}

// ============================================
// ACTION-SPECIFIC VALIDATORS
// ============================================

/**
 * Validates ADD_TO_CART action
 * - Product ID must exist in workspace
 */
async function validateAddToCart(
  decision: AIDirectorDecision,
  context: ConversationContext,
  workspaceId: string
): Promise<ValidationResult> {
  const productId = decision.actionData?.productId;
  
  if (!productId) {
    return {
      valid: false,
      error: 'ADD_TO_CART requires productId',
      failedValidation: 'INVALID_ACTION',
    };
  }
  
  // Check if product exists in workspace
  try {
    const supabase = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    
    const { data: product, error } = await supabase
      .from('products')
      .select('id, name, price')
      .eq('id', productId)
      .eq('workspace_id', workspaceId)
      .single();
    
    if (error || !product) {
      console.log(`❌ Product not found: ${productId}`);
      
      return {
        valid: false,
        error: `Product with ID "${productId}" not found in this workspace`,
        suggestion: 'Please search for valid products first',
        failedValidation: 'INVALID_PRODUCT',
      };
    }
    
    console.log(`✅ Product validated: ${product.name}`);
    return { valid: true };
    
  } catch (error) {
    console.error('❌ Product validation error:', error);
    // Don't block on database errors - let it through
    return { valid: true };
  }
}

/**
 * Validates CREATE_ORDER action
 * - Must have customer name, phone, and address
 * - Cart must not be empty
 */
function validateCreateOrder(context: ConversationContext): ValidationResult {
  const checkout = context.checkout || {};
  const cart = context.cart || [];
  
  // Check cart is not empty
  if (cart.length === 0) {
    return {
      valid: false,
      error: 'Cannot create order with empty cart',
      suggestion: 'Customer must add products to cart first',
      failedValidation: 'EMPTY_CART',
    };
  }
  
  // Check required checkout info
  const missingFields: string[] = [];
  
  if (!checkout.customerName) {
    missingFields.push('customer name');
  }
  
  if (!checkout.customerPhone) {
    missingFields.push('phone number');
  }
  
  if (!checkout.customerAddress) {
    missingFields.push('delivery address');
  }
  
  if (missingFields.length > 0) {
    return {
      valid: false,
      error: `Cannot create order without: ${missingFields.join(', ')}`,
      suggestion: `Please collect: ${missingFields.join(', ')}`,
      failedValidation: 'MISSING_CHECKOUT_INFO',
    };
  }
  
  // Validate phone format (customerPhone is confirmed non-null above)
  if (!isValidBangladeshPhone(checkout.customerPhone!)) {
    return {
      valid: false,
      error: `Invalid phone number format: ${checkout.customerPhone}`,
      suggestion: 'Phone must be 11 digits starting with 01',
      failedValidation: 'INVALID_PHONE',
    };
  }
  
  console.log('✅ Order validation passed');
  return { valid: true };
}

/**
 * Validates UPDATE_CHECKOUT action
 * - Phone must be valid if provided
 */
function validateUpdateCheckout(decision: AIDirectorDecision): ValidationResult {
  const phone = decision.actionData?.customerPhone;
  
  if (phone && !isValidBangladeshPhone(phone)) {
    return {
      valid: false,
      error: `Invalid phone number format: ${phone}`,
      suggestion: 'Phone must be 11 digits starting with 01 (e.g., 01712345678)',
      failedValidation: 'INVALID_PHONE',
    };
  }
  
  return { valid: true };
}

/**
 * Validates REMOVE_FROM_CART action
 * - Product must exist in cart
 */
function validateRemoveFromCart(
  decision: AIDirectorDecision,
  context: ConversationContext
): ValidationResult {
  const productId = decision.actionData?.productId;
  const cart = context.cart || [];
  
  if (!productId) {
    return {
      valid: false,
      error: 'REMOVE_FROM_CART requires productId',
      failedValidation: 'INVALID_ACTION',
    };
  }
  
  const productInCart = cart.find(item => item.productId === productId);
  
  if (!productInCart) {
    return {
      valid: false,
      error: `Product "${productId}" is not in the cart`,
      suggestion: 'Cannot remove product that is not in cart',
      failedValidation: 'INVALID_PRODUCT',
    };
  }
  
  return { valid: true };
}

// ============================================
// CONFIDENCE THRESHOLD
// ============================================

/** Minimum confidence threshold for execution */
export const MIN_CONFIDENCE_THRESHOLD = 70;

/**
 * Checks if AI decision has sufficient confidence
 */
export function hasLowConfidence(decision: AIDirectorDecision): boolean {
  return decision.confidence < MIN_CONFIDENCE_THRESHOLD;
}

/**
 * Creates a clarification request when confidence is too low
 */
export function createClarificationDecision(
  originalDecision: AIDirectorDecision,
  currentState: ConversationState
): AIDirectorDecision {
  console.log(`⚠️ Low confidence (${originalDecision.confidence}%) - asking for clarification`);
  
  // State-appropriate clarification messages
  const clarificationMessages: Record<ConversationState, string> = {
    'IDLE': 'দুঃখিত, বুঝতে পারিনি। 🤔\n\nআপনি কি করতে চাচ্ছেন?\n• Product অর্ডার করতে ছবি পাঠান 📸\n• অথবা product এর নাম লিখুন',
    'CONFIRMING_PRODUCT': 'দুঃখিত, বুঝতে পারিনি। 🤔\n\nএই product অর্ডার করতে চাইলে "yes" লিখুন।\nনা চাইলে "no" লিখুন।',
    'SELECTING_CART_ITEMS': 'দুঃখিত, বুঝতে পারিনি। 🤔\n\n• সবগুলো নিতে \"all\" লিখুন\n• নির্দিষ্ট গুলো: \"1 and 3\" লিখুন\n• বাতিল করতে \"cancel\" লিখুন',
    'COLLECTING_MULTI_VARIATIONS': 'দুঃখিত, বুঝতে পারিনি। 🤔\n\nSize বলুন: S / M / L / XL',
    'COLLECTING_NAME': 'দুঃখিত, বুঝতে পারিনি। 🤔\n\nআপনার সম্পূর্ণ নাম লিখুন। (যেমন: Abdul Hamid)',
    'COLLECTING_PHONE': 'দুঃখিত, বুঝতে পারিনি। 🤔\n\nআপনার ফোন নম্বর দিন। (যেমন: 01712345678)',
    'COLLECTING_ADDRESS': 'দুঝিত, বুঝতে পারিনি। 🤔\n\nআপনার সম্পূর্ণ ঠিকানা দিন।\n(যেমন: House 10, Road 5, Dhanmondi, Dhaka)',
    'CONFIRMING_ORDER': 'দুঃখিত, বুঝতে পারিনি। 🤔\n\nঅর্ডার confirm করতে \"yes\" লিখুন।\nবাতিল করতে \"cancel\" লিখুন।',
    'COLLECTING_PAYMENT_DIGITS': 'দুঃখিত, বুঝতে পারিনি। 🤔\n\nPayment এর শেষ 2 digit দিন। (যেমন: 45)',
    'AWAITING_CUSTOMER_DETAILS': 'দুঃখিত, বুঝতে পারিনি। 🤔\n\nQuick Form এ নাম, ফোন, ঠিকানা দিন।\nঅথবা আমাকে একটা একটা করে বলুন।',
  };
  
  return {
    action: 'SEND_RESPONSE',
    response: clarificationMessages[currentState] || 'দুঃখিত, বুঝতে পারিনি। 🤔 আবার বলবেন?',
    newState: currentState, // Stay in current state
    confidence: 100,
    reasoning: `Low confidence (${originalDecision.confidence}%) - asking for clarification instead of guessing`,
  };
}

/**
 * Creates an error recovery decision when validation fails
 */
export function createValidationErrorDecision(
  validationResult: ValidationResult,
  currentState: ConversationState
): AIDirectorDecision {
  console.log(`⚠️ Validation failed: ${validationResult.error}`);
  
  let response = 'দুঃখিত, একটা সমস্যা হয়েছে। 😔';
  
  switch (validationResult.failedValidation) {
    case 'INVALID_PRODUCT':
      response = 'দুঃখিত, এই product টা খুঁজে পাওয়া যায়নি। 😔\n\nProduct এর ছবি পাঠান অথবা নাম লিখুন।';
      break;
    
    case 'INVALID_PHONE':
      response = 'ফোন নম্বরটা সঠিক নয়। 📱\n\n01 দিয়ে শুরু হওয়া 11 digit এর নম্বর দিন।\n(যেমন: 01712345678)';
      break;
    
    case 'MISSING_CHECKOUT_INFO':
      response = `দুঃখিত, order করতে আরো তথ্য দরকার। 📝\n\n${validationResult.suggestion || ''}`;
      break;
    
    case 'EMPTY_CART':
      response = 'আপনার cart এ কোনো product নেই। 🛒\n\nProduct এর ছবি পাঠান অথবা নাম লিখুন।';
      break;
    
    case 'INVALID_STATE_TRANSITION':
      // Internal error - use generic message
      response = 'দুঃখিত, একটা সমস্যা হয়েছে। 😔 আবার চেষ্টা করুন।';
      break;
  }
  
  return {
    action: 'SEND_RESPONSE',
    response,
    newState: currentState, // Stay in current state
    confidence: 100,
    reasoning: `Validation error: ${validationResult.error}`,
  };
}
