import { ServicePage } from "@/components/service-page"
import { services, pageMetadata } from "@/lib/site"
const service = services[2]
export const metadata = pageMetadata(service.title, service.intro, "/odhad-pro-vlastni-potrebu")
export default function Page() { return <ServicePage service={service}/> }
