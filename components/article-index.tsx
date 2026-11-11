import { ArticleCards } from '@/components/article-cards'
import { articleCategories } from '@/lib/articles'
import { translate, type Locale } from '@/lib/i18n'
import { localizedArticles } from '@/lib/article-localization'
export function ArticleIndex({ locale = "cs" }: { locale?: Locale }) {
 const articles = localizedArticles(locale)
 const t = (text: string) => translate(locale, text)
 return <main id="main-content" className="shell article-index"><section className="landing-hero"><h1>{t("Články a rady k oceňování nemovitostí")}</h1><p>{t("Praktické informace o odhadech nemovitostí pro dědictví, vypořádání majetku, koupi, prodej i vlastní potřebu.")}</p></section>{articleCategories.map(category => <section key={category.id} aria-labelledby={`category-${category.id}`}><h2 className="related-heading" id={`category-${category.id}`}>{t(category.title)}</h2><ArticleCards items={articles.filter(a => a.category === category.id)} headingLevel={3} locale={locale} /></section>)}</main>
}
