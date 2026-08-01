import { getCliClient } from "sanity/cli";

type Locale = "ru" | "en" | "ka";
type LocalizedValue = Partial<Record<Locale, string>>;

interface ContentDocument {
  _id: string;
  _rev: string;
  _type: "category" | "portfolioItem" | "heroSection" | "siteSettings";
  [key: string]: unknown;
}

interface FieldMigration {
  source: string;
  target: string;
}

const migrationsByType: Record<ContentDocument["_type"], FieldMigration[]> = {
  category: [
    { source: "title", target: "titleTranslations" },
    { source: "description", target: "descriptionTranslations" },
  ],
  portfolioItem: [
    { source: "title", target: "titleTranslations" },
    { source: "description", target: "descriptionTranslations" },
  ],
  heroSection: [
    { source: "badge", target: "badgeTranslations" },
    { source: "titlePart1", target: "titlePart1Translations" },
    { source: "titleHighlight", target: "titleHighlightTranslations" },
    { source: "titlePart2", target: "titlePart2Translations" },
    { source: "description", target: "descriptionTranslations" },
  ],
  siteSettings: [
    { source: "siteName", target: "siteNameTranslations" },
    { source: "seoTitle", target: "seoTitleTranslations" },
    { source: "seoDescription", target: "seoDescriptionTranslations" },
  ],
};

