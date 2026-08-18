/**
 * Normalises everything in public/images/products to real, right-sized JPEGs.
 * Downloads arrive as a mix of JPEG/PNG/WebP at full resolution, which is both
 * slow to load and wrong for a .jpg filename.
 *
 *   node scripts/optimize-images.mjs
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const DIR = 'public/images/products'
// Editorial shots are displayed much larger than product cut-outs.
const WIDE = /^(hero|farmer|market|field|delivery|grocery|blog)/

const files = (await fs.readdir(DIR)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
let saved = 0

for (const file of files) {
  const full = path.join(DIR, file)
  // Read into memory first: sharp keeps the source open, and on Windows that
  // blocks overwriting the very file we are optimising.
  const source = await fs.readFile(full)
  const before = source.length
  const width = WIDE.test(file) ? 1400 : 800
  const buffer = await sharp(source)
    .flatten({ background: '#ffffff' })
    .resize({ width, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toBuffer()
  const target = path.join(DIR, file.replace(/\.(jpe?g|png|webp)$/i, '.jpg'))
  await fs.writeFile(target, buffer)
  if (target !== full) await fs.unlink(full)
  saved += before - buffer.length
  console.log(
    file.padEnd(22),
    (before / 1024).toFixed(0).padStart(6) + 'kB →',
    (buffer.length / 1024).toFixed(0).padStart(5) + 'kB',
  )
}

console.log(`\n${files.length} images, ${(saved / 1024 / 1024).toFixed(1)} MB saved`)
