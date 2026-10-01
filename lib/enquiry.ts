export const ENQUIRY_TYPES = ['Dědictví', 'Pro vlastní potřebu', 'Vypořádání majetku', 'Jiné']
export const MAX_PROPERTIES = 10
export const MAX_FILES = 20
export const MAX_ATTACHMENT_BYTES = 4 * 1024 * 1024
export const ACCEPTED_FILES = '.pdf,.jpg,.jpeg,.png,.heic,.webp'
export const PROPERTY_GROUPS = [
  { label: 'STAVBY A JEDNOTKY', options: ['Rodinný dům', 'Byt', 'Chata/chalupa', 'Zemědělská usedlost', 'Garáž', 'Kancelář/komerční prostor', 'Jiné stavby a jednotky'] },
  { label: 'POZEMKY', options: ['Orná půda', 'Trvalý travní porost', 'Lesní pozemek', 'Stavební pozemek', 'Vodní plocha', 'Jiné pozemky'] },
]
export type PropertyData = { type: string; cadastralArea: string; lv: string; parcels: string }
export function attachmentError(files: { name: string; size: number }[]): string | null {
  if (files.length > MAX_FILES) return `Přiložte nejvýše ${MAX_FILES} souborů.`
  if (files.some(file => !/\.(pdf|jpe?g|png|heic|webp)$/i.test(file.name))) return 'Povoleny jsou soubory PDF, JPG, JPEG, PNG, HEIC a WebP.'
  if (files.some(file => file.size === 0)) return 'Prázdný soubor nelze přiložit.'
  if (files.reduce((sum, file) => sum + file.size, 0) > MAX_ATTACHMENT_BYTES) return 'Přílohy mohou mít dohromady nejvýše 4 MB. Větší podklady můžete po domluvě poslat e-mailem.'
  return null
}
export function parseProperties(raw: string): PropertyData[] | null {
  if (raw.length > 10000) return null
  try {
    const values: unknown = JSON.parse(raw || '[]')
    if (!Array.isArray(values) || values.length > MAX_PROPERTIES) return null
    const types = PROPERTY_GROUPS.flatMap(group => group.options)
    if (!values.every(p => p && typeof p === 'object' && typeof p.type === 'string' && (p.type === '' || types.includes(p.type)) && typeof p.cadastralArea === 'string' && p.cadastralArea.length <= 200 && typeof p.lv === 'string' && p.lv.length <= 50 && (p.parcels === undefined || (typeof p.parcels === 'string' && p.parcels.length <= 1000)))) return null
    return values.map(p => ({ type: p.type, cadastralArea: p.cadastralArea.trim(), lv: p.lv.trim(), parcels: (p.parcels || '').trim() }))
  } catch { return null }
}
