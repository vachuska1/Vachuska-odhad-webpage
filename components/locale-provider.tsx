'use client'
import { createContext, useContext, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { localePath, translate, type Locale } from '@/lib/i18n'
const LocaleContext = createContext<Locale>('cs')
export function LocaleProvider({ locale, children }: { locale: Locale; children: React.ReactNode }) {
 const path = usePathname()
 const current: Locale = !path ? locale : path === '/en' || path.startsWith('/en/') ? 'en' : path === '/de' || path.startsWith('/de/') ? 'de' : 'cs'
 useEffect(() => { document.documentElement.lang = current }, [current])
 return <LocaleContext.Provider value={current}>{children}</LocaleContext.Provider>
}
export function useLocale() {
 const locale = useContext(LocaleContext)
 return { locale, t: (text: string) => translate(locale, text), href: (path: string) => localePath(path, locale) }
}

export function SkipLink() {
 const { t } = useLocale()
 return <a className="skip-link" href="#main-content">{t("Přejít na obsah")}</a>
}
