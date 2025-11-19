import {
  buildLocalizedPath,
  defaultLocale,
  getPageSegments,
  parsePathname,
  locales,
  type Locale,
  type PageType,
} from "../routing";

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
  hasLocalePrefix: boolean;
  locale: Locale;
  page: PageType;
  siteBaseUrl: string;
}

export interface WebPageJsonLdOptions {
  locale: Locale;
  title: string;
  description: string;
  url: string;
}

export const STRUCTURED_DATA_ELEMENT_ID = "seo-structured-data";

const ORGANIZATION_NAMES: Record<Locale, string> = {
  en: "DIAL Digital Agency",
  me: "DIAL Digital agencija",
};

const HOME_BREADCRUMB_LABELS: Record<Locale, string> = {
  en: "Home",
  me: "Početna",
};

export interface LocalePresentation {
  hreflang: string;
  htmlLang: string;
  ogLocale: string;
  schemaLanguage: string;
}

const LOCALE_PRESENTATION: Record<Locale, LocalePresentation> = {
  en: {
    hreflang: "en",
    htmlLang: "en",
    ogLocale: "en_US",
    schemaLanguage: "en",
  },
  me: {
    hreflang: "sr-Latn-ME",
    htmlLang: "sr-Latn-ME",
    ogLocale: "sr_ME",
    schemaLanguage: "sr-Latn-ME",
  },
};

export function getLocalePresentation(locale: Locale): LocalePresentation {
  return LOCALE_PRESENTATION[locale] ?? LOCALE_PRESENTATION[defaultLocale];
}

export const ORGANIZATION_SOCIAL_LINKS = [
  "https://www.facebook.com/BDigitalAgency",
  "https://www.instagram.com/bdigitalagency",
  "https://www.linkedin.com/company/bdigital-agency",
];

export interface BuildOrganizationJsonLdOptions {
  locale: Locale;
  siteBaseUrl: string;
  logoPath: string;
  socialProfiles?: string[];
}

export interface BuildWebsiteJsonLdOptions {
  locale: Locale;
  siteBaseUrl: string;
}

export interface BuildBreadcrumbListJsonLdOptions {
  locale: Locale;
  page: PageType;
  siteBaseUrl: string;
  canonicalUrl: string;
  pageTitle: string;
}

export function buildCanonicalCluster({
  currentUrl,
  hasLocalePrefix,
  locale,
  page,
  siteBaseUrl,
}: BuildCanonicalClusterOptions): CanonicalCluster {
  const requestOrigin = new URL(currentUrl.href).origin;
  const base = normalizeSiteBase(siteBaseUrl || requestOrigin);
  const shouldDropDefaultLocalePrefix = locale === defaultLocale && hasLocalePrefix;
  const canonicalPath = shouldDropDefaultLocalePrefix
    ? buildLocalizedPath(locale, page, { includeLocalePrefix: false })
    : buildLocalizedPath(locale, page, { includeLocalePrefix: locale !== defaultLocale });
  const canonicalUrl = new URL(canonicalPath, base);
  canonicalUrl.search = "";
  canonicalUrl.hash = "";
  const canonical = canonicalUrl.href;

  const alternates: AlternateHref[] = locales.map((alternateLocale) => {
    const presentation = getLocalePresentation(alternateLocale);
    return {
      hreflang: presentation.hreflang,
      href: buildAbsoluteLocalizedHref(alternateLocale, page, base),
    };
  });

  const activePresentation = getLocalePresentation(locale);
  const activeLocaleIndex = alternates.findIndex(
    (alternate) => alternate.hreflang === activePresentation.hreflang,
  );
  if (activeLocaleIndex >= 0) {
    alternates[activeLocaleIndex] = { hreflang: activePresentation.hreflang, href: canonical };
  }

  const xDefaultHref = buildAbsoluteLocalizedHref(defaultLocale, page, base, {
    includeLocalePrefix: false,
  });

  alternates.push({ hreflang: "x-default", href: xDefaultHref });

  return {
    canonical,
    alternates: dedupeAlternates(alternates),
  };
}

export function buildWebPageJsonLd({
  locale,
  title,
  description,
  url,
}: WebPageJsonLdOptions) {
  const { schemaLanguage } = getLocalePresentation(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    inLanguage: schemaLanguage,
    name: title,
    description,
    url,
  };
}

