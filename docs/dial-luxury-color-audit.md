# DIAL Luxury Colour Audit

## Executive summary

**Overall colour-system status: PARTIALLY ALIGNED — SIGNIFICANT REFINEMENT REQUIRED.** DIAL has the right broad ingredients—dark navy foundations, pale neutral copy, a single dominant cyan family, and no purple/orb excess—but the implementation predates the approved accent reference and distributes saturated cyan across too many equivalent UI moments. Its four active navies can create useful depth; however, overlapping Slate/Gray ramps, unresolved custom classes, an unimported semantic theme, repeated card treatments, and legacy asset colours make the system fragmented rather than disciplined.

Static source inspection supports the findings below. **RUNTIME VISUAL QA NOT COMPLETED**: no browser-rendered dark/light coverage was performed, so visual judgements are explicitly based on authored styles rather than guessed rendering.

## Current colour identity

The live identity is near-black/navy + electric cyan (`#00d4ff`), not the approved reference cyan (`#06b6d4`). It reads as modern technology first and premium consultancy second. Navy usage is coherent across hero, footer, and service templates; neutral breathing space on the homepage improves restraint. Repetitive cyan icon tiles, badges, borders, KPI numbers, buttons, and hover fills shift detailed service pages toward generic SaaS/agency presentation.

**Brand distinctiveness: GENERIC.** The raw combination is common, and current proportions/interactions do not yet create a sufficiently DIAL-specific material signature. The green legacy logo and locale-specific social palettes further weaken one recognisable identity.

## Primary accent assessment

**OVERUSED.** The active family has one base, one configured hover, six authored alpha variants, and an intended dark variant that is referenced but absent from active Tailwind configuration. Cyan marks the main CTA and focus (correct), but also most service icons, multiple heading fragments, KPIs, badges, package checks, process markers, connectors, ordinary borders, secondary-outline buttons, hover surfaces, and the mobile quick action/glow. Large solid cyan page backgrounds were not found, so this is not “severely overused”; the problem is repeated hierarchy competition.

The approved `#06b6d4` is absent. This audit does not recommend swapping values in isolation: first approve role and proportion, then implement the approved colour through one source of truth.

## Dark-mode assessment

**ISSUE — between PREMIUM DEPTH and FLAT GENERIC DARK MODE.** Midnight (`#0b2236`) and night (`#122a40`) provide real tonal layering, while navy/dark-navy brand fields add deeper anchors. That is better than uniform black. Yet service cards/sections repeatedly use night plus visible dark-navy borders plus large shadows, producing boxed template repetition. Slate form fills introduce a second cool-dark system. The result avoids gaming/neon territory overall, but cyan repetition and cardification retain a SaaS tone.

Typography contrast is generally strong: slate 100–300 on the dark foundations is readable. Slate 400 is appropriate for metadata; slate 500 on dark form fields warrants per-instance verification.

## Light-mode assessment

**ISSUE — GENERIC SaaS / somewhat clinical.** White, gray-50, and slate-50 alternate cleanly, but the near-identical light section colours do not create a deliberate material story. Cards rely on shadows for separation. Navy headings are credible and cyan is less visually overwhelming than on dark fields, but full cyan buttons, icons, badges, and border treatments still repeat. Light/dark theme coherence is **ACCEPTABLE**: accent intent and typography priority match, while the neutral and border architectures differ more than necessary.

## Surface hierarchy

**ISSUE; composition: CARD-HEAVY.** Four service templates repeat white/night cards, `shadow-lg`/`shadow-2xl`, rounded containers, cyan icon panels, and sometimes cyan borders/rings. Some tonal distinction is intentional, especially midnight versus night, but equivalent cards vary between borderless shadow elevation and dark bordered elevation. Multiple effects stack around pricing and selected summary cards.

**Neutral palette quality: TOO COOL.** The active navy ramp is useful, but Slate, Gray, white, and custom navy overlap. Without cyan, the neutral palette can remain readable but resembles “navy + random slate” more than a distinctive rich material system.

## Typography hierarchy

**ISSUE.** Primary and secondary copy generally use sensible navy/slate contrast. However, equivalent body roles alternate among `neutral-gray`, slate-500/600, gray-300, and dark slate-300/400. Cyan frequently substitutes for typographic emphasis in service headings/KPIs rather than reserving emphasis for conversion/data exceptions. The homepage editorial components are more disciplined than the service templates.

## CTA hierarchy

