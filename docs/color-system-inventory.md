# DIAL Colour-System Inventory

## Scope and counting method

This is a static, repository-wide audit of `src`, `public`, `index.html`, and `tailwind.config.js`. Opacity modifiers are grouped with their base family (for example, `white/10` and `white/40` are variants of white). The scan found **79 distinct base colour definitions** after resolving used Tailwind defaults and normalising short hex; it also found **73 distinct standard Tailwind colour utility forms** and **57 DIAL/custom utility forms**. The latter figures include state and opacity forms and are therefore not added to the 79-colour total.

Two important qualifications apply:

1. `src/index.css` is the stylesheet imported by both client entry points. `src/styles/globals.css`, `src/App.css`, and `src/styles/mobile-quick-nav.css` are not imported. Their values remain part of the repository inventory, but do not currently control the rendered application.
2. The approved reference accent `#06b6d4` is **not present**. The rendered Tailwind system uses `#00d4ff`; an inactive token sheet also uses `#00d4ff`.

## Design-token inventory

| Value / family | Token or class | Source file | Usage | Semantic role | Theme | Frequency / scope |
|---|---|---|---|---|---|---|
| `#0a1f3e` | `bdigital-navy` | `tailwind.config.js` | Hero/About fields, service gradients, CTA text | Foundation / deep brand navy | Both | High; 6 backgrounds, 10 gradient starts, 127 text uses |
| `#07172a` | `bdigital-dark-navy` | `tailwind.config.js` | Hero media, footer, service-gradient middle/end, dark borders | Deep/elevated surface | Both | High |
| `#0b2236` | `bdigital-midnight` | `tailwind.config.js` | Main dark-mode page/section background | Dark foundation | Dark | High; 23 background forms plus gradients |
| `#122a40` | `bdigital-night` | `tailwind.config.js` | Cards and alternating service sections | Dark elevated surface | Dark | High; 23 uses |
| `#00d4ff` | `bdigital-cyan` | `tailwind.config.js` | Primary/secondary CTAs, badges, icons, headings, steps, borders, focus | Brand accent | Both | Very high; 33 solid backgrounds, 23 text, 10 border forms, plus states |
| `#33eaff` | `bdigital-cyan-light` | `tailwind.config.js` | Strong-button hover | Accent hover | Both | High; 19 hover forms |
| `#6b7280` | `neutral-gray` | `tailwind.config.js` | Body/feature copy | Secondary text | Light | High; 35 uses |
| `white`, `slate-50…950`, `gray-50…600` | Tailwind defaults | `src/**/*.tsx`, `src/index.css` | Light foundations, dark typography/surfaces/borders | Foundation/text/border | Both | Very high; see family table |
| `red-300…600` | Tailwind defaults | forms, `src/App.css` | Validation and tooltip errors | Error | Both | Low/medium |
| `green-100/600`, `emerald-300/600/900` | Tailwind defaults | inquiry/contact success states | Success | Both | Low |
| `black/20`, `black/50`, `black/40` | Tailwind opacity variants | mobile overlays, Radix overlays, service shadows | Overlay/shadow | Both | Medium |
| `white/10`, `/15`, `/20`, `/25`, `/40`, `/95` | Tailwind opacity variants | hero/about borders, navigation and mobile surfaces | Border/glass/text | Both | Medium |

### Inactive semantic token sheet

All rows below occur in `src/styles/globals.css`, which is currently unimported. They describe a shadcn/Radix-style token architecture but must not be mistaken for runtime source of truth.

