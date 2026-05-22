// Sisäiset siirtymät Suomi → Aqtau → Almaty → Astana → Suomi.
// Sovellus on päätöstuki — esitetään vaihtoehdot puolueettomasti pros/cons-listoilla.

import type { TransportMode } from '@/lib/types';

export interface TransportOption {
  mode: TransportMode;
  /** Operaattori jos relevantti, esim 'Air Astana', 'FlyArystan', 'Kazakhstan Railways (Talgo)' */
  operator?: string;
  /** Kesto vapaana tekstinä, esim "1 h 45 min" tai "13–18 h" */
  duration: string;
  /** Hintahaarukka EUR per henkilö */
  priceRangeEUR: [number, number];
  /** Hyödyt — lyhyt lista */
  pros: string[];
  /** Haitat — lyhyt lista */
  cons: string[];
  /** Mistä varata, esim 'flyarystan.com', 'bilet.railways.kz' */
  bookVia?: string;
  /** Booking-kiireellisyys */
  bookWhen?: 'now' | 'week-before' | 'on-arrival' | 'walk-in';
}

export interface TransportLegInfo {
  id: string;
  from: string;
  to: string;
  /** Lyhyt kuvaus mistä on kyse */
  context: string;
  options: TransportOption[];
  /** Suositus — kerro mikä on todennäköisesti paras valinta ja miksi */
  recommendation: string;
  lastVerified: string;
}

