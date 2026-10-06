# Narin Kim portfolio design system

Source: [narinkim.com](https://www.narinkim.com/)  
Captured: 2026-09-22  
Scope: visual language, responsive layout, project-card behavior, media treatment, and implementation tokens.

Reference project page: [narinkim.com/fin](https://www.narinkim.com/fin). The project-page guidance below describes the reference site's observed structure and content rhythm, not the current implementation in this repository.

## Design direction

Dark, image-led portfolio for a multidisciplinary designer. The page behaves like a curated studio index: oversized personal navigation sits beside a dense but calm work gallery, while project media supplies most of the color and personality.

The central principle is **structured playfulness**. The shell is restrained and consistent; the work is allowed to be expressive through unusual crops, animated media, vivid backgrounds, and editorial labels.

## Page anatomy

### Desktop shell

- Canvas is a near-black `#121212`.
- A left navigation rail begins 24px from the top and left edges.
- The name and primary links use large, light sans-serif type at 28px with approximately 41px line height.
- Primary links are stacked in this order: `Info`, `Work`, `Email`, `LinkedIn`.
- The project index is a vertical list of five rounded rows below the links. Each row is approximately 328px wide, 64px tall, with 24px horizontal padding and a 12px radius.
- A live clock sits near the lower-left corner on desktop and acts as a small ambient detail rather than a navigation control.
- The main content starts at approximately `x = 368px` in the observed 1057px viewport, leaving a 16px gutter after the 328px rail.

### Featured work

- The first main visual is a large featured carousel, approximately 665 × 467px at the observed desktop width.
- Featured media is edge-aligned to the main content column and uses a large 16px radius.
- Pagination controls are present but visually quiet; the carousel should remain secondary to the artwork.
- Featured project metadata is overlaid or integrated into the media composition using small rounded tags.

### Work gallery

- Below the feature, work is arranged as a two-column grid.
- Desktop cards are approximately 328px wide with a 10px inter-column gap.
- Cards use a dark surface (`#1c1c1c`), 12px internal padding, 8px content spacing, and a 16px outer radius.
- Media keeps project-specific aspect ratios. Do not normalize every project to one crop.
- Each card can contain video, an image, or a mixed composition, followed by a project label and a short description.
- Small category chips sit in the upper-right area of the artwork. Chips use a light neutral background, dark text, compact sans-serif type, and a pill shape.

### Project index rows

Each index row contains:

1. Project name in white, approximately 12px.
2. Discipline or role in muted gray, approximately 12px.

Observed entries:

| Project | Descriptor |
|---|---|
| Fin | UI/UX & AI Design |
| Heewon | Identity & Publication |
| Machinify | User Interface & Experience |
| Oregon Symphony | Brand Identity |
| Sakini | Art Direction |

### Reference project page: Fin

The `/fin` page is an image-led editorial case study inside the same dark portfolio shell. Its layout is deliberately less card-like than the homepage: the project opens with a large title and project metadata, moves through a sequence of large visual assets, then shifts into long-form project context and compact contribution details.

Observed page order:

1. Persistent left navigation rail with `Info`, `Work`, `Email`, and `LinkedIn`.
2. Project title, year, discipline, and a short project thesis near the top of the content column.
3. Large hero artwork followed by a generous sequence of project images and interface views.
4. A `Project Description` section using long editorial paragraphs rather than card-length summaries.
5. A `Contribution` section describing the designer's role across design system, identity, AI-generated storytelling, UI/UX, and web modules.
6. `Credits` and `Fonts` sections presented as compact metadata blocks.
7. Related project navigation and the persistent site footer/navigation treatment.

The page uses repetition and scale to create rhythm: full-width or near-full-width images carry the visual weight, while text sections use smaller labels and wide spacing to slow the reading pace. The image sequence comes before the detailed project description, so the work is encountered visually before it is explained.

Reference content model:

```text
Project title / year
Discipline
Short thesis
Hero image
Image sequence
Project Description
Contribution
Credits
Fonts
Related projects
```

Reference-specific notes:

- Fin presents its identity system as a narrative concept, using a named visual gesture - a 45° diagonal cut - to connect identity, typography, layout, and interface motion.
- The copy alternates between broad project context and concrete design-system decisions.
- The page includes several repeated image groups and gallery controls, so the case study feels like an archive of the work rather than a single hero followed by a short summary.
- The reference page names collaborators, tools, and typefaces instead of leaving those details implicit.
- This structure should guide the portfolio's future case studies, but each project's actual contribution, credits, fonts, and image order must come from supplied project content rather than being inferred.

### Reference case-study structure: Track self-employment receipts

The detailed case-study format is also informed by [Jessica Im's Track self-employment receipts case study](https://imjiwoo.com/tt-receipt-tracker). This reference is useful for the content model rather than the visual styling: it treats the case study as a navigable narrative with evidence between sections.

Observed content rhythm:

- Start with a plain-language project thesis, then show `When`, `Role`, `Launched`, and `Team` as scannable facts.
- Give the reader a visible section index such as `Problem`, `Discovery`, `Design`, and `Future`.
- Establish an outcome early, using a short heading and supporting explanation before moving into process detail.
- Use large images between sections, not as one gallery at the bottom. Each image should support the point immediately before or after it.
- Give every major section a clear heading, a concise thesis, supporting body copy, and optional quote or artifact.
- Use timelines, research findings, design explorations, launch results, and lessons as distinct content types when the project supports them.
- End with a live-state or outcome section, future work, lessons, or related projects.

Implementation guidance for this portfolio:

```text
Project thesis
Facts: year / role / focus / link
Section navigation
Overview or outcome
Lead artifact
Problem / context
Discovery / research
Design / execution
Outcome / future / lessons
Related work
```

The current dark canvas, Graphik typography, left rail, restrained rules, and image treatment remain governed by this document's existing visual tokens. The richer reference structure changes the amount and order of content, not the site's visual language.

## Responsive behavior

### Mobile layout

At an observed 390 × 844 viewport:

- The navigation rail becomes a full-width top section with 24px side gutters.
- The name and primary links keep the same 28px type scale.
- Index rows expand to the available width: approximately 342px wide at 390px viewport width.
- The large featured carousel is hidden from the initial mobile layout.
- Work cards begin below the index at approximately `y = 729px`.
- The gallery becomes a two-column grid with approximately 166px columns, 10px gap, and 24px outer gutters.
- Card heights vary with the source media, producing a masonry-like rhythm rather than a rigid row grid.
- Long project titles and descriptions are not needed in the compact mobile card view; media and labels carry the first impression.

### Breakpoint guidance

The desktop/mobile change is structural rather than merely scaled. Treat the following as separate layout modes:

- **Desktop:** fixed or persistent left rail, featured carousel, two-column work grid.
- **Mobile:** stacked navigation and index, no featured carousel, compact two-column work grid.

Avoid shrinking the desktop feature into a small mobile banner; the observed mobile composition removes it to keep the gallery immediate.

## Tokens

### Color

```css
:root {
  --color-canvas: #121212;
  --color-surface: #1c1c1c;
  --color-surface-alt: #2b2b2b;
  --color-ink: #ffffff;
  --color-ink-soft: rgb(255 255 255 / 85%);
  --color-muted: #989898;
  --color-chip: #f7f7f7;
  --color-chip-ink: #000000;
}
```

The site also defines a light-mode token set in its source, but the observed portfolio renders in the dark scheme. Keep the dark canvas as the default for a faithful recreation.

### Typography

The supplied local typeface is **Graphik**, with Light, Regular, Medium, and Semibold weights. Graphik keeps the layout clean and editorial while giving the large navigation and project labels a polished, neutral voice.

```css
:root {
  --font-sans: "Graphik", Inter, ui-sans-serif, system-ui, sans-serif;
  --type-nav: 28px / 41.47px var(--font-sans);
  --type-index: 12px / 20px var(--font-sans);
  --type-card: 12px / 20px var(--font-sans);
}
```

Use regular weight for the large navigation. The visual character comes from scale, generous line height, and the contrast between the large rail and tiny card metadata—not from heavy weight.

The site loads Graphik locally from `/fonts/Graphik-Light.otf`, `/fonts/Graphik-Regular.otf`, `/fonts/Graphik-Medium.otf`, and `/fonts/Graphik-Semibold.otf` so the deployed portfolio does not depend on a third-party font host.

### Layout and shape

```css
:root {
  --gutter: 24px;
  --desktop-rail: 328px;
  --desktop-content-offset: 368px;
  --grid-gap: 10px;
  --card-padding: 12px;
  --index-padding-x: 24px;
  --index-padding-y: 16px;
  --index-radius: 12px;
  --card-radius: 16px;
  --chip-radius: 999px;
}
```

## Component rules

### Navigation rail

```html
<aside class="site-rail">
  <a class="site-rail__name" href="/">Narin Kim</a>
  <nav aria-label="Primary">
    <a href="/info">Info</a>
    <a href="/">Work</a>
    <a href="mailto:...">Email</a>
    <a href="https://www.linkedin.com/in/narinkim888">LinkedIn</a>
  </nav>
</aside>
```

- Keep the navigation text large and left-aligned.
- Use visible focus styles even though the visual design is minimal.
- Do not replace text links with icon-only controls.

### Index row

```html
<a class="project-index-row" href="/fin">
  <span class="project-index-row__name">Fin</span>
  <span class="project-index-row__descriptor">UI/UX &amp; AI Design</span>
</a>
```

```css
.project-index-row {
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 64px;
  padding: 16px 24px;
  border-radius: 12px;
  background: var(--color-surface);
  color: var(--color-ink);
}

.project-index-row__name {
  font: var(--type-index);
}

.project-index-row__descriptor {
  color: var(--color-muted);
  font: var(--type-index);
}
```

### Work card

```html
<a class="work-card" href="/fin">
  <div class="work-card__media">
    <video autoplay muted loop playsinline poster="/media/fin-poster.jpg">
      <source src="/media/fin.mp4" type="video/mp4" />
    </video>
  </div>
  <div class="work-card__tags" aria-label="Project categories">
    <span>UI/UX</span>
    <span>Internship</span>
  </div>
  <div class="work-card__copy">
    <span class="work-card__name">Fin</span>
    <p>No middlemen. No friction. Just fast, secure money movement.</p>
  </div>
</a>
```

Rules:

- Make the entire card clickable.
- Preserve each project’s intended media ratio and focal point.
- Use `overflow: hidden` so media respects the 16px card radius.
- Keep tags short; they are classification metadata, not buttons.
- Keep descriptions concise and editorial. The card should read as a visual index, not a case-study summary.

### Media treatment

- Use autoplaying media only when it is muted, inline, and looped.
- Provide a poster frame and a still fallback for video.
- Favor crop and composition over overlays; the work itself supplies the contrast.
- The page currently uses both still images and multiple MP4 assets, with several projects represented by animated media.

## Motion direction

Motion is part of the portfolio content rather than a global decoration system.

- Featured work may advance as a slideshow with restrained pagination.
- Project videos should loop continuously but remain silent.
- Avoid page-wide parallax, cursor followers, tilt, and large entrance choreography.
- If adding hover behavior, keep it subtle: a small media scale or opacity change is enough.
- Keep the live clock ambient and low emphasis.

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Accessibility and performance

- Use semantic headings and links for the rail and project index.
- Give every meaningful image an alt description of the visible composition; do not use the project title as the only alt text.
- Mark decorative layers as `aria-hidden="true"`.
- Keep cards keyboard reachable with a clear `:focus-visible` outline.
- Do not make understanding a project dependent on hover or autoplay.
- Respect `prefers-reduced-motion`; show poster frames or stills when motion is reduced.
- Lazy-load below-the-fold images and videos, but keep the first featured visual eager.
- Reserve media space with explicit aspect ratios to avoid layout shift.
- Compress video aggressively; the grid contains multiple moving assets and can become bandwidth-heavy on mobile.

## Implementation priorities

1. Match the dark canvas, rail geometry, 28px navigation, and 12px index rows.
2. Recreate the desktop feature-plus-grid composition and the mobile stacked/grid composition.
3. Preserve project-specific crops and rounded card surfaces.
4. Add video poster frames, reduced-motion handling, and lazy loading.
5. Tune hover/focus behavior only after the media and typography match.

## Extraction notes

Measured from the live home page at 1057 × 866 desktop and 390 × 844 mobile viewports. Values are implementation targets rather than claims about the original design file. The live page is rendered by Framer and exposes the typeface and color tokens in its generated CSS.
