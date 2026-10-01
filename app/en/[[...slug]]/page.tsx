import { LocalizedPage, localizedMetadata } from '@/components/localized-page'
type Props = { params: Promise<{ slug?: string[] }> }
export async function generateMetadata({ params }: Props) { return localizedMetadata('en', (await params).slug) }
export default async function Page({ params }: Props) { return <LocalizedPage locale="en" slug={(await params).slug} /> }
