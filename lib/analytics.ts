// Basic consent mode: no Google requests until explicit analytics consent.
const containerId = process.env.NEXT_PUBLIC_GTM_ID?.trim() || ''
export const analyticsConfigured = /^GTM-[A-Z0-9]+$/.test(containerId)
let allowed = false
let loaded = false
let lastPage = ''
let previousPage = ''
let consentExpires = 0
let landingUrl = ''
export function captureAnalyticsLanding() {
  if (!landingUrl) landingUrl = analyticsUrl(window.location.href)
}
function campaignParameters() {
  const result: Record<string, string> = {}
  if (landingUrl) {
    const query = new URL(landingUrl).searchParams
    for (const name of ['source', 'medium', 'campaign', 'id', 'term', 'content']) {
      const value = query.get(`utm_${name}`)
      if (value) result[name === 'campaign' ? 'campaign_name' : `campaign_${name}`] = value
    }
  }
  return result
}

declare global { interface Window { dataLayer?: unknown[] } }
function push(value: unknown) { (window.dataLayer ||= []).push(value) }
function consentCommand(..._args: unknown[]) { push(arguments) }
const denied = { analytics_storage: 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' }

export function setAnalyticsConsent(granted: boolean, expires = Infinity) {
  const wasAllowed = allowed
  allowed = granted && analyticsConfigured && Date.now() < expires
  consentExpires = expires
  if (!allowed) {
    if (loaded) consentCommand('consent', 'update', denied)
    return
  }
  if (!loaded) {
    consentCommand('consent', 'default', denied)
    consentCommand('consent', 'update', { ...denied, analytics_storage: 'granted' })
    push({ page_location: analyticsUrl(window.location.href), page_referrer: analyticsUrl(document.referrer), ...campaignParameters() })
    push({ 'gtm.start': Date.now(), event: 'gtm.js' })
    loaded = true
    const script = document.createElement('script')
    script.id = 'site-gtm'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtm.js?id=${containerId}`
    document.head.appendChild(script)
  } else if (!wasAllowed) {
    consentCommand('consent', 'update', { ...denied, analytics_storage: 'granted' })
  }
}
export function analyticsAllowed() { return allowed && Date.now() < consentExpires }

// Send only campaign parameters, never arbitrary query strings or URL fragments.
export function analyticsUrl(value: string) {
  try {
    const url = new URL(value)
    const clean = new URL(url.origin + url.pathname)
    for (const key of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_id', 'utm_term', 'utm_content']) {
      const value = url.searchParams.get(key)
      if (value) clean.searchParams.set(key, value.slice(0, 150))
    }
    return clean.href
  } catch { return '' }
}
export function trackPageView() {
  if (!analyticsAllowed()) return
  const location = analyticsUrl(window.location.href)
  if (location === lastPage) return
  push({ event: 'page_view', page_path: window.location.pathname, page_location: location,
    ...(!lastPage ? campaignParameters() : {}),
    page_title: document.title, page_referrer: previousPage || analyticsUrl(document.referrer),
    form_name: undefined, service_type: undefined, link_url: undefined, link_text: undefined })
  lastPage = location
  previousPage = location
}
export function trackContactClick(anchor: HTMLAnchorElement) {
  if (!analyticsAllowed()) return
  const raw = anchor.getAttribute('href') || ''
  const event = /^tel:/i.test(raw) ? 'click_phone' : /^mailto:/i.test(raw) ? 'click_email' : null
  if (!event) return
  push({ event, page_path: window.location.pathname, page_location: analyticsUrl(window.location.href),
    link_url: raw.split(/[?#]/)[0], link_text: (anchor.textContent || anchor.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ').slice(0, 150),
    form_name: undefined, service_type: undefined })
}
export function trackLead(success: boolean, service: string, pagePath: string) {
  if (!success || !analyticsAllowed()) return
  const types: Record<string, string> = { 'Dědictví': 'inheritance', 'Pro vlastní potřebu': 'personal', 'Vypořádání majetku': 'settlement', 'Jiné': 'other' }
  push({ event: 'generate_lead', page_location: new URL(pagePath, window.location.origin).href, form_name: 'property_enquiry', page_path: pagePath,
    service_type: types[service] || 'other', link_url: undefined, link_text: undefined })
}
export function revokeAnalytics() {
  const wasLoaded = loaded
  setAnalyticsConsent(false)
  // Delete first-party GA cookies on the host and its parent domains.
  const parts = window.location.hostname.split('.')
  const domains = ['', ...parts.map((_, index) => parts.slice(index).join('.'))]
  const paths = ['/', ...window.location.pathname.split('/').map((_, i, all) => all.slice(0, i + 1).join('/') || '/')]
  for (const cookie of document.cookie.split(';')) {
    const name = cookie.trim().split('=')[0]
    if (!/^_ga(?:_|$)|^_gid$|^_gat(?:_|$)/.test(name)) continue
    for (const domain of domains) for (const path of paths) document.cookie = `${name}=; Max-Age=0; path=${path}${domain ? `; domain=${domain}` : ''}; SameSite=Lax`
  }
  // Removing a script cannot unload executed tags. Reload with the saved denial.
  if (wasLoaded) window.location.reload()
}
