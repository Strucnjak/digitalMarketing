# BDigital Marketing Website

This project contains the marketing site for BDigital, built with React, TypeScript, Tailwind CSS, and Vite. The application supports static-site generation (SSG) for production deployment and localized routing for Montenegrin (`me`) and English (`en`).

## Local Development

```bash
npm install
npm run dev
```

## Production Build Pipeline

```bash
npm run build
```

`npm run build` performs the following steps:

1. Type-checks the project with `tsc -b`.
2. Builds the client and server bundles with Vite.
3. Runs the SSG prerenderer (`npm run ssg`).
4. Generates locale-aware XML sitemaps (`npm run sitemap`).

The sitemap script also writes the XML files to `public/` so they are available when running the Vite dev server. You can re-run the sitemap step independently with:

```bash
npm run sitemap
```

## Search Engine Sitemaps

Sitemaps are generated during the production build and emitted to both `dist/client/` and `public/`. Submit the following URLs to Google Search Console and Bing Webmaster Tools:

- `https://bdigital.me/sitemap-index.xml`
- `https://bdigital.me/sitemap-me.xml`
- `https://bdigital.me/sitemap-en.xml`

The sitemap files include `<xhtml:link>` elements so each page references its localized alternates, and the sitemap index aggregates the per-locale files for easier discovery by search engines.
