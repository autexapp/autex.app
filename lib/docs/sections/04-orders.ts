import { DocSection } from '../types';

export const ordersSection: DocSection = {
  id: 'orders',
  slug: 'orders',
  order: 4,
  title: {
    en: 'Orders',
    bn: 'অর্ডার'
  },
  icon: '🛍️',
  articles: [
    {
      id: 'order-lifecycle',
      slug: 'lifecycle',
      order: 1,
      title: { en: 'Order Status & Lifecycle', bn: 'Order Status ও Lifecycle' },
      content: {
        en: `# Order Status & Lifecycle

Every order goes through a journey from creation to delivery. Understanding statuses helps you manage orders efficiently.

## 📊 Order Statuses

| Status | Color | Meaning |
|--------|-------|---------|
| **Pending** | 🟡 Yellow | New order, waiting for your review |
| **Confirmed** | 🟢 Green | You confirmed, preparing to ship |
| **Shipped** | 🟣 Purple | Order is on the way to customer |
| **Completed** | 🟢 Green | Customer received, order finished |
| **Cancelled** | 🔴 Red | Order was cancelled |

---

## 🔄 The Lifecycle

\`\`\`
📝 PENDING → ✅ CONFIRMED → 🚚 SHIPPED → 📦 COMPLETED
                ↘
                 ❌ CANCELLED (at any point)
\`\`\`

### Step-by-Step:

1. **Pending** 📝
   - Bot collected all info and created order
   - Waiting for you to review and confirm
   
2. **Confirmed** ✅
   - You verified details and confirmed
   - Time to prepare the package
   
3. **Shipped** 🚚
   - You handed off to courier
   - Customer is waiting for delivery
   
4. **Completed** 📦
   - Customer received the order
   - Transaction complete!

---

## ⏱️ Timeline Expectations

| Stage | Typical Time |
|-------|--------------|
| Pending → Confirmed | Same day |
| Confirmed → Shipped | 1-2 days |
| Shipped → Completed | 2-5 days (location based) |

> 💡 **Tip:** Faster confirmation = happier customers!

---

## 📈 Order Details

Each order contains:
- **Order Number** — Unique ID (e.g., #ORD-12345)
- **Customer Info** — Name, phone, address
- **Product(s)** — What they ordered, size, color
- **Pricing** — Product price + delivery charge = total
- **Timestamps** — When created, last updated
- **Linked Conversation** — Click to see the chat

---

## 👁️ Viewing Orders

1. Go to **Orders** in sidebar
2. See list of all orders
3. Click any order to see full details
4. Use filters to find specific orders
`,
        bn: `# Order Status ও Lifecycle

প্রতিটা order creation থেকে delivery পর্যন্ত একটা journey র মধ্য দিয়ে যায়। Statuses বুঝলে orders efficiently manage করতে পারবেন।

## 📊 Order Statuses

| Status | Color | Meaning |
|--------|-------|---------|
| **Pending** | 🟡 Yellow | নতুন order, review এর জন্য wait করছে |
| **Confirmed** | 🟢 Green | আপনি confirm করেছেন, ship এর preparation করছেন |
| **Shipped** | 🟣 Purple | Order customer এর কাছে যাচ্ছে |
| **Completed** | 🟢 Green | Customer পেয়ে গেছে, order finished |
| **Cancelled** | 🔴 Red | Order cancel হয়েছে |

---

## 🔄 Lifecycle

\`\`\`
📝 PENDING → ✅ CONFIRMED → 🚚 SHIPPED → 📦 COMPLETED
                ↘
                 ❌ CANCELLED (যেকোনো সময়)
\`\`\`

### Step-by-Step:

1. **Pending** 📝
   - Bot সব info collect করে order create করেছে
   - আপনার review আর confirm এর wait করছে
   
2. **Confirmed** ✅
   - আপনি details verify করে confirm করেছেন
   - Package prepare করার time
   
3. **Shipped** 🚚
   - আপনি courier এ handover করেছেন
   - Customer delivery এর wait করছে
   
4. **Completed** 📦
   - Customer order receive করেছে
   - Transaction complete!

---

## ⏱️ Timeline Expectations

| Stage | সাধারণ Time |
|-------|-------------|
| Pending → Confirmed | Same day |
| Confirmed → Shipped | ১-২ দিন |
| Shipped → Completed | ২-৫ দিন (location অনুযায়ী) |

> 💡 **Tip:** দ্রুত confirmation = খুশি customers!

---

## 📈 Order Details

প্রতি order এ থাকে:
- **Order Number** — Unique ID (যেমন: #ORD-12345)
- **Customer Info** — নাম, phone, address
- **Product(s)** — কি order করেছে, size, color
- **Pricing** — Product price + delivery charge = total
- **Timestamps** — কখন create হয়েছে, last update
- **Linked Conversation** — Chat দেখতে click করুন

---

## 👁️ Orders দেখা

1. Sidebar এ **Orders** এ যান
2. সব orders এর list দেখুন
3. Full details দেখতে যেকোনো order click করুন
4. Specific orders খুঁজতে filters use করুন
`
      }
    },
    {
      id: 'managing-orders',
      slug: 'managing-orders',
      order: 2,
      title: { en: 'Changing Order Status', bn: 'Order Status পরিবর্তন' },
      content: {
        en: `# Changing Order Status

Keep your orders organized by updating their status as they progress.

## 🔄 How to Change Status

### Method 1: From Order List
1. Go to **Orders**
2. Find the order
3. Click the **status dropdown** on that row
4. Select new status
5. Status updates instantly!

### Method 2: From Order Details
1. Open the order (click on it)
2. In the details modal, click **Confirm Order** or **Cancel**
3. Status changes and modal closes

---

## ✅ Quick Actions

From the order details modal:

| Button | What It Does |
|--------|--------------|
| **Confirm Order** | Changes Pending → Confirmed |
| **Cancel** | Changes any status → Cancelled |
| **Open Chat** | Opens the conversation for this order |

---

## 📋 Status Change Rules

| From | Can Change To |
|------|---------------|
| Pending | Confirmed, Cancelled |
| Confirmed | Shipped, Cancelled |
| Shipped | Completed, Cancelled |
| Completed | *(No changes — final state)* |
| Cancelled | *(No changes — final state)* |

---

## ⚠️ Before Cancelling

When you cancel an order:
- Customer is NOT automatically notified
- Consider sending a message explaining why
- Cancelled orders remain in history

**Reasons to cancel:**
- Customer request
- Out of stock (update your stock!)
- Invalid details
- Fraud suspicion

---

## 💡 Best Practices

1. **Confirm quickly** — Don't leave orders pending for days
2. **Update when shipped** — Customer knows to expect delivery
3. **Mark completed** — Keeps your order list clean
4. **Review cancellations** — Identify why orders fail

---

## 📊 Tracking Your Performance

Check your order status breakdown in **Analytics**:
- How many pending vs completed?
- What's your cancellation rate?
- Average time from pending to shipped?
`,
        bn: `# Order Status পরিবর্তন

Orders progress হলে status update করে organized রাখুন।

## 🔄 Status কিভাবে Change করবেন

### Method 1: Order List থেকে
1. **Orders** এ যান
2. Order খুঁজুন
3. সেই row তে **status dropdown** click করুন
4. নতুন status select করুন
5. Status instantly update হয়!

### Method 2: Order Details থেকে
1. Order open করুন (click করুন)
2. Details modal এ **Confirm Order** বা **Cancel** click করুন
3. Status change হয় আর modal close হয়

---

## ✅ Quick Actions

Order details modal থেকে:

| Button | কি করে |
|--------|--------|
| **Confirm Order** | Pending → Confirmed করে |
| **Cancel** | যেকোনো status → Cancelled করে |
| **Open Chat** | এই order এর conversation open করে |

---

## 📋 Status Change Rules

| From | কোথায় Change করতে পারেন |
|------|-------------------------|
| Pending | Confirmed, Cancelled |
| Confirmed | Shipped, Cancelled |
| Shipped | Completed, Cancelled |
| Completed | *(Change নেই — final state)* |
| Cancelled | *(Change নেই — final state)* |

---

## ⚠️ Cancel করার আগে

Order cancel করলে:
- Customer automatically notify হয় না
- কেন হলো explain করে message consider করুন
- Cancelled orders history তে থাকে

**Cancel করার reasons:**
- Customer request
- Stock নেই (stock update করুন!)
- Invalid details
- Fraud suspicion

---

## 💡 Best Practices

1. **দ্রুত confirm করুন** — Orders দিনের পর দিন pending রাখবেন না
2. **Ship হলে update করুন** — Customer জানবে delivery expect করতে
3. **Completed mark করুন** — Order list clean থাকে
4. **Cancellations review করুন** — কেন orders fail হচ্ছে identify করুন

---

## 📊 Performance Track করা

**Analytics** এ order status breakdown check করুন:
- কতগুলো pending vs completed?
- Cancellation rate কত?
- Pending থেকে shipped এ average time?
`
      }
    },
    {
      id: 'order-details',
      slug: 'order-details',
      order: 3,
      title: { en: 'Order Details Explained', bn: 'Order Details ব্যাখ্যা' },
      content: {
        en: `# Order Details Explained

When you click on an order, you see the full details modal. Here's what each section means.

## 📋 Modal Sections

### 1. Header
- **Order Number** — Unique identifier (e.g., #ORD-12345)
- **Status Badge** — Current status with color
- **Date/Time** — When order was created

### 2. Customer Section 👤
- **Name** — Customer's name
- **Phone** — Contact number (click to call!)
- **Address** — Full delivery address

### 3. Items Section 📦
Shows what was ordered:
- **Product Image** — Thumbnail
- **Product Name** — What they ordered
- **Size/Color** — If variants selected
- **Price** — Per item price
- **Quantity** — How many

### 4. Pricing Summary 💰
- **Subtotal** — Products total
- **Delivery Charge** — ৳60 (Dhaka) or ৳120 (Outside)
- **Total Amount** — Final amount to collect

### 5. Payment Info 💳
- **Payment Status** — Paid or Pending
- **Payment Method** — Cash/bKash/Nagad
- **Last 2 Digits** — If bKash payment (for verification)

### 6. Actions Section ⚡
- **Open Chat** — Go to conversation
- **Print Invoice** — Print order summary (coming soon)

---

## 🛒 Multi-Item Orders

If customer ordered multiple products:
- Each product shown in a separate row
- Individual prices and quantities
- Total combines all items

---

## 📱 Quick Copy

Need to copy customer phone or address?
- Click on the text
- Or select and copy manually

---

## 🔗 Linked Conversation

Every order links to its conversation:
1. Click **Open Chat** button
2. See the full chat history
3. Understand what customer asked for
4. Send follow-up messages if needed

---

## 💡 Tips

- **Verify phone before calling** — Some customers give wrong numbers
- **Check address carefully** — Delivery failures are costly
- **Note size/color** — Don't ship wrong variant!
- **Save important info** — Screenshot if needed
`,
        bn: `# Order Details ব্যাখ্যা

Order click করলে full details modal দেখেন। এখানে প্রতিটা section এর meaning।

## 📋 Modal Sections

### 1. Header
- **Order Number** — Unique identifier (যেমন: #ORD-12345)
- **Status Badge** — Color সহ current status
- **Date/Time** — কখন order create হয়েছে

### 2. Customer Section 👤
- **Name** — Customer এর নাম
- **Phone** — Contact number (call করতে click করুন!)
- **Address** — Full delivery address

### 3. Items Section 📦
কি order করেছে দেখায়:
- **Product Image** — Thumbnail
- **Product Name** — কি order করেছে
- **Size/Color** — Variants select করলে
- **Price** — প্রতি item এর price
- **Quantity** — কতগুলো

### 4. Pricing Summary 💰
- **Subtotal** — Products total
- **Delivery Charge** — ৳৬০ (Dhaka) বা ৳১২০ (বাইরে)
- **Total Amount** — Collect করার final amount

### 5. Payment Info 💳
- **Payment Status** — Paid বা Pending
- **Payment Method** — Cash/bKash/Nagad
- **Last 2 Digits** — bKash payment হলে (verification এর জন্য)

### 6. Actions Section ⚡
- **Open Chat** — Conversation এ যান
- **Print Invoice** — Order summary print করুন (coming soon)

---

## 🛒 Multi-Item Orders

Customer multiple products order করলে:
- প্রতি product আলাদা row তে দেখায়
- Individual prices আর quantities
- Total সব items combine করে

---

## 📱 Quick Copy

Customer phone বা address copy করতে হবে?
- Text এ click করুন
- অথবা select করে manually copy করুন

---

## 🔗 Linked Conversation

প্রতি order conversation এ link করা:
1. **Open Chat** button click করুন
2. Full chat history দেখুন
3. Customer কি চেয়েছিল বুঝুন
4. দরকার হলে follow-up messages পাঠান

---

## 💡 Tips

- **Call করার আগে phone verify করুন** — কেউ কেউ wrong number দেয়
- **Address carefully check করুন** — Delivery failures costly
- **Size/color note করুন** — Wrong variant ship করবেন না!
- **Important info save করুন** — দরকার হলে screenshot নিন
`
      }
    },
    {
      id: 'order-filters',
      slug: 'filters',
      order: 4,
      title: { en: 'Finding & Filtering Orders', bn: 'Orders খোঁজা ও Filter করা' },
      content: {
        en: `# Finding & Filtering Orders

As orders grow, finding specific ones quickly becomes important. Use filters and search to stay efficient.

## 🔍 Search

### How to Search
1. Go to **Orders** page
2. Find the search bar
3. Type customer name, phone, or order number
4. Results update instantly

### What You Can Search:
- Customer name
- Phone number
- Order number

---

## 🎛️ Filter by Status

Quickly see orders by their status:

1. Find the **status filter** dropdown
2. Select a status:
   - **All** — See everything
   - **Pending** — Needs your attention
   - **Confirmed** — Ready to ship
   - **Shipped** — On the way
   - **Completed** — Done
   - **Cancelled** — Cancelled orders

---

## 📅 Filter by Date

Find orders from specific time periods:
- **Today** — Just today's orders
- **This Week** — Last 7 days
- **This Month** — Current month
- **Custom Range** — Pick specific dates

---

## 📊 Sorting

Click column headers to sort:

| Column | Sort Options |
|--------|--------------|
| Order # | Newest first, oldest first |
| Customer | Alphabetical |
| Amount | Highest first, lowest first |
| Date | Most recent, oldest |

---

## 📄 Pagination

When you have many orders:
- Orders load 10-20 per page
- Use **Next** / **Previous** buttons
- See current page and total pages

---

## 💡 Quick Filter Combos

| What You Need | Use This |
|---------------|----------|
| Orders to confirm | Status: Pending |
| Ready to ship | Status: Confirmed |
| Check today's performance | Date: Today + Status: All |
| Find specific customer | Search: [phone number] |
| High value orders | Sort by Amount (High to Low) |

---

## 🔄 Refresh

Need to see latest orders?
- Click the **refresh icon** (🔄)
- Or reload the page

> New orders from bot show up automatically, but manual refresh ensures you have the latest!
`,
        bn: `# Orders খোঁজা ও Filter করা

Orders বাড়লে, specific orders দ্রুত খুঁজে পাওয়া important হয়ে যায়। Filters আর search use করে efficient থাকুন।

## 🔍 Search

### কিভাবে Search করবেন
1. **Orders** page এ যান
2. Search bar খুঁজুন
3. Customer name, phone, বা order number লিখুন
4. Results instantly update হয়

### যা দিয়ে Search করতে পারেন:
- Customer name
- Phone number
- Order number

---

## 🎛️ Status দিয়ে Filter

Status অনুযায়ী দ্রুত orders দেখুন:

1. **Status filter** dropdown খুঁজুন
2. একটা status select করুন:
   - **All** — সব দেখুন
   - **Pending** — আপনার attention দরকার
   - **Confirmed** — Ship এর জন্য ready
   - **Shipped** — পথে আছে
   - **Completed** — Done
   - **Cancelled** — Cancelled orders

---

## 📅 Date দিয়ে Filter

Specific time periods এর orders খুঁজুন:
- **Today** — শুধু আজকের orders
- **This Week** — Last 7 days
- **This Month** — Current month
- **Custom Range** — Specific dates pick করুন

---

## 📊 Sorting

Column headers click করে sort করুন:

| Column | Sort Options |
|--------|--------------|
| Order # | নতুন আগে, পুরাতন আগে |
| Customer | Alphabetical |
| Amount | বেশি আগে, কম আগে |
| Date | Recent আগে, পুরাতন আগে |

---

## 📄 Pagination

অনেক orders থাকলে:
- প্রতি page এ 10-20 orders load হয়
- **Next** / **Previous** buttons use করুন
- Current page আর total pages দেখুন

---

## 💡 Quick Filter Combos

| কি দরকার | এটা Use করুন |
|----------|--------------|
| Confirm করার orders | Status: Pending |
| Ship করতে ready | Status: Confirmed |
| আজকের performance check | Date: Today + Status: All |
| Specific customer খুঁজুন | Search: [phone number] |
| High value orders | Sort by Amount (High to Low) |

---

## 🔄 Refresh

Latest orders দেখতে হবে?
- **Refresh icon** (🔄) click করুন
- অথবা page reload করুন

> Bot থেকে নতুন orders automatically দেখায়, কিন্তু manual refresh করলে latest নিশ্চিত!
`
      }
    }
  ]
};
