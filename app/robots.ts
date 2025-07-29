import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Uncomment and add any disallowed paths if needed
      // disallow: '/private/',
    },
    sitemap: 'https://vachuska-odhady.cz/sitemap.xml',
  }
}
