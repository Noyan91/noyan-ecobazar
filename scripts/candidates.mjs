/** Lists Openverse hits for one or more queries so a human can pick the right photo.
 *  Usage: node scripts/candidates.mjs "green apple white background" "carrot isolated"
 */
const UA = 'EcobazarStudentProject/1.0 (educational portfolio project)'
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function run(query) {
  const params = new URLSearchParams({
    q: query,
    license_type: 'commercial',
    mature: 'false',
    page_size: '18',
  })
  for (let i = 0; i < 5; i++) {
    const res = await fetch('https://api.openverse.org/v1/images/?' + params, {
      headers: { 'User-Agent': UA },
    })
    if (res.status === 429) {
      await sleep(4000 * (i + 1))
      continue
    }
    const json = await res.json()
    console.log('## ' + query)
    ;(json.results ?? []).forEach((r, idx) => {
      console.log('  [' + idx + '] ' + r.title + '  ~' + r.provider)
      console.log('      ' + r.url)
    })
    return
  }
  console.log('## ' + query + ' -> rate limited')
}

for (const q of process.argv.slice(2)) {
  await run(q)
  await sleep(900)
}
