// Read-only audit against a running production preview. Never submits the enquiry form.
const assert = require('node:assert/strict')
const origin = process.env.SEO_BASE_URL || 'http://127.0.0.1:3102'
const canonicalOrigin = 'https://www.odhadyvachuska.cz'
const attr = (tag, key) => tag.match(new RegExp(`(?:^|\\s)${key}="([^"]*)"`))?.[1]
const tags = (html, name) => [...html.matchAll(new RegExp(`<${name}\\b[^>]*>`, 'g'))].map(m => m[0])
const meta = (html, name) => tags(html, 'meta').find(tag => attr(tag, 'name') === name || attr(tag, 'property') === name)
async function get(path, options) { return fetch(new URL(path, origin), options) }
async function run() {
 const sitemapResponse = await get('/sitemap.xml')
 assert.equal(sitemapResponse.status, 200)
 const sitemap = await sitemapResponse.text()
 const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1])
 assert.equal(urls.length, 99)
 assert.equal(new Set(urls).size, urls.length)
 const paths = new Set(urls.map(url => new URL(url).pathname))
 const titles = new Set(), descriptions = new Set(), assets = new Set()
 let schemas = 0
 for (let i = 0; i < urls.length; i += 5) {
  await Promise.all(urls.slice(i, i + 5).map(async url => {
   const path = new URL(url).pathname
   const response = await get(path, {redirect: 'manual'})
   assert.equal(response.status, 200, path)
   const html = await response.text()
   const language = path.startsWith('/en') ? 'en' : path.startsWith('/de') ? 'de' : 'cs'
   assert.equal(attr(tags(html, 'html')[0], 'lang'), language, path)
   const title = html.match(/<title>(.*?)<\/title>/s)?.[1]
   assert.ok(title && !titles.has(title), `Missing/duplicate title: ${path}`); titles.add(title)
   const description = attr(meta(html, 'description') || '', 'content')
   assert.ok(description && !descriptions.has(description), `Missing/duplicate description: ${path}`); descriptions.add(description)
   assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `H1: ${path}`)
   assert.ok(!attr(meta(html, 'robots') || '', 'content')?.includes('noindex'), path)
   const links = tags(html, 'link')
   assert.equal(new URL(attr(links.find(tag => attr(tag, 'rel') === 'canonical') || '', 'href')).href, new URL(url).href, `Canonical: ${path}`)
   for (const alternate of ['cs', 'en', 'de', 'x-default']) {
    const href = attr(links.find(tag => attr(tag, 'hrefLang') === alternate || attr(tag, 'hreflang') === alternate) || '', 'href')
    assert.ok(href?.startsWith(canonicalOrigin), `Hreflang: ${path} ${alternate}`)
    assert.ok(urls.some(url => new URL(url).href === new URL(href).href), `Hreflang destination missing: ${href}`)
   }
   assert.equal(new URL(attr(meta(html, 'og:url') || '', 'content')).href, new URL(url).href)
   assert.ok(meta(html, 'og:image'), `OG image: ${path}`)
   assert.ok(meta(html, 'twitter:image'), `Twitter image: ${path}`)
   for (const match of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) { JSON.parse(match[1]); schemas++ }
   const graphs = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].map(m => JSON.parse(m[1]))
   const nodes = graphs.flatMap(g => g['@graph'] || [g])
   for (const node of nodes) {
    assert.ok(['LocalBusiness', 'WebSite', 'Service', 'BreadcrumbList', 'FAQPage'].includes(node['@type']), `Unexpected schema: ${path}`)
    if (node['@type'] === 'Service') {
     assert.ok(node.name && node.description && node.areaServed)
     assert.equal(new URL(node.url).pathname, path)
     assert.equal(node.provider['@id'], `${canonicalOrigin}/#business`)
    }
    if (node['@type'] === 'BreadcrumbList') node.itemListElement.forEach((item, index) => {
     assert.equal(item['@type'], 'ListItem'); assert.equal(item.position, index + 1); assert.ok(item.name)
     assert.ok(paths.has(new URL(item.item).pathname))
    })
    if (node['@type'] === 'FAQPage') {
     assert.equal(node.mainEntity.length, 7)
     const decoded = html.replaceAll('&amp;', '&').replaceAll('&#x27;', "'").replaceAll('&quot;', '"')
     for (const item of node.mainEntity) {
      assert.equal(item['@type'], 'Question'); assert.equal(item.acceptedAnswer['@type'], 'Answer')
      assert.ok(decoded.includes(item.name) && decoded.includes(item.acceptedAnswer.text), `FAQ does not match HTML: ${path}`)
     }
    }
   }
   const business = graphs.flatMap(g => g['@graph'] || [g]).find(g => g['@type'] === 'LocalBusiness')
   assert.equal(business?.address.streetAddress, 'Slatina 68'); assert.equal(business?.identifier.value, '14437830')
   for (const tag of tags(html, 'a')) {
    const href = attr(tag, 'href'); if (!href || href.startsWith('#')) continue
    const destination = new URL(href, canonicalOrigin)
    if (destination.origin === canonicalOrigin) assert.ok(paths.has(destination.pathname), `Broken/noncanonical link: ${path} → ${href}`)
   }
   for (const name of ['og:image', 'twitter:image']) assets.add(new URL(attr(meta(html, name), 'content')).pathname)
  }))
 }
 const redirects = {
  '/odhady': '/', '/odhad-nemovitosti': '/odhad-pro-vlastni-potrebu',
  '/odhad-vyporadani-spolecneho-jmeni': '/odhad-vyporadani-majetku',
  '/odhad-nemovitosti-pro-vlastni-ucely': '/odhad-pro-vlastni-potrebu',
  '/odhad-nemovitosti-pro-sjm': '/odhad-vyporadani-majetku',
  '/odhad-nemovitosti-pro-dedicke-rizeni': '/odhad-pro-dedicke-rizeni',
 }
 for (const [path, destination] of Object.entries(redirects)) { const response = await get(path, {redirect:'manual'}); assert.equal(response.status, 308, path); assert.equal(response.headers.get('location'), destination, path); assert.ok(!paths.has(path)) }
 for (const path of ['/webdesign', '/en/not-a-page', '/de/nicht-vorhanden', '/zodborovany.png', '/superpricky.png', '/recyclesound.png']) assert.equal((await get(path)).status, 404, path)
 for (const path of [...assets, '/favicon.ico', '/favicon-32x32.png', '/apple-touch-icon.png', '/android-chrome-192x192.png', '/android-chrome-512x512.png', '/fonts/manrope-latin.woff2', '/fonts/manrope-latin-ext.woff2', '/googlef1e74bf4ed807a2b.html']) assert.equal((await get(path)).status, 200, path)
 const robots = await (await get('/robots.txt')).text(); assert.ok(robots.includes(`Sitemap: ${canonicalOrigin}/sitemap.xml`)); assert.ok(robots.includes('Allow: /'))
 console.log(`PASS: ${urls.length} canonical pages; unique titles/descriptions; 3 languages + x-default; H1; social images; ${schemas} valid JSON-LD blocks; internal links; 6 permanent redirects; retired assets/pages return 404; robots and current assets.`)
}
run().catch(error => { console.error(error); process.exitCode = 1 })
