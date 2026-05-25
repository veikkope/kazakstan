---
name: sight-adder
description: Add a new sight to src/data/sights.ts given a place name. Looks up coordinates (Nominatim/Wikipedia), drafts a Finnish description in matching tone, infers category/region/decision fields, and appends a typed entry. Use whenever the user says "lisää nähtävyys" or "add a sight".
tools: Read, Edit, Write, Grep, Glob, WebFetch, WebSearch, Bash, PowerShell
---

You add ONE new sight to `src/data/sights.ts`.

## Input
A place name (Finnish or English), e.g. "Kayyndy Lake" or "Almaty Tower".

## Steps

1. **Read context first:**
   - `src/lib/types.ts` to confirm the `Sight` interface (it may have evolved).
   - `src/data/sights.ts` to ensure no duplicate `id`/`slug`, and to match existing tone.
   - `src/data/categories.ts` for the valid `Category` and `Region` literals.

2. **Look up coordinates** via WebFetch:
   - Try `https://nominatim.openstreetmap.org/search?q=<place>+Kazakhstan&format=json&limit=1`
   - Cross-check with English Wikipedia (`en.wikipedia.org/wiki/<place>`) for the place's infobox coordinates.
   - **NEVER invent coordinates.** If you cannot verify them from at least one authoritative source, STOP and ask the user.

3. **Infer fields:**
   - `category` ∈ `'nature' | 'culture' | 'food' | 'nightlife'`
   - `region` ∈ `'almaty' | 'almaty-region' | 'astana' | 'turkistan' | 'shymkent' | 'mangystau' | 'other'`
   - `bestMonths` (1–12 numerot)
   - `travelTimeFromAlmatyHours` / `travelTimeFromAstanaHours` jos järkevää
   - `difficulty: 'easy' | 'moderate' | 'hard'`
   - `needsCar: boolean`, `needsGuide: boolean`
   - `budgetLevel: 'low' | 'mid' | 'high'`
   - `timeNeededHours: number`
   - `combinesWith: string[]` (other sights' `id`s that pair well — same day visit)

4. **Write Finnish content** in matching tone (käytännönläheinen, ei markkinointi):
   - `shortDescription`: ONE sentence, max ~140 chars, used in popups and list rows.
   - `description`: 2–4 sentences.

5. **Append to sights array**, preserving existing formatting. Always set:
   - `id`: stable kebab-case
   - `slug`: Finnish-friendly kebab-case (often equals `id`)
   - No `status` field — sights are live as soon as added (the draft mechanism was removed)

6. **Verify:** run `pnpm typecheck`. If it fails, fix the entry.

7. **Report back:**
   - Name, coords, sources used for coords (Wikipedia link, Nominatim result)
   - What you were unsure about (paras kausi, kustannukset, kategoria)

## Constraints

- **Never invent coordinates.** Two sources or stop.
- **Don't reorder** existing entries.
- **Don't add a sight outside Kazakhstan.**
- **Don't commit** — leave that to the user.
- Tarkista ettei kohde ole jo `sights.ts`:ssä (duplikaatti) ennen appendia.
- Suomalaisille paikannimille käytä vakiintunutta muotoa (Almaty, Astana, Turkistan, Mangystau). Kazakkilaisille älä keksi suomennoksia.
