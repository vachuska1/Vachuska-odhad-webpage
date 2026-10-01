"use client"

import { useLocale } from "@/components/locale-provider"
import Link from "next/link"
import { serviceSchema, jsonLd } from "@/lib/structured-data"
import { services } from "@/lib/site"
import { ContactActions } from "@/components/page-elements"
import { EnquirySection } from "@/components/enquiry-section"


export function ServicePage({ service: s }: { service: typeof services[number] }) {
  const { t, href, locale } = useLocale()
  const inheritance = s.slug === "odhad-pro-dedicke-rizeni"
  return <main id="main-content" className="shell">
    <Link className="back-link" href={href("/")}>{t("← ZPĚT")}</Link>
    <section className="landing-hero service-hero">
      <h1>{t(s.title)}</h1>
      <p className="service-intro">{inheritance ? <><strong>{t("Ocenění nemovitosti pro notáře v rámci dědického řízení.")}</strong> {t("Část odhadů lze zpracovat online bez osobní prohlídky nemovitosti. Nejlépe je se ozvat a podle konkrétní nemovitosti se domluvíme na dalším postupu.")}</> : s.slug === 'odhad-pro-vlastni-potrebu' ? <>{t("Pomohu vám zjistit současnou hodnotu nemovitosti")} <strong>{t("před prodejem, koupí nebo pro vlastní rozhodování.")}</strong> {t("Oceňuji byty, rodinné domy, pozemky, rekreační i zemědělské objekty aj. Výsledek vám srozumitelně vysvětlím.")}</> : <>{t("Zjistím hodnotu nemovitosti pro")} <strong>{t("vypořádání společného jmění (SJ), včetně společného jmění manželů (SJM).")}</strong> {t("Získáte srozumitelný podklad pro jednání o rozdělení společného majetku.")}</>}</p>
      <ContactActions />
    </section>
    <section className="detail-grid inheritance-details">
      <div><h2>{t("Co oceňuji")}</h2><p>{t("Byty, rodinné domy, pozemky, rekreační i zemědělské objekty aj.")}</p></div>
      <div className="service-area"><h2>{t("Působnost")}</h2><p>{t(s.area)}</p><Link href={href("/pusobnost")}>{t("Oblasti působnosti →")}</Link></div>
    </section>
    <EnquirySection service={s.title} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema(s, locale)) }} />
  </main>
}
