"use client"

import { useLocale } from "@/components/locale-provider"
import { MapPin } from 'lucide-react'
import { useCookieConsent } from '@/components/cookie-consent'

export function ConsentMap() {
  const { t, locale } = useLocale()
  const { maps, allowMaps } = useCookieConsent()
  return <div className="footer-map-frame">
    {maps ? <iframe width="100%" height="360" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://maps.google.com/maps?q=49.38561420779924,13.741843739481293&hl=${locale}&z=18&output=embed`} title={t("Sídlo Ing. Aleše Vachušky – Slatina 68")} /> : <div className="map-placeholder"><MapPin size={30} aria-hidden="true" /><p>Slatina 68, 341 01 Slatina</p><p>{t("Pro zobrazení mapy povolte načtení služby Google Maps a jejích cookies.")}</p><button type="button" className="cta" onClick={allowMaps}>{t("Povolit Google mapu")}</button><a href="https://www.google.com/maps/search/?api=1&query=49.38561420779924%2C13.741843739481293" target="_blank" rel="noopener noreferrer">{t("Otevřít mapu v novém okně ↗")}</a></div>}
  </div>
}
