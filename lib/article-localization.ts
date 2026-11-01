import { articles, type Article, type ArticleBlock } from '@/lib/articles'
import en from '@/lib/translations/articles.en.json'
import de from '@/lib/translations/articles.de.json'
import type { Locale } from '@/lib/i18n'
type Translation = Pick<Article, 'title' | 'seoTitle' | 'description' | 'cardDescription' | 'intro'> & { blocks: ArticleBlock[] }
export function localizedArticle(article: Article, locale: Locale): Article {
 if (locale === 'cs') return article
 const dictionary = (locale === 'en' ? en : de) as Record<string, Translation>
 const translation = dictionary[article.slug]
 if (!translation) throw new Error(`Missing ${locale} article: ${article.slug}`)
 return {...article, ...translation}
}
export function localizedArticles(locale: Locale) { return articles.map(article => localizedArticle(article, locale)) }
