'use client'
import { useSyncExternalStore } from 'react'
import { Moon, Sun } from 'lucide-react'
import { useLocale } from '@/components/locale-provider'
import type { Theme } from '@/lib/theme'

const labels = {cs: 'Tmavý režim', en: 'Dark mode', de: 'Dunkler Modus'}
function subscribe(listener: () => void) {
 window.addEventListener('vachuska-theme-change', listener)
 return () => window.removeEventListener('vachuska-theme-change', listener)
}
const snapshot = (): Theme => window.__vachuskaTheme?.getTheme() ?? 'light'
const serverSnapshot = (): Theme => 'light'
export function ThemeToggle() {
 const { locale } = useLocale()
 const theme = useSyncExternalStore(subscribe, snapshot, serverSnapshot)
 return <button type="button" className="theme-toggle" role="switch" aria-checked={theme === 'dark'} aria-label={labels[locale]} title={labels[locale]} onClick={() => window.__vachuskaTheme?.setTheme(theme === 'dark' ? 'light' : 'dark')}>
  <span className="theme-toggle-track" aria-hidden="true"><Sun size={13} /><Moon size={13} /><span className="theme-toggle-thumb" /></span>
 </button>
}