export const transportLegs: TransportLegInfo[] = [
  // ============== Helsinki → Aqtau ==============
  {
    id: 'helsinki-aqtau',
    from: 'Helsinki',
    to: 'Aqtau',
    context:
      'Suora yhteys Suomesta Aqtauhun on harvinaista — yleensä vaihto Istanbulissa, Frankfurtissa tai Dubaissa. Saapuminen Aqtauhun usein yöllä klo 02–06.',
    options: [
      {
        mode: 'plane',
        operator: 'Turkish Airlines (vaihto Istanbul)',
        duration: '8–11 h kokonaiskesto',
        priceRangeEUR: [350, 600],
        pros: ['Yleisin reitti', 'Hyvät vaihtoyhteydet', 'Suomen kielinen henkilökunta usein saatavilla'],
        cons: ['Pitkä välilasku', 'Yösaapuminen Aqtauhun'],
        bookVia: 'turkishairlines.com / Finnair-yhteistyö',
        bookWhen: 'now',
      },
      {
        mode: 'plane',
        operator: 'Lufthansa (vaihto Frankfurt)',
        duration: '9–13 h',
        priceRangeEUR: [400, 700],
        pros: ['Eurooppalainen palvelutaso', 'Joskus halvempi kuin Turkish'],
        cons: ['Pitkät vaihtoajat', 'Frankfurt-tikkari on ruuhkainen'],
        bookWhen: 'now',
      },
      {
        mode: 'plane',
        operator: 'flydubai (vaihto Dubai)',
        duration: '10–14 h',
        priceRangeEUR: [380, 650],
        pros: ['Etelän kautta hyvät yhteydet', 'Dubain lentokenttä modernein'],
        cons: ['Pitkä vaihto', 'Aikavyöhykemuutos rasittavampi'],
        bookWhen: 'now',
      },
    ],
    recommendation:
      'Turkish Airlines Istanbulin kautta on yleisimmin paras yhdistelmä hintaa ja vaihtoaikoja. Varaa nyt — kesäkuu on huippusesonki ja hinnat nousevat lähemmäs lähtöä.',
    lastVerified: '2026-05-21',
  },

  // ============== Aqtau → Almaty ==============
  {
    id: 'aqtau-almaty',
    from: 'Aqtau',
    to: 'Almaty',
    context:
      'Vain lento — junayhteys vie 50+ tuntia. Kolme kotimaista operaattoria, yhteensä useita vuoroja päivässä. Kesäkuussa hinnat huipussaan.',
    options: [
      {
        mode: 'plane',
        operator: 'Air Astana',
        duration: '3 h 10 min suoraan',
        priceRangeEUR: [80, 150],
        pros: ['Maan päälentoyhtiö', 'Sisältyy ruoka + 23 kg matkatavara', 'Luotettava aikataulu'],
        cons: ['Kallein vaihtoehto', 'Vähemmän vuoroja kuin FlyArystan'],
        bookVia: 'airastana.com',
        bookWhen: 'week-before',
      },
      {
        mode: 'plane',
        operator: 'FlyArystan',
        duration: '3 h 10 min suoraan',
        priceRangeEUR: [50, 110],
        pros: ['Halvin vaihtoehto', 'Useita vuoroja päivässä', 'Yölento Almatysta klo 21:25 → Aqtau 00:45 (ja päinvastoin)'],
        cons: ['Käsimatkatavara vain 5 kg, ruumaan maksu', 'Air Astanan tytäryhtiö mutta low-cost-malli'],
        bookVia: 'flyarystan.com',
        bookWhen: 'week-before',
      },
      {
        mode: 'plane',
        operator: 'SCAT Airlines',
        duration: '3 h 15 min',
        priceRangeEUR: [60, 130],
        pros: ['Kotimainen pelaaja', 'Kohtuuhinta'],
        cons: ['Vanhempi kalusto', 'Aikataulu ei aina pidä'],
        bookVia: 'scat.kz',
        bookWhen: 'week-before',
      },
    ],
    recommendation:
      'FlyArystan iltapäivä- tai iltalennolla — halvin ja säilyttää koko Aqtau-päivän käyttöön. Jos matkatavaraa on paljon, Air Astana sisältää 23 kg ruumaan ja yhteishinta voi olla samaa luokkaa.',
    lastVerified: '2026-05-21',
  },

  // ============== Almaty → Astana ==============
  {
    id: 'almaty-astana',
    from: 'Almaty',
    to: 'Astana',
    context:
      'Kaksi käytännön vaihtoehtoa: lento (~2 h) tai Talgo-yöjuna (~13–18 h). Juna säästää hotelliyön ja on selvästi halvempi, mutta vie kokonaisen päivän/yön.',
    options: [
      {
        mode: 'plane',
        operator: 'Air Astana / FlyArystan / SCAT',
        duration: '1 h 45 min',
        priceRangeEUR: [50, 100],
        pros: ['Nopein', '5+ vuoroa päivässä', 'Hyvä jos vapaa-aika rajallista'],
        cons: ['Lentokenttäaika syö nopeusedun', 'Hotelliyö Astanassa erikseen'],
        bookVia: 'aviata.kz / flyarystan.com',
        bookWhen: 'week-before',
      },
      {
        mode: 'train',
        operator: 'Kazakhstan Railways — Talgo (nopea yöjuna)',
        duration: '11–13 h (Talgo) — 18 h (tavallinen)',
        priceRangeEUR: [25, 60],
        pros: [
          'Säästää hotelliyön',
          'Talgo-business kupé (4 hengen) noin 35 €',
          'Kokemus sinänsä — kazakkilaisen maaston pituus tuntuu',
          'Kesäkuussa viilennettyä — hyvä matkata yötä päivän kuumalle',
        ],
        cons: ['Vie kokonaisen yön', 'Vain Astana-asemalle (siirtymä keskustaan erikseen)', 'Matkatavarat hihnoilla'],
        bookVia: 'bilet.railways.kz',
        bookWhen: 'week-before',
      },
    ],
    recommendation:
      'Talgo-yöjuna on tämän reissun "secret weapon" — säästää sekä hotelliyön (~60 €) että lentolipun (~70 €). Lähtee Almatysta noin 23:00, saapuu Astanaan aamulla. Käytännössä reissun budjetti-ja-aikatehokkain ratkaisu, mikäli yöuni junassa on ok. Jos taas haluaa edes yhden ylimääräisen päivän Almatyssa, ota aamulento.',
    lastVerified: '2026-05-21',
  },

  // ============== Astana → Helsinki (paluu) ==============
  {
    id: 'astana-helsinki',
    from: 'Astana',
    to: 'Helsinki',
    context:
      'Astanasta on enemmän kansainvälisiä yhteyksiä kuin Aqtausta. Vaihto Istanbulissa, Frankfurtissa tai Dubaissa. Vältä paluulennon viime hetken varausta — kesäkuun loppu on kalliimpi.',
    options: [
      {
        mode: 'plane',
        operator: 'Turkish Airlines (Istanbul-vaihto)',
        duration: '8–11 h',
        priceRangeEUR: [350, 600],
        pros: ['Yleisin reitti', 'Joustavat aikataulut', 'Hyvä vaihtoaika'],
        cons: ['Istanbulin lentokenttä iso ja ruuhkainen'],
        bookWhen: 'now',
      },
      {
        mode: 'plane',
        operator: 'Lufthansa / KLM (Frankfurt / Amsterdam)',
        duration: '9–13 h',
        priceRangeEUR: [400, 700],
        pros: ['Eurooppalaiset palvelut', 'Schengen-yhteys helppo'],
        cons: ['Joskus pitkät vaihdot'],
        bookWhen: 'now',
      },
      {
        mode: 'plane',
        operator: 'Air Astana — suora Astana–Frankfurt + jatko',
        duration: '10–12 h',
        priceRangeEUR: [400, 650],
        pros: ['Yksi vaihto', 'Operaattori tuntee KZ-puolen'],
        cons: ['Hinta vaihtelee'],
        bookWhen: 'now',
      },
    ],
    recommendation:
      'Astanasta paluu on loogisempi kuin Almatysta — säästät yhden sisäisen lennon. Varaa molemmat lennot (Helsinki→Aqtau + Astana→Helsinki) samalla operaattorilla tai liittolaisparilla, jolloin saat reklamaatioturvaa jos toinen viivästyy.',
    lastVerified: '2026-05-21',
  },
];

