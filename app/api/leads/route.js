// app/api/leads/route.js
// Reenvía un evento de interés/lead (uso de herramienta, cita agendada,
// formulario de contacto) a la Google Sheet de seguimiento, vía el Apps
// Script configurado en LEADS_WEBHOOK_URL. Espera:
// { tipo, nombre, telefono, email, detalle, notas }

import { NextResponse } from 'next/server';

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
globalThis.__rednorteLeadRateLimit = rateLimitStore;

function json(data, status) {
  return NextResponse.json(data, {
    status,
    headers: { 'Cache-Control': 'no-store' },
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

function isRateLimited(req) {
  const forwarded = req.headers.get('x-forwarded-for') || '';
  const ip = forwarded.split(',')[0].trim() || 'unknown';
  const now = Date.now();
  const current = rateLimitStore.get(ip);

  if (rateLimitStore.size > 2_000) {
    for (const [key, entry] of rateLimitStore) {
      if (now - entry.startedAt >= RATE_LIMIT_WINDOW_MS) rateLimitStore.delete(key);
    }
  }

  if (!current || now - current.startedAt >= RATE_LIMIT_WINDOW_MS) {
    rateLimitStore.set(ip, { count: 1, startedAt: now });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

export async function POST(req) {
  if (!isSameOrigin(req)) {
    return json({ success: false, message: 'Origen no permitido' }, 403);
  }

  if (isRateLimited(req)) {
    return json({ success: false, message: 'Demasiadas solicitudes. Intenta más tarde.' }, 429);
  }

  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.error('LEADS_WEBHOOK_URL no está configurada');
    return json({ success: false, message: 'El formulario no está disponible temporalmente' }, 503);
  }

  let payload;
  try {
    const rawBody = await req.text();
    if (Buffer.byteLength(rawBody, 'utf8') > MAX_BODY_BYTES) {
      return json({ success: false, message: 'Solicitud demasiado grande' }, 413);
    }
    payload = JSON.parse(rawBody);
  } catch {
    return json({ success: false, message: 'Cuerpo inválido' }, 400);
  }

  const lead = {
    tipo: clean(payload?.tipo, 80),
    nombre: clean(payload?.nombre, 120),
    telefono: clean(payload?.telefono, 40),
    email: clean(payload?.email, 254),
    detalle: clean(payload?.detalle, 500),
    notas: clean(payload?.notas, 2_000),
  };

  if (!TIPOS_PERMITIDOS.has(lead.tipo)) {
    return json({ success: false, message: 'Tipo de solicitud inválido' }, 400);
  }

  const phoneDigits = lead.telefono.replace(/\D/g, '');
  if (phoneDigits.length < 7 || phoneDigits.length > 15) {
    return json({ success: false, message: 'Teléfono inválido' }, 400);
  }

  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) {
    return json({ success: false, message: 'Correo electrónico inválido' }, 400);
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(lead),
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) {
      console.error('El webhook de leads respondió con estado', response.status);
      return json({ success: false, message: 'No fue posible registrar la solicitud' }, 502);
    }

    return json({ success: true }, 200);
  } catch (error) {
    console.error('Error al registrar lead', error instanceof Error ? error.message : 'Error desconocido');
    return json({ success: false, message: 'No fue posible registrar la solicitud' }, 502);
  }
}
