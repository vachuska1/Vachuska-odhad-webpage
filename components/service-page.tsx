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
      <p className="service-intro">{inheritance ? <><strong>{t("Ocenění nemovitosti pro notáře v rámci dědického řízení.")}</strong> {t("V řadě případů lze odhad zpracovat i bez osobní prohlídky nemovitosti. Konkrétní postup a potřebné podklady si společně upřesníme podle typu a rozsahu oceňovaného majetku.")}</> : s.slug === 'odhad-pro-vlastni-potrebu' ? <>{t("Pomohu vám zjistit současnou hodnotu nemovitosti")} <strong>{t("před prodejem, koupí nebo pro vlastní rozhodování.")}</strong> {t("Oceňuji byty, rodinné domy, pozemky, rekreační i zemědělské objekty aj. Výsledek vám srozumitelně vysvětlím.")}</> : <>{t("Zjistím hodnotu nemovitosti pro")} <strong>{t("vypořádání společného jmění (SJ), včetně společného jmění manželů (SJM).")}</strong> {t("Získáte srozumitelný podklad pro jednání o rozdělení společného majetku.")}</>}</p>
      <ContactActions />
    </section>
    <section className="detail-grid inheritance-details">
      <div><h2>{t("Co oceňuji")}</h2><p>{t("Oceňuji všechny druhy nemovitostí, od rodinných domů, bytů a rekreačních objektů přes komerční a zemědělské nemovitosti až po stavební, zemědělské a lesní pozemky.")}</p></div>
      <div className="service-area"><h2>{t("Působnost")}</h2><p>{t(s.area)}</p><Link href={href("/pusobnost")}>{t("Oblasti působnosti →")}</Link></div>
    </section>
    {inheritance && <section className="landing-hero"><h2>{t("Články k dědickému řízení")}</h2><nav className="inheritance-advice-links" aria-label={t("Články k dědickému řízení")}><Link href={href("/clanky/odhad-nemovitosti-pro-dedicke-rizeni")}>{t("Jak postupovat")}</Link><Link href={href("/clanky/podklady-pro-odhad-nemovitosti-dedictvi")}>{t("Potřebné podklady")}</Link><Link href={href("/clanky/kolik-stoji-odhad-pro-dedicke-rizeni")}>{t("Cena odhadu")}</Link><Link href={href("/clanky")} className="all-articles-link">{t("Všechny články")}</Link></nav></section>}
    {s.slug === "odhad-vyporadani-majetku" && <section className="landing-hero"><h2>{t("Články k vypořádání majetku")}</h2><nav className="inheritance-advice-links" aria-label={t("Články k vypořádání majetku")}><Link href={href("/clanky/odhad-nemovitosti-pri-rozvodu")}>{t("Rozvod a vypořádání SJ")}</Link><Link href={href("/clanky/vyplaceni-spoluvlastnickeho-podilu")}>{t("Vyplacení podílu")}</Link><Link href={href("/clanky/rozdeleni-nemovitosti-mezi-spoluvlastniky")}>{t("Rozdělení nemovitostí")}</Link><Link href={href("/clanky")} className="all-articles-link">{t("Všechny články")}</Link></nav></section>}
    {s.slug === "odhad-pro-vlastni-potrebu" && <section className="landing-hero"><h2>{t("Související články")}</h2><nav className="inheritance-advice-links" aria-label={t("Související články")}><Link href={href("/clanky/odhad-ceny-nemovitosti-pred-koupi")}>{t("Odhad před koupí")}</Link><Link href={href("/clanky/za-kolik-prodat-nemovitost")}>{t("Za kolik prodat")}</Link><Link href={href("/clanky/jak-zjistit-hodnotu-nemovitosti")}>{t("Hodnota vlastní nemovitosti")}</Link><Link href={href("/clanky")} className="all-articles-link">{t("Všechny články")}</Link></nav></section>}
    <EnquirySection service={s.title} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema(s, locale)) }} />
  </main>
}
