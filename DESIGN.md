---
name: "YaoHeng Heavy Commercial Truck Showroom"
description: "A bright industrial showroom system for credible commercial truck sales and fleet procurement."
colors:
  engineering-orange: "#e86f1d"
  engineering-orange-hover: "#f17a24"
  paper-white: "#fbfaf7"
  warm-paper: "#f7f4ee"
  cool-panel: "#f3f5f6"
  steel-100: "#eef2f4"
  steel-300: "#aeb7bd"
  steel-600: "#83909a"
  steel-700: "#667681"
  steel-800: "#4a5a66"
  steel-850: "#34424d"
  steel-900: "#1f2933"
  steel-950: "#111827"
  slate-ink: "#17202a"
  muted-slate: "#64748b"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Aptos Display, DIN Condensed, Bahnschrift, Arial Narrow, sans-serif"
    fontSize: "4.15rem to 4.5rem desktop hero, 3.35rem mobile hero"
    fontWeight: 900
    lineHeight: 0.94
    letterSpacing: "0"
  headline:
    fontFamily: "Aptos Display, DIN Condensed, Bahnschrift, Arial Narrow, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 900
    lineHeight: 1.1
    letterSpacing: "0"
  title:
    fontFamily: "Aptos Display, DIN Condensed, Bahnschrift, Arial Narrow, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0"
  body:
    fontFamily: "Aptos, Segoe UI, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0"
  label:
    fontFamily: "Aptos, Segoe UI, Noto Sans SC, Microsoft YaHei, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "0.12em"
rounded:
  sm: "4px"
  md: "6px"
  lg: "8px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  section-y: "80px"
components:
  button-primary:
    backgroundColor: "{colors.engineering-orange}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.engineering-orange-hover}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.white}"
    textColor: "{colors.steel-950}"
    rounded: "{rounded.md}"
    padding: "0 20px"
    height: "44px"
  badge-industrial:
    backgroundColor: "{colors.white}"
    textColor: "{colors.engineering-orange}"
    rounded: "{rounded.md}"
    padding: "4px 12px"
  card-showcase:
    backgroundColor: "{colors.white}"
    textColor: "{colors.steel-950}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: YaoHeng Heavy Commercial Truck Showroom

## 1. Overview

**Creative North Star: "The Calibrated Industrial Showroom"**

This system presents commercial trucks as serious procurement assets inside a bright industrial showroom. The surface is white, warm paper, and pale steel gray, but it stays powerful through scale, perspective, crisp borders, metal-like panels, and disciplined engineering-orange signals.

The brand posture is professional, rugged, and trustworthy. The interface should feel like a controlled sales environment for fleet buyers: clear route-to-quote paths, real model data, compact multilingual access, and 3D vehicle staging that shows mechanical presence without drifting into sports-car luxury.

The system explicitly rejects cyberpunk, purple-blue gradients, glassmorphism, neon effects, cheap marketplace ecommerce, cartoon illustration, generic SaaS feature blocks, cluttered parameter dumps, low-quality stock imagery, and luxury sports-car theatrics.

**Key Characteristics:**

- Bright industrial background layers with paper white, steel gray, fine grid lines, and low-contrast structural marks.
- Engineering orange used sparingly for active states, CTAs, measurement lines, and model emphasis.
- Truck imagery is large, angled, and physically staged with 3D perspective, shadow, and reflective plate surfaces.
- Components use shadcn-like discipline: compact shapes, 8px max radii, visible borders, restrained motion.
- Copy and data stay operational: load, body length, powertrain, delivery, warranty, and quote flow.

## 2. Colors

The palette is a high-key industrial scheme: paper white and steel neutrals carry most surfaces, while engineering orange marks action, active selection, and mechanical emphasis.

### Primary

- **Engineering Orange** (`#e86f1d`): Primary CTA color, active carousel indicators, top rules, model-card highlights, language selector accents, and small operational emphasis. It should remain rare enough to feel like equipment marking, not decoration.
- **Engineering Orange Hover** (`#f17a24`): Hover state for primary buttons only. Do not use it as a second accent family.

### Neutral

