# src/research/ — kohteiden tutkimusraportit

`deep-researcher`-agentti kirjoittaa jokaisesta nähtävyydestä strukturoidun raportin tähän kansioon. `place-rater` ja `sight-enricher` lukevat niitä.

## Tiedostonimi
`<sight-slug>.md` — sama slug kuin `Sight.slug` (paitsi jos `Sight.researchSlug` on asetettu).

## Formaatti
Käytä `_template.md`:tä pohjana. Jokainen raportti **MUST** sisältää otsikkotason `---` -frontmatterin (slug, lastResearched, sources[]) ja vakiosektiot. Pidä raportti tiiviinä — 200–500 sanaa.

## Päivittäminen
`deep-researcher` ylikirjoittaa olemassa olevan raportin täysin, mutta säilyttää frontmatterin sources-listan kasvavana. Käyttäjän omat huomiot tallenna `## Omat huomiot` -sektioon raportin loppuun — agentit eivät kosketa siihen.

## Lähteet
- Wikipedia (fi.wikipedia.org, en.wikipedia.org)
- OpenStreetMap (nominatim.openstreetmap.org, openstreetmap.org)
- Caravanistan (caravanistan.com)
- Lonely Planet, Advantour
- Paikalliset matkablogit
- UNESCO World Heritage sites (whc.unesco.org) jos sovellettavaa

## Älä
- Älä sisällytä faktoja ilman lähdettä — kaikilla väitteillä on oltava `[lähde](url)`-merkintä.
- Älä kirjoita markkinointitekstiä.
- Älä kopioi pitkiä tekstiotteita lähteistä — tiivistä omin sanoin.