const curated: Record<string, Record<string, LocalizedValue>> = {
  "category-localization": {
    titleTranslations: {
      ru: "Локализация",
      en: "Localization",
      ka: "ლოკალიზაცია",
    },
    descriptionTranslations: {
      ru: "Локализация и дубляж видео",
      en: "Video localization and dubbing",
      ka: "ვიდეო ლოკალიზაცია და დუბლაჟი",
    },
  },
  "category-graphics": {
    titleTranslations: { ru: "Контент", en: "Content", ka: "კონტენტი" },
    descriptionTranslations: {
      ru: "Визуал, который выделяет ваш бренд. Мы создаём выразительный контент и видео для социальных сетей.",
      en: "Visuals that make your brand stand out. We create distinctive content and videos for social media.",
      ka: "ვიზუალი, რომელიც თქვენს ბრენდს გამოარჩევს. ჩვენ ვქმნით გამორჩეულ კონტენტსა და ვიდეოებს სოციალური ქსელებისთვის.",
    },
  },
  "category-animation": {
    titleTranslations: {
      ru: "2D-анимация",
      en: "2D Animation",
      ka: "2D ანიმაცია",
    },
    descriptionTranslations: {
      ru: "2D-анимация и моушн-дизайн",
      en: "2D animation and motion design",
      ka: "2D ანიმაცია და მოძრაობის დიზაინი",
    },
  },
  "hero-home": {
    badgeTranslations: {
      ru: "Локализация • Дубляж • Графика",
      en: "Localization • Dubbing • Graphics",
      ka: "ლოკალიზაცია • დუბლაჟი • გრაფიკა",
    },
    titlePart1Translations: {
      ru: "Профессиональная",
      en: "Professional",
      ka: "პროფესიონალური",
    },
    titleHighlightTranslations: { ru: "видео", en: "video", ka: "ვიდეო" },
    titlePart2Translations: {
      ru: "локализация",
      en: "localization",
      ka: "ლოკალიზაცია",
    },
    descriptionTranslations: {
      ru: "Мы создаем качественный видеоконтент для вашего бренда. Дубляж, субтитры, графика и анимация - все в одном месте.",
      en: "We create high-quality video content for your brand. Dubbing, subtitles, graphics, and animation - all in one place.",
      ka: "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია - ყველაფერი ერთ სივრცეში.",
    },
  },
  "hero-all": {
    badgeTranslations: { ru: "Все проекты", en: "All projects", ka: "ყველა პროექტი" },
    titlePart1Translations: { ru: "Наше", en: "Our", ka: "ჩვენი" },
    titleHighlightTranslations: {
      ru: "портфолио",
      en: "portfolio",
      ka: "პორტფოლიო",
    },
    titlePart2Translations: { ru: "", en: "", ka: "" },
    descriptionTranslations: {
      ru: "Посмотрите все наши проекты - локализацию, 2D-анимацию, графику и многое другое. Лучшие работы, созданные за годы.",
      en: "Explore all our projects - localization, 2D animation, graphics, and more. A selection of our best work from across the years.",
      ka: "ნახეთ ჩვენი ყველა პროექტი - ლოკალიზაცია, 2D ანიმაცია, გრაფიკა და სხვა. წლების განმავლობაში შექმნილი საუკეთესო ნამუშევრები.",
    },
  },
  "hero-graphics": {
    badgeTranslations: { ru: "Контент", en: "Content", ka: "კონტენტი" },
    titlePart1Translations: {
      ru: "Креативный",
      en: "Creative",
      ka: "კრეატიული",
    },
    titleHighlightTranslations: {
      ru: "контент",
      en: "content",
      ka: "კონტენტი",
    },
    titlePart2Translations: { ru: "", en: "", ka: "" },
    descriptionTranslations: {
      ru: "Визуал, который выделяет ваш бренд. Мы создаём выразительный контент и видео для социальных сетей.",
      en: "Visuals that make your brand stand out. We create distinctive content and videos for social media.",
      ka: "ვიზუალი, რომელიც თქვენს ბრენდს გამოარჩევს. ჩვენ ვქმნით გამორჩეულ კონტენტსა და ვიდეოებს სოციალური ქსელებისთვის.",
    },
  },
  "hero-animation": {
    badgeTranslations: {
      ru: "2D-анимация",
      en: "2D Animation",
      ka: "2D ანიმაცია",
    },
    titlePart1Translations: { ru: "Креативная", en: "Creative", ka: "კრეატიული" },
    titleHighlightTranslations: {
      ru: "2D-анимация",
      en: "2D animation",
      ka: "2D ანიმაცია",
    },
    titlePart2Translations: { ru: "", en: "", ka: "" },
    descriptionTranslations: {
      ru: "Движение, которое привлекает внимание. Наши аниматоры создают уникальную 2D-анимацию для вашего бренда.",
      en: "Motion that captures attention. Our animators create unique 2D animation for your brand.",
      ka: "მოძრაობა, რომელიც იპყრობს ყურადღებას. ჩვენი ანიმატორები ქმნიან უნიკალურ 2D ანიმაციებს თქვენი ბრენდისთვის.",
    },
  },
  "site-settings": {
    siteNameTranslations: { ru: "Masuro", en: "Masuro", ka: "Masuro" },
    seoTitleTranslations: {
      ru: "Masuro - профессиональная локализация видео",
      en: "Masuro - professional video localization",
      ka: "Masuro - პროფესიონალური ვიდეო ლოკალიზაცია",
    },
    seoDescriptionTranslations: {
      ru: "Мы создаем качественный видеоконтент для вашего бренда. Дубляж, субтитры, графика и анимация.",
      en: "We create high-quality video content for your brand. Dubbing, subtitles, graphics, and animation.",
      ka: "ჩვენ ვქმნით მაღალი ხარისხის ვიდეო კონტენტს თქვენი ბრენდისთვის. დუბლაჟი, სუბტიტრები, გრაფიკა და ანიმაცია.",
    },
  },
  "0544f946-e06c-4957-ba4c-6593b38e971f": {
    descriptionTranslations: {
      en: "2D animation with 9 packshots for McDonald's, created to show how delicious their cheese-topped burgers look. (Packshot completed)",
      ru: "2D-анимация с 9 пакшотами для McDonald's, чтобы показать, насколько аппетитно выглядят их бургеры с сыром. (Пакшот выполнен)",
    },
  },
  "0b882d03-e331-417e-bd69-c4a9209d285d": {
    titleTranslations: { en: "Lucky", ru: "Lucky" },
  },
  "222dd817-93b7-4737-980b-0d7eaeb4aced": {
    titleTranslations: { en: "Biomi", ru: "Biomi" },
  },
  "26070cf5-d810-4db0-ab08-1ca5250f78ff": {
    titleTranslations: { en: "Megatechnika", ru: "Мегатехника" },
    descriptionTranslations: {
      en: "A dynamic 2D animation created for an appliance store, focusing on promotions and discounts. (Black Friday)",
      ru: "Динамичная 2D-анимация для магазина техники с акцентом на акции и скидки. (Черная пятница)",
    },
  },
  "3cfacb0a-e40f-4d8f-957e-1ee8ff48204f": {
    titleTranslations: { en: "S Media", ru: "S Media" },
  },
  "3e947c01-950c-459f-8022-10aa383b8791": {
    titleTranslations: { en: "MacCoffee", ru: "MacCoffee" },
  },
  "3f7b01c5-5b17-4486-a607-3aa9706596c6": {
    titleTranslations: {
      en: "Handy Housewives (universal handyman)",
      ru: "Умелые хозяйки (универсальный мастер)",
    },
  },
  "498dfb46-3103-404a-a097-e265a823aeb7": {
    titleTranslations: { en: "McDonald's", ru: "McDonald's" },
  },
  "4aa2360c-1404-4b18-9d3c-a58b26dc1808": {
    titleTranslations: {
      en: "McDonald's Free Delivery",
      ru: "Бесплатная доставка McDonald's",
    },
  },
  "54acefc4-ad96-4ef2-a4ac-44de436fc2ed": {
    titleTranslations: { en: "Cheez Cheez Cheez", ru: "Чиз Чиз Чиз" },
    descriptionTranslations: {
      en: "A vivid 2D animation for McDonald's to show how delicious their cheese-topped burgers look. (Packshot completed)",
      ru: "Яркая 2D-анимация для McDonald's, показывающая, насколько аппетитно выглядят их бургеры с сыром. (Пакшот выполнен)",
    },
  },
  "57bc0c39-caa6-4d84-86d6-a176d9c65b40": {
    titleTranslations: { en: "September on Glovo", ru: "Сентябрь на Glovo" },
  },
  "5bba717f-1339-4b25-b929-9a6877c99e5c": {
    descriptionTranslations: {
      en: "A 2D animated video created for a lawyer that explains legal services and the benefits of working with this specialist in a simple, visual way. The video uses smooth transitions, clear visuals, and a professional tone to build trust with clients.",
      ru: "2D-анимационное видео, созданное для адвоката, которое простым и наглядным языком объясняет юридические услуги и преимущества работы с этим специалистом. В видео используются плавные переходы, четкая графика и профессиональный тон, чтобы завоевать доверие клиентов.",
    },
  },
  "6f842bf5-7b39-472c-9bde-9219445a7f20": {
    titleTranslations: {
      en: "Brighten Children's Lives",
      ru: "Сделай жизнь детей ярче",
    },
  },
  "87b6d0d7-3979-4886-b995-4b343ce54438": {
    descriptionTranslations: {
      en: "2D animation about an auto-responder that helps you get work done wherever you are.",
      ru: "2D-анимация об автоответчике, который поможет вам выполнять работу, где бы вы ни находились.",
    },
  },
  "88121816-66c1-4b66-9bd4-212e0b76672f": {
    titleTranslations: { ru: "Мозг (безопасность в офисе)" },
  },
  "8eb81ade-240d-4f67-950f-d4721a010f71": {
    titleTranslations: {
      en: "Tintokol - perfectly straight",
      ru: "Тинтокол - идеально ровный",
    },
  },
  "905a66c6-2750-47fe-b5b7-9a69e98a95df": {
    titleTranslations: { ru: "Мастер-класс Litokol" },
  },
  "90d35a7f-2e7d-4f14-ab8d-a9e3829f23de": {
    titleTranslations: { en: "McCafé", ru: "McCafé" },
  },
  "a85fae8b-8bea-4b7b-aa0f-58c605b3d6b1": {
    titleTranslations: { en: "Tintokol Mavrik", ru: "Тинтокол Маврик" },
  },
  "af639ed6-7fb4-4943-849e-c7a2d26d8918": {
    titleTranslations: { ru: "mybarterboom" },
  },
  "b1ba4685-539f-402c-8efe-98381c573ee3": {
    descriptionTranslations: {
      ru: "Подпись к видео была переведена на грузинский язык с максимальным сохранением фирменного стиля McDonald's.",
    },
  },
  "caf2ec95-b0b0-4614-b066-6dae2d2c9bdc": {
    titleTranslations: { en: "Activia", ru: "Активиа" },
  },
  "d30a9b67-4312-49fb-bbf6-569aa9f55027": {
    titleTranslations: {
      en: "S Media - Domestic Violence",
      ru: "S Media - домашнее насилие",
    },
  },
  "dc8b6f3d-9da6-4a81-b304-68110266c7fa": {
    titleTranslations: { en: "Litokol" },
  },
  "dd7c63a3-f412-4a4a-ba03-6382dbb07e1d": {
    descriptionTranslations: {
      en: "2D animation created to introduce an innovative product that helps stop nosebleeds quickly. The video clearly shows the drug's mechanism of action and its main benefits.",
      ru: "2D-анимация, созданная для представления инновационного продукта, который помогает быстро остановить кровотечение из носа. На видео наглядно показаны механизм действия препарата и его основные преимущества.",
    },
  },
  "de3eea2b-842b-4315-9b02-5f80c7e1651e": {
    titleTranslations: {
      en: "McDonald's Double Burgers",
      ru: "Двойные бургеры McDonald's",
    },
  },
  "e1b388bc-b358-4268-b3a0-435630262a95": {
    titleTranslations: { en: "Ally", ru: "Ally" },
  },
  "ef2e67d1-3115-4f92-bee8-c21d281daea4": {
    titleTranslations: { ru: "Keylocker" },
  },
  "f4486857-0d4e-4fb8-b4c2-f9d5fe01ba67": {
    descriptionTranslations: {
      en: "2D animation for a cooking channel: clearly shows the ingredients and the cooking process.",
      ru: "2D-анимация для кулинарного канала: наглядно показывает ингредиенты и процесс приготовления.",
    },
  },
  "f804dd4b-90e4-490e-9096-e9ba05c45354": {
    titleTranslations: { en: "Lucky", ru: "Lucky" },
  },
};

