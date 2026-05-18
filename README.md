# Kazakstan

Personal site for planning a trip to Kazakhstan — built to be useful **on the road**, not just at home.

**Live demo:** https://kazakstan.vercel.app/

The UI is in Finnish (so are the route slugs — `/kartta`, `/nahtavyydet`, `/reitit`); the code is in English. There's no database, no login and no admin — content lives as typed TypeScript modules in `src/data/`.

## Why

Most trip-planning tools are for browsing before you go. This one is meant to ride along on a phone during the trip — offline-tolerant, thumb-friendly, with one-tap directions when you're standing at a trail head with cold fingers.

## Design choices

A few things I deliberately spent time on:

- **Works offline on the phone.** Installable PWA with a hand-rolled service worker that precaches the app shell, serves HTML network-first with a cache fallback, and keeps LRU-bounded caches for OSM map tiles and Wikimedia images.
- **Built for thumb use.** Mobile bottom tab bar instead of a wrapping header, sticky action bar on each sight with a *Navigoi* button that opens the OS maps app with directions, native Web Share API for sending shortlists to a travel companion.
- **Accessibility basics aren't glossed over.** Every interactive element is at least 44×44 px (WCAG); form inputs are 16 px on mobile so iOS Safari doesn't auto-zoom; `prefers-contrast: more` is honoured.
- **Static, content-as-code.** 26 sights live as typed objects in `src/data/sights.ts`; pages are statically generated with `generateStaticParams`. No CMS, no database, no API to maintain.
- **Marker clustering on the map.** `react-leaflet` 5 has no cluster wrapper, so the cluster layer is built imperatively via `useMap()` against the Leaflet API, with `zoomToShowLayer` so list-driven selections open the right cluster before flying to the marker.
- **Real attribution for images.** Sight photos come from Wikimedia Commons under CC0 / CC-BY / CC-BY-SA, each with author and licence shown in a clickable © chip.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript
- Tailwind v4 (CSS-first `@theme inline`)
- Leaflet + react-leaflet + leaflet.markercluster (OpenStreetMap tiles)
- Vercel deploy

## Local development

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm typecheck
pnpm lint
pnpm build
```

## Repository layout

```
src/app/         App Router pages — Finnish slugs
src/components/  Feature-grouped (map / sights / itinerary / layout / …)
src/data/        Typed content modules (sights, presets, budget, …)
src/lib/         Helpers (types, filters, share, url-state, shortlist, …)
public/          Manifest, service worker, icons, Leaflet markers
```

## Notes

- This is a personal site for one specific trip. Generality (i18n, theming, multi-user) is intentionally out of scope.
- A project [`CLAUDE.md`](./CLAUDE.md) and a few Claude Code subagents (sight-adder, deep-researcher, place-rater, sight-enricher) help with content work.
