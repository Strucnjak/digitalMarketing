# Analytics, Tracking & CRM — UX/UI Report

## Overall UX

The page presents measurement as a commercial consultancy service rather than a software product. Its sequence moves from outcome-led positioning through capabilities, the connected lead journey, business outcomes, diagnostic gaps, CRM context, attribution, reporting, implementation and a focused consultation CTA.

## Visual consistency

The implementation uses DIAL's existing `site-container`, `section-shell`, typography, focus ring, semantic surfaces, borders and navy foundations. Editorial grids and dividers provide hierarchy without introducing a separate dashboard visual language.

## Hero

The hero combines the approved outcome-led copy and dominant Strategy Call CTA with a compact conceptual journey. Copy remains first in source and mobile order. The visual uses neutral icons, thin dividers and a single qualified-lead accent.

## Information architecture

The page follows problem → capability → connected system → business value → operational diagnosis → CRM/attribution/reporting → process → audience → CTA. Quiet editorial sections separate the stronger navy system moments.

## Capabilities

Seven capabilities use a responsive one-, two- and three-column modular grid. Items are separated by semantic borders rather than oversized cards or elevation. Existing Lucide icons remain neutral.

## Lead-journey visual

The primary seven-step journey is numbered and labelled, remains legible without colour, changes from a seven-column desktop sequence to two columns on tablet and a vertical sequence on mobile, and highlights only Optimisation. A condensed six-node version reinforces the same story in the hero.

## CRM section

Editorial copy is paired with a generic DIAL information panel. The panel uses approved translated CRM field labels, contains no client records, fake campaign claims or copied CRM interface, and applies accent only to qualification.

## Attribution section

A restrained branching/source stack converges on Visit and Conversion. It deliberately avoids percentages, a perfect attribution claim, complex Sankey treatment or pseudo-scientific data.

## Reporting section

Reporting is represented as a quiet information panel using approved metric labels only. No invented values or performance claims are displayed; one lead-quality metric receives restrained emphasis.

## Process

Audit, Define, Implement and Validate & Improve reuse numbered editorial rows and dividers. Meaning and order do not depend on cyan circles or decorative motion.

## CTA hierarchy

The filled canonical cyan button is reserved for the primary Strategy Call action in the hero and final CTA. Secondary actions use a text/border treatment.

## Colour restraint

Canonical `#06B6D4` is consumed through the existing semantic `accent` token. Most hierarchy comes from typography, spacing, neutral surfaces and borders. Cyan is limited to the primary CTA and meaningful status highlights.

## Light mode

Refined off-white and neutral semantic surfaces avoid a generic white/grey SaaS presentation. Small body copy uses the stronger semantic text roles rather than cyan.

## Dark mode

Deep navy foundations, layered semantic surfaces, pale typography and low-contrast borders provide depth without pure black, neon outlines or glow.

## Mobile

At 375px, hero copy and CTAs precede the visual; capability items stack; the main journey becomes vertical; information panels remain fluid with no fixed widths or horizontal scrolling; long translated labels wrap naturally.

## Tablet

At 768px, capabilities and outcomes use two columns, the lead journey uses two columns, and editorial sections remain stacked rather than forcing desktop density.

## Desktop

At 1024px and 1440px, the existing maximum-width container, 12-column editorial compositions and controlled copy widths preserve generous whitespace.

## EN

English approved master copy is used without changes. Hero, diagram, CRM, reporting, process and CTA layouts allow natural wrapping.

## ME

Existing approved Montenegrin localisation keys are reused. No fixed-height text containers are used, preserving long service, CTA, process and flow labels.

## FR

Existing approved French localisation keys are reused. Fluid grid tracks, flexible CTA wrapping and content-driven panel heights accommodate expansion.

## Accessibility

Semantic headings, lists and description lists communicate structure; diagrams include labels and numbers so colour is not required; decorative icons are hidden; the hero diagram has an accessible label; existing focus-ring treatment is reused; text and borders use the approved light/dark semantic roles.

## Motion

No looping animation, particles, pulse, glow or heavy animation dependency was introduced. The page remains fully understandable without motion and therefore presents no reduced-motion dependency.

## Performance

The implementation uses React, CSS grid and the existing Lucide library. It adds no chart library, video, canvas, WebGL, external image or new dependency.

## Components reused

Existing navigation and route shell, footer integration, localisation context, active-locale routing, semantic container/section classes, typography utilities, focus treatment, Lucide icon system and CTA conventions are reused.

## New components

`HeroJourney` is a small local presentational component for the conceptual campaign-to-qualified-lead sequence. CRM, attribution and reporting visuals are deliberately local compositions rather than new global product primitives.

## Files changed

- `src/components/services/AnalyticsTrackingCrmPage.tsx`
- `docs/analytics-tracking-crm-ux-ui-report.md`

## Remaining issues

A final human visual comparison on physical devices is recommended before multilingual launch approval. Automated production compilation and static generation verify all locale routes, but this environment did not provide a preinstalled browser executable for screenshot capture.
