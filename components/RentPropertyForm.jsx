'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const INITIAL_FORM = {
  goal: 'Rentar mi propiedad',
  name: '',
  phone: '',
  email: '',
  propertyType: '',
  municipality: '',
  neighborhood: '',
  expectedRent: '',
  availabilityStatus: '',
  furnishedStatus: '',
  currentlyListed: '',
  ownershipProof: '',
  message: '',
  privacyConsent: false,
  marketingConsent: false,
};

function buildLeadPayload(form) {
  return {
    tipo: 'Rentar propiedad',
    nombre: form.name,
    telefono: form.phone,
    email: form.email,
    detalle: form.goal,
    notas: buildWhatsAppMessage(form),
  };
}

function buildWhatsAppMessage(form) {
  const lines = [
    'Hola, quiero rentar una propiedad con Rednorte.',
    '',
    `Solicitud: ${form.goal}`,
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
    form.email ? `Correo: ${form.email}` : null,
    `Tipo de propiedad: ${form.propertyType}`,
    `Municipio o zona: ${form.municipality}`,
    form.neighborhood ? `Colonia: ${form.neighborhood}` : null,
    form.expectedRent ? `Renta mensual esperada: ${form.expectedRent}` : null,
    form.availabilityStatus ? `Disponibilidad: ${form.availabilityStatus}` : null,
    form.furnishedStatus ? `Mobiliario: ${form.furnishedStatus}` : null,
    form.currentlyListed ? `Actualmente anunciada: ${form.currentlyListed}` : null,
    form.ownershipProof ? `Documento de propiedad: ${form.ownershipProof}` : null,
    form.message ? `Comentarios: ${form.message}` : null,
  ].filter(Boolean);

  return lines.join('\n');
}

export default function RentPropertyForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    const syncGoalFromHash = () => {
      if (window.location.hash === '#solicitar-estimacion-renta') {
        setForm((current) => ({ ...current, goal: 'Solicitar estimación de renta' }));
      }
    };

    syncGoalFromHash();
    window.addEventListener('hashchange', syncGoalFromHash);
    return () => window.removeEventListener('hashchange', syncGoalFromHash);
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
      setStatus({ type: 'error', message: 'Debes aceptar el Aviso de Privacidad para enviar la solicitud.' });
      return;
    }

    setStatus({ type: 'submitting', message: 'Enviando información…' });

    const whatsappUrl = `https://wa.me/528117783953?text=${encodeURIComponent(buildWhatsAppMessage(form))}`;
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(buildLeadPayload(form)),
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
    <form className="rent-lead-form" onSubmit={handleSubmit} data-event="rent_property_form_start">
      <div className="rent-form-fields">
        <label className="rent-form-full">
          <span>¿Qué necesitas? *</span>
          <select name="goal" value={form.goal} onChange={updateField} required>
            <option>Rentar mi propiedad</option>
            <option>Solicitar estimación de renta</option>
            <option>Conocer opciones de garantía jurídica</option>
          </select>
        </label>

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
          <span>Renta mensual esperada</span>
          <input name="expectedRent" value={form.expectedRent} onChange={updateField} inputMode="decimal" placeholder="$" />
        </label>

        <label>
          <span>Disponibilidad del inmueble</span>
          <select name="availabilityStatus" value={form.availabilityStatus} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Disponible ahora</option>
            <option>Disponible próximamente</option>
            <option>Actualmente ocupada</option>
            <option>En proceso de desocupación</option>
            <option>No estoy seguro</option>
          </select>
        </label>

        <label>
          <span>Mobiliario</span>
          <select name="furnishedStatus" value={form.furnishedStatus} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Sin amueblar</option>
            <option>Semiamueblada</option>
            <option>Amueblada</option>
            <option>No aplica</option>
          </select>
        </label>

        <label>
          <span>¿La propiedad está anunciada?</span>
          <select name="currentlyListed" value={form.currentlyListed} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>No</option>
            <option>Sí, por el propietario</option>
            <option>Sí, con otra inmobiliaria</option>
            <option>Sí, con varias inmobiliarias o portales</option>
            <option>No estoy seguro</option>
          </select>
        </label>

        <label>
          <span>¿Cuenta con documento que acredite la propiedad?</span>
          <select name="ownershipProof" value={form.ownershipProof} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Sí</option>
            <option>En proceso</option>
            <option>No</option>
            <option>No estoy seguro</option>
          </select>
        </label>

        <label className="rent-form-full">
          <span>Cuéntanos brevemente sobre la propiedad</span>
          <textarea name="message" value={form.message} onChange={updateField} rows={4} />
        </label>
      </div>

      <label className="rent-checkbox-row rent-form-full">
        <input name="privacyConsent" type="checkbox" checked={form.privacyConsent} onChange={updateField} required />
        <span>
          He leído el <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link> de Rednorte Inmobiliaria y autorizo el tratamiento de mis datos para atender esta solicitud.
        </span>
      </label>

      <label className="rent-checkbox-row rent-form-full">
        <input name="marketingConsent" type="checkbox" checked={form.marketingConsent} onChange={updateField} />
        <span>Deseo recibir información, contenidos y comunicaciones comerciales de Rednorte.</span>
      </label>

      <button
        className="rent-btn rent-btn-primary rent-submit-btn"
        type="submit"
        disabled={status.type === 'submitting'}
        data-event="rent_property_form_submit"
      >
        {status.type === 'submitting' ? 'Enviando…' : 'Solicitar diagnóstico de renta'}
      </button>

      <p className={`rent-form-status rent-form-status-${status.type}`} aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
