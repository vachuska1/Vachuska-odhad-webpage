"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft, Sun, Moon } from "lucide-react"
import { useTheme } from "next-themes"

import { LanguageToggle } from "@/components/language-toggle"
import { ContactForm } from "@/components/contact-form"
import { Button } from "@/components/ui/button"
import { ServiceCard } from "@/components/service-card"

export default function OdhadyClient() {
  const [lang, setLang] = useState<"cz" | "en">("cz")
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setTheme("light")
  }, [setTheme])

  const translations = {
    cz: {
      title: "Ing. Aleš Vachuška – odhadce nemovitostí",
      intro:
        "Zjistím reálnou hodnotu vaší nemovitosti rychle, srozumitelně a spolehlivě. Pomohu vám při prodeji, dědickém řízení, vypořádání majetku nebo při koupi nemovitosti.",
      valuationScope: "Oceňuji byty, domy, pozemky, rekreační i zemědělské objekty.",
      whenToUse: "Kdy se vám moje služby budou hodit?",
      useCases: [
        {
          title: "Prodej nebo koupě nemovitosti",
          description:
            "Zjistím tržní cenu nemovitosti, abyste prodali za férovou cenu nebo nakoupili bez rizika přeplacení.",
        },
        {
          title: "Reálná hodnota majetku",
          description: "Potřebujete znát skutečnou hodnotu svého majetku pro své vlastní účely.",
        },
        {
          title: "Dědictví a rozdělení majetku",
          description:
            "Ocením nemovitosti pro dědické řízení, rozvod či vypořádání společného jmění manželů.",
        },
      ],
      // NOVÉ:
      localTitle: "Působnost",
      localText:
        "Působím především na jihu a západě Čech – nejčastěji v okolí Horažďovic, Blatné, Strakonic, Sušice, Klatov, Nepomuku a Blovic. Po domluvě i širší okolí.",
      moreTitle: "Časté účely odhadu",
      linkInheritance: "Odhad nemovitosti pro dědické řízení",
      linkSJM: "Odhad nemovitosti pro vypořádání SJM",
      section2Title: "Další služby",
      service1Title: "Kupní a darovací smlouvy",
      service1Desc:
        "Kompletní příprava kupních a darovacích smluv včetně jejich podání na katastr. Váš převod vlastnictví proběhne bez komplikací.",
      service2Title: "Havarijní plán",
      service2Desc:
        "Zpracuji plán v souladu s legislativou a zajistím jeho schválení na úřadech.",
      contactFormTitle: "Kontaktní formulář",
      findMe: "Kde mě najdete",
      address: "Slatina 68, 34101 Slatina",
      coordinates: "GPS: 49.38561420779924, 13.741843739481293",
      backToHome: "Zpět na úvod",
      allRightsReserved: "Všechna práva vyhrazena.",
    },
    en: {
      title: "Ing. Aleš Vachuška – Real Estate Appraiser",
      intro:
        "I will determine the real value of your property quickly, clearly, and reliably. I will help you with selling, inheritance proceedings, property settlement, or property purchase.",
      valuationScope: "I appraise apartments, houses, land, recreational, and agricultural properties.",
      whenToUse: "When will my services be useful to you?",
      useCases: [
        {
          title: "Property Sale/Purchase",
          description: "I will help you determine the real value of a property for sale or purchase.",
        },
        {
          title: "Real Asset Value",
          description: "You need to know the true value of your assets for various purposes.",
        },
        {
          title: "Inheritance/Property Division",
          description: "I will provide appraisal for inheritance proceedings or joint property settlement.",
        },
      ],
      // NEW:
      localTitle: "Service area",
      localText:
        "I primarily operate in the south and west of the Czech Republic – most often around Horažďovice, Blatná, Strakonice, Sušice, Klatovy, Nepomuk and Blovice. Wider area by agreement.",
      moreTitle: "Common appraisal purposes",
      linkInheritance: "Appraisal for inheritance proceedings",
      linkSJM: "Appraisal for joint property settlement (SJM)",
      section2Title: "Additional Services",
      service1Title: "Preparation of purchase agreements and their registration in the real estate cadastre",
      service1Desc:
        "Complete preparation of purchase agreements and ensuring their proper registration in the real estate cadastre for a smooth transfer of ownership.",
      service2Title: "Emergency plans",
      service2Desc:
        "I will prepare the plan in accordance with the legislation and ensure its approval by the authorities.",
      contactFormTitle: "Contact Form",
      findMe: "Where to find me",
      address: "Slatina 68, 34101 Slatina",
      coordinates: "GPS: 49.38561420779924, 13.741843739481293",
      backToHome: "Back to Home",
      allRightsReserved: "All rights reserved.",
    },
  }

  const t = translations[lang]

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/">
          <Button variant="ghost" className="text-foreground hover:bg-accent">
            <ArrowLeft className="mr-2 h-4 w-4" /> {t.backToHome}
          </Button>
        </Link>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            variant="outline"
            className="bg-transparent text-foreground border-border hover:bg-accent"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <LanguageToggle onLanguageChange={setLang} />
        </div>
      </header>

      <main className="container mx-auto px-4">
        <section className="py-24 text-center">
          <div className="mb-8 flex justify-center">
            <img src="/profilfoto.png" alt="Ing. Aleš Vachuška" className="max-w-96 h-auto" />
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-10">{t.title}</h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-6">{t.intro}</p>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">{t.valuationScope}</p>
        </section>

        {/* NOVÉ: Působnost + interní odkazy */}
        <section className="py-24">
  <div className="max-w-5xl mx-auto text-center mb-16">
    <h2 className="text-2xl md:text-3xl font-bold mb-6">
      Nejčastěji provádím tyto odhady nemovitostí
    </h2>

    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
      Odhad nemovitosti může sloužit k různým účelům. Nejčastěji klientům
      pomáhám v těchto situacích.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    <Link
      href="/odhad-nemovitosti-pro-dedicke-rizeni"
      className="group rounded-xl border border-border p-8 text-left hover:shadow-md transition-all"
    >
      <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground">
        Odhad nemovitosti pro dědické řízení
      </h3>
      <p className="text-muted-foreground">
        Stanovení hodnoty nemovitosti jako podklad pro dědické řízení.
      </p>
    </Link>

    <Link
      href="/odhad-nemovitosti-pro-sjm"
      className="group rounded-xl border border-border p-8 text-left hover:shadow-md transition-all"
    >
      <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground">
        Odhad nemovitosti pro společné jmění
      </h3>
      <p className="text-muted-foreground">
        Ocenění nemovitosti pro vypořádání společného jmění.
      </p>
    </Link>

    <Link
      href="/odhad-nemovitosti-pro-vlastni-ucely"
      className="group rounded-xl border border-border p-8 text-left hover:shadow-md transition-all"
    >
      <h3 className="text-xl font-semibold mb-3 group-hover:text-foreground">
        Odhad nemovitosti pro vlastní účely
      </h3>
      <p className="text-muted-foreground">
        Prodej, koupě nebo zjištění skutečné hodnoty majetku.
      </p>
    </Link>
  </div>
