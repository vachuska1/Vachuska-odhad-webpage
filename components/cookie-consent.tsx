"use client"

import { revokeAnalytics } from "@/lib/analytics"
import { useLocale } from "@/components/locale-provider"
import { createContext, useContext, useEffect, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import Link from 'next/link'
import { X } from 'lucide-react'

const STORAGE_KEY = 'odhady-cookie-preferences-v1'
const LIFETIME = 180 * 24 * 60 * 60 * 1000
const CookieContext = createContext({ maps: false, analytics: false, expires: 0, openSettings: () => {}, allowMaps: () => {} })
export const useCookieConsent = () => useContext(CookieContext)

function readPreferences() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null')
    return saved?.version === 2 && typeof saved.analytics === 'boolean' && typeof saved.maps === 'boolean' && typeof saved.expires === 'number' && saved.expires > Date.now() ? saved as { maps: boolean; analytics: boolean; expires: number } : null
  } catch { return null }
}

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const { t, href } = useLocale()
  const [maps, setMaps] = useState(false)
  const [analytics, setAnalytics] = useState(false)
  const [expires, setExpires] = useState(0)
  const [draftAnalytics, setDraftAnalytics] = useState(false)
  const [banner, setBanner] = useState(false)
  const [settings, setSettings] = useState(false)
  const [draftMaps, setDraftMaps] = useState(false)
  useEffect(() => {
    const sync = () => { const saved = readPreferences(); setMaps(saved?.maps ?? false); setAnalytics(saved?.analytics ?? false); setExpires(saved?.expires ?? 0); setBanner(!saved); if (!saved?.analytics) revokeAnalytics() }
    sync()
    const storage = (event: StorageEvent) => { if (event.key === STORAGE_KEY || event.key === null) sync() }
    window.addEventListener('storage', storage)
    return () => window.removeEventListener('storage', storage)
  }, [])
  useEffect(() => {
    if (!expires) return
    const check = () => {
      if (Date.now() >= expires) {
        setMaps(false); setAnalytics(false); setBanner(true); setExpires(0); revokeAnalytics()
      }
    }
    const timer = window.setInterval(check, 60000)
    window.addEventListener('focus', check)
    return () => { window.clearInterval(timer); window.removeEventListener('focus', check) }
  }, [expires])
  function save(allowMaps: boolean, allowAnalytics: boolean) {
    const nextExpiry = Date.now() + LIFETIME
    setMaps(allowMaps); setAnalytics(allowAnalytics); setExpires(nextExpiry); setBanner(false); setSettings(false)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 2, maps: allowMaps, analytics: allowAnalytics, savedAt: Date.now(), expires: nextExpiry })) } catch { /* Keep the choice for this visit when storage is unavailable. */ }
    if (!allowAnalytics) revokeAnalytics()
  }
  const openSettings = () => { setDraftMaps(maps); setDraftAnalytics(analytics); setSettings(true) }
  return <CookieContext.Provider value={{ maps, analytics, expires, openSettings, allowMaps: () => save(true, analytics) }}>
    {children}
    {banner && !settings && <section className="cookie-banner" aria-label={t("Nastavení cookies")}>
      <h2>{t("Vaše soukromí")}</h2>
      <p>{t("Cookies nám pomáhají zajistit správné fungování webu, zjistit, jak je web používán, a zobrazovat relevantní obsah a reklamu. Nezbytné cookies používáme vždy, ostatní pouze s vaším souhlasem.")} <Link href={href("/cookies")}><strong>{t("Více informací")}</strong></Link></p>
      <div className="cookie-actions"><button type="button" onClick={() => save(false, false)}>{t("Odmítnout volitelné")}</button><button type="button" onClick={() => save(true, true)}>{t("Přijmout vše")}</button><button type="button" onClick={openSettings}>{t("Nastavení")}</button></div>
    </section>}
    <Dialog.Root open={settings} onOpenChange={setSettings}>
      <Dialog.Portal><Dialog.Overlay className="cookie-overlay" /><Dialog.Content className="cookie-dialog">
        <Dialog.Title>{t("Nastavení cookies")}</Dialog.Title>
        <Dialog.Description>{t("Zvolte, zda povolíte analytiku a obsah Google Maps. Nastavení můžete kdykoliv změnit v patičce webu.")}</Dialog.Description>
        <label className="cookie-choice"><input type="checkbox" checked disabled /><span><strong>{t("Nezbytné nastavení")}</strong><small>{t("Uložení Vaší volby v tomto prohlížeči na 180 dní. Vždy aktivní.")}</small></span></label>
        <label className="cookie-choice"><input type="checkbox" checked={draftMaps} onChange={e => setDraftMaps(e.target.checked)} /><span><strong>{t("Externí obsah – Google Maps")}</strong><small>{t("Po povolení se Google spojí s Vaším prohlížečem a může používat vlastní cookies. Před souhlasem se mapa nenačítá.")}</small></span></label>
        <label className="cookie-choice"><input type="checkbox" checked={draftAnalytics} onChange={e => setDraftAnalytics(e.target.checked)} /><span><strong>{t("Analytika – Google Analytics")}</strong><small>{t("Po souhlasu měří návštěvnost, zdroje návštěv, odeslané poptávky a kliknutí na kontakty. Obsah formuláře do analytiky neposíláme.")}</small></span></label>
        <p>{t("Reklamní cookies a personalizace reklam nejsou zapnuté.")} <Link href={href("/cookies")}>{t("Podrobnosti")}</Link></p>
        <div className="cookie-actions"><button type="button" onClick={() => save(false, false)}>{t("Odmítnout volitelné")}</button><button type="button" onClick={() => save(true, true)}>{t("Přijmout vše")}</button><button type="button" onClick={() => save(draftMaps, draftAnalytics)}>{t("Uložit nastavení")}</button></div>
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
