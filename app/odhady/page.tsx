import type { Metadata } from "next"
import OdhadyClient from "./OdhadyClient"

export const metadata: Metadata = {
title: "Odhady nemovitostí | Ing. Aleš Vachuška",
description:
"Kvalitní ocenění všech typů nemovitostí na jihu a západě Čech. Rychle, srozumitelně a spolehlivě.",
alternates: { canonical: "/odhady" },
openGraph: {
url: "/odhady",
},
}

export default function Page() {
return <OdhadyClient />
}