- **Paper White** (`#fbfaf7`): Main bright page field and body gradient origin. Use for large clean areas where the truck imagery needs room.
- **Warm Paper** (`#f7f4ee`): HTML background base. Keeps the white industrial system from feeling clinical.
- **Cool Panel** (`#f3f5f6`): Section wash and panel layering color.
- **White** (`#ffffff`): Cards, CTA panels, language menu, and data cells.
- **Steel 100** (`#eef2f4`): Muted panel fill, chips, and metal plate gradients.
- **Steel 300** (`#aeb7bd`): Light borders, dividers, inactive controls.
- **Steel 600 / 700 / 800** (`#83909a`, `#667681`, `#4a5a66`): Secondary text, technical labels, and quieter structural lines.
- **Steel 900 / 950** (`#1f2933`, `#111827`): Brand wordmark, headlines, card titles, and key values.
- **Slate Ink** (`#17202a`): Strong data values in model spec lines.
- **Muted Slate** (`#64748b`): Labels and supporting copy where contrast remains AA-compliant.

### Named Rules

**The Orange Calibration Rule.** Engineering orange should occupy less than roughly 10% of any viewport. It marks action, selection, and mechanical reference lines; it is not a background theme.

**The No Purple Rule.** Do not introduce purple, blue-purple gradients, violet glows, or neon palette mechanics. They conflict with the truck procurement posture.

## 3. Typography

**Display Font:** Aptos Display with DIN Condensed, Bahnschrift, Arial Narrow, sans-serif fallbacks  
**Body Font:** Aptos with Segoe UI, Noto Sans SC, Microsoft YaHei, sans-serif fallbacks  
**Label/Mono Font:** No true monospace; technical labeling uses uppercase sans with letter spacing.

**Character:** The type system is compressed, heavy, and industrial for headings, then calm and readable for procurement copy. It should feel like a commercial equipment specification sheet refined into a showroom interface.

### Hierarchy

- **Display** (900, `3.35rem` to `4.5rem`, `0.94` line-height): Hero headlines and only the most dominant brand claims. Keep letter spacing at `0`; do not make display text decorative.
- **Headline** (900, `2.25rem`, tight line-height): Section titles and bottom CTA titles. Use uppercase when the surrounding section needs mechanical authority.
- **Title** (700-900, `1.25rem` to `1.65rem`, tight line-height): Model names, card titles, feature rows, and data group headers.
- **Body** (400, `1rem`, `1.75` line-height): Sales explanation, model summaries, review copy, and procurement guidance. Keep line length controlled around 65-75 characters where possible.
- **Label** (700-900, `0.68rem` to `0.75rem`, `0.12em-0.2em` tracking, uppercase): Badges, spec labels, language market labels, carousel labels, and industrial metadata.

### Named Rules

**The Spec-Sheet Rule.** Labels can be tightly tracked and uppercase; body copy cannot. Never set long paragraphs in all caps.

**The Compression Rule.** Use condensed display typography for force and hierarchy, not for every text element. Dense headings need generous surrounding whitespace.

## 4. Elevation

Depth is a hybrid of structural shadows, tonal layering, and 3D transforms. Cards and panels sit on low steel-gray shadows; vehicle stages use perspective, plate rotation, drop shadows, and ground glows to create physical presence. Avoid glass blur as an elevation technique.

### Shadow Vocabulary

- **Button Action Shadow** (`0 16px 32px rgba(232,111,29,0.24)`): Primary CTA lift. Use only on orange actions.
- **Card Rest Shadow** (`0 18px 45px rgba(71,85,95,0.09)`): Default shadcn-style card depth.
- **Steel Panel Shadow** (`0 22px 60px rgba(44,52,58,0.1)`): Operational panels and advantage rows.
- **Language Menu Shadow** (`0 28px 80px rgba(44,52,58,0.18)` plus inset white highlight): Floating menu elevation.
- **Hero Stage Shadow** (`0 38px 92px rgba(71,85,95,0.16)` plus inset highlights): Large product-stage plate.
- **Model Showcase Shadow** (`0 24px 70px rgba(71,85,95,0.12)`): Product card surface.
- **Truck Drop Shadow** (`drop-shadow(0 26px 28px rgba(71,85,95,0.26))`): Vehicle image grounding.

### Named Rules

**The Metal-Depth Rule.** Elevation should look like machined surfaces, plates, and showroom floors. Use borders, inset highlights, and directional shadows before adding blur or translucent effects.

## 5. Components

### Buttons

