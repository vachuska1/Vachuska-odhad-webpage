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
const areas = compile('lib/areas.ts')
const i18n = compile('lib/i18n.ts', {'@/lib/areas': areas, '@/lib/translations/en.json': en, '@/lib/translations/de.json': de})
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
