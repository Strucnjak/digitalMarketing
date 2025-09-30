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

export const locales = ["en", "me"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "me";

const pageSegments: Record<PageType, string> = {
  home: "",
  "web-design": "web-design",
  seo: "seo",
  "social-media": "social-media",
  branding: "branding",
  strategy: "strategy",
  "service-inquiry": "service-inquiry",
  "free-consultation": "free-consultation",
};

export interface ParsedPath {
  locale: Locale;
  hasLocalePrefix: boolean;
  page: PageType;
}

export function isLocale(value: string | undefined | null): value is Locale {
  return value != null && locales.includes(value as Locale);
}

function normalizePage(segment: string | undefined): PageType {
  if (!segment || segment === "home") {
    return "home";
  }
  if ((servicePageIds as readonly string[]).includes(segment)) {
    return segment as PageType;
  }
  if (segment === "service-inquiry" || segment === "free-consultation") {
    return segment;
  }
  return "home";
}

export function parsePathname(pathname: string): ParsedPath {
  const segments = pathname
    .split("/")
    .map((segment) => segment.trim())
    .filter((segment) => segment.length > 0);

  if (segments.length === 0) {
    return { locale: defaultLocale, hasLocalePrefix: false, page: "home" };
  }

  const [first, second] = segments;
  if (isLocale(first)) {
    return {
      locale: first,
      hasLocalePrefix: true,
      page: normalizePage(second),
    };
  }

  return {
    locale: defaultLocale,
    hasLocalePrefix: false,
    page: normalizePage(first),
  };
}

export interface BuildPathOptions {
  includeLocalePrefix?: boolean;
}

export function buildPath(
  page: PageType,
  locale: Locale,
  options: BuildPathOptions = {}
): string {
  const segment = pageSegments[page];
  const shouldIncludeLocale =
    options.includeLocalePrefix ?? locale !== defaultLocale;

  if (shouldIncludeLocale) {
    const base = `/${locale}`;
    return segment ? `${base}/${segment}` : base;
  }

  return segment ? `/${segment}` : "/";
}
