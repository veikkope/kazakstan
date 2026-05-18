@AGENTS.md

# Kazakstan-reissun suunnittelusivusto

Henkilökohtainen, suomenkielinen matkasuunnittelusivu Kazakstaniin. Kahden ihmisen päätöstyökalu — ei pelkkä nähtävyyskatalogi. Julkinen URL, ei autentikointia, ei tietokantaa, ei i18n:ää.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind v4** — `@import "tailwindcss"`, palette `@theme inline` -lohkossa
- **Leaflet + react-leaflet** kartat (OpenStreetMap-laatat)
- Sisältö **typed TS-moduuleina** `src/data/`:ssa — ei JSON, ei DB, ei CMS
- Deploy **Vercel**

## Kielikäytäntö

- UI-tekstit, sisältö ja URL-slugit **suomeksi** (`/kartta`, `/nahtavyydet`, `/reitit`, `/reittisuunnitelma`, `/shortlist`, `/info`, `/budjetti`)
- Koodi-identifierit ja kommentit **englanniksi**

## Tiedostokartta

- `src/app/<finnish-slug>/page.tsx` — App Router -sivut
- `src/components/<feature>/` — feature-grouped (map, sights, itinerary, presets, info, budget, layout)
- `src/data/` — sisältö (sights, presets, itinerary, practical, checklist, budget, categories)
- `src/lib/` — types, filters, distance, url-state, shortlist, currency
- `public/leaflet/` — itse-hostatut marker-iconit
- `public/images/sights/` — kohteiden kuvat (`<slug>.jpg`)

## Kriittiset gotchat

### Next.js 16 erot vs. aiemmat
- `params` ja `searchParams` ovat `Promise<>` — `await` async server componentissa, `use()`-hook clientissä
- `useSearchParams()` clientissä toimii ennallaan

### Leaflet SSR
1. Mikä tahansa tiedosto joka importtaa `leaflet`/`react-leaflet` **MUST** alkaa `'use client'`-direktiivillä.
2. `next/dynamic({ ssr: false })` **ei toimi** Server Componentista — käytä `MapView.client.tsx`-kääremekanismia (oma `'use client'`).
3. Markkerikuvat itse-hostattuna `public/leaflet/`:ssä; `L.Icon.Default.mergeOptions({...})` ajetaan moduulin yläosassa `MapView.tsx`:ssä.

### Kartta↔lista-synkronointi + URL-state
- `/kartta`-sivu omistaa shared staten (`selectedId`, `activeCategories`).
- Kartta ja lista ovat kontrolloituja lapsia.
- Kartan flyTo: `<MapContainer>`:n sisäinen lapsikomponentti joka kutsuu `useMap()`.

### Lukitut säännöt (kaikkialla samalla tavalla)

1. **Yksi yhtenäinen URL-parametriskeema:** `cat` (kategoriat CSV), `region` (alueet CSV), `id` (valittu yksi), `sl` (shortlist CSV). Sama parsija `src/lib/url-state.ts`:ssä.
2. **URL-päivitykset aina `router.replace`** — ei `router.push`, muuten historian stack paisuu.
3. **Shortlist on SSR-turvallinen:** ei `localStorage`-lukua renderissä; vain `useEffect`issä. URL voittaa localStoragen mountissa.
4. **`status: 'draft'`-kohteet eivät näy oletuksena:** EI kartalla, EI preseteissä, EI nearby-listassa. Vain etusivun "Myöhemmin lisättävät"-osiossa ja `/nahtavyydet?showDrafts=1`. Käytä `excludeDrafts(sights)` `filters.ts`:stä oletuksena.

### Sight-konventiot
- `id` on **pysyvä**, käytetään itineraryssa ja preseteissä — älä koskaan muuta.
- `slug` voi muuttua (URL-osa).
- Koordinaatit: WGS84 decimal degrees, `{ lat, lng }`, ≥4 desimaalia.
- `category` ∈ `'nature' | 'culture' | 'food' | 'nightlife'`.
- Ajetaan `pnpm typecheck` aina `src/data/*` -muokkauksen jälkeen.

### Mitä EI saa tehdä
- Ei tietokantaa, ei autentikointia, ei CMS:ää.
- Ei i18n-koneistoa — suomi only.
- Ei Google Maps -korvausta Leafletille (lisenssi + maksu).
- Ei server-only API:ja client-komponentteihin.

## Komennot

- `pnpm dev` — dev-serveri (http://localhost:3000)
- `pnpm build` — production build
- `pnpm lint` — ESLint
- `pnpm typecheck` — `tsc --noEmit`

## Workflow agenttien kanssa

### Yksittäiset agentit

- **Uutta nähtävyyttä:** `sight-adder` — koordinaatit, perusmetadata, `status: 'draft'`. Käyttäjä vahvistaa → `status: 'verified'`.
- **Päivän reittiin:** `itinerary-day-writer`.
- **Faktantarkistus ennen deployta:** `source-verifier` — `lastVerified`-päivät, valuuttakurssi, viisumistilanne.

### Tutkimusputki (deep enrichment + ratings)

Kolmen agentin ketju syventää olemassa olevaa kohdetta ja antaa sille 0–5 tähtiarvosanat kolmella ulottuvuudella (popularity / interest / uniqueness):

1. **`deep-researcher`** — laaja monilähdetutkimus, tuottaa `src/research/<slug>.md`. Read+Write rajoitettu `src/research/`:iin.
2. **`place-rater`** — read-only, lukee tutkimusraportin ja vertaa muihin kohteisiin, ehdottaa tähdet + perustelun.
3. **`sight-enricher`** — kirjoittaa ratingsit, historicalContextin ja tarkennetut käytäntövinkit `src/data/sights.ts`:ään.

**Ajaminen yhdelle kohteelle:**
```
> tutki Charynin kanjoni                    # → deep-researcher
> arvioi Charynin kanjoni                   # → place-rater (lukee research-tiedoston)
> sovella arviot ja tutkimus sights.ts:ään  # → sight-enricher
```

**Ajaminen monelle kohteelle rinnakkain:** pääsessio dispatchaa useita `deep-researcher`-instansseja yhdessä viestissä (yksi Agent-tool-kutsu per sight). Sitten `place-rater` ja `sight-enricher` sekvensseissä per kohde.

### Best practices agenttien kanssa
- Yksi agentti = yksi vastuu. Älä rakenna paksua "tee-kaikki"-agenttia.
- Read-only agentit (`place-rater`, `source-verifier`) eivät edit:aa — ehdotukset menevät write-agentin (`sight-enricher`) kautta.
- `deep-researcher` voi kirjoittaa **vain** `src/research/`:iin.
- `sight-enricher` voi kirjoittaa **vain** `src/data/sights.ts`:n yhteen kohteeseen kerrallaan.
- Käyttäjä vahvistaa `draft → verified` itse.
