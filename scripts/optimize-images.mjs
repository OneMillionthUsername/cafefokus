import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const jobs = [
  { file: 'images/dark_cofe_top.jpg', maxWidth: 1600, jpgQ: 72, webpQ: 68 },
  { file: 'images/medium-shot-woman-holding-coffee-mug.jpg', maxWidth: 1600, jpgQ: 72, webpQ: 68 },
  { file: 'images/woman-enjoying-coffee-cup.jpg', maxWidth: 1600, jpgQ: 72, webpQ: 68 },
  { file: 'images/negative-space-man-coffee-sun.jpg', maxWidth: 1600, jpgQ: 72, webpQ: 68 },
  { file: 'images/side_cofe.jpg', maxWidth: 1600, jpgQ: 72, webpQ: 68 },
  { file: 'images/neagtive-space-woman-stirring-coffee-Custom-1.jpg', maxWidth: 1400, jpgQ: 74, webpQ: 70 },
  { file: 'images/milk_cofe.jpg', maxWidth: 1800, jpgQ: 74, webpQ: 70 },
  { file: 'images/cofe_machine.jpg', maxWidth: 2200, jpgQ: 72, webpQ: 68 },
  { file: 'images/cofe_cake.jpg', maxWidth: 1800, jpgQ: 72, webpQ: 68 },

  { file: 'assets/FOKUS BLOC.png', maxWidth: 900, pngQ: 85, webpQ: 82 },
  { file: 'assets/Perso 1.png', maxWidth: 128, pngQ: 85, webpQ: 82 },
  { file: 'assets/Perso 3.png', maxWidth: 320, pngQ: 85, webpQ: 82 },
  { file: 'assets/Book.png', maxWidth: 420, pngQ: 85, webpQ: 82 },
  { file: 'assets/croissant.png', maxWidth: 360, pngQ: 85, webpQ: 82 },
  { file: 'assets/Hands and coffee.png', maxWidth: 420, pngQ: 85, webpQ: 82 },
  { file: 'assets/door.png', maxWidth: 180, pngQ: 85, webpQ: 82 },
  { file: 'assets/Fokus logo.png', maxWidth: 220, pngQ: 85, webpQ: 82 },
  { file: 'assets/Perso 2.png', maxWidth: 240, pngQ: 85, webpQ: 82 },
  { file: 'assets/star.png', maxWidth: 72, pngQ: 85, webpQ: 82 }
];

function kb(bytes) {
  return (bytes / 1024).toFixed(1);
}

async function fileSize(filePath) {
  const stat = await fs.stat(filePath);
  return stat.size;
}

async function optimizeJpg(srcPath, cfg) {
  const image = sharp(srcPath, { failOn: 'none' }).rotate();
  const meta = await image.metadata();
  const width = meta.width || cfg.maxWidth;
  const outWidth = Math.min(width, cfg.maxWidth);

  const tmpPath = `${srcPath}.tmp.jpg`;
  await image
    .resize({ width: outWidth, withoutEnlargement: true })
    .jpeg({ quality: cfg.jpgQ, mozjpeg: true })
    .toFile(tmpPath);

  await fs.rename(tmpPath, srcPath);

  const webpPath = srcPath.replace(/\.(jpe?g)$/i, '.webp');
  await sharp(srcPath)
    .webp({ quality: cfg.webpQ, effort: 6 })
    .toFile(webpPath);
}

async function optimizePng(srcPath, cfg) {
  const image = sharp(srcPath, { failOn: 'none' }).rotate();
  const meta = await image.metadata();
  const width = meta.width || cfg.maxWidth;
  const outWidth = Math.min(width, cfg.maxWidth);

  const tmpPath = `${srcPath}.tmp.png`;
  await image
    .resize({ width: outWidth, withoutEnlargement: true })
    .png({ quality: cfg.pngQ, compressionLevel: 9, palette: true })
    .toFile(tmpPath);

  await fs.rename(tmpPath, srcPath);

  const webpPath = srcPath.replace(/\.png$/i, '.webp');
  await sharp(srcPath)
    .webp({ quality: cfg.webpQ, effort: 6 })
    .toFile(webpPath);
}

async function run() {
  let totalBefore = 0;
  let totalAfter = 0;

  for (const cfg of jobs) {
    const full = path.resolve(cfg.file);
    const before = await fileSize(full);
    totalBefore += before;

    if (/\.jpe?g$/i.test(cfg.file)) {
      await optimizeJpg(full, cfg);
    } else if (/\.png$/i.test(cfg.file)) {
      await optimizePng(full, cfg);
    } else {
      continue;
    }

    const after = await fileSize(full);
    totalAfter += after;
    const saved = before - after;
    const percent = before > 0 ? ((saved / before) * 100).toFixed(1) : '0.0';
    console.log(`${cfg.file}: ${kb(before)} KiB -> ${kb(after)} KiB (saved ${kb(saved)} KiB, ${percent}%)`);
  }

  const totalSaved = totalBefore - totalAfter;
  const totalPercent = totalBefore > 0 ? ((totalSaved / totalBefore) * 100).toFixed(1) : '0.0';
  console.log(`TOTAL: ${kb(totalBefore)} KiB -> ${kb(totalAfter)} KiB (saved ${kb(totalSaved)} KiB, ${totalPercent}%)`);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
