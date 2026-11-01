import Link from 'next/link'
import { localePath, translate, type Locale } from '@/lib/i18n'
import { localizedArticle } from '@/lib/article-localization'
import { type Article, articlesPublishedAt, articlePath, articleCategory, relatedArticles } from '@/lib/articles'
import { absoluteUrl, pageMetadata } from '@/lib/site'
import { jsonLd } from '@/lib/structured-data'
import { ContactActions } from '@/components/page-elements'
import { EnquirySection } from '@/components/enquiry-section'
import { ArticleCards } from '@/components/article-cards'
function inlineText(text: string) {
 return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) => part.startsWith('**') && part.endsWith('**') ? <strong key={index}>{part.slice(2, -2)}</strong> : part)
}
export function articleMetadata(article: Article, locale: Locale = 'cs') {
 const a = localizedArticle(article, locale)
 const metadata = pageMetadata(a.seoTitle, a.description, articlePath(a), locale)
 return {...metadata, title: {absolute:a.seoTitle}, openGraph: {...metadata.openGraph, title:a.seoTitle, type:'article', publishedTime:articlesPublishedAt, modifiedTime:articlesPublishedAt, authors:['Ing. Aleš Vachuška']}, twitter: {...metadata.twitter, title:a.seoTitle}}
}
export function ArticlePage({ article, locale = 'cs' }: { article: Article; locale?: Locale }) {
 const a = localizedArticle(article, locale)
 const t = (text: string) => translate(locale, text)
 const href = (path: string) => localePath(path, locale)
 const category = articleCategory(a)
 // Initial publication date; update modification dates only with substantive changes.
 const schema = {'@context':'https://schema.org','@type':'Article',headline:a.title,description:a.description,datePublished:articlesPublishedAt,dateModified:articlesPublishedAt,image:absoluteUrl('/profilfoto.png'),url:absoluteUrl(href(articlePath(a))),inLanguage:locale,mainEntityOfPage:absoluteUrl(href(articlePath(a))),author:{'@type':'Person',name:'Ing. Aleš Vachuška',url:absoluteUrl('/')},publisher:{'@type':'Person',name:'Ing. Aleš Vachuška',url:absoluteUrl('/')}}
 return <main id="main-content" className="shell"><Link className="back-link" href={href("/clanky")}>{t("← Všechny články")}</Link><article><header className="landing-hero"><h1>{a.title}</h1>{a.intro.split('\n\n').map((paragraph, index) => <p key={index}>{inlineText(paragraph)}</p>)}<ContactActions /></header><div className="article-body">{a.blocks.map((block, index) => block.type === 'list' ? <ul key={index}>{block.items.map(item => <li key={item}>{inlineText(item)}</li>)}</ul> : block.type === 'heading' ? <h2 key={index}>{block.text}</h2> : <p key={index}>{inlineText(block.text)}</p>)}<p><Link href={href(category.servicePath)}>{t(category.serviceLabel)} →</Link></p></div></article><EnquirySection service={category.enquiryType} /><section><h2 className="related-heading">{t("Související články")}</h2><ArticleCards items={relatedArticles(a).map(item => localizedArticle(item, locale))} headingLevel={3} locale={locale} /></section><script type="application/ld+json" dangerouslySetInnerHTML={{__html:jsonLd({'@context':'https://schema.org','@graph':[schema,{'@type':'BreadcrumbList',itemListElement:[{name:t('Úvod'),url:'/'},{name:t('Články'),url:'/clanky'},{name:a.title,url:articlePath(a)}].map((item,index)=>({'@type':'ListItem',position:index+1,name:item.name,item:absoluteUrl(href(item.url))}))}]})}} /></main>
}
