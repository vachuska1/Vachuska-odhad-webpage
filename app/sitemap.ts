import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://odhadyvachuska.cz'
  const currentDate = new Date()
  
  return [
    // Homepage - nejvyšší priorita
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    // Obě hlavní sekce se stejnými parametry
    {
      url: `${baseUrl}/odhady`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/webdesign`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    // GDPR page - lower priority
    {
      url: `${baseUrl}/ochrana-osobnich-udaju`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    }
  ]
}