/** Kuljettaja-info Mangystaun retkille (1–3 päivän versiot). */
export interface DriverTripOption {
  durationDays: number;
  title: string;
  /** Mitä ehtii — pääkohteet */
  includes: string[];
  /** Päivähinta-arvio per ryhmä (4WD + kuljettaja), EUR */
  pricePerDayEUR: [number, number];
  pros: string[];
  cons: string[];
}

export const mangystauDriverOptions: DriverTripOption[] = [
  {
    durationDays: 1,
    title: '1-päivän express',
    includes: ['Sherkala-vuori TAI Pallolaakso (Torysh)', 'paluu Aqtauhun illaksi'],
    pricePerDayEUR: [120, 180],
    pros: ['Säästää aikaa muille kaupungeille', 'Halvin majoitus (vain Aqtau)', 'Sopii jos jaksaminen rajallista'],
    cons: ['Ei näe Bozzhyraa (liian kaukana)', 'Pitkä autopäivä', 'Ei sukella erämaaan tunnelmaan'],
  },
  {
    durationDays: 2,
    title: '2-päivän klassikko (suositus)',
    includes: ['Bozzhyra', 'Sherkala', 'Tuzbair tai Pallolaakso', 'yö jurttassa tai Shetpe-kylässä'],
    pricePerDayEUR: [110, 160],
    pros: ['Kattaa Mangystaun pää-ikoonit', 'Yö erämaassa = tähtitaivas', 'Kustannustehokas EUR/kohde'],
    cons: ['Toinen päivä paluu vie energian', 'Yön mukavuus vaihtelee'],
  },
  {
    durationDays: 3,
    title: '3-päivän syvempi',
    includes: ['Bozzhyra', 'Sherkala', 'Tuzbair', 'Beket-Atan luolamoskeija', 'Kyzylkup (Linnanlaakso)', '2 yötä erämaassa'],
    pricePerDayEUR: [100, 150],
    pros: ['Näkee kaikki pääikoonit', 'Levollisempi rytmi', 'Halvempi EUR/päivä isossa ryhmässä'],
    cons: ['Vie 3 päivää 14 päivän reissusta', 'Vaatii hyvän kunnon ja unen joustavuuden', 'Kuumassa kesäkuussa rasittava'],
  },
];

