import type { MetadataRoute } from 'next'
import { articles, articlePath } from '@/lib/articles'
import { absoluteUrl } from '@/lib/site'
import { translatedRoutes, locales, localePath, languageAlternates } from '@/lib/i18n'

export default function sitemap(): MetadataRoute.Sitemap {
 const articleDates = new Map(articles.map(article => [articlePath(article), article.publishedAt]))
 const articleIndexDate = articles.flatMap(article => article.publishedAt ? [article.publishedAt] : []).sort().pop()
 const paths = new Set([...Object.keys(translatedRoutes), ...articleDates.keys()])

 return [...paths].flatMap(path => {
  const translated = path in translatedRoutes
  const lastModified = path === '/clanky' ? articleIndexDate : articleDates.get(path)
  const alternates = translated
   ? { languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([lang, url]) => [lang, absoluteUrl(url)])) }
   : undefined

  return (translated ? locales : ['cs'] as const).map(locale => ({
   url: absoluteUrl(localePath(path, locale)),
   lastModified,
   alternates,
  }))
 })
}
