# DIAL Final Colour System

## Brand philosophy

DIAL uses deep navy, refined technical neutrals, and scarce cyan. Hierarchy is established by typography, spacing, composition, tonal depth, and contrast before colour. Cyan signals conversion, interaction, selection, focus, or exceptional data; it is not routine decoration.

## Light mode

| Role | Token | Value | Usage |
|---|---|---:|---|
| Background | `background` | `#F8F8F7` | Quiet page foundation |
| Surface | `surface` | `#FFFFFF` | Primary content and controls |
| Subtle surface | `surface-subtle` | `#F3F4F4` | Selective section/card separation |
| Elevated surface | `surface-elevated` | `#FFFFFF` | Menus and genuinely elevated content |
| Primary text | `text-primary` | `#0A1F3E` | Headings, labels, body emphasis |
| Secondary text | `text-secondary` | `#475569` | Body copy |
| Muted text | `text-muted` | `#5F6F83` | Metadata and placeholders |

## Dark mode

| Role | Token | Value | Usage |
|---|---|---:|---|
| Background | `background` | `#0B2236` | Dark page foundation |
| Surface | `surface` | `#122A40` | Cards and controls |
| Subtle surface | `surface-subtle` | `#0F263B` | Tonal separation |
| Elevated surface | `surface-elevated` | `#163149` | Menus and overlays |
| Brand surface | `brand-surface` | `#0A1F3E` | Hero/footer/brand moments |
| Primary text | `text-primary` | `#F8FAFC` | Primary copy |
| Secondary text | `text-secondary` | `#CBD5E1` | Body copy |
| Muted text | `text-muted` | `#94A3B8` | Metadata and placeholders |

## Accent system

| Role | Token | Value | Usage |
|---|---|---:|---|
| Accent | `accent` | `#06B6D4` | Primary conversion, selected state, focus |
| Accent hover | `accent-hover` | light `#0891B2`; dark `#22D3EE` | High-contrast interaction |
| Accent strong | `accent-strong` | light `#0E7490`; dark `#22D3EE` | Accessible accent text |
| Accent subtle | `accent-subtle` | light `#ECFEFF`; dark `#0D3748` | Selected/brand detail surface |
| Accent border | `accent-border` | light `#67E8F9`; dark `#0E7490` | Focused/selected edges only |
| Focus | `focus` | `#06B6D4` | Keyboard focus ring |

## Typography

Typography is neutral by default. `text-primary`, `text-secondary`, and `text-muted` are theme-aware. `text-inverse` is reserved for fixed deep brand fields. Accent text uses `accent-strong`, never base cyan for small text on white.

## Surfaces

Use `background` for the page, `surface` for primary content, `surface-subtle` for quiet separation, and `surface-elevated` only when elevation is meaningful. `brand-surface` is reserved for deep brand moments.

## Borders

`border-subtle`, `border-default`, and `border-strong` form the structural ladder. `accent-border` means focus or selection, never ordinary card structure. Dark inverse fields consolidate around these roles rather than arbitrary white alpha increments.

## CTA hierarchy

1. **Primary:** filled `accent`, navy text; reserved chiefly for Book a Strategy Call and appropriate final submit actions.
2. **Secondary:** neutral outline/surface with restrained emphasis on hover.
3. **Tertiary:** low-emphasis neutral control.
4. **Text link:** typography-led; light-surface branded links use `accent-strong`.

Package cards use restrained neutral actions and quiet popular labels so they do not compete with conversion CTAs.

## Semantic colours

| Role | Light | Dark | Usage |
|---|---:|---:|---|
| Success | `#15803D` | `#6EE7B7` | Confirmation and valid state |
| Error | `#DC2626` | `#F87171` | Validation and destructive state |
| Overlay | `#020617` with contextual alpha | same | Modal/menu backdrop |

## Elevation

- **Low:** `shadow-sm`, ordinary raised information.
- **Medium:** `shadow-md`, floating action/menu.
- **Overlay:** `shadow-xl`/`shadow-2xl`, modal or major floating layer only.

Coloured glows are prohibited. Cards should not stack a strong border and large shadow.

## Gradients

Deep navy gradients remain available for important hero depth. Repeated service content and cards remain tonal. Do not add neon, rainbow, purple, magenta, or decorative radial gradients.

## Rules

### Use accent for

- Book a Strategy Call and appropriate primary submit actions.
- Keyboard focus, active/selected controls, and important interactive state.
- Exceptional KPI emphasis and a small amount of brand detail.

### Do not use accent for

- Every icon, heading fragment, checkmark, number, connector, border, badge, package action, or ordinary hover.
- Small body text on white.
- Success, warning, or error meaning.

## Accessibility

Ratios were calculated programmatically using WCAG sRGB relative luminance. Normal text meets AA:

| Combination | Ratio |
|---|---:|
| Light primary / background | 15.46:1 |
| Light secondary / background | 7.13:1 |
| Light muted / background | 4.83:1 |
| Accent strong / white surface | 5.36:1 |
| Navy button text / accent | 6.77:1 |
| Light placeholder / white surface | 5.14:1 |
| Dark primary / background | 15.48:1 |
| Dark secondary / background | 10.91:1 |
| Dark muted / background | 6.32:1 |
| Accent / dark background | 6.67:1 |
| Dark placeholder / elevated input | 5.22:1 |
| Error / light surface | 4.83:1 |
| Success / light surface | 5.02:1 |
| Error / dark surface | 5.31:1 |
| Success / dark surface | 9.63:1 |

## Transitional aliases

`bdigital-navy`, `bdigital-dark-navy`, `bdigital-midnight`, and `bdigital-night` remain aliases for fixed brand fields while component migration continues. `bdigital-cyan`, `bdigital-cyan-light`, and the newly resolved `bdigital-cyan-dark` map to `#06B6D4`, `#22D3EE`, and `#0E7490`. New production styling should use semantic roles.
