"use client"

import { useLocale } from "@/components/locale-provider"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { Phone, Mail, MessageCircle, X } from "lucide-react"

export function FloatingContactButton() {
  const { t, href } = useLocale()
  const path = usePathname()
  const contact = `${href('/')}#poptavka`
  const [open, setOpen] = useState(false)
  const container = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    if (!open) return
    const pointer = (event: PointerEvent) => { if (!container.current?.contains(event.target as Node)) setOpen(false) }
    const keyboard = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() } }
    document.addEventListener('pointerdown', pointer)
    document.addEventListener('keydown', keyboard)
    return () => { document.removeEventListener('pointerdown', pointer); document.removeEventListener('keydown', keyboard) }
  }, [open])
  useEffect(() => setOpen(false), [path])
  return <>
    <div ref={container} className="floating-contact">
      {open && <nav id="quick-contact" className="quick-contact-panel" aria-label={t("Možnosti kontaktu")}>
        <a href="tel:+420774104020"><Phone size={20} aria-hidden="true" /><span>{t("Zavolat")}<small>774 104 020</small></span></a>
        <a href="https://wa.me/420774104020" target="_blank" rel="noopener noreferrer"><MessageCircle size={20} aria-hidden="true" /><span>{t("Napsat na WhatsApp")}</span></a>
        <a href="mailto:odhadyvachuska@gmail.com"><Mail size={20} aria-hidden="true" /><span>{t("Napsat e-mail")}<small>odhadyvachuska@gmail.com</small></span></a>
      </nav>}
      <button ref={trigger} type="button" className={`floating-phone${open ? ' contact-open' : ''}`} aria-label={t(open ? 'Zavřít možnosti kontaktu' : 'Zavolat nebo napsat')} aria-expanded={open} aria-controls={open ? 'quick-contact' : undefined} onClick={() => setOpen(value => !value)}>{open ? <X size={42} aria-hidden="true" /> : <Phone size={52} aria-hidden="true" />}</button>
    </div>
    <nav className="mobile-contact-bar" aria-label={t("Rychlý kontakt")}><a href="tel:+420774104020"><Phone size={18} aria-hidden="true" />{t("Zavolat")}</a><a href={contact}><Mail size={18} aria-hidden="true" />{t("Poptávka")}</a></nav>
  </>
}
