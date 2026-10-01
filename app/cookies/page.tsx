import Link from 'next/link'
import { pageMetadata } from '@/lib/site'
import { CookieSettingsButton } from '@/components/cookie-consent'

export const metadata = pageMetadata('Cookies a externí obsah', 'Jak web Ing. Aleše Vachušky ukládá nastavení souhlasu a načítá Google Maps. Změna nebo odvolání souhlasu s externím obsahem.', '/cookies')

export default function CookiesPage() {
  return <main id="main-content" className="shell policy-page">
    <h1>Cookies a externí obsah</h1>
    <p>Provozovatelem webu je Ing. Aleš Vachuška, IČ 14437830, Slatina 68, 341 01 Slatina. Dotazy můžete poslat na <a href="mailto:odhadyvachuska@gmail.com">odhadyvachuska@gmail.com</a>.</p>
    <h2>Co tento web používá</h2>
    <p>Web nepoužívá analytické ani reklamní nástroje. Formulář funguje i bez povolení volitelného obsahu. Písmo se načítá přímo z tohoto webu.</p>
    <h2>Uložení Vaší volby</h2>
    <p>Volbu pro Google Maps a čas jejího uložení si pamatujeme v úložišti Vašeho prohlížeče (localStorage) pod názvem <code>odhady-cookie-preferences-v1</code> nejvýše 180 dní. Toto nastavení slouží pouze k respektování Vaší volby, nikoliv ke sledování. Pokud prohlížeč uložení neumožní, platí volba pouze během návštěvy.</p>
    <h2>Google Maps – volitelný obsah</h2>
    <p>Vložená mapa se načte až po výslovném povolení. Poté je navázáno spojení se společností Google; ta může obdržet IP adresu a údaje o prohlížeči, využívat cookies a zpracovávat údaje také mimo EU. Podrobnosti o svém zpracování a době uchování uvádí Google ve svých <a href="https://policies.google.com/privacy?hl=cs" target="_blank" rel="noopener noreferrer">zásadách ochrany soukromí</a> a <a href="https://policies.google.com/technologies/cookies?hl=cs" target="_blank" rel="noopener noreferrer">informacích o cookies</a>.</p>
    <h2>Změna a odvolání souhlasu</h2>
    <p>Volitelné načítání můžete odmítnout stejně snadno jako povolit. Změnu provedete tlačítkem níže nebo přes „Nastavení cookies“ v patičce. Odvoláním se vložená mapa odstraní a nebude se znovu načítat. Dříve uložené cookies třetí strany lze odstranit v nastavení prohlížeče.</p>
    <CookieSettingsButton />
    <p>Pokud otevřete samostatný odkaz na mapu, WhatsApp nebo jinou externí službu, přecházíte přímo k jejímu poskytovateli.</p>
    <p>Další informace: <Link href="/ochrana-osobnich-udaju">Ochrana osobních údajů</Link>.</p>
  </main>
}
