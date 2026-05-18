# src/data — sisällön lähde

Kaikki sisältö on typed TypeScriptiä. Ei JSON, ei DB.

## Tiedostot
- `sights.ts` — `Sight[]`. Lisäys: append to array, varmista uniikki `id`. Käytä `sight-adder`-agenttia.
- `presets.ts` — kolme valmista `Preset`-objektia. Viittaa sightien `id`:hen.
- `itinerary.ts` — käyttäjän oma `ItineraryDay[]`. Tyhjä kunnes reitti varmistuu.
- `practical.ts` — `visaInfo`, `languageBasics`, `safetyNotes`, `transportSections`. Päivämäärät absoluuttisina.
- `checklist.ts` — `ChecklistItem[]`, järjestetty kategorian ja `daysBeforeTrip`:in mukaan.
- `budget.ts` — `BudgetByRegion[]` + `STATIC_KZT_PER_EUR`. EUR-arviot per alue.
- `categories.ts` — UI-meta (väri, emoji, label fi) kategorioille ja alueille.

## Tyyli — suomenkielinen sisältö
- `shortDescription`: **YKSI lause** (max ~140 merkkiä). Käytetään popupissa ja listarivillä.
- `description`: 1–3 kappaletta selvää suomea, käytännönläheinen rekisteri ("kannattaa", "voitte").
- Älä kirjoita markkinointitekstiä. Yhdistä faktat tunnelmaan kohtuudella.
- Käytä vakiintuneita suomalaisia nimiä (Almaty, Astana, Turkistan). Kazakkilaisia paikannimiä älä keksi.

## Koordinaatit
- Decimal degrees, WGS84, `{ lat, lng }`.
- ≥4 desimaalia.
- **Vahvista aina** OpenStreetMapista tai Wikipediasta ennen committia.

## Status-konventio
- `verified` näkyy kaikkialla.
- `draft` vain etusivun "Myöhemmin lisättävät" -osiossa ja `/nahtavyydet?showDrafts=1`-näkymässä.
- Käytä `excludeDrafts()` `src/lib/filters.ts`:stä kaikissa pääkulkureitin renderöinneissä — kartassa, preseteissä, NearbyListissä.

## Ratings ja tutkimus
- `Sight.ratings` täytetään `sight-enricher`-agentilla, ei käsin.
- Lähde-aineisto on `src/research/<slug>.md` jonka `deep-researcher` kirjoittaa.
- `place-rater` ehdottaa arvot, mutta vain `sight-enricher` saa ne sights.ts:ään.
- `historicalContext` on lyhyt — 1–2 lausetta. Pidemmät tarinat menevät research-tiedostoon.
- `lastEnriched` päivittyy automaattisesti kun `sight-enricher` koskee entryyn.

## Tarkistuslista muokkauksen jälkeen
1. `pnpm typecheck`
2. Avaa `/kartta` dev-serverillä — markkeri näkyy oikeassa paikassa
3. Tarkista `/nahtavyydet/<slug>` — Pikatiedot-paneeli täysi
