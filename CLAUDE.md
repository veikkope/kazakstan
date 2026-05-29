@AGENTS.md

# Kazakstan-reissun suunnittelusivusto

Henkilökohtainen monikielinen matkasuunnittelusivu Kazakstaniin. Kahden ihmisen päätöstyökalu — ei pelkkä nähtävyyskatalogi. Julkinen URL, ei autentikointia, ei tietokantaa.

## Stack

- **Next.js 16** (App Router) + React 19 + TypeScript
- **Tailwind v4** — `@import "tailwindcss"`, palette `@theme inline` -lohkossa
- **Leaflet + react-leaflet** kartat (OpenStreetMap-laatat)
- Sisältö **typed TS-moduuleina** `src/data/`:ssa — ei JSON, ei DB, ei CMS
- Deploy **Vercel**

## Kielikäytäntö (i18n)

- **Tuetut kielet**: `fi` (suomi, canonical), `en` (English), `ru` (русский), `kk` (қазақша)
- **Default**: `fi`. Fallback käännöksen puuttuessa: `fi`.
- **Locale-prefix pakollinen joka URL:lle**: `/fi/...`, `/en/...`, `/ru/...`, `/kk/...`. Root `/` redirectaa parhaaseen kieleen (Accept-Language + cookie).
- **Page-paths englanniksi** kaikille kielille (kansainvälinen URL-konventio):
  - `/<locale>/map`, `/<locale>/sights`, `/<locale>/sights/[slug]`, `/<locale>/routes`, `/<locale>/itinerary`, `/<locale>/shortlist`, `/<locale>/info`, `/<locale>/budget`, `/<locale>/today`, `/<locale>/car-rental`
- **Sight-slugit pysyvät Latin-pohjaisina** ja yhteisinä kaikille kielille (esim. `/ru/sights/charyn-canyon`).
- **Koodi-identifierit ja kommentit englanniksi.**
- **Kirjasto**: `next-intl` — server-component-yhteensopiva, type-safe message keys.

### Käännösprosessi (drift-hallinta)

- **Canonical = `fi`**. Sisältö kirjoitetaan ensin suomeksi.
- Localisoidut Sight-stringit ovat inline-objekteja: `name: { fi, en, ru, kk }`. TypeScript pakottaa kaikki kielet → drift mahdoton compile-aikana.
- **`lastTranslated`** per locale per entry. Jos `lastEdited > lastTranslated.<locale>`, käännös on stale.
- UI-stringit `messages/<locale>.json`-tiedostoissa, hierarkkiset avaimet (esim. `sights.empty.title`).
- AI-käännökset Claude-agentilla, natiivi-tarkistus mahdollisuuksien mukaan (erityisesti kazakki).
- **Älä commitaa puutteellisia käännöksiä** ilman fallbackia. Pre-commit-tarkistus tunnistaa puuttuvat avaimet.

## Tiedostokartta

- `src/app/[locale]/<english-path>/page.tsx` — App Router -sivut, locale-prefixin alla
- `src/proxy.ts` — locale detection + redirect (Next.js 16 proxy convention)
- `src/i18n/` — next-intl config (locales, request, navigation)
- `messages/<locale>.json` — UI-stringit per locale
- `src/components/<feature>/` — feature-grouped (map, sights, itinerary, presets, info, budget, layout, navigation)
- `src/data/` — sisältö (sights, presets, itinerary, practical, checklist, budget, categories, logistics)
- `src/lib/` — types, filters, distance, url-state, shortlist, currency, search, route
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

1. **Yksi yhtenäinen URL-parametriskeema:** `cat` (kategoriat CSV), `region` (alueet CSV), `id` (valittu yksi), `sl` (shortlist CSV), `sort` (sortDimension), `q` (haku-string). Sama parsija `src/lib/url-state.ts`:ssä. Locale ei ole query-param vaan path-prefix.
2. **URL-päivitykset aina `router.replace`** — ei `router.push`, muuten historian stack paisuu.
3. **Shortlist on SSR-turvallinen:** ei `localStorage`-lukua renderissä; vain `useEffect`issä. URL voittaa localStoragen mountissa.

