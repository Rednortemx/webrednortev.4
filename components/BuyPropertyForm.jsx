'use client';

import { createLeadSubmitter, trackConversion } from '@/lib/conversions';
const submitLeadRequest = createLeadSubmitter('comprar');

import { useState } from 'react';
import Link from 'next/link';
import HoneypotField from '@/components/HoneypotField';

const INITIAL_FORM = {
  requestType: 'Quiero encontrar una propiedad',
  name: '',
  phone: '',
  email: '',
  propertyType: '',
  purpose: '',
  municipality: '',
  zones: '',
  budget: '',
  paymentMethod: '',
  purchaseTiming: '',
  bedrooms: '',
  propertyCondition: '',
  currentlyWithAdvisor: '',
  mustHaves: '',
  message: '',
  privacyConsent: false,
  marketingConsent: false,
};

function buildLeadPayload(form) {
  return {
    tipo: 'Comprar propiedad',
    nombre: form.name,
    telefono: form.phone,
    email: form.email,
    detalle: form.requestType,
    notas: buildWhatsAppMessage(form),
  };
}

function buildWhatsAppMessage(form) {
  const lines = [
    'Hola, quiero encontrar una propiedad con Rednorte.',
    '',
    `Solicitud: ${form.requestType}`,
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
    form.email ? `Correo: ${form.email}` : null,
    `Tipo de propiedad: ${form.propertyType}`,
    `Uso u objetivo: ${form.purpose}`,
    form.municipality ? `Municipio principal: ${form.municipality}` : null,
    form.zones ? `Zonas de interés: ${form.zones}` : null,
    form.budget ? `Presupuesto: ${form.budget}` : null,
    form.paymentMethod ? `Forma de pago: ${form.paymentMethod}` : null,
    form.purchaseTiming ? `Fecha estimada de compra: ${form.purchaseTiming}` : null,
    form.bedrooms ? `Recámaras: ${form.bedrooms}` : null,
    form.propertyCondition ? `Nueva/usada/preventa: ${form.propertyCondition}` : null,
    form.currentlyWithAdvisor ? `Actualmente con otro asesor: ${form.currentlyWithAdvisor}` : null,
    form.mustHaves ? `Indispensables: ${form.mustHaves}` : null,
    form.message ? `Comentarios: ${form.message}` : null,
  ].filter(Boolean);

  return lines.join('\n');
}

