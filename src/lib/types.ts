export type Category = 'nature' | 'culture' | 'food' | 'nightlife';

export type Region =
  | 'almaty'
  | 'almaty-region'
  | 'astana'
  | 'turkistan'
  | 'shymkent'
  | 'aktau'
  | 'other';

export type Difficulty = 'easy' | 'moderate' | 'hard';
export type BudgetLevel = 'low' | 'mid' | 'high';
/** Cross-cutting activity tag (orthogonal to `category`) for outdoor
 *  destinations researched as hikes/summits. Extensible union. */
export type Activity = 'hike';

/* ============================================================
 * i18n primitives
 * ------------------------------------------------------------
 * `Locale` is the canonical list of supported app locales. Every public
 * URL is prefixed with one of these (`/fi`, `/en`, `/ru`, `/kk`).
 *
 * `LocalizedString` represents a content string available in every locale.
 * All four keys are REQUIRED so TypeScript prevents translation drift at
 * compile time — if a contributor adds a sight in Finnish only, the build
 * fails until they add the other three locales.
 *
 * `TranslatableString` is an alias for `LocalizedString` kept so that
 * existing interfaces don't need bulk renaming. All data has been migrated
 * to localized objects — TypeScript now prevents plain-string drift.
 * ============================================================ */

export type Locale = 'fi' | 'en' | 'ru' | 'kk';

export const SUPPORTED_LOCALES: readonly Locale[] = ['fi', 'en', 'ru', 'kk'];

export interface LocalizedString {
  fi: string;
  en: string;
  ru: string;
  kk: string;
}

/** Alias for `LocalizedString`. All content is fully localized. */
export type TranslatableString = LocalizedString;

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
  /** Localised name. Read via `localised(sight.name, locale)`. */
  name: TranslatableString;
  /** Optional native-language form (e.g. Kazakh/Russian original). Locale-agnostic. */
  nameLocal?: string;
  category: Category;
  region: Region;
  /** Optional activity tag — flags outdoor hike/summit destinations so the
   *  map marker shows an emoji pin and the list/detail get a "Vaellus" badge. */
  activity?: Activity;
  /** City name. Often a place name that's locale-stable (Almaty, Astana). */
  city?: TranslatableString;
  tags?: string[];
  coords: Coords;
  /** Localised short description (~140 chars). Used in popups and list rows. */
  shortDescription: TranslatableString;
  /** Localised long description (1–3 paragraphs). */
  description: TranslatableString;
  image?: string;
  imageAlt?: TranslatableString;
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
  openingHours?: TranslatableString;
  costKZT?: number | 'free';
  /** Localised practical tips. Each tip is independently translated. */
  practicalTips?: TranslatableString[];
  bestSeason?: TranslatableString;
  /** Lyhyt 1–2 lauseen historiallinen tausta — `sight-enricher` täyttää. */
  historicalContext?: TranslatableString;
  /** 0–5 tähtiarvosanat kolmella ulottuvuudella — `place-rater` täyttää. */
  ratings?: SightRatings;
  /** Polku tutkimusraporttiin: `src/research/<researchSlug>.md`. Oletus: sight.slug. */
  researchSlug?: string;
  /** ISO-päivä jolloin `sight-enricher` viimeksi koski tähän entryyn. */
  lastEnriched?: string;
  featured?: boolean;
}

/**
 * Logistiikkapiste kartalla — vuokra-auto, lentokenttä, hotelli yms.
 * Ei nähtävyys, ei näy listoissa/preseteissä — vain karttamerkki joka pysyy
 * näkyvissä kategoriasuotimien yli.
 */
export type TripPinKind = 'rental-car' | 'airport' | 'hotel' | 'meeting-point';

export interface TripPin {
  id: string;
  kind: TripPinKind;
  /** Already locale-resolved at construction time — TripPins are ephemeral runtime objects. */
  title: string;
  subtitle?: string;
  coords: Coords;
  /** Already locale-resolved at construction time. */
  details?: string[];
  href?: string;
  hrefLabel?: string;
}

export type TransportMode = 'plane' | 'train' | 'car' | 'bus' | 'taxi' | 'walk';

export interface TransportLeg {
  mode: TransportMode;
  from?: TranslatableString;
  to?: TranslatableString;
  note?: TranslatableString;
}

export interface Accommodation {
  name?: TranslatableString;
  city: TranslatableString;
  note?: TranslatableString;
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
  time?: TranslatableString;
  kind: AnchorKind;
  /** Lyhyt kuvaus, esim "Lento Helsinki → Aqtau" tai "Pickup kuljettajalta" */
  label: TranslatableString;
  /** Booking-kiireellisyys — auttaa /tanaan-näkymää näyttämään mitä on pakko varata nyt */
  urgency?: BookingUrgency;
}

