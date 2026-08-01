"use client";

import { defineConfig } from "sanity";
import { structureTool, type StructureBuilder } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./src/sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

// Custom structure for the Studio
const structure = (S: StructureBuilder) =>
  S.list()
    .title("Content")
    .items([
      // Portfolio Items - main content
      S.listItem()
        .title("🎬 Portfolio Items")
        .schemaType("portfolioItem")
        .child(
          S.documentTypeList("portfolioItem")
            .title("Portfolio Items")
            .defaultOrdering([{ field: "order", direction: "asc" }])
        ),
      
      // Categories
      S.listItem()
        .title("📁 Categories")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Categories")),
      
      S.divider(),
      
      // Hero Sections
      S.listItem()
        .title("🦸 Hero Sections")
        .schemaType("heroSection")
        .child(S.documentTypeList("heroSection").title("Hero Sections")),
      
      // Site Settings - singleton
      S.listItem()
        .title("⚙️ Site Settings")
        .schemaType("siteSettings")
        .child(
          S.document()
            .schemaType("siteSettings")
            .documentId("site-settings")
            .title("Site Settings")
        ),
    ]);

export default defineConfig({
  name: "masuro-studio",
  title: "Masuro CMS",
  
  projectId,
  dataset,
  
  basePath: "/studio",
  
  plugins: [
    structureTool({
      structure,
    }),
    visionTool(),
  ],
  
  schema: {
    types: schemaTypes,
  },
});
