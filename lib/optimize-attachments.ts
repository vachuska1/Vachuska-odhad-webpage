import { attachmentError, MAX_ATTACHMENT_BYTES } from './enquiry'

// Keep photo optimization below the upload limit when possible.
export const TARGET_ATTACHMENT_BYTES = 3 * 1024 * 1024
export const TOO_LARGE = 'Přílohy jsou příliš velké i po automatickém zmenšení. Odeberte prosím některé soubory nebo nás kontaktujte telefonicky.'
const total = (files: File[]) => files.reduce((sum, file) => sum + file.size, 0)

async function resize(file: File, quality: number): Promise<File> {
  if (!/\.(jpe?g|png|webp|heic)$/i.test(file.name)) return file
  // PNG and lossless WebP often contain plans/text: preserve pixels and use lossless PNG.
  const lossless = /\.(png|webp)$/i.test(file.name)
  let bitmap: ImageBitmap | undefined
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' })
    if (bitmap.width * bitmap.height > 60_000_000) throw new Error('dimensions')
    const scale = lossless ? 1 : Math.min(1, 1920 / Math.max(bitmap.width, bitmap.height))
    const canvas = document.createElement('canvas')
    canvas.width = Math.max(1, Math.round(bitmap.width * scale))
    canvas.height = Math.max(1, Math.round(bitmap.height * scale))
    const context = canvas.getContext('2d')
    if (!context) throw new Error('canvas')
    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
    const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(resolve, lossless ? 'image/png' : 'image/jpeg', quality))
    canvas.width = canvas.height = 1
    if (!blob) throw new Error('encode')
    if (blob.size >= file.size) return file
    return new File([blob], file.name.replace(/\.[^.]+$/, lossless ? '.png' : '.jpg'), {type:blob.type,lastModified:file.lastModified})
  } catch {
    // HEIC is still accepted unchanged by the existing backend when it fits.
    if (/\.heic$/i.test(file.name) && file.size <= TARGET_ATTACHMENT_BYTES) return file
    throw new Error(`Fotografii „${file.name.slice(0,100)}“ nelze v tomto prohlížeči zpracovat. Zvolte platný JPG, PNG nebo WebP, případně nás kontaktujte telefonicky.`)
  } finally { bitmap?.close() }
}
export async function optimizeAttachments(files: File[]): Promise<File[]> {
  const validation = attachmentError(files.map(file => ({name:file.name,size:Math.min(file.size,1)})))
  if (validation) throw new Error(validation)
  // Process sequentially to avoid decoding all phone photos into memory at once.
  const optimized: File[] = []
  for (const file of files) optimized.push(await resize(file, .86))
  for (const quality of [.76, .66]) {
    if (total(optimized) <= TARGET_ATTACHMENT_BYTES) break
    for (let i = 0; i < optimized.length; i++) {
      if (/\.jpe?g$/i.test(optimized[i].name)) optimized[i] = await resize(optimized[i], quality)
    }
  }
  return optimized
}
export function optimizedAttachmentError(files: File[]): string | null {
  if (total(files) > MAX_ATTACHMENT_BYTES) return TOO_LARGE
  return attachmentError(files)
}
