import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { FloatingContactButton } from "@/components/floating-contact-button"
import { LocalServiceArea } from "@/components/LocalServiceArea"
import Script from 'next/script'

const inter = Inter({ subsets: ["latin"] })

// -------------------------
// SEO META DATA
// -------------------------
const siteUrl = 'https://www.odhadyvachuska.cz'
const title = 'Ing. Aleš Vachuška | Oceňování nemovitostí Horažďovice, Blatná a okolí'
const description =
  'Profesionální oceňování nemovitostí v Horažďovicích, Strakonicích, Blatné, Nepomuku, Blovicích, Sušici a Katovicích. Odhady bytů, domů, chat, chalup, pozemků i zemědělských objektů – rychle, srozumitelně a spolehlivě.'
const keywords =
  'odhad nemovitosti Horažďovice, odhady nemovitostí Strakonice, odhad domu Blatná, odhad bytu Nepomuk, odhady pozemků Blovice, ocenění chaty Sušice, odhady chalup Katovice, odhad ceny nemovitosti Plzeňský kraj, obvyklá cena nemovitosti, ocenění pozemků, odhady realit'

// -------------------------
// VIEWPORT
// -------------------------
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

// -------------------------
// META DATA
// -------------------------
export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | Ing. Aleš Vachuška – Oceňování nemovitostí`
  },
  description: description,
  keywords: keywords,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/odhady',
  },
  openGraph: {
    title: title,
    description: description,
    url: siteUrl + '/odhady',
    siteName: 'Ing. Aleš Vachuška – Oceňování nemovitostí',
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
  },
  verification: {
    google: 'f1e74bf4ed807a2b', // Google Search Console
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '192x192',
        url: '/android-chrome-192x192.png',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '512x512',
        url: '/android-chrome-512x512.png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  other: {
    'msapplication-TileColor': '#da532c',
    'msapplication-config': '/browserconfig.xml',
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
    "image": "https://odhadyvachuska.cz/gen8.webp",
    "description":
      "Profesionální oceňování nemovitostí v Horažďovicích, Strakonicích, Blatné, Nepomuku, Blovicích, Sušici a Katovicích. Byty, domy, chaty, chalupy, pozemky i zemědělské objekty.",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Plzeňský kraj",
      "addressLocality": "Horažďovice",
      "streetAddress": "Slatina 68",
      "postalCode": "34101"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.38557533326912",
      "longitude": "13.741873179275624"
    },
    "areaServed": [
      "Horažďovice",
      "Strakonice",
      "Blatná",
      "Nepomuk",
      "Blovice",
      "Sušice",
      "Katovice",
      "Plzeňský kraj"
    ],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "telephone": "+420774104020",
    "priceRange": "Kč",
    "url": siteUrl
  }

  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        {/* LocalBusiness Schema.org */}
        <Script
          id="business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd),
          }}
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <LocalServiceArea />
          <Toaster />
          <FloatingContactButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
