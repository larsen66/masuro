# Sanity CMS Setup Guide

## 1. Create a Sanity Project

1. Go to [sanity.io/manage](https://www.sanity.io/manage)
2. Create a new project (free tier available)
3. Name it "Masuro" or your preferred name
4. Copy the **Project ID** (looks like `abc123de`)

## 2. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
NEXT_PUBLIC_SANITY_DATASET=production
```

## 3. Configure CORS

In Sanity Dashboard:
1. Go to your project → API → CORS Origins
2. Add `http://localhost:3000` for development
3. Add your production URL when deploying

## 4. Run the Development Server

```bash
npm run dev
```

## 5. Access Sanity Studio

Go to [http://localhost:3000/studio](http://localhost:3000/studio)

You'll be prompted to log in with your Sanity account.

## 6. (Optional) Seed Initial Data

To populate the CMS with initial categories and hero sections:

1. Get an API token from Sanity Dashboard → API → Tokens
2. Create a token with Editor permissions
3. Run the seed script:

```bash
SANITY_API_TOKEN=your-token npx tsx scripts/seed-sanity.ts
```

## Content Types

### Portfolio Items
- **Title**: Project name
- **Slug**: URL-friendly identifier (auto-generated)
- **Category**: Reference to a category
- **Image**: Preview image (required)
- **Video URL**: Optional YouTube/Vimeo link
- **Description**: Project description
- **Client**: Client name
- **Year**: Project year
- **Featured**: Show prominently on homepage
- **Order**: Display order (lower = first)

### Categories
- **Title**: Category name (e.g., "ლოკალიზაცია")
- **Slug**: URL identifier (e.g., "localization")
- **Description**: Optional description
- **Color**: Accent color for the category

### Hero Sections
- **Page**: Which page this hero belongs to (home, all, graphics, animation)
- **Badge**: Small text above title
- **Title Parts**: Split into 3 parts for styling (part1 + highlighted + part2)
- **Description**: Main description text
- **Background Image**: Optional background

### Site Settings
- **Site Name**: Your site name
- **Logo**: Site logo
- **SEO Title/Description**: For meta tags
- **Contact Email**: Your email
- **Social Links**: Array of platform/URL pairs

## Deployment

When deploying to Vercel/Netlify:
1. Add environment variables in your hosting dashboard
2. Add your production URL to Sanity CORS settings



