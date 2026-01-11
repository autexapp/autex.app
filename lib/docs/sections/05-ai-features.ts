import { DocSection } from '../types';

export const aiFeaturesSection: DocSection = {
  id: 'ai-features',
  slug: 'ai-features',
  order: 5,
  title: {
    en: 'AI Features',
    bn: 'AI সুবিধাসমূহ'
  },
  icon: '🤖',
  articles: [
    {
      id: 'image-matching',
      slug: 'image-matching',
      order: 1,
      title: { en: 'Image Matching', bn: 'ইমেজ ম্যাচিং' },
      content: {
        en: `# Image Matching

Autex AI uses advanced image recognition to match customer photos with your products.

## How It Works

1. Customer sends a product photo
2. AI analyzes the image
3. Matches against your product catalog
4. Returns best matching product(s)

## Improving Match Accuracy

- **Upload multiple images** per product (different angles)
- **Use clear photos** with good lighting
- **Plain backgrounds** help AI focus on the product
- **Keep products updated** — remove old items

## When Matching Fails

If AI can't find a match:
- Bot asks customer to send another photo
- Or asks for product name/description
- You can also manually assist

## Match Results

Customers see:
- Product image
- Name and price
- Option to confirm or see more
`,
        bn: `# ইমেজ ম্যাচিং

Autex AI advanced image recognition ব্যবহার করে customer photos আপনার products এর সাথে match করে।

## এটা কিভাবে কাজ করে

1. Customer product photo পাঠায়
2. AI image analyze করে
3. আপনার product catalog এর সাথে match করে
4. Best matching product(s) return করে

## Match Accuracy উন্নত করা

- **Multiple images upload করুন** প্রতি product এ (different angles)
- **Clear photos ব্যবহার করুন** good lighting সহ
- **Plain backgrounds** AI কে product এ focus করতে সাহায্য করে
- **Products updated রাখুন** — old items remove করুন

## Matching Fail হলে

AI match না পেলে:
- Bot customer কে আরেকটা photo পাঠাতে বলে
- অথবা product name/description জিজ্ঞেস করে
- আপনি manually assist ও করতে পারেন

## Match Results

Customers দেখে:
- Product image
- Name এবং price
- Confirm করার বা আরো দেখার option
`
      }
    },
    {
      id: 'photo-tips',
      slug: 'photo-tips',
      order: 2,
      title: { en: 'Product Photo Best Practices', bn: 'প্রোডাক্ট ফটো টিপস' },
      content: {
        en: `# Product Photo Best Practices

Better photos = better AI matching = happier customers!

## The Perfect Product Photo

✅ **Good lighting** — Natural light or bright, even lighting
✅ **Plain background** — White or solid colors work best
✅ **Product focus** — Fill the frame with the product
✅ **Multiple angles** — Front, back, side views
✅ **True colors** — Accurate color representation

## What to Avoid

❌ Blurry or dark photos
❌ Cluttered backgrounds
❌ Multiple products in one photo
❌ Heavy filters or editing
❌ Very small product in large frame

## Photo Checklist

- [ ] Is the product clearly visible?
- [ ] Is the lighting good?
- [ ] Is the background clean?
- [ ] Have I uploaded multiple angles?
- [ ] Do colors look accurate?
`,
        bn: `# প্রোডাক্ট ফটো টিপস

ভালো photos = ভালো AI matching = খুশি customers!

## Perfect Product Photo

✅ **Good lighting** — Natural light বা bright, even lighting
✅ **Plain background** — White বা solid colors সবচেয়ে ভালো
✅ **Product focus** — Frame এ product দিয়ে fill করুন
✅ **Multiple angles** — সামনে, পেছনে, পাশ views
✅ **True colors** — Accurate color representation

## যা এড়িয়ে চলবেন

❌ Blurry বা dark photos
❌ Cluttered backgrounds
❌ এক photo তে multiple products
❌ Heavy filters বা editing
❌ Large frame এ very small product

## Photo Checklist

- [ ] Product clearly visible?
- [ ] Lighting ভালো?
- [ ] Background clean?
- [ ] Multiple angles upload করেছি?
- [ ] Colors accurate দেখাচ্ছে?
`
      }
    }
  ]
};
