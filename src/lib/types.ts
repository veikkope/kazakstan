export type Category = 'nature' | 'culture' | 'food' | 'nightlife';

export type Region =
  | 'almaty'
  | 'almaty-region'
  | 'astana'
  | 'turkistan'
  | 'shymkent'
  | 'mangystau'
  | 'other';

export type Difficulty = 'easy' | 'moderate' | 'hard';
export type BudgetLevel = 'low' | 'mid' | 'high';
export type SightStatus = 'verified' | 'draft';

/** 0–5 star rating dimensions used by the place-rater agent. */
export interface SightRatings {
  /** Kuinka tunnettu/käyty kohde on. 5 = pakollinen klassikko. */
  popularity: number;
  /** Kuinka paljon mielenkiintoista nähtävää/tehtävää. */
  interest: number;
  /** Kuinka erikoinen/uniikki kohde on muihin verrattuna. */
  uniqueness: number;
  /** ISO-8601 päivä jolloin arvostelu tehtiin. */
  ratedAt: string;
  /** 1–2 lauseen perustelu arvioille. */
  rationale?: string;
}

export type SortDimension = 'default' | 'popular' | 'interesting' | 'unique';

export interface Coords {
  lat: number;
  lng: number;
}

/** Attribution metadata for an externally-licensed image (CC-BY etc.). */
export interface ImageAttribution {
  /** Lähdesivun URL (Wikimedia Commons -tiedostosivu, Flickr-sivu, jne.). */
  sourceUrl: string;
  /** Lähteen nimi näytettäväksi, esim. 'Wikimedia Commons'. */
  source: string;
  /** Kuvan tekijä — CC-BY-lisenssi vaatii. */
  author?: string;
  /** Lisenssin lyhytkoodi, esim. 'CC BY-SA 4.0'. */
  license?: string;
}

export interface Sight {
  id: string;
  slug: string;
  name: string;
  nameLocal?: string;
  category: Category;
  region: Region;
  city?: string;
  tags?: string[];
  coords: Coords;
  shortDescription: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageAttribution?: ImageAttribution;
  bestMonths?: number[];
  travelTimeFromAlmatyHours?: number;
  travelTimeFromAstanaHours?: number;
  difficulty?: Difficulty;
  needsCar?: boolean;
  needsGuide?: boolean;
  budgetLevel?: BudgetLevel;
  timeNeededHours?: number;
  combinesWith?: string[];
  openingHours?: string;
  costKZT?: number | 'free';
  practicalTips?: string[];
  bestSeason?: string;
  /** Lyhyt 1–2 lauseen historiallinen tausta — `sight-enricher` täyttää. */
  historicalContext?: string;
  /** 0–5 tähtiarvosanat kolmella ulottuvuudella — `place-rater` täyttää. */
  ratings?: SightRatings;
  /** Polku tutkimusraporttiin: `src/research/<researchSlug>.md`. Oletus: sight.slug. */
  researchSlug?: string;
  /** ISO-päivä jolloin `sight-enricher` viimeksi koski tähän entryyn. */
  lastEnriched?: string;
  status: SightStatus;
  featured?: boolean;
}

export type TransportMode = 'plane' | 'train' | 'car' | 'bus' | 'taxi' | 'walk';

export interface TransportLeg {
  mode: TransportMode;
  from?: string;
  to?: string;
  note?: string;
}

export interface Accommodation {
  name?: string;
  city: string;
  note?: string;
}

/**
 * Lukittuja tapahtumia päivässä — lennot, junat, kuljettaja-pickupit yms.
 * Eroaa transport-legeistä siinä että voi kuvata mitä tahansa kiinteää tapahtumaa.
 */
export type AnchorKind =
  | 'flight'
  | 'train'
  | 'drive'
  | 'arrival'
  | 'departure'
  | 'tour'
  | 'checkin'
  | 'checkout';

export type BookingUrgency = 'now' | 'week-before' | 'on-arrival' | 'walk-in';

export interface AnchorEvent {
  /** "03:00", "aamu", "iltapäivä" — vapaa tekstikenttä */
  time?: string;
  kind: AnchorKind;
  /** Lyhyt kuvaus, esim "Lento Helsinki → Aqtau" tai "Pickup kuljettajalta" */
  label: string;
  /** Booking-kiireellisyys — auttaa /tanaan-näkymää näyttämään mitä on pakko varata nyt */
  urgency?: BookingUrgency;
}

