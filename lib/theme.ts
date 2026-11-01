export type Theme = 'light' | 'dark'
type Preference = { theme: Theme; expiresAt: number }
type ThemeController = { getTheme: () => Theme; setTheme: (theme: Theme) => void; refresh: () => void }
declare global { interface Window { __vachuskaTheme?: ThemeController } }

// Runs synchronously in <head> before the body is painted. The same controller serves
// both language controls and every locale, including when browser storage is unavailable.
export function initializeTheme() {
 if (window.__vachuskaTheme) { window.__vachuskaTheme.refresh(); return }
 const key = 'odhady-theme-v1'
 let preference: Preference | null = null
 let timer: ReturnType<typeof setTimeout>
 function nextBoundary(now: Date) {
  const next = new Date(now.getTime())
  const hour = now.getHours()
  if (hour < 8) next.setHours(8, 0, 0, 0)
  else if (hour < 20) next.setHours(20, 0, 0, 0)
  else { next.setDate(next.getDate() + 1); next.setHours(8, 0, 0, 0) }
  return next.getTime()
 }
 function readPreference() {
  try { preference = JSON.parse(localStorage.getItem(key) || 'null') } catch { /* Keep in-memory choice when storage is blocked. */ }
 }
 function refresh() {
  const now = new Date()
  const boundary = nextBoundary(now)
  const valid = preference && (preference.theme === 'light' || preference.theme === 'dark') && preference.expiresAt > now.getTime() && preference.expiresAt === boundary
  if (preference && !valid) {
   preference = null
   try { localStorage.removeItem(key) } catch { /* Optional persistence. */ }
  }
  const theme: Theme = valid && preference ? preference.theme : now.getHours() >= 8 && now.getHours() < 20 ? 'light' : 'dark'
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  window.dispatchEvent(new Event('vachuska-theme-change'))
  clearTimeout(timer)
  timer = setTimeout(refresh, Math.max(1, boundary - now.getTime()))
 }
 readPreference()
 window.__vachuskaTheme = {
  getTheme: () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  setTheme: (theme: Theme) => {
   if (theme !== 'light' && theme !== 'dark') return
   preference = {theme, expiresAt: nextBoundary(new Date())}
   try { localStorage.setItem(key, JSON.stringify(preference)) } catch { /* In-memory choice still works until the boundary. */ }
   refresh()
  },
  refresh,
 }
 window.addEventListener('storage', event => { if (event.key === key || event.key === null) { readPreference(); refresh() } })
 window.addEventListener('focus', refresh)
 window.addEventListener('pageshow', refresh)
 document.addEventListener('visibilitychange', () => { if (!document.hidden) refresh() })
 refresh()
}
export const themeScript = `(${initializeTheme.toString()})();`
