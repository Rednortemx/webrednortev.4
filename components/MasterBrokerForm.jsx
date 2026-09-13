'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import HoneypotField from '@/components/HoneypotField';

const INITIAL_FORM = {
  goal: 'Solicitar evaluación Master Broker',
  companyName: '',
  name: '',
  phone: '',
  email: '',
  ownerType: '',
  propertyCount: '',
  propertyType: '',
  municipality: '',
  approximateValue: '',
  currentlyMarketed: '',
  agenciesCount: '',
  timeOnMarket: '',
  appraisalStatus: '',
  documentationStatus: '',
  exclusiveReadiness: '',
  message: '',
  privacyConsent: false,
  marketingConsent: false,
};

function buildLeadPayload(form) {
  return {
    tipo: 'Master Broker',
    nombre: form.name,
    telefono: form.phone,
    email: form.email,
    detalle: form.goal,
    notas: buildWhatsAppMessage(form),
  };
}

function buildWhatsAppMessage(form) {
  const lines = [
    'Hola, quiero solicitar una evaluación Master Broker con Rednorte.',
    '',
    `Solicitud: ${form.goal}`,
    form.companyName ? `Empresa: ${form.companyName}` : null,
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
    form.email ? `Correo: ${form.email}` : null,
    form.ownerType ? `Tipo de propietario: ${form.ownerType}` : null,
    form.propertyCount ? `Número de propiedades: ${form.propertyCount}` : null,
    form.propertyType ? `Tipo de inmueble: ${form.propertyType}` : null,
    form.municipality ? `Municipio o zona: ${form.municipality}` : null,
    form.approximateValue ? `Valor aproximado: ${form.approximateValue}` : null,
    form.currentlyMarketed ? `Actualmente comercializada: ${form.currentlyMarketed}` : null,
    form.agenciesCount ? `Inmobiliarias involucradas: ${form.agenciesCount}` : null,
    form.timeOnMarket ? `Tiempo en mercado: ${form.timeOnMarket}` : null,
    form.appraisalStatus ? `Avalúo u opinión de valor: ${form.appraisalStatus}` : null,
    form.documentationStatus ? `Documentación: ${form.documentationStatus}` : null,
    form.exclusiveReadiness ? `Disposición a exclusiva: ${form.exclusiveReadiness}` : null,
    form.message ? `Comentarios: ${form.message}` : null,
  ].filter(Boolean);

  return lines.join('\n');
}

