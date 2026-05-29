/**
 * Rasterises the source SVG app icons to PNG variants that iOS and Android
 * install flows actually consume reliably.
 *
 * Why PNGs at all when the SVGs already exist:
 *   - iOS Safari renders `apple-touch-icon` SVG inconsistently across versions
 *     and falls back to a generic Safari favicon if it can't decode one. A
 *     180×180 PNG removes the gamble — that exact size has been the apple
 *     home-screen contract since iOS 7.
 *   - Android Chrome will accept an `any`-sized SVG in the manifest, but its
 *     installability heuristics still want a 192×192 *and* a 512×512 raster.
 *     Without them, Lighthouse flags the manifest and the install banner
 *     can be downgraded to a less prominent A2HS suggestion.
 *   - Maskable icons need a real bitmap on the manifest side so the launcher
 *     can crop into the safe area without surprises.
 *
 * The script reads the two SVG sources, picks the right one per output, and
 * writes PNGs into the same `public/icons/` directory. Idempotent — overwrites
 * are byte-stable for a given SVG input so re-running doesn't churn git.
 *
 *   pnpm run generate-icons
 *
 * Run again whenever icon.svg or icon-maskable.svg changes. PNGs are committed
 * to the repo (not built on every CI run) because the SVG sources change maybe
 * once a year and sharp's native binding makes CI flaky on some platforms.
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const ICONS_DIR = path.join('public', 'icons');
const ANY_SRC = path.join(ICONS_DIR, 'icon.svg');
const MASKABLE_SRC = path.join(ICONS_DIR, 'icon-maskable.svg');

/**
 * Each target raster: which SVG it's derived from, the output filename,
 * and the side length in CSS pixels. Density is 1× because we render the
 * SVG straight into the requested pixel grid (no extra subsampling).
 */
const TARGETS = [
  // iOS Safari home-screen — must be exactly this filename + size for the
  // 180×180 to be picked up reliably across iOS 13–18.
  { src: ANY_SRC, out: 'apple-touch-icon.png', size: 180 },
  // Android Chrome launcher + manifest `any` purpose.
  { src: ANY_SRC, out: 'icon-192.png', size: 192 },
  { src: ANY_SRC, out: 'icon-512.png', size: 512 },
  // Manifest `maskable` purpose — the SVG already encodes the 80 % safe area
  // (translate 96 + scale 0.625 inside a 512 viewBox) so the launcher can
  // crop into a circle, squircle, or rounded square without clipping the
  // motif.
  { src: MASKABLE_SRC, out: 'icon-maskable-192.png', size: 192 },
  { src: MASKABLE_SRC, out: 'icon-maskable-512.png', size: 512 },
];

let wrote = 0;

for (const { src, out, size } of TARGETS) {
  if (!fs.existsSync(src)) {
    throw new Error(`Source SVG missing: ${src}`);
  }
  const outPath = path.join(ICONS_DIR, out);
  // density: render the SVG at the target pixel grid directly. sharp's default
  // is 72 dpi which would force an upscale for 512 px output.
  const buffer = await sharp(fs.readFileSync(src), { density: size })
    .resize(size, size, {
      // Lanczos preserves edges of the steppe/mountain motif better than
      // sharp's default cubic.
      kernel: 'lanczos3',
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png({
      compressionLevel: 9,
      // Limit to 256 colours where possible — the brand palette is small so
      // palette mode shrinks the file by ~40 % with no visible loss.
      palette: true,
      effort: 10,
    })
    .toBuffer();

  // Only write when the bytes actually changed; keeps git diffs tight when
  // someone re-runs the script as part of an unrelated PR.
  const prev = fs.existsSync(outPath) ? fs.readFileSync(outPath) : null;
  if (prev && prev.equals(buffer)) continue;
  fs.writeFileSync(outPath, buffer);
  wrote += 1;
  console.log(`✓ ${out} (${size}×${size}, ${(buffer.length / 1024).toFixed(1)} kB)`);
}

if (wrote === 0) {
  console.log('All icons up to date — nothing written.');
}
