/**
 * Downloads openly licensed imagery (Openverse API) into public/images/products.
 *
 *   node scripts/fetch-images.mjs            # everything that is still missing
 *   node scripts/fetch-images.mjs green-apple corn
 *
 * Entry shape: [slug, search query, ...keywords that must appear in the title]
 */
import fs from 'node:fs/promises'
import path from 'node:path'

const ITEMS = [
  // --- Fruit & vegetables -------------------------------------------------
  ['green-apple', 'green apples white background', 'apple'],
  ['indian-malta', 'oranges fruit white background', 'orange'],
  ['chinese-cabbage', 'bok choy white background', 'bok', 'choy', 'cabbage', 'pak'],
  ['green-lettuce', 'lettuce white background', 'lettuce'],
  ['green-chili', 'green chili pepper white background', 'chili', 'chilli', 'pepper'],
  ['corn', 'corn cob white background', 'corn', 'maize'],
  ['eggplant', 'eggplant white background', 'eggplant', 'aubergine', 'brinjal'],
  ['big-potatoes', 'potatoes white background', 'potato'],
  ['cauliflower', 'cauliflower white background', 'cauliflower'],
  ['green-capsicum', 'green bell pepper white background', 'pepper', 'capsicum'],
  ['red-capsicum', 'red bell pepper white background', 'pepper', 'capsicum'],
  ['red-tomato', 'tomatoes white background', 'tomato'],
  ['red-chili', 'red chili pepper white background', 'chili', 'chilli', 'pepper'],
  ['ladies-finger', 'okra white background', 'okra', 'lady', 'bhindi'],
  ['green-cucumber', 'cucumber white background', 'cucumber'],
  ['fresh-mango', 'mango fruit white background', 'mango'],
  ['broccoli', 'broccoli white background', 'broccoli'],
  ['carrot', 'carrots white background', 'carrot'],
  ['red-grapes', 'red grapes white background', 'grape'],
  ['banana', 'bananas white background', 'banana'],
  ['strawberry', 'strawberries white background', 'strawberr'],
  ['pineapple', 'pineapple white background', 'pineapple'],
  ['onion', 'onions white background', 'onion'],
  ['garlic', 'garlic bulb white background', 'garlic'],
  ['pumpkin', 'pumpkin white background', 'pumpkin'],
  ['spinach', 'spinach leaves white background', 'spinach'],
  ['watermelon', 'watermelon white background', 'watermelon'],
  ['lemon', 'lemons white background', 'lemon'],
  // --- Meat & fish --------------------------------------------------------
  ['beef-steak', 'raw beef steak white background', 'beef', 'steak', 'meat'],
  ['chicken-breast', 'raw chicken breast white background', 'chicken'],
  ['salmon-fillet', 'salmon fillet white background', 'salmon', 'fish'],
  ['shrimp', 'shrimp prawns white background', 'shrimp', 'prawn'],
  // --- Bakery, dairy, pantry ---------------------------------------------
  ['brown-bread', 'bread loaf white background', 'bread', 'loaf'],
  ['croissant', 'croissant white background', 'croissant'],
  ['cow-milk', 'milk bottle white background', 'milk'],
  ['orange-juice', 'orange juice glass white background', 'juice'],
  ['soft-drink', 'soda drink glass white background', 'soda', 'drink', 'cola'],
  ['green-tea', 'green tea cup white background', 'tea'],
  ['yogurt', 'yogurt white background', 'yogurt', 'yoghurt'],
  ['cheese', 'cheese white background', 'cheese'],
  ['butter', 'butter white background', 'butter'],
  ['eggs', 'eggs white background', 'egg'],
  ['olive-oil', 'olive oil bottle white background', 'oil'],
  ['honey', 'honey jar white background', 'honey'],
  ['almonds', 'almonds nuts white background', 'almond'],
  ['potato-chips', 'potato chips white background', 'chip', 'crisp'],
  ['cookies', 'cookies biscuits white background', 'cookie', 'biscuit'],
  ['rice', 'rice grains white background', 'rice'],
  ['soap', 'soap bar white background', 'soap'],
  ['shampoo', 'shampoo bottle white background', 'shampoo'],
  // --- Editorial / lifestyle ---------------------------------------------
  ['hero-basket', 'woman holding basket of vegetables', 'vegetable', 'basket', 'woman'],
  ['hero-bowl', 'healthy vegetable salad bowl', 'salad', 'bowl', 'vegetable'],
  ['hero-veggies', 'fresh vegetables assortment white background', 'vegetable'],
  ['farmer-1', 'farmer harvesting vegetables', 'farmer'],
  ['farmer-2', 'farmer holding vegetable basket', 'farmer'],
  ['farmer-3', 'farmer portrait smiling', 'farmer'],
  ['farmer-4', 'woman farmer vegetables', 'farmer', 'woman'],
  ['market-1', 'vegetable market stall', 'market', 'vegetable'],
  ['market-2', 'fruit market stall', 'market', 'fruit'],
  ['field-1', 'organic farm field vegetables', 'farm', 'field'],
  ['delivery-1', 'grocery delivery bag vegetables', 'grocery', 'delivery', 'bag'],
  ['grocery-1', 'grocery shopping basket food', 'grocery', 'shopping', 'basket'],
  ['blog-1', 'sliced oranges flat lay', 'orange'],
  ['blog-2', 'fresh vegetables flat lay', 'vegetable'],
  ['blog-3', 'healthy breakfast bowl', 'breakfast', 'bowl'],
  ['blog-4', 'mango slices', 'mango'],
  ['blog-5', 'colorful bell peppers', 'pepper'],
  ['blog-6', 'citrus fruits assortment', 'citrus', 'fruit'],
  ['blog-7', 'avocado toast healthy food', 'avocado', 'toast'],
  ['blog-8', 'green smoothie healthy drink', 'smoothie', 'juice', 'drink'],
]

