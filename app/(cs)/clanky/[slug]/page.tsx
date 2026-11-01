import { notFound } from 'next/navigation'
import { articles } from '@/lib/articles'
import { ArticlePage, articleMetadata } from '@/components/article-page'
type Props = { params: Promise<{slug:string}> }
export function generateStaticParams() { return articles.map(({slug}) => ({slug})) }
export async function generateMetadata({ params }: Props) {
 const {slug} = await params
 const article = articles.find(a => a.slug === slug)
 if (!article) notFound()
 return articleMetadata(article)
}
export default async function Page({ params }: Props) {
 const {slug} = await params
 const article = articles.find(a => a.slug === slug)
 if (!article) notFound()
 return <ArticlePage article={article} />
}