**ISSUE; PARTIALLY CLEAR.** Primary cyan-fill, secondary cyan-outline, and quiet text-link patterns exist, but they are not exclusive roles. “Book a Strategy Call” is **VISIBLE BUT COMPETED WITH** because package actions and section CTAs receive the same full treatment, while outlined CTAs invert to a solid cyan hover. Tertiary links are more restrained in the homepage hero/footer.

## Border system

**ISSUE.** There is an understandable light/dark ramp—slate 200/300/400 and slate 700/800—plus inverse white-alpha borders. In practice it expands to gray 100/200/300/600, white at five alphas, cyan at several alphas, custom dark-navy, and the unresolved `bdigital-cyan-dark`. Ordinary cards sometimes use cyan rings/borders to indicate “popular,” but cyan is also decorative. Alpha differences are more numerous than their semantic levels.

## Gradient usage

**ISSUE, not excessive globally.** No purple, rainbow, radial orb, or neon AI gradient appears. Dark navy gradients are tonally compatible and functional in heroes/CTAs. Their identical repetition across four service templates makes the design feel templated. The inquiry summary's cyan/navy wash stacks accent background and accent border where selection could be communicated more economically.

## Glow usage

**ISSUE, localised.** There are no large hero or card glow orbs. The mobile quick action uses a cyan coloured shadow and cyan fill, causing a disproportionately neon floating accent. Black card shadows at 40% and repeated `shadow-2xl` are depth rather than glow but can feel heavy. Overall glow risk is low; elevation consistency needs refinement.

## Icon usage

**ISSUE.** Homepage editorial icons are more restrained, but each service feature grid uses cyan icon glyphs in cyan-tinted boxes and turns the entire tile cyan on hover. Checkmarks, process markers, and form summary icons repeat the accent. Icons often become decorative emphasis rather than uniquely informative markers.

## Semantic colour usage

**PASS with minor consolidation needed.** Red remains tied to error/validation; green/emerald remains tied to success. Neither is broadly decorative. There is no authored warning state and no dedicated information token. The two success ramps are unnecessary duplication but semantically correct. Cyan acts as brand, link/interaction, focus, and de facto information colour, so those meanings are not separable.

## Charts/data visualisation

No rendered business dashboard or KPI chart configuration was found. `src/components/ui/chart.tsx` is a generic Recharts wrapper; the unimported globals define a five-series orange/teal/blue/amber palette in light mode and blue/green/amber/purple/red in dark mode. If activated unchanged, that rainbow palette would carry generic dashboard risk. A future chart decision should start neutral, reserve cyan for selected/important series, retain positive/negative semantics, and add series hues only where differentiation requires them.

## Accessibility

Contrast ratios below use sRGB WCAG calculations for explicit active colours; alpha-dependent results use the stated solid backdrop.

| Combination | Approx. ratio | Result | Notes |
|---|---:|---|---|
| navy text `#0a1f3e` on cyan `#00d4ff` | 8.7:1 | PASS | Strong CTA text contrast |
| white on navy `#0a1f3e` | 16.5:1 | PASS | Hero/footer primary text |
| gray-300 `#d1d5db` on navy | 11.1:1 | PASS | Service hero description |
| slate-300 `#cbd5e1` on midnight `#0b2236` | 10.1:1 | PASS | Dark body copy |
| slate-400 `#94a3b8` on midnight | 6.0:1 | PASS | Small muted metadata |
| slate-500 `#64748b` on midnight | 3.5:1 | FAIL for normal/small text | Dark placeholder/muted use requires correction |
| slate-600 `#475569` on white | 7.6:1 | PASS | Light body copy |
| slate-500 `#64748b` on white | 4.8:1 | PASS | Just above normal-text AA |
| neutral gray `#6b7280` on white | 4.8:1 | PASS | Just above normal-text AA |
| cyan `#00d4ff` on white | 1.7:1 | FAIL | Cyan text/borders cannot carry information on white without another cue |
| cyan-dark intent `#007a99` on white | 4.9:1 | PASS | Value exists only in inactive CSS, so active utility resolution is uncertain |
| red-600 `#dc2626` on white | 4.8:1 | PASS | Error text |
| emerald-600 `#059669` on white | 3.8:1 | FAIL for normal text; PASS for large/non-text | Used mainly as icon; verify any text |

**Accessibility: ISSUES FOUND.** The critical measurable concern is slate-500 on dark backgrounds for small placeholders/metadata. Cyan-on-white text/border states are also non-text/normal-text risks, especially where colour alone signals selection. Focus rings are consistently cyan in bespoke forms, but generic shadcn controls depend on the unimported semantic ring tokens; this is a broken-source-of-truth risk requiring runtime validation.

