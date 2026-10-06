import { getCliClient } from "sanity/cli";

const client = getCliClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "sl87h6gp",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});

const categoryTranslations: Record<string, { titleEn: string; titleRu: string }> = {
  localization: { titleEn: "Localization", titleRu: "Локализация" },
  animation: { titleEn: "2D Animation", titleRu: "2D-анимация" },
  graphics: { titleEn: "Content", titleRu: "Контент" },
  "ვიდეოგადაღება": { titleEn: "Video", titleRu: "Видео" },
};

async function main() {
  const categories = await client.fetch<{ _id: string; slug: string }[]>(
    '*[_type == "category" && !(_id in path("drafts.**"))]{_id, "slug": slug.current}'
  );
  const matchingCategories = categories.filter((item) => categoryTranslations[item.slug]);

  if (process.argv.includes("--dry-run")) {
    console.log(`Dry run: would add navigation labels and translations for ${matchingCategories.length} categories.`);
    process.exit(0);
  }

  let transaction = client.transaction().createIfNotExists({
    _id: "site-navigation",
    _type: "siteNavigation",
    allTitle: "სულ",
    allTitleEn: "All",
    allTitleRu: "Все",
    voiceTitle: "ხმა",
    voiceTitleEn: "Voice",
    voiceTitleRu: "Озвучка",
  });

  transaction = transaction.patch("site-navigation", (patch) =>
    patch.setIfMissing({
      allTitle: "სულ",
      allTitleEn: "All",
      allTitleRu: "Все",
      voiceTitle: "ხმა",
      voiceTitleEn: "Voice",
      voiceTitleRu: "Озвучка",
    })
  );

  for (const category of categories) {
    const translation = categoryTranslations[category.slug];
    if (translation) {
      transaction = transaction.patch(category._id, (patch) => patch.setIfMissing(translation));
    }
  }

  await transaction.commit();
  console.log(`Site navigation saved; updated translations for ${matchingCategories.length} categories.`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
