import { defineField, defineType } from "sanity";

export const siteNavigation = defineType({
  name: "siteNavigation",
  title: "Site Navigation",
  type: "document",
  fields: [
    defineField({ name: "showAll", title: "Show All in menu", type: "boolean", initialValue: true }),
    defineField({ name: "allTitle", title: "All (Georgian)", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "allTitleEn", title: "All (English)", type: "string" }),
    defineField({ name: "allTitleRu", title: "All (Russian)", type: "string" }),
    defineField({ name: "showVoice", title: "Show Voice in menu", type: "boolean", initialValue: true }),
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
