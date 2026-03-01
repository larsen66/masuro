/**
 * Seed script for Sanity CMS
 * Run with: SANITY_API_TOKEN=your-token npm run seed
 * 
 * Get your token from: https://www.sanity.io/manage/project/sl87h6gp/api#tokens
 * Create a token with "Editor" permissions
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sl87h6gp";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error("❌ Missing SANITY_API_TOKEN");
  console.log("\n📝 How to get a token:");
  console.log("1. Go to: https://www.sanity.io/manage/project/sl87h6gp/api#tokens");
  console.log("2. Click 'Add API token'");
  console.log("3. Name it 'Seed Script' with 'Editor' permissions");
  console.log("4. Copy the token and run:");
  console.log("   SANITY_API_TOKEN=your-token npm run seed\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Categories to create
const categories = [
  { 
    _id: "category-localization", 
    _type: "category", 
    title: "ლოკალიზაცია", 
    slug: { _type: "slug", current: "localization" },
    description: "ვიდეო ლოკალიზაცია და დუბლაჟი"
  },
  { 
    _id: "category-graphics", 
    _type: "category", 
    title: "გრაფიკა", 
    slug: { _type: "slug", current: "graphics" },
    description: "მოშენ გრაფიკა და ვიზუალური დიზაინი"
  },
  { 
    _id: "category-animation", 
    _type: "category", 
    title: "2D ანიმაცია", 
    slug: { _type: "slug", current: "animation" },
    description: "2D ანიმაცია და მოძრაობის დიზაინი"
  },
];

// Portfolio items
const portfolioItems = [
  {
    _id: "portfolio-linex-forte",
    _type: "portfolioItem",
    title: "Linex Forte",
    slug: { _type: "slug", current: "linex-forte" },
    category: { _type: "reference", _ref: "category-localization" },
    description: "ფარმაცევტული პროდუქტის სარეკლამო ვიდეოს ლოკალიზაცია",
    client: "Sandoz",
    year: 2024,
    order: 1,
    featured: true,
  },
  {
    _id: "portfolio-activia",
    _type: "portfolioItem",
    title: "Activia",
    slug: { _type: "slug", current: "activia" },
    category: { _type: "reference", _ref: "category-localization" },
    description: "Activia-ს სარეკლამო ვიდეოს ქართული ლოკალიზაცია",
    client: "Danone",
    year: 2024,
    order: 2,
    featured: true,
  },
  {
    _id: "portfolio-lenovo-legion",
    _type: "portfolioItem",
    title: "Lenovo Legion",
    slug: { _type: "slug", current: "lenovo-legion" },
    category: { _type: "reference", _ref: "category-localization" },
    description: "გეიმინგ ლეპტოპის სარეკლამო ვიდეოს ლოკალიზაცია",
    client: "Lenovo",
    year: 2024,
    order: 3,
    featured: false,
  },
  {
    _id: "portfolio-brand-campaign",
    _type: "portfolioItem",
    title: "Brand Campaign",
    slug: { _type: "slug", current: "brand-campaign" },
    category: { _type: "reference", _ref: "category-graphics" },
    description: "ბრენდის ვიზუალური კამპანიის გრაფიკული დიზაინი",
    client: "Various",
    year: 2024,
    order: 4,
    featured: false,
  },
  {
    _id: "portfolio-skippy",
    _type: "portfolioItem",
    title: "Skippy",
    slug: { _type: "slug", current: "skippy" },
    category: { _type: "reference", _ref: "category-localization" },
    description: "Skippy თხილის კარაქის რეკლამის ლოკალიზაცია",
    client: "Hormel Foods",
    year: 2023,
    order: 5,
    featured: false,
  },
  {
    _id: "portfolio-arm-before",
    _type: "portfolioItem",
    title: "ARM Before",
    slug: { _type: "slug", current: "arm-before" },
    category: { _type: "reference", _ref: "category-animation" },
    description: "2D ანიმაციური ვიდეო ARM-ისთვის",
    client: "ARM",
    year: 2023,
    order: 6,
    featured: true,
  },
  {
    _id: "portfolio-coca-cola",
    _type: "portfolioItem",
    title: "Coca-Cola",
    slug: { _type: "slug", current: "coca-cola" },
    category: { _type: "reference", _ref: "category-localization" },
    description: "Coca-Cola-ს სეზონური რეკლამის ქართული ვერსია",
    client: "Coca-Cola",
    year: 2023,
    order: 7,
    featured: true,
  },
  {
    _id: "portfolio-samsung-galaxy",
    _type: "portfolioItem",
    title: "Samsung Galaxy",
    slug: { _type: "slug", current: "samsung-galaxy" },
    category: { _type: "reference", _ref: "category-localization" },
    description: "Samsung Galaxy სმარტფონის რეკლამის ლოკალიზაცია",
    client: "Samsung",
    year: 2023,
    order: 8,
    featured: false,
  },
  {
    _id: "portfolio-nike-campaign",
    _type: "portfolioItem",
    title: "Nike Campaign",
    slug: { _type: "slug", current: "nike-campaign" },
    category: { _type: "reference", _ref: "category-graphics" },
    description: "Nike-ს სპორტული კამპანიის გრაფიკული მასალები",
    client: "Nike",
    year: 2023,
    order: 9,
    featured: false,
  },
  {
    _id: "portfolio-mcdonalds",
    _type: "portfolioItem",
    title: "McDonald's",
    slug: { _type: "slug", current: "mcdonalds" },
    category: { _type: "reference", _ref: "category-localization" },
    description: "McDonald's-ის სარეკლამო ვიდეოების ლოკალიზაცია",
    client: "McDonald's",
    year: 2022,
    order: 10,
    featured: false,
  },
  {
    _id: "portfolio-pepsi-max",
    _type: "portfolioItem",
    title: "Pepsi Max",
    slug: { _type: "slug", current: "pepsi-max" },
    category: { _type: "reference", _ref: "category-animation" },
    description: "Pepsi Max-ის 2D ანიმაციური რეკლამა",
    client: "PepsiCo",
    year: 2022,
    order: 11,
    featured: false,
  },
  {
    _id: "portfolio-adidas-original",
    _type: "portfolioItem",
    title: "Adidas Original",
    slug: { _type: "slug", current: "adidas-original" },
    category: { _type: "reference", _ref: "category-graphics" },
    description: "Adidas Originals-ის ვიზუალური კამპანია",
    client: "Adidas",
    year: 2022,
    order: 12,
    featured: false,
  },
];

// Hero sections for each page
const heroSections = [
  {
    _id: "hero-home",
    _type: "heroSection",
    page: "home",
    badge: "ლოკალიზაცია • დუბლაჟი • გრაფიკა",
    titlePart1: "პროფესიონალური",
    titleHighlight: "ვიდეო",
    titlePart2: "ლოკალიზაცია",
    description: "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია — ყველაფერი ერთ სივრცეში.",
  },
  {
    _id: "hero-all",
    _type: "heroSection",
    page: "all",
    badge: "ყველა პროექტი",
    titlePart1: "ჩვენი",
    titleHighlight: "პორტფოლიო",
    titlePart2: "",
    description: "ნახეთ ჩვენი ყველა პროექტი — ლოკალიზაცია, 2D ანიმაცია, გრაფიკა და სხვა. წლების განმავლობაში შექმნილი საუკეთესო ნამუშევრები.",
  },
  {
    _id: "hero-graphics",
    _type: "heroSection",
    page: "graphics",
    badge: "გრაფიკა",
    titlePart1: "ვიზუალური",
    titleHighlight: "გრაფიკა",
    titlePart2: "",
    description: "თანამედროვე გრაფიკული დიზაინი თქვენი ვიდეო კონტენტისთვის. მოშენ გრაფიკა, ტიტრები, ლოგოები და სხვა.",
  },
  {
    _id: "hero-animation",
    _type: "heroSection",
    page: "animation",
    badge: "2D ანიმაცია",
    titlePart1: "კრეატიული",
    titleHighlight: "2D ანიმაცია",
    titlePart2: "",
    description: "მოძრაობა, რომელიც იპყრობს ყურადღებას. ჩვენი ანიმატორები ქმნიან უნიკალურ 2D ანიმაციებს თქვენი ბრენდისთვის.",
  },
];

// Site settings
const siteSettings = {
  _id: "site-settings",
  _type: "siteSettings",
  siteName: "Masuro",
  seoTitle: "Masuro - პროფესიონალური ვიდეო ლოკალიზაცია",
  seoDescription: "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია.",
  contactEmail: "info@masuro.ge",
  whatsappNumber: "+995555123456",
  instagramUrl: "https://instagram.com/masuro",
  facebookUrl: "https://facebook.com/masuro",
  telegramUrl: "https://t.me/masuro",
  phoneNumber: "+995555123456",
};

async function seed() {
  console.log("🌱 Seeding Sanity database...\n");
  console.log(`📦 Project: ${projectId}`);
  console.log(`📂 Dataset: ${dataset}\n`);

  // Create categories first (portfolio items reference them)
  console.log("📁 Creating categories...");
  for (const cat of categories) {
    try {
      await client.createOrReplace(cat);
      console.log(`  ✓ ${cat.title}`);
    } catch (error) {
      console.error(`  ✗ ${cat.title}:`, error);
    }
  }

  // Create portfolio items
  console.log("\n🎬 Creating portfolio items...");
  for (const item of portfolioItems) {
    try {
      await client.createOrReplace(item);
      console.log(`  ✓ ${item.title}`);
    } catch (error) {
      console.error(`  ✗ ${item.title}:`, error);
    }
  }

  // Create hero sections
  console.log("\n🦸 Creating hero sections...");
  for (const hero of heroSections) {
    try {
      await client.createOrReplace(hero);
      console.log(`  ✓ ${hero.page}`);
    } catch (error) {
      console.error(`  ✗ ${hero.page}:`, error);
    }
  }

  // Create site settings
  console.log("\n⚙️  Creating site settings...");
  try {
    await client.createOrReplace(siteSettings);
    console.log("  ✓ Site settings");
  } catch (error) {
    console.error("  ✗ Site settings:", error);
  }

  console.log("\n" + "=".repeat(50));
  console.log("✅ Seeding complete!");
  console.log("=".repeat(50));
  console.log("\n📝 Next steps:");
  console.log("1. Go to http://localhost:3000/studio");
  console.log("2. Add images to portfolio items");
  console.log("3. Customize content as needed");
  console.log("\n💡 Note: Portfolio items need images uploaded in Studio");
  console.log("   to appear on the website.\n");
}

seed().catch(console.error);
