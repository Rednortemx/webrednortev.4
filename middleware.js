import { NextResponse } from 'next/server';
import { REDIRECTS_ESTATICOS } from '@/lib/legacy';

// Rutas fijas del sitio anterior que Google todavía visita (/home, /privacy,
// /contact, /properties…). Se resuelven aquí y no en el router de Next para
// poder responder un 301 exacto —el que pide el anexo de Search Console— y
// para no pasar por el render de una página que solo iba a redirigir.
//
// El matcher de abajo limita el middleware EXCLUSIVAMENTE a esas rutas, así
// que el resto del sitio no paga ningún costo por esto.
export function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Se normaliza la barra final para que /team y /team/ se traten igual.
  const limpio = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  const destino = REDIRECTS_ESTATICOS[limpio.toLowerCase()];

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
    '/home',
    '/privacy',
    '/contact',
    '/contactanos',
    '/properties',
    '/nuestrascasas',
    '/es-MX',
    '/es-mx',
    '/blog',
    '/team',
    '/team/',
    '/agents',
    '/agentes',
    '/nuestro-equipo',
    '/assets/img/favicon.ico',
    '/servicios/comercial-industrial',
  ],
};
