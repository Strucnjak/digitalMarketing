# Analytics, Tracking & CRM Page

## Route

- EN: `/en/services/analytics-tracking-crm`
- ME: `/usluge/analitika-pracenje-crm` (also available with the explicit `/me` prefix)
- FR: `/fr/services/analytics-suivi-crm`

## Page status

Production implementation complete. Final browser-based visual review remains recommended because the implementation environment did not provide an installed browser.

## English copy

The approved master proposition and all requested editorial, capability, journey, outcome, diagnostic, CRM, attribution, reporting, process, audience and CTA sections are implemented without invented results or integrations.

## Montenegrin localisation

Complete Latin-script localisation uses the approved glossary, including *kvalifikovani lead*, *landing stranica*, *praćenje konverzija*, *mapiranje izvora* and *strateški razgovor*.

## French localisation

Complete professional localisation uses consistent CRM/process terminology, including *lead qualifié*, *suivi des conversions*, *cartographie des sources* and *échange stratégique*.

## SEO

Localised title and description metadata feeds the existing description, Open Graph and Twitter metadata pipeline. The standard locale social image is reused.

## Hreflang / canonical

The page is registered in the shared route model, so the existing canonical cluster emits self-canonicals and EN, ME, FR and x-default alternates.

## Sitemap

The shared `allPages` route inventory includes the page. The build generated localised sitemap entries and alternates for every locale.

## Structured data

The existing factual WebPage, Organisation, WebSite and BreadcrumbList JSON-LD pipeline covers the new route. No reviews, ratings, unsupported service areas or client claims were added.

## Navigation

The service is a real destination in desktop and mobile service navigation and is included in the footer service list.

## Homepage service link

The former “Page recommended” Analytics, Tracking & CRM row is now an interactive link to the localised page.

## Related services

The page links selectively to Digital Strategy & Consulting, Web Design & Development, SEO & Search Visibility, and Performance Marketing & Paid Media.

## Visual consistency

The implementation reuses `site-container`, `section-shell`, `eyebrow`, `display-title`, `section-title`, existing responsive grids, CTA hierarchy, borders and fixed deep-navy brand fields. Content alternates editorial layouts, compact capability cells, process rows and a restrained journey framework.

## Colour-system compliance

Semantic neutral tokens establish hierarchy. Cyan is limited to the primary Strategy Call actions and existing focus treatment. No legacy electric cyan, coloured glow, rainbow chart or new visual token was introduced.

## Responsive QA

Layouts define mobile-first stacking and established breakpoints for 375px, 768px, 1024px and 1440px behaviour. The production build and prerender pass for all locales. Browser screenshot inspection is outstanding because no supported browser executable was installed in the environment.

## Accessibility

The page has one H1, ordered heading hierarchy, descriptive links, keyboard focus styles, accessible native ordered/list markup, decorative icons hidden from assistive technology, and textual descriptions for every step in the journey. Meaning does not depend on colour.

## API / forms

No backend, DTO, form enum, endpoint, service identifier or lead payload was changed. Strategy Call CTAs use the existing localised free-consultation route, and Contact DIAL uses the existing contact anchor.

## Analytics integration

No ad-hoc events were introduced. The page participates in the existing route and delegated consultation-link measurement infrastructure.

## Files changed

- `src/components/services/AnalyticsTrackingCrmPage.tsx`
- `src/components/Navigation.tsx`
- `src/components/Footer.tsx`
- `src/components/ServicesSection.tsx`
- `src/config/seo-meta.ts`
- `src/locales/en.json`
- `src/locales/me.json`
- `src/locales/fr.json`
- `src/locales/routes.json`
- `src/routes.tsx`
- `src/routing.ts`
- `docs/analytics-tracking-crm-page-report.md`

## Tests

- `npm run build` — passed, including TypeScript, client build, SSR build, prerender and sitemap generation.
- `npm test` — passed SEO canonical regression and lead-contract tests.
- `npx eslint src/components/services/AnalyticsTrackingCrmPage.tsx src/components/Navigation.tsx src/components/Footer.tsx src/components/ServicesSection.tsx src/config/seo-meta.ts src/routing.ts tests/seo-regression.test.ts` — passed.
- `npm run lint` — the repository-wide check remains blocked by 15 pre-existing lint findings in shared/unrelated files (including the existing mixed-export rule in `src/routes.tsx`); no finding targets the new page.
- Locale key parity check — passed with 126 page keys in each locale.
- `git diff --check` — passed.

## Remaining issues

Browser-based light/dark screenshots at the requested viewports could not be captured because the environment contains no supported browser executable. Complete final multilingual visual launch QA in a browser before release.
