"use client"

import { useLocale } from "@/components/locale-provider"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Phone, Menu, X } from "lucide-react"

export function SiteHeader() {
  const { t, href } = useLocale()
  const path = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  useEffect(() => setMenuOpen(false), [path])
  useEffect(() => { const close = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false) }; window.addEventListener("keydown", close); return () => window.removeEventListener("keydown", close) }, [])
  const home = path === "/" || path === "/en" || path === "/de"
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 100)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [path])
  const hidden = home && !scrolled
  return <>
    <header className={`site-header${hidden ? " header-hidden" : ""}`} inert={hidden} aria-hidden={hidden}>
      <div className="shell header-inner">
        <Link href={href("/")} className="brand">Ing. Aleš Vachuška <span>{t("Odhady a oceňování nemovitostí")}</span></Link>
        <LanguageSwitcher />
        <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="header-navigation" aria-label={t(menuOpen ? "Zavřít menu" : "Otevřít menu")} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
        <div id="header-navigation" className={`header-navigation${menuOpen ? " menu-open" : ""}`}><nav aria-label={t("Hlavní navigace")} onClick={() => setMenuOpen(false)}><Link href={href("/odhad-pro-dedicke-rizeni")}>{t("Dědictví")}</Link><Link href={href("/odhad-pro-vlastni-potrebu")}>{t("Pro vlastní potřebu")}</Link><Link href={href("/odhad-vyporadani-majetku")}>{t("Vypořádání majetku")}</Link><Link href={href("/nejcastejsi-dotazy")}>{t("Nejčastější dotazy")}</Link></nav>
        <a className="header-phone" href="tel:+420774104020"><Phone size={17} aria-hidden="true" /><span>774 104 020</span></a></div>
      </div>
    </header>
    {!home && <div className="header-spacer" />}
  </>
}