/** Mangystau-alueen 4WD-operaattori, vahvistettu yhteystiedoilla ja hintaesimerkillä. */
export interface MangystauOperator {
  /** Operaattorin nimi sellaisena kuin se mainostaa itseään. */
  name: string;
  /** Tärkein virallinen sivu. */
  website?: string;
  /** WhatsApp-numero kansainvälisellä prefix-muotoilulla — priorisoi tämä koska toimii Kazakstanissa. */
  whatsapp?: string;
  /** Telegram, jos eri kuin WhatsApp. */
  telegram?: string;
  email?: string;
  /** Aktauin fyysinen toimisto-osoite jos walk-in on mahdollinen. */
  officeAddress?: string;
  /** 2 päivän retken hinta — vapaa tekstiarvio, jotta voi sisältää "per auto" / "per henki" -nuanssin. */
  twoDayPrice: string;
  /** Mitä paketti tyypillisesti sisältää. */
  includes: string[];
  /** Kielitaito kuljettajalla / oppaalla. */
  languages: string[];
  /** Maksuehdot tiivistettynä — mikä on ennakko, mikä maksetaan paikan päällä. */
  payment: string;
  /** Maine yhdellä lauseella + tärkein lähde (TripAdvisor / blogi / Caravanistan). */
  reputation: string;
  /** Erityishuomiot tai varoitukset (esim. "pyydä Nurdiyar nimeltä"). */
  caveat?: string;
}

/**
 * Konkreettiset operaattorit Mangystaun 4WD-retkelle.
 * Strategia: lähetä TOP-3:lle sama WhatsApp-briefi rinnan, varaa nopeimmin vastaava.
 * Lähde: src/research/_mangystau-operators.md (2026-05-21).
 */
