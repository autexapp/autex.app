import { DocSection } from '../types';

export const gettingStartedSection: DocSection = {
  id: 'getting-started',
  slug: 'getting-started',
  order: 1,
  title: {
    en: 'Getting Started',
    bn: 'শুরু করুন'
  },
  icon: '🚀',
  articles: [
    {
      id: 'welcome',
      slug: 'welcome',
      order: 1,
      title: {
        en: 'Welcome to Autex AI',
        bn: 'Autex AI তে স্বাগতম'
      },
      summary: {
        en: 'Introduction to the platform and main features',
        bn: 'প্ল্যাটফর্ম এবং প্রধান বৈশিষ্ট্যসমূহের পরিচিতি'
      },
      content: {
        en: `# Welcome to Autex AI

Autex AI is your intelligent assistant for automating Facebook Messenger commerce. It helps you sell products, take orders, and manage customer conversations — all automatically.

## ✨ What Makes Autex AI Special

| Feature | What It Does |
|---------|--------------|
| 🤖 **Auto Order Taking** | Bot handles customer inquiries and collects order details 24/7 |
| 📸 **Photo Recognition** | Customers send product photos, AI finds matching products instantly |
| 💬 **Smart Conversations** | Natural language understanding in English and বাংলা |
| 📦 **Order Management** | Track and manage all orders in one beautiful dashboard |
| 📊 **Analytics** | Insights into your sales, best products, and customer behavior |

## 🎯 How It Works

\`\`\`
Customer sends message → Bot responds → Product matched → Order collected → You ship!
\`\`\`

**The Simple Flow:**

1. Customer messages your Facebook Page
2. Bot greets them and asks what they need
3. Customer sends a product photo or describes what they want
4. AI matches it to your product catalog
5. Bot collects: Name → Phone → Address
6. Order appears in your dashboard
7. You confirm and ship!

## 🚀 Ready to Start?

Follow these steps to get your store running:

> **Step 1:** Connect your Facebook Page  
> **Step 2:** Add your products with photos  
> **Step 3:** Configure delivery charges  
> **Step 4:** Go live and watch orders come in!

---

💡 **Pro Tip:** The more product photos you upload, the better the AI can match customer photos!
`,
        bn: `# Autex AI তে স্বাগতম

Autex AI আপনার Facebook Messenger commerce automate করার জন্য intelligent assistant। এটা আপনাকে product sell করতে, order নিতে, আর customer conversation manage করতে help করে — সব automatically!

## ✨ Autex AI কেন Special

| Feature | এটা কি করে |
|---------|------------|
| 🤖 **Auto Order Taking** | Bot customer inquiries handle করে আর order details collect করে 24/7 |
| 📸 **Photo Recognition** | Customer product photo পাঠায়, AI instantly matching product খুঁজে দেয় |
| 💬 **Smart Conversations** | English আর বাংলা দুইটাই বোঝে naturally |
| 📦 **Order Management** | এক সুন্দর dashboard এ সব order track আর manage করুন |
| 📊 **Analytics** | আপনার sales, best products, আর customer behavior এর insights |

## 🎯 এটা কিভাবে কাজ করে

\`\`\`
Customer message পাঠায় → Bot reply দেয় → Product match হয় → Order collect হয় → আপনি ship করেন!
\`\`\`

**Simple Flow:**

1. Customer আপনার Facebook Page এ message করে
2. Bot তাদের greet করে আর জিজ্ঞেস করে কি দরকার
3. Customer product photo পাঠায় বা describe করে
4. AI আপনার product catalog থেকে match করে
5. Bot collect করে: নাম → ফোন → Address
6. Order আপনার dashboard এ আসে
7. আপনি confirm করে ship করেন!

## 🚀 Ready শুরু করতে?

এই steps follow করুন store running করতে:

> **Step 1:** Facebook Page connect করুন  
> **Step 2:** Photo সহ products add করুন  
> **Step 3:** Delivery charges configure করুন  
> **Step 4:** Live হন আর order আসতে দেখুন!

---

💡 **Pro Tip:** যত বেশি product photo upload করবেন, AI তত ভালো customer photo match করতে পারবে!
`
      },
      icon: '👋'
    },
    {
      id: 'first-day-checklist',
      slug: 'first-day-checklist',
      order: 2,
      title: {
        en: 'First Day Checklist',
        bn: 'প্রথম দিনের Checklist'
      },
      summary: {
        en: 'Everything you need to do on day one',
        bn: 'প্রথম দিনে যা যা করতে হবে'
      },
      content: {
        en: `# First Day Checklist

Get your Autex AI store ready in under 30 minutes! Follow this checklist step by step.

## ✅ The Complete Setup Checklist

### Phase 1: Connect (5 minutes)
- [ ] Log in to your Autex AI dashboard
- [ ] Go to **Settings** → Click **Connect Facebook Page**
- [ ] Select your business page and grant permissions
- [ ] Verify the page shows as "Connected" ✓

### Phase 2: Add Products (15 minutes)
- [ ] Go to **Products** → Click **Add Product**
- [ ] Add at least 5-10 of your top-selling products
- [ ] For each product:
  - [ ] Clear name (include size/color if variants)
  - [ ] Correct price in ৳
  - [ ] 2-3 photos from different angles
  - [ ] Stock quantity

### Phase 3: Configure Bot (5 minutes)
- [ ] Go to **AI Setup**
- [ ] Set your **Greeting Message** (make it friendly!)
- [ ] Set **Delivery Charges**:
  - Inside Dhaka: ৳60-80
  - Outside Dhaka: ৳120-150
- [ ] Add your business name and phone

### Phase 4: Go Live (2 minutes)
- [ ] Go to **Settings** → Find your connected page
- [ ] Make sure **Bot Enabled** is ON ✓
- [ ] Test by messaging your page from another account!

---

## 🎉 You're Ready!

Once you complete this checklist:
- Your bot will start responding to customers
- Orders will appear in your **Orders** dashboard
- You'll see analytics in your **Dashboard**

## 💡 Pro Tips for Day One

| Tip | Why It Matters |
|-----|----------------|
| Add multiple photos per product | Better AI matching when customers send photos |
| Use clear product names | "Blue Polo XL" is better than "Shirt 1" |
| Test with your own phone | Make sure the bot responds correctly |
| Check your dashboard hourly | Catch any issues early |

---

> **Need Help?** If something isn't working, check the **Troubleshooting** section or contact support.
`,
        bn: `# প্রথম দিনের Checklist

30 minute এর মধ্যে আপনার Autex AI store ready করুন! Step by step এই checklist follow করুন।

## ✅ Complete Setup Checklist

### Phase 1: Connect করুন (5 minutes)
- [ ] Autex AI dashboard এ login করুন
- [ ] **Settings** এ যান → **Connect Facebook Page** click করুন
- [ ] আপনার business page select করুন আর permissions দিন
- [ ] Verify করুন page "Connected" দেখাচ্ছে ✓

### Phase 2: Products Add করুন (15 minutes)
- [ ] **Products** এ যান → **Add Product** click করুন
- [ ] আপনার top-selling 5-10টা product add করুন
- [ ] প্রতিটা product এর জন্য:
  - [ ] Clear name (size/color থাকলে include করুন)
  - [ ] সঠিক price ৳ তে
  - [ ] Different angle থেকে 2-3টা photo
  - [ ] Stock quantity

### Phase 3: Bot Configure করুন (5 minutes)
- [ ] **AI Setup** এ যান
- [ ] **Greeting Message** set করুন (friendly রাখুন!)
- [ ] **Delivery Charges** set করুন:
  - ঢাকার ভিতরে: ৳৬০-৮০
  - ঢাকার বাইরে: ৳১২০-১৫০
- [ ] আপনার business name আর phone add করুন

### Phase 4: Live হন (2 minutes)
- [ ] **Settings** এ যান → আপনার connected page খুঁজুন
- [ ] **Bot Enabled** ON আছে check করুন ✓
- [ ] অন্য account থেকে page এ message করে test করুন!

---

## 🎉 আপনি Ready!

এই checklist complete করলে:
- Bot customers দের respond করা শুরু করবে
- Orders আপনার **Orders** dashboard এ আসবে
- **Dashboard** এ analytics দেখতে পাবেন

## 💡 প্রথম দিনের Pro Tips

| Tip | কেন Important |
|-----|---------------|
| প্রতি product এ multiple photo add করুন | Customer photo পাঠালে AI ভালো match করতে পারে |
| Clear product name use করুন | "Blue Polo XL" better তান "Shirt 1" |
| নিজের phone দিয়ে test করুন | Bot ঠিকমত respond করছে কিনা check করুন |
| ঘন্টায় ঘন্টায় dashboard check করুন | কোনো issue থাকলে তাড়াতাড়ি ধরতে পারবেন |

---

> **Help দরকার?** কিছু কাজ না করলে **Troubleshooting** section check করুন বা support এ contact করুন।
`
      },
      icon: '📋'
    },
    {
      id: 'connect-facebook',
      slug: 'connect-facebook',
      order: 3,
      title: {
        en: 'Connecting Facebook Page',
        bn: 'Facebook Page Connect করা'
      },
      content: {
        en: `# Connecting Your Facebook Page

To start receiving automated messages, you need to connect your Facebook Business Page to Autex AI.

## 📋 Before You Start

Make sure you have:
- ✅ A Facebook Business Page (not personal profile)
- ✅ Admin access to that page
- ✅ Logged into Facebook in your browser

## 🔗 Steps to Connect

### Step 1: Go to Settings
Click **Settings** in the sidebar menu.

### Step 2: Find Facebook Section
Scroll down to **Connected Pages** section.

### Step 3: Click Connect
Click the **Connect Facebook Page** button.

### Step 4: Login & Authorize
- Facebook login popup will appear
- Log in with your Facebook account
- Select the page you want to connect
- Grant all requested permissions

### Step 5: Verify Connection
You'll see your page listed with:
- ✅ Green "Connected" status
- Bot toggle switch
- Disconnect option

## 🔐 Required Permissions

Autex AI needs these permissions to work:

| Permission | Why We Need It |
|------------|----------------|
| **Read messages** | To see customer inquiries |
| **Send messages** | To respond automatically |
| **Manage pages** | To access page settings |

> **Privacy Note:** We only access messages sent to your page. We never access your personal messages or data.

## ❓ Troubleshooting

### Page not showing?
- Make sure you're an **admin** of the page
- Try logging out of Facebook and back in
- Refresh the Autex AI page

### Connection failed?
- Check your internet connection
- Disable browser ad-blockers temporarily
- Try a different browser (Chrome recommended)

### Can't grant permissions?
- You might need to be the page owner, not just admin
- Ask the page owner to connect instead

---

💡 **Tip:** You can connect multiple pages if you have more than one business!
`,
        bn: `# Facebook Page Connect করা

Automated messages পেতে শুরু করতে, আপনাকে আপনার Facebook Business Page Autex AI এর সাথে connect করতে হবে।

## 📋 শুরু করার আগে

নিশ্চিত করুন আপনার কাছে আছে:
- ✅ একটা Facebook Business Page (personal profile না)
- ✅ সেই page এর Admin access
- ✅ Browser এ Facebook এ logged in

## 🔗 Connect করার Steps

### Step 1: Settings এ যান
Sidebar menu তে **Settings** click করুন।

### Step 2: Facebook Section খুঁজুন
Scroll করে **Connected Pages** section এ যান।

### Step 3: Connect Click করুন
**Connect Facebook Page** button click করুন।

### Step 4: Login করুন & Authorize করুন
- Facebook login popup আসবে
- আপনার Facebook account দিয়ে login করুন
- যে page connect করতে চান সেটা select করুন
- সব requested permissions দিন

### Step 5: Connection Verify করুন
আপনার page list এ দেখাবে:
- ✅ Green "Connected" status
- Bot toggle switch
- Disconnect option

## 🔐 Required Permissions

Autex AI কাজ করতে এই permissions দরকার:

| Permission | কেন দরকার |
|------------|-----------|
| **Read messages** | Customer inquiries দেখতে |
| **Send messages** | Automatically respond করতে |
| **Manage pages** | Page settings access করতে |

> **Privacy Note:** আমরা শুধু আপনার page এ পাঠানো messages access করি। আপনার personal messages বা data কখনো access করি না।

## ❓ সমস্যা হলে

### Page দেখা যাচ্ছে না?
- নিশ্চিত করুন আপনি page এর **admin**
- Facebook থেকে logout করে আবার login করুন
- Autex AI page refresh করুন

### Connection failed?
- Internet connection check করুন
- Browser ad-blockers temporarily disable করুন
- অন্য browser try করুন (Chrome recommended)

### Permissions দিতে পারছেন না?
- আপনাকে page owner হতে হতে পারে, শুধু admin না
- Page owner কে বলুন connect করতে

---

💡 **Tip:** আপনার একাধিক business থাকলে multiple pages connect করতে পারেন!
`
      }
    },
    {
      id: 'dashboard-overview',
      slug: 'dashboard-overview',
      order: 4,
      title: {
        en: 'Understanding Your Dashboard',
        bn: 'Dashboard বুঝুন'
      },
      summary: {
        en: 'Learn what each part of your dashboard shows',
        bn: 'Dashboard এর প্রতিটা part কি দেখায় শিখুন'
      },
      content: {
        en: `# Understanding Your Dashboard

Your dashboard is your command center. Here's what everything means!

## 📊 Main Dashboard (Home)

When you log in, you see the main dashboard with these sections:

### Stats Cards (Top Row)

| Card | What It Shows |
|------|---------------|
| 📦 **Orders Today** | Number of orders received today |
| 💰 **Revenue Today** | Total sales amount today (in ৳) |
| 💬 **Messages Today** | Customer messages received today |
| 🤖 **AI Cost** | Your AI usage cost this month |

Each card also shows a **trend arrow**:
- 📈 Green up = Better than yesterday
- 📉 Red down = Less than yesterday

### Recent Orders Section

Shows your latest 5 orders with:
- Customer name
- Order amount
- Status (Pending, Confirmed, Shipped)
- Quick action buttons

### Quick Actions

Fast buttons to:
- View all orders
- Add new product
- Check conversations

---

## 📍 Navigation Menu

### Sidebar Options

| Menu | What You'll Find |
|------|------------------|
| 🏠 **Dashboard** | Main overview (you're here!) |
| 💬 **Conversations** | All customer chats |
| 📦 **Products** | Your product catalog |
| 🛍️ **Orders** | All orders list |
| 📊 **Analytics** | Detailed sales reports |
| 🤖 **AI Setup** | Bot configuration |
| ⚙️ **Settings** | Account & page settings |
| ❓ **Help** | This help center |

---

## 📈 Analytics Page

Go deeper into your performance:

- **Sales Chart** — See daily/weekly/monthly trends
- **Top Products** — Your best sellers
- **Conversion Rate** — How many chats become orders
- **Order Status** — Breakdown by status

---

## 💡 Dashboard Tips

1. **Check daily** — Start your day by reviewing the dashboard
2. **Watch trends** — Declining trends = time to investigate
3. **Respond to pending orders** — Don't leave customers waiting
4. **Monitor AI costs** — Keep an eye on usage

---

> **Quick Access:** Click any stat card to jump to the detailed page!
`,
        bn: `# Dashboard বুঝুন

আপনার dashboard হলো আপনার command center। এখানে সব কিছুর meaning দেখুন!

## 📊 Main Dashboard (Home)

Login করলে main dashboard এ এই sections দেখবেন:

### Stats Cards (উপরের Row)

| Card | কি দেখায় |
|------|----------|
| 📦 **Orders Today** | আজকে কতগুলো order এসেছে |
| 💰 **Revenue Today** | আজকের total sales amount (৳ তে) |
| 💬 **Messages Today** | আজকে কতগুলো customer message এসেছে |
| 🤖 **AI Cost** | এই মাসে আপনার AI usage cost |

প্রতিটা card এ **trend arrow** ও দেখায়:
- 📈 Green up = গতকালের চেয়ে better
- 📉 Red down = গতকালের চেয়ে কম

### Recent Orders Section

আপনার latest 5টা order দেখায়:
- Customer name
- Order amount
- Status (Pending, Confirmed, Shipped)
- Quick action buttons

### Quick Actions

Fast buttons:
- সব orders দেখুন
- নতুন product add করুন
- Conversations check করুন

---

## 📍 Navigation Menu

### Sidebar Options

| Menu | কি পাবেন |
|------|---------|
| 🏠 **Dashboard** | Main overview (এখানে আছেন!) |
| 💬 **Conversations** | সব customer chats |
| 📦 **Products** | আপনার product catalog |
| 🛍️ **Orders** | সব orders list |
| 📊 **Analytics** | Detailed sales reports |
| 🤖 **AI Setup** | Bot configuration |
| ⚙️ **Settings** | Account আর page settings |
| ❓ **Help** | এই help center |

---

## 📈 Analytics Page

Performance details দেখুন:

- **Sales Chart** — Daily/weekly/monthly trends দেখুন
- **Top Products** — আপনার best sellers
- **Conversion Rate** — কতগুলো chat order হচ্ছে
- **Order Status** — Status অনুযায়ী breakdown

---

## 💡 Dashboard Tips

1. **Daily check করুন** — দিন শুরু করুন dashboard review করে
2. **Trends দেখুন** — Declining trends মানে investigate করার time
3. **Pending orders respond করুন** — Customers কে wait করাবেন না
4. **AI costs monitor করুন** — Usage এর দিকে নজর রাখুন

---

> **Quick Access:** যেকোনো stat card click করলে detailed page এ jump করতে পারবেন!
`
      },
      icon: '🏠'
    }
  ]
};
