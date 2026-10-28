import { SiteLayout } from "@/components/site-layout"
export { metadata, viewport } from "@/components/site-layout"

// Fail the build if a page accidentally introduces per-request rendering.
export const dynamic = "error"

export default function Layout({children}: {children:React.ReactNode}) {
 return <SiteLayout locale="cs">{children}</SiteLayout>
}
