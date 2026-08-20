# DIAL ME / FR Localisation Report

## Source

Approved English master unchanged. The localisation followed the English keys introduced or changed by the approved master implementation and the approved English route metadata.

**ENGLISH SOURCE REVIEW REQUIRED:** two legacy English package/detail strings still use the obsolete product name “Google My Business” (`seo.service.local_desc` and `seo.package.starter.feature3`). They were not changed because English is frozen. The newer approved service copy correctly uses “Google Business Profile”.

## Montenegrin

**PASS.** All 193 approved master-copy keys have natural contemporary Montenegrin values in Latin script. Key parity with English is preserved.

## French

**PASS.** All 193 approved master-copy keys have professional French values with natural grammar, accents and punctuation. Key parity with English is preserved.

## Homepage

ME: **PASS** — performance marketing, qualified opportunities, connected acquisition/conversion/measurement, primary CTA and supporting sections are aligned.

FR: **PASS** — proposition, commercial specificity and moderate CTA commitment are aligned.

## Web Design

ME: **PASS** — conversion, performance, technical SEO, measurement, maintainability and process copy are aligned.

FR: **PASS** — buyer journey concepts were localised naturally rather than translated word for word.

## SEO

ME: **PASS** — technical, on-page and local SEO, search intent, indexation and organic visibility terminology are preserved.

FR: **PASS** — standard professional SEO terminology and natural search-language phrasing are used.

## Paid Media / Social

ME: **PASS** — paid campaigns, audience strategy, creative testing, conversion tracking and lead-quality feedback remain distinct.

FR: **PASS** — social ads terminology is used contextually without reducing the proposition to community management.

## Branding

ME: **PASS** — restrained brand-system and creative-support positioning is preserved.

FR: **PASS** — the copy avoids inflated creative-agency language and keeps the approved service scope.

## Strategy

ME: **PASS** — priorities before additional investment, acquisition audit and measurement architecture remain commercially direct.

FR: **PASS** — decision-focused strategy and the exact certainty level of the source are preserved.

## Strategy Call

ME: **PASS** — “Zakažite strateški razgovor” consistently conveys scheduling a moderate-commitment strategic discussion.

FR: **PASS** — “Réserver un échange stratégique” consistently conveys scheduling without implying purchase.

## Service Inquiry

ME: **PASS** — scope, current setup, commercial objective and recommended next step are preserved.

FR: **PASS** — the utility-page framing remains commercially clear without adding a response-time promise.

## SEO metadata

ME: **PASS** — unique intent-led metadata is present for all eight indexed page types.

FR: **PASS** — unique intent-led metadata is present for all eight indexed page types. Open Graph and Twitter metadata consume the same route metadata through the existing SEO implementation.

See `docs/localised-seo-copy-review.md` for the route-by-route matrix.

## CTA intent

**PASS.** The primary and service-specific calls to action keep their original commitment and remain distinct.

| Location | EN | ME | FR | Intent match |
|---|---|---|---|---|
| Global primary CTA | Book a Strategy Call | Zakažite strateški razgovor | Réserver un échange stratégique | PASS |
| Homepage secondary CTA | View Selected Work | Pogledajte odabrane radove | Voir une sélection de réalisations | PASS |
| SEO hero / close | Book an SEO Review | Zakažite SEO pregled | Réserver un audit SEO | PASS |
| Branding hero / close | Discuss a Brand Project | Razgovarajte o brend projektu | Discuter d’un projet de marque | PASS |
| Service details | View service details | Pogledajte detalje usluge | Voir le détail du service | PASS |
| Portfolio close | Book a Strategy Call | Zakažite strateški razgovor | Réserver un échange stratégique | PASS |
| Strategy Call form | Book a Strategy Call | Zakažite strateški razgovor | Réserver un échange stratégique | PASS |

## Terminology consistency

**PASS.** The controlled decisions are recorded in `docs/localisation-glossary.md`. Qualified lead, paid acquisition, conversion tracking, attribution, source mapping, CRM and the connected service hierarchy retain a consistent commercial meaning.

## English leftovers

No accidental English fallback remains among the 193 approved English master-copy keys.

Intentional established terms/product names include DIAL, SEO, CRM, GA4, GTM, Google Ads, Meta Ads, ROI, UX, QA, on-page SEO, landing page, performance marketing (ME), lead/leads, B2B and social ads (FR). Existing package names and technical/product labels outside the approved master-copy change remain as previously localised or intentionally international.

## Translation decisions

- “Pipeline” is expressed as qualified commercial opportunities rather than translated literally.
- ME retains “performance marketing”, “landing stranica” and “lead” as established professional terminology.
- FR uses “marketing à la performance”; “prospect qualifié” is preferred in visible propositions while “lead qualifié” remains in CRM/process contexts.
- The main CTA uses “strateški razgovor” / “échange stratégique” rather than language suggesting a purchase or a generic consultation.
- Paid media wording varies by context between the channel, campaign and acquisition activity while retaining the approved meaning.

## API contract

**UNCHANGED.** Endpoint paths, request field names, request value enums, language machine values, newsletter Boolean handling, service/package IDs, DTO shapes, `leadContract.ts`, payload construction and route IDs were not modified. Lead-contract regression tests pass.

## Responsive localisation QA

The production SSG rendered ME and FR home, service, Strategy Call and Service Inquiry routes successfully with the translated content. Static markup confirms locale-specific navigation, hero, CTA, service, contact and footer copy. Browser viewport inspection at 375, 768, 1024 and 1440 pixels was **not runtime verified** because no supported browser automation executable is installed in the environment. No UI/CSS redesign or accommodation was introduced.

## Files changed

- `src/locales/me.json`
- `src/locales/fr.json`
- `src/config/seo-meta.ts`
- `tests/seo-regression.test.ts`
- `docs/pending-copy-translations.md`
- `docs/localisation-glossary.md`
- `docs/localised-seo-copy-review.md`
- `docs/me-fr-localisation-report.md`

## Tests

- Locale JSON parse, key parity and approved-key fallback audit: PASS (653 keys per locale; no missing/extra keys; no unintended fallback among 193 approved keys).
- `npm test`: PASS (SEO canonical regression and lead-contract tests).
- `npx eslint src/config/seo-meta.ts tests/seo-regression.test.ts`: PASS.
- `npm run lint`: FAIL due to 15 pre-existing errors outside this localisation patch; the changed TypeScript files pass targeted lint.
- `npm run build`: PASS, including TypeScript, client build, SSR build, static generation and sitemap generation for ME/FR routes.
- `git diff --exit-code -- src/locales/en.json src/api/leadContract.ts src/utils/leadSubmission.ts src/locales/routes.json`: PASS; English master, lead contract/payload implementation and route slugs are unchanged.
