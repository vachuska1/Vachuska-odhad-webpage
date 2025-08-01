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

const title = 'Ing. Aleš Vachuška | Odhady nemovitostí a tvorba webů'
const description = 'Jmenuji se Aleš Vachuška, věnuji se odhadům nemovitostí a tvorbě moderních webů'
const keywords = 'Odhady nemovitostí Plzeňský kraj, Oceňování nemovitostí Strakonice, Odhad domu Blatná, Odhad bytu Klatovy, odhad chalup Horažďovice, Odhad pozemků Západní čechy Ing. Aleš Vachuška, Tvorba webu Nepomuk, webdesign, obvyklá cena, odhady nemovitostí, moderní, web, levné'
const siteUrl = 'https://odhadyvachuska.cz'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export const metadata: Metadata = {
  title: {
    default: title,
    template: `%s | ${title.split('|')[0].trim()}`
  },
  description: description,
  keywords: keywords,
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: title,
    description: description,
    url: siteUrl,
    siteName: title,
    locale: 'cs_CZ',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: title,
    description: description,
  },
  verification: {
    google: 'f1e74bf4ed807a2b', // Google Search Console verification code
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Ing. Aleš Vachuška - Odhady nemovitostí a tvorba webů",
    "image": "https://odhadyvachuska.cz/gen8.webp",
    "description": "Odhady a oceňování nemovitostí v Plzeňském kraji",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Plzeňský kraj",
      "addressLocality": "Horažďovice"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "49.3207",
      "longitude": "13.7008"
    },
    "areaServed": ["Strakonice", "Blatná", "Horazdovice", "Klatovy", "Nepomuk", "Plzeňský kraj"],
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "telephone": "+420774104020",
    "priceRange": "Kč"
  }

  return (
    <html lang="cs" suppressHydrationWarning>
      <head>
        <Script
          id="business-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd)
          }}
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
