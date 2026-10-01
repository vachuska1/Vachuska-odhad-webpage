import Link from "next/link"
import { notFound } from "next/navigation"
import { areas } from "@/lib/areas"
import { pageMetadata, services } from "@/lib/site"
import { Breadcrumbs, ContactActions } from "@/components/page-elements"
import { EnquirySection } from "@/components/enquiry-section"
export const dynamicParams = false
export function generateStaticParams() { return areas.map(a=>({area:a.slug})) }
async function findArea(params: Promise<{area:string}>) { const {area} = await params; const found = areas.find(a=>a.slug===area); if(!found) notFound(); return found }
export async function generateMetadata({params}: {params:Promise<{area:string}>}) { const a = await findArea(params); return pageMetadata(`Odhady nemovitostí ${a.name}`, `Odhad nemovitosti pro oblast ${a.name}: dědictví, SJM i vlastní potřeba. Ing. Aleš Vachuška, tel. 774 104 020. Domluvte si podklady a termín.`, `/${a.slug}`) }
export default async function Page({params}: {params:Promise<{area:string}>}) { const a = await findArea(params); return <main id="main-content" className="shell"><Breadcrumbs title={a.name} path={`/${a.slug}`} local/><section className="landing-hero"><span className="eyebrow">Ing. Aleš Vachuška · Působnost</span><h1>Odhady nemovitostí {a.name}</h1><p>{a.text}</p><ContactActions/></section><section className="local-services"><h2>S jakým oceněním vám pomohu</h2><div>{services.map(s=><Link key={s.slug} href={`/${s.slug}`}>{s.title} →</Link>)}</div><p>Byty, domy, pozemky, rekreační i zemědělské objekty. Sídlo: Slatina 68, 341 01 Slatina. Podklady, případnou prohlídku a cenu domluvíme předem.</p></section><EnquirySection service={`Odhad nemovitosti – ${a.name}`}/></main> }
