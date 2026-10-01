const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

function compile(path, imports = {}, globals = {}) {
  const source = ts.transpileModule(fs.readFileSync(path, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText
  const context = { exports: {}, Buffer, ...globals, require: name => { if (!(name in imports)) throw new Error(`Unexpected import: ${name}`); return imports[name] } }
  vm.runInNewContext(source, context, { filename: path })
  return context.exports
}
const shared = compile('lib/enquiry.ts')
function action({ error = null, fail = false, configured = true } = {}) {
  const calls = []
  class Resend { emails = { send: async message => { calls.push(message); if (fail) throw Error('network'); return { error } } } }
  const { sendEmail } = compile('app/actions/send-email.ts', { resend: { Resend }, '@/lib/enquiry': shared }, { process: { env: configured ? { RESEND_API_KEY: 'test-only-no-network' } : {} } })
  return { sendEmail, calls }
}
function form(overrides = {}) {
  const data = new FormData()
  Object.entries({ name: 'Test <script>', phone: '+420 774 104 020', email: 'test@example.com', gdprAgreed: 'on', service: 'Dědictví', properties: '[]', message: '<b>poznámka</b>', ...overrides }).forEach(([key, value]) => data.set(key, value))
  return data
}
const property = { type: 'Rodinný dům', cadastralArea: 'Slatina', lv: '42', parcels: '123/1, 124' }

test('sends all ten properties and file bytes with escaped email content', async () => {
  const api = action()
  const data = form({ properties: JSON.stringify(Array.from({ length: 10 }, (_, i) => ({ ...property, lv: String(i + 1) }))) })
  data.append('attachments', new File(['%PDF-1.7\nTest'], 'podklady.pdf', { type: 'application/pdf' }))
  const result = await api.sendEmail(null, data)
  assert.equal(result.success, true)
  assert.equal(api.calls.length, 1)
  const email = api.calls[0]
  assert.equal(email.to, 'odhadyvachuska@gmail.com')
  assert.equal(email.replyTo, 'test@example.com')
  assert.match(email.html, /123\/1, 124/)
  assert.equal((email.html.match(/<h2>Nemovitost/g) || []).length, 10)
  assert.match(email.html, /&lt;script&gt;/)
  assert.match(email.html, /&lt;b&gt;poznámka&lt;\/b&gt;/)
  assert.equal(email.attachments[0].content.toString(), '%PDF-1.7\nTest')
})
test('requires name, phone, email and consent on the server', async () => {
  for (const overrides of [{ service: '' }, { service: 'unknown' }, { name: '' }, { phone: '' }, { email: '' }, { email: 'invalid' }, { gdprAgreed: '' }]) {
    const api = action(); assert.equal((await api.sendEmail(null, form(overrides))).success, false); assert.equal(api.calls.length, 0)
  }
})
test('permits enquiry without properties, attachments or a note', async () => {
  const api = action(); assert.equal((await api.sendEmail(null, form({ message: '' }))).success, true)
})
test('rejects malformed properties, unknown types and more than ten properties', async () => {
  for (const properties of ['broken', '{}', JSON.stringify([{ ...property, type: 'invalid' }]), JSON.stringify(Array(11).fill(property)), JSON.stringify([{ ...property, cadastralArea: 'x'.repeat(201) }])]) {
    const api = action(); assert.equal((await api.sendEmail(null, form({ properties }))).success, false); assert.equal(api.calls.length, 0)
  }
})
test('rejects unsupported, empty, oversized and disguised files without sending', async () => {
  for (const file of [new File(['x'], 'run.exe'), new File([], 'empty.pdf'), new File([new Uint8Array(shared.MAX_ATTACHMENT_BYTES + 1)], 'large.pdf'), new File(['not PNG'], 'photo.png'), new File(['not WebP'], 'photo.webp'), new File([Buffer.from('RIFFxxxxWAVEfmt ')], 'audio.webp')]) {
    const api = action(); const data = form(); data.append('attachments', file)
    assert.equal((await api.sendEmail(null, data)).success, false); assert.equal(api.calls.length, 0)
  }
})
test('enforces the combined byte limit and file count', async () => {
  const data = form()
  data.append('attachments', new File([new Uint8Array(shared.MAX_ATTACHMENT_BYTES / 2 + 1)], 'a.pdf'))
  data.append('attachments', new File([new Uint8Array(shared.MAX_ATTACHMENT_BYTES / 2 + 1)], 'b.pdf'))
  const api = action(); assert.equal((await api.sendEmail(null, data)).success, false); assert.equal(api.calls.length, 0)
  const many = form(); for (let i = 0; i < 21; i++) many.append('attachments', new File(['%PDF-1.7'], `${i}.pdf`))
  assert.equal((await api.sendEmail(null, many)).success, false)
})
test('accepts PDF, JPG, JPEG, PNG, HEIC and WebP without relying on browser MIME', async () => {
  const fixtures = [['test.PDF', Buffer.from('%PDF-1.7')], ['test.jpg', Buffer.from([255, 216, 255, 224])], ['test.jpeg', Buffer.from([255, 216, 255, 224])], ['test.png', Buffer.from([137, 80, 78, 71, 13, 10, 26, 10])], ['test.heic', Buffer.from([0, 0, 0, 24, ...Buffer.from('ftypheic')])]]
  const webp = Buffer.alloc(26); webp.write('RIFF'); webp.writeUInt32LE(18, 4); webp.write('WEBPVP8L', 8); webp.writeUInt32LE(5, 16); webp[20] = 0x2f
  fixtures.push(['test.WEBP', webp])
  const api = action(); const data = form()
  fixtures.forEach(([name, bytes]) => data.append('attachments', new File([bytes], name)))
  assert.equal((await api.sendEmail(null, data)).success, true); assert.equal(api.calls[0].attachments.length, 6)
})
test('returns recoverable errors for provider failure or missing configuration', async () => {
  for (const config of [{ error: { message: 'provider failure' } }, { fail: true }, { configured: false }]) {
    const api = action(config); const result = await api.sendEmail(null, form()); assert.equal(result.success, false); assert.match(result.message, /774 104 020/)
  }
})
