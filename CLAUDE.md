# CLAUDE.md - Portfolio Website

## Project Overview
Personal portfolio website hosted on GitHub Pages at bakos97.github.io.
Targeted at recruiters and professional contacts.

## Direction: Moving Away from Jekyll
This site is transitioning away from Jekyll and the Cayman remote theme (`_config.yml`)
toward a fully custom, hand-crafted static site. The goals are:

- **Full design control** — no theme constraints or Jekyll layout abstractions
- **Polished, modern look** — custom animations, typography, and layout that stand out
- **Zero Jekyll dependencies** — no Liquid templating, no `_layouts/`, no `_includes/`, no remote themes
- **Simple deploys** — pure HTML/CSS/JS served directly by GitHub Pages without Jekyll processing

### Migration checklist
- [ ] Remove or replace `_config.yml` (only keep if needed for GitHub Pages settings like custom domain)
- [ ] Eliminate any Liquid template syntax (`{{ }}`, `{% %}`) from HTML files
- [ ] Ensure all styling is in custom CSS, not inherited from the Cayman theme
- [ ] Add a `.nojekyll` file to the repo root to disable Jekyll processing on GitHub Pages

## Tech Stack
- Static HTML/CSS/JS — no build step, no static site generator
- GitHub Pages for hosting (with `.nojekyll` to bypass Jekyll)
- No framework dependencies — vanilla front-end
- CSS custom properties for theming; no preprocessors required

## Structure
- `index.html` — Main portfolio landing page (hero, about, projects, skills, contact)
- `projects/gender-disparities.html` — Existing data analysis project page
- `css/style.css` — All styles (replaces any Cayman theme styling)
- `js/main.js` — Interactions and animations
- `assets/` — Images and other static assets
- `_config.yml` — Legacy Jekyll config (to be removed or minimized)
- `.nojekyll` — Marker file to disable Jekyll on GitHub Pages (to be added)

## Development
- Preview locally: open `index.html` in a browser, or use `python3 -m http.server`
- Deploy: push to `main` branch; GitHub Pages serves automatically
- No build tools, bundlers, or package managers needed

## Conventions
- Keep pages lightweight and fast-loading
- Mobile-first responsive design
- Accessible markup (semantic HTML, alt text, sufficient contrast)
- All colors defined as CSS custom properties in `:root`
- Use BEM-like class naming in CSS
- Avoid introducing any Jekyll or templating dependencies

## Content Placeholders
Sections marked with `<!-- PLACEHOLDER -->` need the owner's real information filled in.
Search for "PLACEHOLDER" to find all spots that need personalization.
