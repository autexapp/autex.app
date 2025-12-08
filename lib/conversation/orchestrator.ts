/**
 * Orchestrator - Phase 3: Main Message Processing Controller
 * 
 * The Orchestrator is the central controller that coordinates all message processing.
 * It ties together the Fast Lane, AI Director, and execution logic into a cohesive system.
 * 
 * Flow:
 * 1. Load conversation context and history
 * 2. Handle image attachments (special case)
 * 3. Try Fast Lane (pattern matching)
 * 4. Fall back to AI Director (AI decision)
 * 5. Execute the decision
 * 6. Save state and send response
 */

import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';
import { 
  ConversationContext, 
  ConversationState, 
  migrateLegacyContext,
  PendingImage,
  addPendingImage,
  MAX_PENDING_IMAGES,
} from '@/types/conversation';
import { tryFastLane } from './fast-lane';
import aiDirector, { AIDirectorDecision } from './ai-director';
import { 
  validateAIDecision, 
  hasLowConfidence, 
  createClarificationDecision, 
  createValidationErrorDecision 
} from './action-validator';
import { sendMessage } from '@/lib/facebook/messenger';
import { generateOrderNumber } from './replies';
import { getCachedSettings, WorkspaceSettings, getDeliveryCharge } from '@/lib/workspace/settings-cache';
import { AgentTools, ToolResult } from './agent-tools';

// ============================================
// TYPES
// ============================================

export interface ProcessMessageInput {
  /** Facebook Page ID */
  pageId: string;
  
  /** Customer PSID (Page-Scoped ID) */
  customerPsid: string;
  
  /** Message text (optional) */
  messageText?: string;
  
  /** Image URL (optional) */
  imageUrl?: string;
  
  /** Workspace ID */
  workspaceId: string;
  
  /** Facebook Page database ID */
  fbPageId: number;
  
  /** Conversation ID */
  conversationId: string;
  
  /** Test mode - skips Facebook API calls (optional) */
  isTestMode?: boolean;
}

export interface ProcessMessageResult {
  /** Response sent to user */
  response: string;
  
  /** New conversation state */
  newState: ConversationState;
  
  /** Updated context */
  updatedContext: ConversationContext;
  
  /** Whether an order was created */
  orderCreated?: boolean;
  
  /** Order number (if created) */
  orderNumber?: string;

  /** Product card data (for test bot) */
  productCard?: any;
}

// ============================================
// MAIN ORCHESTRATOR FUNCTION
// ============================================

/**
 * Main message processing orchestrator
 * 
 * This is the single entry point for all message processing.
 * The webhook should call this function for every incoming message.
 */
