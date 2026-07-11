# aTyp — a guide for parents of children with autism

Interactive clickable prototype. The app is fully static: `index.html` loads
React and Babel from a CDN and compiles the `.jsx` files in the browser — there
is no build step and no backend.

## View it live

Once this is on `main`, GitHub Pages serves it at:

**https://stevenfityo.github.io/ASD-Project/**

Every push to `main` redeploys automatically via
`.github/workflows/pages.yml` (progress shows under the repo's **Actions** tab).

## Preview local changes (before committing)

The bundled `server.js` serves files straight from disk, so any saved edit is
visible on refresh — no commit needed.

```bash
node server.js
# open http://localhost:3847
```

No Node? Any static server works:

```bash
python3 -m http.server 3847
# open http://localhost:3847
```

## Typical workflow

1. Edit the `.jsx` files.
2. `node server.js` → check at `http://localhost:3847`.
3. Commit and push.
4. Merge into `main` → the live GitHub Pages URL updates automatically.

## Project layout

| File | Purpose |
|------|---------|
| `index.html` | Entry point; loads React/Babel and every `.jsx` in order |
| `atyp-icons.jsx` | SVG icon set |
| `atyp-shared.jsx` | Theme, primitives, child data, bottom `TabBar` |
| `atyp-app.jsx` | Root app: navigation state, routing, device frame |
| `atyp-home.jsx` | Home dashboard |
| `atyp-map.jsx` | GPS journey map (JoyDew milestone question model + Ask AI layer) |
| `atyp-gps-data.jsx` | GPS question data: 8 milestones / 90 questions, generated from the JoyDew pilot xlsx |
| `atyp-tabs.jsx` | Information Hub, Events, Marketplace, GPS tab, Account |
| `atyp-profile-sections.jsx` | Information Hub inner screens + document upload |
| `atyp-onboarding.jsx` | Onboarding flow |
| `atyp-marketplace.jsx` | Marketplace listings |
