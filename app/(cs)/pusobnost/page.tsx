import Link from "next/link"
import { areas } from "@/lib/areas"
import { pageMetadata } from "@/lib/site"
import { Breadcrumbs } from "@/components/page-elements"
export const metadata = pageMetadata("Působnost – kde oceňuji nemovitosti", "Odhady v Praze, středních, jižních a západních Čechách. Přehled oblastí působnosti Ing. Aleše Vachušky. Dědické odhady také na dálku po celé ČR.", "/pusobnost")
export default function Page() { return <main id="main-content" className="shell"><Breadcrumbs title="Působnost" path="/pusobnost"/><section className="landing-hero area-hero"><h1>Kde vám pomohu s odhadem</h1><p>Působím v západních, jižních a středních Čechách včetně Prahy. Konkrétní místo a možnost prohlídky domluvíme telefonicky.</p><p><Link href="/odhad-pro-dedicke-rizeni">Odhady pro dědické řízení</Link> mohu v řadě případů zpracovat na dálku pro celou ČR.</p></section><section className="area-list" aria-label="Oblasti působnosti">{areas.map(a=><Link key={a.slug} href={`/${a.slug}`}>{a.name}<span aria-hidden="true">↗</span></Link>)}</section></main> }