const client = getCliClient({ apiVersion: "2024-01-01" });
const applyChanges = process.argv.includes("--apply");
const overwrite = process.argv.includes("--overwrite");
const includeDrafts = process.argv.includes("--include-drafts");

function delay(milliseconds: number) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function machineTranslate(text: string, target: "ru" | "en"): Promise<string> {
  const url = new URL("https://translate.googleapis.com/translate_a/single");
  url.search = new URLSearchParams({
    client: "gtx",
    sl: "auto",
    tl: target,
    dt: "t",
    q: text,
  }).toString();

  let lastError: unknown;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Translation request failed with ${response.status}`);
      }

      const body = (await response.json()) as Array<Array<Array<string | null>>>;
      const translated = body[0]
        .map((segment) => segment[0] || "")
        .join("")
        .trim();
      if (!translated) {
        throw new Error("Translation service returned an empty value");
      }
      return translated;
    } catch (error) {
      lastError = error;
      await delay(attempt * 500);
    }
  }

  throw lastError;
}

function asLocalizedValue(value: unknown): LocalizedValue {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  const record = value as Record<string, unknown>;
  return {
    ru: typeof record.ru === "string" ? record.ru : undefined,
    en: typeof record.en === "string" ? record.en : undefined,
    ka: typeof record.ka === "string" ? record.ka : undefined,
  };
}

async function buildTranslation(
  document: ContentDocument,
  migration: FieldMigration
): Promise<LocalizedValue | null> {
  const source = document[migration.source];
  if (typeof source !== "string") return null;

  const existing = asLocalizedValue(document[migration.target]);
  const documentId = document._id.replace(/^drafts\./, "");
  const preferred = curated[documentId]?.[migration.target];
  const result: LocalizedValue = {
    ...existing,
    ...preferred,
  };

  if (overwrite || result.ka === undefined) result.ka = source;

  if (source === "") {
    if (overwrite || result.ru === undefined) result.ru = "";
    if (overwrite || result.en === undefined) result.en = "";
    return result;
  }

  if (overwrite || !result.ru) result.ru = await machineTranslate(source, "ru");
  if (overwrite || !result.en) result.en = await machineTranslate(source, "en");

  return result;
}

async function run() {
  const documents = await client.fetch<ContentDocument[]>(
    `*[
      _type in ["category", "portfolioItem", "heroSection", "siteSettings"] &&
      ${includeDrafts ? "_id in path(\"drafts.**\")" : "!(_id in path(\"drafts.**\"))"}
    ] | order(_type asc, _id asc)`
  );

  console.log(
    `${applyChanges ? "Applying" : "Dry run for"} ${documents.length} ${includeDrafts ? "draft" : "published"} documents`
  );

  let changedDocuments = 0;
  let changedFields = 0;

  for (const [index, document] of documents.entries()) {
    const patch: Record<string, LocalizedValue> = {};

    for (const migration of migrationsByType[document._type]) {
      const translated = await buildTranslation(document, migration);
      if (!translated) continue;

      const current = JSON.stringify(asLocalizedValue(document[migration.target]));
      const next = JSON.stringify(translated);
      if (current !== next) {
        patch[migration.target] = translated;
        changedFields += 1;
      }
    }

    if (Object.keys(patch).length === 0) continue;

    changedDocuments += 1;
    console.log(
      `[${index + 1}/${documents.length}] ${document._type} ${document._id}: ${Object.keys(patch).join(", ")}`
    );

    if (applyChanges) {
      await client.patch(document._id).ifRevisionId(document._rev).set(patch).commit();
    }
  }

  console.log(
    `${applyChanges ? "Updated" : "Would update"} ${changedDocuments} documents and ${changedFields} fields`
  );
  if (!applyChanges) {
    console.log("Run again with --apply after reviewing this output");
  }
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