export function buildOrganizationJsonLd({
  locale,
  siteBaseUrl,
  logoPath,
  socialProfiles = ORGANIZATION_SOCIAL_LINKS,
}: BuildOrganizationJsonLdOptions) {
  const { schemaLanguage } = getLocalePresentation(locale);
  const base = normalizeSiteBase(siteBaseUrl);
  const organizationName = ORGANIZATION_NAMES[locale] ?? ORGANIZATION_NAMES[defaultLocale];
  const logoUrl = new URL(logoPath, base).href;
  const sameAs = socialProfiles.filter((profile) => profile && profile.trim().length > 0);

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    inLanguage: schemaLanguage,
    name: organizationName,
    url: base.href,
    logo: logoUrl,
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function buildWebsiteJsonLd({
  locale,
  siteBaseUrl,
}: BuildWebsiteJsonLdOptions) {
  const { schemaLanguage } = getLocalePresentation(locale);
  const base = normalizeSiteBase(siteBaseUrl);
  const homePath = buildLocalizedPath(locale, "home", {
    includeLocalePrefix: locale !== defaultLocale,
  });
  const homeUrl = new URL(homePath || "/", base).href;
  const searchQueryDelimiter = homeUrl.includes("?") ? "&" : "?";
  const localeQuery = locale !== defaultLocale ? `&lang=${locale}` : "";
  const searchTarget = `${homeUrl}${searchQueryDelimiter}s={search_term_string}${localeQuery}`;
  const name = ORGANIZATION_NAMES[locale] ?? ORGANIZATION_NAMES[defaultLocale];

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    inLanguage: schemaLanguage,
    name,
    url: homeUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: searchTarget,
      "query-input": "required name=search_term_string",
    },
  };
}

export function buildBreadcrumbListJsonLd({
  locale,
  page,
  siteBaseUrl,
  canonicalUrl,
  pageTitle,
}: BuildBreadcrumbListJsonLdOptions) {
  const { schemaLanguage } = getLocalePresentation(locale);
  const base = normalizeSiteBase(siteBaseUrl);
  const canonical = new URL(canonicalUrl, base);
  const localizedSegments = getPageSegments(locale, page).filter((segment) => segment.length > 0);
  const canonicalSegments = canonical.pathname
    .split("/")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);
  const localePrefixSegments = canonicalSegments.slice(
    0,
    Math.max(0, canonicalSegments.length - localizedSegments.length),
  );

  const items: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }> = [];

  const homeName = HOME_BREADCRUMB_LABELS[locale] ?? HOME_BREADCRUMB_LABELS[defaultLocale];
  const homePath = localePrefixSegments.length ? `/${localePrefixSegments.join("/")}` : "/";
  const homeUrl = new URL(homePath, base).href;
  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: homeName,
    item: homeUrl,
  });

  if (!localizedSegments.length) {
    return {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      inLanguage: schemaLanguage,
      itemListElement: items,
    };
  }

  const accumulatedSegments: string[] = [];
  for (const [index, segment] of localizedSegments.entries()) {
    accumulatedSegments.push(segment);
    const isLast = index === localizedSegments.length - 1;
    const pathSegments = [...localePrefixSegments, ...accumulatedSegments];
    const path = `/${pathSegments.join("/")}`;
    const parsedPartial = parsePathname(path);
    const expectedPath = buildLocalizedPath(parsedPartial.locale, parsedPartial.page, {
      includeLocalePrefix: parsedPartial.hasLocalePrefix,
    });

    if (!isLast && expectedPath !== path) {
      continue;
    }

    const itemUrl = isLast ? canonical.href : new URL(path, base).href;
    items.push({
      "@type": "ListItem",
      position: items.length + 1,
      name: isLast ? pageTitle : formatBreadcrumbSegment(segment, locale),
      item: itemUrl,
    });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    inLanguage: schemaLanguage,
    itemListElement: items,
  };
}

export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026");
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

function formatBreadcrumbSegment(segment: string, locale: Locale): string {
  const decoded = decodeURIComponent(segment);
  return decoded
    .split("-")
    .map((part) =>
      part.length > 0
        ? part.charAt(0).toLocaleUpperCase(locale) + part.slice(1)
        : part,
    )
    .join(" ");
}
