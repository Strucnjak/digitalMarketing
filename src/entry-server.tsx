import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./routes";
import { SITE_BASE_URL } from "./config/site";
import { getSeoMetadata } from "./config/seo-meta";
import { locales, parsePathname } from "./routing";
import { InitialStateProvider, type InitialAppState } from "./components/InitialStateContext";
import { AdminDataProvider } from "./components/AdminDataContext";
import {
  STRUCTURED_DATA_ELEMENT_ID,
  buildCanonicalCluster,
  buildBreadcrumbListJsonLd,
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
  buildWebPageJsonLd,
  getLocalePresentation,
  serializeJsonLd,
} from "./utils/seo";

export interface ManifestEntry {
  file: string;
  css?: string[];
  assets?: string[];
  imports?: string[];
}

export type Manifest = Record<string, ManifestEntry>;

export interface RenderResult {
  html: string;
  head: string;
  preloadLinks: string;
  htmlLang: string;
  initialState: {
    locale: string;
    footerYear?: number;
  };
}

export interface RenderOptions {
  manifest?: Manifest;
}

export function render(url: string, options: RenderOptions = {}): RenderResult {
  const requestUrl = new URL(url, SITE_BASE_URL);
  const { locale, page, hasLocalePrefix } = parsePathname(requestUrl.pathname);
  const localePresentation = getLocalePresentation(locale);
  const footerYear = new Date().getFullYear();
  const initialState: InitialAppState = { locale, footerYear };

  const app = (
    <StrictMode>
      <InitialStateProvider value={initialState}>
        <StaticRouter location={url}>
          <AdminDataProvider>
            <AppRoutes />
          </AdminDataProvider>
        </StaticRouter>
      </InitialStateProvider>
    </StrictMode>
  );

  const html = renderToString(app);

  const canonicalCluster = buildCanonicalCluster({
    currentUrl: requestUrl,
    hasLocalePrefix,
    locale,
    page,
    siteBaseUrl: SITE_BASE_URL,
  });

  const metadata = getSeoMetadata(locale, page);
  const alternateOgLocales = Array.from(
    new Set(
      locales
        .map((supportedLocale) => getLocalePresentation(supportedLocale).ogLocale)
        .filter((supportedOgLocale) => supportedOgLocale !== localePresentation.ogLocale),
    ),
  );

  const structuredData = [
    buildWebPageJsonLd({
      locale,
      title: metadata.title,
      description: metadata.description,
      url: canonicalCluster.canonical,
    }),
    buildOrganizationJsonLd({
      locale,
      siteBaseUrl: SITE_BASE_URL,
      logoPath: "/logo.svg",
    }),
    buildWebsiteJsonLd({
      locale,
      siteBaseUrl: SITE_BASE_URL,
    }),
    buildBreadcrumbListJsonLd({
      locale,
      page,
      siteBaseUrl: SITE_BASE_URL,
      canonicalUrl: canonicalCluster.canonical,
      pageTitle: metadata.title,
    }),
  ];

  const jsonLdScript = `<script id="${STRUCTURED_DATA_ELEMENT_ID}" type="application/ld+json">${serializeJsonLd(
    structuredData,
  )}</script>`;

  const headParts = [
    `<title>${escapeHtml(metadata.title)}</title>`,
    `<meta name="description" content="${escapeAttribute(metadata.description)}" />`,
    `<meta property="og:title" content="${escapeAttribute(metadata.title)}">`,
    `<meta property="og:description" content="${escapeAttribute(metadata.description)}">`,
    `<meta name="twitter:title" content="${escapeAttribute(metadata.title)}">`,
    `<meta name="twitter:description" content="${escapeAttribute(metadata.description)}">`,
    `<meta property="og:locale" content="${escapeAttribute(localePresentation.ogLocale)}">`,
    ...alternateOgLocales.map(
      (alternateOgLocale) =>
        `<meta property="og:locale:alternate" content="${escapeAttribute(alternateOgLocale)}">`,
    ),
    `<meta name="twitter:card" content="summary_large_image">`,
    `<link rel="canonical" href="${escapeAttribute(canonicalCluster.canonical)}">`,
    ...canonicalCluster.alternates.map(
      (alternate) =>
        `<link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeAttribute(alternate.href)}">`,
    ),
    ...(metadata.images ?? []).flatMap((imageUrl) => [
      `<meta property="og:image" content="${escapeAttribute(imageUrl)}">`,
      `<meta name="twitter:image" content="${escapeAttribute(imageUrl)}">`,
    ]),
    jsonLdScript,
  ];

  const head = headParts.join("\n");

  const preloadLinks = options.manifest
    ? renderPreloadLinks(options.manifest, "src/entry-client.tsx")
    : "";

  return {
    html,
    head,
    preloadLinks,
    htmlLang: localePresentation.htmlLang,
    initialState,
  };
}

function renderPreloadLinks(manifest: Manifest, entry: string) {
  const seen = new Set<string>();
  let links = "";

  function traverse(id: string) {
    if (seen.has(id)) {
      return;
    }
    seen.add(id);

    const chunk = manifest[id];
    if (!chunk) {
      return;
    }

    if (chunk.file) {
      links += `<link rel="modulepreload" crossorigin href="/${chunk.file}">`;
    }

    if (chunk.css) {
      for (const cssFile of chunk.css) {
        links += `<link rel="stylesheet" href="/${cssFile}">`;
      }
    }

    if (chunk.assets) {
      for (const asset of chunk.assets) {
        links += `<link rel="preload" href="/${asset}" as="image">`;
      }
    }

    if (chunk.imports) {
      for (const importId of chunk.imports) {
        traverse(importId);
      }
    }
  }

  traverse(entry);
  return links;
}

function escapeAttribute(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/"/g, "&quot;");
}

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}