- **Shape:** Compact rounded rectangle, `6px` radius for normal buttons and `8px` maximum on larger surfaces.
- **Primary:** Engineering orange background (`#e86f1d`), white text, `44px` default height, `20px` horizontal padding, subtle orange shadow.
- **Hover / Focus:** Move up by `2px` or less, shift to `#f17a24`, retain visible focus ring through the primary ring token.
- **Outline:** White or white/70 background, slate text, steel border, inset white highlight, orange border on hover.
- **Ghost:** Muted slate text with pale slate hover field. Use sparingly in navigation-like contexts.

### Chips

- **Style:** `4px-6px` radius, one-pixel border, compact padding, uppercase or semibold label.
- **Default:** Orange/10 background with orange text and orange/45 border.
- **Steel:** Slate-100 background, slate-700 text, slate-300 border.
- **Muted:** White/70 background, muted text, slate-300 border.

### Cards / Containers

- **Corner Style:** `8px` radius for cards and panels.
- **Background:** White or white/95 over subtle steel-grid structure. Product cards may include pale linear and repeating-line overlays.
- **Shadow Strategy:** Use card rest shadow for static cards; product cards can use model showcase shadow and orange focus ring when active.
- **Border:** One-pixel slate or steel border is mandatory for framed content.
- **Internal Padding:** `24px` default card padding; compact data cells use `12px`.

### Inputs / Fields

- **Style:** The current homepage has no full form fields; future fields should match the language trigger and data cells: white surface, steel border, `6px-8px` radius, compact height, and clear label hierarchy.
- **Focus:** Use engineering-orange border or ring. Avoid glows wider than the existing focus ring.
- **Error / Disabled:** Use semantic destructive color only for real validation errors. Disabled states should reduce opacity, not change hue family.

### Navigation

- **Header:** Sticky white/88 background with subtle blur, `80px` height, bottom steel border, centered nav links, and compact CTA at right.
- **Brand block:** Orange square mark, uppercase brand text, small tracked showroom descriptor.
- **Language selector:** Single compact trigger, not horizontal tabs. Dropdown uses two-column language options, native names, market codes, active check mark, and a top orange calibration line.
- **Mobile treatment:** Existing implementation keeps a collapsible menu, but the strategic priority is desktop-first showroom clarity.

### Product Stage

The product stage is the signature component. It must use large local truck imagery, 3/4 or side-angled visual orientation, `perspective`, `rotateX`, `rotateY`, `rotateZ`, plate shadows, ground glow, and a white spec card overlay. The truck should feel physically placed in a clean industrial exhibition space, not pasted into a generic carousel.

### Model Showcase Card

Cards for hot models include an orange top line, steel badge, model title, body copy, a 3D mini-stage, two high-priority spec rows, tags, price, and configuration CTA. The vehicle image should overflow within its stage (`~128%` width) and lean forward through transform and drop-shadow.

## 6. Do's and Don'ts

### Do:

- **Do** keep the page bright: paper white, cool panel gray, and white cards should dominate the composition.
- **Do** use engineering orange (`#e86f1d`) for CTA, active state, selection, and measurement-line emphasis.
- **Do** show the truck first with 3D perspective, angled composition, and credible product scale.
- **Do** preserve one-pixel steel borders and low-contrast grid/structure lines for industrial credibility.
- **Do** keep copy operational: load, route, delivery, body build, warranty, financing, and service support.
- **Do** keep language selection compact and multilingual; do not let 10+ languages consume the header.
- **Do** support reduced motion and keep all CTA, carousel, and language controls keyboard-accessible.

### Don't:

- **Don't** use cyberpunk, neon effects, or over-glowing accents.
- **Don't** use purple-blue gradients, violet glow, or a SaaS-style purple palette.
- **Don't** use glassmorphism as the main surface treatment.
- **Don't** make the page feel like cheap marketplace ecommerce, discount retail, or a cluttered listing site.
- **Don't** use generic three-column SaaS feature blocks for the platform advantages.
- **Don't** use cartoon illustration or low-quality stock imagery where truck/product imagery is required.
- **Don't** copy luxury sports-car brand tropes: overly dark drama, lifestyle glamour, or speed-first storytelling.
- **Don't** dump dense parameter lists without hierarchy. Specs must be grouped into readable procurement signals.
