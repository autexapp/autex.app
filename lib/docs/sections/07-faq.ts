import { DocSection } from '../types';

export const faqSection: DocSection = {
  id: 'faq',
  slug: 'faq',
  order: 7,
  title: {
    en: 'Help & FAQ',
    bn: 'সাহায্য ও FAQ'
  },
  icon: '❓',
  articles: [
    {
      id: 'frequently-asked',
      slug: 'common-questions',
      order: 1,
      title: { en: 'Frequently Asked Questions', bn: 'সচরাচর জিজ্ঞাসিত প্রশ্ন' },
      content: {
        en: `# Frequently Asked Questions

Quick answers to the most common questions about Autex AI.

---

## 🤖 About the Bot

### Q: Does the bot work 24/7?
**A:** Yes! Once enabled, the bot responds to customer messages around the clock, even when you're asleep.

### Q: What languages does the bot understand?
**A:** The bot understands both English and বাংলা, including mixed Banglish messages.

### Q: Can the bot handle multiple customers at once?
**A:** Absolutely! The bot can manage hundreds of conversations simultaneously without delays.

### Q: What if the bot gives a wrong response?
**A:** You can take manual control anytime. Just send a message in the conversation and the bot will pause.

---

## 📸 Image Recognition

### Q: How accurate is the image matching?
**A:** Very accurate when you have good product photos. The more photos you upload per product, the better the matching.

### Q: What if a customer sends a blurry photo?
**A:** The bot will ask them to send a clearer photo or describe what they want in words.

### Q: Does it only match my products?
**A:** Yes, the bot only matches photos to products in YOUR catalog. It won't suggest competitor products.

---

## 🛍️ Orders

### Q: How quickly do orders appear in my dashboard?
**A:** Instantly! As soon as the bot completes an order, it shows up in your Orders page.

### Q: Can I edit an order after it's created?
**A:** Yes, you can change status, but editing customer details or products requires accessing the database directly (coming soon in UI).

### Q: What happens if a product is out of stock?
**A:** The bot will inform the customer that the product is unavailable and suggest alternatives if possible.

---

## 💰 Pricing & Payment

### Q: Can I set different prices for different customers?
**A:** Currently, prices are fixed per product. Negotiated prices would need manual intervention.

### Q: Does the bot collect payment?
**A:** The bot collects payment confirmation (like bKash last 2 digits) but doesn't process payments directly.

---

## ⚙️ Technical

### Q: What happens if my internet goes down?
**A:** The bot runs on our servers, so it continues working. Your dashboard just won't update until you're back online.

### Q: Is my customer data safe?
**A:** Yes, all data is encrypted and stored securely. We never share your data with third parties.

### Q: Can I use this with Instagram?
**A:** Currently, Autex AI works with Facebook Messenger only. Instagram support is planned for the future.
`,
        bn: `# সচরাচর জিজ্ঞাসিত প্রশ্ন

Autex AI সম্পর্কে সবচেয়ে common প্রশ্নের quick answers।

---

## 🤖 Bot সম্পর্কে

### Q: Bot কি 24/7 কাজ করে?
**A:** হ্যাঁ! Enable করা থাকলে, bot সারাদিন সারারাত customer messages এ respond করে, এমনকি আপনি ঘুমালেও।

### Q: Bot কোন languages বোঝে?
**A:** Bot English আর বাংলা দুটোই বোঝে, mixed Banglish messages সহ।

### Q: Bot কি একসাথে অনেক customers handle করতে পারে?
**A:** অবশ্যই! Bot কোনো delay ছাড়াই একসাথে শতাধিক conversations manage করতে পারে।

### Q: Bot wrong response দিলে কি হবে?
**A:** আপনি যেকোনো সময় manual control নিতে পারেন। Conversation এ একটা message পাঠান আর bot pause হয়ে যাবে।

---

## 📸 Image Recognition

### Q: Image matching কতটা accurate?
**A:** ভালো product photos থাকলে অনেক accurate। প্রতি product এ যত বেশি photos upload করবেন, matching তত ভালো হবে।

### Q: Customer blurry photo পাঠালে কি হবে?
**A:** Bot তাদের আরো clear photo পাঠাতে বা words এ describe করতে বলবে।

### Q: শুধু আমার products match হয়?
**A:** হ্যাঁ, bot শুধু আপনার catalog এর products এ photos match করে। Competitor products suggest করে না।

---

## 🛍️ Orders

### Q: Orders কত দ্রুত dashboard এ দেখায়?
**A:** Instantly! Bot order complete করা মাত্র, আপনার Orders page এ দেখায়।

### Q: Order create হওয়ার পর edit করতে পারি?
**A:** Status change করতে পারেন, কিন্তু customer details বা products edit করতে database access লাগে (UI তে আসছে soon)।

### Q: Product stock এ না থাকলে কি হয়?
**A:** Bot customer কে জানায় product available নেই আর সম্ভব হলে alternatives suggest করে।

---

## 💰 Pricing ও Payment

### Q: Different customers দের different prices দিতে পারি?
**A:** Currently, prices product অনুযায়ী fixed। Negotiated prices এ manual intervention দরকার।

### Q: Bot কি payment collect করে?
**A:** Bot payment confirmation collect করে (যেমন bKash last 2 digits) কিন্তু directly payments process করে না।

---

## ⚙️ Technical

### Q: Internet না থাকলে কি হবে?
**A:** Bot আমাদের servers এ run করে, তাই কাজ চালিয়ে যায়। আপনার dashboard শুধু online না হওয়া পর্যন্ত update হয় না।

### Q: Customer data কি safe?
**A:** হ্যাঁ, সব data encrypted আর securely stored। আমরা কখনো third parties এর সাথে আপনার data share করি না।

### Q: Instagram এ use করতে পারি?
**A:** Currently, Autex AI শুধু Facebook Messenger এ কাজ করে। Instagram support future এ আসছে।
`
      }
    },
    {
      id: 'troubleshooting',
      slug: 'troubleshooting',
      order: 2,
      title: { en: 'Troubleshooting Guide', bn: 'সমস্যা সমাধান' },
      content: {
        en: `# Troubleshooting Guide

Having issues? Find solutions to common problems here.

---

## 🤖 Bot Not Responding

### Symptoms
- Customers message but get no reply
- Messages show as read but no response

### Solutions

| Check This | How to Fix |
|------------|------------|
| Bot is turned off | Go to Settings → Turn bot ON |
| Page disconnected | Go to Settings → Reconnect page |
| Bot in Manual mode | Check conversation → Switch to Bot mode |
| Permissions revoked | Disconnect and reconnect page |

---

## 📸 Image Matching Not Working

### Symptoms
- Bot says "couldn't find product" for known products
- Wrong products being matched

### Solutions

| Problem | Fix |
|---------|-----|
| No product photos | Upload at least 1 photo per product |
| Poor quality photos | Replace with clear, well-lit photos |
| Product not in catalog | Add the product first |
| Similar products confusing bot | Add more distinctive photos |

---

## 📱 Facebook Page Issues

### "Can't Connect Page"

1. **Check admin access** — You must be page admin
2. **Use correct account** — Log in with admin Facebook account
3. **Clear browser cache** — Try incognito/private window
4. **Try different browser** — Chrome usually works best

### "Page Disconnected Unexpectedly"

This can happen if:
- Facebook permissions were revoked
- Facebook token expired
- Page admin changed

**Solution:** Go to Settings and reconnect the page.

---

## 💬 Conversation Problems

### Bot Keeps Repeating Same Question

**Cause:** Bot can't understand customer's response

**Solutions:**
1. **Manual override** — Change state to next step
2. **Send manual message** — Help customer
3. **Check if issue is common** — Improve your training

### Customer Stuck in Flow

**Solution:** 
1. Go to Conversations
2. Find the stuck conversation
3. Use state dropdown to reset to IDLE
4. Or jump to specific state

---

## 📦 Order Issues

### Order Not Appearing

**Possible causes:**
- Order not fully completed
- Customer cancelled mid-flow
- Page disconnected during order

**Solution:** Check the conversation to see where flow stopped.

### Wrong Amount Calculated

**Check:**
- Product price is correct
- Delivery charge is set correctly
- No duplicate items

---

## 🌐 Dashboard Problems

### Page Won't Load

1. **Check internet connection**
2. **Clear browser cache**
3. **Try different browser**
4. **Wait a few minutes** — Server might be restarting

### Data Not Updating

1. **Refresh the page**
2. **Check last update time**
3. **Try logging out and back in**

---

## 📞 Still Need Help?

If nothing works:
1. Note the exact problem
2. Take screenshots
3. Contact support with details

We're here to help! 🙌
`,
        bn: `# সমস্যা সমাধান

সমস্যা হচ্ছে? এখানে common problems এর solutions পান।

---

## 🤖 Bot Respond করছে না

### Symptoms
- Customers message করে কিন্তু reply পায় না
- Messages read দেখায় কিন্তু response নেই

### Solutions

| এটা Check করুন | কিভাবে Fix করবেন |
|----------------|------------------|
| Bot off আছে | Settings এ যান → Bot ON করুন |
| Page disconnect হয়ে গেছে | Settings এ যান → Page reconnect করুন |
| Bot Manual mode এ | Conversation check করুন → Bot mode এ switch করুন |
| Permissions revoke হয়ে গেছে | Disconnect করে reconnect করুন |

---

## 📸 Image Matching কাজ করছে না

### Symptoms
- Known products এর জন্য bot বলে "product পাইনি"
- Wrong products match হচ্ছে

### Solutions

| Problem | Fix |
|---------|-----|
| Product photos নেই | প্রতি product এ কমপক্ষে ১টা photo upload করুন |
| Poor quality photos | Clear, well-lit photos দিয়ে replace করুন |
| Product catalog এ নেই | আগে product add করুন |
| Similar products bot কে confuse করছে | আরো distinctive photos add করুন |

---

## 📱 Facebook Page Issues

### "Page Connect করতে পারছি না"

1. **Admin access check করুন** — Page admin হতে হবে
2. **সঠিক account use করুন** — Admin Facebook account দিয়ে login করুন
3. **Browser cache clear করুন** — Incognito/private window try করুন
4. **Different browser try করুন** — Chrome সাধারণত best কাজ করে

### "Page Unexpectedly Disconnect হয়ে গেছে"

এটা হতে পারে যদি:
- Facebook permissions revoke হয়ে গেছে
- Facebook token expire হয়েছে
- Page admin change হয়েছে

**Solution:** Settings এ গিয়ে page reconnect করুন।

---

## 💬 Conversation Problems

### Bot একই Question বারবার করছে

**Cause:** Bot customer এর response বুঝতে পারছে না

**Solutions:**
1. **Manual override** — পরের step এ state change করুন
2. **Manual message পাঠান** — Customer কে help করুন
3. **Issue common কিনা check করুন** — Training improve করুন

### Customer Flow এ Stuck হয়ে গেছে

**Solution:** 
1. Conversations এ যান
2. Stuck conversation খুঁজুন
3. State dropdown use করে IDLE তে reset করুন
4. অথবা specific state এ jump করুন

---

## 📦 Order Issues

### Order দেখা যাচ্ছে না

**Possible causes:**
- Order fully complete হয়নি
- Customer mid-flow এ cancel করেছে
- Order এর সময় page disconnect হয়েছিল

**Solution:** Conversation check করুন কোথায় flow থেমে গেছে।

### Amount Wrong Calculate হয়েছে

**Check করুন:**
- Product price correct আছে
- Delivery charge correctly set আছে
- Duplicate items নেই

---

## 🌐 Dashboard Problems

### Page Load হচ্ছে না

1. **Internet connection check করুন**
2. **Browser cache clear করুন**
3. **Different browser try করুন**
4. **কিছুক্ষণ wait করুন** — Server restart হচ্ছে হয়তো

### Data Update হচ্ছে না

1. **Page refresh করুন**
2. **Last update time check করুন**
3. **Logout করে আবার login করুন**

---

## 📞 এখনো Help দরকার?

কিছুই কাজ না করলে:
1. Exact problem note করুন
2. Screenshots নিন
3. Details সহ support এ contact করুন

আমরা help করতে আছি! 🙌
`
      }
    },
    {
      id: 'getting-support',
      slug: 'getting-support',
      order: 3,
      title: { en: 'Getting Support', bn: 'Support পাওয়া' },
      content: {
        en: `# Getting Support

Need help that isn't in the documentation? Here's how to reach us.

## 📞 Contact Options

| Channel | Best For | Response Time |
|---------|----------|---------------|
| 📧 Email | Detailed issues, account problems | 24-48 hours |
| 💬 Live Chat | Quick questions | Minutes (business hours) |
| 📱 WhatsApp | Urgent issues | Same day |

---

## 📧 Email Support

**Email:** support@autexai.com

**Include in your email:**
- Your account email
- Description of the problem
- Screenshots (if helpful)
- Steps you already tried

---

## 💬 In-App Chat

For quick questions:
1. Look for the **chat icon** (bottom right corner)
2. Click to open chat
3. Type your question
4. We'll respond as soon as possible!

---

## 📱 WhatsApp Support

For urgent issues:
- **WhatsApp:** [Contact Number]
- Send a message describing your issue
- Include your email/account info

---

## 🎥 Video Tutorials

Coming soon! We're creating video guides covering:
- First-time setup
- Adding products
- Managing orders
- Bot configuration
- And more!

---

## 📚 Self-Help Resources

Before contacting support, try:

1. **This Help Center** — Search for your topic
2. **FAQ section** — Common questions answered
3. **Troubleshooting guide** — Step-by-step fixes
4. **Refresh your page** — Sometimes that's all it takes!

---

## 🐛 Reporting Bugs

Found a bug? Help us fix it!

**Good bug report includes:**
- What you were trying to do
- What actually happened
- What browser you're using
- Screenshots or screen recording
- Steps to reproduce

---

## 💡 Feature Requests

Have ideas to make Autex AI better?

We love hearing from you! Send your suggestions to:
- **Email:** feedback@autexai.com
- **Subject:** Feature Request: [Your Idea]

---

## 🙏 Thank You!

Thank you for using Autex AI. We're committed to making your experience great!

We read every message and constantly work to improve.
`,
        bn: `# Support পাওয়া

Documentation এ নেই এমন help দরকার? এভাবে আমাদের কাছে পৌঁছাতে পারেন।

## 📞 Contact Options

| Channel | কিসের জন্য Best | Response Time |
|---------|-----------------|---------------|
| 📧 Email | Detailed issues, account problems | ২৪-৪৮ ঘন্টা |
| 💬 Live Chat | Quick questions | Minutes (business hours এ) |
| 📱 WhatsApp | Urgent issues | Same day |

---

## 📧 Email Support

**Email:** support@autexai.com

**Email এ include করুন:**
- আপনার account email
- Problem এর description
- Screenshots (helpful হলে)
- আগে কি try করেছেন

---

## 💬 In-App Chat

Quick questions এর জন্য:
1. **Chat icon** খুঁজুন (নিচে ডান দিকে)
2. Click করে chat open করুন
3. Question type করুন
4. যত দ্রুত সম্ভব respond করব!

---

## 📱 WhatsApp Support

Urgent issues এর জন্য:
- **WhatsApp:** [Contact Number]
- Issue describe করে message পাঠান
- আপনার email/account info include করুন

---

## 🎥 Video Tutorials

Coming soon! Video guides তৈরি করছি:
- First-time setup
- Products add করা
- Orders manage করা
- Bot configuration
- আর অনেক কিছু!

---

## 📚 Self-Help Resources

Support এ contact করার আগে, try করুন:

1. **এই Help Center** — আপনার topic search করুন
2. **FAQ section** — Common questions answered
3. **Troubleshooting guide** — Step-by-step fixes
4. **Page refresh করুন** — কখনো এটাই enough!

---

## 🐛 Bugs Report করা

Bug পেয়েছেন? Fix করতে help করুন!

**ভালো bug report এ থাকে:**
- কি করার চেষ্টা করছিলেন
- Actually কি হয়েছে
- কোন browser use করছেন
- Screenshots বা screen recording
- Reproduce করার steps

---

## 💡 Feature Requests

Autex AI better করার ideas আছে?

আপনার কাছ থেকে শুনতে ভালো লাগে! Suggestions পাঠান:
- **Email:** feedback@autexai.com
- **Subject:** Feature Request: [আপনার Idea]

---

## 🙏 ধন্যবাদ!

Autex AI use করার জন্য ধন্যবাদ। আপনার experience great করতে committed আছি!

আমরা প্রতিটা message পড়ি আর constantly improve করি।
`
      }
    }
  ]
};
