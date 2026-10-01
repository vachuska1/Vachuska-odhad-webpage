'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { locales, localePath } from '@/lib/i18n'
import { useLocale } from '@/components/locale-provider'
const names = { cs: 'Čeština', en: 'English', de: 'Deutsch' }
const flags = { cs: '🇨🇿', en: '🇬🇧', de: '🇩🇪' }
const labels = { cs: 'Změnit jazyk', en: 'Change language', de: 'Sprache ändern' }
export function LanguageSwitcher({ hero = false }: { hero?: boolean }) {
 const path = usePathname()
 const { locale } = useLocale()
 const [open, setOpen] = useState(false)
 const container = useRef<HTMLElement>(null)
 const trigger = useRef<HTMLButtonElement>(null)
 const id = hero ? 'hero-language-options' : 'header-language-options'
 useEffect(() => setOpen(false), [path])
 useEffect(() => {
  if (!open) return
  const outside = (event: PointerEvent) => { if (!container.current?.contains(event.target as Node)) setOpen(false) }
  const escape = (event: KeyboardEvent) => { if (event.key === 'Escape') { setOpen(false); trigger.current?.focus() } }
  document.addEventListener('pointerdown', outside); document.addEventListener('keydown', escape)
  return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape) }
 }, [open])
 return <nav ref={container} className={`language-switcher${hero ? ' hero-languages' : ''}`} aria-label={labels[locale]} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget as Node)) setOpen(false) }}>
  <button ref={trigger} type="button" className="language-trigger" aria-expanded={open} aria-controls={id} aria-label={`${labels[locale]}: ${names[locale]}`} title={names[locale]} onClick={() => setOpen(value => !value)}><span aria-hidden="true">{flags[locale]}</span></button>
  {open && <div className="language-options" id={id}>{locales.filter(language => language !== locale).map(language => <Link key={language} href={localePath(path, language)} hrefLang={language} lang={language} aria-label={names[language]} title={names[language]} onClick={() => setOpen(false)}><span aria-hidden="true">{flags[language]}</span></Link>)}</div>}
 </nav>
}
