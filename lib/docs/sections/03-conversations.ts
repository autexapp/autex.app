import { DocSection } from '../types';

export const conversationsSection: DocSection = {
  id: 'conversations',
  slug: 'conversations',
  order: 3,
  title: {
    en: 'Conversations',
    bn: 'কথোপকথন'
  },
  icon: '💬',
  articles: [
    {
      id: 'conversation-overview',
      slug: 'overview',
      order: 1,
      title: { en: 'Conversations Overview', bn: 'Conversations Overview' },
      summary: {
        en: 'Understanding your conversation dashboard',
        bn: 'Conversation dashboard বোঝা'
      },
      content: {
        en: `# Conversations Overview

The Conversations page is where you see all customer chats and can take control when needed.

## 📱 The Layout

The page has two main sections:

| Section | What It Shows |
|---------|---------------|
| **Left Panel** | List of all conversations |
| **Right Panel** | Selected conversation messages |

---

## 👥 Conversation List (Left Panel)

Each conversation shows:
- **Customer name** (or Facebook name)
- **Last message preview**
- **Time** of last message
- **Status indicator** (colored dot)
- **Needs Reply badge** (if waiting for response)

### Status Colors

| Color | Meaning |
|-------|---------|
| 🟢 Green | Order completed |
| 🟡 Yellow | In progress (collecting info) |
| ⚪ Gray | Idle (waiting for customer) |

---

## 💬 Message View (Right Panel)

When you select a conversation:
- See full message history
- Customer messages on left (gray bubbles)
- Bot messages on right (colored bubbles)
- Your manual messages marked differently

### Message Types

| Sender | Appearance |
|--------|------------|
| Customer | Gray bubble, left side |
| Bot | Blue bubble, right side |
| You (Manual) | Special badge "Owner" |

---

## 🔍 Finding Conversations

### Search
Type in the search bar to find by:
- Customer name
- Message content

### Filter
Use the filter dropdown:
- **All** — Everything
- **Needs Reply** — Waiting for attention
- **Active** — Currently in order flow

---

## ⚡ Quick Actions

From the conversation view, you can:
- **Send a message** to the customer
- **Change state** (override bot)
- **Switch control mode** (Bot/Manual/Hybrid)
- **View linked order** (if order exists)

---

## 💡 Tips

1. **Check "Needs Reply" daily** — Don't leave customers waiting
2. **Review bot conversations** — Make sure bot is responding well
3. **Jump in when needed** — Complex questions need human touch
`,
        bn: `# Conversations Overview

Conversations page এ আপনি সব customer chats দেখতে পারেন আর দরকার হলে control নিতে পারেন।

## 📱 Layout

Page এ দুইটা main section আছে:

| Section | কি দেখায় |
|---------|----------|
| **Left Panel** | সব conversations এর list |
| **Right Panel** | Selected conversation এর messages |

---

## 👥 Conversation List (Left Panel)

প্রতি conversation এ দেখায়:
- **Customer name** (বা Facebook name)
- **Last message preview**
- **Time** last message এর
- **Status indicator** (colored dot)
- **Needs Reply badge** (response এর wait করলে)

### Status Colors

| Color | Meaning |
|-------|---------|
| 🟢 Green | Order complete |
| 🟡 Yellow | In progress (info collect করছে) |
| ⚪ Gray | Idle (customer এর wait করছে) |

---

## 💬 Message View (Right Panel)

Conversation select করলে:
- Full message history দেখুন
- Customer messages বাম দিকে (gray bubbles)
- Bot messages ডান দিকে (colored bubbles)
- আপনার manual messages আলাদাভাবে marked

### Message Types

| Sender | Appearance |
|--------|------------|
| Customer | Gray bubble, left side |
| Bot | Blue bubble, right side |
| আপনি (Manual) | Special badge "Owner" |

---

## 🔍 Conversations খুঁজুন

### Search
Search bar এ লিখুন:
- Customer name
- Message content

### Filter
Filter dropdown use করুন:
- **All** — সব কিছু
- **Needs Reply** — Attention দরকার
- **Active** — Currently order flow এ

---

## ⚡ Quick Actions

Conversation view থেকে আপনি পারেন:
- Customer কে **message পাঠান**
- **State change করুন** (bot override)
- **Control mode switch করুন** (Bot/Manual/Hybrid)
- **Linked order দেখুন** (order থাকলে)

---

## 💡 Tips

1. **Daily "Needs Reply" check করুন** — Customers কে wait করাবেন না
2. **Bot conversations review করুন** — Bot ঠিকমত respond করছে কিনা দেখুন
3. **দরকার হলে jump in করুন** — Complex questions এ human touch দরকার
`
      }
    },
    {
      id: 'conversation-states',
      slug: 'states',
      order: 2,
      title: { en: 'Order Collection States', bn: 'Order Collection এর ধাপসমূহ' },
      content: {
        en: `# Order Collection States

Every conversation goes through specific states as the bot collects order information.

## 📊 The States

| State | Icon | What's Happening |
|-------|------|------------------|
| **IDLE** | 🔄 | No active order. Waiting for customer. |
| **CONFIRMING_PRODUCT** | 📸 | Product found, asking customer to confirm |
| **COLLECTING_NAME** | 👤 | Asking for customer's name |
| **COLLECTING_PHONE** | 📱 | Asking for phone number |
| **COLLECTING_ADDRESS** | 📍 | Asking for delivery address |
| **CONFIRMING_ORDER** | ✅ | Final confirmation before creating order |

---

## 🔄 The Flow

\`\`\`
Customer sends image or message
        ↓
   📸 CONFIRMING_PRODUCT
   "Is this what you want?"
        ↓ (Customer says yes)
   👤 COLLECTING_NAME
   "What is your name?"
        ↓
   📱 COLLECTING_PHONE  
   "Your phone number?"
        ↓
   📍 COLLECTING_ADDRESS
   "Where should we deliver?"
        ↓
   ✅ CONFIRMING_ORDER
   "Please confirm your order"
        ↓ (Customer confirms)
   🔄 IDLE (Order created!)
\`\`\`

---

## 👁️ Viewing Current State

1. Go to **Conversations**
2. Select a conversation
3. Look at the **header area**
4. Current state shown as a badge

---

## 🔀 When States Change

| Trigger | What Happens |
|---------|--------------|
| Customer sends product photo | → CONFIRMING_PRODUCT |
| Customer says "yes" to product | → COLLECTING_NAME |
| Customer gives name | → COLLECTING_PHONE |
| Customer gives phone | → COLLECTING_ADDRESS |
| Customer gives address | → CONFIRMING_ORDER |
| Customer confirms order | Order created! → IDLE |
| Customer says "cancel" | → IDLE (reset) |

---

## ⚠️ When Bot Gets Stuck

Sometimes the bot can't understand a response. Signs:
- Keeps asking the same question
- Customer is frustrated
- State doesn't change

**Solution:** Use Manual State Override (see next article).
`,
        bn: `# Order Collection এর ধাপসমূহ

Bot order information collect করার সময় প্রতিটা conversation specific states এর মধ্য দিয়ে যায়।

## 📊 States

| State | Icon | কি হচ্ছে |
|-------|------|----------|
| **IDLE** | 🔄 | কোনো active order নেই। Customer এর wait করছে। |
| **CONFIRMING_PRODUCT** | 📸 | Product পাওয়া গেছে, customer কে confirm করতে বলছে |
| **COLLECTING_NAME** | 👤 | Customer এর নাম জিজ্ঞেস করছে |
| **COLLECTING_PHONE** | 📱 | Phone number জিজ্ঞেস করছে |
| **COLLECTING_ADDRESS** | 📍 | Delivery address জিজ্ঞেস করছে |
| **CONFIRMING_ORDER** | ✅ | Order create করার আগে final confirmation |

---

## 🔄 Flow

\`\`\`
Customer image বা message পাঠায়
        ↓
   📸 CONFIRMING_PRODUCT
   "এটা কি চান?"
        ↓ (Customer yes বলে)
   👤 COLLECTING_NAME
   "আপনার নাম কি?"
        ↓
   📱 COLLECTING_PHONE  
   "Phone number দিন"
        ↓
   📍 COLLECTING_ADDRESS
   "কোথায় deliver করব?"
        ↓
   ✅ CONFIRMING_ORDER
   "Order confirm করুন"
        ↓ (Customer confirm করে)
   🔄 IDLE (Order created!)
\`\`\`

---

## 👁️ Current State দেখা

1. **Conversations** এ যান
2. একটা conversation select করুন
3. **Header area** দেখুন
4. Current state badge হিসেবে দেখাবে

---

## 🔀 কখন States Change হয়

| Trigger | কি হয় |
|---------|--------|
| Customer product photo পাঠায় | → CONFIRMING_PRODUCT |
| Customer product এ "yes" বলে | → COLLECTING_NAME |
| Customer name দেয় | → COLLECTING_PHONE |
| Customer phone দেয় | → COLLECTING_ADDRESS |
| Customer address দেয় | → CONFIRMING_ORDER |
| Customer order confirm করে | Order created! → IDLE |
| Customer "cancel" বলে | → IDLE (reset) |

---

## ⚠️ Bot Stuck হলে

কখনো কখনো bot response বুঝতে পারে না। Signs:
- একই question বারবার করছে
- Customer frustrated
- State change হচ্ছে না

**Solution:** Manual State Override use করুন (পরের article দেখুন)।
`
      }
    },
    {
      id: 'manual-override',
      slug: 'manual-override',
      order: 3,
      title: { en: 'Manual State Override', bn: 'ম্যানুয়াল State পরিবর্তন' },
      content: {
        en: `# Manual State Override

When the bot gets stuck or confused, you can manually change the conversation state.

## 🔧 How to Override State

### Step 1: Select Conversation
Go to **Conversations** and click on the stuck conversation.

### Step 2: Find State Dropdown
Look in the conversation header for the state dropdown menu.

### Step 3: Select New State
Click and choose the state you want:
- **IDLE** — Reset everything
- **COLLECTING_NAME** — Start from name
- **COLLECTING_PHONE** — Start from phone
- **COLLECTING_ADDRESS** — Start from address

### Step 4: Confirm If Needed
If resetting to IDLE, you'll see a warning:

> ⚠️ **Warning:** This will clear the cart and all customer data. Are you sure?

---

## 📋 What Each State Clears

| New State | What Gets Cleared |
|-----------|-------------------|
| **IDLE** | Everything — cart, name, phone, address |
| **COLLECTING_NAME** | Name, phone, address (keeps product) |
| **COLLECTING_PHONE** | Phone, address (keeps name) |
| **COLLECTING_ADDRESS** | Address only |

---

## 🎯 When to Use Override

| Situation | Action |
|-----------|--------|
| Bot keeps asking same question | Change to next state |
| Customer wants to start over | Reset to IDLE |
| Customer gave wrong info | Go back to that state |
| Bot picked wrong product | Reset to IDLE |
| Customer already gave phone in message | Skip to COLLECTING_ADDRESS |

---

## 💡 Tips

1. **Send a message after override** — Explain to customer
2. **Don't overuse** — Let bot handle most cases
3. **Check the context** — Understand why bot got stuck
4. **Use for training** — Note what confused the bot

---

## 📝 Example Scenario

**Problem:** Customer wrote their name and phone together, but bot only caught name.

**Solution:**
1. You see bot is asking for phone
2. But customer already gave it
3. Override to COLLECTING_ADDRESS
4. Bot now asks for address instead!
`,
        bn: `# ম্যানুয়াল State পরিবর্তন

Bot stuck বা confused হলে, আপনি manually conversation state change করতে পারেন।

## 🔧 State Override করবেন কিভাবে

### Step 1: Conversation Select করুন
**Conversations** এ যান আর stuck conversation এ click করুন।

### Step 2: State Dropdown খুঁজুন
Conversation header এ state dropdown menu খুঁজুন।

### Step 3: নতুন State Select করুন
Click করে আপনার চাওয়া state choose করুন:
- **IDLE** — সব reset
- **COLLECTING_NAME** — Name থেকে শুরু
- **COLLECTING_PHONE** — Phone থেকে শুরু
- **COLLECTING_ADDRESS** — Address থেকে শুরু

### Step 4: দরকার হলে Confirm করুন
IDLE তে reset করলে, warning দেখবেন:

> ⚠️ **Warning:** এটা cart আর সব customer data clear করে দেবে। Sure?

---

## 📋 প্রতি State এ কি Clear হয়

| New State | কি Clear হয় |
|-----------|-------------|
| **IDLE** | সব কিছু — cart, name, phone, address |
| **COLLECTING_NAME** | Name, phone, address (product থাকে) |
| **COLLECTING_PHONE** | Phone, address (name থাকে) |
| **COLLECTING_ADDRESS** | শুধু Address |

---

## 🎯 কখন Override Use করবেন

| Situation | Action |
|-----------|--------|
| Bot একই question বারবার করছে | পরের state এ change করুন |
| Customer শুরু থেকে করতে চায় | IDLE তে reset করুন |
| Customer wrong info দিয়েছে | সেই state এ back যান |
| Bot wrong product pick করেছে | IDLE তে reset করুন |
| Customer message এ phone দিয়ে দিয়েছে | COLLECTING_ADDRESS এ skip করুন |

---

## 💡 Tips

1. **Override এর পর message পাঠান** — Customer কে explain করুন
2. **বেশি use করবেন না** — বেশিরভাগ case bot handle করুক
3. **Context check করুন** — বুঝুন কেন bot stuck হয়েছে
4. **Training এর জন্য use করুন** — Note করুন কি bot কে confuse করেছে

---

## 📝 Example Scenario

**Problem:** Customer নাম আর phone একসাথে লিখেছে, কিন্তু bot শুধু নাম ধরেছে।

**Solution:**
1. দেখলেন bot phone জিজ্ঞেস করছে
2. কিন্তু customer আগেই দিয়ে দিয়েছে
3. COLLECTING_ADDRESS এ override করুন
4. Bot এখন address জিজ্ঞেস করবে!
`
      }
    },
    {
      id: 'control-modes',
      slug: 'control-modes',
      order: 4,
      title: { en: 'Bot Control Modes', bn: 'Bot Control Modes' },
      summary: {
        en: 'Bot, Manual, and Hybrid modes explained',
        bn: 'Bot, Manual, এবং Hybrid modes এর ব্যাখ্যা'
      },
      content: {
        en: `# Bot Control Modes

Control how the bot handles each conversation. Switch between automatic and manual control.

## 🎮 The Three Modes

| Mode | Icon | How It Works |
|------|------|--------------|
| **Bot** | 🤖 | AI handles everything automatically |
| **Manual** | 👨‍💼 | You handle all messages. Bot is paused. |
| **Hybrid** | 🔄 | You replied, bot will resume after timeout |

---

## 🤖 Bot Mode (Default)

This is the default mode. The AI:
- Responds to all customer messages
- Follows the order collection flow
- Works 24/7 without your intervention

**Best for:** Normal operations, routine orders

---

## 👨‍💼 Manual Mode

You take full control. The bot:
- Does NOT respond to customer messages
- Waits for you to handle everything
- Stays manual until you switch back

**Best for:**
- Complex customer issues
- Complaints
- Special negotiations
- VIP customers

### How to Enable
1. Open the conversation
2. Find the control toggle in the header
3. Switch to **Manual**

---

## 🔄 Hybrid Mode (Automatic)

This happens automatically when you send a manual message:

1. You type a message to customer
2. Mode switches to **Hybrid** automatically
3. Bot pauses for **30 minutes**
4. If you don't send another message in 30 min, bot resumes

**Best for:**
- Quick interventions
- Answering one question then letting bot continue
- Temporary takeover

---

## 📊 Mode Indicators

Look for badges in the conversation:

| Badge | Meaning |
|-------|---------|
| 🤖 **Bot** | Fully automatic |
| 👨‍💼 **Manual** | You're in control |
| 🔄 **Hybrid** | Temporarily manual |
| ⏰ **Paused until...** | Shows when bot will resume |

---

## 💡 When to Use Each Mode

| Situation | Use |
|-----------|-----|
| Normal sales flow | 🤖 Bot |
| Customer has complex question | 🔄 Hybrid (reply once) |
| Negotiating price | 👨‍💼 Manual |
| Customer is angry | 👨‍💼 Manual |
| Testing the bot | 🤖 Bot |
| VIP customer wants personal touch | 👨‍💼 Manual |

---

## ⚠️ Important Notes

1. **Bot mode = 24/7 response** — Great for off-hours
2. **Manual mode = No response if you're offline** — Customer waits
3. **Hybrid auto-expires** — Bot takes over after 30 minutes
4. **Switching back to Bot** — You can do this anytime
`,
        bn: `# Bot Control Modes

প্রতি conversation bot কিভাবে handle করবে control করুন। Automatic আর manual control এ switch করুন।

## 🎮 তিনটা Modes

| Mode | Icon | কিভাবে কাজ করে |
|------|------|----------------|
| **Bot** | 🤖 | AI সব automatically handle করে |
| **Manual** | 👨‍💼 | আপনি সব messages handle করেন। Bot paused। |
| **Hybrid** | 🔄 | আপনি reply করেছেন, timeout এর পর bot resume করবে |

---

## 🤖 Bot Mode (Default)

এটা default mode। AI:
- সব customer messages এ respond করে
- Order collection flow follow করে
- আপনার intervention ছাড়া 24/7 কাজ করে

**Best for:** Normal operations, routine orders

---

## 👨‍💼 Manual Mode

আপনি full control নেন। Bot:
- Customer messages এ respond করে না
- সব কিছু আপনি handle করার wait করে
- আপনি switch back না করা পর্যন্ত manual থাকে

**Best for:**
- Complex customer issues
- Complaints
- Special negotiations
- VIP customers

### কিভাবে Enable করবেন
1. Conversation open করুন
2. Header এ control toggle খুঁজুন
3. **Manual** এ switch করুন

---

## 🔄 Hybrid Mode (Automatic)

আপনি manual message পাঠালে এটা automatically হয়:

1. আপনি customer কে message type করেন
2. Mode automatically **Hybrid** এ switch হয়
3. Bot **30 minutes** এর জন্য pause হয়
4. 30 min এ আরেকটা message না পাঠালে, bot resume করে

**Best for:**
- Quick interventions
- একটা question answer করে bot কে continue করতে দেওয়া
- Temporary takeover

---

## 📊 Mode Indicators

Conversation এ badges দেখুন:

| Badge | Meaning |
|-------|---------|
| 🤖 **Bot** | Fully automatic |
| 👨‍💼 **Manual** | আপনি control এ |
| 🔄 **Hybrid** | Temporarily manual |
| ⏰ **Paused until...** | কখন bot resume করবে দেখায় |

---

## 💡 কোন Mode কখন Use করবেন

| Situation | Use করুন |
|-----------|----------|
| Normal sales flow | 🤖 Bot |
| Customer এর complex question আছে | 🔄 Hybrid (একবার reply করুন) |
| Price negotiate করছেন | 👨‍💼 Manual |
| Customer angry | 👨‍💼 Manual |
| Bot test করছেন | 🤖 Bot |
| VIP customer personal touch চায় | 👨‍💼 Manual |

---

## ⚠️ Important Notes

1. **Bot mode = 24/7 response** — Off-hours এর জন্য great
2. **Manual mode = আপনি offline থাকলে response নেই** — Customer wait করে
3. **Hybrid auto-expire হয়** — 30 minutes পর bot take over করে
4. **Bot এ switch back করা** — যেকোনো সময় করতে পারেন
`
      },
      icon: '🎮'
    },
    {
      id: 'sending-messages',
      slug: 'sending-messages',
      order: 5,
      title: { en: 'Sending Manual Messages', bn: 'Manual Messages পাঠানো' },
      content: {
        en: `# Sending Manual Messages

Sometimes you need to personally respond to a customer. Here's how to send messages directly.

## ✉️ How to Send a Message

### Step 1: Open Conversation
Go to **Conversations** and select the customer you want to message.

### Step 2: Type Your Message
Find the message input box at the bottom of the conversation.

### Step 3: Send
Click the **Send** button or press **Enter**.

---

## 📝 What Happens When You Send

1. Your message goes to customer's Facebook Messenger
2. Conversation mode switches to **Hybrid**
3. Bot pauses for 30 minutes
4. Your message shows with an **"Owner"** badge

---

## 🎯 When to Send Manual Messages

| Situation | Example Message |
|-----------|-----------------|
| Answering complex question | "Yes, we do custom sizes. Please tell me your measurements." |
| Apologizing for issue | "Sorry for the delay. Your order will ship tomorrow!" |
| Special offer | "For you, I can give 10% discount. Would you like to order?" |
| Clarifying something | "Just to confirm, you want the blue one in size L, right?" |
| Following up | "Hi! Did you receive my message about your order?" |

---

## ✨ Message Tips

### Be Friendly
✅ "Hi [Name]! Thanks for your interest! 😊"
❌ "Yes."

### Be Clear
✅ "Your order will arrive in 2-3 days."
❌ "Soon."

### Be Helpful
✅ "We don't have that size, but I can suggest similar products!"
❌ "Out of stock."

---

## ⚠️ Important Notes

1. **Bot pauses when you message** — It won't interrupt you
2. **30 minute timeout** — Bot resumes if you don't send more
3. **Stay in Manual mode** — For longer conversations, switch to Manual
4. **Your messages are visible in history** — Customer can scroll back to read

---

## 💡 Pro Tips

- **Quick responses** — Don't leave customers waiting
- **Use emojis** — Makes messages friendlier 😊
- **Re-read before sending** — Avoid typos
- **Summarize at end** — "So, one Blue Polo in L, right?"
`,
        bn: `# Manual Messages পাঠানো

কখনো কখনো আপনাকে personally customer কে respond করতে হয়। এখানে দেখুন কিভাবে directly messages পাঠাবেন।

## ✉️ কিভাবে Message পাঠাবেন

### Step 1: Conversation Open করুন
**Conversations** এ যান আর যে customer কে message করতে চান select করুন।

### Step 2: Message Type করুন
Conversation এর নিচে message input box খুঁজুন।

### Step 3: Send করুন
**Send** button click করুন বা **Enter** press করুন।

---

## 📝 Message পাঠালে কি হয়

1. আপনার message customer এর Facebook Messenger এ যায়
2. Conversation mode **Hybrid** এ switch হয়
3. Bot 30 minutes এর জন্য pause হয়
4. আপনার message **"Owner"** badge সহ দেখায়

---

## 🎯 কখন Manual Message পাঠাবেন

| Situation | Example Message |
|-----------|-----------------|
| Complex question answer করা | "হ্যাঁ, custom sizes করি। আপনার measurement দিন।" |
| Issue এর জন্য sorry বলা | "Delay এর জন্য sorry। কাল ship করব!" |
| Special offer | "আপনার জন্য 10% discount দিতে পারি। Order করবেন?" |
| Clarify করা | "Confirm করি, blue টা L size এ চাচ্ছেন, right?" |
| Follow up | "Hi! Order এর message পেয়েছিলেন?" |

---

## ✨ Message Tips

### Friendly হন
✅ "Hi [Name]! Interest এর জন্য thanks! 😊"
❌ "হ্যাঁ।"

### Clear হন
✅ "আপনার order 2-3 দিনে পৌঁছাবে।"
❌ "শীঘ্রই।"

### Helpful হন
✅ "এই size নেই, কিন্তু similar products suggest করতে পারি!"
❌ "Stock নেই।"

---

## ⚠️ Important Notes

1. **Message করলে Bot pause হয়** — আপনাকে interrupt করবে না
2. **30 minute timeout** — আর message না করলে bot resume করে
3. **Manual mode এ থাকুন** — দীর্ঘ conversation এর জন্য Manual এ switch করুন
4. **Messages history তে visible** — Customer scroll করে পড়তে পারে

---

## 💡 Pro Tips

- **Quick responses** — Customers কে wait করাবেন না
- **Emojis use করুন** — Messages friendlier হয় 😊
- **পাঠানোর আগে পড়ুন** — Typos avoid করুন
- **শেষে summarize করুন** — "তাহলে একটা Blue Polo L size এ, right?"
`
      }
    }
  ]
};
