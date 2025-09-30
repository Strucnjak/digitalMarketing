import { SITE_BASE_URL } from "../src/config/site";
import { parsePathname } from "../src/routing";
import { buildCanonicalCluster } from "../src/utils/seo";

function assertCondition(condition: unknown, message: string): asserts condition {
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

const canonicalHrefs = new Set(results.map((result) => result.cluster.canonical));
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
    `Expected hreflang=\"me\" alternate for ${path} to be present`,
  );
  assertEqual(
    montenegrinAlternate.href,
    normalizedCanonical,
    `hreflang=\"me\" alternate for ${path} should point to the canonical URL`,
  );

  const xDefaultAlternate = cluster.alternates.find(
    (alternate) => alternate.hreflang === "x-default",
  );
  assertCondition(
    xDefaultAlternate,
    `Expected hreflang=\"x-default\" alternate for ${path} to be present`,
  );
  assertEqual(
    xDefaultAlternate.href,
    normalizedCanonical,
    `hreflang=\"x-default\" alternate for ${path} should mirror the canonical URL`,
  );
}

console.log("SEO canonical regression checks passed for", pathsToTest.join(", "));
