import { ServicePage } from "@/components/service-page"
import { services, pageMetadata } from "@/lib/site"
const service = services[1]
export const metadata = pageMetadata(service.title, service.intro, "/odhad-vyporadani-majetku")
export default function Page() { return <ServicePage service={service}/> }
