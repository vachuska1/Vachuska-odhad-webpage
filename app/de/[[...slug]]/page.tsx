import { translatedRoutes } from '@/lib/i18n'
import { LocalizedPage, localizedMetadata } from '@/components/localized-page'
type Props = { params: Promise<{ slug?: string[] }> }
export async function generateMetadata({ params }: Props) { return localizedMetadata('de', (await params).slug) }
export default async function Page({ params }: Props) { return <LocalizedPage locale="de" slug={(await params).slug} /> }

export const dynamicParams = false
export function generateStaticParams() {
 return Object.values(translatedRoutes).map(slugs => ({ slug: slugs[1] ? slugs[1].split('/') : [] }))
}
