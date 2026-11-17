'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    document.getElementById(scenario ? 'diagnostico-revision' : 'elegir-situacion')
      ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <main className="sale-diagnosis">
      <section className="sale-diagnosis-hero" aria-labelledby="sale-diagnosis-heading">
        <div className="sale-diagnosis-hero-copy">
          <div className="sale-diagnosis-hero-copy-inner">
            <p className="sale-diagnosis-eyebrow">REDNORTE <span> / </span> ESTRATEGIA INMOBILIARIA</p>
            <div className="sale-diagnosis-hero-pill"><span aria-hidden="true" /> REVISIÓN INICIAL GRATUITA · SIN COMPROMISO</div>
            <h1 id="sale-diagnosis-heading">¿Por qué <em>no se vende</em> mi propiedad?</h1>
            <p className="sale-diagnosis-lead">Publicarla fue el primer paso. Ahora descubramos qué puede estar impidiendo que lleguen compradores, visitas u ofertas.</p>
            <div className="sale-diagnosis-hero-actions">
              <a className="sale-diagnosis-primary" href="#elegir-situacion">Descubre qué está pasando <span aria-hidden="true">↗</span></a>
              <button type="button" className="sale-diagnosis-hero-text-link" onClick={goContact}>Quiero una revisión gratuita <span aria-hidden="true">→</span></button>
            </div>
            <div className="sale-diagnosis-hero-points" aria-label="Ventajas de la revisión">
              <span><b aria-hidden="true">✓</b> Sin costo</span>
              <span><b aria-hidden="true">✓</b> Sin compromiso</span>
              <span><b aria-hidden="true">✓</b> Con un equipo de Monterrey</span>
            </div>
          </div>
        </div>
        <div className="sale-diagnosis-hero-photo">
          <Image
            src="/images/rednorte-monterrey-living.webp"
            alt="Interior residencial de referencia para la comunicación de Rednorte"
            fill
            priority
            sizes="(max-width: 880px) 100vw, 46vw"
            className="sale-diagnosis-hero-image"
          />
          <div className="sale-diagnosis-hero-photo-shade" aria-hidden="true" />
          <div className="sale-diagnosis-photo-top"><span>REDNORTE</span><span>MONTERREY · N.L.</span></div>
          <div className="sale-diagnosis-photo-statement">
            <span>NO ES SOLO PUBLICAR.</span>
            <strong>Es saber<br />cómo vender.</strong>
          </div>
          <span className="sale-diagnosis-photo-index" aria-hidden="true">01 / 05</span>
        </div>
      </section>

      <section className="sale-diagnosis-choose" id="elegir-situacion" aria-labelledby="sale-choose-title">
        <div className="sale-diagnosis-container">
          <div className="sale-diagnosis-section-heading">
            <div>
              <p className="sale-diagnosis-eyebrow">PRIMER PASO · MENOS DE UN MINUTO</p>
              <h2 id="sale-choose-title">¿Qué está pasando<br /><em>con tu propiedad?</em></h2>
            </div>
            <div className="sale-diagnosis-section-aside">
              <span className="sale-diagnosis-step-count">01 <span>/ 03</span></span>
              <p>Elige lo que más se parece a tu situación. Te explicaremos qué podría estar ocurriendo y cómo lo revisaríamos en Rednorte.</p>
              <small>Sin datos personales para consultar la orientación.</small>
            </div>
          </div>

          <div className="sale-diagnosis-options" role="group" aria-label="Selecciona tu situación">
            {escenariosVenta.map((item, i) => (
              <button
                className={\`sale-diagnosis-option \${selected === item.id ? 'is-selected' : ''}\`}
                key={item.id}
                type="button"
                aria-pressed={selected === item.id}
                onClick={() => selectScenario(item.id)}
              >
                <span className="sale-diagnosis-option-top">
                  <span className="sale-diagnosis-option-number">{String(i + 1).padStart(2, '0')}</span>
                  <span className="sale-diagnosis-option-indicator" aria-hidden="true">{selected === item.id ? '✓' : '↗'}</span>
                </span>
                <span className="sale-diagnosis-option-copy">
                  <strong>{item.opcion}</strong>
                  <small>{item.breve}</small>
                </span>
                <span className="sale-diagnosis-option-foot">{selected === item.id ? 'TU SITUACIÓN' : 'VER POSIBLES CAUSAS'} <span aria-hidden="true">→</span></span>
              </button>
            ))}
          </div>
          <div className="sale-diagnosis-selector-note"><span className="sale-diagnosis-note-mark">R</span><p>Una propiedad puede tener varios obstáculos. Elegimos uno para empezar a entenderlos, no para darte un diagnóstico definitivo.</p></div>
        </div>
      </section>

      {scenario && (
        <section className="sale-diagnosis-result" id="orientacion" ref={resultsRef} aria-labelledby="sale-result-title">
          <div className="sale-diagnosis-container">
            <div className="sale-diagnosis-section-heading sale-diagnosis-section-heading--result">
              <div>
                <p className="sale-diagnosis-eyebrow">TU SITUACIÓN · QUÉ PODRÍA ESTAR PASANDO</p>
                <h2 id="sale-result-title">{scenario.titulo}</h2>
              </div>
              <div className="sale-diagnosis-section-aside">
                <span className="sale-diagnosis-step-count">02 <span>/ 03</span></span>
                <p>{scenario.intro}</p>
              </div>
            </div>
            <p className="sale-diagnosis-disclaimer"><span aria-hidden="true">i</span> Estas son explicaciones posibles, no conclusiones sobre tu inmueble. Una revisión individual podría revelar otras causas.</p>

            <div className="sale-diagnosis-insights">
              <div className="sale-diagnosis-insights-lead">
                <span className="sale-diagnosis-eyebrow">NO TODO SE RESUELVE BAJANDO EL PRECIO</span>
                <h3>Tres factores que vale la pena investigar.</h3>
                <p>El primer paso no es cambiarlo todo. Es saber qué revisar y por qué.</p>
                <button type="button" className="sale-diagnosis-insights-cta" onClick={goContact}>Revisar mi anuncio gratis <span aria-hidden="true">↗</span></button>
              </div>
              <div className="sale-diagnosis-reasons" key={scenario.id}>
                {scenario.aspectos.map((item, index) => (
                  <details className="sale-diagnosis-reason" key={item.titulo} defaultOpen={index === 0}>
                    <summary>
                      <span className="sale-diagnosis-reason-number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="sale-diagnosis-reason-title">{item.titulo}</span>
                      <span className="sale-diagnosis-reason-toggle" aria-hidden="true">+</span>
                    </summary>
                    <div className="sale-diagnosis-reason-body">
                      <p>{item.explicacion}</p>
                      <div className="sale-diagnosis-answer">
                        <span className="sale-diagnosis-answer-tag">CÓMO LO ABORDARÍA REDNORTE</span>
                        <p>{item.rednorte}</p>
                      </div>
                    </div>
                  </details>
                ))}
              </div>
            </div>

            <div className="sale-diagnosis-summary">
              <div className="sale-diagnosis-summary-mark" aria-hidden="true">R</div>
              <div>
                <p className="sale-diagnosis-eyebrow">AHORA, UN SIGUIENTE PASO CONCRETO</p>
                <h3>Antes de cambiar el precio, <em>revisemos lo que importa.</em></h3>
                <p>{scenario.revision}</p>
              </div>
              <button type="button" className="sale-diagnosis-primary" onClick={goContact}>Quiero mi revisión sin costo <span aria-hidden="true">↗</span></button>
            </div>
          </div>
        </section>
      )}

      {scenario && (
        <section className="sale-diagnosis-contact" id="diagnostico-revision" aria-labelledby="sale-contact-title">
          <div className="sale-diagnosis-container sale-diagnosis-contact-grid">
            <div className="sale-diagnosis-contact-copy">
              <p className="sale-diagnosis-eyebrow">TU ANUNCIO MERECE UNA SEGUNDA MIRADA</p>
              <h2 id="sale-contact-title">Te ayudamos a ver <em>qué podrías mejorar.</em></h2>
              <p className="sale-diagnosis-contact-lead">Compártenos tu anuncio. Un integrante de Rednorte podrá hacer una revisión comercial inicial y ponerse en contacto contigo.</p>
              <div className="sale-diagnosis-promise-list" aria-label="Qué incluye la revisión">
                <div><span aria-hidden="true">01</span><strong>Posicionamiento comercial</strong><small>Precio y alternativas de mercado.</small></div>
                <div><span aria-hidden="true">02</span><strong>Presentación del anuncio</strong><small>Fotografías y claridad del contenido.</small></div>
                <div><span aria-hidden="true">03</span><strong>Exposición de la propiedad</strong><small>Canales y oportunidades de mejora.</small></div>
              </div>
              <p className="sale-diagnosis-contact-context">Elegiste: <strong>{scenario.opcion}</strong></p>
              <p className="sale-diagnosis-contact-small">Revisión comercial inicial y orientativa. No incluye avalúo formal, estudio jurídico ni garantía de venta.</p>
            </div>
            <form className="sale-diagnosis-form" ref={formRef} onSubmit={sendForm}>
              <div className="sale-diagnosis-form-header">
                <span className="sale-diagnosis-form-badge">SIN COSTO · SIN COMPROMISO</span>
                <h3>Solicita tu revisión gratuita.</h3>
                <p>Solo necesitamos saber cómo contactarte. El enlace de tu anuncio es opcional.</p>
              </div>
              <div className="sale-diagnosis-form-row">
                <label>Nombre completo *
                  <input required maxLength={120} autoComplete="name" name="nombre" placeholder="Tu nombre" value={form.nombre} onChange={updateField} />
                </label>
                <label>Teléfono o WhatsApp *
                  <input required type="tel" inputMode="tel" maxLength={40} autoComplete="tel" name="telefono" placeholder="81 0000 0000" value={form.telefono} onChange={updateField} />
                </label>
              </div>
              <label>Enlace de tu anuncio (opcional)
                <input type="url" maxLength={400} name="anuncio" placeholder="https://..." value={form.anuncio} onChange={updateField} />
              </label>
              <label>Correo electrónico (opcional)
                <input type="email" maxLength={254} name="email" autoComplete="email" placeholder="tucorreo@ejemplo.com" value={form.email} onChange={updateField} />
              </label>
              <div className="sale-diagnosis-honey" aria-hidden="true">
                <label>No completar <input type="text" name="website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <label className="sale-diagnosis-privacy">
                <input required type="checkbox" name="privacidad" checked={form.privacidad} onChange={updateField} />
                <span>He leído el <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link> y autorizo el tratamiento de mis datos para atender esta solicitud.</span>
              </label>
              <button disabled={status.type === 'submitting'} type="submit" className="sale-diagnosis-primary">
                {status.type === 'submitting' ? 'Enviando…' : 'Quiero mi revisión gratuita'} <span aria-hidden="true">↗</span>
              </button>
              <div className="sale-diagnosis-form-alternative"><span>O SI LO PREFIERES</span></div>
              <button disabled={status.type === 'submitting'} type="button" className="sale-diagnosis-secondary" onClick={goWhatsApp}>
                Enviar mensaje por WhatsApp <span aria-hidden="true">↗</span>
              </button>
              <p className="sale-diagnosis-contact-small">WhatsApp abrirá un mensaje preparado con tu situación. Debes confirmar su envío dentro de la aplicación.</p>
              {status.message && <p className={\`sale-diagnosis-form-message is-\${status.type}\`} role="status" aria-live="polite">{status.message}</p>}
            </form>
          </div>
        </section>
      )}

      <section className="sale-diagnosis-deeper">
        <div className="sale-diagnosis-container sale-diagnosis-deeper-grid">
          <div className="sale-diagnosis-deeper-indicator" aria-hidden="true">+</div>
          <div>
            <p className="sale-diagnosis-eyebrow">¿QUIERES IR MÁS A FONDO?</p>
            <h2>También puedes analizar la situación <em>por tu cuenta.</em></h2>
            <p>Nuestro Reporte de Vendibilidad te guía con preguntas sobre precio, fotografías, exposición y respuesta de los compradores. Es gratuito y ofrece orientación adicional.</p>
          </div>
          <Link className="sale-diagnosis-outline-link" href="/herramientas/reporte-de-vendibilidad">
            Explorar mi Reporte de Vendibilidad <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </section>
      <div className="sale-diagnosis-mobile-cta">
        <button type="button" onClick={goContact}>{scenario ? 'Pedir revisión gratis' : 'Identificar mi situación'} <span aria-hidden="true">↗</span></button>
      </div>
    </main>
  );
}
