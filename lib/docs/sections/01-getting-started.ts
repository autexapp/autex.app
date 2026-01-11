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

## What Autex AI Does

- **🤖 Automatic Order Taking** — Bot handles customer inquiries and collects order details
- **📸 Image Recognition** — Customers send product photos, AI finds matching products
- **💬 Smart Conversations** — Natural language understanding for seamless customer experience
- **📦 Order Management** — Track and manage all orders in one dashboard
- **📊 Analytics** — Insights into your sales and customer behavior

## Quick Start Guide

1. **Connect Facebook Page** — Link your business page in Settings
2. **Add Products** — Upload your products with images and prices
3. **Configure AI** — Set up greeting messages and responses
4. **Go Live** — Start receiving automated orders!

## Need Help?

Browse the sections in the sidebar to learn more about each feature. Use the language toggle (top right) to switch between English and বাংলা.
`,
        bn: `# Autex AI তে স্বাগতম

Autex AI আপনার Facebook Messenger commerce অটোমেট করার জন্য একটি intelligent assistant। এটি আপনাকে পণ্য বিক্রি, অর্ডার নেওয়া এবং customer conversation পরিচালনা করতে সাহায্য করে — সব স্বয়ংক্রিয়ভাবে।

## Autex AI যা করে

- **🤖 Automatic Order Taking** — Bot customer inquiries handle করে এবং order details collect করে
- **📸 Image Recognition** — Customer product photo পাঠালে, AI matching products খুঁজে বের করে
- **💬 Smart Conversations** — Natural language understanding দিয়ে seamless customer experience
- **📦 Order Management** — সব orders এক dashboard এ track এবং manage করুন
- **📊 Analytics** — আপনার sales এবং customer behavior এর insights

## দ্রুত শুরু করুন

1. **Facebook Page Connect করুন** — Settings এ আপনার business page link করুন
2. **Products যোগ করুন** — ছবি এবং দাম সহ আপনার products upload করুন
3. **AI Configure করুন** — Greeting messages এবং responses set up করুন
4. **Live হোন** — Automated orders পাওয়া শুরু করুন!

## সাহায্য দরকার?

প্রতিটি feature সম্পর্কে জানতে sidebar এর sections browse করুন। English এবং বাংলা এর মধ্যে switch করতে language toggle (top right) ব্যবহার করুন।
`
      },
      icon: '👋'
    },
    {
      id: 'connect-facebook',
      slug: 'connect-facebook',
      order: 2,
      title: {
        en: 'Connecting Facebook Page',
        bn: 'Facebook Page সংযুক্ত করা'
      },
      content: {
        en: `# Connecting Your Facebook Page

To start receiving automated messages, you need to connect your Facebook Business Page to Autex AI.

## Steps to Connect

1. Go to **Settings** in the sidebar
2. Click **Connect Facebook Page**
3. Log in with your Facebook account
4. Select the page you want to connect
5. Grant the required permissions

## Required Permissions

Autex AI needs these permissions to work:
- **Read messages** — To see customer inquiries
- **Send messages** — To respond automatically
- **Manage pages** — To access page settings

## Troubleshooting

**Page not showing?**
- Make sure you're an admin of the page
- Try logging out and back in

**Connection failed?**
- Check your internet connection
- Disable browser ad-blockers temporarily
`,
        bn: `# Facebook Page সংযুক্ত করা

Automated messages পেতে শুরু করতে, আপনাকে আপনার Facebook Business Page Autex AI এর সাথে connect করতে হবে।

## Connect করার ধাপ

1. Sidebar এ **Settings** এ যান
2. **Connect Facebook Page** এ click করুন
3. আপনার Facebook account দিয়ে login করুন
4. যে page connect করতে চান সেটি select করুন
5. Required permissions দিন

## Required Permissions

Autex AI কাজ করতে এই permissions দরকার:
- **Read messages** — Customer inquiries দেখতে
- **Send messages** — Automatically respond করতে
- **Manage pages** — Page settings access করতে

## সমস্যা সমাধান

**Page দেখা যাচ্ছে না?**
- নিশ্চিত করুন আপনি page এর admin
- Logout করে আবার login করার চেষ্টা করুন

**Connection failed?**
- Internet connection check করুন
- Browser ad-blockers temporarily disable করুন
`
      }
    }
  ]
};

