# Venus Lai — Portfolio Homepage

Modern, responsive portfolio front page for **Venus Lai** (character design, animation, illustration).

## Quick start

ES modules require a local server (do not open `index.html` directly as `file://`).

**Option A — PowerShell (no npm):**

```powershell
cd c:\Users\bb\Desktop\my-portfolio
.\preview.ps1
```

Open **http://localhost:3456/**

**Option B — npm** (if your network allows `npx`):

```powershell
cd c:\Users\bb\Desktop\my-portfolio
npx --yes serve .
```

**Option C:** VS Code **Live Server** extension → Open `index.html`.

## Customize content

Edit **`js/data.js`** — swap image URLs, titles, descriptions, and links. Add files under `assets/` and reference them as `/assets/your-image.jpg`.

## Stack

- HTML5 (semantic landmarks)
- [Tailwind CSS](https://tailwindcss.com/) via CDN + extended theme in `index.html`
- Vanilla JavaScript (ES modules): `js/main.js`, `js/data.js`
- Custom CSS: `css/styles.css` (animations, cards, hero)

## Design documentation

See **[DESIGN-SPEC.md](./DESIGN-SPEC.md)** for colors, typography, wireframe, and interaction specs.

## Sections

1. Header — logo, nav, search, contact, mobile hamburger  
2. Hero — starfield canvas, headline, CTA  
3. About Me — image + provided bio copy  
4. Featured Categories — 4 cards  
5. Works — 4-column grid, dual-image hover, Learn more  
6. Illustrations — 4-column row, dual-image hover  
7. Footer — sitemap, Instagram, email, copyright  

## Browser support

Chrome, Edge, Firefox, Safari (recent). Respects `prefers-reduced-motion`.
