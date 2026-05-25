/**
 * One-time / occasional image size-capper for sight photos.
 *
 * Sight images are served `unoptimized` (so they're stable, offline-cacheable
 * URLs — see SightImage.tsx), which means the original file size is what users
 * download. This caps oversized originals to a sane hero resolution so neither
 * the online page nor the offline "download trip" payload is bloated.
 *
 * Idempotent: only touches files wider than MAX_WIDTH, so re-running is a no-op
 * once everything is within bounds.
 *
 *   node scripts/optimize-sight-images.mjs
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'public/images/sights';
const MAX_WIDTH = 1600; // plenty for a full-bleed hero on a phone or laptop
const JPEG_QUALITY = 80;

const files = fs.readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f));
let changed = 0;
let savedBytes = 0;

for (const file of files) {
  const fp = path.join(DIR, file);
  // Read into a buffer up front so sharp holds no file handle when we write
  // back to the same path (Windows errors otherwise).
  const input = fs.readFileSync(fp);
  const before = input.length;
  const meta = await sharp(input).metadata();
  if (!meta.width || meta.width <= MAX_WIDTH) continue; // within bounds — skip

  const isPng = /\.png$/i.test(file);
  const pipeline = sharp(input).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  const buf = await (isPng
    ? pipeline.png({ compressionLevel: 9, effort: 8 })
    : pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
  ).toBuffer();

  fs.writeFileSync(fp, buf);
  changed++;
  savedBytes += before - buf.length;
  console.log(
    `${file}: ${meta.width}px ${Math.round(before / 1024)}KB -> ${MAX_WIDTH}px ${Math.round(buf.length / 1024)}KB`,
  );
}

console.log(
  `\nDone. Resized ${changed}/${files.length} file(s), saved ${(savedBytes / 1024 / 1024).toFixed(2)} MB.`,
);
