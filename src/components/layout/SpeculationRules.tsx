/**
 * Tells supporting browsers (Chrome 121+ / Edge) to prerender sight-detail
 * pages the moment the user hovers or starts to touch a link to one. With
 * the view-transition morph already in place, navigation feels effectively
 * instant — by the time the press completes, the destination is rendered
 * in a hidden tab and just gets swapped in.
 *
 * `moderate` eagerness was chosen over `eager` because we have ~300 sight
 * URLs; eagerly prerendering all visible links would blow the per-page
 * memory cap (Chrome enforces it and silently drops excess). `moderate`
 * defers until a hover/touchstart heuristic fires, which still gives a
 * ~50–200 ms head start before the click commits.
 *
 * Safari and Firefox ignore the script — graceful no-op, no polyfill needed.
 *
 * The pattern `/*\/sights/*` matches `/<locale>/sights/<slug>` because each
 * `*` consumes exactly one path segment (no slashes). Plain `/sights/` list
 * pages, the map, and the home page are all excluded.
 */
export default function SpeculationRules() {
  const rules = {
    prerender: [
      {
        where: { href_matches: '/*/sights/*' },
        eagerness: 'moderate',
      },
    ],
  };
  return (
    <script
      type="speculationrules"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(rules) }}
    />
  );
}
