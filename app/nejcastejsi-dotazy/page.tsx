import { jsonLd } from "@/lib/structured-data"
import Link from 'next/link'
import { pageMetadata, siteUrl } from '@/lib/site'
import { FaqAccordion } from '@/components/faq-accordion'

const baseMetadata = pageMetadata('Nejčastější dotazy k odhadům nemovitostí | Ing. Aleš Vachuška', 'Odpovědi na časté otázky k odhadům nemovitostí, dědickému řízení, ocenění pozemků, osobní prohlídce a termínu zpracování.', '/nejcastejsi-dotazy')
export const metadata = { ...baseMetadata, title: { absolute: 'Nejčastější dotazy k odhadům nemovitostí | Ing. Aleš Vachuška' } }
import { questions } from '@/lib/faq'

export default function FaqPage() {
  const schema = { '@context': 'https://schema.org', '@type': 'FAQPage', url: `${siteUrl}/nejcastejsi-dotazy`, mainEntity: questions.map(({ question, answer }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: answer } })) }
  return <main id="main-content" className="shell faq-page"><Link href="/" className="back-link">← ZPĚT</Link><h1>Nejčastější dotazy</h1><FaqAccordion questions={questions} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(schema) }} /></main>
}
