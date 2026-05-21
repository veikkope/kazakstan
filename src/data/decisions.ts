// Kahden hengen päätöstilan tagit — must / maybe / skip per kohde.
// Tallennus localStorageen kuten shortlist.

export type DecisionTag = 'must' | 'maybe' | 'skip';

export interface SightDecision {
  sightId: string;
  /** Kumman matkustajan päätös ('A' = ensimmäinen henkilö, 'B' = toinen) */
  voter: 'A' | 'B';
  tag: DecisionTag;
  /** Vapaa muistio, esim "vain hyvällä säällä" tai "halutaan aamulla" */
  note?: string;
}

/** Matkustajien nimet jotka näkyvät UI:ssa. Käyttäjä voi muuttaa myöhemmin. */
export const TRAVELERS = {
  A: 'Minä',
  B: 'Kaveri',
} as const;

export type TravelerId = keyof typeof TRAVELERS;

const LS_KEY = 'kz-trip-decisions';

/** Lue kaikki päätökset localStoragesta. SSR-turvallinen (palauttaa [] palvelimella). */
export function readDecisions(): SightDecision[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (d): d is SightDecision =>
        typeof d === 'object' &&
        d !== null &&
        typeof d.sightId === 'string' &&
        (d.voter === 'A' || d.voter === 'B') &&
        (d.tag === 'must' || d.tag === 'maybe' || d.tag === 'skip'),
    );
  } catch {
    return [];
  }
}

/** Kirjoita päätökset localStorageen. */
export function writeDecisions(decisions: SightDecision[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(decisions));
  } catch {
    // Quota tai disabloitu storage — hiljaa.
  }
}

/** Aseta tai päivitä yhden henkilön päätös yhdelle kohteelle. */
export function setDecision(
  decisions: SightDecision[],
  sightId: string,
  voter: TravelerId,
  tag: DecisionTag | null,
  note?: string,
): SightDecision[] {
  const others = decisions.filter((d) => !(d.sightId === sightId && d.voter === voter));
  if (tag === null) return others;
  return [...others, { sightId, voter, tag, note }];
}

/** Hae kohteen päätös yhdeltä henkilöltä. */
export function getDecision(
  decisions: SightDecision[],
  sightId: string,
  voter: TravelerId,
): SightDecision | undefined {
  return decisions.find((d) => d.sightId === sightId && d.voter === voter);
}

/**
 * Yhdistetty konsensus — mitä molemmat haluavat.
 * - 'both-must': molemmilla 'must' → tehdään
 * - 'one-must': vain toisella 'must' → harkitse
 * - 'maybe': vähintään toisella 'maybe', ei skipiä
 * - 'one-skip': toinen skip, toinen ok → neuvottelu
 * - 'both-skip': molemmilla 'skip' → ohitetaan
 * - 'undecided': ei päätöksiä
 */
export type Consensus =
  | 'both-must'
  | 'one-must'
  | 'maybe'
  | 'one-skip'
  | 'both-skip'
  | 'undecided';

export function getConsensus(decisions: SightDecision[], sightId: string): Consensus {
  const a = getDecision(decisions, sightId, 'A');
  const b = getDecision(decisions, sightId, 'B');
  if (!a && !b) return 'undecided';
  if (a?.tag === 'must' && b?.tag === 'must') return 'both-must';
  if (a?.tag === 'skip' && b?.tag === 'skip') return 'both-skip';
  if (a?.tag === 'skip' || b?.tag === 'skip') return 'one-skip';
  if (a?.tag === 'must' || b?.tag === 'must') return 'one-must';
  return 'maybe';
}