export const mangystauOperators: MangystauOperator[] = [
  {
    name: 'Mangystau Tour 999',
    website: 'https://mangystautour999.kz/en/2-day',
    whatsapp: '+7 700 909 9986',
    telegram: '+7 708 513 6071',
    email: 'mangystautour999@gmail.com',
    twoDayPrice: '$900 / 4WD (auto) / 2 päivää — kahdelle $450/hlö. Englanninkielinen opas +$120 (suositus alle 6 hengen ryhmässä).',
    includes: ['4WD + kuljettaja', 'jurtta + makuupussit', 'liikkuva suihku & WC', 'käytännössä full board', 'sisäänpääsymaksut'],
    languages: ['kazakki', 'venäjä', 'englanti (erillinen opas)'],
    payment: 'Sovittavissa WhatsAppissa — tyypillisesti pieni ennakko (Wise/USD), loput käteisellä KZT.',
    reputation: 'TripAdvisor 4.9/5 (7 arvostelua 2025–2026). Reitti kattaa Torysh, Sherkala, Airakty, Bozzhyra 2-spots, Kyzylkup — pääsuositus.',
    caveat: 'Kuski Baurin englanti on rajallinen — käytä kääntäjäsovellusta tai tilaa erillinen EN-opas.',
  },
  {
    name: 'RedMaya Travel',
    website: 'https://redmaya-travel.kz/eng/tours/private/2days',
    whatsapp: '+7 771 286 9516',
    email: 'mangystau@redmaya-travel.kz',
    officeAddress: 'Urban Business Center, Office 416, 4th Floor, Aktau',
    twoDayPrice: '$152–$580/hlö (4 hengen ryhmäreferenssi). 2 hengelle korkeampi — pyydä tarjous WhatsAppissa. Englanti vain Plus/Comfort Plus -tasoilla.',
    includes: ['4WD + AC', '3 ateriaa/päivä', 'leiriytymisvarusteet', 'vakuutus', 'pullovesi'],
    languages: ['venäjä', 'kazakki', 'englanti (Plus-tasolta)'],
    payment: '20 % ennakkomaksu varaa paikan (dokumentoitu). Loput paikan päällä. Bank transfer / Stripe.',
    reputation: 'Lisensoitu yritys, virallinen toimisto. Useita 5★-arvosteluja mutta loka 2025 kolme reklamaatiota (ryhmäkoko, opas-laatu).',
    caveat: 'Pyydä eksplisiittisesti opas **Nurdiyar** tai **Saken** — laatu riippuu nimetystä oppaasta. Älä varaa Econom-pakettia jos haluat englantia.',
  },
  {
    name: 'Travel to Mangistau (Eduard Chuishbaev)',
    website: 'https://traveltomangistau.kz/',
    whatsapp: '+7 702 466 3322',
    email: 'traveltomangistau@gmail.com',
    officeAddress: 'Aktau, 11 microdistrict, building 5, office 58',
    twoDayPrice: 'Alkaen $90/hlö. Vahvista pakettisisältö 2 hengelle — täysi Bozzhyra+Tuzbair+Beket-Ata reitti vaatii todennäköisesti ylätason paketin.',
    includes: ['ateriat', 'leiriytyminen ("warm tents, hot fresh food")', 'kuljetus'],
    languages: ['englanti', 'venäjä', 'italia'],
    payment: 'Neuvoteltavissa WhatsAppissa. Pyydä Wise/bank transfer -kuitti kuluttajansuojaksi.',
    reputation: 'Pieni vakaa toimija, halvin selkeästi hinnoiteltu vaihtoehto. Vähemmän reviewejä kuin TOP-2:lla.',
  },
  {
    name: 'Indy Guide -alusta (Askhat / Gaukhar / Sergey)',
    website: 'https://indyguide.com/mangystau',
    twoDayPrice: 'Vaihtelee — alustan kautta vahvistettu hinta. Askhat Tairov ★4.9 (25 arv.), Gaukhar Yessirkepova ★5.0 (16), Sergey Khachatryan ★5.0.',
    includes: ['Riippuu kuljettajasta — vahvista chatissa ennen maksua'],
    languages: ['englanti useimmilla'],
    payment: 'Alustan kautta = escrow-suoja. Paras kuluttajansuoja näistä vaihtoehdoista.',
    reputation: 'Sveitsiläinen marketplace-alusta. Korkeat tähdet useilla Mangystau-hosteilla.',
    caveat: 'Käytä jos kuluttajansuoja on tärkein — hinta voi olla hieman korkeampi alustan provision takia.',
  },
];

/**
 * Ehdotettu Plan B jos varaus epäonnistuu Helsingistä käsin — saavu Aktauiin ilman varausta.
 * Lähde: src/research/_mangystau-operators.md
 */
export const mangystauFallbackPlan = [
  'Aqtau Airport Hotelin / Holiday Inn / Tengri Hotelin reception (24h, EN) järjestää saman päivän tour-varauksen 2–3 operaattorin kautta.',
  'Walk-in Aktaun keskustassa: Tourist LLP (mangystau-tourist.com), RedMayan toimisto, Travel to Mangistau (osoitteet logisticsissa).',
  'Indy Guide:n 24/7-chat välittää viime hetken kuljettajan alustan kautta.',
  'Älä vuokraa 4WD:tä ilman kuljettajaa Mangystaussa — reitit eivät ole Google Mapsissa, sähköttä alueella, hätätilanne hengenvaara.',
];

export const logisticsLastVerified = '2026-05-21';
