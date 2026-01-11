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
      title: { en: 'Order Lifecycle', bn: 'অর্ডারের জীবনচক্র' },
      content: {
        en: `# Order Lifecycle

Every order in Autex AI goes through a series of statuses from creation to delivery.

## Order Statuses

| Status | Description |
|--------|-------------|
| **Pending** | New order, waiting for review |
| **Confirmed** | Order confirmed, preparing to ship |
| **Shipped** | Order is on the way |
| **Delivered** | Customer received the order |
| **Cancelled** | Order was cancelled |

## Typical Flow

\`\`\`
📝 Pending → ✅ Confirmed → 🚚 Shipped → 📦 Delivered
\`\`\`

## Viewing Orders

1. Go to **Orders** in the sidebar
2. Use filters to find specific orders
3. Click any order to see details

## Order Details Include

- Customer name, phone, address
- Products ordered with quantities
- Total amount and delivery charge
- Conversation link
- Created date and time
`,
        bn: `# অর্ডারের জীবনচক্র

Autex AI এর প্রতিটি order creation থেকে delivery পর্যন্ত বিভিন্ন status এর মধ্য দিয়ে যায়।

## Order Statuses

| Status | বর্ণনা |
|--------|--------|
| **Pending** | নতুন order, review এর জন্য অপেক্ষা করছে |
| **Confirmed** | Order confirmed, ship করার জন্য prepare হচ্ছে |
| **Shipped** | Order পথে আছে |
| **Delivered** | Customer order পেয়ে গেছে |
| **Cancelled** | Order cancel হয়েছে |

## সাধারণ Flow

\`\`\`
📝 Pending → ✅ Confirmed → 🚚 Shipped → 📦 Delivered
\`\`\`

## Orders দেখা

1. Sidebar এ **Orders** এ যান
2. Specific orders খুঁজতে filters ব্যবহার করুন
3. Details দেখতে যেকোনো order এ click করুন

## Order Details এ থাকে

- Customer name, phone, address
- Ordered products with quantities
- Total amount এবং delivery charge
- Conversation link
- Created date এবং time
`
      }
    },
    {
      id: 'managing-orders',
      slug: 'managing-orders',
      order: 2,
      title: { en: 'Managing Orders', bn: 'অর্ডার ম্যানেজ করা' },
      content: {
        en: `# Managing Orders

Learn how to update, edit, and manage orders effectively.

## Changing Order Status

1. Open an order from the Orders page
2. Look for the status dropdown
3. Select new status
4. Changes are saved automatically

## Editing Order Details

You can edit:
- Customer name, phone, address
- Product quantities
- Delivery charge
- Add/remove products

## Delivery Charges

Set delivery charges based on location:
- **Inside Dhaka** — Usually lower charge
- **Outside Dhaka** — Higher charge

Configure default charges in **Settings > Delivery**.

## Tips

- Review pending orders quickly
- Update status as order progresses
- Check phone numbers before shipping
`,
        bn: `# অর্ডার ম্যানেজ করা

শিখুন কিভাবে orders update, edit এবং effectively manage করবেন।

## Order Status পরিবর্তন

1. Orders page থেকে একটি order open করুন
2. Status dropdown খুঁজুন
3. নতুন status select করুন
4. Changes automatically save হয়

## Order Details Edit করা

আপনি edit করতে পারেন:
- Customer name, phone, address
- Product quantities
- Delivery charge
- Products add/remove

## Delivery Charges

Location অনুযায়ী delivery charges set করুন:
- **ঢাকার ভিতরে** — সাধারণত কম charge
- **ঢাকার বাইরে** — বেশি charge

Default charges **Settings > Delivery** এ configure করুন।

## টিপস

- Pending orders দ্রুত review করুন
- Order progress অনুযায়ী status update করুন
- Shipping এর আগে phone numbers check করুন
`
      }
    }
  ]
};
