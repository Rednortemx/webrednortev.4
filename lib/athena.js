// Piezas compartidas por las rutas /api/athena/*, el canal por el que el
// asistente de IA lee el inventario y los asesores de este sitio.
//
// Athena corre fuera de Vercel, así que no puede ser same-origin como el
// resto de las APIs del sitio: se autentica con un token fijo que vive en
// ATHENA_TOKEN. Mientras esa variable no exista, las rutas responden 503 y
// no exponen nada, de modo que desplegar esto no cambia el sitio hasta que
// alguien decide encenderlo.

import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

const VENTANA_MS = 10 * 60 * 1000;
const MAX_POR_VENTANA = 60;

const contador = globalThis.__rednorteAthenaRateLimit || new Map();
globalThis.__rednorteAthenaRateLimit = contador;

export function json(data, status, extraHeaders = {}) {
  return NextResponse.json(data, {
    status,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
      'X-Content-Type-Options': 'nosniff',
      'X-Robots-Tag': 'noindex, nofollow',
      ...extraHeaders,
    },
  });
}

/**
 * Compara el token recibido contra ATHENA_TOKEN.
 * Devuelve null si la variable no está configurada, para poder distinguir
 * "apagado" (503) de "credencial equivocada" (401).
 */
export function tokenValido(req) {
  const esperado = process.env.ATHENA_TOKEN || '';
  if (!esperado) return null;

  const cabecera = req.headers.get('authorization') || '';
  const recibido = cabecera.startsWith('Bearer ') ? cabecera.slice(7).trim() : '';
  if (!recibido) return false;

  // Se comparan los hashes y no las cadenas: así la comparación es de
  // tiempo constante y no se filtra el largo del token por la duración.
  const a = createHash('sha256').update(recibido).digest();
  const b = createHash('sha256').update(esperado).digest();
  return timingSafeEqual(a, b);
}

export function limitar(req) {
  const reenviado = req.headers.get('x-forwarded-for') || '';
  const ip = reenviado.split(',')[0].trim() || 'desconocida';
  const clave = createHash('sha256').update(ip).digest('hex');
  const ahora = Date.now();
  const actual = contador.get(clave);

  if (contador.size > 2_000) {
    for (const [k, v] of contador) {
      if (ahora - v.desde >= VENTANA_MS) contador.delete(k);
    }
  }

  if (!actual || ahora - actual.desde >= VENTANA_MS) {
    contador.set(clave, { veces: 1, desde: ahora });
    return { limitado: false, esperar: 0 };
  }

  actual.veces += 1;
  const esperar = Math.max(1, Math.ceil((VENTANA_MS - (ahora - actual.desde)) / 1000));
  return { limitado: actual.veces > MAX_POR_VENTANA, esperar };
}

/**
 * Puerta de entrada común: token, método y límite de uso.
 * Devuelve una respuesta cuando hay que cortar, o null para seguir.
 */
export function revisarAcceso(req) {
  const token = tokenValido(req);
  if (token === null) {
    return json({ error: 'El canal de Athena no está configurado en este sitio.' }, 503);
  }
  if (!token) {
    return json({ error: 'Token inválido.' }, 401);
  }

  const limite = limitar(req);
  if (limite.limitado) {
    return json({ error: 'Demasiadas solicitudes.' }, 429,
      { 'Retry-After': String(limite.esperar) });
  }

  return null;
}
