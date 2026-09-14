'use client';

import { createLeadSubmitter, trackConversion } from '@/lib/conversions';
const submitLeadRequest = createLeadSubmitter('extranjeros');

import { useEffect, useState } from 'react';
import Link from 'next/link';
import HoneypotField from '@/components/HoneypotField';
import { SITE_CONTACT } from '@/lib/siteConfig';

const REQUEST_TYPES = {
  comprar: 'Comprar una propiedad',
  rentar: 'Rentar una propiedad',
  invertir: 'Invertir en Nuevo León',
  empresa: 'Buscar un inmueble para mi empresa',
  ejecutivos: 'Buscar vivienda para ejecutivos',
  sre: 'Orientación sobre compra y trámite ante la SRE',
};

const INITIAL_FORM = {
  requestType: 'Comprar una propiedad',
  name: '',
  phone: '',
  email: '',
  countryOfOrigin: '',
  preferredLanguage: '',
  currentLocation: '',
  transactionTiming: '',
  propertyType: '',
  purpose: '',
  municipalityOrZone: '',
  budget: '',
  paymentMethod: '',
  companyName: '',
  message: '',
  privacyConsent: false,
  marketingConsent: false,
};

function buildLeadPayload(form) {
  return {
    tipo: 'Clientes extranjeros',
    nombre: form.name,
    telefono: form.phone,
    email: form.email,
    detalle: form.requestType,
    notas: buildWhatsAppMessage(form),
  };
}

function buildWhatsAppMessage(form) {
  const lines = [
    'Hola, necesito asesoría inmobiliaria para clientes extranjeros con Rednorte.',
    '',
    `Solicitud: ${form.requestType}`,
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
    form.email ? `Correo: ${form.email}` : null,
    form.countryOfOrigin ? `País de origen: ${form.countryOfOrigin}` : null,
    form.preferredLanguage ? `Idioma preferido: ${form.preferredLanguage}` : null,
    form.currentLocation ? `Ubicación actual: ${form.currentLocation}` : null,
    form.companyName ? `Empresa: ${form.companyName}` : null,
    form.transactionTiming ? `Fecha aproximada: ${form.transactionTiming}` : null,
    form.propertyType ? `Tipo de propiedad: ${form.propertyType}` : null,
    form.purpose ? `Objetivo: ${form.purpose}` : null,
    form.municipalityOrZone ? `Municipio o zona: ${form.municipalityOrZone}` : null,
    form.budget ? `Presupuesto: ${form.budget}` : null,
    form.paymentMethod ? `Forma de pago: ${form.paymentMethod}` : null,
    form.message ? `Comentarios: ${form.message}` : null,
  ].filter(Boolean);

  return lines.join('\n');
}

