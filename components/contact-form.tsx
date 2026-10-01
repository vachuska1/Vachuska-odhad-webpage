"use client"

import { useLocale } from "@/components/locale-provider"
import { useRef, useState } from "react"
import Link from "next/link"
import { ChevronDown, Plus, Trash2, Paperclip, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { sendEmail } from "@/app/actions/send-email"
import { ENQUIRY_TYPES, ACCEPTED_FILES, attachmentError, MAX_FILES, MAX_PROPERTIES, PROPERTY_GROUPS, type PropertyData } from "@/lib/enquiry"

type PropertyCard = PropertyData & { id: number; open: boolean }
const emptyProperty = (id: number): PropertyCard => ({ id, type: '', cadastralArea: '', lv: '', parcels: '', open: true })

export function ContactForm({ service = "Obecná poptávka" }: { service?: string; lang?: "cz" | "en" }) {
  const { t, href, locale } = useLocale()
  const [pending, setPending] = useState(false)
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null)
  const [properties, setProperties] = useState<PropertyCard[]>([emptyProperty(0)])
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const nextId = useRef(1)
  const fileInput = useRef<HTMLInputElement>(null)
  const addButton = useRef<HTMLButtonElement>(null)

  function changeProperty(id: number, key: keyof PropertyData, value: string) {
    setProperties(previous => previous.map(p => p.id === id ? { ...p, [key]: value } : p))
  }
  function addProperty() {
    if (properties.length >= MAX_PROPERTIES) return
    const id = nextId.current++
    const mobile = window.matchMedia('(max-width: 767px)').matches
    setProperties(previous => [...previous.map(p => mobile && (p.type || p.cadastralArea || p.lv || p.parcels) ? { ...p, open: false } : p), emptyProperty(id)])
    requestAnimationFrame(() => document.getElementById(`property-type-${id}`)?.focus())
  }
  function removeProperty(id: number) {
    setProperties(previous => previous.filter(p => p.id !== id))
    requestAnimationFrame(() => addButton.current?.focus())
  }
  function chooseFiles(event: React.ChangeEvent<HTMLInputElement>) {
    const selected = Array.from(event.currentTarget.files || [])
    const combined = [...files]
    selected.forEach(file => { if (!combined.some(existing => existing.name === file.name && existing.size === file.size && existing.lastModified === file.lastModified)) combined.push(file) })
    const error = attachmentError(combined)
    setFileError(error)
    if (!error) setFiles(combined)
    event.currentTarget.value = ''
  }
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (pending) return
    const form = event.currentTarget
    const error = attachmentError(files)
    if (error) { setFileError(error); return }
    const data = new FormData(form)
    data.set('properties', JSON.stringify(properties.map(({ type, cadastralArea, lv, parcels }) => ({ type, cadastralArea, lv, parcels }))))
    files.forEach(file => data.append('attachments', file))
    setPending(true); setResult(null)
    try {
      const response = await sendEmail(null, data)
      setResult(response)
      if (response.success) { form.reset(); setProperties([emptyProperty(nextId.current++)]); setFiles([]); setFileError(null) }
    } catch { setResult({ success: false, message: 'Poptávku se nepodařilo odeslat. Zkuste to znovu nebo zavolejte na 774 104 020.' }) }
    finally { setPending(false) }
  }

  return <form id="contact-form" onSubmit={submit} className="enquiry-form" aria-busy={pending}>

    <p className="required-note">{t("* Povinné údaje")}</p>
    <fieldset disabled={pending} className="enquiry-controls">
      <fieldset className="contact-group">
        <legend>{t("Kontaktní údaje – povinné")}</legend>
        <div className="form-grid contact-fields">
          <div><Label htmlFor="name">{t("Jméno a příjmení *")}</Label><Input id="name" name="name" autoComplete="name" required maxLength={150} /></div>
          <div><Label htmlFor="enquiry-type">{t("Typ odhadu *")}</Label><select id="enquiry-type" name="service" required defaultValue={service.includes("dědické") ? "Dědictví" : service.includes("vlastní") ? "Pro vlastní potřebu" : service.includes("společného") ? "Vypořádání majetku" : ""}><option value="" disabled>{t("Vyberte typ odhadu")}</option>{ENQUIRY_TYPES.map(type => <option key={type} value={type}>{t(type)}</option>)}</select></div>
          <div><Label htmlFor="phone">{t("Telefon *")}</Label><Input id="phone" name="phone" type="tel" autoComplete="tel" required maxLength={30} /></div>
          <div><Label htmlFor="email">{t("E-mail *")}</Label><Input id="email" name="email" type="email" autoComplete="email" required maxLength={254} /></div>
        </div>
      </fieldset>
      <fieldset className="property-fields">
        <legend>{t("Údaje o nemovitosti")}</legend>
        <div className="property-list">
          {properties.map((property, index) => <article className="property-card" key={property.id}>
            <div className="property-card-header">
              <button type="button" id={`property-heading-${property.id}`} className="property-toggle" aria-expanded={property.open} aria-controls={`property-fields-${property.id}`} onClick={() => setProperties(previous => previous.map(p => p.id === property.id ? { ...p, open: !p.open } : p))}>
                <span><strong>{t('Nemovitost')} {index + 1}</strong><small>{[t(property.type), property.cadastralArea, property.lv && `LV ${property.lv}`].filter(Boolean).join(' · ') || t('Vyplňte známé údaje')}</small></span><ChevronDown size={19} aria-hidden="true" />
              </button>
              <button type="button" className="remove-property" onClick={() => removeProperty(property.id)} aria-label={`${t('Odebrat nemovitost')} ${index + 1}`}><Trash2 size={18} aria-hidden="true" /><span>{t("Odebrat")}</span></button>
            </div>
            <div className="form-grid property-card-fields" id={`property-fields-${property.id}`} hidden={!property.open} aria-labelledby={`property-heading-${property.id}`}>
              <div className="full-width"><Label htmlFor={`property-type-${property.id}`}>{t("Typ nemovitosti")}</Label><select id={`property-type-${property.id}`} value={property.type} onChange={e => changeProperty(property.id, 'type', e.target.value)}><option value="">{t("Vyberte typ nemovitosti")}</option>{PROPERTY_GROUPS.map(group => <optgroup label={t(group.label)} key={group.label}>{group.options.map(option => <option key={option} value={option}>{t(option.startsWith('Jiné') ? 'Jiné' : option)}</option>)}</optgroup>)}</select></div>
              <div><Label htmlFor={`cadastral-${property.id}`}>{t("Katastrální území")}</Label><Input id={`cadastral-${property.id}`} value={property.cadastralArea} maxLength={200} onChange={e => changeProperty(property.id, 'cadastralArea', e.target.value)} /></div>
              <div><Label htmlFor={`lv-${property.id}`}>{t("Číslo LV")}</Label><Input id={`lv-${property.id}`} value={property.lv} maxLength={50} onChange={e => changeProperty(property.id, 'lv', e.target.value)} /></div>
              <div className="full-width"><Label htmlFor={`parcels-${property.id}`}>{t("Číslo parcely")}</Label><Input id={`parcels-${property.id}`} value={property.parcels} maxLength={1000} aria-describedby={`parcels-help-${property.id}`} onChange={e => changeProperty(property.id, 'parcels', e.target.value)} /><p className="field-help" id={`parcels-help-${property.id}`}>{t("Více parcel na jednom LV oddělte čárkou.")}</p></div>
            </div>
          </article>)}
        </div>
        <button className="form-add-button" type="button" ref={addButton} onClick={addProperty} disabled={properties.length >= MAX_PROPERTIES}><Plus size={18} aria-hidden="true" />{t("Přidat další nemovitost")}</button>
        <p className="field-help" aria-live="polite">{properties.length} / {MAX_PROPERTIES} {t('nemovitostí')}{properties.length === MAX_PROPERTIES ? t(' – dosažen maximální počet') : ''}</p>
      </fieldset>
      <fieldset className="attachment-fields">
        <legend>{t("Podklady k ocenění")}</legend>
        <input ref={fileInput} type="file" multiple accept={ACCEPTED_FILES} onChange={chooseFiles} className="sr-only" tabIndex={-1} aria-label={t("Fotografie nebo dokumenty")} />
        <button type="button" className="form-add-button" onClick={() => fileInput.current?.click()}><Plus size={18} aria-hidden="true" />{t("Přidat fotografie nebo dokumenty")}</button>
        <p className="field-help">{t('Fotografie, výpis z KN, dokumentace nebo půdorysy. PDF, JPG, JPEG, PNG, HEIC, WebP. Nejvýše')} {MAX_FILES} {t('souborů, dohromady 4 MB.')}</p>
        {files.length > 0 && <ul className="attachment-list">{files.map((file, index) => <li key={`${file.name}-${file.lastModified}-${index}`}><Paperclip size={16} aria-hidden="true" /><span>{file.name}<small>{(file.size / 1024 / 1024).toLocaleString(locale, { maximumFractionDigits: 2 })} MB</small></span><button type="button" aria-label={`${t('Odebrat soubor')} ${file.name}`} onClick={() => { setFiles(previous => previous.filter((_, i) => i !== index)); setFileError(null) }}><X size={18} aria-hidden="true" /></button></li>)}</ul>}
        {fileError && <p className="form-error" role="alert">{t(fileError)}</p>}
      </fieldset>
      <div className="form-grid note-field"><div className="full-width"><Label htmlFor="message">{t("Poznámka")}</Label><Textarea id="message" name="message" rows={4} maxLength={5000} /></div></div>
      <label className="consent"><input type="checkbox" name="gdprAgreed" required /><span>{t("Souhlasím se")} <Link href={href("/ochrana-osobnich-udaju")}>{t("zpracováním osobních údajů")}</Link>. *</span></label>
      <Button type="submit" disabled={pending} className="submit-button">{t(pending ? 'Odesílám…' : 'ODESLAT NEZÁVAZNOU POPTÁVKU')}</Button>
    </fieldset>
    <div aria-live="polite" role="status">{result && <p className={result.success ? 'form-success' : 'form-error'}>{t(result.message)}</p>}</div>
  </form>
}
