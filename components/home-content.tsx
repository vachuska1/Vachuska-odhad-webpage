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
      <section id="predstaveni" className="home-intro"><>
        <p className="intro-statement">{t("Zjistím reálnou hodnotu vaší nemovitosti.")} <strong>{t("Pomohu vám při dědickém řízení, vypořádání majetku, prodeji, koupi nebo při rozhodování o investici do nemovitostí.")}</strong></p>
        <p className="mt-6">{t("Oceňuji všechny druhy nemovitostí, od rodinných domů, chat, chalup a penzionů přes byty, apartmány a kanceláře až po stavební, zemědělské a lesní pozemky.")}</p>
        <hr className="my-8 border-t border-[#dbe4dc]" />
        <p className="mt-6">{t("Jmenuji se")} <strong>Aleš Vachuška</strong> {t("a oceňování nemovitostí se věnuji již řadu let. Mám zkušenosti s oceněním běžných rodinných domů, bytů a pozemků, ale také méně obvyklých nemovitostí, jako jsou zemědělské usedlosti, penziony, restaurace, komerční objekty, výrobní a skladové areály, dílny nebo bytové domy. Zabývám se rovněž posuzováním investičních záměrů, stavebních úprav a možností zhodnocení nemovitostí.")}</p>
        <p className="mt-6"><strong>{t("Každá nemovitost je jiná, a proto neexistuje jeden univerzální způsob ocenění.")}</strong> {t("Podle jejího charakteru a účelu odhadu volím vhodný postup, případně výslednou hodnotu ověřuji více metodami. Důležité pro mě je, aby výsledná cena byla odborně podložená a její stanovení srozumitelně vysvětlené.")}</p>
        <p className="mt-6">{t("Zakládám si na jasné domluvě, přehledném zpracování odhadu a předem odsouhlasené ceně.")}</p>
      </></section>
      <section id="sluzby" className="services-section">
        <h2 className="sr-only">{t("Služby odhadu nemovitostí")}</h2>
        <div className="services-grid">{orderedServices.map((s, index) => <ServiceCard key={s.slug} title={s.title} description={s.short} href={href(`/${s.slug}`)} index={index} />)}</div>
      </section>
      <div className="home-contact"><h2>{t("Potřebujete odhad nemovitosti?")}</h2><div className="contact-actions"><a className="cta" href="tel:+420774104020"><Phone size={19} aria-hidden="true" />774 104 020</a><a className="text-link" href="#poptavka">{t("Nezávazná poptávka")} <ArrowRight size={18} aria-hidden="true" /></a></div></div>
      <EnquirySection />
    </div>
  </main>
}
