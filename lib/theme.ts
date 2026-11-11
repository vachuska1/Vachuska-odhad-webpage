export type Theme = 'light' | 'dark'
type Preference = { theme: Theme }
type ThemeController = { getTheme: () => Theme; setTheme: (theme: Theme) => void; refresh: () => void }
declare global { interface Window { __vachuskaTheme?: ThemeController } }

// Runs synchronously in <head> before the body is painted. The same controller serves
// both language controls and every locale, including when browser storage is unavailable.
export function initializeTheme() {
 if (window.__vachuskaTheme) { window.__vachuskaTheme.refresh(); return }
 const key = 'odhady-theme-v1'
 let preference: Preference | null = null
 function readPreference() {
  try { preference = JSON.parse(localStorage.getItem(key) || 'null') } catch { /* Keep in-memory choice when storage is blocked. */ }
 }
 function refresh() {
  const theme: Theme = preference?.theme === 'dark' ? 'dark' : 'light'
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme
  window.dispatchEvent(new Event('vachuska-theme-change'))
 }
 readPreference()
 window.__vachuskaTheme = {
  getTheme: () => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light',
  setTheme: (theme: Theme) => {
   if (theme !== 'light' && theme !== 'dark') return
   preference = {theme}
   try { localStorage.setItem(key, JSON.stringify(preference)) } catch { /* In-memory choice still works for this visit. */ }
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
