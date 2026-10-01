import { headers } from "next/headers"
import { LocaleProvider, SkipLink } from "@/components/locale-provider"
import { type Locale } from "@/lib/i18n"
import type { Metadata, Viewport } from "next"
import "./globals.css"
import { FloatingContactButton } from "@/components/floating-contact-button"
import { SiteHeader } from "@/components/site-header"
import { CookieConsentProvider } from "@/components/cookie-consent"
import { SiteFooter } from "@/components/site-footer"
import { siteUrl } from "@/lib/site"
import { businessGraph, jsonLd } from "@/lib/structured-data"
export const viewport: Viewport = {width:"device-width",initialScale:1,themeColor:"#007a82"}
export const metadata: Metadata = {metadataBase:new URL(siteUrl),title:{default:"Odhady nemovitostí | Ing. Aleš Vachuška",template:"%s | Ing. Aleš Vachuška"},description:"Odhady a oceňování nemovitostí pro dědictví, vypořádání majetku, prodej i koupi.",verification:{google:"f1e74bf4ed807a2b"},robots:{index:true,follow:true},icons:{icon:[{url:"/favicon.ico",sizes:"any"},{url:"/favicon-32x32.png",sizes:"32x32",type:"image/png"},{url:"/android-chrome-192x192.png",sizes:"192x192",type:"image/png"}],shortcut:"/favicon.ico",apple:"/apple-touch-icon.png"},manifest:"/site.webmanifest"}
export default async function RootLayout({children}: {children:React.ReactNode}) {
 const language = (await headers()).get("x-site-locale")
 const locale: Locale = language === "en" || language === "de" ? language : "cs"
 const business = businessGraph(locale)
 return <html lang={locale}><head><link rel="preload" href="/fonts/manrope-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /><link rel="preload" href="/fonts/manrope-latin-ext.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><LocaleProvider locale={locale}><SkipLink/><CookieConsentProvider><SiteHeader/>{children}<SiteFooter/><FloatingContactButton/></CookieConsentProvider></LocaleProvider><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(business)}}/></body></html>
}