| Values | Token(s) | Usage / role | Theme |
|---|---|---|---|
| `#ffffff`; `#0f172a` | `--background` | Page background | Light; dark |
| `oklch(0.145 0 0)`; `#f8fafc` | `--foreground` | Primary text | Light; dark |
| `#ffffff`; `#111827` | `--card`, `--input-background` | Card/control surface | Light; dark |
| `oklch(1 0 0)`; `#111827` | `--popover` | Floating surface | Light; dark |
| `#00d4ff` | `--primary`, `--accent`, `--sidebar-primary` | Brand/action | Both |
| `#1e3a5f`; `#0f172a` | `--primary-foreground`, `--accent-foreground` | Accent-on text | Light; dark |
| `oklch(0.95 0.0058 264.53)`; `#1f2937` | `--secondary` | Secondary control/surface | Light; dark |
| `#ececf0`; `#1f2937` | `--muted` | Muted surface | Light; dark |
| `#717182`; `#cbd5e1` | `--muted-foreground` | Muted text | Light; dark |
| `#d4183d`; `oklch(0.396 0.141 25.723)` | `--destructive` | Error/destructive | Light; dark |
| `#ffffff`; `oklch(0.637 0.237 25.331)` | `--destructive-foreground` | Destructive foreground | Light; dark |
| `rgba(0,0,0,.1)`; `#334155` | `--border` | Default border | Light; dark |
| `transparent`; `#1f2937` | `--input` | Input fill | Light; dark |
| `#cbced4`; `#334155` | `--switch-background` | Switch track | Light; dark |
| `oklch(0.708 0 0)`; `#475569` | `--ring` | Focus ring | Light; dark |
| five OKLCH values per theme | `--chart-1…5` | Chart series | Both |
| light neutral OKLCH set; `#0b1220/#1f2937/#334155/#475569` | `--sidebar*` | Sidebar surfaces/states | Both |
| `#1e3a5f`, `#142838`, `#00d4ff`, `#33e0ff`, `#007a99` | `--bdigital-*` | DIAL aliases | Both |
| `#6b7280/#cbd5e1`, `#9ca3af/#94a3b8`, `#2e3644/#e2e8f0` | neutral aliases | Neutral text | Light/dark |

## Resolved utility palette and usage map

| Family / values | Token/classes | Principal source and use | Theme | Scope |
|---|---|---|---|---|
| White `#fff` | `bg-white`, `text-white`, `border-white/{10,15,20,25,40}`, `bg-white/95`, `to-white` | Light pages/cards; inverse hero/footer text; translucent borders/mobile menu | Both | Very high: 27 background and 24 text occurrences |
| Black `#000` | `bg-black/20`, `bg-black/50`, `shadow-black/40` | Mobile/Radix overlays and dark card shadows | Both/dark | 9 forms |
| Slate 50 `#f8fafc` | `bg-slate-50` | Quiet light sections | Light | 3 |
| Slate 100 `#f1f5f9` | `bg/border/text-slate-100` | Portfolio surface, nav separator, dark primary text | Both | 5 |
| Slate 200 `#e2e8f0` | `border/text-slate-200` | Light borders, dark labels | Both | 39 |
| Slate 300 `#cbd5e1` | `border/text-slate-300` | Borders; dark secondary copy; hero inverse copy | Both | 82 |
| Slate 400 `#94a3b8` | `border/text-slate-400` | Muted metadata/eyebrows | Both | 23 |
| Slate 500 `#64748b` | `text-slate-500` | Light muted text/placeholders | Light/dark | 34 |
| Slate 600 `#475569` | `text-slate-600` | Light body copy | Light | 13 |
| Slate 700 `#334155` | `dark:border-slate-700` | Default dark border | Dark | 39 |
| Slate 800 `#1e293b` | `dark:border-slate-800[/70]` | Strong dark separators | Dark | 10 |
| Slate 900 `#0f172a` | `text-slate-900`, `dark:bg/hover:bg-slate-900[/60]` | Body text and form/menu dark surface | Both | 11 |
| Slate 950 `#020617` | `dark:bg-slate-950` | Inactive tooltip surface | Dark | 1 |
| Gray 50 `#f9fafb` | `bg/from-gray-50` | Service/inquiry light sections | Light | 7 |
| Gray 100 `#f3f4f6` | `bg/border-gray-100[/50]` | Fallback/card/mobile separators | Light | 5 |
| Gray 200 `#e5e7eb` | `bg/border-gray-200[/50]` | Disabled progress/mobile border | Light | 3 |
| Gray 300 `#d1d5db` | `border/text-gray-300` | Inputs and inverse service copy | Both | 19 |
| Gray 400 `#9ca3af` | `text-gray-400` | Service stats | Dark field | 3 |
| Gray 500 `#6b7280` | `text-gray-500`, `neutral-gray` | Secondary copy | Light | 36 |
| Gray 600 `#4b5563` | `border-gray-600` | Hero statistic divider | Dark field | 1 |
| Red `#fca5a5/#f87171/#ef4444/#dc2626` | `red-300/400/500/600` | Tooltip and form errors | Both | 13 |
| Green/emerald `#dcfce7/#16a34a/#059669/#6ee7b7/#064e3b@40%` | success utilities | Submitted/success confirmation | Both | 6 |

