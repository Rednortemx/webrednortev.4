'use client';

import { useState } from 'react';
import Link from 'next/link';
import HoneypotField from '@/components/HoneypotField';

const INVESTMENT_GOALS = [
  'Generar flujo mensual',
  'Buscar plusvalía',
  'Construir patrimonio',
  'Flipping / remodelar y vender',
  'Densificar o desarrollar',
  'Comprar debajo de valor',
  'Diversificar activos',
  'Uso futuro o familiar',
];

const ASSET_INTERESTS = [
  'Casa o departamento para renta',
  'Preventa vertical',
  'Preventa horizontal',
  'Propiedad terminada',
  'Terreno',
  'Propiedad para densificar',
  'Remodelación y reventa',
  'Local u oficina',
  'Bodega o nave industrial',
  'Renta de corto plazo',
  'Portafolio o paquete de activos',
  'Aún no lo sé',
];

const INITIAL_FORM = {
  requestType: 'Quiero analizar una inversión',
  name: '',
  phone: '',
  email: '',
  investorExperience: '',
  investorContext: '',
  goals: [],
  assetInterests: [],
  investmentHorizon: '',
  availableCapital: '',
  financingNeed: '',
  companyInvestment: '',
  message: '',
  privacyConsent: false,
  marketingConsent: false,
};

function buildLeadPayload(form) {
  return {
    tipo: 'Inversión inmobiliaria',
    nombre: form.name,
    telefono: form.phone,
    email: form.email,
    detalle: form.requestType,
    notas: buildWhatsAppMessage(form),
  };
}

function buildWhatsAppMessage(form) {
  const lines = [
    'Hola, quiero analizar una inversión inmobiliaria con Rednorte.',
    '',
    `Solicitud: ${form.requestType}`,
    `Nombre: ${form.name}`,
    `Teléfono: ${form.phone}`,
    form.email ? `Correo: ${form.email}` : null,
    form.investorExperience ? `Experiencia: ${form.investorExperience}` : null,
    form.investorContext ? `Contexto: ${form.investorContext}` : null,
    form.goals.length ? `Objetivos: ${form.goals.join(', ')}` : null,
    form.assetInterests.length ? `Activos de interés: ${form.assetInterests.join(', ')}` : null,
    form.investmentHorizon ? `Horizonte: ${form.investmentHorizon}` : null,
    form.availableCapital ? `Capital o rango: ${form.availableCapital}` : null,
    form.financingNeed ? `Financiamiento: ${form.financingNeed}` : null,
    form.companyInvestment ? `Inversión empresarial: ${form.companyInvestment}` : null,
    form.message ? `Comentarios: ${form.message}` : null,
  ].filter(Boolean);

  return lines.join('\n');
}