export default function ForeignClientsForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requestedNeed = params.get('need');
    const mappedRequest = REQUEST_TYPES[requestedNeed];

    if (mappedRequest) {
      setForm((current) => ({ ...current, requestType: mappedRequest }));
    }
  }, []);

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

    const whatsappUrl = `https://wa.me/${SITE_CONTACT.phoneDigits}?text=${encodeURIComponent(
      buildWhatsAppMessage(form),
    )}`;
    trackConversion('whatsapp_clic', 'extranjeros');
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
          'Recibimos tu solicitud. Un integrante de Rednorte se comunicará contigo para definir el siguiente paso.',
      });
      setForm(INITIAL_FORM);

      if (!whatsappWindow) {
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error('No se pudo registrar el lead de clientes extranjeros:', error);
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
    <form
      className="foreign-lead-form"
      onSubmit={handleSubmit}
      data-event="foreign_clients_form_start"
    >
      <HoneypotField />
      <div className="foreign-form-fields">
        <label className="foreign-form-full">
          <span>¿En qué podemos ayudarte? *</span>
          <select name="requestType" value={form.requestType} onChange={updateField} required>
            <option>Comprar una propiedad</option>
            <option>Rentar una propiedad</option>
            <option>Invertir en Nuevo León</option>
            <option>Buscar un inmueble para mi empresa</option>
            <option>Buscar vivienda para ejecutivos</option>
            <option>Orientación sobre compra y trámite ante la SRE</option>
            <option>Otro</option>
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
          <span>País de origen *</span>
          <input
            name="countryOfOrigin"
            value={form.countryOfOrigin}
            onChange={updateField}
            autoComplete="country-name"
            required
          />
        </label>

        <label>
          <span>Idioma preferido *</span>
          <select
            name="preferredLanguage"
            value={form.preferredLanguage}
            onChange={updateField}
            required
          >
            <option value="">Selecciona una opción</option>
            <option>Español</option>
            <option>English</option>
            <option>中文 / Mandarín</option>
            <option>한국어 / Coreano</option>
            <option>Português</option>
            <option>Français</option>
            <option>Русский</option>
            <option>日本語</option>
            <option>Italiano</option>
            <option>Otro</option>
          </select>
        </label>

        <label>
          <span>Ciudad o país donde te encuentras</span>
          <input
            name="currentLocation"
            value={form.currentLocation}
            onChange={updateField}
            placeholder="Ej. Monterrey, Seúl, Houston"
          />
        </label>

        <label>
          <span>Empresa, si aplica</span>
          <input
            name="companyName"
            value={form.companyName}
            onChange={updateField}
            autoComplete="organization"
          />
        </label>

        <label>
          <span>Fecha aproximada</span>
          <select
            name="transactionTiming"
            value={form.transactionTiming}
            onChange={updateField}
          >
            <option value="">Selecciona una opción</option>
            <option>Lo antes posible</option>
            <option>En los próximos 30 días</option>
            <option>Entre 1 y 3 meses</option>
            <option>Entre 3 y 6 meses</option>
            <option>Más de 6 meses</option>
            <option>Estoy explorando opciones</option>
          </select>
        </label>

        <label>
          <span>Tipo de propiedad</span>
          <select name="propertyType" value={form.propertyType} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Casa</option>
            <option>Departamento</option>
            <option>Terreno residencial</option>
            <option>Local comercial</option>
            <option>Oficina</option>
            <option>Bodega</option>
            <option>Nave industrial</option>
            <option>Terreno comercial o industrial</option>
            <option>Vivienda para ejecutivos</option>
            <option>Aún no estoy seguro</option>
          </select>
        </label>

        <label>
          <span>Objetivo principal</span>
          <select name="purpose" value={form.purpose} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Vivir</option>
            <option>Rentar durante una asignación laboral</option>
            <option>Invertir</option>
            <option>Instalar o ampliar una empresa</option>
            <option>Vivienda corporativa</option>
            <option>Uso futuro o patrimonial</option>
            <option>Otro</option>
          </select>
        </label>

        <label>
          <span>Municipio o zona de interés</span>
          <input
            name="municipalityOrZone"
            value={form.municipalityOrZone}
            onChange={updateField}
            placeholder="Puede quedar por definir"
          />
        </label>

        <label>
          <span>Presupuesto aproximado</span>
          <input
            name="budget"
            value={form.budget}
            onChange={updateField}
            inputMode="decimal"
            placeholder="$ MXN o USD"
          />
        </label>

        <label>
          <span>Forma de pago</span>
          <select name="paymentMethod" value={form.paymentMethod} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Recursos propios / contado</option>
            <option>Crédito en México</option>
            <option>Recursos propios + crédito</option>
            <option>Pago por empresa</option>
            <option>No estoy seguro</option>
            <option>No aplica: busco renta</option>
          </select>
        </label>

        <label className="foreign-form-full">
          <span>Cuéntanos algo más sobre tu necesidad</span>
          <textarea name="message" value={form.message} onChange={updateField} rows={4} />
        </label>
      </div>

      <p className="foreign-sensitive-data-note">
        No adjuntes ni escribas números de pasaporte, CURP, RFC, documento migratorio, datos
        bancarios o escrituras en este formulario.
      </p>

      <label className="foreign-checkbox-row foreign-form-full">
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

      <label className="foreign-checkbox-row foreign-form-full">
        <input
          name="marketingConsent"
          type="checkbox"
          checked={form.marketingConsent}
          onChange={updateField}
        />
        <span>Deseo recibir información y comunicaciones comerciales de Rednorte.</span>
      </label>

      <button
        className="foreign-btn foreign-btn-primary foreign-submit-btn"
        type="submit"
        disabled={status.type === 'submitting'}
        data-event="foreign_clients_form_submit"
      >
        {status.type === 'submitting' ? 'Enviando…' : 'Solicitar asesoría'}
      </button>

      <p className="foreign-form-footnote">
        Al enviar, también se abrirá WhatsApp como canal paralelo de contacto.
      </p>

      {status.message ? (
        <p className={`foreign-form-status foreign-form-status-${status.type}`} role="status">
          {status.message}
        </p>
      ) : null}
    </form>
  );
}
