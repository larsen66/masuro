import { defineField, defineType } from "sanity";

export const category = defineType({
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
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
      title: "title",
      media: "icon",
    },
  },
});




