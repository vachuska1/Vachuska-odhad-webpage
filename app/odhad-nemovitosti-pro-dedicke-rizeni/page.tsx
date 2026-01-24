import type { Metadata } from "next"
import Script from "next/script"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Odhad nemovitosti pro dědické řízení | Ing. Aleš Vachuška",
  description:
    "Odhad a ocenění nemovitosti pro dědické řízení. Rychlé dodání, srozumitelný výstup, působnost jih a západ Čech.",
  alternates: { canonical: "/odhad-nemovitosti-pro-dedicke-rizeni" },
  openGraph: { url: "/odhad-nemovitosti-pro-dedicke-rizeni" },
}

export default function Page() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Co je potřeba dodat pro odhad pro dědické řízení?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Typicky stačí adresa nemovitosti a základní informace (typ, dispozice, přibližná výměra). Další podklady doplníme podle situace – vše vám řeknu po telefonu nebo e-mailem."
        }
      },
      {
        "@type": "Question",
        "name": "Za jak dlouho odhad vyhotovíte?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Termín záleží na typu nemovitosti a dostupnosti podkladů. Ve většině případů lze domluvit rychlé vyhotovení."
        }
      },
      {
        "@type": "Question",
        "name": "Oceňujete byty, domy i pozemky pro dědictví?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Ano. Zajišťuji ocenění bytů, rodinných domů, chat a chalup, pozemků i zemědělských objektů."
        }
      },
      {
        "@type": "Question",
        "name": "V jaké oblasti působíte?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Působím především na jihu a západě Čech – nejčastěji v okolí Horažďovic, Blatné, Strakonic, Sušice, Klatov, Nepomuku a Blovic. Po domluvě i širší okolí."
        }
      },
      {
        "@type": "Question",
        "name": "Kolik stojí odhad pro dědické řízení?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text":
            "Cena se odvíjí od typu nemovitosti a náročnosti. Napište mi nebo zavolejte – řeknu vám orientační cenu předem."
        }
      }
    ]
  }

  return (
    <>
      <Script id="faq-schema-dedictvi" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-6">
          <Link href="/" className="underline underline-offset-4">Úvod</Link> <span> / </span>
          <Link href="/odhady" className="underline underline-offset-4">Odhady</Link>
        </nav>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Odhad nemovitosti pro dědické řízení
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground mb-8">
          Potřebujete určit hodnotu bytu, domu nebo pozemku pro dědické řízení? Připravím srozumitelný odhad a pomohu vám
          rychle získat reálnou hodnotu nemovitosti.
        </p>

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold">Co ocením</h2>
          <ul className="list-disc pl-6 text-muted-foreground">
            <li>byty a rodinné domy</li>
            <li>chaty, chalupy a rekreační objekty</li>
            <li>pozemky (stavební i zemědělské)</li>
            <li>zemědělské objekty</li>
          </ul>
        </section>

        <section className="space-y-4 mb-10">
          <h2 className="text-2xl font-bold">Jak to probíhá</h2>
          <ol className="list-decimal pl-6 text-muted-foreground space-y-2">
            <li>Ozvete se mi – telefon / e-mail, krátce popíšete nemovitost.</li>
            <li>Řeknu, jaké podklady budou potřeba a domluvíme postup.</li>
            <li>Provedu ocenění a předám výstup ve srozumitelné podobě.</li>
          </ol>
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