"use client"

import { useLocale } from "@/components/locale-provider"
import { createContext, useContext, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { X } from 'lucide-react'

const STORAGE_KEY = 'odhady-cookie-preferences-v1'
const LIFETIME = 180 * 24 * 60 * 60 * 1000
const CookieContext = createContext({ maps: false, openSettings: () => {}, allowMaps: () => {} })
export const useCookieConsent = () => useContext(CookieContext)

function readPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    return saved?.version === 1 && typeof saved.maps === 'boolean' && typeof saved.expires === 'number' && saved.expires > Date.now() ? saved as { maps: boolean; expires: number } : null
  } catch { return null }
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const { t, href } = useLocale()
  const [maps, setMaps] = useState(false)
  const [banner, setBanner] = useState(false)
  const [settings, setSettings] = useState(false)
  const [draftMaps, setDraftMaps] = useState(false)
  useEffect(() => {
    const sync = () => { const saved = readPreferences(); setMaps(saved?.maps ?? false); setBanner(!saved) }
    sync()
    const storage = (event: StorageEvent) => { if (event.key === STORAGE_KEY || event.key === null) sync() }
    window.addEventListener('storage', storage)
    return () => window.removeEventListener('storage', storage)
  }, [])
  function save(allow: boolean) {
    setMaps(allow); setBanner(false); setSettings(false)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, maps: allow, savedAt: Date.now(), expires: Date.now() + LIFETIME })) } catch { /* Keep the choice for this visit when storage is unavailable. */ }
  }
  const openSettings = () => { setDraftMaps(maps); setSettings(true) }
  return <CookieContext.Provider value={{ maps, openSettings, allowMaps: () => save(true) }}>
    {children}
    {banner && !settings && <section className="cookie-banner" aria-label={t("Nastavení cookies")}>
      <h2>{t("Vaše soukromí")}</h2>
      <p>{t("Cookies nám pomáhají zajistit správné fungování webu, zjistit, jak je web používán, a zobrazovat relevantní obsah a reklamu. Nezbytné cookies používáme vždy, ostatní pouze s vaším souhlasem.")} <Link href={href("/cookies")}><strong>{t("Více informací")}</strong></Link></p>
      <div className="cookie-actions"><button type="button" onClick={() => save(false)}>{t("Odmítnout volitelné")}</button><button type="button" onClick={() => save(true)}>{t("Přijmout vše")}</button><button type="button" onClick={openSettings}>{t("Nastavení")}</button></div>
    </section>}
    <Dialog.Root open={settings} onOpenChange={setSettings}>
      <Dialog.Portal><Dialog.Overlay className="cookie-overlay" /><Dialog.Content className="cookie-dialog">
        <Dialog.Title>{t("Nastavení cookies")}</Dialog.Title>
        <Dialog.Description>{t("Zvolte, zda se smí načíst obsah Google Maps. Nastavení můžete kdykoliv změnit v patičce webu.")}</Dialog.Description>
        <label className="cookie-choice"><input type="checkbox" checked disabled /><span><strong>{t("Nezbytné nastavení")}</strong><small>{t("Uložení Vaší volby v tomto prohlížeči na 180 dní. Vždy aktivní.")}</small></span></label>
        <label className="cookie-choice"><input type="checkbox" checked={draftMaps} onChange={e => setDraftMaps(e.target.checked)} /><span><strong>{t("Externí obsah – Google Maps")}</strong><small>{t("Po povolení se Google spojí s Vaším prohlížečem a může používat vlastní cookies. Před souhlasem se mapa nenačítá.")}</small></span></label>
        <p>{t("Analytické a reklamní cookies na tomto webu nejsou zapnuté.")} <Link href={href("/cookies")}>{t("Podrobnosti")}</Link></p>
        <div className="cookie-actions"><button type="button" onClick={() => save(false)}>{t("Odmítnout volitelné")}</button><button type="button" onClick={() => save(true)}>{t("Přijmout vše")}</button><button type="button" onClick={() => save(draftMaps)}>{t("Uložit nastavení")}</button></div>
        <Dialog.Close className="cookie-close" aria-label={t("Zavřít nastavení cookies")}><X size={21} /></Dialog.Close>
      </Dialog.Content></Dialog.Portal>
    </Dialog.Root>
  </CookieContext.Provider>
}

export function CookieSettingsButton() {
  const { t, href } = useLocale()
  const { openSettings } = useCookieConsent()
  return <button type="button" onClick={openSettings}>{t("Nastavení cookies")}</button>
}
