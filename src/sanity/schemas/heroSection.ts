import { defineField, defineType } from "sanity";

export const heroSection = defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "document",
  fields: [
    defineField({
      name: "page",
      title: "Page",
      type: "string",
      description: "Which page this hero belongs to (e.g., 'home', 'graphics', 'animation')",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Home", value: "home" },
          { title: "All Projects", value: "all" },
          { title: "Localization", value: "localization" },
          { title: "Graphics", value: "graphics" },
          { title: "Animation", value: "animation" },
        ],
      },
    }),
    defineField({
      name: "badgeTranslations",
      title: "Badge translations",
      type: "localizedString",
    }),
    defineField({
      name: "badge",
      title: "Legacy badge text",
      type: "string",
      description: "Small text above the title (e.g., 'ლოკალიზაცია • დუბლაჟი • გრაფიკა')",
      hidden: true,
    }),
    defineField({
      name: "titlePart1Translations",
      title: "Title part 1 translations",
      type: "localizedString",
    }),
    defineField({
      name: "titlePart1",
      title: "Legacy title part 1",
      type: "string",
      description: "First part of the title (before highlighted word)",
      hidden: true,
    }),
    defineField({
      name: "titleHighlightTranslations",
      title: "Highlighted word translations",
      type: "localizedString",
    }),
    defineField({
      name: "titleHighlight",
      title: "Legacy highlighted word",
      type: "string",
      description: "The word that appears in accent color",
      hidden: true,
    }),
    defineField({
      name: "titlePart2Translations",
      title: "Title part 2 translations",
      type: "localizedString",
    }),
    defineField({
      name: "titlePart2",
      title: "Legacy title part 2",
      type: "string",
      description: "Last part of the title (after highlighted word)",
      hidden: true,
    }),
    defineField({
      name: "descriptionTranslations",
      title: "Description translations",
      type: "localizedText",
    }),
    defineField({
      name: "description",
      title: "Legacy description",
      type: "text",
      rows: 3,
      hidden: true,
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "page",
      subtitleEn: "titlePart1Translations.en",
      subtitleKa: "titlePart1Translations.ka",
      legacySubtitle: "titlePart1",
    },
    prepare({ title, subtitleEn, subtitleKa, legacySubtitle }) {
      return {
        title: `Hero: ${title}`,
        subtitle: subtitleEn || subtitleKa || legacySubtitle,
      };
    },
  },
});




