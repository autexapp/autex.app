import { DocSection } from '../types';

export const productsSection: DocSection = {
  id: 'products',
  slug: 'products',
  order: 2,
  title: {
    en: 'Products',
    bn: 'পণ্য'
  },
  icon: '📦',
  articles: [
    {
      id: 'add-product',
      slug: 'add-product',
      order: 1,
      title: { en: 'Adding a Product', bn: 'নতুন পণ্য যোগ করা' },
      content: {
        en: `# Adding a Product

Learn how to add products to your Autex AI catalog so customers can order them.

## 🛒 Steps to Add a Product

### Step 1: Open Products Page
Go to **Products** in the sidebar menu.

### Step 2: Click Add Product
Click the **+ Add Product** button in the top right corner.

### Step 3: Fill Product Details

| Field | What to Enter | Required? |
|-------|---------------|-----------|
| **Name** | Clear product name (e.g., "Blue Polo Shirt XL") | ✅ Yes |
| **Price** | Price in Taka (৳) | ✅ Yes |
| **Stock** | How many items you have | ✅ Yes |
| **Description** | Product details, material, etc. | Optional |
| **Category** | Product category | Optional |
| **Images** | Upload 1-5 product photos | ✅ Yes |

### Step 4: Save
Click **Save** to add the product to your catalog.

---

## 📸 Image Requirements

For best results:
- **Minimum 1 photo**, recommended 3-5
- **Clear, well-lit photos**
- **Different angles** (front, back, details)
- **Plain background** (white or solid colors)

> 💡 **Pro Tip:** More photos = better AI matching when customers send photos!

---

## ✨ Smart Naming Tips

Good product names help customers find what they want:

| ❌ Bad | ✅ Good |
|--------|--------|
| Shirt 1 | Blue Polo Shirt - Size L |
| Dress | Red Floral Summer Dress |
| Product A | Nike Running Shoes Black |

Include:
- Color
- Brand (if applicable)
- Size (if single size)
- Key feature

---

## 🔄 What Happens Next?

After saving:
1. Product appears in your catalog
2. AI generates image recognition data
3. Customers can now find it by sending photos!
`,
        bn: `# নতুন পণ্য যোগ করা

শিখুন কিভাবে আপনার Autex AI catalog এ products add করবেন যাতে customers order করতে পারে।

## 🛒 Product Add করার Steps

### Step 1: Products Page Open করুন
Sidebar menu তে **Products** এ যান।

### Step 2: Add Product Click করুন
Top right corner এ **+ Add Product** button click করুন।

### Step 3: Product Details পূরণ করুন

| Field | কি লিখবেন | Required? |
|-------|----------|-----------|
| **Name** | Clear product name (যেমন: "Blue Polo Shirt XL") | ✅ হ্যাঁ |
| **Price** | টাকায় দাম (৳) | ✅ হ্যাঁ |
| **Stock** | কতগুলো আছে | ✅ হ্যাঁ |
| **Description** | Product details, material, ইত্যাদি | Optional |
| **Category** | Product category | Optional |
| **Images** | ১-৫টা product photo upload করুন | ✅ হ্যাঁ |

### Step 4: Save করুন
**Save** click করুন product catalog এ add করতে।

---

## 📸 Image Requirements

Best results এর জন্য:
- **Minimum ১টা photo**, recommended ৩-৫টা
- **Clear, ভালো lighting এ photo**
- **Different angles** (সামনে, পেছনে, details)
- **Plain background** (white বা solid colors)

> 💡 **Pro Tip:** বেশি photos = customer photo পাঠালে better AI matching!

---

## ✨ Smart Naming Tips

ভালো product names customers কে find করতে help করে:

| ❌ খারাপ | ✅ ভালো |
|---------|--------|
| Shirt 1 | Blue Polo Shirt - Size L |
| Dress | Red Floral Summer Dress |
| Product A | Nike Running Shoes Black |

Include করুন:
- Color
- Brand (applicable হলে)
- Size (single size হলে)
- Key feature

---

## 🔄 এরপর কি হবে?

Save করার পর:
1. Product আপনার catalog এ appear করবে
2. AI image recognition data generate করবে
3. Customers এখন photo পাঠিয়ে find করতে পারবে!
`
      }
    },
    {
      id: 'multi-image',
      slug: 'multi-image',
      order: 2,
      title: { en: 'Adding Multiple Images', bn: 'একাধিক ছবি যোগ করা' },
      content: {
        en: `# Adding Multiple Images

Each product can have up to 5 images. More images = better matching when customers send photos!

## 📸 Why Multiple Images?

When a customer sends a product photo, Autex AI compares it against ALL your product images.

**Example:**
\`\`\`
Customer sends: Front view of t-shirt
Your images:   [Front] [Back] [Side] [Detail]
Result:        ✅ Match found using front view!
\`\`\`

If you only had the back view uploaded, the match might fail!

---

## 🖼️ How to Upload Multiple Images

### When Adding a New Product:
1. Click **Add Product**
2. You'll see 5 image slots
3. Click any slot to upload an image
4. First image becomes the **main display image**

### When Editing an Existing Product:
1. Go to **Products**
2. Click **Edit** on the product
3. Add more images to empty slots
4. Remove images by clicking the **X**

---

## ✅ Best Image Angles

For clothing/apparel:
| Angle | Why |
|-------|-----|
| Front | Main view customers see |
| Back | Shows back design |
| Side | Shows fit |
| Detail | Fabric, buttons, labels |
| On model | Shows how it looks worn |

For other products:
| Angle | Why |
|-------|-----|
| Full product | Main view |
| Close-up | Details |
| In use | Context |
| Size reference | Scale |

---

## 🎯 Image Tips

✅ **Do:**
- Use consistent lighting
- Same background for all products
- Fill the frame with the product
- Show true colors

❌ **Don't:**
- Blurry photos
- Heavy filters
- Multiple products in one image
- Cluttered backgrounds
`,
        bn: `# একাধিক ছবি যোগ করা

প্রতি product এ সর্বোচ্চ ৫টা image থাকতে পারে। বেশি images = customer photo পাঠালে better matching!

## 📸 কেন Multiple Images?

Customer product photo পাঠালে, Autex AI আপনার সব product images এর সাথে compare করে।

**Example:**
\`\`\`
Customer পাঠায়: T-shirt এর সামনের view
আপনার images: [সামনে] [পেছনে] [পাশে] [Detail]
Result:        ✅ সামনের view দিয়ে match পাওয়া গেছে!
\`\`\`

শুধু পেছনের view upload করা থাকলে, match fail হতে পারতো!

---

## 🖼️ Multiple Images কিভাবে Upload করবেন

### নতুন Product Add করার সময়:
1. **Add Product** click করুন
2. ৫টা image slot দেখবেন
3. যেকোনো slot click করে image upload করুন
4. প্রথম image হয় **main display image**

### Existing Product Edit করার সময়:
1. **Products** এ যান
2. Product এ **Edit** click করুন
3. খালি slots এ আরো images add করুন
4. **X** click করে images remove করুন

---

## ✅ Best Image Angles

Clothing/apparel এর জন্য:
| Angle | কেন |
|-------|-----|
| সামনে | Main view যেটা customers দেখে |
| পেছনে | পেছনের design দেখায় |
| পাশে | Fit দেখায় |
| Detail | Fabric, buttons, labels |
| Model এ | পরলে কেমন দেখায় |

অন্য products এর জন্য:
| Angle | কেন |
|-------|-----|
| Full product | Main view |
| Close-up | Details |
| ব্যবহারের সময় | Context |
| Size reference | Scale |

---

## 🎯 Image Tips

✅ **করুন:**
- Consistent lighting use করুন
- সব products এ same background
- Frame টা product দিয়ে fill করুন
- True colors দেখান

❌ **করবেন না:**
- Blurry photos
- Heavy filters
- এক image এ multiple products
- Cluttered backgrounds
`
      }
    },
    {
      id: 'size-color-variants',
      slug: 'size-color-variants',
      order: 3,
      title: { en: 'Size & Color Variants', bn: 'Size ও Color Variants' },
      summary: {
        en: 'Manage stock per size and color',
        bn: 'প্রতি size এবং color এ stock manage করুন'
      },
      content: {
        en: `# Size & Color Variants

Sell products in multiple sizes and colors? Track stock for each variant separately!

## 👕 How Variants Work

Instead of one stock number, you can track stock **per size**:

| Size | Stock |
|------|-------|
| S | 15 pcs |
| M | 20 pcs |
| L | 10 pcs |
| XL | 5 pcs |
| XXL | 0 pcs (Out of Stock) |

When a customer orders XL, only XL stock decreases!

---

## 📝 Setting Up Size Variants

### Step 1: Add/Edit Product
Go to the product form (Add or Edit).

### Step 2: Enable Sizes
Look for the **Sizes** section.

### Step 3: Add Available Sizes
Click to add sizes:
- S, M, L, XL, XXL
- Or custom sizes (28, 30, 32, etc.)

### Step 4: Set Stock Per Size
Enter quantity for each size individually.

---

## 🎨 Color Variants

Add available colors for your product:
1. Find the **Colors** section
2. Add color names: Red, Blue, Black, White, etc.
3. Colors help customers specify what they want

> **Note:** Color stock is typically shared (not tracked separately like sizes).

---

## 📊 Viewing Stock Breakdown

To see stock for each variant:
1. Go to **Products**
2. Click the **eye icon** (👁) on any product
3. See the **Stock Breakdown** section

You'll see a grid showing:
- Each size
- Current stock for that size
- Out-of-stock sizes highlighted in red

---

## 🤖 How the Bot Handles Variants

When a customer wants to order:

1. Bot asks: **"What size do you need?"**
2. Customer responds: "XL"
3. Bot checks if XL is in stock
4. If yes → continues order
5. If no → "Sorry, XL is out of stock. We have S, M, L available."

---

## 💡 Pro Tips

- **Keep stock updated** — Check and update weekly
- **Set low stock alerts** — Know when to reorder
- **Mark popular sizes** — Stock more of your bestsellers
- **Remove unavailable sizes** — Don't list sizes you never have
`,
        bn: `# Size ও Color Variants

Multiple sizes আর colors এ products sell করেন? প্রতি variant এর জন্য stock আলাদাভাবে track করুন!

## 👕 Variants কিভাবে কাজ করে

এক stock number এর বদলে, **প্রতি size এ** stock track করতে পারেন:

| Size | Stock |
|------|-------|
| S | ১৫ পিস |
| M | ২০ পিস |
| L | ১০ পিস |
| XL | ৫ পিস |
| XXL | ০ পিস (Out of Stock) |

Customer XL order করলে, শুধু XL stock কমে!

---

## 📝 Size Variants Setup করা

### Step 1: Product Add/Edit করুন
Product form এ যান (Add বা Edit)।

### Step 2: Sizes Enable করুন
**Sizes** section খুঁজুন।

### Step 3: Available Sizes Add করুন
Click করে sizes add করুন:
- S, M, L, XL, XXL
- অথবা custom sizes (28, 30, 32, ইত্যাদি)

### Step 4: প্রতি Size এ Stock Set করুন
প্রতি size এর জন্য আলাদা quantity enter করুন।

---

## 🎨 Color Variants

Product এ available colors add করুন:
1. **Colors** section খুঁজুন
2. Color names add করুন: Red, Blue, Black, White, ইত্যাদি
3. Colors customers কে specify করতে help করে

> **Note:** Color stock সাধারণত shared থাকে (sizes এর মতো আলাদাভাবে track হয় না)।

---

## 📊 Stock Breakdown দেখা

প্রতি variant এর stock দেখতে:
1. **Products** এ যান
2. যেকোনো product এ **eye icon** (👁) click করুন
3. **Stock Breakdown** section দেখুন

একটা grid দেখবেন যেটায়:
- প্রতিটা size
- সেই size এর current stock
- Out-of-stock sizes red এ highlighted

---

## 🤖 Bot কিভাবে Variants Handle করে

Customer order করতে চাইলে:

1. Bot জিজ্ঞেস করে: **"কোন size দরকার?"**
2. Customer বলে: "XL"
3. Bot check করে XL stock এ আছে কিনা
4. থাকলে → order continue
5. না থাকলে → "Sorry, XL stock এ নেই। S, M, L available আছে।"

---

## 💡 Pro Tips

- **Stock updated রাখুন** — Weekly check আর update করুন
- **Low stock alerts set করুন** — কখন reorder করতে হবে জানুন
- **Popular sizes mark করুন** — Bestsellers এ বেশি stock রাখুন
- **Unavailable sizes remove করুন** — যে sizes কখনো থাকে না সেগুলো list করবেন না
`
      },
      icon: '📐'
    },
    {
      id: 'edit-products',
      slug: 'edit-products',
      order: 4,
      title: { en: 'Editing & Deleting Products', bn: 'Products Edit ও Delete করা' },
      content: {
        en: `# Editing & Deleting Products

Need to update a price, add more photos, or remove a product? Here's how.

## ✏️ Editing a Product

### Step 1: Find the Product
Go to **Products** and find the product you want to edit.

### Step 2: Click Edit
Click the **pencil icon** (✏️) on the product row.

### Step 3: Make Changes
You can update:
- ✅ Product name
- ✅ Price
- ✅ Description
- ✅ Stock quantity
- ✅ Size stock
- ✅ Colors
- ✅ Add/remove images

### Step 4: Save
Click **Save** to apply changes.

> **Note:** Changes take effect immediately!

---

## 🗑️ Deleting a Product

### Before You Delete

⚠️ **Warning:** Deleting is permanent. The product will be:
- Removed from your catalog
- No longer matchable by AI
- Not available for new orders

### How to Delete

1. Go to **Products**
2. Find the product
3. Click the **trash icon** (🗑️)
4. Confirm in the popup dialog

---

## 🔄 Updating Stock Quickly

Need to just update stock? Quick way:
1. Click **Edit** on the product
2. Change only the stock number
3. Save

For size variants:
1. Edit the product
2. Find the specific size
3. Update that size's quantity
4. Save

---

## 📸 Changing Images

To add new images:
1. Edit the product
2. Click an empty image slot
3. Upload new image

To remove an image:
1. Edit the product
2. Click the **X** on the image you want to remove
3. Save

To change the main image:
1. The first image is always the main display image
2. To change it, remove the current first image
3. The next image becomes the main

---

## 💡 Tips

- **Update prices regularly** — Keep prices accurate
- **Archive instead of delete** — Set stock to 0 instead of deleting if product might return
- **Update photos seasonally** — Fresh photos improve matching
`,
        bn: `# Products Edit ও Delete করা

Price update করতে হবে, আরো photos add করতে হবে, বা product remove করতে হবে? এখানে দেখুন কিভাবে।

## ✏️ Product Edit করা

### Step 1: Product খুঁজুন
**Products** এ যান আর যে product edit করতে চান সেটা খুঁজুন।

### Step 2: Edit Click করুন
Product row তে **pencil icon** (✏️) click করুন।

### Step 3: Changes করুন
আপনি update করতে পারেন:
- ✅ Product name
- ✅ Price
- ✅ Description
- ✅ Stock quantity
- ✅ Size stock
- ✅ Colors
- ✅ Images add/remove

### Step 4: Save করুন
**Save** click করে changes apply করুন।

> **Note:** Changes immediately effect হয়!

---

## 🗑️ Product Delete করা

### Delete করার আগে

⚠️ **Warning:** Delete permanent। Product:
- Catalog থেকে remove হয়ে যাবে
- AI আর match করতে পারবে না
- নতুন orders এ available থাকবে না

### কিভাবে Delete করবেন

1. **Products** এ যান
2. Product খুঁজুন
3. **Trash icon** (🗑️) click করুন
4. Popup dialog এ confirm করুন

---

## 🔄 Stock দ্রুত Update করা

শুধু stock update করতে হবে? Quick way:
1. Product এ **Edit** click করুন
2. শুধু stock number change করুন
3. Save করুন

Size variants এর জন্য:
1. Product edit করুন
2. Specific size খুঁজুন
3. সেই size এর quantity update করুন
4. Save করুন

---

## 📸 Images Change করা

নতুন images add করতে:
1. Product edit করুন
2. খালি image slot এ click করুন
3. নতুন image upload করুন

Image remove করতে:
1. Product edit করুন
2. যে image remove করতে চান তার **X** click করুন
3. Save করুন

Main image change করতে:
1. প্রথম image সবসময় main display image
2. Change করতে, current প্রথম image remove করুন
3. পরের image main হয়ে যাবে

---

## 💡 Tips

- **Prices regularly update করুন** — Prices accurate রাখুন
- **Delete না করে archive করুন** — Product ফিরে আসতে পারলে delete না করে stock 0 করুন
- **Photos seasonally update করুন** — Fresh photos matching improve করে
`
      }
    },
    {
      id: 'product-search',
      slug: 'product-search',
      order: 5,
      title: { en: 'Search & Organization', bn: 'Search ও Organization' },
      content: {
        en: `# Search & Organization

As your catalog grows, finding products quickly becomes important. Here's how to stay organized.

## 🔍 Searching Products

### Quick Search
1. Go to **Products** page
2. Find the **search bar** at the top
3. Type product name, category, or keywords
4. Results filter instantly!

### What You Can Search By:
- Product name
- Category
- Description keywords

---

## 📋 Sorting & Filtering

### Sort Options
Click the column headers to sort:
- **Name** — Alphabetical order
- **Price** — Low to high or high to low
- **Stock** — See low stock first

### Filter by Category
If you use categories:
- Select category from dropdown
- See only products in that category

---

## 📄 Pagination

When you have many products:
- Products load 10-20 per page
- Use **Next** / **Previous** buttons
- Or click page numbers directly

---

## 🏷️ Categories Best Practices

Organize your products with categories:

| Good Categories | Why |
|----------------|-----|
| T-Shirts | Specific product type |
| Formal Wear | Occasion-based |
| Men's | Gender-based |
| Summer Collection | Season-based |

| Avoid | Why |
|-------|-----|
| Products | Too generic |
| New | Changes over time |
| Misc | Hard to find |

---

## 💡 Quick Tips

1. **Consistent naming** — Use same format for all products
2. **Use categories** — Makes filtering easier
3. **Regular cleanup** — Remove old/discontinued products
4. **Check low stock** — Sort by stock to find items needing reorder

---

## 📊 Product Overview at a Glance

The products table shows:
| Column | Information |
|--------|-------------|
| Image | Product thumbnail |
| Name | Product name |
| Price | In Taka (৳) |
| Stock | Available quantity |
| Actions | View, Edit, Delete buttons |

Click the **eye icon** (👁) for detailed view with all images and size breakdown!
`,
        bn: `# Search ও Organization

Catalog বড় হলে, products দ্রুত খুঁজে পাওয়া important হয়ে যায়। এখানে দেখুন কিভাবে organized থাকবেন।

## 🔍 Products Search করা

### Quick Search
1. **Products** page এ যান
2. উপরে **search bar** খুঁজুন
3. Product name, category, বা keywords লিখুন
4. Results instantly filter হবে!

### যা দিয়ে Search করতে পারেন:
- Product name
- Category
- Description keywords

---

## 📋 Sorting ও Filtering

### Sort Options
Column headers click করে sort করুন:
- **Name** — Alphabetical order
- **Price** — Low to high বা high to low
- **Stock** — Low stock আগে দেখুন

### Category দিয়ে Filter
Categories use করলে:
- Dropdown থেকে category select করুন
- শুধু সেই category র products দেখুন

---

## 📄 Pagination

অনেক products থাকলে:
- প্রতি page এ 10-20 products load হয়
- **Next** / **Previous** buttons use করুন
- অথবা page numbers directly click করুন

---

## 🏷️ Categories Best Practices

Categories দিয়ে products organize করুন:

| ভালো Categories | কেন |
|-----------------|-----|
| T-Shirts | Specific product type |
| Formal Wear | Occasion-based |
| Men's | Gender-based |
| Summer Collection | Season-based |

| এড়িয়ে চলুন | কেন |
|-------------|-----|
| Products | অনেক generic |
| New | Time এর সাথে change হয় |
| Misc | খুঁজে পাওয়া কঠিন |

---

## 💡 Quick Tips

1. **Consistent naming** — সব products এ same format use করুন
2. **Categories use করুন** — Filtering সহজ করে
3. **Regular cleanup** — পুরনো/discontinued products remove করুন
4. **Low stock check করুন** — Stock দিয়ে sort করে দেখুন কি reorder করতে হবে

---

## 📊 Product Overview এক নজরে

Products table এ দেখায়:
| Column | Information |
|--------|-------------|
| Image | Product thumbnail |
| Name | Product name |
| Price | টাকায় (৳) |
| Stock | Available quantity |
| Actions | View, Edit, Delete buttons |

Detailed view এর জন্য **eye icon** (👁) click করুন সব images আর size breakdown দেখতে!
`
      }
    }
  ]
};