</section>

        <section className="py-24">
          <h2 className="text-3xl font-bold text-foreground mb-8 text-center">{t.section2Title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <ServiceCard title={t.service1Title} description={t.service1Desc} />
            <ServiceCard title={t.service2Title} description={t.service2Desc} />
          </div>
        </section>

        <section className="grid md:grid-cols-2 gap-12 py-24">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">{t.contactFormTitle}</h2>
            <ContactForm lang={lang} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-foreground mb-6">{t.findMe}</h2>
            <p className="text-lg text-muted-foreground mb-2">{t.address}</p>
            <p className="text-md text-muted-foreground mb-1">{t.coordinates}</p>

            <p className="text-md text-muted-foreground mb-1">
              <a href="tel:+420774104020" className="hover:text-foreground transition-colors">
                774 104 020
              </a>
            </p>
            <p className="text-md text-muted-foreground mb-4">
              <a href="mailto:odhadyvachuska@gmail.com" className="hover:text-foreground transition-colors">
                odhadyvachuska@gmail.com
              </a>
            </p>

            <div className="w-full h-80 rounded-lg overflow-hidden shadow-lg">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://maps.google.com/maps?q=49.38561420779924,13.741843739481293&hl=en&z=17&output=embed"
                title="Location of Ing. Aleš Vachuška"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-muted text-muted-foreground py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} Ing. Aleš Vachuška. {t.allRightsReserved}
        </p>
      </footer>
    </div>
  )
}