import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Odhad nemovitosti pro vlastní účely | Ing. Aleš Vachuška",
  description:
    "Odhad nemovitosti pro vlastní účely – prodej, koupě nebo zjištění skutečné hodnoty majetku. Jih a západ Čech.",
  alternates: { canonical: "/odhad-nemovitosti-pro-vlastni-ucely" },
  openGraph: { url: "/odhad-nemovitosti-pro-vlastni-ucely" },
}

export default function Page() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Kdy se hodí odhad nemovitosti pro vlastní účely?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Nejčastěji při úvahách o prodeji nebo koupi nemovitosti, pro zjištění reálné hodnoty majetku nebo pro vlastní rozhodování."
        }
      },
      {
        "@type": "Question",
        "name": "Je odhad vhodný i před prodejem nemovitosti?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Ano. Odhad vám pomůže nastavit reálnou cenu a vyhnout se podhodnocení nebo naopak nereálnému nadhodnocení."
        }
      },
      {
        "@type": "Question",
        "name": "Oceňujete i nemovitosti před koupí?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Ano. Odhad před koupí pomůže ověřit, zda odpovídá požadovaná cena skutečné hodnotě nemovitosti."
        }
      },
      {
        "@type": "Question",
        "name": "Jaké typy nemovitostí oceňujete?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Byty, rodinné domy, chaty a chalupy, pozemky i zemědělské objekty."
        }
      },
      {
        "@type": "Question",
        "name": "V jaké oblasti působíte?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Působím především na jihu a západě Čech – nejčastěji v okolí Horažďovic, Blatné, Strakonic, Sušice, Klatov, Nepomuku a Blovic."
        }
      }
    ]
  }

  return (
    <>
      <Script
        id="faq-schema-vlastni-ucely"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="underline underline-offset-4">Úvod</Link>{" "}
          <span>/</span>{" "}
          <Link href="/odhady" className="underline underline-offset-4">Odhady</Link>
        </nav>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Odhad nemovitosti pro vlastní účely
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Chcete znát skutečnou hodnotu své nemovitosti? Odhad pro vlastní účely
          vám pomůže při rozhodování o prodeji, koupi nebo jen pro lepší přehled
          o hodnotě vašeho majetku.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold">Kdy se odhad hodí</h2>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>před prodejem nemovitosti</li>
            <li>před koupí bytu, domu nebo pozemku</li>
            <li>pro zjištění skutečné hodnoty majetku</li>
            <li>pro vlastní rozhodování bez tlaku realitních nabídek</li>
          </ul>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold">Co ocením</h2>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>byty a rodinné domy</li>
            <li>chaty, chalupy a rekreační objekty</li>
            <li>pozemky (stavební i zemědělské)</li>
          </ul>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold">Působnost</h2>
          <p className="text-muted-foreground">
            Jih a západ Čech – Horažďovice, Blatná, Strakonice, Sušice, Klatovy,
            Nepomuk, Blovice a okolí.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Kontakt</h2>
          <p className="text-muted-foreground">
            Zavolejte:{" "}
            <a href="tel:+420774104020" className="underline underline-offset-4">
              774 104 020
            </a>
            <br />
            Napište:{" "}
            <a href="mailto:odhadyvachuska@gmail.com" className="underline underline-offset-4">
              odhadyvachuska@gmail.com
            </a>
          </p>
          <p className="text-muted-foreground">
            Zpět na přehled:{" "}
            <Link href="/odhady" className="underline underline-offset-4">
              Odhady nemovitostí
            </Link>
          </p>
        </section>
      </main>
    </>
  )
}