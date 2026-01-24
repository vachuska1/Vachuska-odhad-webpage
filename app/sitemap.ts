import { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://odhadyvachuska.cz"
  const currentDate = new Date()

  return [
    // Homepage – nejvyšší priorita
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // Hlavní sekce
    {
      url: `${baseUrl}/odhady`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/webdesign`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // --- NOVÉ SEO STRÁNKY (odhady podle účelu) ---
    {
      url: `${baseUrl}/odhad-nemovitosti-pro-dedicke-rizeni`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/odhad-nemovitosti-pro-sjm`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/odhad-nemovitosti-pro-vlastni-ucely`,
      lastModified: currentDate,
      changeFrequency: "yearly",
      priority: 0.8,
    },

    // Právní stránka – nižší priorita
    {
      url: `${baseUrl}/ochrana-osobnich-udaju`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ]
}