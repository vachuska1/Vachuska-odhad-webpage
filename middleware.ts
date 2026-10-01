import { NextResponse, type NextRequest } from 'next/server'
export function middleware(request: NextRequest) {
 const host = request.headers.get('host')?.split(':')[0]
 const protocol = request.headers.get('x-forwarded-proto')?.split(',')[0].trim() || request.nextUrl.protocol.replace(':', '')
 if (host === 'odhadyvachuska.cz' || (host === 'www.odhadyvachuska.cz' && protocol === 'http')) {
  const canonical = new URL(request.nextUrl.pathname + request.nextUrl.search, 'https://www.odhadyvachuska.cz')
  return NextResponse.redirect(canonical, 308)
 }
 const headers = new Headers(request.headers)
 headers.set('x-site-locale', /^\/en(?:\/|$)/.test(request.nextUrl.pathname) ? 'en' : /^\/de(?:\/|$)/.test(request.nextUrl.pathname) ? 'de' : 'cs')
 return NextResponse.next({ request: { headers } })
}
export const config = { matcher: ['/((?!api|_next|.*\\..*).*)'] }