## Form colour quality

Forms combine white/midnight page foundations, white/night cards, gray-300/slate-700 borders, cyan focus, slate-500 placeholders, red error, and green success. Meaning is clear, but bespoke contact, consultation, and inquiry flows use overlapping rather than canonical roles. The inquiry flow is particularly card-heavy and accent-heavy. Dark placeholder contrast is the first remediation priority; clarity must remain more important than visual restraint.

## Token consistency

**HIGHLY FRAGMENTED.** Active named tokens live in `tailwind.config.js`; an extensive semantic token sheet exists but is unimported; components select raw Tailwind palettes; `bdigital-cyan-dark` is referenced despite not being configured; the two cyan-light definitions differ; and shadcn components expect semantic colours from the inactive sheet.

### Consolidation opportunities (do not implement yet)

| Future semantic role | Existing values/forms to review for consolidation |
|---|---|
| Page background (light/dark) | white, midnight, inactive `--background` |
| Quiet section background | slate-50, gray-50, night |
| Surface / elevated surface | white, night, slate-900/60, inactive card/popover |
| Deep brand surface | navy, dark-navy, midnight |
| Text primary | navy, white, slate-100/200, inactive foreground |
| Text secondary/muted | neutral-gray, slate-500/600, gray-300/400, dark slate-300/400/500 |
| Border subtle/default/strong | gray 100–300, slate 200–400 and 700–800, white alpha ramp |
| Brand / hover / subtle / border | cyan, cyan-light, intended cyan-dark, cyan alpha forms |
| Focus | bespoke cyan focus plus generic ring |
| Overlay | black/20, black/50, dormant white/80 glass |
| Success/error/warning/info | green+emerald ramps, red ramp, absent warning/info roles |

## Generic SaaS risk

**HIGH RISK.** Positive exceptions are the absence of purple gradients, rainbow icons, radial orbs, and widespread glass. Risk comes from electric cyan on navy, repeated gradient service heroes, identical card grids, cyan feature icons, popular-plan rings/badges, full-colour hover inversions, and strong shadows. These are individually conventional; repetition makes the templates feel interchangeable with SaaS/AI agency themes.

## Luxury consultancy suitability

**GOOD WITH REFINEMENT.** Navy fields, restrained homepage editorial sections, high text contrast, and calm footer can credibly support performance marketing, lead generation, analytics, tracking, CRM, and strategy for premium real estate, hospitality, professional services, and B2B buyers. The detailed service pages currently overstate “technology product” patterns and understate consultancy restraint. It could sit alongside premium client brands without copying them after accent proportion, neutral discipline, surfaces, and CTA priority are refined; today it is credible but not consistently differentiated.

### Luxury strategy scorecard

| Principle | Result | Explanation |
|---|---|---|
| Restraint | MAJOR ISSUE | Cyan is distributed across content, icons, borders and actions. |
| Tonal depth | MINOR ISSUE | Four navies provide layering, but card/shadow stacking reduces subtlety. |
| Consistency | MAJOR ISSUE | Active, inactive, custom, Slate and Gray systems overlap. |
| Focus | MINOR ISSUE | Cyan is clearly the accent, but it carries too many meanings. |
| Material quality | MAJOR ISSUE | Repeated border + radius + shadow + tint combinations feel component-library driven. |
| Typography support | MINOR ISSUE | Base contrast is strong; cyan sometimes replaces typographic emphasis. |
| Commercial seriousness | MINOR ISSUE | Broadly credible, but service/package styling is product-template-like. |
| Differentiation | MAJOR ISSUE | Common navy/electric-cyan proportions and patterns are not yet distinctively DIAL. |

The Porto-inspired principle is met only partially: DIAL is clear and confident, but repeated effects make it look more like peers. No Porto colours should be copied; distinction should come from proportion, hierarchy, restraint, and a coherent DIAL token architecture.

## Highest-priority issues

