import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "titleTranslations",
      title: "Title translations",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Legacy title",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "titleTranslations.en",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
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
      rows: 2,
      hidden: true,
    }),
    defineField({
      name: "color",
      title: "Color",
      type: "string",
      description: "Accent color for this category (hex code, e.g. #FF5733)",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "image",
      description: "Optional icon for the category",
    }),
  ],
  preview: {
    select: {
      titleEn: "titleTranslations.en",
      titleKa: "titleTranslations.ka",
      legacyTitle: "title",
      media: "icon",
    },
    prepare({ titleEn, titleKa, legacyTitle, media }) {
      return {
        title: titleEn || titleKa || legacyTitle,
        media,
      };
    },
  },
});




