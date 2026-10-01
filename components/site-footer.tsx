"use client"

import { useLocale } from "@/components/locale-provider"
import { Instagram } from 'lucide-react'
import Link from 'next/link'
import { ConsentMap } from '@/components/consent-map'
import { CookieSettingsButton } from '@/components/cookie-consent'
import { orderedServices } from '@/lib/site'

export function SiteFooter() {
  const { t, href } = useLocale()
  return <footer className="site-footer">
    <div className="shell footer-main">
      <section className="footer-map"><h2>{t("Sídlo:")}</h2><p>Slatina 68, 341 01 Slatina<br />{t("IČO: 14437830")}</p><ConsentMap /></section>
      <div className="footer-contact"><strong>Ing. Aleš Vachuška</strong><a className="footer-phone" href="tel:+420774104020">774 104 020</a><a className="footer-email" href="mailto:odhadyvachuska@gmail.com">odhadyvachuska@gmail.com</a>
        <div className="footer-social"><span>{t('Sledujte mě:')}</span><a href="https://www.instagram.com/ocenovani_vachuska/" target="_blank" rel="noopener noreferrer" aria-label="Instagram — @ocenovani_vachuska"><Instagram size={23} aria-hidden="true" /><span>@ocenovani_vachuska</span></a></div>
        <nav className="footer-services" aria-label={t("Služby v patičce")}>{orderedServices.map(service => <Link key={service.slug} href={href(`/${service.slug}`)}>{t(service.title)} <span aria-hidden="true">→</span></Link>)}<Link href={href("/nejcastejsi-dotazy")}>{t("Nejčastější dotazy")} <span aria-hidden="true">→</span></Link><Link href={href("/pusobnost")}>{t("Oblasti působnosti →")}</Link></nav>
      </div>
    </div>
    <div className="shell footer-bottom"><p>© {new Date().getFullYear()} Ing. Aleš Vachuška</p><div><Link href={href("/ochrana-osobnich-udaju")}>{t("Ochrana osobních údajů")}</Link><CookieSettingsButton /></div></div>
  </footer>
}
