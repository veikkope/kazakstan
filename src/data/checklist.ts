import type { ChecklistItem } from '@/lib/types';

export const beforeTripChecklist: ChecklistItem[] = [
  // Dokumentit
  {
    id: 'passport-validity',
    category: 'documents',
    label: 'Passi voimassa vähintään 6 kk yli paluupäivän',
    daysBeforeTrip: 90,
  },
  {
    id: 'passport-copies',
    category: 'documents',
    label: 'Passin kopiot pilveen ja erilliseen taskuun',
    daysBeforeTrip: 14,
  },
  {
    id: 'travel-insurance',
    category: 'documents',
    label: 'Matkavakuutus voimassa Kazakstaniin',
    detail: 'Tarkista että kattaa vuoristoaktiviteetit ja Mangystaun off-roadin.',
    daysBeforeTrip: 30,
  },

  // Terveys
  {
    id: 'vaccines',
    category: 'health',
    label: 'Peruskattorokotukset kunnossa (jäykkäkouristus, hepatiitti A)',
    detail: 'Konsultoi matkailulääkäriä jos käytte Mangystaussa tai syrjäisillä alueilla.',
    daysBeforeTrip: 60,
  },
  {
    id: 'meds',
    category: 'health',
    label: 'Peruslääkkeet (kipulääke, ripulilääke, antibakteerivoide)',
    daysBeforeTrip: 7,
  },
  {
    id: 'altitude',
    category: 'health',
    label: 'Korkeanpaikan tutorial — BAO ja Shymbulak ovat yli 2500 m',
    daysBeforeTrip: 14,
  },

  // Raha
  {
    id: 'card-foreign-use',
    category: 'money',
    label: 'Pankkikortin ulkomaankäyttö aktivoitu',
    detail: 'Tarkista että kortilla on riittävä päiväraja KZT-nostoihin.',
    daysBeforeTrip: 14,
  },
  {
    id: 'backup-card',
    category: 'money',
    label: 'Varakortti (eri pankki) mukana',
    daysBeforeTrip: 7,
  },
  {
    id: 'cash-kzt',
    category: 'money',
    label: 'Pieni KZT-käteismäärä lentokentältä saapuessa',
    detail: 'Yandex-taksin alkulasku on usein noin 3000–5000 ₸.',
    daysBeforeTrip: 1,
  },

  // Tekniikka
  {
    id: 'esim',
    category: 'tech',
    label: 'eSIM Kazakstaniin (Airalo, Holafly tms.)',
    detail: 'Halvempi ja helpompi kuin paikallisen SIMin osto lentokentällä.',
    daysBeforeTrip: 7,
  },
  {
    id: 'yandex-go',
    category: 'tech',
    label: 'Yandex Go -sovellus asennettu ja maksutapa kytketty',
    daysBeforeTrip: 3,
  },
  {
    id: 'offline-maps',
    category: 'tech',
    label: 'Offline-kartat ladattu (Maps.me / Organic Maps)',
    detail: 'Tärkeää Mangystaussa ja vuoristossa.',
    daysBeforeTrip: 7,
  },
  {
    id: 'translate-offline',
    category: 'tech',
    label: 'Google Translate offline-paketit (kazakki, venäjä)',
    daysBeforeTrip: 7,
  },
  {
    id: 'power-adapter',
    category: 'tech',
    label: 'Verkkoadapteri — Kazakstan käyttää C/F-tyypin pistorasioita',
    detail: 'Sama kuin Suomessa, mutta varmista varmuuden vuoksi.',
    daysBeforeTrip: 14,
  },

  // Pakkaus
  {
    id: 'layering',
    category: 'packing',
    label: 'Kerrosvaatetus — vuoristossa voi olla 20 °C kylmempää kuin kaupungissa',
    daysBeforeTrip: 14,
  },
  {
    id: 'sun-protection',
    category: 'packing',
    label: 'Aurinkosuoja, päähine ja huulirasva',
    detail: 'UV on korkea aavikolla ja vuorilla.',
    daysBeforeTrip: 7,
  },
  {
    id: 'sturdy-shoes',
    category: 'packing',
    label: 'Kunnon kävelykengät (vuoristoreitit ovat kivisiä)',
    daysBeforeTrip: 7,
  },
  {
    id: 'modest-clothes',
    category: 'packing',
    label: 'Pyhäkköihin sopivat peittävät vaatteet',
    detail: 'Naisilla huivi mausoleumikäynteihin.',
    daysBeforeTrip: 7,
  },

  // Logistiikka
  {
    id: 'flights-booked',
    category: 'logistics',
    label: 'Lennot varattu (Helsinki–Almaty edestakaisin)',
    daysBeforeTrip: 90,
  },
  {
    id: 'first-night',
    category: 'logistics',
    label: 'Ensimmäisen yön majoitus varattu',
    daysBeforeTrip: 30,
  },
  {
    id: 'mangystau-tour',
    category: 'logistics',
    label: 'Mangystau-kierroksen kuljettaja/opas varattu (jos reitillä)',
    detail: 'Hyviä kuljettajia on rajallisesti — varaa hyvissä ajoin.',
    daysBeforeTrip: 60,
  },
  {
    id: 'border-permit',
    category: 'logistics',
    label: 'Rajavyöhykelupa BAO:lle (jos reitillä)',
    detail: 'Sääntö muuttuu — tarkista nykyinen tilanne.',
    daysBeforeTrip: 30,
  },
];
