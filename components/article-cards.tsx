import Link from 'next/link'
import { ArrowRight, FileText, Scale, House, ChartNoAxesCombined } from 'lucide-react'
import { localePath, translate, type Locale } from '@/lib/i18n'
import { articlePath, type Article } from '@/lib/articles'

const categoryIcons = { inheritance: FileText, settlement: Scale, sale: House, personal: ChartNoAxesCombined }
function cardDescription(description: string) {
 const sentence = description.match(/^.*?[.!?](?:\s|$)/)?.[0].trim() || description
 if (sentence.length <= 120) return sentence
 const shortened = sentence.slice(0, 119)
 return `${shortened.slice(0, shortened.lastIndexOf(' ')).trimEnd()}…`
}
export function ArticleCards({ items, headingLevel = 2, locale = "cs" }: { items: Article[]; headingLevel?: 2 | 3; locale?: Locale }) {
 const Heading = headingLevel === 3 ? 'h3' : 'h2'
 return <div className="article-cards">{items.map(article => {
  const Icon = categoryIcons[article.category]
  return <article className={`article-card${article.category === 'personal' ? ' article-card-blue' : ''}`} key={article.slug}><Link className="article-card-link" href={localePath(articlePath(article), locale)}>
   <span className="article-card-icon"><Icon size={24} strokeWidth={1.7} aria-hidden="true" /></span>
   <Heading>{article.title}</Heading>
   <p>{cardDescription(article.cardDescription)}</p>
   <span className="article-card-more">{translate(locale, "Přečíst článek")} <ArrowRight size={17} aria-hidden="true" /></span>
  </Link></article>
 })}</div>
}
