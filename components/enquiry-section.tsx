"use client"

import { useLocale } from "@/components/locale-provider"
import { ContactForm } from "@/components/contact-form"

export function EnquirySection({ service }: { service?: string }) {
  const { t, href } = useLocale()
  return <section id="poptavka" className="enquiry-section">
    <div className="section-heading"><h2>{t("Nezávazná poptávka")}</h2><p>{t("Popište mi svou nemovitost. Ozvu se Vám a společně se domluvíme.")}</p></div>
    <ContactForm service={service} />
  </section>
}
