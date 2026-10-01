"use server"

import { Resend } from "resend"
import { ENQUIRY_TYPES, attachmentError, parseProperties } from "@/lib/enquiry"

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!))
const failure = { success: false, message: "Poptávku se nepodařilo odeslat. Zkuste to znovu nebo zavolejte na 774 104 020." }

// Check the file content as well as its extension; MIME supplied by browsers varies for HEIC.
function hasExpectedSignature(filename: string, bytes: Buffer) {
  const extension = filename.split('.').pop()?.toLowerCase()
  if (extension === 'pdf') return bytes.subarray(0, 5).toString() === '%PDF-'
  if (extension === 'jpg' || extension === 'jpeg') return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff
  if (extension === 'png') return bytes.subarray(0, 8).equals(new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]))
  if (extension === 'webp') return bytes.length >= 20 && bytes.subarray(0, 4).toString() === 'RIFF' && bytes.readUInt32LE(4) === bytes.length - 8 && bytes.subarray(8, 12).toString() === 'WEBP' && ['VP8 ', 'VP8L', 'VP8X'].includes(bytes.subarray(12, 16).toString())
  if (extension === 'heic') return bytes.subarray(4, 8).toString() === 'ftyp' && /heic|heix|hevc|hevx|heim|heis|hevm|hevs/.test(bytes.subarray(8, 64).toString('ascii'))
  return false
}

export async function sendEmail(_prevState: unknown, formData: FormData) {
  const read = (key: string) => { const value = formData.get(key); return typeof value === 'string' ? value.trim() : '' }
  const name = read('name'), phone = read('phone'), email = read('email'), message = read('message'), service = read('service')
  if (!ENQUIRY_TYPES.includes(service)) return { success: false, message: 'Vyberte prosím typ odhadu.' }
  if (read('gdprAgreed') !== 'on') return { success: false, message: 'Potvrďte prosím souhlas se zpracováním osobních údajů.' }
  if (!name || name.length > 150 || !/^[+()\d\s.-]{6,30}$/.test(phone) || phone.replace(/\D/g, '').length < 6) return { success: false, message: 'Vyplňte prosím jméno a platné telefonní číslo.' }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return { success: false, message: 'Vyplňte prosím platnou e-mailovou adresu.' }
  if (message.length > 5000 || service.length > 200) return { success: false, message: 'Zadané údaje jsou příliš dlouhé. Zkraťte je prosím.' }
  const properties = parseProperties(read('properties'))
  if (!properties) return { success: false, message: 'Zkontrolujte údaje o nemovitostech. Lze zadat nejvýše 10 nemovitostí.' }
  const entries = formData.getAll('attachments')
  if (entries.some(entry => typeof entry === 'string')) return { success: false, message: 'Neplatné přílohy.' }
  const files = entries as File[]
  const fileError = attachmentError(files)
  if (fileError) return { success: false, message: fileError }
  try {
    const attachments = []
    for (const file of files) {
      const bytes = Buffer.from(await file.arrayBuffer())
      if (!hasExpectedSignature(file.name, bytes)) return { success: false, message: `Soubor „${file.name.slice(0, 100)}“ neodpovídá podporovanému formátu. Vyberte prosím jiný soubor.` }
      attachments.push({ filename: file.name.replace(/[\/\\\r\n\x00-\x1f]/g, '_').slice(-150), content: bytes })
    }
    if (!process.env.RESEND_API_KEY) return failure
    const fields = [['Služba', service], ['Jméno', name], ['Telefon', phone], ['E-mail', email]]
    const paragraph = (label: string, value: string) => `<p><strong>${label}:</strong> ${escapeHtml(value || '—').replace(/\n/g, '<br>')}</p>`
    const propertyHtml = properties.map((p, index) => `<h2>Nemovitost ${index + 1}</h2>${paragraph('Typ', p.type)}${paragraph('Katastrální území', p.cadastralArea)}${paragraph('Číslo LV', p.lv)}${paragraph('Číslo parcely', p.parcels)}`).join('')
    const html = `<h1>Nezávazná poptávka</h1>${fields.map(([label, value]) => paragraph(label, value)).join('')}${propertyHtml}${paragraph('Poznámka', message)}<p>Souhlas se zpracováním osobních údajů: ano</p>`
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { error } = await resend.emails.send({ from: 'onboarding@resend.dev', to: 'odhadyvachuska@gmail.com', replyTo: email, subject: `Poptávka ocenění – ${name.replace(/[\r\n]/g, ' ')}`, html, attachments })
    return error ? failure : { success: true, message: 'Děkuji, poptávka byla odeslána. Ozvu se Vám a společně se domluvíme.' }
  } catch { return failure }
}
