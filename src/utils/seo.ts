import { buildLocalizedPath, defaultLocale, locales, type Locale, type PageType } from "../routing";

export interface CanonicalCluster {
  canonical: string;
  alternates: AlternateHref[];
}

export interface AlternateHref {
  hreflang: string;
  href: string;
}

export interface BuildCanonicalClusterOptions {
  currentUrl: URL;
  page: PageType;
  siteBaseUrl: string;
}

export function buildCanonicalCluster({
  currentUrl,
  page,
  siteBaseUrl,
}: BuildCanonicalClusterOptions): CanonicalCluster {
  const base = normalizeSiteBase(siteBaseUrl);
  const canonicalUrl = new URL(currentUrl.href);
  canonicalUrl.search = "";
  canonicalUrl.hash = "";
  const canonical = canonicalUrl.href;

  const alternates: AlternateHref[] = locales.map((locale) => ({
    hreflang: locale,
    href: buildAbsoluteLocalizedHref(locale, page, base),
  }));

  const xDefaultHref = buildAbsoluteLocalizedHref(defaultLocale, page, base, {
    includeLocalePrefix: false,
  });

  alternates.push({ hreflang: "x-default", href: xDefaultHref });

  return {
    canonical,
    alternates: dedupeAlternates(alternates),
  };
}

function buildAbsoluteLocalizedHref(
  locale: Locale,
  page: PageType,
  base: URL,
  options: { includeLocalePrefix?: boolean } = {},
): string {
  const localizedPath = buildLocalizedPath(locale, page, {
    includeLocalePrefix: options.includeLocalePrefix ?? locale !== defaultLocale,
  });
  return new URL(localizedPath, base).href;
}

function normalizeSiteBase(siteBaseUrl: string): URL {
  const base = new URL(siteBaseUrl);
  base.pathname = base.pathname.endsWith("/") ? base.pathname : `${base.pathname}/`;
  base.search = "";
  base.hash = "";
  return base;
}

function dedupeAlternates(alternates: AlternateHref[]): AlternateHref[] {
  const seen = new Set<string>();
  const result: AlternateHref[] = [];
  for (const alternate of alternates) {
    const key = `${alternate.hreflang}|${alternate.href}`;
    if (seen.has(key)) {
      continue;
    }
    seen.add(key);
    result.push({
      hreflang: alternate.hreflang,
      href: alternate.href,
    });
  }
  return result;
}
