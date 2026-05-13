# Culture Closet — Design Tokens (Extracted from Figma SVG)

> Source: Figma file exported frames (layout_1a.svg, All Categories.svg, Products.svg, add-to-cart.svg)
> Canvas width: 1600px
> Content gutter: 145px each side → content width = 1310px

---

## Colors

| Token | Hex | Usage |
|-------|-----|-------|
| `--color-primary` | `#0F4041` | Primary buttons, GET APP button, nav accents, CTA borders |
| `--color-primary-dark` | `#064041` | Icon fills, hover states |
| `--color-accent` | `#D57429` | SELL YOUR ITEM button, Filter button, accent borders |
| `--color-accent-alt` | `#D47428` | Icon/path variants |
| `--color-burgundy` | `#951E45` | Logo script, SHOP NOW buttons, carousel dots, active states |
| `--color-burgundy-alt` | `#951F45` | Path variants |
| `--color-nav-pill` | `#FFE1CA` | WOMEN / MEN / KIDS nav pill backgrounds |
| `--color-category-placeholder` | `#ADA17F` | Category card fallback background |
| `--color-breadcrumb-bg` | `#F1F5F9` | PLP breadcrumb bar background |
| `--color-section-pink` | `#FFF2F0` | How it Works, Customer Stories section backgrounds |
| `--color-footer-bg` | `#F7F7F7` | Footer background |
| `--color-border` | `#E5E7EB` | Card borders, input strokes, header separators |
| `--color-border-light` | `#F1F5F9` | Inner card borders, image area strokes |
| `--color-separator` | `#D5D5D5` | Footer column separators |
| `--color-text-primary` | `#0F0D1A` | Headings, primary text |
| `--color-text-secondary` | `#403D3D` | Body text, descriptions |
| `--color-text-muted` | `#78716C` | Captions, placeholders (inferred) |
| `--color-white` | `#FFFFFF` | Cards, button text on dark, header bg |
| `--color-red-badge` | `#D22027` | Notification badges |
| `--color-dot-inactive` | `#E1E1E5` | Inactive carousel dots |

---

## Layout

| Token | Value | Usage |
|-------|-------|-------|
| `--container-max` | `1310px` | Content max-width |
| `--container-gutter` | `145px` | Side padding at 1600px |
| `--header-top-height` | `90px` | Top bar height |
| `--header-nav-height` | `60px` | Navigation bar height |
| `--header-total-height` | `150px` | Top + Nav + borders |
| `--border-header` | `1px` | Header bottom border |
| `--border-nav` | `1px` | Nav bottom border |

---

## Header Exact Positions (1600px canvas)

| Element | X | Y | Width | Height | Background | Stroke |
|---------|---|---|-------|--------|------------|--------|
| Logo part 1 | 145 | 30 | 33.86 | 30 | pattern | — |
| Logo part 2 | 289 | 30 | 33.86 | 30 | pattern | — |
| Search bar | 490.5 | 24.5 | 319 | 41 | white | #E5E7EB |
| GET APP btn | 830 | 24 | 120 | 42 | #0F4041 | — |
| Heart icon | 970 | 24 | 42 | 42 | white | — |
| Separator 1 | 1026.75 | 24 | 1 | 42 | #E5E7EB | — |
| Cart icon | 1042.5 | 24 | 42 | 42 | white | — |
| Separator 2 | 1099.25 | 24 | 1 | 42 | #E5E7EB | — |
| Login btn | 1115 | 24 | 90 | 42 | white | — |
| Country select | 1225.5 | 24.5 | 229 | 41 | white | #E5E7EB |
| Header border | 0 | 89 | 1600 | 1 | #E5E7EB | — |
| Nav bar | 0 | 90 | 1600 | 60 | white | — |
| Nav border | 0 | 149 | 1600 | 1 | #E5E7EB | — |
| WOMEN pill | 145 | 102 | 100 | 36 | #FFE1CA | — |
| MEN pill | 255 | 102 | 100 | 36 | #FFE1CA | — |
| KIDS pill | 365 | 102 | 100 | 36 | #FFE1CA | — |

---

## Typography (Inferred from SVG Paths)

| Element | Observed Style |
|---------|---------------|
| Logo "Culture" | Script/cursive, #951E45 |
| Logo "Closet" | Serif, #0F4041 or #0F0D1A |
| Nav links | Uppercase, small, sans-serif |
| Section titles | Serif, with decorative ✦ icons in #D57429 |
| Product title | Sans-serif, medium weight, #0F0D1A |
| Price | Sans-serif, #0F4041 (green) on PLP/PDP |
| Body text | Sans-serif, #403D3D |
| Button text | Uppercase, white on colored bg |

---

## Components

### Buttons

| Variant | Background | Text | Size (example) | Radius |
|---------|-----------|------|----------------|--------|
| Primary (GET APP) | #0F4041 | white | 120×42 | 0 (square-ish) |
| Burgundy (SHOP NOW) | #951E45 | white | 140×40 | 0 |
| Orange (SELL/FILTER) | #D57429 | white | 180×40 / 80×30 | 0 |
| Green CTA | #0F4041 | white | 150×36 | 0 |
| Icon button | #0F4041 | white | 40×36 | 0 |

### Cards

| Type | Size | Border | Radius |
|------|------|--------|--------|
| Product card | 250×570 | — | 0 |
| Product image area | 250×400 | #F1F5F9 | 0 |
| Category card | 310×450 | — | 0 |
| How it Works card | 640×570 | #D57429 or #0F4041 | 0 |
| CTA card | 639×299 | #E5E7EB | 5.5px |
| Story card | 250×250 | — | 0 |

### Icons

| Icon | Size | Color |
|------|------|-------|
| Heart | 20–24px | #0F0D1A or #D22027 (active) |
| Cart | 20–24px | #0F0D1A |
| Search | 16px | white (on orange) or #0F0D1A |
| Carousel arrow | 44×50 container | #F4F6F5 bg |
| Carousel dot active | 10×10, rx=5 | #951E45 |
| Carousel dot inactive | 10×10, rx=5 | #E1E1E5 |

---

## Sections (Homepage)

| Section | Y Position | Height | Background |
|---------|-----------|--------|------------|
| Hero | 150 | 500 | Image carousel |
| Discover & Rehome | 680 | 500 | white |
| Categories | ~1200 | ~550 | white |
| How it Works | 1768 | 910 | #FFF2F0 |
| Featured Listings | ~2700 | ~900 | white |
| Explore by Category | ~3400 | ~500 | white |
| Explore by Country | ~3800 | ~400 | white |
| Customer Stories | 4010 | 540 | #FFF2F0 |
| CTA | ~4700 | ~400 | white |
| Footer / Newsletter | 5440 | 560 | #F7F7F7 |

---

## Z-Index / Elevation

| Layer | Notes |
|-------|-------|
| Header | sticky, z-50, white bg |
| Hero gradient | opacity 0.4, left-side dark gradient |
| Card hover | shadow-sm to shadow-md transition |
| Carousel arrows | absolute positioned over images |

---

## Responsive Notes

The Figma frames are **desktop-only (1600px)**. Mobile breakpoints are not provided and will need to be designed or inferred.
