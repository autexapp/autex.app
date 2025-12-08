# 🧪 AI Director & Conversational Bot - Detailed Test Plan

This document outlines the manual test scenarios to verify the full functionality of the Autex AI Chatbot, including the new AI Director (Agent Mode), Fast Lane pattern matching, and safety mechanisms.



## 🚀 Part 1: Fast Lane (Tier 1) Verification

**Goal:** Ensure simple, high-frequency inputs are handled instantly without AI inference (0 cost, low latency).

| Scenario ID | User Input | Expected State | Handling Process |
|-------------|------------|----------------|------------------|
| **FL-01** | `ji`, `ha`, `yes` (Response to "Confirm Order?") | `COLLECTING_NAME` | **Fast Lane** (Regex Match) |
| **FL-02** | `na`, `no`, `cancel` (During checkout) | `IDLE` (Reset) | **Fast Lane** (Regex Match) |
| **FL-03** | `01712345678` (Valid Phone) | `COLLECTING_ADDRESS` | **Fast Lane** (Phone Validator) |
| **FL-04** | `cancel` (Anytime) | `IDLE` | **Fast Lane** (Keyword) |
| **FL-05** | `all`, `sob` (Selecting items) | `COLLECTING_NAME` | **Fast Lane** (Cart Selection) |

**Verification:** Check logs for `⚡ Fast Lane Matched!`

---

## 🧠 Part 2: AI Director - Complex Logic (Phase 1)

**Goal:** Verify the AI handles complex, non-standard inputs and validates them correctly.

| Scenario ID | Test Case | User Input | Expected AI Behavior |
|-------------|-----------|------------|----------------------|
| **AI-01** | **Implicit Confirmation** | "Thik ache, order dao" | Action: `TRANSITION_STATE` -> `COLLECTING_NAME` |
| **AI-02** | **Mid-Flow Question** | (At Name Step) "Delivery charge koto?" | Action: `SEND_RESPONSE` <br>Msg: Answers charge + Re-prompts for Name |
| **AI-03** | **Banglish Handling** | "Bhai eta ki bhalo hobe?" | Action: `SEND_RESPONSE` <br>Msg: Reassuring answer (in Bangla/Banglish) |
| **AI-04** | **Ambiguous Input** | "eta" | Action: `SEND_RESPONSE` (Clarification) <br>Msg: "Which one do you mean?" |
| **AI-05** | **Low Confidence** | "asd fg hjk" | Action: `SEND_RESPONSE` (Clarification) <br>Msg: "Sorry, I didn't understand." |

**Verification:** Check logs for `🧠 Calling AI Director...` and `confidence` score.

---

## 🔄 Part 3: Multi-Step Actions (Phase 2 - EXECUTE_SEQUENCE)

**Goal:** Verify the AI can perform multiple operations in a single turn.

| Scenario ID | Test Case | User Input | Expected Sequence |
|-------------|-----------|------------|-------------------|
| **SEQ-01** | **Multi-Cart Selection** | "1st ta L ar 3rd ta XL size dao" | 1. `ADD_TO_CART` (Index 0, Size L)<br>2. `ADD_TO_CART` (Index 2, Size XL)<br>3. `TRANSITION` -> `COLLECTING_NAME` |
| **SEQ-02** | **Full Info Dump** | "My name is Karim, 01712345678, Mirpur 12" | 1. `UPDATE_CHECKOUT` (Name)<br>2. `UPDATE_CHECKOUT` (Phone)<br>3. `UPDATE_CHECKOUT` (Address)<br>4. `TRANSITION` -> `CONFIRMING_ORDER` |
| **SEQ-03** | **Change & Add** | "Size XL koro ar 2 ta dao" | 1. `UPDATE_CHECKOUT` (Size XL)<br>2. `UPDATE_CHECKOUT` (Qty 2) |

**Verification:** Check logs for `🔄 Executing action sequence...` and multiple steps running.

---

## 🛠️ Part 4: Agent Mode Tools (Phase 3 - Real Data)

**Goal:** Verify the AI uses the `agent-tools.ts` to check real database information.

| Scenario ID | Tool Used | User Input | Expected Behavior |
|-------------|-----------|------------|-------------------|
| **TL-01** | `checkStock` | "Blue Polo stock e ache?" | 1. **AI Action**: `CALL_TOOL` (checkStock, "Blue Polo")<br>2. **System**: Returns stock info<br>3. **AI Reply**: "Yes, we have 5 items in stock." |
| **TL-02** | `trackOrder` | "Order status koto? 01700000000" | 1. **AI Action**: `CALL_TOOL` (trackOrder, phone)<br>2. **System**: Returns order details<br>3. **AI Reply**: "Your order is Pending/Delivered." |
| **TL-03** | `calculateDelivery` | "Cumilla te delivery charge koto?" | 1. **AI Action**: `CALL_TOOL` (calculateDelivery, "Cumilla")<br>2. **System**: Returns ৳120<br>3. **AI Reply**: "Delivery charge to Cumilla is ৳120." |
| **TL-04** | `checkStock` | "NonexistentProduct stock ache?" | 1. **AI Action**: `CALL_TOOL`<br>2. **System**: "Not found"<br>3. **AI Reply**: "Sorry, we don't have that product." |

**Verification:** Check logs for `🛠️ AI Requesting Tool`, `✅ Tool Result`, and `[SYSTEM TOOL RESULT]` in history.

---

## 🛡️ Part 5: Safety & Validation

**Goal:** Ensure the system doesn't break or hallucinate invalid data.

| Scenario ID | Test Case | User Input | Expected Behavior |
|-------------|-----------|------------|-------------------|
| **VAL-01** | **Invalid Phone** | "My phone is 123" | **AI**: Might try `UPDATE_CHECKOUT`<br>**Validator**: Rejects (Invalid Phone)<br>**Result**: User sees "Please provide a valid 11-digit number." |
| **VAL-02** | **Hallucinated Product** | "Add iPhone 15 to cart" | **AI**: Tries `ADD_TO_CART` (ID: ???)<br>**Validator**: Rejects (Product not found)<br>**Result**: "Sorry, that product is not available." |
| **VAL-03** | **Empty Order** | "Create order" (with empty cart) | **Validator**: Rejects (Cart empty)<br>**Result**: "Your cart is empty. Please select a product first." |

---

## 🧪 How to Run Tests

1.  **Open the Embedded Chat Widget**:
    - Go to `/dashboard/conversations` (or Preview Chat in Settings).
    - Use the simulated chat interface.

2.  **Monitor Server Logs**:
    - Watch the terminal running `pnpm dev`.
    - Look for the emojis:
      - `⚡` = Fast Lane
      - `🧠` = AI Director
      - `🔄` = Sequence
      - `🛠️` = Tool Call
      - `❌` = Validation Error

3.  **Verify Database**:
    - Check `orders` table to see if orders are created correctly.
    - Check `api_usage` to see if AI calls are logged and costed.

---