export default function MasterBrokerForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  useEffect(() => {
    const syncGoalFromHash = () => {
      if (window.location.hash === '#portafolio-master-broker') {
        setForm((current) => ({
          ...current,
          goal: 'Tengo un portafolio de propiedades',
          propertyCount: current.propertyCount || '2 a 5 propiedades',
        }));
      }

      if (window.location.hash === '#solicitar-evaluacion-master-broker') {
        setForm((current) => ({
          ...current,
          goal: 'Solicitar evaluación Master Broker',
        }));
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
    const whatsappWindow = window.open(whatsappUrl, '_blank', 'noopener,noreferrer');

    try {
      const response = await fetch('/api/leads', {
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
          'Recibimos la información. Un integrante de Rednorte se comunicará contigo para revisar si la propiedad o portafolio puede trabajarse mediante Master Broker.',
      });
      setForm(INITIAL_FORM);

      if (!whatsappWindow) {
        window.location.href = whatsappUrl;
      }
    } catch (error) {
      console.error('No se pudo registrar el lead Master Broker:', error);
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
      className="master-lead-form"
      onSubmit={handleSubmit}
      data-event="master_broker_form_start"
    >
      <HoneypotField />
      <div className="master-form-fields">
        <label className="master-form-full">
          <span>¿Qué necesitas? *</span>
          <select name="goal" value={form.goal} onChange={updateField} required>
            <option>Solicitar evaluación Master Broker</option>
            <option>Tengo un portafolio de propiedades</option>
            <option>Represento a una empresa o institución</option>
            <option>Represento un desarrollo o conjunto de unidades</option>
          </select>
        </label>

        <label>
          <span>Empresa u organización</span>
          <input
            name="companyName"
            value={form.companyName}
            onChange={updateField}
            autoComplete="organization"
          />
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
          <span>Tipo de propietario *</span>
          <select name="ownerType" value={form.ownerType} onChange={updateField} required>
            <option value="">Selecciona una opción</option>
            <option>Persona física</option>
            <option>Empresa</option>
            <option>Desarrollador</option>
            <option>Institución</option>
            <option>Fideicomiso o fondo</option>
            <option>Representante o apoderado</option>
            <option>Otro</option>
          </select>
        </label>

        <label>
          <span>Número de propiedades *</span>
          <select
            name="propertyCount"
            value={form.propertyCount}
            onChange={updateField}
            required
          >
            <option value="">Selecciona una opción</option>
            <option>1 propiedad</option>
            <option>2 a 5 propiedades</option>
            <option>6 a 20 propiedades</option>
            <option>Más de 20 propiedades</option>
          </select>
        </label>

        <label>
          <span>Tipo principal de inmueble *</span>
          <select name="propertyType" value={form.propertyType} onChange={updateField} required>
            <option value="">Selecciona una opción</option>
            <option>Casa</option>
            <option>Departamento</option>
            <option>Terreno</option>
            <option>Local u oficina</option>
            <option>Edificio</option>
            <option>Bodega o nave industrial</option>
            <option>Desarrollo o conjunto de unidades</option>
            <option>Portafolio mixto</option>
            <option>Otro</option>
          </select>
        </label>

        <label>
          <span>Municipio o zona *</span>
          <input
            name="municipality"
            value={form.municipality}
            onChange={updateField}
            required
          />
        </label>

        <label>
          <span>Valor aproximado de venta</span>
          <input
            name="approximateValue"
            value={form.approximateValue}
            onChange={updateField}
            inputMode="decimal"
            placeholder="$"
          />
        </label>

        <label>
          <span>¿La propiedad ya se está comercializando?</span>
          <select
            name="currentlyMarketed"
            value={form.currentlyMarketed}
            onChange={updateField}
          >
            <option value="">Selecciona una opción</option>
            <option>No</option>
            <option>Sí, directamente por el propietario</option>
            <option>Sí, con una inmobiliaria</option>
            <option>Sí, con varias inmobiliarias</option>
            <option>La retiramos temporalmente</option>
          </select>
        </label>

        <label>
          <span>¿Cuántas inmobiliarias o asesores la manejan?</span>
          <select name="agenciesCount" value={form.agenciesCount} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Ninguno</option>
            <option>1</option>
            <option>2 a 3</option>
            <option>4 o más</option>
            <option>No estoy seguro</option>
          </select>
        </label>

        <label>
          <span>Tiempo aproximado en el mercado</span>
          <select name="timeOnMarket" value={form.timeOnMarket} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Aún no se publica</option>
            <option>Menos de 3 meses</option>
            <option>3 a 6 meses</option>
            <option>6 a 12 meses</option>
            <option>Más de 12 meses</option>
          </select>
        </label>

        <label>
          <span>¿Cuenta con avalúo u opinión de valor?</span>
          <select name="appraisalStatus" value={form.appraisalStatus} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Sí, reciente</option>
            <option>Sí, pero es anterior</option>
            <option>Está en proceso</option>
            <option>No</option>
            <option>No estoy seguro</option>
          </select>
        </label>

        <label>
          <span>Estado general de la documentación</span>
          <select
            name="documentationStatus"
            value={form.documentationStatus}
            onChange={updateField}
          >
            <option value="">Selecciona una opción</option>
            <option>Completa y disponible</option>
            <option>Parcialmente disponible</option>
            <option>En proceso de regularización</option>
            <option>No estoy seguro</option>
          </select>
        </label>

        <label className="master-form-full">
          <span>¿Considerarías una exclusiva de 6 meses? *</span>
          <select
            name="exclusiveReadiness"
            value={form.exclusiveReadiness}
            onChange={updateField}
            required
          >
            <option value="">Selecciona una opción</option>
            <option>Sí, estoy dispuesto a evaluarla</option>
            <option>Quiero conocer las condiciones antes de decidir</option>
            <option>No estoy seguro</option>
            <option>No por ahora</option>
          </select>
        </label>

        <label className="master-form-full">
          <span>Cuéntanos brevemente sobre la propiedad o portafolio</span>
          <textarea name="message" value={form.message} onChange={updateField} rows={5} />
        </label>
      </div>

      <label className="master-checkbox-row master-form-full">
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

      <label className="master-checkbox-row master-form-full">
        <input
          name="marketingConsent"
          type="checkbox"
          checked={form.marketingConsent}
          onChange={updateField}
        />
        <span>Deseo recibir información y comunicaciones comerciales de Rednorte.</span>
      </label>

      <button
        className="master-btn master-btn-primary master-submit-btn"
        type="submit"
        disabled={status.type === 'submitting'}
        data-event="master_broker_form_submit"
      >
        {status.type === 'submitting' ? 'Enviando…' : 'Solicitar evaluación Master Broker'}
      </button>

      <p
        className={`master-form-status master-form-status-${status.type}`}
        aria-live="polite"
      >
        {status.message}
      </p>
    </form>
  );
}
