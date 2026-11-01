import { ArticleCards } from '@/components/article-cards'
import { articles, articleCategories } from '@/lib/articles'
import { pageMetadata } from '@/lib/site'
export const metadata = pageMetadata('Články a rady k oceňování nemovitostí', 'Praktické informace o odhadech nemovitostí pro dědictví, vypořádání majetku, koupi, prodej i vlastní potřebu.', '/clanky')
export default function Page() {
 return <main id="main-content" className="shell"><section className="landing-hero"><h1>Články a rady k oceňování nemovitostí</h1><p>Praktické informace o odhadech nemovitostí pro dědictví, vypořádání majetku, koupi, prodej i vlastní potřebu.</p></section>{articleCategories.map(category => <section key={category.id} aria-labelledby={`category-${category.id}`}><h2 className="related-heading" id={`category-${category.id}`}>{category.title}</h2><ArticleCards items={articles.filter(a => a.category === category.id)} headingLevel={3} /></section>)}</main>
}