export async function processMessage(input: ProcessMessageInput): Promise<ProcessMessageResult> {
  const startTime = Date.now();
  
  console.log('\n🎭 ORCHESTRATOR STARTED');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log(`Customer: ${input.customerPsid}`);
  console.log(`Message: "${input.messageText || '(image)'}"`);
  console.log(`Has Image: ${!!input.imageUrl}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  try {
    // ========================================
    // STEP 1: LOAD CONVERSATION DATA
    // ========================================
    
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
    
    // Load workspace settings (with caching)
    const settings = await getCachedSettings(input.workspaceId);
    console.log(`⚙️ Loaded settings for: ${settings.businessName}`);
    
    // Load conversation
    const { data: conversation, error: convError } = await supabase
      .from('conversations')
      .select('*')
      .eq('id', input.conversationId)
      .single();
    
    if (convError || !conversation) {
      throw new Error(`Failed to load conversation: ${convError?.message}`);
    }
    
    // Parse and migrate context
    let currentContext: ConversationContext = conversation.context as any || { state: 'IDLE', cart: [], checkout: {}, metadata: {} };
    
    // Migrate legacy context if needed
    if (!currentContext.cart || !currentContext.checkout || !currentContext.metadata) {
      console.log('🔄 Migrating legacy context...');
      currentContext = migrateLegacyContext(currentContext);
    }
    
    const currentState = conversation.current_state as ConversationState || 'IDLE';
    
    console.log(`📊 Current State: ${currentState}`);
    console.log(`📊 Cart Items: ${currentContext.cart.length}`);
    
    // Load recent conversation history (last 10 messages)
    const { data: recentMessages } = await supabase
      .from('messages')
      .select('sender, message_text, created_at')
      .eq('conversation_id', input.conversationId)
      .order('created_at', { ascending: false })
      .limit(10);
    
    const conversationHistory = (recentMessages || [])
      .reverse()
      .map((msg: any) => ({
        sender: msg.sender as 'customer' | 'bot',
        message: msg.message_text || '',
        timestamp: msg.created_at || '',
      }));
    
    // ========================================
    // STEP 2: HANDLE IMAGE ATTACHMENTS (SPECIAL CASE)
    // ========================================
    
    if (input.imageUrl) {
      console.log('🖼️ Image detected - calling image recognition...');
      
      const imageDecision = await handleImageMessage(
        input.imageUrl,
        currentState,
        currentContext,
        input.workspaceId,
        input.messageText
      );
      
      return await executeDecision(
        imageDecision,
        input,
        conversation,
        supabase,
        settings
      );
    }
    
    // ========================================
    // STEP 3: TRY FAST LANE (PATTERN MATCHING)
    // ========================================
    
    if (input.messageText) {
      console.log('⚡ Trying Fast Lane...');
      
      const fastLaneResult = tryFastLane(
        input.messageText,
        currentState,
        currentContext,
        settings
      );
      
      if (fastLaneResult.matched) {
        console.log(`✅ Fast Lane matched! Action: ${fastLaneResult.action}`);
        
        // Convert FastLaneResult to AIDirectorDecision format
        const decision: AIDirectorDecision = {
          action: fastLaneResult.action === 'CONFIRM' ? 'TRANSITION_STATE' :
                  fastLaneResult.action === 'DECLINE' ? 'RESET_CONVERSATION' :
                  fastLaneResult.action === 'COLLECT_NAME' ? 'UPDATE_CHECKOUT' :
                  fastLaneResult.action === 'COLLECT_PHONE' ? 'UPDATE_CHECKOUT' :
                  fastLaneResult.action === 'COLLECT_ADDRESS' ? 'UPDATE_CHECKOUT' :
                  fastLaneResult.action === 'GREETING' ? 'SEND_RESPONSE' :
                  fastLaneResult.action === 'CREATE_ORDER' ? 'CREATE_ORDER' :
                  'SEND_RESPONSE',
          response: fastLaneResult.response || '',
          newState: fastLaneResult.newState,
          updatedContext: fastLaneResult.updatedContext,
          confidence: 100,
          reasoning: 'Fast Lane pattern match',
        };
        
        // Special handling for order confirmation - REMOVED legacy override
        // if (currentState === 'CONFIRMING_ORDER' && fastLaneResult.action === 'CONFIRM') {
        //   decision.action = 'CREATE_ORDER';
        // }
        
        return await executeDecision(
          decision,
          input,
          conversation,
          supabase,
          settings
        );
      }
      
      console.log('⚠️ Fast Lane did not match - routing to AI Director...');
    }
    
    // ========================================
    // STEP 4: FALLBACK TO AI DIRECTOR (AI DECISION)
    // ========================================
    
    if (input.messageText) {
      console.log('🧠 Calling AI Director...');
      
      // Save context before AI action (for potential rollback)
      const previousContext = { ...currentContext };
      
      try {
        let decision: AIDirectorDecision | null = null;
        let finalDecision: AIDirectorDecision | null = null;
        const maxTurns = 3;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const historyForAI: any[] = [...conversationHistory];
        
        // Agent Loop for Tool Usage (Phase 3)
        for (let turn = 0; turn < maxTurns; turn++) {
          console.log(`🧠 AI Director Turn ${turn + 1}/${maxTurns}`);
          
          decision = await aiDirector({
            userMessage: input.messageText,
            currentState,
            currentContext,
            workspaceId: input.workspaceId,
            settings,
            conversationHistory: historyForAI,
          });
          
          // Handle Tool Calls
          if (decision.action === 'CALL_TOOL') {
            console.log(`🛠️ AI Requesting Tool: ${decision.actionData?.toolName}`);
            const toolName = decision.actionData?.toolName;
            const toolArgs = decision.actionData?.toolArgs;
            
            let toolResult: ToolResult = { 
              toolName: toolName || 'unknown', 
              success: false, 
              result: null, 
              message: 'Tool execution failed' 
            };
            
            // Execute Tool
            if (toolName === 'checkStock' && toolArgs?.searchQuery) {
              toolResult = await AgentTools.checkStock(input.workspaceId, toolArgs.searchQuery);
            } else if (toolName === 'trackOrder' && toolArgs?.phone) {
              toolResult = await AgentTools.trackOrder(input.workspaceId, toolArgs.phone);
            } else if (toolName === 'calculateDelivery' && toolArgs?.address) {
              toolResult = await AgentTools.calculateDelivery(toolArgs.address, settings);
            } else {
              toolResult = {
                toolName: toolName || 'unknown',
                success: false,
                result: null,
                message: `Unknown tool or missing args: ${toolName}`
              };
            }
            
            console.log(`✅ Tool Result: ${toolResult.message}`);
            
            // Append tool result to history for next turn
            // We simulate this by adding a "bot" message with system prefix
            historyForAI.push({
              sender: 'bot',
              message: `[SYSTEM TOOL RESULT] (${toolName}): ${toolResult.message}`,
              timestamp: new Date().toISOString()
            });
            
            // Continue to next turn (AI will see tool result and decide next step)
            continue;
          }
          
          // If not a tool call, this is the final decision
          finalDecision = decision;
          break;
        }
        
        // Use final decision (or fallback if loop exhausted)
        decision = finalDecision || decision!; // Should have a decision from last turn
        
        // ========================================
        // STEP 4a: CONFIDENCE CHECK
        // ========================================
        
        if (hasLowConfidence(decision)) {
          console.log(`⚠️ Low confidence (${decision.confidence}%) - asking for clarification`);
          decision = createClarificationDecision(decision, currentState);
        } else {
          // ========================================
          // STEP 4b: VALIDATION CHECK
          // ========================================
          
          const validation = await validateAIDecision(
            decision,
            currentContext,
            input.workspaceId
          );
          
          if (!validation.valid) {
            console.log(`❌ Validation failed: ${validation.error}`);
            decision = createValidationErrorDecision(validation, currentState);
          }
        }
        
        return await executeDecision(
          decision,
          input,
          conversation,
          supabase,
          settings
        );
      } catch (error) {
        console.error('❌ AI Director failed:', error);
        
        // Rollback context on error (context wasn't modified yet, but good practice)
        currentContext = previousContext;
        
        // Send user-friendly fallback message
        const fallbackMessage = "দুঃখিত, আমাদের একটা technical সমস্যা হয়েছে। একটু পরে আবার try করুন। 🙏";
        
        // Skip Facebook API call in test mode
        if (!input.isTestMode) {
          await sendMessage(
            input.pageId,
            input.customerPsid,
            fallbackMessage
          );
        }
        
        // Log bot's fallback message
        await supabase.from('messages').insert({
          conversation_id: conversation.id,
          sender: 'bot',
          message_text: fallbackMessage,
          message_type: 'text',
          created_at: new Date().toISOString(),
        });
        
        console.log('✅ Sent fallback message to user');
        return {
          response: fallbackMessage,
          newState: currentState,
          updatedContext: currentContext
        };
      }
    }
    
    // ========================================
    // FALLBACK: NO TEXT AND NO IMAGE
    // ========================================
    
    console.log('⚠️ No text or image - sending help message');
    
    const fallbackDecision: AIDirectorDecision = {
      action: 'SHOW_HELP',
      response: '👋 Hi! Send me a product image or tell me what you\'re looking for!',
      confidence: 100,
    };
    
    return await executeDecision(
      fallbackDecision,
      input,
      conversation,
      supabase,
      settings
    );
    
  } catch (error) {
    console.error('❌ Orchestrator error:', error);
    
    // Send error message to user (skip in test mode)
    if (!input.isTestMode) {
      await sendMessage(
        input.pageId,
        input.customerPsid,
        'দুঃখিত! কিছু একটা সমস্যা হয়েছে। 😔 আবার চেষ্টা করুন।'
      );
    }
    
    throw error;
  } finally {
    const duration = Date.now() - startTime;
    console.log(`\n⏱️ Orchestrator completed in ${duration}ms\n`);
  }
}

// ============================================
// DECISION EXECUTION
// ============================================

/**
 * Executes an AI Director decision
 * 
 * This function handles all 9 action types and performs the necessary
 * database operations and API calls.
 */
async function executeDecision(
  decision: AIDirectorDecision,
  input: ProcessMessageInput,
  conversation: any,
  supabase: any,
  settings: WorkspaceSettings
): Promise<ProcessMessageResult> {
  console.log(`\n🎬 EXECUTING DECISION: ${decision.action}`);
  console.log(`Confidence: ${decision.confidence}%`);
  if (decision.reasoning) {
    console.log(`Reasoning: ${decision.reasoning}`);
  }
  
  let response = decision.response;
  let newState = decision.newState || conversation.current_state;
  let updatedContext = { ...conversation.context, ...decision.updatedContext };
  let orderCreated = false;
  let orderNumber: string | undefined;
  let productCard: any = undefined;
  
  // Execute action
  switch (decision.action) {
    case 'SEND_RESPONSE':
      // Just send the response (no state change)
      console.log('📤 Sending response...');
      break;
    
    case 'TRANSITION_STATE':
      // Change state
      console.log(`🔄 Transitioning state: ${conversation.current_state} → ${newState}`);
      break;
    
    case 'ADD_TO_CART':
      // Add product to cart
      console.log('🛒 Adding to cart...');
      if (decision.actionData?.productId) {
        const { addToCart } = await import('@/types/conversation');
        updatedContext.cart = addToCart(updatedContext.cart || [], {
          productId: decision.actionData.productId,
          productName: decision.actionData.productName || 'Product',
          productPrice: decision.actionData.productPrice || 0,
          quantity: decision.actionData.quantity || 1,
        });
      }
      break;
    
    case 'REMOVE_FROM_CART':
      // Remove product from cart
      console.log('🗑️ Removing from cart...');
      if (decision.actionData?.productId) {
        const { removeFromCart } = await import('@/types/conversation');
        updatedContext.cart = removeFromCart(
          updatedContext.cart || [],
          decision.actionData.productId
        );
      }
      break;
    
    case 'UPDATE_CHECKOUT':
      // Update checkout information
      console.log('📝 Updating checkout info...');
      if (decision.actionData) {
        // Calculate delivery charge based on address and settings
        let deliveryCharge = decision.actionData.deliveryCharge;
        if (decision.actionData.customerAddress) {
          deliveryCharge = getDeliveryCharge(decision.actionData.customerAddress, settings);
          console.log(`📦 Calculated delivery charge: ৳${deliveryCharge}`);
        }
        
        updatedContext.checkout = {
          ...updatedContext.checkout,
          customerName: decision.actionData.customerName || updatedContext.checkout?.customerName,
          customerPhone: decision.actionData.customerPhone || updatedContext.checkout?.customerPhone,
          customerAddress: decision.actionData.customerAddress || updatedContext.checkout?.customerAddress,
          deliveryCharge: deliveryCharge || updatedContext.checkout?.deliveryCharge,
          totalAmount: decision.actionData.totalAmount || updatedContext.checkout?.totalAmount,
        };
      }
      break;
    
    case 'CREATE_ORDER':
      // Create order in database
      console.log('📦 Creating order...');
      
      if (input.isTestMode) {
        console.log('🧪 Test mode: Skipping DB insert for order');
        // Generate fake order number for simulation
        const timestamp = Date.now().toString().slice(-4);
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        orderNumber = `TEST-${timestamp}${random}`;
      } else {
        orderNumber = await createOrderInDb(
          supabase,
          input.workspaceId,
          input.fbPageId,
          input.conversationId,
          updatedContext
        );
      }
      
      orderCreated = true;
      
      // Replace PENDING with actual order number in response
      response = response.replace('PENDING', orderNumber);
      
      // Add payment instructions if configured
      if (settings.paymentMessage) {
        response += '\n\n' + settings.paymentMessage;
      }
      
      // Reset cart and checkout after order
      updatedContext.cart = [];
      updatedContext.checkout = {};
      newState = 'IDLE';
      break;
    
    case 'SEARCH_PRODUCTS':
      // Search for products and send product cards
      console.log('🔍 Searching products...');
      if (decision.actionData?.searchQuery) {
        const products = await searchProducts(
          decision.actionData.searchQuery,
          input.workspaceId,
          supabase
        );
        
        if (products.length === 0) {
          response = `দুঃখিত! "${decision.actionData.searchQuery}" পাওয়া যায়নি। 😔\n\nঅন্য কিছু খুঁজুন বা পণ্যের ছবি পাঠান!`;
        } else if (products.length === 1) {
          // Single product - send product card
          const product = products[0];
          
          // Skip Facebook API in test mode
          if (!input.isTestMode) {
            const { sendProductCard, sendMessage } = await import('@/lib/facebook/messenger');
            
            try {
              await sendProductCard(
                input.pageId,
                input.customerPsid,
                {
                  id: product.id,
                  name: product.name,
                  price: product.price,
                  imageUrl: product.image_urls?.[0] || '',
                  stock: product.stock_quantity || 0,
                }
              );
              console.log('✅ Product card sent for search result');
              
              // Send clarifying text
              await sendMessage(input.pageId, input.customerPsid, 'এটা কি আপনার পছন্দের পণ্য? 👆');
              response = '';
            } catch (error) {
              console.error('❌ Failed to send product card:', error);
              // Fallback to text
              response = `✅ পাওয়া গেছে: ${product.name}\n💰 মূল্য: ৳${product.price}\n\nঅর্ডার করতে চান? (YES/NO)`;
            }
          } else {
            // Test mode - set product card data
            productCard = {
              id: product.id,
              name: product.name,
              price: product.price,
              imageUrl: product.image_urls?.[0] || '',
              stock: product.stock_quantity || 0,
            };
            response = `✅ পাওয়া গেছে: ${product.name}\n💰 মূল্য: ৳${product.price}\n\nঅর্ডার করতে চান? (YES/NO)`;
          }
          
          // Add to cart and transition to CONFIRMING_PRODUCT
          updatedContext.cart = [{
            productId: product.id,
            productName: product.name,
            productPrice: product.price,
            quantity: 1,
            sizes: product.sizes || [],
            colors: product.colors || [],
          }];
          newState = 'CONFIRMING_PRODUCT';
        } else {
          // Multiple products - send carousel
          console.log(`📎 Found ${products.length} products, sending carousel...`);
          
          // Skip Facebook API in test mode
          if (!input.isTestMode) {
            const { sendProductCarousel, sendMessage } = await import('@/lib/facebook/messenger');
            
            try {
              const carouselProducts = products.slice(0, 5).map(p => ({
                id: p.id,
                name: p.name,
                price: p.price,
                imageUrl: p.image_urls?.[0] || '',
                stock: p.stock_quantity || 0,
              }));
              
              await sendProductCarousel(input.pageId, input.customerPsid, carouselProducts);
              console.log('✅ Product carousel sent');
              
              // Send follow-up text
              await sendMessage(input.pageId, input.customerPsid, `${products.length}টি পণ্য পেয়েছি! 👆 কোনটি পছন্দ করুন। 🛍️`);
              response = '';
            } catch (error) {
              console.error('❌ Failed to send carousel:', error);
              // Fallback to text list
              response = `${products.length}টি পণ্য পাওয়া গেছে:\n\n`;
              products.slice(0, 5).forEach((p, i) => {
                response += `${i + 1}. ${p.name} - ৳${p.price}\n`;
              });
              response += `\nকোন নম্বরটি চান বলুন!`;
            }
          } else {
            // Test mode - return text list
            response = `${products.length}টি পণ্য পাওয়া গেছে:\n\n`;
            products.slice(0, 5).forEach((p: any, i: number) => {
              response += `${i + 1}. ${p.name} - ৳${p.price}\n`;
            });
            response += `\nকোন নম্বরটি চান বলুন!`;
          }
        }
      }
      break;
    
    case 'SHOW_HELP':
      // Show help message
      console.log('❓ Showing help...');
      // Use custom greeting if available
      response = decision.response || settings.greeting || '👋 Hi! I can help you:\n\n🛍️ Find products (send photo or name)\n💰 Check prices\n📦 Place orders\n\nWhat would you like to do?';
      break;
    
    case 'RESET_CONVERSATION':
      // Reset to IDLE
      console.log('🔄 Resetting conversation...');
      newState = 'IDLE';
      updatedContext.cart = [];
      updatedContext.checkout = {};
      break;
    
    case 'SEND_PRODUCT_CARD':
      // Send product card with image using Facebook Generic Template
      console.log('🖼️ Sending product card...');
      if (decision.actionData?.product) {
        // Store product data for return
        productCard = decision.actionData.product;

        // Skip Facebook API in test mode
        if (!input.isTestMode) {
          const { sendProductCard, sendMessage } = await import('@/lib/facebook/messenger');
          
          try {
            await sendProductCard(
              input.pageId,
              input.customerPsid,
              decision.actionData.product
            );
            console.log('✅ Product card sent successfully');
            
            // Send follow-up text message (for multi-product batching)
            if (decision.response && decision.response.trim()) {
              await sendMessage(input.pageId, input.customerPsid, decision.response);
              console.log('✅ Follow-up message sent');
            }
            
            // Don't send additional text message - we already sent it
            response = '';
          } catch (error) {
            console.error('❌ Failed to send product card:', error);
            // Fallback to text-only message
            response = `✅ Found: ${decision.actionData.product.name}\n💰 Price: ৳${decision.actionData.product.price}\n\nWould you like to order this? (YES/NO)`;
          }
        } else {
          // In test mode, we still want to return the product card data
          // But we can also set a fallback text response just in case the frontend doesn't handle cards yet
          console.log('🧪 Test mode: Returning product card data');
          response = decision.response || `✅ Found: ${decision.actionData.product.name}\n💰 Price: ৳${decision.actionData.product.price}\n\nWould you like to order this? (YES/NO)`;
        }
      }
      break;
    
    case 'EXECUTE_SEQUENCE':
      // Execute multiple actions in sequence (Phase 2)
      console.log('🔄 Executing action sequence...');
      if (decision.sequence && decision.sequence.length > 0) {
        for (let i = 0; i < decision.sequence.length; i++) {
          const step: NonNullable<AIDirectorDecision['sequence']>[number] = decision.sequence[i];
          console.log(`  Step ${i + 1}/${decision.sequence.length}: ${step.action}`);
          
          // Execute each step's action
          switch (step.action) {
            case 'ADD_TO_CART':
              if (step.actionData) {
                const { addToCart } = await import('@/types/conversation');
                const cartIndex = step.actionData.cartIndex;
                const pendingImages = updatedContext.pendingImages || [];
                
                // If cartIndex is provided, use pending image at that index
                if (cartIndex !== undefined && pendingImages[cartIndex]) {
                  const pending = pendingImages[cartIndex];
                  if (pending.recognitionResult.success) {
                    updatedContext.cart = addToCart(updatedContext.cart || [], {
                      productId: pending.recognitionResult.productId || '',
                      productName: pending.recognitionResult.productName || 'Product',
                      productPrice: pending.recognitionResult.productPrice || 0,
                      quantity: step.actionData.quantity || 1,
                      selectedSize: step.actionData.selectedSize,
                      selectedColor: step.actionData.selectedColor,
                      sizes: pending.recognitionResult.sizes,
                      colors: pending.recognitionResult.colors,
                    });
                  }
                } else if (step.actionData.productId) {
                  // Direct product add
                  updatedContext.cart = addToCart(updatedContext.cart || [], {
                    productId: step.actionData.productId,
                    productName: step.actionData.productName || 'Product',
                    productPrice: step.actionData.productPrice || 0,
                    quantity: step.actionData.quantity || 1,
                    selectedSize: step.actionData.selectedSize,
                    selectedColor: step.actionData.selectedColor,
                  });
                }
              }
              break;
            
            case 'UPDATE_CHECKOUT':
              if (step.actionData) {
                // Handle cart item updates (size, color, quantity)
                if (step.actionData.cartIndex !== undefined && updatedContext.cart) {
                  const idx = step.actionData.cartIndex;
                  if (updatedContext.cart[idx]) {
                    if (step.actionData.selectedSize) {
                      updatedContext.cart[idx].selectedSize = step.actionData.selectedSize;
                    }
                    if (step.actionData.selectedColor) {
                      updatedContext.cart[idx].selectedColor = step.actionData.selectedColor;
                    }
                    if (step.actionData.quantity) {
                      updatedContext.cart[idx].quantity = step.actionData.quantity;
                    }
                  }
                }
                
                // Handle checkout info updates
                let deliveryCharge = step.actionData.deliveryCharge;
                if (step.actionData.customerAddress) {
                  deliveryCharge = getDeliveryCharge(step.actionData.customerAddress, settings);
                }
                
                updatedContext.checkout = {
                  ...updatedContext.checkout,
                  customerName: step.actionData.customerName || updatedContext.checkout?.customerName,
                  customerPhone: step.actionData.customerPhone || updatedContext.checkout?.customerPhone,
                  customerAddress: step.actionData.customerAddress || updatedContext.checkout?.customerAddress,
                  deliveryCharge: deliveryCharge || updatedContext.checkout?.deliveryCharge,
                };
              }
              break;
            
            case 'REMOVE_FROM_CART':
              if (step.actionData?.productId) {
                const { removeFromCart } = await import('@/types/conversation');
                updatedContext.cart = removeFromCart(
                  updatedContext.cart || [],
                  step.actionData.productId
                );
              }
              break;
            
            default:
              console.log(`  ⚠️ Sequence step action not implemented: ${step.action}`);
          }
          
          // Apply step's context updates
          if (step.updatedContext) {
            updatedContext = { ...updatedContext, ...step.updatedContext };
          }
          
          // Apply step's new state (last step's state wins)
          if (step.newState) {
            newState = step.newState;
          }
        }
        
        // Clear pending images after processing sequence (if cart items were added)
        if (updatedContext.cart && updatedContext.cart.length > 0) {
          updatedContext.pendingImages = [];
        }
        
        console.log(`✅ Sequence complete. Cart: ${updatedContext.cart?.length || 0} items`);
      }
      break;
    
    default:
      console.warn(`⚠️ Unknown action: ${decision.action}`);
  }
  
  // ========================================
  // SAVE STATE AND SEND RESPONSE
  // ========================================
  
  // Update conversation in database
  await updateContextInDb(
    supabase,
    input.conversationId,
    newState,
    updatedContext,
    updatedContext.checkout?.customerName || conversation.customer_name
  );
  
  // Send response to user (only if not empty - product cards are sent separately)
  if (response) {
    // Inject payment number if placeholder exists
    // Inject payment details if placeholder exists
    if (response.includes('{{PAYMENT_NUMBER}}') || response.includes('{{PAYMENT_DETAILS}}')) {
      const methods = [];
      
      if (settings.paymentMethods?.bkash?.enabled) {
        methods.push(`📱 bKash: ${settings.paymentMethods.bkash.number}`);
      }
      
      if (settings.paymentMethods?.nagad?.enabled) {
        methods.push(`📱 Nagad: ${settings.paymentMethods.nagad.number}`);
      }
      
      if (settings.paymentMethods?.cod?.enabled) {
        methods.push(`🚚 Cash on Delivery Available`);
      }
      
      // Fallback if nothing enabled (shouldn't happen usually)
      if (methods.length === 0) {
        methods.push(`📱 bKash/Nagad: 01915969330`);
      }
      
      const paymentDetails = methods.join('\n');
      
      // Replace both old and new placeholders
      response = response
        .replace('{{PAYMENT_NUMBER}}', paymentDetails)
        .replace('{{PAYMENT_DETAILS}}', paymentDetails);
    }

    // Skip Facebook API call in test mode
    if (!input.isTestMode) {
      await sendMessage(input.pageId, input.customerPsid, response);
    } else {
      console.log('🧪 Test mode: Skipping Facebook API call');
    }
    
    // Log bot message
    await supabase.from('messages').insert({
      conversation_id: input.conversationId,
      sender: 'bot',
      message_text: response,
      message_type: 'text',
    });
  }
  
  console.log(`✅ Decision executed successfully`);
  
  return {
    response,
    newState,
    updatedContext,
    orderCreated,
    orderNumber,
    productCard,
  };
}

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Handles image messages by calling image recognition
 * 
 * NEW: Multi-image batching support
 * - Each image is recognized and added to pendingImages queue
 * - User has 5 minutes to send more images
 * - On text message or timeout, bot prompts for batch confirmation
 */
async function handleImageMessage(
  imageUrl: string,
  currentState: ConversationState,
  currentContext: ConversationContext,
  workspaceId: string,
  messageText?: string
): Promise<AIDirectorDecision> {
  try {
    console.log('🖼️ Calling image recognition API...');
    
    // Note: addPendingImage, MAX_PENDING_IMAGES, PendingImage are imported at top of file
    
    // Call image recognition API
    const formData = new FormData();
    formData.append('imageUrl', imageUrl);
    formData.append('workspaceId', workspaceId);
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/image-recognition`, {
      method: 'POST',
      body: formData,
    });
    
    const imageRecognitionResult = await response.json();
    
    const now = Date.now();
    const BATCH_WINDOW_MS = 5 * 60 * 1000; // 5 minutes
    
    // Get pending images, but CLEAR them if batch window has expired
    let pendingImages = currentContext.pendingImages || [];
    const lastImageTime = currentContext.lastImageReceivedAt || 0;
    
    // If more than 5 minutes since last image, treat as new batch (clear old pending images)
    if (pendingImages.length > 0 && (now - lastImageTime) > BATCH_WINDOW_MS) {
      console.log('⏰ Batch window expired - clearing old pending images');
      pendingImages = [];
    }
    
    // Create pending image entry
    const newPendingImage: PendingImage = {
      url: imageUrl,
      timestamp: now,
      recognitionResult: {
        success: imageRecognitionResult.success && !!imageRecognitionResult.match,
        productId: imageRecognitionResult.match?.product?.id,
        productName: imageRecognitionResult.match?.product?.name,
        productPrice: imageRecognitionResult.match?.product?.price,
        imageUrl: imageRecognitionResult.match?.product?.image_urls?.[0],
        confidence: imageRecognitionResult.match?.confidence,
        tier: imageRecognitionResult.match?.tier,
        sizes: imageRecognitionResult.match?.product?.sizes,
        colors: imageRecognitionResult.match?.product?.colors,
      },
    };
    
    // Check if product was recognized
    if (!imageRecognitionResult.success || !imageRecognitionResult.match) {
      console.log('❌ Product not found in image');
      
      return {
        action: 'SEND_RESPONSE',
        response: 'Sorry, I couldn\'t recognize this product. 😔\n\nTry:\n📸 Taking a clearer photo\n💬 Telling me the product name\n\nExample: "Red Saree" or "Polo T-shirt"',
        confidence: 100,
        reasoning: 'Image recognition failed',
      };
    }
    
    const product = imageRecognitionResult.match.product;
    console.log(`✅ Product found: ${product.name}`);
    
    // Add to pending images
    const { images: updatedPendingImages, wasLimited } = addPendingImage(pendingImages, newPendingImage);
    
    // Check if this is the first image (start of batch) or additional image
    const isFirstImage = pendingImages.length === 0;
    const imageCount = updatedPendingImages.filter(img => img.recognitionResult.success).length;
    
    // Build response message
    let responseMessage: string;
    
    if (wasLimited) {
      // Already at max images - Bangla instructions, English keywords
      responseMessage = `⚠️ আরো স্ক্রিনশটের জন্য প্রথমে এগুলো অর্ডার করুন!\n\n` +
        `✅ সব অর্ডার করতে "all" লিখুন\n` +
        `🔢 নির্দিষ্ট গুলো: "1 and 3" লিখুন\n` +
        `❌ বাতিল করতে "cancel" লিখুন`;
    } else if (isFirstImage) {
      // First image - Bangla instructions, English keywords
      responseMessage = `👆 এই প্রোডাক্ট অর্ডার করতে:\n` +
        `   🔘 "Order Now" বাটনে ক্লিক করুন\n` +
        `   ✍️ অথবা "order" লিখুন\n\n` +
        `📸 একাধিক প্রোডাক্ট অর্ডার করতে?\n` +
        `   আরো স্ক্রিনশট পাঠান`;
    } else {
      // Additional image - Bangla instructions, English keywords
      responseMessage = `✅ ${imageCount}টা প্রোডাক্ট সিলেক্ট হয়েছে!\n\n` +
        `📸 আরো পাঠাতে পারেন\n\n` +
        `✅ সব অর্ডার করতে "all" লিখুন\n` +
        `🔢 নির্দিষ্ট গুলো: "1 and 2" লিখুন\n` +
        `❌ বাতিল করতে "cancel" লিখুন`;
    }
    
    // Return decision with SEND_PRODUCT_CARD action (shows Facebook template)
    // The response field contains the follow-up batch prompt text
    
    // CRITICAL: Use different state based on image count
    // - Single image (1): CONFIRMING_PRODUCT (handles YES/NO)
    // - Multiple images (2+): SELECTING_CART_ITEMS (handles "সবগুলো"/"all", numbers)
    const newState = imageCount > 1 ? 'SELECTING_CART_ITEMS' : 'CONFIRMING_PRODUCT';
    
    // CRITICAL FIX: For single image, add product to cart immediately
    // This allows "order"/"yes" to work without needing button click
    const cartForSingleImage = imageCount === 1 ? [{
      productId: product.id,
      productName: product.name,
      productPrice: product.price,
      quantity: 1,
      sizes: product.sizes || [],
      colors: product.colors || [],
      stock: product.stock_quantity || 0,
    }] : currentContext.cart || [];
    
    return {
      action: 'SEND_PRODUCT_CARD',
      response: responseMessage, // Sent after product card
      actionData: {
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.image_urls?.[0] || '',
          stock: product.stock_quantity || 0,
          sizes: product.sizes || [],
          colors: product.colors || [],
        },
      },
      newState: newState,
      updatedContext: {
        ...currentContext,
        state: newState,
        cart: cartForSingleImage, // FIXED: Now cart is populated for single image
        pendingImages: updatedPendingImages,
        lastImageReceivedAt: now,
        metadata: {
          ...currentContext.metadata,
          lastImageUrl: imageUrl,
          lastProductId: product.id,
        },
      },
      confidence: imageRecognitionResult.match.confidence,
      reasoning: `Product card + ${imageCount > 1 ? 'selection prompt' : 'confirmation prompt'} (${imageCount}/${MAX_PENDING_IMAGES})`,
    };
    
  } catch (error) {
    console.error('❌ Error in handleImageMessage:', error);
    
    return {
      action: 'SEND_RESPONSE',
      response: 'দুঃখিত! ছবি প্রসেস করতে সমস্যা হয়েছে। 😔 আবার চেষ্টা করুন।',
      confidence: 100,
      reasoning: 'Image processing error',
    };
  }
}

