import { defineField, defineType } from "sanity";

export const siteNavigation = defineType({
  name: "siteNavigation",
  title: "Site Navigation",
  type: "document",
  fields: [
    defineField({ name: "allTitle", title: "All (Georgian)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "allTitleEn", title: "All (English)", type: "string" }),
    defineField({ name: "allTitleRu", title: "All (Russian)", type: "string" }),
    defineField({ name: "voiceTitle", title: "Voice (Georgian)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "voiceTitleEn", title: "Voice (English)", type: "string" }),
    defineField({ name: "voiceTitleRu", title: "Voice (Russian)", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Site Navigation" };
    },
  },
});
