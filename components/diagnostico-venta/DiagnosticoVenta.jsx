'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { SITE_CONTACT } from '@/lib/siteConfig';
import { submitTrackedLead, trackConversion } from '@/lib/conversions';
import { escenarioPorId, escenariosVenta } from './escenarios';

const initialForm = {
  nombre: '',
  telefono: '',
  email: '',
  anuncio: '',
  privacidad: false,
};

function datosDeCampana() {
  if (typeof window === 'undefined') return '';
  const params = new URLSearchParams(window.location.search);
  return ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content']
    .map((key) => {
      const value = (params.get(key) || '').trim().slice(0, 90);
      return value ? `${key}: ${value}` : '';
    })
    .filter(Boolean)
    .join(' · ');
}

function mensajeWhatsApp(escenario, form) {
  return [
    'Hola, Rednorte. Quisiera solicitar una revisión inicial gratuita y sin compromiso de contratación de mi anuncio.',
    `Mi situación: ${escenario.opcion}.`,
    `Nombre: ${form.nombre.trim()}`,
    `Teléfono: ${form.telefono.trim()}`,
    form.email.trim() ? `Correo: ${form.email.trim()}` : '',
    form.anuncio.trim() ? `Enlace del anuncio: ${form.anuncio.trim()}` : '',
    '¿Podrían contactarme para revisar el posicionamiento comercial de mi propiedad?',
  ].filter(Boolean).join('\n');
}

