import { jsonLd, breadcrumbSchema } from "@/lib/structured-data"
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { HomeContent } from '@/components/home-content'
import { ServicePage } from '@/components/service-page'
import { ContactActions } from '@/components/page-elements'
import { EnquirySection } from '@/components/enquiry-section'
import { FaqAccordion } from '@/components/faq-accordion'
import { CookieSettingsButton } from '@/components/cookie-consent'
import { questions } from '@/lib/faq'
import { areas } from '@/lib/areas'
import { services, siteUrl, pageMetadata } from '@/lib/site'
import { policies } from '@/lib/localized-policies'
import { translatedRoutes, localePath, translate } from '@/lib/i18n'

type ForeignLocale = 'en' | 'de'
export function resolveLocalizedPath(locale: ForeignLocale, slug: string[] = []) {
 const path = Object.entries(translatedRoutes).find(([, names]) => names[locale === 'en' ? 0 : 1] === slug.join('/'))?.[0]
 if (!path) notFound()
 return path
}
export function localizedMetadata(locale: ForeignLocale, slug?: string[]): Metadata {
 const path = resolveLocalizedPath(locale, slug)
 const t = (text: string) => translate(locale, text)
 const service = services.find(s => `/${s.slug}` === path)
 const area = areas.find(a => `/${a.slug}` === path)
 const titles: Record<string, string> = {'/': t('Odhady a oceňování nemovitostí'), '/nejcastejsi-dotazy': t('Nejčastější dotazy'), '/pusobnost': t('Oblasti působnosti'), '/cookies': policies[locale].cookies.title, '/ochrana-osobnich-udaju': policies[locale].privacy.title}
 const title = service ? t(service.title) : area ? `${t('Odhady nemovitostí')} – ${area.name}` : titles[path]
 const descriptions = locale === 'en' ? {
  '/': 'Property valuations for inheritance, property settlements, sales and purchases. Ing. Aleš Vachuška serves western, southern and central Bohemia, including Prague.',
  '/odhad-pro-dedicke-rizeni': 'Property valuation for the notary handling an inheritance. Available across the Czech Republic where documents allow a valuation without an on-site inspection.',
  '/odhad-pro-vlastni-potrebu': 'Find out the current value of your apartment, house or land before a sale or purchase. Property valuations by Ing. Aleš Vachuška in Bohemia and Prague.',
  '/odhad-vyporadani-majetku': 'Valuations for joint property settlements, including Czech marital community property (SJM). A clear basis for discussing the division of assets.',
  '/nejcastejsi-dotazy': 'Answers about property valuations, inheritance proceedings, land, on-site inspections and turnaround times. Ing. Aleš Vachuška explains the process.',
  '/pusobnost': 'Property valuations in western, southern and central Bohemia, including Prague. Inheritance valuations across the Czech Republic when remote assessment is possible.',
  '/cookies': 'How this website stores your cookie preferences and loads Google Maps. Change or withdraw your consent to optional external content.',
  '/ochrana-osobnich-udaju': 'How Ing. Aleš Vachuška processes enquiry details and attachments. Information about purposes, retention, providers and your personal data rights.',
 } : {
  '/': 'Immobilienbewertungen für Erbschaften, Vermögensaufteilungen, Verkauf und Kauf. Ing. Aleš Vachuška ist in West-, Süd- und Mittelböhmen einschließlich Prag tätig.',
  '/odhad-pro-dedicke-rizeni': 'Immobilienbewertung für den Notar im Erbschaftsverfahren. In ganz Tschechien, sofern die Unterlagen eine Bewertung ohne persönliche Besichtigung ermöglichen.',
  '/odhad-pro-vlastni-potrebu': 'Aktueller Wert Ihrer Wohnung, Ihres Hauses oder Grundstücks vor Verkauf oder Kauf. Immobilienbewertungen von Ing. Aleš Vachuška in Böhmen und Prag.',
  '/odhad-vyporadani-majetku': 'Bewertungen zur Aufteilung gemeinsamen Vermögens einschließlich des tschechischen ehelichen Gemeinschaftsvermögens (SJM). Verständliche Grundlage für Verhandlungen.',
  '/nejcastejsi-dotazy': 'Antworten zu Immobilienbewertungen, Erbschaftsverfahren, Grundstücken, Besichtigungen und Bearbeitungszeiten. Informationen von Ing. Aleš Vachuška.',
  '/pusobnost': 'Immobilienbewertungen in West-, Süd- und Mittelböhmen einschließlich Prag. Erbschaftsbewertungen in ganz Tschechien, wenn eine Bewertung aus der Ferne möglich ist.',
  '/cookies': 'Wie diese Website Cookie-Einstellungen speichert und Google Maps lädt. Einwilligung zu optionalen externen Inhalten ändern oder widerrufen.',
  '/ochrana-osobnich-udaju': 'Wie Ing. Aleš Vachuška Anfragen und Anhänge verarbeitet. Informationen zu Zwecken, Speicherdauer, Dienstleistern und Ihren Datenschutzrechten.',
 }
 const description = area ? (locale === 'en' ? `Property valuations in ${area.name} and the surrounding area for inheritance, joint property settlements and personal purposes. Contact Ing. Aleš Vachuška.` : `Immobilienbewertungen in ${area.name} und Umgebung für Erbschaften, Vermögensaufteilungen und private Zwecke. Kontakt: Ing. Aleš Vachuška.`) : descriptions[path as keyof typeof descriptions]
 return pageMetadata(title, description, path, locale)
}
export function LocalizedPage({ locale, slug }: { locale: ForeignLocale; slug?: string[] }) {
 const path = resolveLocalizedPath(locale, slug)
 const t = (text: string) => translate(locale, text)
 const href = (value: string) => localePath(value, locale)
 if (path === '/') return <HomeContent />
 const service = services.find(s => `/${s.slug}` === path)
 if (service) return <ServicePage service={service} />
 const back = <Link href={href('/')} className="back-link">{t('← ZPĚT')}</Link>
 if (path === '/nejcastejsi-dotazy') {
  const content = questions.map(({question, answer}) => ({question: t(question), answer: t(answer)}))
  const schema = {'@context': 'https://schema.org', '@type': 'FAQPage', inLanguage: locale, url: siteUrl + href(path), mainEntity: content.map(({question, answer}) => ({'@type': 'Question', name: question, acceptedAnswer: {'@type': 'Answer', text: answer}}))}
  return <main id="main-content" className="shell faq-page">{back}<h1>{t('Nejčastější dotazy')}</h1><FaqAccordion questions={content} /><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(schema)}} /></main>
 }
 if (path === '/pusobnost') return <main id="main-content" className="shell">{back}<section className="landing-hero area-hero"><h1>{t('Kde vám pomohu s odhadem')}</h1><p>{t(services[1].area)}</p><p><Link href={href('/odhad-pro-dedicke-rizeni')}>{t('Odhady pro dědické řízení')}</Link> {t('mohu v řadě případů zpracovat na dálku pro celou ČR.')}</p></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumbSchema([{name: 'Ing. Aleš Vachuška', path: '/'}, {name: t('Působnost'), path}], locale))}} /><section className="area-list" aria-label={t('Oblasti působnosti')}>{areas.map(a => <Link key={a.slug} href={href(`/${a.slug}`)}>{a.name}<span aria-hidden="true">↗</span></Link>)}</section></main>
 if (path === '/ochrana-osobnich-udaju' || path === '/cookies') {
  const policy = policies[locale][path === '/cookies' ? 'cookies' : 'privacy']
  return <main id="main-content" className="shell policy-page">{back}<h1>{policy.title}</h1>{policy.sections.map(([heading, body]) => <section key={heading}><h2>{heading}</h2><p>{body}</p></section>)}<p><a href="https://resend.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">Resend</a> · <a href={`https://policies.google.com/privacy?hl=${locale}`} target="_blank" rel="noopener noreferrer">Google Privacy</a> · <a href={`https://policies.google.com/technologies/cookies?hl=${locale}`} target="_blank" rel="noopener noreferrer">Google Cookies</a> · <a href="https://uoou.gov.cz" target="_blank" rel="noopener noreferrer">ÚOOÚ</a></p><CookieSettingsButton /><p><Link href={href(path === '/cookies' ? '/ochrana-osobnich-udaju' : '/cookies')}>{path === '/cookies' ? t('Ochrana osobních údajů') : policies[locale].cookies.title}</Link></p></main>
 }
 const area = areas.find(a => `/${a.slug}` === path)
 if (area) return <main id="main-content" className="shell">{back}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd(breadcrumbSchema([{name: 'Ing. Aleš Vachuška', path: '/'}, {name: t('Působnost'), path: '/pusobnost'}, {name: area.name, path}], locale))}} /><section className="landing-hero area-hero"><h1>{t('Odhady nemovitostí')} – {area.name}</h1><p>{t(area.text)}</p><ContactActions /></section><section className="local-services"><h2>{t('S jakým oceněním vám pomohu')}</h2><div>{services.map(s => <Link key={s.slug} href={href(`/${s.slug}`)}>{t(s.title)} →</Link>)}</div><p>{t('Byty, domy, pozemky, rekreační i zemědělské objekty. Sídlo: Slatina 68, 341 01 Slatina. Podklady, případnou prohlídku a cenu domluvíme předem.')}</p></section><EnquirySection /></main>
 notFound()
}
