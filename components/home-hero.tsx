"use client"

import { useLocale } from "@/components/locale-provider"
import { LanguageSwitcher } from "@/components/language-switcher"
import Image from "next/image"
import { ArrowDown } from "lucide-react"
import { useEffect, useRef } from "react"

export function HomeHero() {
  const { t } = useLocale()
  const portrait = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)")
    let frame = 0
    const update = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        if (portrait.current) portrait.current.style.transform = preference.matches ? "none" : `translateY(${Math.min(window.scrollY * 0.055, 36)}px)`
      })
    }
    window.addEventListener("scroll", update, { passive: true })
    preference.addEventListener("change", update)
    update()
    return () => { window.removeEventListener("scroll", update); preference.removeEventListener("change", update); cancelAnimationFrame(frame) }
  }, [])
  return (
    <section className="home-hero" aria-label={`Ing. Aleš Vachuška – ${t("Odhady a oceňování nemovitostí")}`}>
      <LanguageSwitcher hero />
      <div className="hero-photo" ref={portrait}>
        <Image src="/profilfoto.png" alt="Ing. Aleš Vachuška" fill priority sizes="(max-width: 767px) 100vw, 760px" className="portrait" />
      </div>
      <div className="hero-title"><h1>Ing. Aleš Vachuška</h1><p>{t("Odhady a oceňování nemovitostí")}</p></div>
      <a href="#predstaveni" className="discover-link">{t("Zjistit více")} <ArrowDown size={18} aria-hidden="true" /></a>
    </section>
  )
}
