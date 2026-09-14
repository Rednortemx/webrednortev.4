// Receives lead events from the Rednorte website and forwards them to the
// server-only Google Apps Script URL configured in LEADS_WEBHOOK_URL.

import { createHash, randomBytes, randomUUID } from 'node:crypto';
import { NextResponse } from 'next/server';
import { validLeadWebhookUrl } from '../../../lib/leadWebhook.mjs';

export const runtime = 'nodejs';

const MAX_BODY_BYTES = 12_000;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 12;
const TIPOS_PERMITIDOS = new Set([
  'Bolsa de trabajo',
  'Cita agendada',
  'Clientes extranjeros',
  'Comprar propiedad',
  'Contacto general',
  'Contacto por WhatsApp',
  'Estimación de Valor',
  'Inversión inmobiliaria',
  'Master Broker',
  'Rentar propiedad',
  'Reporte de Vendibilidad',
  'Vender propiedad',
]);

const rateLimitStore = globalThis.__rednorteLeadRateLimit || new Map();
const rateLimitSalt = globalThis.__rednorteLeadRateLimitSalt || randomBytes(32).toString('hex');
globalThis.__rednorteLeadRateLimit = rateLimitStore;
globalThis.__rednorteLeadRateLimitSalt = rateLimitSalt;

function json(data, status, extraHeaders = {}) {
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

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function isSameOrigin(req) {
  const origin = req.headers.get('origin');
  const host = req.headers.get('x-forwarded-host') || req.headers.get('host');
  if (!origin || !host) return false;

  try {
    return new URL(origin).host === host;
  } catch {
    return false;
  }
}

function clientFingerprint(req) {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  const ip = forwarded.split(',')[0].trim() || 'unknown';
  return createHash('sha256').update(rateLimitSalt).update(ip).digest('hex');
}

function rateLimit(req) {
  const key = clientFingerprint(req);
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (rateLimitStore.size > 2_000) {
    for (const [storedKey, entry] of rateLimitStore) {
      if (now - entry.startedAt >= RATE_LIMIT_WINDOW_MS) rateLimitStore.delete(storedKey);
    }
  }

  if (!current || now - current.startedAt >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(key, { count: 1, startedAt: now });
    return { limited: false, retryAfter: 0 };
  }

  current.count += 1;
  const retryAfter = Math.max(1, Math.ceil((RATE_LIMIT_WINDOW_MS - (now - current.startedAt)) / 1000));
  return { limited: current.count > RATE_LIMIT_MAX, retryAfter };
}

function logFailure(event, requestId, metadata = {}) {
  console.error(JSON.stringify({ event, requestId, ...metadata }));
}

function logDelivery(requestId, metadata = {}) {
  console.info(JSON.stringify({ event: 'lead_webhook_delivered', requestId, ...metadata }));
}

export async function GET() {
  const ready = Boolean(validLeadWebhookUrl(process.env.LEADS_WEBHOOK_URL));
  return json(
    { status: ready ? 'ready' : 'unavailable' },
    ready ? 200 : 503,
  );
}

export async function POST(req) {
  const requestId = randomUUID();
  const responseHeaders = { 'X-Request-Id': requestId };
  const reply = (data, status, extraHeaders = {}) => json(
    { ...data, requestId },
    status,
    { ...responseHeaders, ...extraHeaders },
  );

  if (!isSameOrigin(req)) {
    return reply({ success: false, message: 'Origen no permitido' }, 403);
  }

  const fetchSite = req.headers.get('sec-fetch-site');
  if (fetchSite && fetchSite !== 'same-origin') {
    return reply({ success: false, message: 'Origen no permitido' }, 403);
  }

  const contentType = req.headers.get('content-type') || '';
  if (!contentType.toLowerCase().startsWith('application/json')) {
    return reply({ success: false, message: 'Tipo de contenido no permitido' }, 415);
  }

  const limit = rateLimit(req);
  if (limit.limited) {
    return reply(
      { success: false, message: 'Demasiadas solicitudes. Intenta más tarde.' },
      429,
      { 'Retry-After': String(limit.retryAfter) },
    );
  }

  let payload;
  try {
    const rawBody = await req.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
      return reply({ success: false, message: 'Solicitud demasiado grande' }, 413);
    }
    payload = JSON.parse(rawBody);
  } catch {
    return reply({ success: false, message: 'Cuerpo inválido' }, 400);
  }

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return reply({ success: false, message: 'Cuerpo inválido' }, 400);
  }

  // Honeypot. Legitimate forms never populate this field; common form bots do.
  // Return success without forwarding so automated senders cannot tune against it.
  if (clean(payload.website, 200)) {
    return reply({ success: true }, 200);
  }

  const lead = {
    tipo: clean(payload.tipo, 80),
    nombre: clean(payload.nombre, 120),
    telefono: clean(payload.telefono, 40),
    email: clean(payload.email, 254),
    detalle: clean(payload.detalle, 500),
    notas: clean(payload.notas, 2_000),
  };

  if (!TIPOS_PERMITIDOS.has(lead.tipo)) {
    return reply({ success: false, message: 'Tipo de solicitud inválido' }, 400);
  }

  if (lead.nombre.length < 2) {
    return reply({ success: false, message: 'Nombre inválido' }, 400);
  }

  const phoneDigits = lead.telefono.replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return reply({ success: false, message: 'Teléfono inválido' }, 400);
  }

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return reply({ success: false, message: 'Correo electrónico inválido' }, 400);
  }

  const webhookUrl = validLeadWebhookUrl(process.env.LEADS_WEBHOOK_URL);
  if (!webhookUrl) {
    logFailure('lead_configuration_invalid', requestId);
    return reply(
      { success: false, message: 'El formulario no está disponible temporalmente' },
      503,
    );
  }

  const startedAt = Date.now();
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(lead),
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      logFailure('lead_webhook_rejected', requestId, {
        status: response.status,
        tipo: lead.tipo,
        durationMs: Date.now() - startedAt,
      });
      return reply(
        { success: false, message: 'No fue posible registrar la solicitud' },
        502,
      );
    }

    logDelivery(requestId, {
      status: response.status,
      tipo: lead.tipo,
      durationMs: Date.now() - startedAt,
    });
    return reply({ success: true }, 200);
  } catch (error) {
    logFailure('lead_webhook_failed', requestId, {
      tipo: lead.tipo,
      error: error instanceof Error ? error.name : 'UnknownError',
      durationMs: Date.now() - startedAt,
    });
    return reply(
      { success: false, message: 'No fue posible registrar la solicitud' },
      502,
    );
  }
}
