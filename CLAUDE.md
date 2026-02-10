# CLAUDE.md - Portfolio Website

## Project Overview
Personal portfolio website hosted on GitHub Pages at bakos97.github.io.
Targeted at recruiters and professional contacts — but designed to impress
with a bold, design-heavy vaporwave + programming aesthetic.

## Design Direction: Vaporwave x Code
The site uses a **retro-futuristic vaporwave** aesthetic fused with **programming culture**.
This is an intentional departure from generic developer portfolios — it should feel
like stepping into a neon-lit terminal from the future.

### Visual Identity
- **Color palette:** Deep navy/purple backgrounds, hot pink (#ff71ce), cyan (#01cdfe),
  purple (#b967ff), warm yellow (#fffb96) — classic vaporwave
- **Typography:** Monospace-forward (`Fira Code`) for the hacker feel, display font
  for headings
- **Effects:** Neon text glow, CRT scanlines, glitch animations, chromatic aberration
- **Background:** Animated perspective grid (the iconic vaporwave floor grid) rendered on canvas
- **Interactions:** Mouse-responsive parallax, typing animations, smooth scroll reveals,
  glitch hover effects

### Personality
- Vaporwave aesthetic = nostalgic, artistic, unconventional
- Programming references = terminal prompts, code snippets, syntax highlighting
- The site should feel alive — subtle motion everywhere, reactive to the user

## Tech Stack
- Static HTML/CSS/JS — no build step, no static site generator
- GitHub Pages for hosting (with `.nojekyll` to bypass Jekyll)
- HTML5 Canvas for animated background effects
- No framework dependencies — vanilla front-end
- CSS custom properties for theming; no preprocessors required

## Structure
- `index.html` — Main portfolio page (hero, about, projects, skills, contact)
- `projects/gender-disparities.html` — Existing data analysis project page
- `css/style.css` — All styles (vaporwave theme, neon effects, responsive layout)
- `js/main.js` — Retro grid canvas, glitch effects, typing animation, scroll interactions
- `assets/` — Images and other static assets
- `.nojekyll` — Marker file to disable Jekyll on GitHub Pages

## Development
- Preview locally: open `index.html` in a browser, or use `python3 -m http.server`
- Deploy: push to `main` branch; GitHub Pages serves automatically
- No build tools, bundlers, or package managers needed

## Current Targeting: Native.no — Founding Engineer
The portfolio is currently tailored for the Founding Engineer role at Native (native.no),
an autonomous AI for social media (a16z Scout Fund backed, 35M NOK valuation pre-launch).

### Key alignment points surfaced in the portfolio:
- **Fullstack from scratch** — Shipped web apps on Fly.io are shown first
- **Their exact stack** — Next.js, TypeScript, PostgreSQL, GCP, Vertex AI in skills
- **AI agents / LLMs** — Prominent in skills, floating code snippets, hero description
- **AI-native workflow** — Cursor + Claude Code called out in About and Skills
- **Pragmatic shipper** — Tagline "I build products & ship fast", project labels say "Shipped"
- **Startup-ready** — Contact says "early-stage team building something ambitious"
- **Web scraping / data at scale** — Spotify/Music Graphs project reframed for this
- **Social media / content interest** — Floating code snippets reference AI agents for publishing

## Conventions
- Keep pages lightweight and fast-loading (canvas should be performant)
- Mobile-first responsive design (canvas effects can be simplified on mobile)
- Accessible markup (semantic HTML, alt text, sufficient contrast despite neon theme)
- All colors defined as CSS custom properties in `:root`
- Use BEM-like class naming in CSS
- No Jekyll or templating dependencies
