/**
 * Hand-picked imagery. Each entry names the Openverse query plus the exact
 * photo titles (in priority order) that were reviewed and approved, so re-runs
 * are reproducible instead of "whatever search returns today".
 *
 *   node scripts/picks.mjs             # download every pick
 *   node scripts/picks.mjs carrot corn # only these slugs
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const PICKS = {
  'chinese-cabbage': ['cabbage', ['Free Chinese cabbage image', 'Free head cabbage background photo']],
  corn: ['sweet corn cob', ['Free yellow corn cob close', 'Free corn cob leaves close']],
  'ladies-finger': ['okra', ['Bowl fresh green okra']],
  'green-capsicum': ['green pepper', ['Green peppers', 'Green Pepper', 'Green pepper']],
  'green-cucumber': ['cucumber', ['Fresh green cucumbers pile background', 'Cucumber vegetable']],
  carrot: ['carrot', ['Free bunch carrots image', 'Free carrot image']],
  garlic: ['garlic', ['Free garlics image', 'Free garlic image']],
  spinach: ['spinach', ['Free fresh green spinach bowl', 'Free baby spinaches image']],
  'beef-steak': ['raw beef', ['Free raw beef steak fillet', 'Raw beef steaks', 'Raw beef meat. Free food']],
  'chicken-breast': ['raw chicken', ['Free raw chicken be cooked']],
  'salmon-fillet': ['raw salmon fillet', ['Raw salmon fillet', 'Salmon fillet', 'Fresh salmon']],
  shrimp: ['raw shrimp prawn', ['Free delicious prawns image']],
  'brown-bread': ['bread loaf', ['Bread Loaf']],
  'cow-milk': ['milk', ['Free cow milk container image', 'Free pouring milk glass blue']],
  'orange-juice': ['orange juice', ['A glass of Orange juice', 'Free orange juice image']],
  'soft-drink': ['soda', ['Free red soda can grey', 'Free lime soda image']],
  yogurt: ['yogurt', ['Blueberry yogurt clear bowl', 'Strawberry Yogurt', 'Breakfast yogurt bowl']],
  cheese: ['cheese', ['Free swiss cheese image', 'Camembert cheese']],
  butter: ['butter', ['Butter', 'Fresh butter', 'Butter on a plate']],
  eggs: ['egg', ['Free eggs carton image', 'Free egg image']],
  'olive-oil': ['olive oil', ['Olive oil bottles', 'Free olive oil bottle garlic', 'Olive oil']],
  honey: ['honey', ['Free honey jar image', 'Honey jar']],
  cookies: ['cookies', ['Homemade chocolate chip cookies', 'Cookies Biscuits & Jam']],
  'potato-chips': ['potato chips', ['Free potato chips image', 'Free close potato chips image']],
  shampoo: ['shampoo', ['Body Wash, Shampoo and Conditioner']],
  'indian-malta': ['orange fruit', ['Fresh Oranges Fruit']],
  // Hero slides — light studio shots that sit on the pale green panel
  'hero-1': ['fresh vegetables basket', ['Free image fresh vegetables basket']],
  'hero-2': ['fresh vegetables basket', ['Free different sorts vegetables photo']],
  'hero-3': ['fruits basket', ['Free fruits basket image']],
  // Editorial scenes (banners, about page, blog hero)
  'market-1': ['colorful fruit vegetables market stall', ['Colorful fruit vegetables market stall']],
  'market-2': ['fresh vegetables table', ['Free closeup fresh vegetables table', 'Free fresh vegetables table image']],
  'field-1': ['vegetable farm field rows', ['Rows lettuce Sang Lee Farms']],
  'delivery-1': ['healthy food kitchen cooking', ['Flat lay fresh ingredients avocado']],
  'hero-veggies': ['fresh vegetables basket', ['Free fresh green vegetable basket']],
  // Second pass after reviewing the contact sheet
  'green-chili': ['green chili pepper hot', ['Free long green chilies image']],
  'red-chili': ['red chili peppers fresh', ['Free closeup fresh red chilies']],
  smoothie: ['fruit smoothie drink glass', ['Fruity smoothie, refreshing drink']],
  // Untitled on Openverse, so this one is pinned straight to its file
  'green-capsicum': [
    'url',
    'https://images.rawpixel.com/editor_1024/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJwYXByaWthX3ZlZ2V0YWJsZXNfZ3JlZW5fZm9vZF8wLWltYWdlLWt5Y2Z5YWtiLmpwZw.jpg',
  ],
}

const OUT = 'public/images/products'
const UA = 'EcobazarStudentProject/1.0 (educational portfolio project)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function search(q, source = 'rawpixel') {
  const params = new URLSearchParams({ q, license_type: 'commercial', mature: 'false', page_size: '20' })
  if (source) params.set('source', source)
  for (let i = 0; i < 5; i++) {
    const res = await fetch('https://api.openverse.org/v1/images/?' + params, {
      headers: { 'User-Agent': UA },
    })
    if (res.status === 429) {
      await sleep(4000 * (i + 1))
      continue
    }
    const json = await res.json()
    return json.results ?? []
  }
  return []
}

const only = process.argv.slice(2)
const entries = Object.entries(PICKS).filter(([slug]) => !only.length || only.includes(slug))

await fs.mkdir(OUT, { recursive: true })
for (const [slug, [query, titles]] of entries) {
  try {
    // A pinned URL skips the search entirely.
    if (query === 'url') {
      const direct = await fetch(titles, { headers: { 'User-Agent': UA } })
      if (!direct.ok) throw new Error('download ' + direct.status)
      await fs.writeFile(path.join(OUT, slug + '.jpg'), Buffer.from(await direct.arrayBuffer()))
      console.log('ok          ' + slug + '  <-  pinned url')
      continue
    }
    let results = await search(query)
    if (!results.length) results = await search(query, '')
    const norm = (s) => (s || '').trim().toLowerCase()
    const wanted = titles.map(norm)
    let pick = results.find((r) => wanted.includes(norm(r.title)))
    if (!pick) pick = results.find((r) => wanted.some((w) => norm(r.title).startsWith(w)))
    if (!pick) {
      console.log('NEEDS PICK  ' + slug + '  (' + query + ')')
      results.slice(0, 10).forEach((r) => console.log('    · ' + r.title))
      await sleep(800)
      continue
    }
    const bin = await fetch(pick.url, { headers: { 'User-Agent': UA } })
    if (!bin.ok) throw new Error('download ' + bin.status)
    await fs.writeFile(path.join(OUT, slug + '.jpg'), Buffer.from(await bin.arrayBuffer()))
    console.log('ok          ' + slug + '  <-  ' + pick.title)
    await sleep(700)
  } catch (err) {
    console.log('ERROR       ' + slug + ': ' + err.message)
    await sleep(1500)
  }
}
