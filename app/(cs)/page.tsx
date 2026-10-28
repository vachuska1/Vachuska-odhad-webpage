import { HomeContent } from "@/components/home-content"
import { pageMetadata } from "@/lib/site"
export const metadata = pageMetadata("Odhady a oceňování nemovitostí", "Odhady nemovitostí pro dědictví, vypořádání majetku, prodej i koupi. Ing. Aleš Vachuška – západní, jižní a střední Čechy včetně Prahy. Tel. 774 104 020.", "/")

export default function HomePage() { return <HomeContent /> }
