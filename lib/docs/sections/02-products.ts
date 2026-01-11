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

## Steps to Add a Product

1. Go to **Products** in the sidebar
2. Click the **Add Product** button (top right)
3. Fill in the product details:
   - **Name** — Product name (e.g., "Blue T-Shirt XL")
   - **Price** — Price in Taka (৳)
   - **Description** — Optional details about the product
   - **Images** — Upload up to 5 product photos

4. Click **Save** to add the product

## Tips for Better Results

- **Clear product names** — Include size, color, or variant in the name
- **Multiple images** — Upload different angles for better image matching
- **Accurate prices** — Double-check prices before saving

## Stock Management

You can set stock quantities for:
- **Simple products** — Single stock count
- **Size variants** — Different stock per size (S, M, L, XL, XXL)
- **Color variants** — Different stock per color

When stock reaches zero, the product won't be offered to customers.
`,
        bn: `# নতুন পণ্য যোগ করা

শিখুন কিভাবে আপনার Autex AI catalog এ products যোগ করবেন যাতে customer অর্ডার করতে পারে।

## Product যোগ করার ধাপ

1. Sidebar এ **Products** এ যান
2. **Add Product** button এ click করুন (top right)
3. Product details পূরণ করুন:
   - **Name** — Product এর নাম (যেমন: "Blue T-Shirt XL")
   - **Price** — টাকায় দাম (৳)
   - **Description** — Product সম্পর্কে optional details
   - **Images** — সর্বোচ্চ ৫টি product photo upload করুন

4. Product যোগ করতে **Save** click করুন

## ভালো Result এর জন্য টিপস

- **Clear product names** — নামে size, color, বা variant include করুন
- **Multiple images** — Better image matching এর জন্য different angles upload করুন
- **Accurate prices** — Save করার আগে prices double-check করুন

## Stock Management

আপনি stock quantities set করতে পারেন:
- **Simple products** — Single stock count
- **Size variants** — প্রতি size এ different stock (S, M, L, XL, XXL)
- **Color variants** — প্রতি color এ different stock

Stock zero হলে, product টি customers দের offer করা হবে না।
`
      }
    },
    {
      id: 'multi-image',
      slug: 'multi-image',
      order: 2,
      title: { en: 'Multi-Image Upload', bn: 'একাধিক ছবি আপলোড' },
      content: {
        en: `# Multi-Image Upload

Each product can have up to 5 images. This improves image recognition when customers send product photos.

## Why Multiple Images?

When a customer sends a product photo, Autex AI compares it against all your product images. More images = better matching accuracy.

**Example:**
- Customer sends photo of t-shirt from the front
- If you only uploaded back view, matching may fail
- With front, back, and side views uploaded, matching succeeds!

## How to Upload Multiple Images

1. When adding/editing a product, you'll see image slots
2. Click any empty slot to add an image
3. The first image becomes the "main" display image
4. Click the X on any image to remove it

## Best Practices

- **Different angles** — Front, back, side, detail shots
- **Good lighting** — Clear, well-lit photos
- **Plain background** — Helps AI focus on the product
- **Consistent style** — Similar photo style across products
`,
        bn: `# একাধিক ছবি আপলোড

প্রতিটি product এ সর্বোচ্চ ৫টি image থাকতে পারে। এটা customer product photo পাঠালে image recognition উন্নত করে।

## কেন Multiple Images?

Customer product photo পাঠালে, Autex AI এটা আপনার সব product images এর সাথে compare করে। বেশি images = better matching accuracy।

**উদাহরণ:**
- Customer t-shirt এর সামনের দিকের photo পাঠালো
- আপনি শুধু পেছনের view upload করলে, matching fail হতে পারে
- সামনে, পেছনে, এবং পাশের views upload করলে, matching success!

## Multiple Images কিভাবে Upload করবেন

1. Product add/edit করার সময়, image slots দেখতে পাবেন
2. Image যোগ করতে যেকোনো empty slot এ click করুন
3. প্রথম image টি "main" display image হয়
4. কোনো image remove করতে X এ click করুন

## Best Practices

- **Different angles** — সামনে, পেছনে, পাশ, detail shots
- **Good lighting** — Clear, well-lit photos
- **Plain background** — AI কে product এ focus করতে সাহায্য করে
- **Consistent style** — সব products এ similar photo style
`
      }
    }
  ]
};