## CSS colour families

| Family | Distinct base shades | Assessment |
|---|---:|---|
| Black / navy | 14 | **Accidental drift.** Four active DIAL navies create useful depth, but inactive token navies and Tailwind slate 900/950 duplicate similar roles without a single contract. |
| Slate / blue-gray | 9 | **Partly intentional depth.** Text and border ramps are coherent individually, but overlap with gray and custom navy ramps. |
| Neutral gray / white | 16 | **Shade proliferation.** Both Slate and Gray are used for equivalent copy, borders, and sections. |
| Cyan / sky / blue | 8 | **Brand drift.** Active cyan has a hover plus alpha variants; inactive cyan-light differs (`#33e0ff` vs `#33eaff`), social assets add sky/blue, and the approved `#06b6d4` is absent. |
| Green | 6 | Mostly justified success colours, plus the unrelated `#62ff88` legacy logo asset. |
| Red / orange | 12 | Error ramp is justified; orange/red social asset colours are asset-specific but expand brand-facing colour. |
| Purple | 1 active only through inactive dark chart token | No page decoration; acceptable as a dormant multiseries chart colour. |
| Amber/yellow | 3 OKLCH chart values | Dormant chart series only. |

## Gradient inventory

There are **13 authored gradient instances** using **seven distinct colour definitions**. Tailwind opacity/state animations containing the words `from-*`/`to-*` were excluded.

| Definition | Locations | Purpose | Importance | Classification |
|---|---|---|---|---|
| `from-bdigital-navy via-bdigital-dark-navy to-bdigital-midnight` | Four service heroes | Dark hero depth | High | Functional, but repeated/template-like |
| `from-bdigital-navy to-bdigital-dark-navy` | Four service closing CTAs | CTA field | High | Functional; repeated |
| `from-bdigital-navy via-bdigital-dark-navy to-bdigital-midnight` | `src/routes.tsx` loading shell | Route-loading continuity | Low | Functional |
| `from-gray-50 to-white`; dark `midnight → dark-navy` | `ServiceInquiryForm` (two states) | Page foundation | Medium | Subtle atmosphere |
| cyan 5% → navy 5%; dark cyan 10% → navy 20% | `ServiceInquiryForm` summary card | Selected-package emphasis | Medium | Decorative/over-signalled |

No cyan-to-purple, blue-to-purple, radial, or conic gradient is authored in active page code.

## Shadows, glows, and overlays

| Definition | Usage | Colour role | Classification |
|---|---|---|---|
| `shadow-bdigital-cyan/25` | Mobile quick-nav action | Cyan glow | **Redundant / too strong in context** |
| `shadow-bdigital-navy/25` | Mobile quick-nav default | Navy depth | Justified |
| `dark:shadow-black/40` | Four service hero visual cards | Dark elevation | Appropriate, somewhat heavy |
| `shadow-2xl`, `shadow-xl`, `shadow-lg`, `shadow-md`, `shadow-sm/xs` | Service cards, menus, dialogs, inquiry | Neutral Tailwind elevation | Mixed: functional on overlays; heavy/repetitive on service cards |
| `shadow-[0_0_0_1px_hsl(var(--sidebar-border/accent))]` | shadcn sidebar | Token-coloured one-pixel edge | Justified but currently dormant |
| `bg-black/20`, `bg-black/50` | Mobile and Radix modal overlays | Overlay | Functional |
| `rgba(255,255,255,.8)` | Unimported mobile stylesheet | Glass backdrop fallback | Unknown/dormant |