| Severity | Area | Current issue | Why it weakens luxury positioning | Recommended direction |
|---|---|---|---|---|
| CRITICAL | Accessibility | Slate-500 on midnight is ~3.5:1 for small text/placeholders | Low readability is not premium | Approve a readable muted-text role per theme and verify every small-text use. |
| CRITICAL | Theme behaviour | shadcn semantic tokens are in an unimported stylesheet; `bdigital-cyan-dark` is referenced but not configured | States may silently fall back or fail, breaking consistency | Choose and validate one runtime source of truth before palette work. |
| HIGH | Accent | Cyan decorates icons, headings, KPIs, borders, badges and most action levels | Saturation ceases to communicate priority | Reserve strongest accent for conversion, state, focus and important data. |
| HIGH | CTA hierarchy | Strategy-call actions share treatment with packages and section buttons | High-value conversion is not uniquely prioritised | Establish exclusive primary/secondary/tertiary colour roles. |
| HIGH | Architecture | Tailwind tokens, raw utilities, inactive CSS variables and assets conflict | The system cannot be governed reliably | Map approved semantic roles onto the existing build architecture. |
| HIGH | Brand identity | Runtime cyan differs from approved reference; legacy logo is bright green | Multiple brand signals reduce confidence and recognition | Resolve brand asset/token ownership in the approved implementation phase. |
| MEDIUM | Neutral palette | Slate, Gray and four navies overlap across equivalent roles | Feels assembled from defaults rather than materially authored | Retain meaningful tonal depth while consolidating duplicate roles. |
| MEDIUM | Service templates | Gradient + cards + cyan icons + shadows repeat on four pages | Creates generic SaaS rhythm and excessive cardification | Reduce simultaneous effects by role after palette approval. |
| MEDIUM | Borders | Gray, Slate, white-alpha and cyan border ladders overlap | Too many visible edges make surfaces feel boxed | Approve subtle/default/strong/interactive hierarchy. |
| MEDIUM | Assets/charts | Social assets and dormant chart palette introduce unrelated hues | Brand-facing moments become inconsistent/rainbow-ready | Treat assets and charts as explicit semantic sub-systems. |

## Recommended direction

1. Approve roles and colour proportions before approving replacement values.
2. Select the actual runtime token architecture and reconcile the inactive semantic sheet with Tailwind.
3. Preserve intentional navy tonal depth; consolidate only neutrals that perform equivalent work.
4. Reserve cyan for primary conversion, selected/active/focus states, and genuinely important data.
5. Separate primary, secondary, tertiary, and text-link CTA colour behaviours.
6. Make service icons predominantly neutral with selective accent treatment in the later implementation.
7. Define a minimal border alpha ladder and a quiet elevation ladder; avoid stacking both with accent tint unnecessarily.
8. Preserve red/green semantic recognition and create warning/info roles only when product states require them.
9. Test light and dark themes visually and measure contrast at 375, 768, and 1440px before implementation approval.
10. Audit the green logo and locale social art as brand assets, not as arbitrary component recolouring.

## Final status

| Required result | Finding |
|---|---|
| Overall colour-system status | PARTIALLY ALIGNED — SIGNIFICANT REFINEMENT REQUIRED |
| Primary accent | OVERUSED |
| Dark palette | ISSUE |
| Light palette | ISSUE |
| Neutral palette quality | TOO COOL |
| Surface hierarchy | ISSUE |
| CTA hierarchy | ISSUE |
| Typography colours | ISSUE |
| Borders | ISSUE |
| Gradients | ISSUE |
| Glows | ISSUE |
| Icon colours | ISSUE |
| Semantic colours | PASS |
| Accessibility | ISSUES FOUND |
| Token architecture | HIGHLY FRAGMENTED |
| Accent independence | WEAK |
| Generic SaaS risk | HIGH |
| Brand distinctiveness | GENERIC |
| Luxury consultancy suitability | GOOD WITH REFINEMENT |
| Visual rhythm | TOO UNIFORM |
| Primary CTA dominance | VISIBLE BUT COMPETED WITH |
| Unique colours found | 79 base definitions (opacity grouped; used Tailwind defaults resolved) |
| Hard-coded colours found | 44 production-facing base/utility choices (opacity grouped) |
| Gradients found | 13 instances / 7 definitions |
| Glows / coloured shadows found | 4 colour families/definitions |
| Production files changed | NONE |
| Runtime visual QA | NOT COMPLETED |

### Source-of-truth colour files

- `tailwind.config.js` — active DIAL named palette.
- `src/index.css` — active body/theme utility composition and focus class.
- `src/components/**/*.tsx` — active component-level colour and theme overrides.
- `src/styles/globals.css` — extensive but inactive semantic/theme tokens.
- `public/*.svg` and `src/assets/react.svg` — hard-coded asset palettes.

Review and approve the colour audit before creating the final DIAL luxury colour system and remediation implementation.