export default function BuyPropertyForm() {
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
      setStatus({
        type: 'error',
        message: 'Debes aceptar el Aviso de Privacidad para enviar la solicitud.',
      });
      return;
    }

    setStatus({ type: 'submitting', message: 'Enviando información…' });

    const whatsappUrl = `https://wa.me/528117783953?text=${encodeURIComponent(
      buildWhatsAppMessage(form),
    )}`;
    trackConversion('whatsapp_clic', 'comprar');
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

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
        message:
          'Recibimos tu búsqueda. Un integrante de Rednorte se comunicará contigo para definir el siguiente paso.',
      });
      setForm(INITIAL_FORM);

      if (!whatsappWindow) {
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error('No se pudo registrar el lead de compra:', error);
      setStatus({
        type: 'error',
        message:
          'No pudimos registrar la solicitud en este momento. El mensaje de WhatsApp se abrió como canal alternativo.',
      });

      if (!whatsappWindow) {
        window.location.href = whatsappUrl;
      }
    }
  };

  return (
    <form className="buy-lead-form" onSubmit={handleSubmit} data-event="buy_property_form_start">
      <HoneypotField />
      <div className="buy-form-fields">
        <label className="buy-form-full">
          <span>¿Qué necesitas? *</span>
          <select name="requestType" value={form.requestType} onChange={updateField} required>
            <option>Quiero encontrar una propiedad</option>
            <option>Quiero comparar propiedades nuevas y usadas</option>
            <option>Quiero conocer mi capacidad de compra</option>
            <option>Quiero tramitar crédito hipotecario</option>
            <option>Busco una propiedad para inversión</option>
            <option>Aún no sé qué me conviene</option>
          </select>
        </label>

        <label>
          <span>Nombre completo *</span>
          <input
            name="name"
            value={form.name}
            onChange={updateField}
            autoComplete="name"
            required
          />
        </label>

        <label>
          <span>Teléfono o WhatsApp *</span>
          <input
            name="phone"
            value={form.phone}
            onChange={updateField}
            autoComplete="tel"
            inputMode="tel"
            required
          />
        </label>

        <label>
          <span>Correo electrónico</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={updateField}
            autoComplete="email"
          />
        </label>

        <label>
          <span>Tipo de propiedad *</span>
          <select name="propertyType" value={form.propertyType} onChange={updateField} required>
            <option value="">Selecciona una opción</option>
            <option>Casa</option>
            <option>Departamento</option>
            <option>Terreno residencial</option>
            <option>Quinta</option>
            <option>Local comercial</option>
            <option>Oficina</option>
            <option>Bodega</option>
            <option>Nave industrial</option>
            <option>Terreno comercial o industrial</option>
            <option>Aún no estoy seguro</option>
          </select>
        </label>

        <label>
          <span>¿Para qué la quieres? *</span>
          <select name="purpose" value={form.purpose} onChange={updateField} required>
            <option value="">Selecciona una opción</option>
            <option>Vivir</option>
            <option>Uso familiar</option>
            <option>Patrimonio</option>
            <option>Inversión</option>
            <option>Negocio</option>
            <option>Otro</option>
          </select>
        </label>

        <label>
          <span>Municipio principal</span>
          <input name="municipality" value={form.municipality} onChange={updateField} />
        </label>

        <label className="buy-form-full">
          <span>Zonas de interés</span>
          <input
            name="zones"
            value={form.zones}
            onChange={updateField}
            placeholder="Ej. San Pedro, Valle Oriente, Carretera Nacional"
          />
        </label>

        <label>
          <span>Presupuesto aproximado *</span>
          <input
            name="budget"
            value={form.budget}
            onChange={updateField}
            inputMode="decimal"
            placeholder="$"
            required
          />
        </label>

        <label>
          <span>Forma de pago *</span>
          <select name="paymentMethod" value={form.paymentMethod} onChange={updateField} required>
            <option value="">Selecciona una opción</option>
            <option>Contado</option>
            <option>Crédito ya aprobado</option>
            <option>Quiero tramitar crédito</option>
            <option>Recursos propios + crédito</option>
            <option>No estoy seguro</option>
          </select>
        </label>

        <label>
          <span>¿Cuándo te gustaría comprar?</span>
          <select name="purchaseTiming" value={form.purchaseTiming} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Lo antes posible</option>
            <option>En los próximos 3 meses</option>
            <option>Entre 3 y 6 meses</option>
            <option>Entre 6 y 12 meses</option>
            <option>Estoy explorando opciones</option>
          </select>
        </label>

        <label>
          <span>Recámaras deseadas</span>
          <select name="bedrooms" value={form.bedrooms} onChange={updateField}>
            <option value="">No aplica o por definir</option>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4 o más</option>
          </select>
        </label>

        <label>
          <span>Nueva, usada o preventa</span>
          <select
            name="propertyCondition"
            value={form.propertyCondition}
            onChange={updateField}
          >
            <option value="">Selecciona una opción</option>
            <option>Nueva</option>
            <option>Usada</option>
            <option>Preventa</option>
            <option>Aceptaría remodelar</option>
            <option>Indistinto</option>
          </select>
        </label>

        <label>
          <span>¿Ya trabajas con otro asesor?</span>
          <select
            name="currentlyWithAdvisor"
            value={form.currentlyWithAdvisor}
            onChange={updateField}
          >
            <option value="">Selecciona una opción</option>
            <option>No</option>
            <option>Sí, pero sin acuerdo formal</option>
            <option>Sí, con representación formal</option>
            <option>Prefiero explicarlo en una llamada</option>
          </select>
        </label>

        <label className="buy-form-full">
          <span>Características indispensables</span>
          <input
            name="mustHaves"
            value={form.mustHaves}
            onChange={updateField}
            placeholder="Ej. jardín, elevador, oficina, accesos, estacionamientos"
          />
        </label>

        <label className="buy-form-full">
          <span>Cuéntanos algo más sobre tu búsqueda</span>
          <textarea name="message" value={form.message} onChange={updateField} rows={4} />
        </label>
      </div>

      <label className="buy-checkbox-row buy-form-full">
        <input
          name="privacyConsent"
          type="checkbox"
          checked={form.privacyConsent}
          onChange={updateField}
          required
        />
        <span>
          He leído el <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link> de Rednorte
          Inmobiliaria y autorizo el tratamiento de mis datos para atender esta solicitud.
        </span>
      </label>

      <label className="buy-checkbox-row buy-form-full">
        <input
          name="marketingConsent"
          type="checkbox"
          checked={form.marketingConsent}
          onChange={updateField}
        />
        <span>Deseo recibir información y comunicaciones comerciales de Rednorte.</span>
      </label>

      <button
        className="buy-btn buy-btn-primary buy-submit-btn"
        type="submit"
        disabled={status.type === 'submitting'}
        data-event="buy_property_form_submit"
      >
        {status.type === 'submitting' ? 'Enviando…' : 'Iniciar mi búsqueda'}
      </button>

      <p className="buy-form-footnote">
        Al enviar, también se abrirá WhatsApp como canal paralelo de contacto.
      </p>

      {status.message ? (
        <p className={`buy-form-status buy-form-status-${status.type}`} role="status">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
