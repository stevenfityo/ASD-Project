# aTyp

**A guide for parents of children with autism (ASD).**

aTyp ("atypical") is a mobile app prototype that helps parents of children on the autism spectrum navigate every stage of their child's journey — from diagnosis through adulthood. It turns a scattered, overwhelming world of therapies, paperwork, and decisions into a single, clear, step-by-step path.

## The problem

When a child is diagnosed with autism, parents are left to navigate a huge and confusing landscape on their own: diagnosis, therapies (ABA, speech, occupational), IEPs and school accommodations, medications, legal and financial planning (guardianship, ABLE accounts, trusts), sensory needs, and crisis situations.

The information is fragmented and overwhelming. It's hard to know **what to do right now** and **what comes next** as the child grows. aTyp brings it all into one place and replaces the chaos with a guided roadmap.

## Key features

The app is organized into five tabs:

| Tab | Description |
|-----|-------------|
| **Home** | Dashboard with the child's card, today's routine (meds, meals, sensory breaks, therapy, sleep), and upcoming events. |
| **Events** | Calendar of conferences, workshops, and IEP dates. Parents can add their own events. |
| **Guide** | The heart of the app — **GPS, a Life Journey Guide**: an age-anchored branching decision tree where each answer reveals the next question and previews the path ahead. Includes an AI assistant covering medical, therapy, education, daily life, finance/legal, and crisis topics. |
| **Market** | Marketplace of services, specialists, and resources. |
| **Account** | Child profile plus a **Documents Vault** (medical, therapies, education/IEP, legal & financial), daily-care settings, and a **Trusted Person** for emergency guardian access. |

### The core idea: the GPS life-journey map

The central concept is a **GPS map of the child's life journey**. Stage nodes are anchored to the child's age (`0–3`, `4–8`, `9–13`, `14+`), with a "You are here" marker, progressive unlocking of upcoming stages, and a final forecast. Each parent answer can re-route the branch, so families can preview the path their child may take based on their choices.

## Tech stack

- **React 18** loaded from a CDN — no build step.
- **Babel Standalone** compiles the `.jsx` files directly in the browser.
- Plain JavaScript with inline styles; mobile-first UI with a green/mint palette and the Manrope typeface.
- A tiny Node `http` static server (`server.js`) for local development.

The source is split into focused files, loaded in order by `index.html`:

| File | Responsibility |
|------|----------------|
| `atyp-icons.jsx` | Icon set |
| `atyp-shared.jsx` | Shared UI primitives (buttons, fields, tab bar, theme tokens) |
| `atyp-onboarding.jsx` | Welcome + 4-step onboarding flow |
| `atyp-map.jsx` | GPS life-journey map and branching guide |
| `atyp-home.jsx` | Home dashboard |
| `atyp-marketplace.jsx` | Marketplace |
| `atyp-tabs.jsx` | Events, Guide/Assistant, Profile, and other tab screens |
| `atyp-profile-sections.jsx` | Profile detail sections (Documents Vault, daily care, etc.) |
| `atyp-app.jsx` | Root app, routing, and state |

## Getting started

```bash
# Serve the app locally (default port 3847)
node server.js

# Then open http://localhost:3847
```

You can also open `index.html` through any static file server. A simple Node server is included so the `.jsx` files are served with the correct content type.

## Status

This is a **design prototype with mock data** (sample child "Emma" / parent "Maria", example routines and events). There is no production backend yet.
