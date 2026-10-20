import { NextResponse } from 'next/server';
import { REDIRECTS_ESTATICOS } from '@/lib/legacy';
import { canonicalOriginRedirect } from '@/lib/canonical';

// Rutas fijas del sitio anterior que Google todavía visita (/home, /privacy,
// /contact, /properties…). Se resuelven aquí y no en el router de Next para
// poder responder un 301 exacto —el que pide el anexo de Search Console— y
// para no pasar por el render de una página que solo iba a redirigir.
//
// El middleware también protege el origen canónico de todos los documentos
// públicos; las redirecciones legacy se aplican después de esa normalización.
export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Vercel currently enforces both redirects at the edge, but keeping the
  // invariant in application code prevents a future domain/configuration
  // change from serving an indexable HTTP or apex-host duplicate. Preview
  // and local hosts are deliberately left untouched.
  const canonicalOrigin = canonicalOriginRedirect({
    host: request.headers.get('x-forwarded-host') || request.headers.get('host'),
    protocol: request.headers.get('x-forwarded-proto') || request.nextUrl.protocol,
    pathname,
    search,
  });
  if (canonicalOrigin) return NextResponse.redirect(canonicalOrigin, 308);

  // Se normaliza la barra final para que /team y /team/ se traten igual.
  const limpio = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const limpioLower = limpio.toLowerCase();
  // Las fichas individuales del equipo del sitio anterior (/team/nombre-apellido)
  // no tienen contenido equivalente en /equipo/[slug] (todavía sin datos reales
  // de asesores) — se mandan al listado, igual que ya se hacía con /team a secas,
  // en vez de dejarlas 404 sin ninguna señal para Google de que el contenido se movió.
  const destino = REDIRECTS_ESTATICOS[limpioLower] || (limpioLower.startsWith('/team/') ? '/equipo' : null);

  if (destino) {
    const url = new URL(destino, request.url);
    // El favicon viejo se sirve tal cual; en los demás casos se conserva el
    // query string por si traía campaña o parámetros de seguimiento.
    if (!destino.startsWith('/icon')) url.search = search;
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Domain normalization must cover every public document, including
    // sitemap.xml and robots.txt. Framework assets and API responses do not
    // need an SEO redirect.
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
