import { DocSection } from '../types';

export const aiFeaturesSection: DocSection = {
  id: 'smart-features',
  slug: 'smart-features',
  order: 5,
  title: {
    en: 'Smart Features',
    bn: 'Smart Features'
  },
  icon: '✨',
  articles: [
    {
      id: 'image-matching',
      slug: 'image-matching',
      order: 1,
      title: { en: 'How Photo Matching Works', bn: 'Photo Matching কিভাবে কাজ করে' },
      content: {
        en: `# How Photo Matching Works

When customers send a product photo, Autex AI finds the matching product from your catalog automatically!

## 📸 The Process

\`\`\`
Customer sends photo → AI analyzes → Matches to your products → Shows result
\`\`\`

### Step by Step:

1. **Customer sends a photo** via Messenger
2. **AI analyzes the image** — colors, patterns, shapes
3. **Compares with your catalog** — checks all your product photos
4. **Finds best match** — or asks for clarification
5. **Shows product** to customer for confirmation

---

## 🎯 Matching Accuracy

The AI works best when:

| Factor | Impact |
|--------|--------|
| More product photos uploaded | ⬆️ Higher accuracy |
| Clear, well-lit customer photos | ⬆️ Higher accuracy |
| Similar angles | ⬆️ Higher accuracy |
| Blurry/dark photos | ⬇️ Lower accuracy |
| Product not in catalog | ❌ No match |

---

## 🔄 When No Match Found

If AI can't find a match:
- Bot tells customer: "I couldn't find that product"
- Asks customer to:
  - Send another clearer photo
  - Describe what they want in words

---

## ✨ Self-Learning

The more you use Autex AI, the smarter it gets:

1. Customer sends photo → AI matches product
2. Customer confirms "Yes, this is it!"
3. AI remembers this pattern
4. Next time same/similar photo → Faster, more accurate match!

---

## 📊 What Customers See

When a match is found:
- **Product image** from your catalog
- **Product name** 
- **Price** in ৳
- **Confirmation buttons** — "Yes" or "Show more options"

---

## 💡 Tips to Improve Matching

| Do This | Result |
|---------|--------|
| Upload 3-5 photos per product | Matches from different angles |
| Use same background for all products | AI focuses on product, not background |
| Update photos regularly | Fresh photos = better matches |
| Remove old/discontinued products | No false matches |

---

## ❓ Common Questions

**Q: What if customer sends a competitor's product photo?**
A: AI will try to find something similar in your catalog, or say no match found.

**Q: Can customers search by text too?**
A: Yes! They can type "red t-shirt" and AI will search by keywords.

**Q: What if customer sends a meme or non-product photo?**
A: AI will say it couldn't identify a product and ask for clarification.
`,
        bn: `# Photo Matching কিভাবে কাজ করে

Customer product photo পাঠালে, Autex AI automatically আপনার catalog থেকে matching product খুঁজে বের করে!

## 📸 Process

\`\`\`
Customer photo পাঠায় → AI analyze করে → Products এ match করে → Result দেখায়
\`\`\`

### Step by Step:

1. **Customer Messenger এ photo পাঠায়**
2. **AI image analyze করে** — colors, patterns, shapes
3. **Catalog এর সাথে compare করে** — আপনার সব product photos check করে
4. **Best match খুঁজে বের করে** — অথবা clarification চায়
5. **Product দেখায়** customer কে confirm করতে

---

## 🎯 Matching Accuracy

AI সবচেয়ে ভালো কাজ করে যখন:

| Factor | Impact |
|--------|--------|
| বেশি product photos upload করা | ⬆️ Higher accuracy |
| Clear, well-lit customer photos | ⬆️ Higher accuracy |
| Similar angles | ⬆️ Higher accuracy |
| Blurry/dark photos | ⬇️ Lower accuracy |
| Product catalog এ নেই | ❌ No match |

---

## 🔄 Match না পেলে

AI match না পেলে:
- Bot customer কে বলে: "Product টা পেলাম না"
- Customer কে বলে:
  - আরেকটা clear photo পাঠাতে
  - কি চান words এ describe করতে

---

## ✨ Self-Learning

Autex AI যত বেশি use করবেন, তত smart হয়:

1. Customer photo পাঠায় → AI product match করে
2. Customer confirm করে "হ্যাঁ, এটাই!"
3. AI এই pattern মনে রাখে
4. পরের বার same/similar photo → দ্রুত, accurate match!

---

## 📊 Customer কি দেখে

Match হলে:
- আপনার catalog থেকে **Product image**
- **Product name** 
- **Price** ৳ তে
- **Confirmation buttons** — "Yes" বা "আরো দেখান"

---

## 💡 Matching Improve করার Tips

| এটা করুন | Result |
|----------|--------|
| প্রতি product এ 3-5 photos upload করুন | Different angles থেকে match হয় |
| সব products এ same background use করুন | AI product এ focus করে, background এ না |
| Photos regularly update করুন | Fresh photos = better matches |
| পুরনো/discontinued products remove করুন | False matches হয় না |

---

## ❓ Common Questions

**Q: Customer competitor এর product photo পাঠালে কি হয়?**
A: AI আপনার catalog এ similar কিছু খোঁজার চেষ্টা করে, অথবা no match বলে।

**Q: Customers text দিয়েও search করতে পারে?**
A: হ্যাঁ! তারা "red t-shirt" লিখলে AI keywords দিয়ে search করে।

**Q: Customer meme বা non-product photo পাঠালে?**
A: AI বলে product identify করতে পারেনি আর clarification চায়।
`
      }
    },
    {
      id: 'photo-tips',
      slug: 'photo-tips',
      order: 2,
      title: { en: 'Product Photo Best Practices', bn: 'Product Photo Tips' },
      content: {
        en: `# Product Photo Best Practices

Better photos = better AI matching = more successful orders!

## 📸 The Perfect Product Photo

### ✅ Checklist for Great Photos

| Requirement | ✅ Good | ❌ Bad |
|-------------|---------|--------|
| **Lighting** | Bright, even, natural light | Dark, shadows, harsh flash |
| **Background** | White or solid color | Cluttered, busy patterns |
| **Focus** | Sharp, clear | Blurry, out of focus |
| **Framing** | Product fills 70-80% of frame | Small product, lots of empty space |
| **Angle** | Straight on, slight angle | Extreme angles, distorted |
| **Colors** | True to life | Over-saturated, filtered |

---

## 🎯 Recommended Shots

For each product, upload these angles:

### Clothing/Apparel
1. **Front view** — Full garment, flat or on hanger
2. **Back view** — Show back design
3. **Detail shot** — Fabric texture, buttons, labels
4. **On model** (optional) — Shows fit

### Bags/Accessories
1. **Front view** — Main face
2. **Open view** — Show inside/compartments
3. **Size reference** — With hand or ruler
4. **Detail** — Zippers, straps, closures

### Shoes
1. **Side view** — Full profile
2. **Top view** — From above
3. **Sole** — Bottom view
4. **Detail** — Brand, texture

---

## 📱 Taking Photos with Phone

### Setup
1. Find good natural light (near window)
2. Use white paper/cloth as background
3. Clean your camera lens!
4. Hold phone steady (use books as support)

### Settings
- Turn OFF flash
- Use highest quality setting
- Tap to focus on product
- Use HDR if available

---

## 🚫 What to Avoid

| Don't Do This | Why |
|---------------|-----|
| Multiple products in one photo | AI gets confused |
| Heavy Instagram filters | Colors look wrong |
| Screenshots of other sites | Low quality, may be cropped |
| Blurry or dark photos | Can't analyze properly |
| Cluttered background | AI focuses on wrong things |

---

## 📊 Photo Impact on Sales

\`\`\`
Great photos → Better AI matching → Customer finds product easily → More orders!
\`\`\`

Studies show:
- Products with 3+ photos get 50% more orders
- Clear photos reduce "is this what I ordered?" complaints
- Consistent photo style builds trust

---

## 💡 Pro Tips

1. **Batch your photos** — Set up and shoot multiple products at once
2. **Save originals** — Don't compress too much
3. **Be consistent** — Same background, same style
4. **Update seasonally** — Fresh photos for new collections
`,
        bn: `# Product Photo Tips

ভালো photos = ভালো AI matching = বেশি successful orders!

## 📸 Perfect Product Photo

### ✅ Great Photos এর Checklist

| Requirement | ✅ Good | ❌ Bad |
|-------------|---------|--------|
| **Lighting** | Bright, even, natural light | Dark, shadows, harsh flash |
| **Background** | White বা solid color | Cluttered, busy patterns |
| **Focus** | Sharp, clear | Blurry, out of focus |
| **Framing** | Product frame এর 70-80% fill করে | Small product, অনেক empty space |
| **Angle** | Straight on, slight angle | Extreme angles, distorted |
| **Colors** | Real life এর মতো | Over-saturated, filtered |

---

## 🎯 Recommended Shots

প্রতি product এ এই angles upload করুন:

### Clothing/Apparel
1. **Front view** — Full garment, flat বা hanger এ
2. **Back view** — পেছনের design দেখান
3. **Detail shot** — Fabric texture, buttons, labels
4. **On model** (optional) — Fit দেখায়

### Bags/Accessories
1. **Front view** — Main face
2. **Open view** — ভেতর/compartments দেখান
3. **Size reference** — হাত বা ruler এর সাথে
4. **Detail** — Zippers, straps, closures

### Shoes
1. **Side view** — Full profile
2. **Top view** — উপর থেকে
3. **Sole** — নিচের view
4. **Detail** — Brand, texture

---

## 📱 Phone দিয়ে Photos তোলা

### Setup
1. ভালো natural light খুঁজুন (window এর কাছে)
2. White paper/cloth background হিসেবে use করুন
3. Camera lens clean করুন!
4. Phone steady ধরুন (books support এ use করুন)

### Settings
- Flash OFF করুন
- Highest quality setting use করুন
- Product এ tap করে focus করুন
- Available থাকলে HDR use করুন

---

## 🚫 কি এড়িয়ে চলবেন

| এটা করবেন না | কেন |
|--------------|-----|
| এক photo তে multiple products | AI confused হয় |
| Heavy Instagram filters | Colors wrong দেখায় |
| অন্য সাইটের screenshots | Low quality, cropped হতে পারে |
| Blurry বা dark photos | ঠিকমত analyze করতে পারে না |
| Cluttered background | AI wrong things এ focus করে |

---

## 📊 Photos এর Sales এ Impact

\`\`\`
Great photos → Better AI matching → Customer সহজে product খুঁজে পায় → বেশি orders!
\`\`\`

Studies দেখায়:
- 3+ photos আছে এমন products 50% বেশি orders পায়
- Clear photos "এটাই কি order করেছিলাম?" complaints কমায়
- Consistent photo style trust build করে

---

## 💡 Pro Tips

1. **Photos batch করুন** — Setup করে multiple products একসাথে shoot করুন
2. **Originals save করুন** — বেশি compress করবেন না
3. **Consistent থাকুন** — Same background, same style
4. **Seasonally update করুন** — নতুন collections এ fresh photos
`
      }
    }
  ]
};
