import { SITE_BASE_URL } from "../src/config/site";
import { getSeoMetadata } from "../src/config/seo-meta";
import { parsePathname, type PageType } from "../src/routing";
import { buildCanonicalCluster } from "../src/utils/seo";

function assertCondition(
  condition: unknown,
  message: string,
): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function assertEqual<T>(actual: T, expected: T, message: string): void {
  if (actual !== expected) {
    throw new Error(`${message}\nExpected: ${expected}\nReceived: ${actual}`);
  }
}

const pathsToTest = ["/me/usluge/seo", "/usluge/seo"] as const;

const results = pathsToTest.map((path) => {
  const url = new URL(path, SITE_BASE_URL);
  const parsed = parsePathname(url.pathname);
  const cluster = buildCanonicalCluster({
    currentUrl: url,
    hasLocalePrefix: parsed.hasLocalePrefix,
    locale: parsed.locale,
    page: parsed.page,
    siteBaseUrl: SITE_BASE_URL,
  });

  return { path, cluster };
});

const canonicalHrefs = new Set(
  results.map((result) => result.cluster.canonical),
);
assertEqual(
  canonicalHrefs.size,
  1,
  "Expected all canonical hrefs to normalize to the same Montenegrin URL",
);

const [normalizedCanonical] = canonicalHrefs;
if (!normalizedCanonical) {
  throw new Error("Failed to capture canonical href for comparison");
}

for (const { path, cluster } of results) {
  assertEqual(
    cluster.canonical,
    normalizedCanonical,
    `Canonical href for ${path} should match the normalized Montenegrin URL`,
  );

  const montenegrinAlternate = cluster.alternates.find(
    (alternate) => alternate.hreflang === "me",
  );
  assertCondition(
    montenegrinAlternate,
    `Expected hreflang="me" alternate for ${path} to be present`,
  );
  assertEqual(
    montenegrinAlternate.href,
    normalizedCanonical,
    `hreflang="me" alternate for ${path} should point to the canonical URL`,
  );

  const xDefaultAlternate = cluster.alternates.find(
    (alternate) => alternate.hreflang === "x-default",
  );
  assertCondition(
    xDefaultAlternate,
    `Expected hreflang="x-default" alternate for ${path} to be present`,
  );
  assertEqual(
    xDefaultAlternate.href,
    normalizedCanonical,
    `hreflang="x-default" alternate for ${path} should mirror the canonical URL`,
  );
}

console.log(
  "SEO canonical regression checks passed for",
  pathsToTest.join(", "),
);

const frenchFallback = getSeoMetadata("fr", "unmapped" as PageType);
assertEqual(
  frenchFallback.title,
  "Agence de marketing à la performance au Monténégro | DIAL",
  "Unmapped French pages should use the safe French metadata default",
);

assertEqual(parsePathname("/en/does-not-exist").isKnown, false, "Unknown localized paths must be classified as 404s");
assertEqual(parsePathname("/fr/services/referencement").isKnown, true, "Known localized deep links must not be classified as 404s");

const analyticsPaths = [
  "/en/services/analytics-tracking-crm",
  "/usluge/analitika-pracenje-crm",
  "/fr/services/analytics-suivi-crm",
] as const;
for (const path of analyticsPaths) {
  const parsed = parsePathname(path);
  assertEqual(parsed.isKnown, true, `Analytics route ${path} must be known`);
  assertEqual(
    parsed.page,
    "analytics-tracking-crm",
    `Analytics route ${path} must resolve to the shared page identifier`,
  );
}

assertEqual(
  getSeoMetadata("en", "analytics-tracking-crm").title,
  "Marketing Analytics, Tracking & CRM | DIAL",
  "The English Analytics page must expose its approved SEO title",
);
assertEqual(
  getSeoMetadata("me", "analytics-tracking-crm").title,
  "Analitika, praćenje i CRM | DIAL",
  "The Montenegrin Analytics page must expose localised SEO metadata",
);
assertEqual(
  getSeoMetadata("fr", "analytics-tracking-crm").title,
  "Analytics, suivi des conversions & CRM | DIAL",
  "The French Analytics page must expose localised SEO metadata",
);
