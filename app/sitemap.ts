import type { MetadataRoute } from 'next'
import { articles, articlePath, articlesPublishedAt } from '@/lib/articles'
import { absoluteUrl } from '@/lib/site'
import { translatedRoutes, locales, localePath, languageAlternates } from '@/lib/i18n'
export default function sitemap(): MetadataRoute.Sitemap {
 return [...[{url:absoluteUrl('/clanky'),lastModified:articlesPublishedAt}, ...articles.map(a => ({url:absoluteUrl(articlePath(a)),lastModified:articlesPublishedAt}))], ...Object.keys(translatedRoutes).flatMap(path => locales.map(locale => ({
  url: absoluteUrl(localePath(path, locale)),
  alternates: { languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([lang, url]) => [lang, absoluteUrl(url)])) },
 })))]
}