export default function DiagnosticoVenta() {
  const [selected, setSelected] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const resultsRef = useRef(null);
  const formRef = useRef(null);
  const startedRef = useRef(false);
  const scenario = escenarioPorId(selected);

  useEffect(() => {
    if (selected) resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [selected]);

  function selectScenario(id) {
    if (!startedRef.current) {
      trackConversion('herramienta_iniciada', 'diagnostico_venta');
      startedRef.current = true;
    }
    setSelected(id);
    setStatus({ type: 'idle', message: '' });
  }

  function updateField(event) {
    const { name, value, type, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    if (status.type === 'error') setStatus({ type: 'idle', message: '' });
  }

  function validateForm() {
    if (!formRef.current?.reportValidity()) return false;
    const number = form.telefono.replace(/\D/g, '');
    if (form.nombre.trim().length < 2 || number.length < 7 || number.length > 15) {
      setStatus({ type: 'error', message: 'Revisa tu nombre y proporciona un número telefónico válido.' });
      return false;
    }
    return true;
  }

  async function sendForm(event) {
    event.preventDefault();
    if (!scenario || !validateForm() || status.type === 'submitting') return;
    setStatus({ type: 'submitting', message: 'Registrando tu solicitud…' });
    const notes = [
      `Situación: ${scenario.opcion}`,
      form.anuncio.trim() ? `Anuncio: ${form.anuncio.trim()}` : '',
      datosDeCampana(),
    ].filter(Boolean).join(' · ');

    try {
      const response = await submitTrackedLead({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'Vender propiedad',
          nombre: form.nombre.trim(),
          telefono: form.telefono.trim(),
          email: form.email.trim(),
          detalle: `Revisión gratuita de anuncio · ${scenario.opcion}`,
          notas: notes,
          website: String(formRef.current?.elements.website?.value || ''),
        }),
      }, 'diagnostico_venta');
      if (!response.ok) throw new Error('No se pudo registrar la solicitud');
      setStatus({ type: 'success', message: 'Recibimos tu solicitud. Rednorte te contactará durante el horario de atención para revisar tu propiedad.' });
      setForm(initialForm);
    } catch {
      setStatus({ type: 'error', message: 'No se pudo confirmar la recepción. Intenta de nuevo o contáctanos directamente por WhatsApp.' });
    }
  }

  function goWhatsApp() {
    if (!scenario || !validateForm()) return;
    const link = `https://wa.me/${SITE_CONTACT.phoneDigits}?text=${encodeURIComponent(mensajeWhatsApp(scenario, form))}`;
    trackConversion('whatsapp_clic', 'diagnostico_venta');
    // No se registra como lead recibido hasta que el propietario envíe su mensaje.
    window.location.assign(link);
  }

  function goContact() {
    document.getElementById('diagnostico-revision')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="sale-diagnosis">
      <section className="sale-diagnosis-hero">
        <div className="sale-diagnosis-container sale-diagnosis-hero-grid">
          <div>
            <p className="sale-diagnosis-eyebrow">REDNORTE · DIAGNÓSTICO DE COMERCIALIZACIÓN</p>
            <h1>¿Por qué no se vende mi propiedad?</h1>
            <p className="sale-diagnosis-lead">
              Publicaste tu propiedad esperando encontrar compradores, pero los resultados no son los que imaginabas.
              Cada situación puede tener causas diferentes. Descubre qué conviene revisar y cómo podemos ayudarte.
            </p>
            <p className="sale-diagnosis-subnote">Orientación gratuita · Sin registro para ver las posibles causas</p>
          </div>
          <aside className="sale-diagnosis-hero-aside" aria-label="Qué ofrece esta herramienta">
            <p className="sale-diagnosis-eyebrow">PRIMERO ENTENDEMOS TU SITUACIÓN</p>
            <strong>Una publicación no siempre equivale a una estrategia comercial.</strong>
            <p>Conoce los obstáculos habituales, las preguntas que haríamos y qué puede hacer Rednorte antes de recomendarte un cambio de precio.</p>
            <a href="#elegir-situacion">Identificar mi situación <span aria-hidden="true">↘</span></a>
          </aside>
        </div>
      </section>

      <section className="sale-diagnosis-choose" id="elegir-situacion" aria-labelledby="sale-choose-title">
        <div className="sale-diagnosis-container">
          <p className="sale-diagnosis-eyebrow">01 · TU PUNTO DE PARTIDA</p>
          <h2 id="sale-choose-title">¿Cuál es tu situación?</h2>
          <p className="sale-diagnosis-section-intro">Selecciona la opción que mejor describa lo que está ocurriendo. No necesitas compartir datos personales para leer la orientación.</p>
          <div className="sale-diagnosis-options">
            {escenariosVenta.map((item, i) => (
              <button
                className={`sale-diagnosis-option ${selected === item.id ? 'is-selected' : ''}`}
                key={item.id}
                type="button"
                aria-pressed={selected === item.id}
                onClick={() => selectScenario(item.id)}
              >
                <span className="sale-diagnosis-option-number">{String(i + 1).padStart(2, '0')}</span>
                <span className="sale-diagnosis-option-copy"><strong>{item.opcion}</strong><small>{item.breve}</small></span>
                <span className="sale-diagnosis-option-icon" aria-hidden="true">↗</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {scenario && (
        <section className="sale-diagnosis-result" id="orientacion" ref={resultsRef} aria-labelledby="sale-result-title">
          <div className="sale-diagnosis-container">
            <p className="sale-diagnosis-eyebrow">02 · LO QUE PODRÍA ESTAR PASANDO</p>
            <h2 id="sale-result-title">{scenario.titulo}</h2>
            <p className="sale-diagnosis-result-intro">{scenario.intro}</p>
            <p className="sale-diagnosis-disclaimer">Estas son posibles explicaciones, no conclusiones sobre tu propiedad. Una revisión individual puede identificar otras causas.</p>
            <div className="sale-diagnosis-reasons">
              {scenario.aspectos.map((item, index) => (
                <article className="sale-diagnosis-reason" key={item.titulo}>
                  <span className="sale-diagnosis-reason-number">{String(index + 1).padStart(2, '0')}</span>
                  <div>
                    <h3>{item.titulo}</h3>
                    <p>{item.explicacion}</p>
                    <div className="sale-diagnosis-answer">
                      <strong>Así lo abordaría Rednorte</strong>
                      <p>{item.rednorte}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <div className="sale-diagnosis-summary">
              <div>
                <p className="sale-diagnosis-eyebrow">03 · TU SIGUIENTE PASO</p>
                <h2>Antes de cambiar el precio, revisemos qué sucede.</h2>
                <p>{scenario.revision}</p>
                <p>Te ofrecemos una revisión inicial gratuita de tu anuncio y su posicionamiento comercial, sin compromiso de contratación.</p>
              </div>
              <button type="button" className="sale-diagnosis-primary" onClick={goContact}>
                Solicitar revisión gratuita <span aria-hidden="true">↗</span>
              </button>
            </div>
          </div>
        </section>
      )}

      {scenario && (
        <section className="sale-diagnosis-contact" id="diagnostico-revision" aria-labelledby="sale-contact-title">
          <div className="sale-diagnosis-container sale-diagnosis-contact-grid">
            <div>
              <p className="sale-diagnosis-eyebrow">REVISIÓN GRATUITA · SIN COMPROMISO</p>
              <h2 id="sale-contact-title">Cuéntanos dónde está anunciada tu propiedad.</h2>
              <p>Compártenos tus datos y, si lo tienes a la mano, el enlace de tu anuncio. Un integrante de Rednorte podrá revisar tu situación y ponerse en contacto contigo.</p>
              <p className="sale-diagnosis-contact-summary">Situación seleccionada: <strong>{scenario.opcion}</strong></p>
              <p className="sale-diagnosis-contact-small">La revisión inicial es comercial y orientativa. No incluye un avalúo formal, una investigación jurídica ni una garantía de venta.</p>
            </div>
            <form className="sale-diagnosis-form" ref={formRef} onSubmit={sendForm}>
              <div className="sale-diagnosis-form-row">
                <label>Nombre completo *
                  <input required maxLength={120} autoComplete="name" name="nombre" value={form.nombre} onChange={updateField} />
                </label>
                <label>Teléfono o WhatsApp *
                  <input required type="tel" inputMode="tel" maxLength={40} autoComplete="tel" name="telefono" value={form.telefono} onChange={updateField} />
                </label>
              </div>
              <label>Enlace de tu anuncio (opcional)
                <input type="url" maxLength={400} name="anuncio" placeholder="https://..." value={form.anuncio} onChange={updateField} />
              </label>
              <label>Correo electrónico (opcional)
                <input type="email" maxLength={254} name="email" autoComplete="email" value={form.email} onChange={updateField} />
              </label>
              <div className="sale-diagnosis-honey" aria-hidden="true">
                <label>No completar <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <label className="sale-diagnosis-privacy">
                <input required type="checkbox" name="privacidad" checked={form.privacidad} onChange={updateField} />
                <span>He leído el <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link> y autorizo el tratamiento de mis datos para atender esta solicitud.</span>
              </label>
              <button disabled={status.type === 'submitting'} type="submit" className="sale-diagnosis-primary">
                {status.type === 'submitting' ? 'Enviando…' : 'Enviar mi solicitud gratuita'}
              </button>
              <button disabled={status.type === 'submitting'} type="button" className="sale-diagnosis-secondary" onClick={goWhatsApp}>
                Prefiero escribir por WhatsApp <span aria-hidden="true">↗</span>
              </button>
              <p className="sale-diagnosis-contact-small">WhatsApp abrirá un mensaje con tu situación y tus datos; confirma el envío dentro de la aplicación.</p>
              {status.message && <p className={`sale-diagnosis-form-message is-${status.type}`} role="status" aria-live="polite">{status.message}</p>}
            </form>
          </div>
        </section>
      )}

      <section className="sale-diagnosis-deeper">
        <div className="sale-diagnosis-container sale-diagnosis-deeper-grid">
          <div>
            <p className="sale-diagnosis-eyebrow">¿QUIERES PROFUNDIZAR POR TU CUENTA?</p>
            <h2>Explora otros factores que pueden estar influyendo en la venta.</h2>
            <p>Nuestro Reporte de Vendibilidad te guía por preguntas sobre precio, presentación, exposición y respuesta de los compradores. Obtén orientación adicional sin tener que registrarte.</p>
          </div>
          <Link className="sale-diagnosis-outline-link" href="/herramientas/reporte-de-vendibilidad">
            Explorar mi Reporte de Vendibilidad <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
