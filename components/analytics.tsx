'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useCookieConsent } from '@/components/cookie-consent'
import { captureAnalyticsLanding, setAnalyticsConsent, trackContactClick, trackPageView } from '@/lib/analytics'

export function Analytics() {
  const { analytics, expires } = useCookieConsent()
  const path = usePathname()
  const query = useSearchParams().toString()
  useEffect(() => {
    captureAnalyticsLanding()
    setAnalyticsConsent(analytics, expires)
    // Run after the route commit so that Next has updated the page title.
    const timer = window.setTimeout(trackPageView, 0)
    return () => window.clearTimeout(timer)
  }, [analytics, expires, path, query])
  useEffect(() => {
    const click = (event: MouseEvent) => {
      const anchor = event.target instanceof Element ? event.target.closest('a') : null
      if (anchor instanceof HTMLAnchorElement) trackContactClick(anchor)
    }
    document.addEventListener('click', click, true)
    return () => document.removeEventListener('click', click, true)
  }, [])
  return null
}