const API = 'https://api.openverse.org/v1/images/'
const OUT = 'public/images/products'
const UA = 'EcobazarStudentProject/1.0 (educational portfolio project)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

/** Words that mean the photo shows a dish/derivative rather than the ingredient. */
const BLOCK = [
  'cake',
  'pie',
  'soup',
  'sandwich',
  'burger',
  'pizza',
  'curry',
  'candy',
  'logo',
  'icon',
  'vector',
  'drawing',
  'illustration',
  'painting',
  'tattoo',
  'clip art',
  'noodle',
  'lasagna',
  'poster',
  'advertis',
  'dessert',
  'sliced',
  'peeled',
  'bowl filled',
  'milky way',
  'thunder',
  'knife',
  'market',
  'sticker',
]

function score(title, keywords, lenient) {
  const t = (title || '').toLowerCase()
  if (!lenient && BLOCK.some((b) => t.includes(b))) return -100
  const hit = keywords.find((k) => t.includes(k))
  if (!hit) return -100
  let s = 0
  if (t.includes('white background')) s += 6
  if (t.includes('isolated')) s += 3
  if (t.includes('closeup') || t.includes('close up')) s += 1
  // The subject has to lead the title, otherwise the keyword is usually a prop.
  if (!lenient) {
    if (t.indexOf(hit) > 26) return -100
    if (t.length > 90) return -100
  }
  s -= Math.min(t.length / 60, 3)
  return s
}

async function search(query) {
  const params = new URLSearchParams({
    q: query,
    license_type: 'commercial',
    mature: 'false',
    page_size: '20',
  })
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const res = await fetch(API + '?' + params, { headers: { 'User-Agent': UA } })
      if (res.status === 429) {
        await sleep(5000 * (attempt + 1))
        continue
      }
      const json = await res.json()
      return (json.results ?? []).filter((r) => r.url)
    } catch {
      await sleep(3000 * (attempt + 1))
    }
  }
  throw new Error('search failed')
}

const only = process.argv.slice(2)
const items = only.length ? ITEMS.filter(([slug]) => only.includes(slug)) : ITEMS

await fs.mkdir(OUT, { recursive: true })
for (const [slug, query, ...keywords] of items) {
  const dest = path.join(OUT, slug + '.jpg')
  if (!only.length) {
    try {
      await fs.access(dest)
      console.log('skip   ' + slug)
      continue
    } catch {
      /* missing — download below */
    }
  }
  try {
    const lenient = /^(hero|farmer|market|field|delivery|grocery|blog)/.test(slug)
    // Studio shots must actually be studio shots, so try progressively more
    // literal phrasings until a hit clears the quality bar.
    const attempts = lenient
      ? [query]
      : [query, keywords[0] + ' isolated white background', 'free ' + keywords[0] + ' white background photo']
    let pick = null
    for (const attempt of attempts) {
      const results = await search(attempt)
      const ranked = results
        .map((r) => ({ r, s: score(r.title, keywords, lenient) }))
        .filter((x) => x.s > (lenient ? -50 : 2))
        .sort((a, b) => b.s - a.s)
      pick = (ranked[0] ?? { r: lenient ? results[0] : null }).r
      if (pick) break
      await sleep(700)
    }
    if (!pick) {
      console.log('MISS   ' + slug + '  (' + query + ')')
      continue
    }
    const bin = await fetch(pick.url, { headers: { 'User-Agent': UA } })
    if (!bin.ok) throw new Error('download ' + bin.status)
    await fs.writeFile(dest, Buffer.from(await bin.arrayBuffer()))
    console.log('ok     ' + slug + '  <-  ' + pick.title + '  [' + pick.provider + ']')
    await sleep(700)
  } catch (err) {
    console.log('ERROR  ' + slug + ': ' + err.message)
    await sleep(2000)
  }
}