No radial glow or blurred colour orb was found. Count: **4 coloured-shadow/glow definitions** (cyan, navy, black, sidebar HSL family); ordinary neutral elevation classes are catalogued separately.

## Hard-coded colour register

“Hard-coded” here means a literal or named palette utility chosen at the component/asset level rather than an app semantic role. There are **44 unique hard-coded base/utility colour choices** in production-facing components/assets (opacity grouped). Repeated occurrences are consolidated below.

| Value / class family | File / component | Classification | Recommendation for later pass |
|---|---|---|---|
| Slate 50–900 utilities | Homepage, navigation, forms, SEO | SHOULD USE TOKEN | Consolidate equivalent foundation/text/border roles, preserving necessary tonal steps. |
| Gray 50–600 utilities | Service templates, inquiry | POTENTIAL SYSTEM DRIFT | Decide whether each is materially distinct from the Slate role it duplicates. |
| `white` with six alpha variants | Hero, About, Footer, Navigation, mobile | SHOULD USE TOKEN | Define inverse text, glass, and border-alpha roles. |
| `black/20`, `black/50`, `shadow-black/40` | overlays/service cards | JUSTIFIED | Tokenise overlay and dark elevation roles. |
| Red utility ramp | forms and inactive tooltip | JUSTIFIED | Keep semantic; unify error text/border/background roles. |
| Green and emerald utility ramps | Contact, consultation, inquiry | JUSTIFIED | Keep semantic; consolidate duplicate success greens. |
| `#ccc`, `#fff` selector literals | `src/components/ui/chart.tsx` | JUSTIFIED | Third-party Recharts selector hooks; continue mapping output to tokens. |
| `#62ff88` | `public/logo.svg` (912 declarations) | POTENTIAL SYSTEM DRIFT | Legacy green logo is strongly inconsistent with the cyan system; brand decision required before asset work. |
| sky/blue/slate literals | `public/social-share-en.svg` | POTENTIAL SYSTEM DRIFT | Social artwork has a blue identity distinct from the site accent. |
| orange/red literals | `public/social-share-me.svg` | POTENTIAL SYSTEM DRIFT | Locale artwork introduces a separate warm identity. |
| `#00D8FF` | `src/assets/react.svg` | UNKNOWN | Unused scaffold asset; verify, then remove only in a separate cleanup. |
| Full literal token sheet | `src/styles/globals.css` | UNKNOWN | Determine whether to adopt or delete; currently dead code and conflicting with active Tailwind values. |
| `rgba(255,255,255,.8)` | `src/styles/mobile-quick-nav.css` | UNKNOWN | Dormant glass fallback; verify intended import. |

## Source-of-truth files

- **GLOBAL TOKENS / TAILWIND CONFIG (runtime):** `tailwind.config.js` supplies all active DIAL named colours.
- **GLOBAL RUNTIME STYLE:** `src/index.css` establishes light/dark body colours and shared typography/focus classes.
- **THEME OVERRIDES:** component-level `dark:*` utilities; `ThemeContext.tsx` controls the class, but defines no colour.
- **INACTIVE TOKEN ARCHITECTURE:** `src/styles/globals.css` contains the majority of semantic CSS variables but is not imported.
- **COMPONENT OVERRIDES:** `src/components/**/*.tsx`, especially the four near-identical service templates and both form flows.
- **SHADCN/RADIX CONSUMERS:** `src/components/ui/*.tsx` consume semantic class names that currently lack a runtime imported variable sheet.
- **INLINE VALUES:** no React `style={{ color/background… }}` literals were found; component hard-coding is predominantly Tailwind utility selection.
- **SVG / ASSET COLOURS:** `public/logo.svg`, `public/social-share-en.svg`, `public/social-share-me.svg`, and `src/assets/react.svg`.
