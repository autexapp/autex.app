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
      id: 'conversation-states',
      slug: 'states',
      order: 1,
      title: { en: 'Conversation States', bn: 'কথোপকথনের ধাপসমূহ' },
      content: {
        en: `# Conversation States

Every conversation in Autex AI goes through different states as the bot collects order information.

## Available States

| State | Icon | Description |
|-------|------|-------------|
| **Idle** | 🔄 | No active order. Ready for new inquiry. |
| **Confirming Product** | 📸 | Customer sent image, bot is confirming product selection |
| **Collecting Name** | 👤 | Bot is asking for customer name |
| **Collecting Phone** | 📱 | Bot is asking for phone number |
| **Collecting Address** | 📍 | Bot is asking for delivery address |
| **Collecting Payment** | 💳 | Bot is asking for bKash/Nagad last 4 digits |
| **Confirming Order** | ✅ | Final order confirmation |

## State Flow

\`\`\`
Customer sends image
       ↓
📸 Confirming Product
       ↓
👤 Collecting Name
       ↓
📱 Collecting Phone
       ↓
📍 Collecting Address
       ↓
💳 Collecting Payment (if enabled)
       ↓
✅ Confirming Order
       ↓
🔄 Idle (order complete)
\`\`\`

## Viewing Current State

In the **Conversations** page, click on any conversation to see its current state displayed below the customer name.
`,
        bn: `# কথোপকথনের ধাপসমূহ

Autex AI এর প্রতিটি conversation bot order information collect করার সময় বিভিন্ন state এর মধ্য দিয়ে যায়।

## Available States

| State | Icon | বর্ণনা |
|-------|------|--------|
| **Idle** | 🔄 | কোনো active order নেই। নতুন inquiry এর জন্য ready। |
| **Confirming Product** | 📸 | Customer image পাঠিয়েছে, bot product selection confirm করছে |
| **Collecting Name** | 👤 | Bot customer name জিজ্ঞেস করছে |
| **Collecting Phone** | 📱 | Bot phone number জিজ্ঞেস করছে |
| **Collecting Address** | 📍 | Bot delivery address জিজ্ঞেস করছে |
| **Collecting Payment** | 💳 | Bot bKash/Nagad এর last 4 digits জিজ্ঞেস করছে |
| **Confirming Order** | ✅ | Final order confirmation |

## State Flow

\`\`\`
Customer image পাঠায়
       ↓
📸 Confirming Product
       ↓
👤 Collecting Name
       ↓
📱 Collecting Phone
       ↓
📍 Collecting Address
       ↓
💳 Collecting Payment (enabled থাকলে)
       ↓
✅ Confirming Order
       ↓
🔄 Idle (order complete)
\`\`\`

## Current State দেখা

**Conversations** page এ, যেকোনো conversation এ click করলে customer name এর নিচে current state দেখতে পাবেন।
`
      }
    },
    {
      id: 'manual-override',
      slug: 'manual-override',
      order: 2,
      title: { en: 'Manual State Override', bn: 'ম্যানুয়াল স্টেট পরিবর্তন' },
      content: {
        en: `# Manual State Override

Sometimes the AI bot gets confused or stuck. You can manually change the conversation state to fix this.

## How to Use

1. Go to **Conversations** page
2. Select a conversation
3. Find the **state dropdown** (below customer name)
4. Click it and select a new state

## When to Use Manual Override

- **Bot is stuck** — Keeps asking the same question
- **Customer wants to restart** — Sent wrong image, wants to order different product
- **Bot confused** — Customer typed something unexpected
- **Skip a step** — Customer already provided info in message

## What Gets Cleared?

Different states clear different data:

| New State | Clears |
|-----------|--------|
| Idle (Reset) | Everything — cart, name, phone, address |
| Confirming Product | Name, phone, address (keeps cart) |
| Collecting Name | Name, phone, address (keeps cart) |
| Collecting Phone | Phone, address (keeps name) |
| Collecting Address | Address only |

> ⚠️ **Warning:** Resetting to IDLE clears all cart and customer data. A confirmation dialog will appear.

## After Changing State

The bot will continue from the new state when the customer sends their next message. You may want to send a manual message explaining the situation.
`,
        bn: `# ম্যানুয়াল স্টেট পরিবর্তন

কখনো কখনো AI bot confused বা stuck হয়ে যায়। আপনি manually conversation state পরিবর্তন করে এটা ঠিক করতে পারেন।

## কিভাবে ব্যবহার করবেন

1. **Conversations** page এ যান
2. একটি conversation select করুন
3. **state dropdown** খুঁজুন (customer name এর নিচে)
4. Click করে নতুন state select করুন

## কখন Manual Override ব্যবহার করবেন

- **Bot stuck হয়ে গেছে** — একই প্রশ্ন বারবার করছে
- **Customer restart করতে চায়** — Wrong image পাঠিয়েছে, different product order করতে চায়
- **Bot confused** — Customer unexpected কিছু type করেছে
- **Step skip করা** — Customer আগেই message এ info দিয়ে দিয়েছে

## কী Clear হয়?

Different states different data clear করে:

| New State | Clears |
|-----------|--------|
| Idle (Reset) | সবকিছু — cart, name, phone, address |
| Confirming Product | Name, phone, address (cart থাকে) |
| Collecting Name | Name, phone, address (cart থাকে) |
| Collecting Phone | Phone, address (name থাকে) |
| Collecting Address | শুধু Address |

> ⚠️ **সতর্কতা:** IDLE তে Reset করলে সব cart এবং customer data clear হয়ে যাবে। একটি confirmation dialog আসবে।

## State Change করার পর

Customer পরের message পাঠালে bot নতুন state থেকে continue করবে। আপনি চাইলে একটি manual message পাঠাতে পারেন situation explain করে।
`
      }
    },
    {
      id: 'taking-control',
      slug: 'taking-control',
      order: 3,
      title: { en: 'Taking Manual Control', bn: 'ম্যানুয়াল কন্ট্রোল নেওয়া' },
      content: {
        en: `# Taking Manual Control

Sometimes you need to step in and handle a conversation yourself. Autex AI gives you full control.

## Control Modes

| Mode | Icon | Description |
|------|------|-------------|
| **Bot** | 🤖 | AI handles everything automatically |
| **Manual** | 👨‍💼 | You handle all messages. Bot is paused. |
| **Hybrid** | 🔄 | You replied, bot will resume after timeout |

## How to Take Control

1. Simply type a message in the conversation
2. The mode automatically switches to **Hybrid**
3. Bot pauses and lets you handle it
4. After 30 minutes of no owner messages, bot resumes

## Switching to Full Manual

If you want permanent manual control:
1. Look for the control panel in the conversation header
2. Toggle to **Manual** mode
3. Bot will not respond until you switch back

## When to Take Control

- Complex customer questions
- Complaints or issues
- Special requests or negotiations
- VIP customers
`,
        bn: `# ম্যানুয়াল কন্ট্রোল নেওয়া

কখনো কখনো আপনাকে নিজে conversation handle করতে হয়। Autex AI আপনাকে full control দেয়।

## Control Modes

| Mode | Icon | বর্ণনা |
|------|------|--------|
| **Bot** | 🤖 | AI সবকিছু automatically handle করে |
| **Manual** | 👨‍💼 | আপনি সব messages handle করেন। Bot paused। |
| **Hybrid** | 🔄 | আপনি reply করেছেন, timeout এর পর bot resume করবে |

## কিভাবে Control নেবেন

1. Conversation এ একটি message type করুন
2. Mode automatically **Hybrid** এ switch হয়ে যাবে
3. Bot pause হয়ে আপনাকে handle করতে দেয়
4. ৩০ মিনিট owner message না থাকলে, bot resume করে

## Full Manual এ Switch করা

যদি permanent manual control চান:
1. Conversation header এ control panel খুঁজুন
2. **Manual** mode এ toggle করুন
3. আপনি switch back না করা পর্যন্ত Bot respond করবে না

## কখন Control নেবেন

- Complex customer questions
- Complaints বা issues
- Special requests বা negotiations
- VIP customers
`
      }
    }
  ]
};
