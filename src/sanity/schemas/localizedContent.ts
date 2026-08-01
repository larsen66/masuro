import { defineField, defineType } from "sanity";

const languageFields = (fieldType: "string" | "text", rows?: number) => [
  defineField({
    name: "ru",
    title: "Русский",
    type: fieldType,
    rows,
  }),
  defineField({
    name: "en",
    title: "English",
    type: fieldType,
    rows,
  }),
  defineField({
    name: "ka",
    title: "ქართული",
    type: fieldType,
    rows,
  }),
];

export const localizedString = defineType({
  name: "localizedString",
  title: "Localized string",
  type: "object",
  fields: languageFields("string"),
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Localized text",
  type: "object",
  fields: languageFields("text", 3),
});