### Sight-konventiot
- `id` on **pysyvä**, käytetään itineraryssa ja preseteissä — älä koskaan muuta.
- `slug` voi muuttua (URL-osa).
- Koordinaatit: WGS84 decimal degrees, `{ lat, lng }`, ≥4 desimaalia.
- `category` ∈ `'nature' | 'culture' | 'food' | 'nightlife'`.
- Ajetaan `pnpm typecheck` aina `src/data/*` -muokkauksen jälkeen.

### Offline / PWA (älä riko näitä)

Service worker `public/sw.js` + "Lataa offline-käyttöön" (/today). Tausta: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md) §3.

- **Välimuistihaut `{ ignoreVary: true }`** (navigoinneissa myös `ignoreSearch`). Next-sivut lähettävät `Vary: rsc, …, Accept-Encoding`; Safari noudattaa Varya tiukasti → ilman tätä offline-navigointi putoaa etusivulle (Chromiumissa "toimii" silti — harhaanjohtavaa).
- **Proxy/middleware ajetaan vain palvelimella** → SW tekee `/`→`/<locale>`-ohjauksen offline (NEXT_LOCALE-eväste). Älä oleta locale-redirectin toimivan offline ilman sitä.
- **Nähtävyyskuvat pidetään `unoptimized`** (`SightImage`) — `/_next/image`-optimoija ei toimi offline.
- **Ääntämysnäytteet (`/audio/phrases/*.mp3`) ovat osa offline-pakettia.** `tripAudioUrls()` skannaa kaikki `languageBasics.groups[].phrases[].audioUrls`-arvot ja SW:n staattisten varojen extensio-regexi sisältää `mp3|ogg|m4a|wav`. Jos lisäät uuden audio-formaatin, päivitä molemmat (`src/lib/offline.ts` + `public/sw.js`).
- **Persistent storage pyydetään käyttäjän painalluksessa**, ei mountilla (`OfflineProvider.startDownload`). Firefox kysyy lupaa → tuore user activation on välttämätön.
- **`sw.js`:n `VERSION`-nosto tyhjentää myös ladatun reissun** (`trip-*`-lokerot) → nosta vain kun välimuistin rakenne oikeasti muuttuu (esim. uusi reitti, uusi asset-tyyppi, fetch-strategian muutos).
- **Lukitun karttasivun korkeus** = `100dvh − var(--app-header-h) − var(--offline-banner-h) − var(--bottom-nav-h)`; pidä CSS-muuttujat yksilähteisinä tai lista/kartta-nappi jää alapalkin alle.

### Mitä EI saa tehdä
- Ei tietokantaa, ei autentikointia, ei CMS:ää.
- Ei i18n-kielten lisäämistä ilman tyypitettyä `Locale`-unionin päivitystä — kaikki 4 kieltä joko täysi tuki tai ei mitään (drift estetty).
- Ei locale-spesifejä page-pathseja (`/en/sights` ja `/ru/sights` ovat samat). Käännös on UI-stringeissä ja sisältödatassa, ei URL:ssä.
- Ei kovakoodattuja suomi-stringejä komponenteissa — kaikki käännetty `useTranslations()`-kutsulla tai `messages/<locale>.json`:ista.
- Ei Google Maps -korvausta Leafletille (lisenssi + maksu).
- Ei server-only API:ja client-komponentteihin.

## Komennot

- `pnpm dev` — dev-serveri (http://localhost:3000)
- `pnpm build` — production build
- `pnpm lint` — ESLint
- `pnpm typecheck` — `tsc --noEmit`

## Workflow agenttien kanssa

### Yksittäiset agentit

- **Uutta nähtävyyttä:** `sight-adder` — koordinaatit ja perusmetadata. Kohde näkyy heti (ei erillistä draft-tilaa).
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
