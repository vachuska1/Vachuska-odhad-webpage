import { articleRoutes } from '@/lib/article-routes'
import { areas } from '@/lib/areas'
import en from '@/lib/translations/en.json'
import de from '@/lib/translations/de.json'
export type Locale = 'cs' | 'en' | 'de'
export const locales: Locale[] = ['cs', 'en', 'de']
export const translatedRoutes: Record<string, [string, string]> = {
 ...articleRoutes,
 ...Object.fromEntries(areas.map(a => [`/${a.slug}`, [`property-valuation-${a.slug.replace('odhady-nemovitosti-', '')}`, `immobilienbewertung-${a.slug.replace('odhady-nemovitosti-', '')}`] as [string, string]])),
 '/': ['', ''],
 '/odhad-pro-dedicke-rizeni': ['inheritance-valuation', 'immobilienbewertung-erbschaft'],
 '/odhad-pro-vlastni-potrebu': ['personal-property-valuation', 'immobilienbewertung-privat'],
 '/odhad-vyporadani-majetku': ['joint-property-settlement', 'bewertung-vermoegensaufteilung'],
 '/pusobnost': ['service-area', 'einsatzgebiet'],
 '/nejcastejsi-dotazy': ['faq', 'haeufige-fragen'],
 '/ochrana-osobnich-udaju': ['privacy', 'datenschutz'],
 '/cookies': ['cookies', 'cookies'],
}
export function translate(locale: Locale, text: string): string {
 if (locale === 'cs') return text
 const dictionary: Record<string, string> = locale === 'en' ? en : de
 if (dictionary[text]) return dictionary[text]
 const photo = text.match(/^Fotografii „(.*)“ nelze v tomto prohlížeči zpracovat\. Zvolte platný JPG, PNG nebo WebP, případně nás kontaktujte telefonicky\.$/)
 if (photo) return dictionary['Fotografii „{name}“ nelze v tomto prohlížeči zpracovat. Zvolte platný JPG, PNG nebo WebP, případně nás kontaktujte telefonicky.'].replace('{name}', photo[1])
 return text.startsWith('Soubor „') ? dictionary['Soubor neodpovídá podporovanému formátu. Vyberte prosím jiný soubor.'] : text
}
export function basePath(path: string): string {
 const match = path.match(/^\/(en|de)(?:\/(.*))?$/)
 if (!match) return path
 const index = match[1] === 'en' ? 0 : 1
 return Object.entries(translatedRoutes).find(([, slugs]) => slugs[index] === (match[2] || ''))?.[0] ?? '/'
}
export function localePath(path: string, locale: Locale): string {
 const base = basePath(path)
 if (locale === 'cs') return base
 const slug = translatedRoutes[base]?.[locale === 'en' ? 0 : 1]
 return `/${locale}${slug ? `/${slug}` : ''}`
}
export function languageAlternates(path: string) {
 return { 'cs-CZ': localePath(path, 'cs'), en: localePath(path, 'en'), de: localePath(path, 'de'), 'x-default': localePath(path, 'cs') }
}
