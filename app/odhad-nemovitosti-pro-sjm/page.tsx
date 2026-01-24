import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"

export const metadata: Metadata = {
title: "Odhad nemovitosti pro společné jmění | Ing. Aleš Vachuška",
description:
"Odhad a ocenění nemovitosti pro vypořádání společného jmění. Rychle, srozumitelně a spolehlivě.",
alternates: { canonical: "/odhad-nemovitosti-pro-sjm" },
openGraph: { url: "/odhad-nemovitosti-pro-sjm" },
}

export default function Page() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Kdy se hodí odhad pro vypořádání SJ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Nejčastěji při rozvodu nebo dohodě o vypořádání majetku. Odhad pomůže určit reálnou hodnotu nemovitosti jako podklad pro férové vypořádání."
        }
      },
      {
        "@type": "Question",
        "name": "Co všechno umíte ocenit pro SJ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Byty, rodinné domy, chaty a chalupy, pozemky i další nemovitosti. Postup vždy přizpůsobím konkrétní situaci."
        }
      },
      {
        "@type": "Question",
        "name": "Jaké podklady jsou potřeba?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Záleží na typu nemovitosti. Na začátek stačí adresa a základní popis. Po domluvě doplníme potřebné dokumenty."
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
      },
      {
        "@type": "Question",
        "name": "Kolik stojí odhad pro SJ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Cena se odvíjí od typu nemovitosti a náročnosti. Rád vám řeknu orientační cenu předem po telefonu nebo e-mailem."
        }
      }
    ]
  }

  return (
    <>
      <Script id="faq-schema-sjm" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="underline underline-offset-4">Úvod</Link> <span> / </span>
          <Link href="/odhady" className="underline underline-offset-4">Odhady</Link>
        </nav>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Odhad nemovitosti pro vypořádání SJ
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Odhad nemovitosti pro vypořádání společného jmění (SJ) pomůže určit reálnou hodnotu bytu, domu nebo pozemku
          jako podklad pro férové vypořádání.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold">Co získáte</h2>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>srozumitelný výstup s reálnou hodnotou nemovitosti</li>
            <li>postup přizpůsobený typu nemovitosti a vašemu cíli</li>
            <li>rychlou domluvu a spolehlivé dodání</li>
          </ul>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold">Působnost</h2>
          <p className="text-muted-foreground">
            Jih a západ Čech – nejčastěji Horažďovice, Blatná, Strakonice, Sušice, Klatovy, Nepomuk, Blovice.
            Po domluvě i širší okolí.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-2xl font-bold">Kontakt</h2>
          <p className="text-muted-foreground">
            Zavolejte: <a className="underline underline-offset-4" href="tel:+420774104020">774 104 020</a> <br />
            Napište: <a className="underline underline-offset-4" href="mailto:odhadyvachuska@gmail.com">odhadyvachuska@gmail.com</a>
          </p>
          <p className="text-muted-foreground">
            Zpět na přehled: <Link className="underline underline-offset-4" href="/odhady">Odhady nemovitostí</Link>
          </p>
        </section>
      </main>
    </>
  )
}