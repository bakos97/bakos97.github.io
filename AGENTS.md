## Cursor Cloud specific instructions

This is a static HTML/CSS/JS portfolio site — no build step, no package manager, no linter or test framework. See `CLAUDE.md` for full project overview and conventions.

### Running the dev server

```
python3 -m http.server 8000
```

Serves from the workspace root on port 8000. All pages and assets are accessible immediately — no compilation or bundling required.

### Key files

- `index.html` — main page (hero, about, projects, experience, contact)
- `projects/gender-disparities.html` — sub-page
- `css/style.css` — all styles
- `js/main.js` — canvas animations, typing effect, scroll interactions, modals, project filtering

### Notes

- The `Gemfile` and `_config.yml` are legacy Jekyll artifacts. They are not used — the `.nojekyll` marker disables Jekyll on GitHub Pages.
- The `temp_icons/` directory (with its own `node_modules`) is a one-off utility, not part of the core site.
- There are no automated tests, linters, or build commands configured for this project. Validation is done by opening the site in a browser and manually inspecting.
