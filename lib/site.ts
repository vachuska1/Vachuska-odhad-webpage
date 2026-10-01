import { languageAlternates, translatedRoutes, localePath, type Locale } from "@/lib/i18n"
import type { Metadata } from "next"
export const siteUrl = "https://www.odhadyvachuska.cz"
export function absoluteUrl(path: string) { return path === '/' ? siteUrl : new URL(path, siteUrl).href }
export function pageMetadata(title: string, description: string, path: string, locale: Locale = 'cs'): Metadata {
  const canonical = absoluteUrl(localePath(path, locale))
  const fullTitle = title.endsWith(' | Ing. Aleš Vachuška') ? title : `${title} | Ing. Aleš Vachuška`
  const socialLocale = { cs: 'cs_CZ', en: 'en_GB', de: 'de_DE' }
  const image = { url: absoluteUrl('/profilfoto.png'), width: 1024, height: 1536, alt: 'Ing. Aleš Vachuška' }
  return {
    title: { absolute: fullTitle }, description,
    alternates: { canonical, ...(path in translatedRoutes ? { languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([language, url]) => [language, absoluteUrl(url)])) } : {}) },
    openGraph: { title: fullTitle, description, url: canonical, siteName: 'Ing. Aleš Vachuška', locale: socialLocale[locale], alternateLocale: Object.entries(socialLocale).filter(([language]) => language !== locale).map(([, value]) => value), type: 'website', images: [image] },
    twitter: { card: 'summary', title: fullTitle, description, images: [image] },
    robots: { index: true, follow: true },
  }
}
export const services = [
 { slug: "odhad-pro-dedicke-rizeni", title: "Ocenění pro dědické řízení", short: "Ocenění nemovitosti pro notáře v rámci dědického řízení.", intro: "Ocenění nemovitosti pro notáře v dědickém řízení. Po celé ČR, pokud podklady umožní zpracování bez prohlídky. Ing. Aleš Vachuška, 774 104 020.", area: "Odhady pro dědické řízení zpracovávám po celé ČR, pokud dostupné podklady umožňují ocenění bez osobní prohlídky." },
 { slug: "odhad-vyporadani-majetku", title: "Ocenění pro vypořádání společného jmění", short: "Ocenění nemovitosti pro vypořádání společného jmění a rozdělení majetku.", intro: "Ocenění nemovitosti pro vypořádání společného jmění (SJ, SJM) a rozdělení majetku. Ing. Aleš Vachuška – západní, jižní a střední Čechy včetně Prahy.", area: "Působím v západních, jižních a středních Čechách včetně Prahy. Konkrétní místo a možnost prohlídky domluvíme telefonicky." },
 { slug: "odhad-pro-vlastni-potrebu", title: "Ocenění pro vlastní potřebu", short: "Před prodejem, koupí nebo pro zjištění současné hodnoty vaší nemovitosti.", intro: "Odhad ceny bytu, domu či pozemku před prodejem, koupí nebo pro vlastní rozhodování. Ing. Aleš Vachuška – západní, jižní a střední Čechy včetně Prahy.", area: "Působím v západních, jižních a středních Čechách včetně Prahy. Konkrétní místo a možnost prohlídky domluvíme telefonicky." }
]

export const orderedServices = [services[0], services[2], services[1]]
