'use client';

import { createLeadSubmitter, trackConversion } from '@/lib/conversions';
const submitLeadRequest = createLeadSubmitter('vender');

import { useState } from 'react';
import Link from 'next/link';
import HoneypotField from '@/components/HoneypotField';

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  propertyType: '',
  municipality: '',
  neighborhood: '',
  expectedPrice: '',
  currentlyListed: '',
  hasDeed: '',
  message: '',
  privacyConsent: false,
  marketingConsent: false,
};

function getUtms() {
  if (typeof window === 'undefined') {
    return { source: 'rednorte.mx', medium: 'web', campaign: '', content: '', term: '' };
  }

  const params = new URLSearchParams(window.location.search);
  return {
    source: params.get('utm_source') || 'rednorte.mx',
    medium: params.get('utm_medium') || 'web',
    campaign: params.get('utm_campaign') || '',
    content: params.get('utm_content') || '',
    term: params.get('utm_term') || '',
  };
}

// Adaptado al esquema que realmente espera app/api/leads/route.js:
// { tipo, nombre, telefono, email, detalle, notas }. Ese endpoint escribe
// una fila por evento en la hoja de seguimiento, así que todo el detalle
// del inmueble se resume en dos columnas de texto en vez de mandar un
// objeto anidado (que la hoja no sabría desglosar).
function buildLeadPayload(form) {
  const utms = getUtms();

  const inmueble = [
    form.propertyType,
    [form.neighborhood, form.municipality].filter(Boolean).join(', '),
    form.expectedPrice ? `Precio esperado: ${form.expectedPrice}` : '',
  ].filter(Boolean).join(' · ');

  const notas = [
    form.currentlyListed ? `Anunciada: ${form.currentlyListed}` : '',
    form.hasDeed ? `Escritura: ${form.hasDeed}` : '',
    form.marketingConsent ? 'Acepta comunicaciones comerciales' : '',
    form.message,
    utms.campaign ? `Campaña: ${utms.campaign}` : '',
  ].filter(Boolean).join(' · ');

  return {
    tipo: 'Vender propiedad',
    nombre: form.name,
    telefono: form.phone,
    email: form.email,
    detalle: inmueble,
    notas,
  };
}

function buildWhatsAppMessage(form) {
  const lines = [
    'Hola, quiero vender una propiedad con Rednorte.',
    '',
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
    form.email ? `Correo: ${form.email}` : null,
    `Tipo de propiedad: ${form.propertyType}`,
    `Municipio o zona: ${form.municipality}`,
    form.neighborhood ? `Colonia: ${form.neighborhood}` : null,
    form.expectedPrice ? `Precio esperado: ${form.expectedPrice}` : null,
    form.currentlyListed ? `Actualmente anunciada: ${form.currentlyListed}` : null,
    form.hasDeed ? `Cuenta con escritura: ${form.hasDeed}` : null,
    form.message ? `Comentarios: ${form.message}` : null,
  ].filter(Boolean);

  return lines.join('\n');
}

