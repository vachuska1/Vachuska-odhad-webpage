import { areas } from '@/lib/areas'
import { orderedServices, siteUrl, absoluteUrl } from '@/lib/site'
import { localePath, translate, type Locale } from '@/lib/i18n'

export function jsonLd(value: unknown) { return JSON.stringify(value).replace(/</g, '\\u003c') }
export function serviceSchema(service: typeof orderedServices[number], locale: Locale) {
 const url = absoluteUrl(localePath(`/${service.slug}`, locale))
 return {
  '@context': 'https://schema.org', '@type': 'Service', '@id': `${url}#service`, url,
  name: translate(locale, service.title), description: `${translate(locale, service.short)} ${translate(locale, service.area)}`,
  serviceType: translate(locale, 'Odhady nemovitostí'),
  provider: { '@id': `${siteUrl}/#business` },
  areaServed: service.slug === 'odhad-pro-dedicke-rizeni' ? { '@type': 'Country', name: 'Czech Republic' } : areas.map(area => ({ '@type': 'City', name: area.name })),
 }
}
export function businessGraph(locale: Locale) {
 const businessId = `${siteUrl}/#business`
 return {
  '@context': 'https://schema.org', '@graph': [
   { '@type': 'LocalBusiness', '@id': businessId, name: 'Ing. Aleš Vachuška',
    description: translate(locale, 'Odhady a oceňování nemovitostí'), url: absoluteUrl('/'), image: absoluteUrl('/profilfoto.png'),
    telephone: '+420774104020', email: 'odhadyvachuska@gmail.com',
    identifier: { '@type': 'PropertyValue', propertyID: 'IČO', value: '14437830' },
    sameAs: ['https://www.instagram.com/ocenovani_vachuska/'],
    address: { '@type': 'PostalAddress', streetAddress: 'Slatina 68', postalCode: '341 01', addressLocality: 'Slatina', addressCountry: 'CZ' },
    geo: { '@type': 'GeoCoordinates', latitude: 49.38561420779924, longitude: 13.741843739481293 },
    areaServed: areas.map(area => ({ '@type': 'City', name: area.name })),
    hasOfferCatalog: { '@type': 'OfferCatalog', name: translate(locale, 'Služby odhadu nemovitostí'), itemListElement: orderedServices.map(service => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', '@id': `${absoluteUrl(localePath(`/${service.slug}`, locale))}#service`, name: translate(locale, service.title), url: absoluteUrl(localePath(`/${service.slug}`, locale)) } })) },
   },
   { '@type': 'WebSite', '@id': `${siteUrl}/#website`, url: absoluteUrl('/'), name: 'Ing. Aleš Vachuška', alternateName: translate(locale, 'Odhady a oceňování nemovitostí'), inLanguage: ['cs', 'en', 'de'], publisher: { '@id': businessId } },
  ],
 }
}
export function breadcrumbSchema(items: { name: string; path: string }[], locale: Locale) {
 return {
  '@context': 'https://schema.org', '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, name: item.name, item: absoluteUrl(localePath(item.path, locale)) })),
 }
}
