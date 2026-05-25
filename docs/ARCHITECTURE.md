# Architecture & Design Decisions

This document explains the *why* behind the non-obvious parts of the codebase. For a feature overview, see the [README](../README.md); for day-to-day conventions, see [`CLAUDE.md`](../CLAUDE.md).

## Guiding principle: a decision tool, not a catalogue

The app is built for **two people deciding what to do on a real trip**, used primarily on a phone, often with poor connectivity. Almost every architectural choice falls out of that constraint: static generation (fast, free, CDN-cached), offline support (a service worker), content as code (no backend to babysit on the road), and a thumb-first mobile UI.

Deliberately **out of scope**: authentication, multi-tenancy, a database, and a CMS. Generality would add cost and complexity for zero benefit to a single, finite trip.

---

## 1. Content as code

All trip content — 66 sights plus presets, itineraries, budgets, checklists, and practical info — lives as **typed TypeScript modules** in `src/data/`, not JSON, a database, or a CMS.

**Why:**
- **Type safety end-to-end.** A `Sight` is an interface; a malformed entry is a compile error.
- **Reviewable.** Content changes show up in `git diff` and PR review like any other code.
- **Statically generated.** `generateStaticParams` turns every sight into a static page at build time — no runtime data fetching, no server.

**Trade-off:** non-developers can't edit content. Acceptable — the only editors are developers, and the [agent pipeline](#5-the-ai-agent-pipeline) handles the heavy lifting.

A sight `id` is **permanent** (referenced by itineraries and presets); a `slug` is the URL segment and may change. This separation lets URLs evolve without breaking internal references.

---

## 2. Internationalisation where drift is impossible

Four first-class locales: `fi` (canonical), `en`, `ru`, `kk`. The hard problem in any multilingual app is **drift** — a string gets edited in one language and the others silently fall behind.

**The solution is the type system.** Every localized content field is:

```ts
type LocalizedString = Record<Locale, string>;
```

Because `Locale` is a closed union of all four languages, omitting any one of them is a **compile-time error**, not a production surprise. You physically cannot ship a sight that's missing its Kazakh name.

- **Canonical language is `fi`** — content is authored in Finnish first.
- Per-entry `lastTranslated` timestamps flag *stale* (present-but-outdated) translations, the one drift case types can't catch.
- **UI strings** live in `messages/<locale>.json` with hierarchical keys; missing keys fall back to `fi`.
- Routing uses `next-intl` with `localePrefix: 'always'` — every URL is `/<locale>/...`, even the default, so there's no special-case logic anywhere.
- **Page paths stay in English** across all locales (`/ru/map`, not `/ru/kartta`) and **sight slugs stay Latin-based** and shared. Translation lives in content and UI strings, never in the URL.

---

## 3. The offline service worker

`public/sw.js` is hand-written (no Workbox) so the caching strategy is explicit and easy to reason about. It uses **different strategies per resource type**:

| Resource | Strategy | Rationale |
|---|---|---|
| App shell (default-locale routes, icons, markers) | **Precache** on install | Guarantees a working baseline offline |
| HTML navigations | **Network-first**, fall back to cache, then `/` | Fresh content when online, never a blank screen offline |
| Static assets (`/_next/`, fonts, images) | **Cache-first** | Immutable, hashed filenames — safe to serve from cache forever |
| OpenStreetMap tiles | **Cache-first + LRU trim** (400 entries) | Re-visited areas load instantly; bounded so storage can't grow unbounded |
| Wikimedia / optimised images | **Cache-first + LRU trim** (200 entries) | Same, for sight photos |

The Cache API has no native LRU, so `trimCache()` does a FIFO eviction once a cache exceeds its cap. The precache is **best-effort**: each URL is fetched with an individual `catch`, so a single 404 can't abort the whole install.

> **Note on locales:** only the default-locale (`fi`) shell is precached. Other locales are cached at runtime by the network-first navigation handler as the user visits them — keeping the install lightweight while still working offline for the pages you actually open.

---

## 4. Maps: clustering against react-leaflet 5

`react-leaflet` 5 intentionally ships **no marker-cluster component**. Rather than pull in an abandoned wrapper, the cluster layer is built **imperatively**:

- A child component inside `<MapContainer>` calls `useMap()` to get the Leaflet instance.
- It creates a `L.markerClusterGroup`, syncs markers to it on data/filter changes, and tears it down on unmount.
- Selecting a sight from the **list** calls `zoomToShowLayer()` so the enclosing cluster *expands* before the map flies to the marker — otherwise the target marker would be hidden inside a cluster bubble.

### Map ↔ list ↔ URL synchronisation

The `/map` page owns the shared state (`selectedId`, active categories/regions); the map and the list are **controlled children**. State is mirrored to the URL via a single parser in `src/lib/url-state.ts`:

| Param | Meaning |
|---|---|
| `cat` | categories (CSV) |
| `region` | regions (CSV) |
| `id` | the one selected sight |
| `sl` | shortlist (CSV) |
| `sort` | sort dimension |
| `q` | search string |

URL updates always use `router.replace`, never `push`, so the back button isn't flooded with filter changes. The **shortlist** is SSR-safe: `localStorage` is read only inside `useEffect`, never during render, and the URL wins over `localStorage` on mount (so shared links are authoritative).

---

## 5. The AI agent pipeline

The dataset is maintained by a chain of single-responsibility [Claude Code](https://claude.com/claude-code) subagents in `.claude/agents/`. The design rule: **one agent, one job, least-privilege file access.**

```
sight-adder      → new draft sight (coords via Nominatim/Wikipedia, status: draft)
deep-researcher  → multi-source research → writes only to src/research/<slug>.md
place-rater      → READ-ONLY → proposes 0–5★ ratings + rationale
sight-enricher   → the ONLY writer to sights.ts; applies ratings/history/tips, one entry at a time
source-verifier  → READ-ONLY → flags time-sensitive data older than 6 months
itinerary-day-writer → fills one day of an itinerary, referencing existing sight ids only
```

**Why the strict separation?** Read-only agents (`place-rater`, `source-verifier`) can't mutate state, so their output is always a *proposal* a human or the dedicated writer applies. Writes are funneled through `sight-enricher` (one entry per run, runs `pnpm typecheck` after) so changes stay small and verifiable. A human confirms every `draft → verified` promotion. This is far more reliable than a single do-everything agent that's hard to review and easy to let run amok.

---

## 6. Tech choices in one line each

- **Next.js 16 App Router** — static export of a content site; server components keep the JS bundle small.
- **Leaflet over Google Maps** — open data, no API key, no billing, no usage caps.
- **Tailwind v4 CSS-first** — design tokens in `@theme`, no `tailwind.config.js`.
- **next-intl** — the one i18n library with proper server-component support and type-safe keys.
- **No test framework (yet)** — `tsc --noEmit` + ESLint are the safety net; the content is static and type-guarded. A small Playwright smoke suite is the natural next step.

---

## Known follow-ups

- Precaching all four locale shells (not just `fi`) would make first-visit offline coverage complete for non-default languages.
- A Playwright smoke test for the critical paths (map loads, search filters, a sight page renders) would catch regressions the type checker can't.