export default function SellPropertyForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.privacyConsent) {
      setStatus({ type: 'error', message: 'Debes aceptar el Aviso de Privacidad para enviar la solicitud.' });
      return;
    }

    setStatus({ type: 'submitting', message: 'Enviando información…' });

    const whatsappUrl = `https://wa.me/528117783953?text=${encodeURIComponent(buildWhatsAppMessage(form))}`;
    trackConversion('whatsapp_clic', 'vender');
    const whatsappWindow = window.open(whatsappUrl, '_blank');
    if (whatsappWindow) whatsappWindow.opener = null;

    try {
      const response = await submitLeadRequest('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...buildLeadPayload(form),
          website: String(event.currentTarget.elements.website?.value || ''),
        }),
      });

      if (!response.ok) {
        throw new Error(`Lead API respondió ${response.status}`);
      }

      setStatus({
        type: 'success',
        message: 'Recibimos la información de tu propiedad. Un integrante de Rednorte se comunicará contigo para definir el siguiente paso.',
      });
      setForm(INITIAL_FORM);

      if (!whatsappWindow) {
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error('No se pudo registrar el lead:', error);
      setStatus({
        type: 'error',
        message: 'No pudimos registrar la solicitud en este momento. El mensaje de WhatsApp se abrió como canal alternativo.',
      });

      if (!whatsappWindow) {
        window.location.href = whatsappUrl;
      }
    }
  };

  return (
    <form className="sell-lead-form" onSubmit={handleSubmit} data-event="sell_property_form_start">
      <HoneypotField />
      <div className="sell-form-fields">
        <label>
          <span>Nombre completo *</span>
          <input name="name" value={form.name} onChange={updateField} autoComplete="name" required />
        </label>

        <label>
          <span>Teléfono o WhatsApp *</span>
          <input name="phone" value={form.phone} onChange={updateField} autoComplete="tel" inputMode="tel" required />
        </label>

        <label>
          <span>Correo electrónico</span>
          <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" />
        </label>

        <label>
          <span>Tipo de propiedad *</span>
          <select name="propertyType" value={form.propertyType} onChange={updateField} required>
            <option value="">Selecciona una opción</option>
            <option>Casa</option>
            <option>Departamento</option>
            <option>Terreno residencial</option>
            <option>Terreno comercial</option>
            <option>Terreno industrial</option>
            <option>Local comercial</option>
            <option>Oficina</option>
            <option>Bodega</option>
            <option>Nave industrial</option>
            <option>Edificio</option>
            <option>Quinta</option>
            <option>Otro</option>
          </select>
        </label>

        <label>
          <span>Municipio o zona *</span>
          <input name="municipality" value={form.municipality} onChange={updateField} required />
        </label>

        <label>
          <span>Colonia</span>
          <input name="neighborhood" value={form.neighborhood} onChange={updateField} />
        </label>

        <label>
          <span>Precio esperado</span>
          <input name="expectedPrice" value={form.expectedPrice} onChange={updateField} inputMode="decimal" placeholder="$" />
        </label>

        <label>
          <span>¿La propiedad está anunciada?</span>
          <select name="currentlyListed" value={form.currentlyListed} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>No</option>
            <option>Sí, por el propietario</option>
            <option>Sí, con otra inmobiliaria</option>
            <option>Sí, en varios portales</option>
            <option>No estoy seguro</option>
          </select>
        </label>

        <label>
          <span>¿Cuenta con escritura?</span>
          <select name="hasDeed" value={form.hasDeed} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Sí</option>
            <option>No</option>
            <option>En proceso</option>
            <option>No estoy seguro</option>
          </select>
        </label>

        <label className="sell-form-full">
          <span>Cuéntanos brevemente sobre la propiedad</span>
          <textarea name="message" value={form.message} onChange={updateField} rows={4} />
        </label>
      </div>

      <label className="sell-checkbox-row sell-form-full">
        <input name="privacyConsent" type="checkbox" checked={form.privacyConsent} onChange={updateField} required />
        <span>
          He leído el <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link> de Rednorte Inmobiliaria y autorizo el tratamiento de mis datos para atender esta solicitud.
        </span>
      </label>

      <label className="sell-checkbox-row sell-form-full">
        <input name="marketingConsent" type="checkbox" checked={form.marketingConsent} onChange={updateField} />
        <span>Deseo recibir información, contenidos y comunicaciones comerciales de Rednorte.</span>
      </label>

      <button
        className="sell-btn sell-btn-primary sell-submit-btn"
        type="submit"
        disabled={status.type === 'submitting'}
        data-event="sell_property_form_submit"
      >
        {status.type === 'submitting' ? 'Enviando…' : 'Solicitar diagnóstico de venta'}
      </button>

      <p className={`sell-form-status sell-form-status-${status.type}`} aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
