import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  allPages,
  buildLocalizedPath,
  defaultLocale,
  enumerateStaticPaths,
  locales,
  type Locale,
  type PageType,
} from "../src/routing.js";
import { SITE_BASE_URL } from "../src/config/site.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const serverDir = path.resolve(__dirname, "..");
const distDir = path.resolve(serverDir, "..");
const clientDir = path.resolve(distDir, "client");
const projectRoot = path.resolve(distDir, "..");
const publicDir = path.resolve(projectRoot, "public");

interface SitemapUrlEntry {
  loc: string;
  alternates: AlternateLink[];
}

interface AlternateLink {
  hreflang: string;
  href: string;
}

async function main() {
  const staticPaths = new Set(enumerateStaticPaths());
  const localeSitemaps = locales.map((locale) => {
    const entries = buildLocaleEntries(locale, staticPaths);
    const xml = renderLocaleSitemap(entries);
    const filename = `sitemap-${locale}.xml`;
    return { locale, filename, xml };
  });

  const sitemapIndex = renderSitemapIndex(localeSitemaps.map(({ filename }) => filename));

  await Promise.all([
    mkdir(clientDir, { recursive: true }),
    mkdir(publicDir, { recursive: true }),
  ]);

  await Promise.all([
    ...localeSitemaps.map(({ filename, xml }) =>
      writeSitemap(filename, xml)
    ),
    writeSitemap("sitemap-index.xml", sitemapIndex),
  ]);
}

function buildLocaleEntries(locale: Locale, staticPaths: Set<string>): SitemapUrlEntry[] {
  return allPages.map((page) => {
    const path = buildLocalizedPath(locale, page, { includeLocalePrefix: locale !== defaultLocale });
    assertPathIsPrerendered(path, staticPaths);
    const loc = absoluteUrl(path);
    const alternates = buildAlternateLinks(page);
    return { loc, alternates };
  });
}

function buildAlternateLinks(page: PageType): AlternateLink[] {
  const links: AlternateLink[] = locales.map((locale) => {
    const path = buildLocalizedPath(locale, page, { includeLocalePrefix: locale !== defaultLocale });
    return { hreflang: locale, href: absoluteUrl(path) };
  });

  const defaultPath = buildLocalizedPath(defaultLocale, page, { includeLocalePrefix: false });
  links.push({ hreflang: "x-default", href: absoluteUrl(defaultPath) });
  return links;
}

function renderLocaleSitemap(entries: SitemapUrlEntry[]): string {
  const urlset = entries
    .map((entry) => {
      const alternates = entry.alternates
        .map((link) => `    <xhtml:link rel="alternate" hreflang="${escapeXml(link.hreflang)}" href="${escapeXml(link.href)}" />`)
        .join("\n");
      return [
        "  <url>",
        `    <loc>${escapeXml(entry.loc)}</loc>`,
        alternates,
        "  </url>",
      ]
        .filter(Boolean)
        .join("\n");
    })
    .join("\n");

  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    urlset,
    "</urlset>",
    "",
  ].join("\n");
}

function renderSitemapIndex(files: string[]): string {
  const entries = files
    .map((filename) => {
      const loc = absoluteUrl(`/${filename}`);
      return [
        "  <sitemap>",
        `    <loc>${escapeXml(loc)}</loc>`,
        "  </sitemap>",
      ].join("\n");
    })
    .join("\n");

  return [
    "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
    '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    entries,
    "</sitemapindex>",
    "",
  ].join("\n");
}

function absoluteUrl(pathname: string): string {
  return new URL(pathname, SITE_BASE_URL).toString();
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function assertPathIsPrerendered(pathname: string, staticPaths: Set<string>): void {
  if (!staticPaths.has(pathname)) {
    throw new Error(`Expected prerendered path for ${pathname}, but it was not found in the static routes.`);
  }
}

async function writeSitemap(filename: string, xml: string) {
  const [clientPath, publicPath] = [
    path.join(clientDir, filename),
    path.join(publicDir, filename),
  ];

  await Promise.all([
    writeFile(clientPath, xml, "utf-8"),
    writeFile(publicPath, xml, "utf-8"),
  ]);
}

main().catch((error) => {
  console.error("Sitemap generation failed", error);
  process.exit(1);
});
