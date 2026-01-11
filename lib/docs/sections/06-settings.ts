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
      title: { en: 'AI Setup', bn: 'AI সেটআপ' },
      content: {
        en: `# AI Setup

Configure how the AI bot communicates with your customers.

## Accessing AI Setup

Go to **AI Setup** in the sidebar.

## Configurable Settings

### Greeting Message
The first message customers see when they message your page.

**Example:**
> "আসসালামু আলাইকুম! 🌟 [Shop Name] এ স্বাগতম। পছন্দের পণ্যের ছবি পাঠান, আমি অর্ডার নিতে সাহায্য করব!"

### Out of Stock Message
What to say when a product is out of stock.

### Business Information
- Shop name
- Contact details
- Operating hours

## Tips

- Keep messages friendly and helpful
- Use emojis for a personal touch
- Include your shop name
- Mention what customers should do next
`,
        bn: `# AI সেটআপ

AI bot কিভাবে customers এর সাথে communicate করবে সেটা configure করুন।

## AI Setup এ যাওয়া

Sidebar এ **AI Setup** এ যান।

## Configurable Settings

### Greeting Message
Customers আপনার page এ message করলে যে প্রথম message দেখে।

**উদাহরণ:**
> "আসসালামু আলাইকুম! 🌟 [Shop Name] এ স্বাগতম। পছন্দের পণ্যের ছবি পাঠান, আমি অর্ডার নিতে সাহায্য করব!"

### Out of Stock Message
Product stock এ না থাকলে কী বলবে।

### Business Information
- Shop name
- Contact details
- Operating hours

## টিপস

- Messages friendly এবং helpful রাখুন
- Personal touch এর জন্য emojis ব্যবহার করুন
- আপনার shop name include করুন
- Customers এর next step mention করুন
`
      }
    },
    {
      id: 'delivery-settings',
      slug: 'delivery-settings',
      order: 2,
      title: { en: 'Delivery Settings', bn: 'ডেলিভারি সেটিংস' },
      content: {
        en: `# Delivery Settings

Configure delivery charges and options for your orders.

## Setting Delivery Charges

1. Go to **Settings** in sidebar
2. Find **Delivery Settings** section
3. Set charges for:
   - Inside Dhaka
   - Outside Dhaka

## Common Pricing

| Location | Typical Charge |
|----------|----------------|
| Inside Dhaka | ৳60 - ৳80 |
| Outside Dhaka | ৳120 - ৳150 |

## Tips

- Consider free delivery for orders above a certain amount
- Update charges if courier prices change
- Be transparent about delivery costs
`,
        bn: `# ডেলিভারি সেটিংস

আপনার orders এর জন্য delivery charges এবং options configure করুন।

## Delivery Charges সেট করা

1. Sidebar এ **Settings** এ যান
2. **Delivery Settings** section খুঁজুন
3. Charges set করুন:
   - ঢাকার ভিতরে
   - ঢাকার বাইরে

## সাধারণ Pricing

| Location | Typical Charge |
|----------|----------------|
| ঢাকার ভিতরে | ৳৬০ - ৳৮০ |
| ঢাকার বাইরে | ৳১২০ - ৳১৫০ |

## টিপস

- নির্দিষ্ট amount এর উপরে free delivery consider করুন
- Courier prices পরিবর্তন হলে charges update করুন
- Delivery costs সম্পর্কে transparent থাকুন
`
      }
    }
  ]
};
