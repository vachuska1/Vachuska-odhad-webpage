"use client"

import { useLocale } from "@/components/locale-provider"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ServiceCard({ title, description, href = "/odhad-pro-vlastni-potrebu", index = 0 }: { title: string; description: string; href?: string; index?: number }) {
  const { t, href: localizedHref } = useLocale()
  return <Link href={localizedHref(href)} className="service-card">
    <div className="service-top">{index === 0 && <span className="service-badge">{t("Po celé ČR")}</span>}</div>
    <h3>{t(title)}</h3>
    <p>{t(description)}</p>
    <span className="service-link">{t("Více informací")} <ArrowRight size={24} aria-hidden="true" /></span>
  </Link>
}
