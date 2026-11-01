const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')
const en = require('../lib/translations/en.json')
const de = require('../lib/translations/de.json')
function compile(file, imports = {}) {
 const context = { exports: {}, require: name => { if (!(name in imports)) throw Error(name); return imports[name] } }
 const source = ts.transpileModule(fs.readFileSync(file, 'utf8'), {compilerOptions: {module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true}}).outputText
 vm.runInNewContext(source, context)
 return context.exports
}
const routes = compile('lib/article-routes.ts')
const areas = compile('lib/areas.ts')
const i18n = compile('lib/i18n.ts', {'@/lib/article-routes': routes, '@/lib/areas': areas, '@/lib/translations/en.json': en, '@/lib/translations/de.json': de})
test('every language switch preserves the corresponding page and round-trips to Czech', () => {
 for (const path of Object.keys(i18n.translatedRoutes)) {
  for (const locale of i18n.locales) {
   const translated = i18n.localePath(path, locale)
   assert.equal(i18n.basePath(translated), path)
   assert.equal(i18n.localePath(translated, 'cs'), path)
   for (const next of i18n.locales) assert.equal(i18n.localePath(translated, next), i18n.localePath(path, next))
  }
 }
})
test('both dictionaries cover the same keys, all FAQ answers and all regional text', () => {
 assert.deepEqual(Object.keys(en).sort(), Object.keys(de).sort())
 const { questions } = compile('lib/faq.ts')
 for (const dictionary of [en, de]) {
  for (const area of areas.areas) assert.ok(dictionary[area.text])
  for (const question of questions) { assert.ok(dictionary[question.question]); assert.ok(dictionary[question.answer]) }
  for (const value of Object.values(dictionary)) assert.ok(value.trim())
 }
})
test('validation messages are translated without exposing Czech file errors', () => {
 for (const locale of ['en', 'de']) {
  const value = i18n.translate(locale, 'Soubor „test.webp“ neodpovídá podporovanému formátu. Vyberte prosím jiný soubor.')
  assert.notEqual(value, 'Soubor „test.webp“ neodpovídá podporovanému formátu. Vyberte prosím jiný soubor.')
  assert.ok(value)
 }
})

test('all thirteen article translations preserve blocks, lists and emphasis', () => {
 const {articles} = compile('lib/articles.ts')
 for (const locale of ['en','de']) {
  const translations = require(`../lib/translations/articles.${locale}.json`)
  assert.equal(Object.keys(translations).length, 13)
  for (const article of articles) {
   const translated = translations[article.slug]
   for (const field of ['title','seoTitle','description','cardDescription','intro']) {
    assert.ok(translated[field]?.trim(), `${locale}: ${article.slug} ${field}`)
    assert.notEqual(translated[field], article[field])
   }
   assert.equal(translated.intro.split('\n\n').length, article.intro.split('\n\n').length)
   assert.equal(translated.blocks.length, article.blocks.length)
   for (let i=0;i<article.blocks.length;i++) {
    const original = article.blocks[i], block = translated.blocks[i]
    assert.equal(block.type, original.type)
    const values = original.type === 'list' ? original.items : [original.text]
    const translatedValues = block.type === 'list' ? block.items : [block.text]
    assert.equal(translatedValues.length, values.length)
    values.forEach((value,index) => {
     assert.ok(translatedValues[index]?.trim())
     assert.equal((translatedValues[index].match(/\*\*/g)||[]).length, (value.match(/\*\*/g)||[]).length)
    })
   }
   const path = '/clanky/'+article.slug
   assert.ok(i18n.localePath(path, locale).includes(locale === 'en' ? '/articles/' : '/artikel/'))
  }
 }
})
