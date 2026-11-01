import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles, articlesPublishedAt, articlePath, articleCategory, relatedArticles } from '@/lib/articles'
import { absoluteUrl, pageMetadata } from '@/lib/site'
import { jsonLd } from '@/lib/structured-data'
import { ContactActions } from '@/components/page-elements'
import { EnquirySection } from '@/components/enquiry-section'
import { ArticleCards } from '@/components/article-cards'
function inlineText(text: string) {
 return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part)
}
export function generateStaticParams() { return articles.map(({slug}) => ({slug})) }
export async function generateMetadata({ params }: { params: Promise<{slug:string}> }) {
 const {slug} = await params; const a = articles.find(a => a.slug === slug); if (!a) return {}
 const metadata = pageMetadata(a.seoTitle, a.description, articlePath(a))
 return {...metadata, title: {absolute:a.seoTitle}, openGraph: {...metadata.openGraph, title:a.seoTitle, type:'article', publishedTime:articlesPublishedAt, modifiedTime:articlesPublishedAt, authors:['Ing. Aleš Vachuška']}, twitter: {...metadata.twitter, title:a.seoTitle}}
}
export default async function Page({ params }: { params: Promise<{slug:string}> }) {
 const {slug} = await params; const a = articles.find(a => a.slug === slug); if (!a) notFound()
 const category = articleCategory(a)
 // Initial publication date; update modification dates only with substantive changes.
 const schema = {'@context':'https://schema.org','@type':'Article',headline:a.title,description:a.description,datePublished:articlesPublishedAt,dateModified:articlesPublishedAt,image:absoluteUrl('/profilfoto.png'),url:absoluteUrl(articlePath(a)),inLanguage:'cs',mainEntityOfPage:absoluteUrl(articlePath(a)),author:{'@type':'Person',name:'Ing. Aleš Vachuška',url:absoluteUrl('/')},publisher:{'@type':'Person',name:'Ing. Aleš Vachuška',url:absoluteUrl('/')}}
 return <main id="main-content" className="shell"><Link className="back-link" href="/clanky">← Všechny články</Link><article><header className="landing-hero"><h1>{a.title}</h1>{a.intro.split('\n\n').map((paragraph, index) => <p key={index}>{inlineText(paragraph)}</p>)}<ContactActions /></header><div className="article-body">{a.blocks.map((block, index) => block.type === 'list' ? <ul key={index}>{block.items.map(item => <li key={item}>{inlineText(item)}</li>)}</ul> : block.type === 'heading' ? <h2 key={index}>{block.text}</h2> : <p key={index}>{inlineText(block.text)}</p>)}<p><Link href={category.servicePath}>{category.serviceLabel} →</Link></p></div></article><EnquirySection service={category.enquiryType} /><section><h2 className="related-heading">Související články</h2><ArticleCards items={relatedArticles(a)} headingLevel={3} /></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@graph':[schema,{'@type':'BreadcrumbList',itemListElement:[{name:'Úvod',url:'/'},{name:'Články',url:'/clanky'},{name:a.title,url:articlePath(a)}].map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:absoluteUrl(item.url)}))}]})}} /></main>
}
