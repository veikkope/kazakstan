import type { BudgetByRegion } from '@/lib/types';

// Staattinen valuuttakurssi — tarkista ennen reissua. Live-fetch voidaan lisätä myöhemmin.
export const STATIC_KZT_PER_EUR = 600;

export const budgetByRegion: BudgetByRegion[] = [
  {
    region: 'general',
    label: 'Yleinen (lennot, perusarvio)',
    perDayEUR: { low: 50, mid: 80, high: 130 },
    items: [
      {
        category: 'flights',
        label: 'Edestakaiset lennot Helsinki–Almaty',
        estimateEUR: 600,
        note: 'Yleensä vaihdolla Istanbulin tai Dubain kautta. Hintahaitari 500–900 €.',
      },
      {
        category: 'misc',
        label: 'Matkavakuutus 2 viikolle',
        estimateEUR: 40,
      },
      {
        category: 'misc',
        label: 'eSIM (2 viikkoa, 5–10 GB)',
        estimateEUR: 15,
      },
    ],
  },
  {
    region: 'almaty',
    label: 'Almaty (kaupunki)',
    perDayEUR: { low: 35, mid: 65, high: 110 },
    items: [
      {
        category: 'lodging',
        label: 'Hostelli / budjettihotelli per yö',
        estimateEUR: 20,
      },
      {
        category: 'lodging',
        label: 'Keskitason hotelli per yö',
        estimateEUR: 50,
      },
      {
        category: 'food',
        label: 'Lounas paikallisessa kahvilassa',
        estimateEUR: 5,
      },
      {
        category: 'food',
        label: 'Illallinen ravintolassa',
        estimateEUR: 12,
      },
      {
        category: 'transport',
        label: 'Yandex Go -taksi keskustassa',
        estimateEUR: 3,
      },
      {
        category: 'activities',
        label: 'Kök-Töben köysirata',
        estimateEUR: 5,
      },
    ],
  },
  {
    region: 'almaty-region',
    label: 'Almatyn alue (luontoretket)',
    perDayEUR: { low: 60, mid: 100, high: 160 },
    items: [
      {
        category: 'transport',
        label: 'Kuljettaja Charyniin / Kolsaihin (1 päivä)',
        estimateEUR: 80,
        note: 'Jaettuna kahdelle = 40 € / hlö.',
      },
      {
        category: 'activities',
        label: 'Altyn-Emelin sisäänpääsy + opas',
        estimateEUR: 50,
      },
      {
        category: 'lodging',
        label: 'Guesthouse Satyssa per yö',
        estimateEUR: 25,
      },
    ],
  },
  {
    region: 'astana',
    label: 'Astana',
    perDayEUR: { low: 45, mid: 75, high: 130 },
    items: [
      {
        category: 'lodging',
        label: 'Hotelli per yö (Astana on hintavampi)',
        estimateEUR: 55,
      },
      {
        category: 'food',
        label: 'Illallinen ravintolassa',
        estimateEUR: 14,
      },
      {
        category: 'activities',
        label: 'Baiterek-tornin pääsy',
        estimateEUR: 5,
      },
    ],
  },
  {
    region: 'turkistan',
    label: 'Turkistan',
    perDayEUR: { low: 30, mid: 55, high: 95 },
    items: [
      {
        category: 'lodging',
        label: 'Guesthouse per yö',
        estimateEUR: 25,
      },
      {
        category: 'food',
        label: 'Ruoka per päivä',
        estimateEUR: 10,
      },
      {
        category: 'activities',
        label: 'Mausoleumin pääsy',
        estimateEUR: 2,
      },
    ],
  },
  {
    region: 'mangystau',
    label: 'Mangystau (4WD-kierros)',
    perDayEUR: { low: 120, mid: 180, high: 280 },
    items: [
      {
        category: 'transport',
        label: '4WD + kuljettaja per päivä (jaettu autoon)',
        estimateEUR: 100,
        note: '2–4 hlö autossa, hinta per hlö laskee jaettuna.',
      },
      {
        category: 'lodging',
        label: 'Yöpyminen jurtassa / kuljettajan järjestämä',
        estimateEUR: 30,
      },
      {
        category: 'activities',
        label: 'Mangystau-kierros (3–4 päivää) — pakettihinta',
        estimateEUR: 400,
      },
    ],
  },
];
