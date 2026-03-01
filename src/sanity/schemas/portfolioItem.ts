import { defineField, defineType } from "sanity";

export const portfolioItem = defineType({
  name: "portfolioItem",
  title: "Portfolio Item",
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
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Preview Image (Legacy)",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Deprecated: Use 'images' array instead. Kept for backward compatibility.",
      hidden: true,
    }),
    defineField({
      name: "images",
      title: "Images / Photos",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
      description: "Upload photos for this project. Multiple images will be displayed as a carousel.",
      validation: (Rule) =>
        Rule.custom((images, context) => {
          const doc = context.document as Record<string, unknown> | undefined;
          const hasVideo = doc?.videoUrl || doc?.videoFile;
          const hasImages = images && (images as unknown[]).length > 0;
          if (!hasVideo && !hasImages) {
            return "Add at least one photo or video";
          }
          return true;
        }),
    }),
    defineField({
      name: "videoUrl",
      title: "Video URL (YouTube/Vimeo)",
      type: "url",
      description: "Optional: URL to the video (YouTube or Vimeo)",
    }),
    defineField({
      name: "videoFile",
      title: "Video File",
      type: "file",
      options: {
        accept: "video/*",
      },
      description: "Optional: Upload video file directly",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.min(2000).max(2100),
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this item prominently",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
    {
      title: "Title",
      name: "titleAsc",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      category: "category.title",
      media: "image",
      images: "images",
      videoUrl: "videoUrl",
      videoFile: "videoFile",
    },
    prepare({ title, category, media, images, videoUrl, videoFile }) {
      const hasVideo = !!videoUrl || !!videoFile;
      const imageCount = images?.length || 0;
      const subtitle = [
        category,
        imageCount > 0 ? `${imageCount} photo${imageCount > 1 ? "s" : ""}` : null,
        hasVideo ? "video" : null,
      ]
        .filter(Boolean)
        .join(" · ");

      return {
        title,
        subtitle,
        media: images?.[0] || media,
      };
    },
  },
});




