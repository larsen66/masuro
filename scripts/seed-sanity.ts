/**
 * Seed script for shared Sanity content.
 * Run with: SANITY_API_TOKEN=your-token npm run seed
 *
 * Get your token from: https://www.sanity.io/manage/project/sl87h6gp/api#tokens
 * Create a token with "Editor" permissions.
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

const categories = [
  {
    _id: "category-localization",
    _type: "category",
    title: "ლოკალიზაცია",
    titleTranslations: {
      ru: "Локализация",
      en: "Localization",
      ka: "ლოკალიზაცია",
    },
    slug: { _type: "slug", current: "localization" },
    description: "ვიდეო ლოკალიზაცია და დუბლაჟი",
    descriptionTranslations: {
      ru: "Локализация и дубляж видео",
      en: "Video localization and dubbing",
      ka: "ვიდეო ლოკალიზაცია და დუბლაჟი",
    },
  },
  {
    _id: "category-graphics",
    _type: "category",
    title: "კონტენტი",
    titleTranslations: {
      ru: "Контент",
      en: "Content",
      ka: "კონტენტი",
    },
    slug: { _type: "slug", current: "graphics" },
    description: "კონტენტი, ვიდეო გადაღება",
    descriptionTranslations: {
      ru: "Контент, видеосъемка",
      en: "Content, video production",
      ka: "კონტენტი, ვიდეო გადაღება",
    },
  },
  {
    _id: "category-animation",
    _type: "category",
    title: "2D ანიმაცია",
    titleTranslations: {
      ru: "2D-анимация",
      en: "2D Animation",
      ka: "2D ანიმაცია",
    },
    slug: { _type: "slug", current: "animation" },
    description: "2D ანიმაცია და მოძრაობის დიზაინი",
    descriptionTranslations: {
      ru: "2D-анимация и моушн-дизайн",
      en: "2D animation and motion design",
      ka: "2D ანიმაცია და მოძრაობის დიზაინი",
    },
  },
];

const heroSections = [
  {
    _id: "hero-home",
    _type: "heroSection",
    page: "home",
    badge: "ლოკალიზაცია • დუბლაჟი • გრაფიკა",
    badgeTranslations: {
      ru: "Локализация • Дубляж • Графика",
      en: "Localization • Dubbing • Graphics",
      ka: "ლოკალიზაცია • დუბლაჟი • გრაფიკა",
    },
    titlePart1: "პროფესიონალური",
    titlePart1Translations: {
      ru: "Профессиональная",
      en: "Professional",
      ka: "პროფესიონალური",
    },
    titleHighlight: "ვიდეო",
    titleHighlightTranslations: {
      ru: "видео",
      en: "video",
      ka: "ვიდეო",
    },
    titlePart2: "ლოკალიზაცია",
    titlePart2Translations: {
      ru: "локализация",
      en: "localization",
      ka: "ლოკალიზაცია",
    },
    description:
      "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია - ყველაფერი ერთ სივრცეში.",
    descriptionTranslations: {
      ru: "Мы создаем качественный видеоконтент для вашего бренда. Дубляж, субтитры, графика и анимация - все в одном месте.",
      en: "We create high-quality video content for your brand. Dubbing, subtitles, graphics, and animation - all in one place.",
      ka: "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია - ყველაფერი ერთ სივრცეში.",
    },
  },
  {
    _id: "hero-all",
    _type: "heroSection",
    page: "all",
    badge: "ყველა პროექტი",
    badgeTranslations: {
      ru: "Все проекты",
      en: "All projects",
      ka: "ყველა პროექტი",
    },
    titlePart1: "ჩვენი",
    titlePart1Translations: {
      ru: "Наше",
      en: "Our",
      ka: "ჩვენი",
    },
    titleHighlight: "პორტფოლიო",
    titleHighlightTranslations: {
      ru: "портфолио",
      en: "portfolio",
      ka: "პორტფოლიო",
    },
    titlePart2: "",
    titlePart2Translations: { ru: "", en: "", ka: "" },
    description:
      "ნახეთ ჩვენი ყველა პროექტი - ლოკალიზაცია, 2D ანიმაცია, გრაფიკა და სხვა. წლების განმავლობაში შექმნილი საუკეთესო ნამუშევრები.",
    descriptionTranslations: {
      ru: "Посмотрите все наши проекты - локализацию, 2D-анимацию, графику и многое другое. Лучшие работы, созданные за годы.",
      en: "Explore all our projects - localization, 2D animation, graphics, and more. A selection of our best work from across the years.",
      ka: "ნახეთ ჩვენი ყველა პროექტი - ლოკალიზაცია, 2D ანიმაცია, გრაფიკა და სხვა. წლების განმავლობაში შექმნილი საუკეთესო ნამუშევრები.",
    },
  },
  {
    _id: "hero-graphics",
    _type: "heroSection",
    page: "graphics",
    badge: "კონტენტი",
    badgeTranslations: { ru: "Контент", en: "Content", ka: "კონტენტი" },
    titlePart1: "სმმ",
    titlePart1Translations: {
      ru: "SMM",
      en: "SMM",
      ka: "სმმ",
    },
    titleHighlight: "",
    titleHighlightTranslations: {
      ru: "",
      en: "",
      ka: "",
    },
    titlePart2: "",
    titlePart2Translations: { ru: "", en: "", ka: "" },
    description: "კონტენტი, ვიდეო გადაღება",
    descriptionTranslations: {
      ru: "Контент, видеосъемка",
      en: "Content, video production",
      ka: "კონტენტი, ვიდეო გადაღება",
    },
  },
  {
    _id: "hero-animation",
    _type: "heroSection",
    page: "animation",
    badge: "2D ანიმაცია",
    badgeTranslations: {
      ru: "2D-анимация",
      en: "2D Animation",
      ka: "2D ანიმაცია",
    },
    titlePart1: "კრეატიული",
    titlePart1Translations: {
      ru: "Креативная",
      en: "Creative",
      ka: "კრეატიული",
    },
    titleHighlight: "2D ანიმაცია",
    titleHighlightTranslations: {
      ru: "2D-анимация",
      en: "2D animation",
      ka: "2D ანიმაცია",
    },
    titlePart2: "",
    titlePart2Translations: { ru: "", en: "", ka: "" },
    description:
      "მოძრაობა, რომელიც იპყრობს ყურადღებას. ჩვენი ანიმატორები ქმნიან უნიკალურ 2D ანიმაციებს თქვენი ბრენდისთვის.",
    descriptionTranslations: {
      ru: "Движение, которое привлекает внимание. Наши аниматоры создают уникальную 2D-анимацию для вашего бренда.",
      en: "Motion that captures attention. Our animators create unique 2D animation for your brand.",
      ka: "მოძრაობა, რომელიც იპყრობს ყურადღებას. ჩვენი ანიმატორები ქმნიან უნიკალურ 2D ანიმაციებს თქვენი ბრენდისთვის.",
    },
  },
];

const siteSettings = {
  _id: "site-settings",
  _type: "siteSettings",
  siteName: "Masuro",
  siteNameTranslations: { ru: "Masuro", en: "Masuro", ka: "Masuro" },
  seoTitle: "Masuro - პროფესიონალური ვიდეო ლოკალიზაცია",
  seoTitleTranslations: {
    ru: "Masuro - профессиональная локализация видео",
    en: "Masuro - professional video localization",
    ka: "Masuro - პროფესიონალური ვიდეო ლოკალიზაცია",
  },
  seoDescription:
    "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია.",
  seoDescriptionTranslations: {
    ru: "Мы создаем качественный видеоконтент для вашего бренда. Дубляж, субтитры, графика и анимация.",
    en: "We create high-quality video content for your brand. Dubbing, subtitles, graphics, and animation.",
    ka: "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია.",
  },
  contactEmail: "info@masuro.ge",
  whatsappNumber: "+995555123456",
  instagramUrl: "https://instagram.com/masuro",
  facebookUrl: "https://facebook.com/masuro",
  telegramUrl: "https://t.me/masuro",
  phoneNumber: "+995555123456",
};

async function seed() {
  console.log("🌱 Seeding shared Sanity content...\n");
  console.log(`📦 Project: ${projectId}`);
  console.log(`📂 Dataset: ${dataset}\n`);

  console.log("📁 Creating categories...");
  for (const category of categories) {
    try {
      await client.createOrReplace(category);
      console.log(`  ✓ ${category.title}`);
    } catch (error) {
      console.error(`  ✗ ${category.title}:`, error);
    }
  }

  console.log("\n🦸 Creating hero sections...");
  for (const hero of heroSections) {
    try {
      await client.createOrReplace(hero);
      console.log(`  ✓ ${hero.page}`);
    } catch (error) {
      console.error(`  ✗ ${hero.page}:`, error);
    }
  }

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
}

seed().catch(console.error);
