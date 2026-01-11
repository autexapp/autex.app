import { DocSection } from '../types';

export const settingsSection: DocSection = {
  id: 'settings',
  slug: 'settings',
  order: 6,
  title: {
    en: 'Settings',
    bn: 'সেটিংস'
  },
  icon: '⚙️',
  articles: [
    {
      id: 'ai-setup',
      slug: 'ai-setup',
      order: 1,
      title: { en: 'Configuring Your Bot', bn: 'Bot Configure করা' },
      content: {
        en: `# Configuring Your Bot

Customize how your bot greets customers and handles conversations.

## 🤖 Accessing AI Setup

Go to **AI Setup** in the sidebar menu.

## ✉️ Greeting Message

This is the first message customers see when they message your page.

### Writing a Great Greeting

| Element | Example |
|---------|---------|
| Warm opening | "আসসালামু আলাইকুম! 🌟" |
| Business name | "Welcome to [Your Shop]!" |
| What to do next | "পছন্দের পণ্যের ছবি পাঠান!" |
| Friendly emoji | 😊 🛍️ 💬 |

### Sample Greetings

**Bangla Style:**
\`\`\`
আসসালামু আলাইকুম! 🌟
[Shop Name] এ স্বাগতম!

পছন্দের পণ্যের ছবি পাঠান অথবা কি লাগবে বলুন। 
আমি অর্ডার নিতে সাহায্য করব! 😊
\`\`\`

**English Style:**
\`\`\`
Hi there! 👋
Welcome to [Shop Name]!

Send a photo of what you're looking for, or describe it.
I'll help you place an order! 🛍️
\`\`\`

---

## 🚚 Delivery Charges

Set how much to charge for delivery:

| Location | Typical Charge |
|----------|----------------|
| Inside Dhaka | ৳60 - ৳80 |
| Outside Dhaka | ৳120 - ৳150 |

The bot automatically detects location from customer's address and applies the correct charge.

---

## 💼 Business Information

Add your business details so the bot can share them:
- **Business Name** — Your shop name
- **Contact Number** — Your phone/WhatsApp
- **Business Address** — Physical location (if any)

---

## 💡 Tips

1. **Keep it short** — Long greetings may bore customers
2. **Use emojis** — Makes messages friendly 😊
3. **Mention what to do** — Tell them to send a photo
4. **Test it yourself** — Message your page from another account
`,
        bn: `# Bot Configure করা

আপনার bot কিভাবে customers কে greet করবে আর conversations handle করবে customize করুন।

## 🤖 AI Setup Access করা

Sidebar menu তে **AI Setup** এ যান।

## ✉️ Greeting Message

Customers আপনার page এ message করলে যে প্রথম message দেখে।

### ভালো Greeting লেখা

| Element | Example |
|---------|---------|
| Warm opening | "আসসালামু আলাইকুম! 🌟" |
| Business name | "[Your Shop] এ স্বাগতম!" |
| কি করতে হবে | "পছন্দের পণ্যের ছবি পাঠান!" |
| Friendly emoji | 😊 🛍️ 💬 |

### Sample Greetings

**Bangla Style:**
\`\`\`
আসসালামু আলাইকুম! 🌟
[Shop Name] এ স্বাগতম!

পছন্দের পণ্যের ছবি পাঠান অথবা কি লাগবে বলুন। 
আমি অর্ডার নিতে সাহায্য করব! 😊
\`\`\`

**English Style:**
\`\`\`
Hi there! 👋
Welcome to [Shop Name]!

Send a photo of what you're looking for, or describe it.
I'll help you place an order! 🛍️
\`\`\`

---

## 🚚 Delivery Charges

Delivery এর জন্য কত charge করবেন set করুন:

| Location | সাধারণ Charge |
|----------|---------------|
| ঢাকার ভিতরে | ৳৬০ - ৳৮০ |
| ঢাকার বাইরে | ৳১২০ - ৳১৫০ |

Bot automatically customer এর address থেকে location detect করে সঠিক charge apply করে।

---

## 💼 Business Information

আপনার business details add করুন যাতে bot share করতে পারে:
- **Business Name** — আপনার shop এর নাম
- **Contact Number** — আপনার phone/WhatsApp
- **Business Address** — Physical location (থাকলে)

---

## 💡 Tips

1. **Short রাখুন** — Long greetings customers কে bore করতে পারে
2. **Emojis use করুন** — Messages friendly হয় 😊
3. **কি করতে হবে বলুন** — Photo পাঠাতে বলুন
4. **নিজে test করুন** — অন্য account থেকে page এ message করুন
`
      }
    },
    {
      id: 'delivery-settings',
      slug: 'delivery-settings',
      order: 2,
      title: { en: 'Delivery Settings', bn: 'Delivery Settings' },
      content: {
        en: `# Delivery Settings

Configure delivery charges and options for your orders.

## 💰 Setting Delivery Charges

### Access
Go to **AI Setup** → Find the **Delivery Charges** section.

### Configuration

| Field | What to Enter |
|-------|---------------|
| Inside Dhaka | Amount in ৳ (e.g., 60) |
| Outside Dhaka | Amount in ৳ (e.g., 120) |

---

## 📍 How Location Detection Works

When customer gives address, bot checks for Dhaka keywords:
- Dhaka, ঢাকা
- Gulshan, Banani, Dhanmondi, Mirpur, Uttara
- And more...

**Match found?** → Inside Dhaka charge
**No match?** → Outside Dhaka charge

---

## 💵 Common Pricing Strategies

| Strategy | Inside Dhaka | Outside Dhaka |
|----------|--------------|---------------|
| Standard | ৳60 | ৳120 |
| Free Dhaka | ৳0 | ৳120 |
| Premium | ৳80 | ৳150 |
| Flat Rate | ৳100 | ৳100 |

---

## 📊 Delivery in Order Summary

When bot shows order confirmation:
\`\`\`
📦 Product: Blue Polo Shirt - ৳850
🚚 Delivery: Dhaka - ৳60
━━━━━━━━━━━━━━
💰 Total: ৳910
\`\`\`

---

## 💡 Tips

- **Be competitive** — Check what competitors charge
- **Consider free delivery** — For orders above certain amount
- **Update when courier rates change** — Keep charges accurate
- **Communicate clearly** — Customers appreciate transparency
`,
        bn: `# Delivery Settings

Orders এর জন্য delivery charges আর options configure করুন।

## 💰 Delivery Charges Set করা

### Access
**AI Setup** এ যান → **Delivery Charges** section খুঁজুন।

### Configuration

| Field | কি Enter করবেন |
|-------|----------------|
| ঢাকার ভিতরে | ৳ তে amount (যেমন: ৬০) |
| ঢাকার বাইরে | ৳ তে amount (যেমন: ১২০) |

---

## 📍 Location Detection কিভাবে কাজ করে

Customer address দিলে, bot Dhaka keywords check করে:
- Dhaka, ঢাকা
- Gulshan, Banani, Dhanmondi, Mirpur, Uttara
- আরো অনেক...

**Match পাওয়া গেলে?** → ঢাকার ভিতরের charge
**Match না পেলে?** → ঢাকার বাইরের charge

---

## 💵 Common Pricing Strategies

| Strategy | ঢাকার ভিতরে | ঢাকার বাইরে |
|----------|-------------|-------------|
| Standard | ৳৬০ | ৳১২০ |
| Free Dhaka | ৳০ | ৳১২০ |
| Premium | ৳৮০ | ৳১৫০ |
| Flat Rate | ৳১০০ | ৳১০০ |

---

## 📊 Order Summary তে Delivery

Bot order confirmation দেখায়:
\`\`\`
📦 Product: Blue Polo Shirt - ৳৮৫০
🚚 Delivery: Dhaka - ৳৬০
━━━━━━━━━━━━━━
💰 Total: ৳৯১০
\`\`\`

---

## 💡 Tips

- **Competitive থাকুন** — Competitors কত charge করে check করুন
- **Free delivery consider করুন** — নির্দিষ্ট amount এর উপরে orders এ
- **Courier rates change হলে update করুন** — Charges accurate রাখুন
- **Clearly communicate করুন** — Customers transparency appreciate করে
`
      }
    },
    {
      id: 'bot-toggle',
      slug: 'bot-toggle',
      order: 3,
      title: { en: 'Turning Bot On/Off', bn: 'Bot On/Off করা' },
      summary: {
        en: 'Control when your bot responds',
        bn: 'Bot কখন respond করবে control করুন'
      },
      content: {
        en: `# Turning Bot On/Off

Sometimes you need to pause the bot. Here's how to control it.

## 🔌 Global Bot Toggle

The global toggle turns bot ON or OFF for your entire page.

### Where to Find It
1. Go to **Settings**
2. Find **Connected Facebook Pages** section
3. Look for the **Bot toggle switch** next to your page

### Toggle States

| State | What Happens |
|-------|--------------|
| ✅ **ON** | Bot responds to all messages automatically |
| ❌ **OFF** | Bot is silent. You must respond manually. |

---

## ⚠️ When to Turn Off Bot

| Situation | Action |
|-----------|--------|
| Technical issues with bot | Turn OFF, fix, turn ON |
| Major announcement to customers | Turn OFF briefly |
| Personal vacation (handling messages yourself) | Turn OFF |
| Testing new settings | Turn OFF temporarily |

---

## 🚨 Warning When Disabling

When you turn OFF the bot, you'll see:

> ⚠️ **Warning:** Turning off the bot means no automatic responses. Customers will wait for your manual reply.

Make sure you're ready to respond manually before disabling!

---

## 📱 Bot Disabled Indicators

When bot is OFF:
- **Settings page** — Toggle shows OFF
- **Conversations page** — Warning banner at top
- **Conversation detail** — "Bot Disabled" badge

---

## 🔄 Per-Page Control

If you have multiple Facebook pages connected:
- Each page has its own toggle
- Turn one OFF without affecting others
- Useful for managing multiple businesses

---

## 💡 Best Practices

1. **Don't leave bot OFF for long** — Customers expect fast responses
2. **Communicate downtime** — Post on page if bot will be offline
3. **Turn ON during peak hours** — Bot works 24/7, you don't have to
4. **Test after turning back ON** — Make sure it's working
`,
        bn: `# Bot On/Off করা

কখনো কখনো bot pause করার দরকার হয়। এখানে দেখুন কিভাবে control করবেন।

## 🔌 Global Bot Toggle

Global toggle পুরো page এর জন্য bot ON বা OFF করে।

### কোথায় পাবেন
1. **Settings** এ যান
2. **Connected Facebook Pages** section খুঁজুন
3. Page এর পাশে **Bot toggle switch** দেখুন

### Toggle States

| State | কি হয় |
|-------|--------|
| ✅ **ON** | Bot automatically সব messages এ respond করে |
| ❌ **OFF** | Bot silent। আপনাকে manually respond করতে হবে। |

---

## ⚠️ কখন Bot Off করবেন

| Situation | Action |
|-----------|--------|
| Bot এ technical issues | OFF করুন, fix করুন, ON করুন |
| Customers দের major announcement | Briefly OFF করুন |
| Personal vacation (নিজে messages handle করছেন) | OFF করুন |
| নতুন settings test করছেন | Temporarily OFF করুন |

---

## 🚨 Disable করার Warning

Bot OFF করলে, দেখবেন:

> ⚠️ **Warning:** Bot off করলে automatic responses হবে না। Customers আপনার manual reply এর wait করবে।

Disable করার আগে manually respond করতে ready আছেন নিশ্চিত করুন!

---

## 📱 Bot Disabled Indicators

Bot OFF থাকলে:
- **Settings page** — Toggle OFF দেখায়
- **Conversations page** — উপরে warning banner
- **Conversation detail** — "Bot Disabled" badge

---

## 🔄 Per-Page Control

Multiple Facebook pages connected থাকলে:
- প্রতি page এর নিজের toggle আছে
- একটা OFF করুন অন্যগুলো affect না করে
- Multiple businesses manage করতে useful

---

## 💡 Best Practices

1. **Bot বেশিক্ষণ OFF রাখবেন না** — Customers fast responses expect করে
2. **Downtime communicate করুন** — Bot offline থাকলে page এ post করুন
3. **Peak hours এ ON রাখুন** — Bot 24/7 কাজ করে, আপনাকে করতে হবে না
4. **ON করার পর test করুন** — কাজ করছে নিশ্চিত করুন
`
      },
      icon: '🔌'
    },
    {
      id: 'facebook-pages',
      slug: 'facebook-pages',
      order: 4,
      title: { en: 'Managing Facebook Pages', bn: 'Facebook Pages Manage করা' },
      content: {
        en: `# Managing Facebook Pages

Connect, disconnect, and manage your Facebook business pages.

## 📋 Viewing Connected Pages

1. Go to **Settings**
2. Scroll to **Connected Facebook Pages**
3. See all your connected pages

Each page shows:
- **Page name** and profile picture
- **Bot status** (ON/OFF toggle)
- **Connected date**
- **Disconnect** option

---

## ➕ Connecting a New Page

### Steps
1. Click **Connect Facebook Page**
2. Facebook popup appears
3. Log in if needed
4. Select the page to connect
5. Grant permissions
6. Page appears in your list!

### Requirements
- Must be **admin** of the page
- Page must be a **business page** (not personal)
- All required permissions must be granted

---

## ➖ Disconnecting a Page

### Steps
1. Find the page in your list
2. Click **Disconnect** button
3. Confirm in the dialog

### What Happens
- Bot stops responding on that page
- Conversations remain in your dashboard (history)
- No new messages will come in
- You can reconnect later

---

## 🔄 Reconnecting

If you disconnected by mistake:
1. Click **Connect Facebook Page**
2. Select the same page
3. Grant permissions again
4. Page reconnects!

Previous conversations and orders remain intact.

---

## 👥 Multiple Pages

If you run multiple business pages:
- Connect them all to one Autex AI account
- Each page has separate:
  - Products
  - Conversations
  - Orders
  - Settings

Switch between pages using the page selector (coming soon).

---

## 💡 Tips

- **Use one page per business** — Don't mix different businesses
- **Check permissions if issues arise** — Reconnect if needed
- **Don't connect personal profile** — Only business pages work
`,
        bn: `# Facebook Pages Manage করা

Facebook business pages connect, disconnect, আর manage করুন।

## 📋 Connected Pages দেখা

1. **Settings** এ যান
2. **Connected Facebook Pages** এ scroll করুন
3. আপনার সব connected pages দেখুন

প্রতি page দেখায়:
- **Page name** আর profile picture
- **Bot status** (ON/OFF toggle)
- **Connected date**
- **Disconnect** option

---

## ➕ নতুন Page Connect করা

### Steps
1. **Connect Facebook Page** click করুন
2. Facebook popup আসবে
3. দরকার হলে login করুন
4. Connect করতে চাওয়া page select করুন
5. Permissions দিন
6. Page আপনার list এ দেখাবে!

### Requirements
- Page এর **admin** হতে হবে
- **Business page** হতে হবে (personal না)
- সব required permissions দিতে হবে

---

## ➖ Page Disconnect করা

### Steps
1. List এ page খুঁজুন
2. **Disconnect** button click করুন
3. Dialog এ confirm করুন

### কি হয়
- Bot সেই page এ respond করা বন্ধ করে
- Conversations dashboard এ থাকে (history)
- নতুন messages আসবে না
- পরে reconnect করতে পারবেন

---

## 🔄 Reconnect করা

ভুলে disconnect করলে:
1. **Connect Facebook Page** click করুন
2. Same page select করুন
3. আবার permissions দিন
4. Page reconnect হয়!

Previous conversations আর orders ঠিক থাকে।

---

## 👥 Multiple Pages

Multiple business pages চালালে:
- সব একই Autex AI account এ connect করুন
- প্রতি page এর আলাদা:
  - Products
  - Conversations
  - Orders
  - Settings

Pages এর মধ্যে switch করতে page selector use করুন (coming soon)।

---

## 💡 Tips

- **প্রতি business এ এক page use করুন** — Different businesses mix করবেন না
- **Issues হলে permissions check করুন** — দরকার হলে reconnect করুন
- **Personal profile connect করবেন না** — শুধু business pages কাজ করে
`
      }
    }
  ]
};
