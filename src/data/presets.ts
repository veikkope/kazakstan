import type { Preset } from '@/lib/types';

// Kolme valmista reittipresettiä lähtökohdaksi. Kopioi runko `userItinerary`:in
// (src/data/itinerary.ts) jos haluat muokata reittiä omaan käyttöösi.
export const presets: Preset[] = [
  // ============== Preset 1: Luonto + Almaty (5 päivää) ==============
  {
    id: 'luonto-almaty-5',
    title: 'Luonto + Almaty — 5 päivää',
    theme: 'nature',
    durationDays: 5,
    shortDescription:
      'Yhdellä tukikohdalla (Almaty), päiväretket vuoristoon ja kanjoneihin.',
    whoFor:
      'Kun haluatte vuoria, järviä ja rauhaa ilman jatkuvia siirtymiä eri kaupunkeihin.',
    highlights: [
      'Charynin kanjoni — Keski-Aasian Grand Canyon',
      'Kolsain järvet — alppimaisema Tienšanissa',
      'Iso Almatyn järvi — turkoosi vuoristohelmi',
      'Medeu & Shymbulak — gondoli vuoristoon',
    ],
    estimatedBudgetEUR: { low: 350, mid: 600 },
    days: [
      {
        day: 1,
        title: 'Saapuminen Almatyyn',
        summary:
          'Lasku, hotelliin, ensimmäinen kävely Panfilovin puiston ja Vihreän basaarin kautta.',
        sightIds: ['almaty-keskusta', 'zenkov-cathedral', 'green-bazaar'],
        accommodation: { city: 'Almaty' },
      },
      {
        day: 2,
        title: 'Charynin kanjoni',
        summary:
          'Päiväretki Charynin kanjoniin kuljettajan kanssa. Paluu illalla Almatyyn.',
        sightIds: ['charyn-canyon'],
        transport: [{ mode: 'car', from: 'Almaty', to: 'Charyn', note: 'Yksityiskuljettaja' }],
        accommodation: { city: 'Almaty' },
      },
      {
        day: 3,
        title: 'Kolsai ja Kaindy',
        summary:
          'Aikainen lähtö Kolsain järville. Yöpyminen Satyssa, jotta voi mennä myös Kaindyyn.',
        sightIds: ['kolsai-lakes', 'kaindy-lake'],
        transport: [{ mode: 'car', from: 'Almaty', to: 'Saty' }],
        accommodation: { city: 'Saty', note: 'Paikallinen guesthouse' },
      },
      {
        day: 4,
        title: 'Iso Almatyn järvi + paluu',
        summary:
          'Paluu Almatyyn, iltapäivä BAO:lla (rajavyöhykelupa tarkistettava etukäteen).',
        sightIds: ['big-almaty-lake'],
        accommodation: { city: 'Almaty' },
      },
      {
        day: 5,
        title: 'Medeu, Shymbulak ja lähtö',
        summary:
          'Gondolihissi Shymbulakiin, lounas vuorilla. Illalla lento kotiin.',
        sightIds: ['medeu-shymbulak'],
      },
    ],
  },

  // ============== Preset 2: Kaupungit + kulttuuri (7 päivää) ==============
  {
    id: 'kaupunki-kulttuuri-7',
    title: 'Kaupungit + kulttuuri — 7 päivää',
    theme: 'culture',
    durationDays: 7,
    shortDescription:
      'Almaty, Astana ja Turkistan — modernia arkkitehtuuria ja UNESCO-kohteita.',
    whoFor:
      'Kun haluatte nähdä kontrastin: vihreä Almaty, futuristinen Astana ja historiallinen Turkistan.',
    highlights: [
      'Almatyn keskusta, basaarit ja köysirata',
      'Astanan modernit ikonit (Baiterek, Khan Shatyr, Rauhan palatsi)',
      'Khoja Ahmed Yasawin mausoleumi — UNESCO',
      'Yöjuna kaupunkien välillä',
    ],
    estimatedBudgetEUR: { low: 500, mid: 850 },
    days: [
      {
        day: 1,
        title: 'Saapuminen Almatyyn',
        summary: 'Hotelliin, Panfilovin puisto ja Vihreä basaari.',
        sightIds: ['almaty-keskusta', 'zenkov-cathedral', 'green-bazaar'],
        accommodation: { city: 'Almaty' },
      },
      {
        day: 2,
        title: 'Almaty — kulttuuri ja näköalat',
        summary: 'Keskusvaltion museo, Kök-Töbe köysiradalla, ilta Arbatilla.',
        sightIds: ['central-state-museum', 'kok-tobe', 'almaty-arbat'],
        accommodation: { city: 'Almaty' },
      },
      {
        day: 3,
        title: 'Lento Astanaan',
        summary: 'Aamulento, iltapäivä Baiterekissä ja Khan Shatyrissa.',
        sightIds: ['bayterek', 'khan-shatyr'],
        transport: [{ mode: 'plane', from: 'Almaty', to: 'Astana' }],
        accommodation: { city: 'Astana' },
      },
      {
        day: 4,
        title: 'Astanan moskeijat ja arkkitehtuuri',
        summary: 'Hazret Sultan, Nur-Astana, Rauhan palatsi — kävellen ja taksilla.',
        sightIds: ['hazret-sultan-mosque', 'nur-astana-mosque', 'palace-of-peace'],
        accommodation: { city: 'Astana' },
      },
      {
        day: 5,
        title: 'Yöjuna Turkistaniin',
        summary:
          'Päivä rauhassa Astanassa, illalla yöjunaan Turkistania kohti (~13 h).',
        sightIds: [],
        transport: [{ mode: 'train', from: 'Astana', to: 'Turkistan', note: 'Yöjuna, sleeper' }],
        accommodation: { city: 'Juna' },
      },
      {
        day: 6,
        title: 'Turkistan — UNESCO',
        summary: 'Khoja Ahmed Yasawin mausoleumi ja restauroitu vanhakaupunki.',
        sightIds: ['khoja-ahmed-yasawi', 'turkistan-old-town'],
        accommodation: { city: 'Turkistan' },
      },
      {
        day: 7,
        title: 'Paluu Almatyyn ja kotiin',
        summary: 'Aamulento Almatyyn, lyhyt välipysähdys ja paluulento kotiin.',
        sightIds: [],
        transport: [
          { mode: 'plane', from: 'Turkistan/Shymkent', to: 'Almaty' },
          { mode: 'plane', from: 'Almaty', to: 'Helsinki' },
        ],
      },
    ],
  },

  // ============== Preset 3: Eeppinen roadtrip (10 päivää) ==============
  {
    id: 'eeppinen-roadtrip-10',
    title: 'Eeppinen roadtrip — 10 päivää',
    theme: 'epic-roadtrip',
    durationDays: 10,
    shortDescription:
      'Almaty + Altyn-Emel + Kolsai + Charyn + lento Aktauun + Mangystaun aavikko.',
    whoFor:
      'Kun haluatte parhaat puolet: vuoria, kanjoneita ja Marsia muistuttavaa aavikkoa. Vaatii enemmän siirtymiä.',
    highlights: [
      'Laulavat dyynit ja Aktaun vuoret — Altyn-Emel',
      'Kolsai + Kaindy',
      'Bozzhyran kanjonit — Mangystau',
      'Beket-Atan luolamoskeija',
    ],
    estimatedBudgetEUR: { low: 900, mid: 1500 },
    days: [
      {
        day: 1,
        title: 'Saapuminen Almatyyn',
        summary: 'Lasku, illallinen Almatyn keskustassa.',
        sightIds: ['almaty-keskusta'],
        accommodation: { city: 'Almaty' },
      },
      {
        day: 2,
        title: 'Altyn-Emel — Laulavat dyynit & Aktau',
        summary: 'Aikainen lähtö, yön yli puistoa.',
        sightIds: ['singing-dunes', 'altyn-emel-aktau'],
        transport: [{ mode: 'car', from: 'Almaty', to: 'Altyn-Emel' }],
        accommodation: { city: 'Basshi (Altyn-Emel)' },
      },
      {
        day: 3,
        title: 'Paluu Almatyyn',
        summary: 'Aamupäivällä viimeiset näköalat, paluu illaksi Almatyyn.',
        sightIds: [],
        accommodation: { city: 'Almaty' },
      },
      {
        day: 4,
        title: 'Charyn ja Kaindy',
        summary: 'Klassinen kanjoni-päivä, yöpyminen Satyssa.',
        sightIds: ['charyn-canyon', 'kaindy-lake'],
        accommodation: { city: 'Saty' },
      },
      {
        day: 5,
        title: 'Kolsai-järvet',
        summary: 'Aamukävely ensimmäiselle järvelle, mahdollinen ratsain ylempiin.',
        sightIds: ['kolsai-lakes'],
        accommodation: { city: 'Saty' },
      },
      {
        day: 6,
        title: 'Paluu Almatyyn + lento Aktauun',
        summary: 'Aamu Almatyssa, iltapäivän lento länteen.',
        sightIds: [],
        transport: [{ mode: 'plane', from: 'Almaty', to: 'Aktau' }],
        accommodation: { city: 'Aktau' },
      },
      {
        day: 7,
        title: 'Mangystau — Pallolaakso',
        summary: 'Lähtö 4WD-kierrokselle, ensimmäinen kohde Torysh.',
        sightIds: ['valley-of-balls'],
        transport: [{ mode: 'car', from: 'Aktau', to: 'Mangystau' }],
        accommodation: { city: 'Aavikko (jurtta)' },
      },
      {
        day: 8,
        title: 'Bozzhyra',
        summary: 'Mangystaun ikoni — koko päivä kanjoneilla.',
        sightIds: ['bozzhyra'],
        accommodation: { city: 'Aavikko (jurtta)' },
      },
      {
        day: 9,
        title: 'Beket-Ata ja paluu Aktauun',
        summary: 'Luolamoskeija aamulla, paluu Aktauun illaksi.',
        sightIds: ['beket-ata'],
        accommodation: { city: 'Aktau' },
      },
      {
        day: 10,
        title: 'Lento kotiin',
        summary: 'Aktau → Almaty → koti.',
        sightIds: [],
        transport: [
          { mode: 'plane', from: 'Aktau', to: 'Almaty' },
          { mode: 'plane', from: 'Almaty', to: 'Helsinki' },
        ],
      },
    ],
  },
];
