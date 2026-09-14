'use client';

import { createLeadSubmitter } from '@/lib/conversions';
const submitLeadRequest = createLeadSubmitter('empleo');

import { useState } from 'react';
import Link from 'next/link';
import HoneypotField from '@/components/HoneypotField';

const roles = ['Asesor inmobiliario', 'Operaciones / administración', 'Marketing', 'Otro'];

// Ported from the uploaded "quick institutional pages" design, with the
// same /api/leads schema fix as ContactForm.jsx: the payload used
// {lead_type, source, role_interest, name, phone, ...} instead of the
// real {tipo, nombre, telefono, email, detalle, notas} shape, so nothing
// was ever reaching the leads sheet. This also fixes a pre-existing gap —
// the old BolsaForm this replaces never called /api/leads at all, it only
// opened WhatsApp.
export default function CareersForm() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', role: roles[0], why: '', privacyConsent: false });
  const [state, setState] = useState({ loading: false, error: '', success: false });

  async function submit(e) {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email) {
      setState({ loading: false, error: 'Completa nombre, teléfono y correo electrónico.', success: false });
      return;
    }
    if (!form.privacyConsent) {
      setState({ loading: false, error: 'Debes aceptar el Aviso de Privacidad.', success: false });
      return;
    }

    setState({ loading: true, error: '', success: false });
    try {
      const response = await submitLeadRequest('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'Bolsa de trabajo',
          nombre: form.name,
          telefono: form.phone,
          email: form.email,
          detalle: form.role,
          notas: form.why,
          website: String(e.currentTarget.elements.website?.value || ''),
        }),
      });
      if (!response.ok) throw new Error('No se pudo enviar la solicitud.');
      setState({ loading: false, error: '', success: true });
    } catch (error) {
      setState({ loading: false, error: error?.message || 'Ocurrió un error. Intenta nuevamente.', success: false });
    }
  }

  return (
    <form className="quick-form careers-form" onSubmit={submit}>
      <HoneypotField />
      <div className="quick-form-grid">
        <label>
          <span>Nombre completo *</span>
          <input
            required
            value={form.name}
            onChange={(e) => setForm((v) => ({ ...v, name: e.target.value }))}
            placeholder="Tu nombre"
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
        <span>Puesto de interés</span>
        <select value={form.role} onChange={(e) => setForm((v) => ({ ...v, role: e.target.value }))}>
          {roles.map((role) => (
            <option key={role}>{role}</option>
          ))}
        </select>
      </label>

      <label>
        <span>¿Por qué quieres unirte a Rednorte?</span>
        <textarea
          rows="5"
          value={form.why}
          onChange={(e) => setForm((v) => ({ ...v, why: e.target.value }))}
          placeholder="Cuéntanos sobre ti..."
        />
      </label>

      <label className="form-check">
        <input
          type="checkbox"
          checked={form.privacyConsent}
          onChange={(e) => setForm((v) => ({ ...v, privacyConsent: e.target.checked }))}
          required
        />
        <span>
          He leído el <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link> y autorizo el
          tratamiento de mis datos para atender esta solicitud.
        </span>
      </label>

      {state.error && <p className="quick-form-message is-error">{state.error}</p>}
      {state.success && <p className="quick-form-message is-success">Solicitud enviada correctamente.</p>}

      <button className="quick-submit" type="submit" disabled={state.loading}>
        {state.loading ? 'Enviando…' : 'Enviar solicitud'}
      </button>
    </form>
  );
}
