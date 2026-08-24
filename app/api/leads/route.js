// app/api/leads/route.js
// Reenvía un evento de interés/lead (uso de herramienta, cita agendada,
// formulario de contacto) a la Google Sheet de seguimiento, vía el Apps
// Script configurado en LEADS_WEBHOOK_URL. Espera:
// { tipo, nombre, telefono, email, detalle, notas }

import { NextResponse } from 'next/server';

// Eventos que registran interés sin que la persona haya dejado sus datos
// (p. ej. abrir WhatsApp desde una ficha): sirven para medir qué propiedades
// generan contactos, aunque el teléfono solo le llegue al asesor.
const TIPOS_SIN_CONTACTO = new Set(['Interés por WhatsApp']);

export async function POST(req) {
  const webhookUrl = process.env.LEADS_WEBHOOK_URL;
  if (!webhookUrl) {
    return NextResponse.json(
      { success: false, message: 'Falta configurar LEADS_WEBHOOK_URL en las variables de entorno de Vercel' },
      { status: 500 }
    );
  }

  let payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: 'Cuerpo inválido' }, { status: 400 });
  }

  if (!payload.tipo) {
    return NextResponse.json({ success: false, message: 'Falta el tipo de evento' }, { status: 400 });
  }

  if (!payload.telefono && !TIPOS_SIN_CONTACTO.has(payload.tipo)) {
    return NextResponse.json({ success: false, message: 'Faltan datos requeridos (telefono)' }, { status: 400 });
  }

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({
        tipo: payload.tipo,
        nombre: payload.nombre || '',
        telefono: payload.telefono || '',
        email: payload.email || '',
        detalle: payload.detalle || '',
        notas: payload.notas || '',
      }),
    });
    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ success: false, message: String(err) }, { status: 500 });
  }
}
