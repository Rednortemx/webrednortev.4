'use client';

import { createLeadSubmitter, trackConversion } from '@/lib/conversions';
const submitLeadRequest = createLeadSubmitter('contacto');

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { openModal } from '@/lib/modal';
import { SITE_CONTACT } from '@/lib/siteConfig';

const MOTIVOS = ['Quiero comprar', 'Quiero vender', 'Quiero rentar', 'Ofrecer en renta', 'Valuación', 'Quiero invertir', 'Info propiedad'];

// Slugs que otras páginas usan al enlazar aquí (p. ej. el CTA de
// /herramientas apunta a /contacto?motivo=estimacion) para que llegue con
// el motivo correcto ya seleccionado.
const MOTIVO_SLUGS = {
  comprar: 'Quiero comprar',
  vender: 'Quiero vender',
  rentar: 'Quiero rentar',
  'poner-en-renta': 'Ofrecer en renta',
  estimacion: 'Valuación',
  invertir: 'Quiero invertir',
  'info-propiedad': 'Info propiedad',
};

// Ported from the legacy setMotivo()/buildContactoMessage()/enviarContactoWA()/continuarContactoWA().
export default function ContactForm() {
  const [motivo, setMotivo] = useState(MOTIVOS[0]);

  // /contacto se prerenderiza estático, así que el slug solo puede leerse
  // ya en el navegador: va en un efecto y no en el useState inicial, que
  // durante la hidratación conserva el valor renderizado en el servidor.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('motivo');
    if (MOTIVO_SLUGS[slug]) setMotivo(MOTIVO_SLUGS[slug]);
  }, []);
  const [nombre, setNombre] = useState('');
  const [tel, setTel] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [priv, setPriv] = useState(false);
  const [status, setStatus] = useState({ sending: false, message: '', error: false });

  const buildMessage = () => {
    const lines = ['Hola, me gustaría más información.', ''];
    if (motivo) lines.push(`Motivo: ${motivo}`);
    if (nombre) lines.push(`Nombre: ${nombre}`);
    if (tel) lines.push(`Teléfono: ${tel}`);
    if (email) lines.push(`Correo: ${email}`);
    if (mensaje) lines.push('', `Mensaje: ${mensaje}`);
    return lines.join('\n');
  };

  const submitLead = async ({ openWhatsApp = false } = {}) => {
    if (status.sending) return;
    if (!nombre || !tel || !email) {
      alert('Por favor completa nombre, teléfono y correo electrónico.');
      return;
    }
    if (!priv) {
      alert('Debes aceptar el Aviso de Privacidad para continuar.');
      return;
    }

    if (openWhatsApp) trackConversion('whatsapp_clic', 'contacto');
    const whatsappUrl = `https://wa.me/${SITE_CONTACT.phoneDigits}?text=` + encodeURIComponent(buildMessage());
    const whatsappWindow = openWhatsApp
      ? window.open(whatsappUrl, '_blank', 'noopener,noreferrer')
      : null;
    setStatus({ sending: true, message: 'Enviando información…', error: false });

    try {
      const response = await submitLeadRequest('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tipo: 'Contacto general', nombre, telefono: tel, email, detalle: motivo, notas: mensaje }),
      });
      if (!response.ok) throw new Error(`Lead API respondió ${response.status}`);

      setStatus({ sending: false, message: 'Recibimos tu solicitud correctamente.', error: false });
      if (!openWhatsApp) openModal('successModal');
    } catch {
      setStatus({
        sending: false,
        message: openWhatsApp
          ? 'No pudimos registrar la solicitud, pero abrimos WhatsApp como canal alternativo.'
          : 'No pudimos registrar la solicitud. Intenta nuevamente o continúa por WhatsApp.',
        error: true,
      });
    }

    if (openWhatsApp && !whatsappWindow) window.location.href = whatsappUrl;
  };

  return (
    <div className="form-card">
      <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--gris-medio)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '0.75rem' }}>Motivo de contacto</h3>
      <div className="motivos">
        {MOTIVOS.map((m) => (
          <button key={m} type="button" className={`motivo-btn${motivo === m ? ' active' : ''}`} onClick={() => setMotivo(m)}>{m}</button>
        ))}
      </div>
      <div className="form-row" style={{ marginTop: '1.25rem' }}>
        <div className="form-group"><label htmlFor="contacto-nombre">Nombre *</label><input id="contacto-nombre" type="text" autoComplete="name" required placeholder="Tu nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} /></div>
        <div className="form-group"><label htmlFor="contacto-telefono">Teléfono *</label><input id="contacto-telefono" type="tel" autoComplete="tel" inputMode="tel" required placeholder="+52 (81)" value={tel} onChange={(e) => setTel(e.target.value)} /></div>
      </div>
      <div className="form-group"><label htmlFor="contacto-email">Correo electrónico *</label><input id="contacto-email" type="email" autoComplete="email" required placeholder="correo@ejemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} /></div>
      <div className="form-group"><label htmlFor="contacto-mensaje">Mensaje</label><textarea id="contacto-mensaje" rows="4" placeholder="Cuéntanos más sobre lo que necesitas..." value={mensaje} onChange={(e) => setMensaje(e.target.value)}></textarea></div>
      <div className="form-check">
        <input type="checkbox" id="priv2" checked={priv} onChange={(e) => setPriv(e.target.checked)} />
        <label htmlFor="priv2">Acepto el <Link href="/aviso-de-privacidad" style={{ color: 'var(--terracota)' }}>Aviso de Privacidad</Link>.</label>
      </div>
      <button className="btn-primary-full" type="button" onClick={() => submitLead()} disabled={status.sending}>
        {status.sending ? 'Enviando…' : 'Enviar mensaje'}
      </button>
      <button className="btn-wa-full" type="button" onClick={() => submitLead({ openWhatsApp: true })} disabled={status.sending}> Continuar por WhatsApp</button>
      {status.message && (
        <p aria-live="polite" style={{ color: status.error ? '#9e342d' : '#2e7d32', fontSize: '13px', marginTop: '.75rem' }}>
          {status.message}
        </p>
      )}
    </div>
  );
}
