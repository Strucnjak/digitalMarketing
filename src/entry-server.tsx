import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { AppRoutes } from "./routes";
import { SITE_BASE_URL } from "./config/site";
import { parsePathname } from "./routing";
import { buildCanonicalCluster } from "./utils/seo";

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
  initialState: {
    locale: string;
  };
}

export interface RenderOptions {
  manifest?: Manifest;
}

const TITLE = "BDigital Agency";
const DESCRIPTION =
  "BDigital is a full-service digital agency delivering design, marketing, and growth solutions.";

export function render(url: string, options: RenderOptions = {}): RenderResult {
  const app = (
    <StrictMode>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </StrictMode>
  );

  const html = renderToString(app);

  const requestUrl = new URL(url, SITE_BASE_URL);
  const { locale, page } = parsePathname(requestUrl.pathname);
  const canonicalCluster = buildCanonicalCluster({
    currentUrl: requestUrl,
    page,
    siteBaseUrl: SITE_BASE_URL,
  });

  const headParts = [
    `<title>${TITLE}</title>`,
    `<meta name="description" content="${DESCRIPTION}" />`,
    `<link rel="canonical" href="${escapeAttribute(canonicalCluster.canonical)}">`,
    ...canonicalCluster.alternates.map(
      (alternate) =>
        `<link rel="alternate" hreflang="${alternate.hreflang}" href="${escapeAttribute(alternate.href)}">`,
    ),
  ];

  const head = headParts.join("\n");

  const preloadLinks = options.manifest
    ? renderPreloadLinks(options.manifest, "src/entry-client.tsx")
    : "";

  return {
    html,
    head,
    preloadLinks,
    initialState: { locale },
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
