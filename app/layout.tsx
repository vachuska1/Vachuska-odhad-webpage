import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { FloatingContactButton } from "@/components/floating-contact-button"
import { LocalServiceArea } from "@/components/LocalServiceArea"
import Script from "next/script"

const inter = Inter({ subsets: ["latin"] })

// -------------------------
// SEO CONSTANTS
// -------------------------
const siteUrl = "https://www.odhadyvachuska.cz"
const ogImage = "/profilfoto.png"

const titleDefault = "Odhady a oceňování nemovitostí | Ing. Aleš Vachuška"
const descriptionDefault =
  "Kvalitní ocenění všech typů nemovitostí na jihu a západě Čech. Rychle, srozumitelně a spolehlivě."

const keywordsDefault =
  "odhad nemovitosti, ocenění nemovitosti, odhad domu, odhad bytu, odhad pozemku, znalecký posudek, dědické řízení, SJM, Horažďovice, Blatná, Strakonice, Sušice, Klatovy, Nepomuk, Blovice"

// -------------------------
// VIEWPORT
// -------------------------
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
}

// -------------------------
// GLOBAL METADATA (ROOT)
// - canonical sem NEDÁVAT (každá stránka má mít vlastní)
// -------------------------
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: titleDefault,
    // Kratší template (ať se title nepřepálí)
    template: `%s | Ing. Aleš Vachuška`,
  },

  description: descriptionDefault,
  keywords: keywordsDefault,

  // OpenGraph
  openGraph: {
    title: titleDefault,
    description: descriptionDefault,
    url: siteUrl,
    siteName: "Ing. Aleš Vachuška – Oceňování nemovitostí",
    locale: "cs_CZ",
    type: "website",
    images: [
      {
        url: ogImage, // díky metadataBase to bude absolutní
        width: 1200,
        height: 630,
        alt: "Ing. Aleš Vachuška – oceňování nemovitostí",
      },
    ],
  },

  // Twitter card
  twitter: {
    card: "summary_large_image",
    title: titleDefault,
    description: descriptionDefault,
    images: [ogImage],
  },

  verification: {
    google: "f1e74bf4ed807a2b",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", type: "image/png", sizes: "192x192", url: "/android-chrome-192x192.png" },
      { rel: "icon", type: "image/png", sizes: "512x512", url: "/android-chrome-512x512.png" },
    ],
  },

  manifest: "/site.webmanifest",

  other: {
    "msapplication-TileColor": "#da532c",
    "msapplication-config": "/browserconfig.xml",
  },
}

// -------------------------
// ROOT LAYOUT
// -------------------------
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ing. Aleš Vachuška – Odhady nemovitostí",
    "url": siteUrl,
    "image": `${siteUrl}${ogImage}`,
    "description": descriptionDefault,

    // Doporučení: přidej kategorii služby
    "category": ["RealEstateAppraisal", "ProfessionalService"],

    "address": {
      "@type": "PostalAddress",
      "addressCountry": "CZ",
      "addressRegion": "Plzeňský kraj",
      "addressLocality": "Horažďovice",
      "streetAddress": "Slatina 68",
      "postalCode": "34101",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.38557533326912",
      "longitude": "13.741873179275624",
    },

    "areaServed": [
      "Horažďovice",
      "Strakonice",
      "Blatná",
      "Nepomuk",
      "Blovice",
      "Sušice",
      "Klatovy",
      "Plzeňský kraj",
      "Jihočeský kraj",
    ],

    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00",
      },
    ],

    "telephone": "+420774104020",
    "priceRange": "Kč",

    // Volitelné (pokud chceš, nech; pokud ne, smaž)
    "contactPoint": [
      {
        "@type": "ContactPoint",
        "telephone": "+420774104020",
        "contactType": "customer service",
        "areaServed": "CZ",
        "availableLanguage": ["cs"],
      },
    ],

    // sameAs přidej jen pokud máš reálné profily (Firmy.cz, Mapy.cz, Google Business Profile…)
    // "sameAs": [
    //   "https://... (odkaz na profil)",
    // ],
  }

  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <Script
          id="business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <LocalServiceArea />
          <Toaster />
          <FloatingContactButton />
        </ThemeProvider>
      </body>
    </html>
  )
}