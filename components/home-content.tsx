"use client"
import { useLocale } from "@/components/locale-provider"
import { Phone, ArrowRight } from "lucide-react"
import { HomeHero } from "@/components/home-hero"
import { ServiceCard } from "@/components/service-card"
import { EnquirySection } from "@/components/enquiry-section"
import { orderedServices } from "@/lib/site"

export function HomeContent() {
  const { t, href } = useLocale()
  return <main id="main-content">
    <HomeHero />
    <div className="shell">
      <section id="predstaveni" className="home-intro"><p className="intro-statement">{t("Zjistím reálnou hodnotu vaší nemovitosti.")} <strong>{t("Pomohu vám při dědickém řízení, vypořádání majetku, prodeji nebo koupi.")}</strong> {t("Oceňuji byty, domy, pozemky, rekreační i zemědělské objekty aj.")}</p></section>
      <section id="sluzby" className="services-section">
        <h2 className="sr-only">{t("Služby odhadu nemovitostí")}</h2>
        <div className="services-grid">{orderedServices.map((s, index) => <ServiceCard key={s.slug} title={s.title} description={s.short} href={href(`/${s.slug}`)} index={index} />)}</div>
      </section>
      <div className="home-contact"><h2>{t("Potřebujete odhad nemovitosti?")}</h2><div className="contact-actions"><a className="cta" href="tel:+420774104020"><Phone size={19} aria-hidden="true" />774 104 020</a><a className="text-link" href="#poptavka">{t("Nezávazná poptávka")} <ArrowRight size={18} aria-hidden="true" /></a></div></div>
      <EnquirySection />
    </div>
  </main>
}
