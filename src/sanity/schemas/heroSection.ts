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
          { title: "Graphics", value: "graphics" },
          { title: "Animation", value: "animation" },
        ],
      },
    }),
    defineField({
      name: "badge",
      title: "Badge Text",
      type: "string",
      description: "Small text above the title (e.g., 'ლოკალიზაცია • დუბლაჟი • გრაფიკა')",
    }),
    defineField({
      name: "titlePart1",
      title: "Title Part 1",
      type: "string",
      description: "First part of the title (before highlighted word)",
    }),
    defineField({
      name: "titleHighlight",
      title: "Highlighted Word",
      type: "string",
      description: "The word that appears in accent color",
    }),
    defineField({
      name: "titlePart2",
      title: "Title Part 2",
      type: "string",
      description: "Last part of the title (after highlighted word)",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
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
      subtitle: "titlePart1",
    },
    prepare({ title, subtitle }) {
      return {
        title: `Hero: ${title}`,
        subtitle,
      };
    },
  },
});



