"use client"
import { useLocale } from "@/components/locale-provider"
import { jsonLd } from "@/lib/structured-data"
import Link from "next/link"
import { Phone, ArrowRight } from "lucide-react"
import { siteUrl } from "@/lib/site"
export function ContactActions() { const { t } = useLocale(); return <div className="contact-actions"><a href="tel:+420774104020" className="cta"><Phone size={19} aria-hidden="true"/> {t("ZAVOLAT 774 104 020")}</a><a href="#poptavka" className="cta secondary">{t("NEZÁVAZNÁ POPTÁVKA")} <ArrowRight size={18} aria-hidden="true"/></a></div> }
export function Breadcrumbs({title, path, local=false}: {title:string; path:string; local?:boolean}) {
 const items = [{name:"Úvod",path:"/"}, ...(local ? [{name:"Působnost",path:"/pusobnost"}] : []), {name:title,path}]
 return <><nav className="breadcrumbs" aria-label="Drobečková navigace">{items.map((item,i) => <span key={item.path}>{i > 0 && <span aria-hidden="true"> / </span>}{i === items.length-1 ? <span aria-current="page">{item.name}</span> : <Link href={item.path}>{item.name}</Link>}</span>)}</nav><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({"@context":"https://schema.org","@type":"BreadcrumbList",itemListElement:items.map((item,i)=>({"@type":"ListItem",position:i+1,name:item.name,item:siteUrl+item.path}))})}}/></>
}
