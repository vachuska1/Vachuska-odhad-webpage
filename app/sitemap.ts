import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/site'
import { translatedRoutes, locales, localePath, languageAlternates } from '@/lib/i18n'
export default function sitemap(): MetadataRoute.Sitemap {
 return Object.keys(translatedRoutes).flatMap(path => locales.map(locale => ({
  url: absoluteUrl(localePath(path, locale)),
  alternates: { languages: Object.fromEntries(Object.entries(languageAlternates(path)).map(([lang, url]) => [lang, absoluteUrl(url)])) },
 })))
}
