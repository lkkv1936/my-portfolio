# Venus Lai Portfolio — UI Design Specification

High-fidelity design reference for the homepage. Implementation lives in `index.html`, `css/styles.css`, and `js/`.

---

## 1. Design intent

| Dimension | Direction |
|-----------|-----------|
| Mood | Quiet night sky, trust, warmth, premium softness |
| Style | Clean layout, generous whitespace, low-saturation watercolor illustration feel |
| Audience | Clients & collaborators in animation, illustration, education, theme parks |

---

## 2. Color system (low chroma)

```
Night sky (backgrounds)
  #0a0f1f  Deep base
  #141b33  Mid layer / cards
  #1c2541  Soft panel
  #2a3358  Glow accents

Wood accents (trust, earth)
  #3d3228  Dark wood
  #5c4a3a  Primary wood
  #8b7355  Light wood / labels

Star & text
  #f4f0e8  Primary text (warm white)
  #c8d4e8  Secondary text

Accent (dreamy highlight)
  #97aef7  Mist blue — links, CTA, titles
```

Gradients: hero overlay `night-deep → night-mid`; CTA `mist → #b8c8f0`; section dividers `transparent → wood-light → transparent`.

---

## 3. Typography

| Role | Font | Weight | Size (desktop) |
|------|------|--------|----------------|
| Display / headlines | Cormorant Garamond | 500–600 | 36–56px |
| UI / body | Outfit | 300–600 | 14–18px |
| Labels | Outfit | 600, uppercase, tracking 0.2em | 12px |

---

## 4. Page wireframe (desktop 1440px)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ [Logo Venus Lai]     Home   About Me   Works          [🔍] [Contact]      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                             │
│                    ★  ★        FULL-BLEED NIGHT SKY HERO        ★         │
│                         Stories under a dreamy night sky                    │
│                    Welcome — I'm Venus Lai…                                 │
│                         ( My Portfolio → )   ← pill CTA, hover lift       │
│                                                                             │
├─────────────────────────────────────────────────────────────────────────────┤
│  ABOUT ME                                                                   │
│  ┌──────────────┐   About Me                                                │
│  │  Portrait /  │   Adaptable and creative professional…                     │
│  │  cute illus  │   [Character] [Animation] [Illustration] [Visual comm.]   │
│  └──────────────┘                                                           │
├─────────────────────────────────────────────────────────────────────────────┤
│                    Featured Categories (4-col grid)                         │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐                              │
│  │ Char.  │ │ Anim.  │ │ Illus. │ │ Design │  ← hover: lift + img zoom      │
│  └────────┘ └────────┘ └────────┘ └────────┘                              │
├─────────────────────────────────────────────────────────────────────────────┤
│  WORKS (4-col product cards × 8 items)                                      │
│  [img↔img] Title + description + [Learn more]                               │
├─────────────────────────────────────────────────────────────────────────────┤
│  ILLUSTRATIONS (4-col, horizontal row on desktop)                           │
│  [img↔img] Title + short description (no CTA button)                        │
├─────────────────────────────────────────────────────────────────────────────┤
│  FOOTER: Sitemap | Instagram | lkkv1936@gmail.com | © Venus Lai             │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 5. Responsive breakpoints

| Breakpoint | Layout changes |
|------------|----------------|
| &lt; 640px | Single column; hamburger menu; hero headline 36px |
| 640–1023px | 2-col grids for works / featured |
| ≥ 1024px | 4-col works & illustrations; centered nav in header |

---

## 6. Interaction spec

| Element | Default | Hover / focus | Transition |
|---------|---------|---------------|------------|
| Nav link | 75% white | Underline gradient, full white | 350ms ease-out |
| CTA「My Portfolio」| Mist gradient pill | Lift -4px, white fill, ring glow | 400ms |
| Featured card | Flat shadow | translateY -8px, scale 1.02, border mist | 450ms |
| Portfolio image | Front image | Crossfade to back image + ✦ badge | 550ms opacity |
| Learn more | Outlined mist | Filled mist, dark text | 350ms |
| Search icon | — | Opens blurred overlay + input | 350ms panel fade |

Touch: tap portfolio image toggles dual-image state (one card at a time).

---

## 7. Asset map

Replace placeholder URLs in `js/data.js`:

- `hero` → night sky / star field photography or custom art
- `about` → personal mascot / watercolor self-portrait
- Each work `imgFront` / `imgBack` → sketch vs final, or still vs motion frame

---

## 8. File architecture

```
my-portfolio/
├── index.html          # Semantic sections + Tailwind CDN config
├── css/styles.css      # Tokens, animations, components
├── js/data.js          # Content module (easy CMS handoff)
├── js/main.js          # UI: menu, search, render, starfield
├── DESIGN-SPEC.md      # This document
└── assets/             # (recommended) local images
```

---

## 9. Visual mockup

See `assets/ui-mockup-homepage.png` for a composite high-fidelity frame of the hero + navigation + card tone.
