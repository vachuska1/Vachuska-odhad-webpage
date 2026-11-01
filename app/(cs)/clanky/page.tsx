import { ArticleIndex } from '@/components/article-index'
import { pageMetadata } from '@/lib/site'
export const metadata = pageMetadata('Články a rady k oceňování nemovitostí', 'Praktické informace o odhadech nemovitostí pro dědictví, vypořádání majetku, koupi, prodej i vlastní potřebu.', '/clanky')
export default function Page() { return <ArticleIndex /> }
