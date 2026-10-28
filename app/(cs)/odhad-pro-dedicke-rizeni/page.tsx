import { ServicePage } from "@/components/service-page"
import { services, pageMetadata } from "@/lib/site"
const service = services[0]
export const metadata = pageMetadata(service.title, service.intro, "/odhad-pro-dedicke-rizeni")
export default function Page() { return <ServicePage service={service}/> }
