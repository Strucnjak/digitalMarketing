# DIAL Colour Palette

> This map records the current implementation. It is not a replacement palette. “Runtime” means reachable through the imported Tailwind/index stylesheet path; the semantic variables in `src/styles/globals.css` are marked inactive.

## Core backgrounds

| Token | Value | Usage |
|---|---|---|
| `bg-white` | `#ffffff` | Default light pages and sections |
| `dark:bg-bdigital-midnight` | `#0b2236` | Default dark pages and quiet sections |
| `bg-bdigital-navy` | `#0a1f3e` | Hero/About brand fields |
| `bg-bdigital-dark-navy` | `#07172a` | Hero visual/footer/deep area |
| `bg-slate-50`, `bg-gray-50` | `#f8fafc`, `#f9fafb` | Alternating light sections (near-duplicates) |
| `--background` (inactive) | `#fff` / `#0f172a` | Intended semantic body foundation |

## Surfaces

| Token | Value | Usage |
|---|---|---|
| `dark:bg-bdigital-night` | `#122a40` | Dark service cards and alternate sections |
| `bg-white` | `#fff` | Light cards, navigation, forms |
| `dark:bg-slate-900[/60]` | `#0f172a` | Form controls/menu hover |
| `bg-white/95`, `dark:bg-bdigital-midnight/95` | white/midnight at 95% | Mobile floating menu glass surface |
| `--card`, `--popover`, `--muted` (inactive) | white/light gray; `#111827/#1f2937` dark | Intended semantic surfaces |

## Typography

| Token | Value | Usage |
|---|---|---|
| `text-bdigital-navy` | `#0a1f3e` | Light primary headings, labels and accent-on text |
| `text-white`, `text-slate-100/200` | `#fff`, `#f1f5f9`, `#e2e8f0` | Inverse/dark primary text |
| `text-slate-600`, `text-neutral-gray` | `#475569`, `#6b7280` | Light body/secondary copy |
| `text-slate-500` | `#64748b` | Light muted labels/metadata/placeholders |
| `dark:text-slate-300/400/500` | `#cbd5e1`, `#94a3b8`, `#64748b` | Dark secondary, muted, disabled-like text |
| `text-gray-300/400` | `#d1d5db`, `#9ca3af` | Service hero description/stats |

## Accent

| Token | Value | Usage |
|---|---|---|
| `bdigital-cyan` | `#00d4ff` | Primary CTAs, badges, icon blocks, highlighted words/KPIs, borders, focus |
| `bdigital-cyan-light` | `#33eaff` | CTA hover |
| `bdigital-cyan/{5,10,20,30,40,90}` | same cyan at alpha | Cards, icons, connectors, borders, floating CTA |
| `bdigital-cyan-dark` | _undefined in active Tailwind config_ | Used by text, borders and logo blocks but absent from `tailwind.config.js`; a similarly named inactive CSS variable is `#007a99` |
| approved reference (absent) | `#06b6d4` | Approved future direction; no implementation in this pass |

## Borders

| Token | Value | Usage |
|---|---|---|
| `border-slate-200/300/400` | `#e2e8f0/#cbd5e1/#94a3b8` | Light subtle/default/strong separators |
| `dark:border-slate-700/800` | `#334155/#1e293b` | Dark default/strong separators |
| `border-white/{10,15,20,25,40}` | white alpha | Brand-field separators, increasing strength |
| `border-gray-100/200/300/600` | gray ramp | Forms, mobile, service stats |
| `border-bdigital-cyan[/20,/40]` | cyan | Hero badges, popular cards, selection |
| `border-bdigital-cyan-dark` | unresolved active custom class | Secondary CTA/form selection border intent |

## Semantic colours

| Token | Value | Usage |
|---|---|---|
| Success | green `#16a34a`, emerald `#059669`; pale/alpha backgrounds | Confirmation icons and success panels |
| Error | red `#ef4444/#dc2626`; pale/dark variants | Validation borders/messages and tooltip |
| Warning | inactive chart amber only | No authored warning state found |
| Information | no dedicated runtime token | Cyan/blue roles are not semantically separated |

## Gradients

| Definition | Usage |
|---|---|
| navy → dark navy → midnight | Service heroes and loading shell |
| navy → dark navy | Service closing CTAs |
| gray-50 → white (dark: midnight → dark navy) | Inquiry foundation |
| cyan 5% → navy 5% (dark: cyan 10% → navy 20%) | Inquiry selected-package summary |

## Shadows / glows

| Definition | Usage |
|---|---|
| `shadow-bdigital-cyan/25` | Mobile quick action cyan glow |
| `shadow-bdigital-navy/25` | Mobile quick action default depth |
| `dark:shadow-black/40` | Four service hero visual cards |
| standard `shadow-xs` through `shadow-2xl` | Controls, menus, cards, forms; broad and inconsistently elevated |
| HSL token one-pixel shadow | Dormant shadcn sidebar outline |

## Hard-coded colours

| Value | File | Component | Recommendation |
|---|---|---|---|
| Slate and gray utility ramps | `src/components/**/*.tsx` | Nearly all page components | Consolidate by semantic text/surface/border role after approval. |
| White/black alpha utilities | hero, About, Footer, mobile, overlays | Borders/glass/overlays | Tokenise a small intentional alpha hierarchy. |
| Red/green/emerald utilities | form and success components | Semantic feedback | Preserve meaning; unify duplicate ramps. |
| `#ccc`, `#fff` | `src/components/ui/chart.tsx` | Recharts selectors | Justified integration selectors. |
| `#62ff88` | `public/logo.svg` | Legacy logo | Brand conflict; resolve at asset/identity level later. |
| sky/blue/slate set | `public/social-share-en.svg` | English social art | Audit against eventual social brand template. |
| orange/red set | `public/social-share-me.svg` | Montenegrin social art | Audit against eventual social brand template. |
| `#00D8FF` | `src/assets/react.svg` | Scaffold asset | Confirm unused before separate cleanup. |
| 40+ token literals | `src/styles/globals.css` | Inactive semantic theme | Select one runtime architecture before consolidation. |