/**
 * Vaihtoehtoinen päivän plan jota voi puntaroida paikan päällä.
 * Reissua varten kun ei haluta lukita asioita etukäteen.
 */
export interface DayAlternative {
  title: TranslatableString;
  summary: TranslatableString;
  /** Trade-off lyhyesti, esim "+ syvempi kokemus / − vie ekstrayö" */
  tradeoff?: TranslatableString;
  sightIds?: string[];
}

/**
 * Majoitusvinkki ilman lukittua varausta — appi on päätöstyökalu, ei kalenteri.
 */
export interface LodgingHint {
  /** Suositeltu alue/kaupunginosa, esim "Aqtau Mikrorajon-3 keskustassa" */
  area: TranslatableString;
  /** [min, max] EUR per yö per huone (kahden hengen) */
  priceRangeEUR: [number, number];
  /** Mistä varata, esim ['Booking.com', 'Ostrovok', 'paikallinen guesthouse'] */
  bookingApps: string[];
  /** Vinkki, esim "Kysele aikaista check-iniä — saapuminen yöllä" */
  note?: TranslatableString;
}

export interface ItineraryDay {
  day: number;
  date?: string;
  title: TranslatableString;
  summary: TranslatableString;
  sightIds: string[];
  transport?: TransportLeg[];
  /** Vanha kenttä — preseteissä yhä käytössä. Uusissa entryissä suositaan `lodgingHint` + `sleepCity`. */
  accommodation?: Accommodation;
  notes?: TranslatableString;

  // === Operatiiviset kentät (käytä userItineraryssä) ===
  /** Missä kaupungissa ollaan päivän aikana */
  city?: TranslatableString;
  /** Missä kaupungissa nukutaan tämän päivän iltana */
  sleepCity?: TranslatableString;
  /** Lukitut tapahtumat (lennot, kuljettaja-pickupit, check-in/out) */
  anchors?: AnchorEvent[];
  /** Pääsuunnitelma yhdellä lauseella */
  primaryPlan?: TranslatableString;
  /** Vaihtoehtoiset planit joita voi puntaroida päivän mittaan */
  alternatives?: DayAlternative[];
  /** Plan B jos pääsuunnitelma kaatuu (sää, kuljettaja, terveys) */
  backupPlan?: TranslatableString;
  /** Majoitusvihje — ei varaus */
  lodgingHint?: LodgingHint;
  /** Arvio käteisen tarpeesta päivän aikana, KZT */
  cashKZT?: number;
  /** Tarvitaanko kuljettaja/4WD */
  driverNeeded?: boolean;
  /** Aikainen herätys huomenna (esim. yölento tai aamuretki) */
  earlyWakeRisk?: boolean;
  /** Offline-huomio: lataa kartat etukäteen, signaalia ei välttämättä ole */
  offlineNote?: TranslatableString;
}

export type PresetTheme = 'nature' | 'culture' | 'epic-roadtrip';

export interface Preset {
  id: string;
  title: TranslatableString;
  theme: PresetTheme;
  durationDays: number;
  shortDescription: TranslatableString;
  whoFor: TranslatableString;
  highlights: TranslatableString[];
  days: ItineraryDay[];
  estimatedBudgetEUR: { low: number; mid: number };
  notes?: TranslatableString;
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
  label: TranslatableString;
  estimateEUR: number;
  note?: TranslatableString;
}

export interface BudgetByRegion {
  region: Region | 'general';
  label: TranslatableString;
  perDayEUR: { low: number; mid: number; high: number };
  items: BudgetItem[];
}

export interface VisaInfo {
  countryOfCitizen: TranslatableString;
  visaFree: boolean;
  visaFreeDays?: number;
  notes: TranslatableString;
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
  label: TranslatableString;
  detail?: TranslatableString;
  daysBeforeTrip?: number;
}

export interface ShortlistEntry {
  sightId: string;
  /**
   * Top-pick / "suosikki" flag. The shortlist itself is the "saved" bucket;
   * this lifts a sight to a tighter "must do" subset (a handful per trip).
   * `undefined` / `false` = regular shortlist entry.
   */
  priority?: boolean;
  /**
   * ISO-8601 date when the sight was marked as visited.
   * `undefined` means not visited. Stored in localStorage only — kept out
   * of the share URL so visit progress stays private to the device.
   */
  visitedAt?: string;
}
