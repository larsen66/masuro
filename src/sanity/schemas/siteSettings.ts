import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fieldsets: [
    {
      name: "socials",
      title: "Social Media & Contacts",
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: "siteNameTranslations",
      title: "Site name translations",
      type: "localizedString",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "siteName",
      title: "Legacy site name",
      type: "string",
      hidden: true,
    }),
    defineField({
      name: "logo",
      title: "Logo",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "seoTitleTranslations",
      title: "SEO title translations",
      type: "localizedString",
    }),
    defineField({
      name: "seoTitle",
      title: "Legacy SEO title",
      type: "string",
      description: "Title for search engines",
      hidden: true,
    }),
    defineField({
      name: "seoDescriptionTranslations",
      title: "SEO description translations",
      type: "localizedText",
    }),
    defineField({
      name: "seoDescription",
      title: "Legacy SEO description",
      type: "text",
      rows: 2,
      description: "Description for search engines",
      hidden: true,
    }),
    defineField({
      name: "contactEmail",
      title: "Contact Email",
      type: "string",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp Number",
      type: "string",
      description: "Phone number with country code, e.g. +995555123456",
      fieldset: "socials",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      fieldset: "socials",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "url",
      fieldset: "socials",
    }),
    defineField({
      name: "telegramUrl",
      title: "Telegram URL",
      type: "url",
      description: "Link to Telegram profile or channel, e.g. https://t.me/username",
      fieldset: "socials",
    }),
    defineField({
      name: "phoneNumber",
      title: "Phone Number",
      type: "string",
      description: "Phone number for calls, e.g. +995555123456",
      fieldset: "socials",
    }),
  ],
  preview: {
    prepare() {
      return {
        title: "Site Settings",
      };
    },
  },
});




