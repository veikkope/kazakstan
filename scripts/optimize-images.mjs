#!/usr/bin/env node
/**
 * Resize all sight images to max 2400px wide and re-compress at JPEG quality 82.
 * Originals overwritten in-place. Run once; safe to re-run (idempotent if already small).
 */
import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const DIR = 'public/images/sights';
const MAX_WIDTH = 2400;
const QUALITY = 82;
const MIN_SAVE_BYTES = 50_000; // skip if saving less than 50 KB

const files = fs.readdirSync(DIR).filter((f) => /\.(jpe?g|png)$/i.test(f));

let total = { before: 0, after: 0, skipped: 0 };

for (const file of files) {
  const src = path.join(DIR, file);
  const sizeBefore = fs.statSync(src).size;

  const img = sharp(src);
  const meta = await img.metadata();

  // Determine output format
  const isJpeg = /\.(jpe?g)$/i.test(file);

  let pipeline = img;
  if ((meta.width ?? 0) > MAX_WIDTH) {
    pipeline = pipeline.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }

  // Write to temp file first
  const tmp = src + '.tmp';
  if (isJpeg) {
    await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toFile(tmp);
  } else {
    await pipeline.png({ compressionLevel: 9 }).toFile(tmp);
  }

  const sizeAfter = fs.statSync(tmp).size;
  const saved = sizeBefore - sizeAfter;

  if (saved > MIN_SAVE_BYTES) {
    fs.renameSync(tmp, src);
    total.before += sizeBefore;
    total.after += sizeAfter;
    const pct = ((saved / sizeBefore) * 100).toFixed(0);
    const beforeMB = (sizeBefore / 1e6).toFixed(1);
    const afterKB = (sizeAfter / 1000).toFixed(0);
    console.log(`✓ ${file}: ${beforeMB} MB → ${afterKB} KB (−${pct}%)`);
  } else {
    fs.unlinkSync(tmp);
    total.skipped++;
    console.log(`  ${file}: already optimized (${(sizeBefore / 1000).toFixed(0)} KB), skipped`);
  }
}

const savedMB = ((total.before - total.after) / 1e6).toFixed(0);
const beforeMB = (total.before / 1e6).toFixed(0);
const afterMB = (total.after / 1e6).toFixed(0);
console.log(`\nTotal: ${beforeMB} MB → ${afterMB} MB (saved ${savedMB} MB), ${total.skipped} skipped`);