/**
 * Creates an order in the database with multiple items
 * - Creates 1 row in orders table (customer info, delivery, total)
 * - Creates N rows in order_items table (one per cart item)
 * - Deducts stock for each item
 */
async function createOrderInDb(
  supabase: any,
  workspaceId: string,
  fbPageId: number,
  conversationId: string,
  context: ConversationContext
): Promise<string> {
  console.log('📦 Creating multi-item order in database...');
  
  const orderNumber = generateOrderNumber();
  const cart = context.cart || [];
  
  if (cart.length === 0) {
    throw new Error('No products in cart');
  }
  
  // Calculate totals
  const subtotal = cart.reduce((sum, item) => sum + (item.productPrice * item.quantity), 0);
  const deliveryCharge = context.checkout.deliveryCharge || context.deliveryCharge || 0;
  const totalAmount = subtotal + deliveryCharge;
  
  console.log(`🛒 Cart has ${cart.length} items, subtotal: ৳${subtotal}, total: ৳${totalAmount}`);
  
  // Use first product for legacy compatibility (orders table still has product_id column)
  const firstItem = cart[0];
  
  // Create order row
  const orderData = {
    workspace_id: workspaceId,
    fb_page_id: fbPageId,
    conversation_id: conversationId,
    product_id: firstItem.productId, // Legacy: first product
    customer_name: context.checkout.customerName || context.customerName,
    customer_phone: context.checkout.customerPhone || context.customerPhone,
    customer_address: context.checkout.customerAddress || context.customerAddress,
    product_price: subtotal, // Legacy: now stores subtotal
    delivery_charge: deliveryCharge,
    total_amount: totalAmount,
    order_number: orderNumber,
    status: 'pending',
    payment_status: 'unpaid',
    quantity: cart.reduce((sum, item) => sum + item.quantity, 0), // Total quantity
    product_image_url: firstItem.imageUrl || null,
    product_variations: cart.length > 1 
      ? { multi_product: true, item_count: cart.length }
      : ((firstItem as any).variations || null),
    payment_last_two_digits: context.checkout?.paymentLastTwoDigits || null,
    selected_size: cart.length === 1 ? ((firstItem as any).selectedSize || null) : null,
    selected_color: cart.length === 1 ? ((firstItem as any).selectedColor || null) : null,
  };
  
  // Insert order
  const { data: orderResult, error: orderError } = await supabase
    .from('orders')
    .insert(orderData)
    .select('id')
    .single();
  
  if (orderError) {
    console.error('❌ Error creating order:', orderError);
    throw orderError;
  }
  
  const orderId = orderResult.id;
  console.log(`✅ Order created with ID: ${orderId}`);
  
  // Insert order items
  const orderItems = cart.map(item => {
    const itemAny = item as any;
    return {
      order_id: orderId,
      product_id: item.productId,
      product_name: item.productName,
      product_price: item.productPrice,
      quantity: item.quantity,
      subtotal: item.productPrice * item.quantity,
      selected_size: itemAny.selectedSize || itemAny.variations?.size || null,
      selected_color: itemAny.selectedColor || itemAny.variations?.color || null,
      product_image_url: item.imageUrl || null,
    };
  });
  
  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);
  
  if (itemsError) {
    console.error('❌ Error creating order items:', itemsError);
    // Note: Order is already created, but items failed
    // In production, you'd want a transaction rollback here
  } else {
    console.log(`✅ Inserted ${orderItems.length} order items`);
  }
  
  // Deduct stock for each item
  let stockDeductedCount = 0;
  for (const item of cart) {
    try {
      const itemAny = item as any;
      const selectedSize = itemAny.selectedSize || itemAny.variations?.size;
      const orderQuantity = item.quantity || 1;
      
      // Fetch current product data
      const { data: product } = await supabase
        .from('products')
        .select('size_stock, stock_quantity')
        .eq('id', item.productId)
        .single();
      
      if (product) {
        if (selectedSize && product.size_stock && Array.isArray(product.size_stock)) {
          // Deduct from size-specific stock
          const updatedSizeStock = product.size_stock.map((ss: any) => {
            if (ss.size?.toUpperCase() === selectedSize.toUpperCase()) {
              return { ...ss, quantity: Math.max(0, (ss.quantity || 0) - orderQuantity) };
            }
            return ss;
          });
          
          const newTotalStock = updatedSizeStock.reduce((sum: number, ss: any) => sum + (ss.quantity || 0), 0);
          
          await supabase
            .from('products')
            .update({ 
              size_stock: updatedSizeStock,
              stock_quantity: newTotalStock
            })
            .eq('id', item.productId);
          
          console.log(`📉 Stock deducted for ${item.productName}: ${selectedSize} -${orderQuantity}`);
        } else {
          // Deduct from total stock
          const newStock = Math.max(0, (product.stock_quantity || 0) - orderQuantity);
          
          await supabase
            .from('products')
            .update({ stock_quantity: newStock })
            .eq('id', item.productId);
          
          console.log(`📉 Stock deducted for ${item.productName}: -${orderQuantity}`);
        }
        stockDeductedCount++;
      }
    } catch (stockError) {
      console.error(`⚠️ Error deducting stock for ${item.productName}:`, stockError);
    }
  }
  
  console.log(`✅ Stock updated for ${stockDeductedCount} products`);
  console.log(`✅ Order created: ${orderNumber}`);
  return orderNumber;
}

/**
 * Updates conversation context in database
 */
async function updateContextInDb(
  supabase: any,
  conversationId: string,
  newState: ConversationState,
  updatedContext: ConversationContext,
  customerName?: string
): Promise<void> {
  console.log('💾 Updating conversation context...');
  
  const { error } = await supabase
    .from('conversations')
    .update({
      current_state: newState,
      context: updatedContext,
      customer_name: customerName,
      last_message_at: new Date().toISOString(),
    })
    .eq('id', conversationId);
  
  if (error) {
    console.error('❌ Error updating context:', error);
    throw error;
  }
  
  console.log('✅ Context updated');
}

/**
 * Searches for products by keywords
 */
async function searchProducts(
  query: string,
  workspaceId: string,
  supabase: any
): Promise<any[]> {
  console.log(`🔍 Searching for: "${query}"`);
  
  const { searchProductsByKeywords } = await import('@/lib/db/products');
  const products = await searchProductsByKeywords(query, workspaceId);
  
  console.log(`✅ Found ${products.length} products`);
  return products;
}