/**
 * Vaihtoehtoinen päivän plan jota voi puntaroida paikan päällä.
 * Reissua varten kun ei haluta lukita asioita etukäteen.
 */
export interface DayAlternative {
  title: string;
  summary: string;
  /** Trade-off lyhyesti, esim "+ syvempi kokemus / − vie ekstrayö" */
  tradeoff?: string;
  sightIds?: string[];
}

/**
 * Majoitusvinkki ilman lukittua varausta — appi on päätöstyökalu, ei kalenteri.
 */
export interface LodgingHint {
  /** Suositeltu alue/kaupunginosa, esim "Aqtau Mikrorajon-3 keskustassa" */
  area: string;
  /** [min, max] EUR per yö per huone (kahden hengen) */
  priceRangeEUR: [number, number];
  /** Mistä varata, esim ['Booking.com', 'Ostrovok', 'paikallinen guesthouse'] */
  bookingApps: string[];
  /** Vinkki, esim "Kysele aikaista check-iniä — saapuminen yöllä" */
  note?: string;
}

export interface ItineraryDay {
  day: number;
  date?: string;
  title: string;
  summary: string;
  sightIds: string[];
  transport?: TransportLeg[];
  /** Vanha kenttä — preseteissä yhä käytössä. Uusissa entryissä suositaan `lodgingHint` + `sleepCity`. */
  accommodation?: Accommodation;
  notes?: string;

  // === Operatiiviset kentät (käytä userItineraryssä) ===
  /** Missä kaupungissa ollaan päivän aikana */
  city?: string;
  /** Missä kaupungissa nukutaan tämän päivän iltana */
  sleepCity?: string;
  /** Lukitut tapahtumat (lennot, kuljettaja-pickupit, check-in/out) */
  anchors?: AnchorEvent[];
  /** Pääsuunnitelma yhdellä lauseella */
  primaryPlan?: string;
  /** Vaihtoehtoiset planit joita voi puntaroida päivän mittaan */
  alternatives?: DayAlternative[];
  /** Plan B jos pääsuunnitelma kaatuu (sää, kuljettaja, terveys) */
  backupPlan?: string;
  /** Majoitusvihje — ei varaus */
  lodgingHint?: LodgingHint;
  /** Arvio käteisen tarpeesta päivän aikana, KZT */
  cashKZT?: number;
  /** Tarvitaanko kuljettaja/4WD */
  driverNeeded?: boolean;
  /** Aikainen herätys huomenna (esim. yölento tai aamuretki) */
  earlyWakeRisk?: boolean;
  /** Offline-huomio: lataa kartat etukäteen, signaalia ei välttämättä ole */
  offlineNote?: string;
}

export type PresetTheme = 'nature' | 'culture' | 'epic-roadtrip';

export interface Preset {
  id: string;
  title: string;
  theme: PresetTheme;
  durationDays: number;
  shortDescription: string;
  whoFor: string;
  highlights: string[];
  days: ItineraryDay[];
  estimatedBudgetEUR: { low: number; mid: number };
  notes?: string;
}

export type BudgetCategory =
  | 'flights'
  | 'lodging'
  | 'food'
  | 'transport'
  | 'activities'
  | 'misc';

export interface BudgetItem {
  category: BudgetCategory;
  label: string;
  estimateEUR: number;
  note?: string;
}

export interface BudgetByRegion {
  region: Region | 'general';
  label: string;
  perDayEUR: { low: number; mid: number; high: number };
  items: BudgetItem[];
}

export interface VisaInfo {
  countryOfCitizen: string;
  visaFree: boolean;
  visaFreeDays?: number;
  notes: string;
  lastVerified: string;
  sourceUrl?: string;
}

export type ChecklistCategory =
  | 'documents'
  | 'health'
  | 'money'
  | 'tech'
  | 'packing'
  | 'logistics';

export interface ChecklistItem {
  id: string;
  category: ChecklistCategory;
  label: string;
  detail?: string;
  daysBeforeTrip?: number;
}

export type ShortlistStatus = 'considering' | 'in' | 'out';

export interface ShortlistEntry {
  sightId: string;
  status: ShortlistStatus;
}
