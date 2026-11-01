import type { MetadataRoute } from 'next'
import { articles, articlePath, articlesPublishedAt } from '@/lib/articles'
import { absoluteUrl } from '@/lib/site'
import { translatedRoutes, locales, localePath, languageAlternates } from '@/lib/i18n'
export default function sitemap(): MetadataRoute.Sitemap {
 return Object.keys(translatedRoutes).flatMap(path => locales.map(locale => ({
  url: absoluteUrl(localePath(path, locale)),
  ...(path === '/clanky' || articles.some(a => articlePath(a) === path) ? {lastModified:articlesPublishedAt} : {}),
  alternates: { languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([lang, url]) => [lang, absoluteUrl(url)])) },
 })))
}
