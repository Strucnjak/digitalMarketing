import routeSlugs from "./locales/routes.json" with { type: "json" };

export const servicePageIds = [
  "web-design",
  "seo",
  "social-media",
  "branding",
  "strategy",
] as const;

export type PageType =
  | "home"
  | (typeof servicePageIds)[number]
  | "service-inquiry"
  | "free-consultation";

export const allPages: PageType[] = [
  "home",
  ...servicePageIds,
  "service-inquiry",
  "free-consultation",
];

export const locales = ["en", "fr", "me"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "me";

const orderedLocales: Locale[] = [defaultLocale, ...locales.filter((locale) => locale !== defaultLocale)];

const routeSegmentKeys = [
  "services",
  "web-design",
  "seo",
  "social-media",
  "branding",
  "strategy",
  "service-inquiry",
  "free-consultation",
] as const;

export type RouteSegmentKey = (typeof routeSegmentKeys)[number];

type LocaleSlugMap = Record<Locale, Record<RouteSegmentKey | "home", string>>;

const localizedSlugs = routeSlugs as LocaleSlugMap;

const routeSegmentKeysByPage: Record<PageType, RouteSegmentKey[]> = {
  home: [],
  "web-design": ["services", "web-design"],
  seo: ["services", "seo"],
  "social-media": ["services", "social-media"],
  branding: ["services", "branding"],
  strategy: ["services", "strategy"],
  "service-inquiry": ["service-inquiry"],
  "free-consultation": ["free-consultation"],
};

const segmentPatterns: Record<RouteSegmentKey, string> = Object.fromEntries(
  routeSegmentKeys.map((segment) => {
    const values = new Set<string>();
    for (const locale of locales) {
      const slug = localizedSlugs[locale][segment];
      if (slug) {
        values.add(escapeRegExp(slug));
      }
    }
    return [segment, Array.from(values).join("|") || escapeRegExp(segment)];
  })
) as Record<RouteSegmentKey, string>;

const localePageLookups: Record<Locale, Map<string, PageType>> = locales.reduce(
  (acc, locale) => {
    const map = new Map<string, PageType>();
    for (const page of allPages) {
      const segments = getSegmentsForPage(locale, page);
      const key = segments.join("/");
      map.set(key, page);
    }
    // Allow legacy home paths like /home
    map.set("home", "home");
    map.set("", "home");
    acc[locale] = map;
    return acc;
  },
  {} as Record<Locale, Map<string, PageType>>
);

export interface ParsedPath {
  locale: Locale;
  hasLocalePrefix: boolean;
  page: PageType;
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value != null && locales.includes(value as Locale);
}

export interface BuildLocalizedPathOptions {
  includeLocalePrefix?: boolean;
}

export function buildLocalizedPath(
  locale: Locale,
  page: PageType,
  options: BuildLocalizedPathOptions = {}
): string {
  const segments = getSegmentsForPage(locale, page).filter((segment) => segment.length > 0);
  const includeLocalePrefix = options.includeLocalePrefix ?? locale !== defaultLocale;
  const allSegments = includeLocalePrefix ? [locale, ...segments] : segments;
  const path = allSegments.join("/");
  return path.length > 0 ? `/${path}` : "/";
}

export function parsePathname(pathname: string): ParsedPath {
  const segments = pathname
    .split("/")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  if (segments.length === 0) {
    return { locale: defaultLocale, hasLocalePrefix: false, page: "home" };
  }

  const [first, ...rest] = segments;
  if (isLocale(first)) {
    const locale = first;
    const page = resolvePage(rest, locale) ?? resolvePage(rest, defaultLocale) ?? "home";
    return { locale, hasLocalePrefix: true, page };
  }

  for (const locale of orderedLocales) {
    const page = resolvePage(segments, locale);
    if (page) {
      return { locale, hasLocalePrefix: false, page };
    }
  }

  return { locale: defaultLocale, hasLocalePrefix: false, page: "home" };
}

export function enumerateStaticPaths(): string[] {
  const paths = new Set<string>();
  for (const locale of locales) {
    for (const page of allPages) {
      paths.add(buildLocalizedPath(locale, page, { includeLocalePrefix: true }));
      if (locale === defaultLocale) {
        paths.add(buildLocalizedPath(locale, page, { includeLocalePrefix: false }));
      }
    }
  }
  paths.add("/");
  return Array.from(paths);
}

export function getRoutePattern(page: PageType): string | null {
  const segments = routeSegmentKeysByPage[page];
  if (!segments.length) {
    return null;
  }
  return segments
    .map((segment) => `:${toParamName(segment)}(${segmentPatterns[segment]})`)
    .join("/");
}

export function getPageSegments(locale: Locale, page: PageType): string[] {
  return [...getSegmentsForPage(locale, page)];
}

function resolvePage(segments: string[], locale: Locale): PageType | null {
  const key = segments.join("/");
  const lookup = localePageLookups[locale];
  if (lookup.has(key)) {
    return lookup.get(key) ?? null;
  }

  for (const [storedKey, page] of lookup.entries()) {
    if (!storedKey) {
      continue;
    }
    const parts = storedKey.split("/");
    if (parts.length !== segments.length) {
      continue;
    }
    if (parts.every((part, index) => part === segments[index])) {
      return page;
    }
  }

  return null;
}

function getSegmentsForPage(locale: Locale, page: PageType): string[] {
  if (page === "home") {
    return localizedSlugs[locale]?.home ? [localizedSlugs[locale].home].filter((segment) => segment.length > 0) : [];
  }
  const segments = routeSegmentKeysByPage[page] ?? [];
  return segments.map((segment) => localizedSlugs[locale]?.[segment] ?? segment);
}

function toParamName(segment: RouteSegmentKey): string {
  return segment.replace(/[^A-Za-z0-9]+/g, "_");
}

function escapeRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
