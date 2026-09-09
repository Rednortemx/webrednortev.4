'use client';

import { useEffect, useState } from 'react';

const REASONS = [
  'Quiero comprar',
  'Quiero vender',
  'Quiero rentar una propiedad',
  'Quiero poner en renta mi propiedad',
  'Estimación de valor',
  'Quiero invertir',
  'Información sobre una propiedad',
  'Comercial / Industrial',
];

// ?motivo= slugs used by links into this page (e.g. /herramientas's
// "Solicitar análisis personalizado" links to /contacto?motivo=estimacion)
// so the right reason comes pre-selected instead of defaulting to the first one.
const REASON_SLUGS = {
  comprar: 'Quiero comprar',
  vender: 'Quiero vender',
  rentar: 'Quiero rentar una propiedad',
  'poner-en-renta': 'Quiero poner en renta mi propiedad',
  estimacion: 'Estimación de valor',
  invertir: 'Quiero invertir',
  'info-propiedad': 'Información sobre una propiedad',
  'comercial-industrial': 'Comercial / Industrial',
};

// Ported from the uploaded "quick institutional pages" design. Fixed on
// integration: the payload sent to /api/leads used a richer
// {lead_type, source, contact_reason, name, phone, ...} schema that
// doesn't match what app/api/leads/route.js actually reads
// ({tipo, nombre, telefono, email, detalle, notas}) — every extra field
// was being silently dropped. Also added the site-wide policy that every
// WhatsApp-opening button (except the floating one) must collect name +
// phone first: "Continuar por WhatsApp" here had zero validation.
export default function ContactForm() {
  const [reason, setReason] = useState(REASONS[0]);

  // /contacto is statically prerendered, so the ?motivo= slug can only be
  // read once this component is actually running in the browser — done in
  // an effect rather than a lazy useState initializer so it isn't at the
  // mercy of hydration reusing the server-rendered (query-string-less) state.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get('motivo');
    if (REASON_SLUGS[slug]) setReason(REASON_SLUGS[slug]);
  }, []);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', privacy: false });
  const [state, setState] = useState({ loading: false, error: '', success: false });

  const buildWhatsAppMessage = () => {
    const lines = ['Hola, me gustaría más información.', '', `Motivo: ${reason}`, `Nombre: ${form.name}`, `Teléfono: ${form.phone}`];
    if (form.email) lines.push(`Correo: ${form.email}`);
    if (form.message) lines.push('', `Mensaje: ${form.message}`);
    return lines.join('\n');
  };

  const validate = () => {
    if (!form.name || !form.phone || !form.email) {
      setState({ loading: false, error: 'Completa nombre, teléfono y correo electrónico.', success: false });
      return false;
    }
    if (!form.privacy) {
      setState({ loading: false, error: 'Debes aceptar el Aviso de Privacidad.', success: false });
      return false;
    }
    return true;
  };

  const postLead = () =>
    fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        tipo: 'Contacto general',
        nombre: form.name,
        telefono: form.phone,
        email: form.email,
        detalle: reason,
        notas: form.message,
      }),
    });

  async function submit(e) {
    e.preventDefault();
    if (!validate()) return;

    setState({ loading: true, error: '', success: false });
    try {
      const response = await postLead();
      if (!response.ok) throw new Error('No se pudo enviar el mensaje.');
      setState({ loading: false, error: '', success: true });
    } catch (error) {
      setState({ loading: false, error: error?.message || 'Ocurrió un error. Intenta nuevamente.', success: false });
    }
  }

  function continuarWhatsApp(e) {
    e.preventDefault();
    if (!validate()) return;
    postLead().catch(() => {});
    window.open(`https://wa.me/528117783953?text=${encodeURIComponent(buildWhatsAppMessage())}`, '_blank');
  }

  return (
    <form className="quick-form" onSubmit={submit}>
      <fieldset>
        <legend>Motivo de contacto</legend>
        <div className="quick-reason-grid">
          {REASONS.map((item) => (
            <button
              type="button"
              className={reason === item ? 'is-active' : ''}
              onClick={() => setReason(item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </fieldset>

      <div className="quick-form-grid">
        <label>
          <span>Nombre *</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
            placeholder="Tu nombre completo"
          />
        </label>
        <label>
          <span>Teléfono *</span>
          <input
            required
            type="tel"
            value={form.phone}
            onChange={(e) => setForm((v) => ({ ...v, phone: e.target.value }))}
            placeholder="+52 (81)"
          />
        </label>
      </div>

      <label>
        <span>Correo electrónico *</span>
        <input
          required
          type="email"
          value={form.email}
          onChange={(e) => setForm((v) => ({ ...v, email: e.target.value }))}
          placeholder="correo@ejemplo.com"
        />
      </label>

      <label>
        <span>Mensaje</span>
        <textarea
          rows="5"
          value={form.message}
          onChange={(e) => setForm((v) => ({ ...v, message: e.target.value }))}
          placeholder="Cuéntanos más sobre lo que necesitas..."
        />
      </label>

      <label className="quick-check">
        <input
          type="checkbox"
          checked={form.privacy}
          onChange={(e) => setForm((v) => ({ ...v, privacy: e.target.checked }))}
        />
        <span>
          Acepto el <a href="/aviso-de-privacidad">Aviso de Privacidad</a>.
        </span>
      </label>

      {state.error && <p className="quick-form-message is-error">{state.error}</p>}
      {state.success && <p className="quick-form-message is-success">Mensaje enviado correctamente.</p>}

      <button className="quick-submit" disabled={state.loading} type="submit">
        {state.loading ? 'Enviando…' : 'Enviar mensaje'}
      </button>

      <button className="quick-whatsapp-submit" type="button" onClick={continuarWhatsApp}>
        Continuar por WhatsApp
      </button>
    </form>
  );
}