export default function InvestmentAdvisoryForm() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [status, setStatus] = useState({ type: 'idle', message: '' });

  const updateField = (event) => {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const toggleArrayValue = (field, value) => {
    setForm((current) => {
      const exists = current[field].includes(value);
      return {
        ...current,
        [field]: exists
          ? current[field].filter((item) => item !== value)
          : [...current[field], value],
      };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.privacyConsent) {
      setStatus({ type: 'error', message: 'Debes aceptar el Aviso de Privacidad para enviar la solicitud.' });
      return;
    }

    if (form.goals.length === 0) {
      setStatus({ type: 'error', message: 'Selecciona al menos un objetivo de inversión.' });
      return;
    }

    setStatus({ type: 'submitting', message: 'Enviando información…' });

    const whatsappUrl = `https://wa.me/528117783953?text=${encodeURIComponent(buildWhatsAppMessage(form))}`;
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
        message: 'Recibimos tus objetivos de inversión. Un integrante de Rednorte se comunicará contigo para definir el siguiente paso.',
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
    <form className="invest-lead-form" onSubmit={handleSubmit} data-event="investment_form_start">
      <HoneypotField />
      <div className="invest-form-fields">
        <label className="invest-form-full">
          <span>¿Qué necesitas? *</span>
          <select name="requestType" value={form.requestType} onChange={updateField} required>
            <option>Quiero analizar una inversión</option>
            <option>Quiero comparar preventas</option>
            <option>Quiero comprar para renta</option>
            <option>Quiero densificar o desarrollar</option>
            <option>Busco una oportunidad por debajo de valor</option>
            <option>Soy empresa y busco activos inmobiliarios</option>
            <option>Aún no sé qué estrategia me conviene</option>
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
          <span>Experiencia como inversionista</span>
          <select name="investorExperience" value={form.investorExperience} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Sería mi primera inversión inmobiliaria</option>
            <option>Ya tengo una propiedad de inversión</option>
            <option>Tengo varias propiedades o inversiones</option>
            <option>Represento a una empresa</option>
            <option>Prefiero explicarlo en una llamada</option>
          </select>
        </label>

        <label>
          <span>¿Quién realizará la inversión?</span>
          <select name="investorContext" value={form.investorContext} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Persona física</option>
            <option>Pareja o familia</option>
            <option>Empresa</option>
            <option>Socios o grupo de inversionistas</option>
            <option>Mexicano viviendo en el extranjero</option>
            <option>Extranjero</option>
            <option>Aún no está definido</option>
          </select>
        </label>

        <fieldset className="invest-choice-group invest-form-full">
          <legend>¿Qué buscas lograr? * Puedes elegir varios.</legend>
          <div className="invest-choice-grid">
            {INVESTMENT_GOALS.map((goal) => (
              <label className="invest-choice-item" key={goal}>
                <input
                  type="checkbox"
                  checked={form.goals.includes(goal)}
                  onChange={() => toggleArrayValue('goals', goal)}
                />
                <span>{goal}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset className="invest-choice-group invest-form-full">
          <legend>¿Qué tipo de activo te interesa? Puedes elegir varios.</legend>
          <div className="invest-choice-grid">
            {ASSET_INTERESTS.map((asset) => (
              <label className="invest-choice-item" key={asset}>
                <input
                  type="checkbox"
                  checked={form.assetInterests.includes(asset)}
                  onChange={() => toggleArrayValue('assetInterests', asset)}
                />
                <span>{asset}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <label>
          <span>Horizonte de inversión</span>
          <select name="investmentHorizon" value={form.investmentHorizon} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>Menos de 2 años</option>
            <option>2 a 5 años</option>
            <option>5 a 10 años</option>
            <option>Más de 10 años</option>
            <option>No lo tengo definido</option>
          </select>
        </label>

        <label>
          <span>Capital disponible o rango aproximado</span>
          <input
            name="availableCapital"
            value={form.availableCapital}
            onChange={updateField}
            placeholder="Ej. enganche, inversión total o por definir"
          />
        </label>

        <label>
          <span>¿Requieres financiamiento?</span>
          <select name="financingNeed" value={form.financingNeed} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>No</option>
            <option>Sí, crédito hipotecario</option>
            <option>Quiero comparar crédito y recursos propios</option>
            <option>Depende de la oportunidad</option>
            <option>No estoy seguro</option>
          </select>
        </label>

        <label>
          <span>¿La inversión está relacionada con una empresa?</span>
          <select name="companyInvestment" value={form.companyInvestment} onChange={updateField}>
            <option value="">Selecciona una opción</option>
            <option>No</option>
            <option>Sí, para operación de la empresa</option>
            <option>Sí, para renta o patrimonio</option>
            <option>Sí, buscamos activos individuales o en paquete</option>
            <option>Aún no está definido</option>
          </select>
        </label>

        <label className="invest-form-full">
          <span>Cuéntanos qué tienes en mente</span>
          <textarea name="message" value={form.message} onChange={updateField} rows={4} />
        </label>
      </div>

      <label className="invest-checkbox-row invest-form-full">
        <input name="privacyConsent" type="checkbox" checked={form.privacyConsent} onChange={updateField} required />
        <span>
          He leído el <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link> de Rednorte Inmobiliaria y autorizo el tratamiento de mis datos para atender esta solicitud.
        </span>
      </label>

      <label className="invest-checkbox-row invest-form-full">
        <input name="marketingConsent" type="checkbox" checked={form.marketingConsent} onChange={updateField} />
        <span>Deseo recibir información, contenidos y comunicaciones comerciales de Rednorte.</span>
      </label>

      <button
        className="invest-btn invest-btn-primary invest-submit-btn"
        type="submit"
        disabled={status.type === 'submitting'}
        data-event="investment_form_submit"
      >
        {status.type === 'submitting' ? 'Enviando…' : 'Solicitar análisis de inversión'}
      </button>

      <p className={`invest-form-status invest-form-status-${status.type}`} aria-live="polite">
        {status.message}
      </p>
    </form>
  );
}
