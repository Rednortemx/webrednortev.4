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
    `Mi situación: ${escenario?.opcion || 'Prefiero una revisión inicial de mi anuncio'}.`,
    `Nombre: ${form.nombre.trim()}`,
    `Teléfono: ${form.telefono.trim()}`,
    form.email.trim() ? `Correo: ${form.email.trim()}` : '',
    form.anuncio.trim() ? `Enlace del anuncio: ${form.anuncio.trim()}` : '',
    '¿Podrían contactarme para revisar el posicionamiento comercial de mi propiedad?',
  ].filter(Boolean).join('\n');
}


const etapasVenta = [
  { id: 'sin-consultas', titulo: 'Visibilidad', descripcion: 'Llegar a compradores' },
  { id: 'sin-visitas', titulo: 'Consultas', descripcion: 'Convertir interés en citas' },
  { id: 'sin-ofertas', titulo: 'Visitas', descripcion: 'Entender objeciones' },
  { id: 'ofertas-bajas', titulo: 'Ofertas', descripcion: 'Negociar con contexto' },
  { id: 'operaciones-caidas', titulo: 'Cierre', descripcion: 'Preparar la operación' },
];

// Ilustraciones abstractas: nunca representan fotografías, precios ni métricas reales.
const graficosPorEscenario = {
  'sin-consultas': ['comparacion', 'imagen', 'canales'],
  'sin-visitas': ['informacion', 'personas', 'proceso'],
  'sin-ofertas': ['imagen', 'comparacion', 'conversacion'],
  'ofertas-bajas': ['negociacion', 'comparacion', 'condicion'],
  'operaciones-caidas': ['financiamiento', 'informacion', 'proceso'],
};

function GraficoFactor({ tipo }) {
  return (
    <span className={'sd-factor-art sd-factor-art--' + tipo} aria-hidden="true">
      {tipo === 'comparacion' && <span className="sd-bars"><i/><i/><i/></span>}
      {tipo === 'imagen' && <span className="sd-picture"><i/><b/></span>}
      {tipo === 'canales' && <span className="sd-network"><i/><i/><i/><i/><b/></span>}
      {tipo === 'informacion' && <span className="sd-paper"><i/><i/><i/></span>}
      {tipo === 'personas' && <span className="sd-people"><i/><i/><i/></span>}
      {tipo === 'proceso' && <span className="sd-chain"><i/><i/><i/></span>}
      {tipo === 'conversacion' && <span className="sd-chat"><i/><i/></span>}
      {tipo === 'negociacion' && <span className="sd-offers"><i/><i/></span>}
      {tipo === 'condicion' && <span className="sd-home-shape"><i/><b/></span>}
      {tipo === 'financiamiento' && <span className="sd-coins"><i/><i/><i/></span>}
    </span>
  );
}

export default function DiagnosticoVenta() {
  const [selected, setSelected] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const resultsRef = useRef(null);
  const formRef = useRef(null);
  const startedRef = useRef(false);
  const returnFocusRef = useRef(null);
  const resultTrackedRef = useRef(false);
  const scenario = escenarioPorId(selected);
  const selectedIndex = etapasVenta.findIndex((item) => item.id === selected);

  useEffect(() => {
    if (!selected) return;
    if (!resultTrackedRef.current) {
      trackConversion('herramienta_completada', 'diagnostico_venta');
      resultTrackedRef.current = true;
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    resultsRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  }, [selected]);

  useEffect(() => {
    if (!panelOpen) return undefined;
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const formEl = formRef.current;
    formEl?.querySelector('[name="nombre"]')?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setPanelOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !formEl) return;
      const focusable = [...formEl.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]):not([tabindex="-1"])')]
        .filter((element) => element.getClientRects().length > 0);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = priorOverflow;
      document.removeEventListener('keydown', onKeyDown);
      returnFocusRef.current?.focus?.();
    };
  }, [panelOpen]);

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
    if (!validateForm() || status.type === 'submitting') return;
    setStatus({ type: 'submitting', message: 'Registrando tu solicitud…' });
    const notes = [
      `Situación: ${scenario?.opcion || 'Revisión general sin selección'}`,
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
          detalle: `Revisión gratuita de anuncio · ${scenario?.opcion || 'Revisión general'}`,
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
    if (!validateForm()) return;
    const link = `https://wa.me/${SITE_CONTACT.phoneDigits}?text=${encodeURIComponent(mensajeWhatsApp(scenario, form))}`;
    trackConversion('whatsapp_clic', 'diagnostico_venta');
    // No se registra como lead recibido hasta que el propietario envíe su mensaje.
    window.location.assign(link);
  }

  function goContact() {
    returnFocusRef.current = document.activeElement;
    setPanelOpen(true);
  }

  return (
    <main className={'sale-diagnosis' + (panelOpen ? ' sd-panel-active' : '')}>
      <section className="sale-diagnosis-first" aria-labelledby="sale-main-title">
        <div className="sale-diagnosis-container sale-diagnosis-first-grid">
          <div className="sale-diagnosis-intro">
            <p className="sale-diagnosis-eyebrow"><span className="sale-diagnosis-eyebrow-line" /> REDNORTE · ASESORÍA INMOBILIARIA EN MONTERREY</p>
            <h1 id="sale-main-title">¿Tu propiedad <span>no se vende?</span></h1>
            <p className="sale-diagnosis-intro-lead">Publicarla fue el primer paso. Si las consultas, visitas u ofertas no llegan, vale la pena entender qué está pasando.</p>
            <p className="sale-diagnosis-intro-explainer">Elige tu situación para conocer posibles causas y cómo podemos ayudarte. O solicita directamente una <strong>revisión comercial inicial gratuita</strong> de tu anuncio.</p>
            <div className="sale-diagnosis-intro-actions">
              <a href="#elegir-situacion" className="sale-diagnosis-action-primary">Identificar mi situación <span aria-hidden="true">↗</span></a>
              <button type="button" className="sale-diagnosis-action-link" onClick={goContact}>Quiero una revisión gratuita <span aria-hidden="true">→</span></button>
            </div>
            <div className="sale-diagnosis-trust-strip" aria-label="Por qué solicitar una revisión de Rednorte">
              <span><strong>Desde 2018</strong><small>En el mercado inmobiliario</small></span>
              <span><strong>Monterrey y N.L.</strong><small>Enfoque local</small></span>
              <span><strong>Sin compromiso</strong><small>Revisión comercial inicial</small></span>
            </div>
          </div>

          <div className="sale-diagnosis-selector" id="elegir-situacion" aria-labelledby="sale-situations-title">
            <div className="sale-diagnosis-selector-top">
              <p className="sale-diagnosis-eyebrow">EMPECEMOS POR TU SITUACIÓN</p>
              <h2 id="sale-situations-title">¿Qué está pasando <span>con tu propiedad?</span></h2>
              <p>Selecciona la opción que mejor describa lo que estás viviendo.</p>
              <div className="sd-selector-decor" aria-hidden="true"><i/><i/><i/><i/><i/></div>
            </div>
            <div className="sale-diagnosis-choices" role="group" aria-label="Situaciones de venta">
              {escenariosVenta.map((item, index) => (
                <button
                  type="button"
                  key={item.id}
                  aria-pressed={selected === item.id}
                  className={'sale-diagnosis-choice' + (selected === item.id ? ' is-selected' : '')}
                  onClick={() => selectScenario(item.id)}
                >
                  <span className="sale-diagnosis-choice-number">{String(index + 1).padStart(2, '0')}</span>
                  <span className="sale-diagnosis-choice-copy"><strong>{item.opcion}</strong><small>{item.breve}</small></span>
                  <span className="sale-diagnosis-choice-arrow" aria-hidden="true">{selected === item.id ? '✓' : '→'}</span>
                </button>
              ))}
            </div>
            <div className="sale-diagnosis-selector-bottom">
              <span>¿Prefieres hablar directamente con nosotros?</span>
              <button type="button" onClick={goContact}>Revisión gratis de mi anuncio <span aria-hidden="true">↗</span></button>
            </div>
          </div>
        </div>
      </section>

      {scenario && (
        <section className="sale-diagnosis-result" ref={resultsRef} id="orientacion" aria-labelledby="sale-result-title">
          <div className="sale-diagnosis-container">
            <div className="sd-map-heading">
              <p className="sale-diagnosis-eyebrow">DÓNDE CONVIENE PONER ATENCIÓN</p>
              <div className="sd-map-title">
                <h2>El recorrido hacia la venta</h2>
                <p>Cada etapa es una oportunidad para mejorar. Explora dónde podría estar la dificultad y qué investigaríamos.</p>
              </div>
            </div>

            <div className="sd-journey" role="group" aria-label="Etapas de comercialización que puedes explorar" style={{ '--sd-progress': String((selectedIndex / 4) * 100) + '%' }}>
              <div className="sd-journey-line" aria-hidden="true"><span /></div>
              {etapasVenta.map((etapa, index) => (
                <button
                  type="button"
                  key={etapa.id}
                  className={'sd-stage' + (selected === etapa.id ? ' is-current' : '') + (index < selectedIndex ? ' is-previous' : '')}
                  aria-pressed={selected === etapa.id}
                  onClick={() => selectScenario(etapa.id)}
                >
                  <span className="sd-stage-index">0{index + 1}</span>
                  <span className="sd-stage-dot"><span /></span>
                  <strong>{etapa.titulo}</strong>
                  <small>{etapa.descripcion}</small>
                </button>
              ))}
            </div>
            <div className="sd-stage-caption"><span className="sd-stage-caption-mark" aria-hidden="true" /> ETAPA QUE VALE LA PENA REVISAR: <strong>{etapasVenta[selectedIndex]?.titulo}</strong><span className="sd-stage-caption-disclaimer">Representación orientativa, no un diagnóstico técnico.</span></div>

            <div className="sd-result-header">
              <div>
                <p className="sale-diagnosis-eyebrow">TU SITUACIÓN · ORIENTACIÓN PERSONALIZADA</p>
                <h2 id="sale-result-title">{scenario.titulo}</h2>
                <p>{scenario.intro}</p>
              </div>
              <button type="button" className="sd-change-button" onClick={() => document.getElementById('elegir-situacion')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}>Cambiar mi situación <span aria-hidden="true">↑</span></button>
            </div>

            <div className="sd-explanation-layout">
              <div className="sd-explanation-primary">
                <div className="sd-explanation-lead">
                  <p className="sale-diagnosis-eyebrow">PODRÍA HABER VARIAS RAZONES</p>
                  <h3>Tres factores que revisaríamos.</h3>
                  <p>Selecciona un factor para entender por qué puede influir y cómo lo abordaría Rednorte.</p>
                </div>
                <div className="sd-factors" key={scenario.id}>
                  {scenario.aspectos.map((factor, index) => (
                    <details className="sd-factor" key={factor.titulo} defaultOpen={index === 0} style={{ '--sd-sequence': index }}>
                      <summary>
                        <GraficoFactor tipo={graficosPorEscenario[scenario.id]?.[index] || 'proceso'} />
                        <span className="sd-factor-main">
                          <small>POSIBLE CAUSA 0{index + 1}</small>
                          <strong>{factor.titulo}</strong>
                          <em>{index === 0 ? 'Explora la explicación' : 'Ver por qué puede influir'}</em>
                        </span>
                        <span className="sd-factor-toggle" aria-hidden="true">+</span>
                      </summary>
                      <div className="sd-factor-content">
                        <p>{factor.explicacion}</p>
                        <div className="sd-factor-solution"><strong>Cómo lo abordaría Rednorte</strong><p>{factor.rednorte}</p></div>
                      </div>
                    </details>
                  ))}
                </div>
                <p className="sd-illustration-note">Los elementos gráficos son ilustrativos; no representan datos medidos de una propiedad real.</p>
              </div>
              <aside className="sd-result-aside">
                <div className="sd-result-aside-top"><span>R</span><small>REVISIÓN INICIAL GRATUITA</small></div>
                <h3>¿Quieres saber qué aplica a tu propiedad?</h3>
                <p>Antes de recomendarte bajar el precio o invertir más en anuncios, revisamos qué puede estar dificultando la comercialización.</p>
                <div className="sd-aside-point"><span>01</span><strong>Posicionamiento comercial</strong></div>
                <div className="sd-aside-point"><span>02</span><strong>Presentación del anuncio</strong></div>
                <div className="sd-aside-point"><span>03</span><strong>Exposición de la propiedad</strong></div>
                <button type="button" className="sale-diagnosis-action-primary sd-aside-cta" onClick={goContact}>Solicitar revisión sin costo <span aria-hidden="true">↗</span></button>
                <small className="sd-aside-disclaimer">Sin compromiso de contratación.</small>
              </aside>
            </div>

            <div className="sd-method">
              <div className="sd-method-heading">
                <p className="sale-diagnosis-eyebrow">NUESTRO PROCESO</p>
                <h3>Del problema a una <span>estrategia más clara.</span></h3>
                <p>No prometemos una venta inmediata. Empezamos por comprender el inmueble y proponer pasos comerciales razonables.</p>
              </div>
              <div className="sd-method-steps" aria-label="Cómo trabaja Rednorte">
                <div><span className="sd-method-number">01</span><span className="sd-method-symbol" aria-hidden="true">◎</span><strong>Analizamos</strong><p>Tu publicación, el contexto y las alternativas del mercado.</p></div>
                <div><span className="sd-method-number">02</span><span className="sd-method-symbol" aria-hidden="true">◇</span><strong>Identificamos</strong><p>Qué aspectos conviene revisar y cuáles podrían mejorarse.</p></div>
                <div><span className="sd-method-number">03</span><span className="sd-method-symbol" aria-hidden="true">↗</span><strong>Proponemos</strong><p>Un siguiente paso comercial adaptado a tu propiedad.</p></div>
              </div>
            </div>
            <div className="sd-result-action">
              <div><strong>¿Quieres que revisemos tu caso?</strong><p>{scenario.revision} La revisión comercial inicial es gratuita y sin compromiso.</p></div>
              <button type="button" className="sale-diagnosis-action-primary" onClick={goContact}>Quiero una revisión gratuita <span aria-hidden="true">↗</span></button>
            </div>
          </div>
        </section>
      )}

      <section className="sale-diagnosis-review" id="diagnostico-revision" aria-labelledby="sale-review-title">
        <div className="sale-diagnosis-container sale-diagnosis-review-grid">
          <div className="sale-diagnosis-review-copy">
            <p className="sale-diagnosis-eyebrow">REVISIÓN COMERCIAL · GRATUITA Y SIN COMPROMISO</p>
            <h2 id="sale-review-title">Veamos cómo <span>podríamos mejorar tu anuncio.</span></h2>
            <p className="sale-diagnosis-review-lead">Antes de sugerirte un cambio de precio o mayor inversión publicitaria, revisamos lo que tu propiedad está comunicando al mercado.</p>
            <div className="sale-diagnosis-review-points">
              <div><span>01</span><div><strong>Precio y competencia</strong><small>Cómo está posicionada frente a otras opciones.</small></div></div>
              <div><span>02</span><div><strong>Fotografías y presentación</strong><small>Si el anuncio muestra sus atributos con claridad.</small></div></div>
              <div><span>03</span><div><strong>Exposición comercial</strong><small>Dónde se anuncia y qué canales podría aprovechar.</small></div></div>
            </div>
            <p className="sale-diagnosis-review-footnote">Es una revisión inicial y orientativa. No es un avalúo, estudio jurídico ni garantía de venta.</p>
          </div>

          <form
            className={'sale-diagnosis-form' + (panelOpen ? ' sd-drawer' : '')}
            ref={formRef}
            onSubmit={sendForm}
            role={panelOpen ? 'dialog' : undefined}
            aria-modal={panelOpen ? 'true' : undefined}
            aria-labelledby="sale-diagnosis-form-title"
          >
            {panelOpen && <button type="button" className="sd-drawer-close" onClick={() => setPanelOpen(false)} aria-label="Cerrar formulario">×</button>}
            <div className="sale-diagnosis-form-top">
              <p className="sale-diagnosis-form-badge">SIN COSTO · SIN COMPROMISO</p>
              <h3 id="sale-diagnosis-form-title">Solicita tu revisión gratuita.</h3>
              <p>Deja tus datos y te contactaremos en horario laboral. Si tienes el enlace del anuncio, puedes compartirlo.</p>
              {scenario && <p className="sale-diagnosis-selected"><strong>Tu situación:</strong> {scenario.opcion}</p>}
            </div>
            <div className="sale-diagnosis-form-row">
              <label>Nombre completo *
                <input required name="nombre" value={form.nombre} onChange={updateField} autoComplete="name" placeholder="Tu nombre" maxLength={120}/>
              </label>
              <label>Teléfono o WhatsApp *
                <input required name="telefono" type="tel" inputMode="tel" value={form.telefono} onChange={updateField} autoComplete="tel" placeholder="81 0000 0000" maxLength={40}/>
              </label>
            </div>
            <label>Enlace del anuncio (opcional)
              <input name="anuncio" type="url" value={form.anuncio} onChange={updateField} placeholder="https://..." maxLength={400}/>
            </label>
            <label>Correo electrónico (opcional)
              <input name="email" type="email" value={form.email} onChange={updateField} autoComplete="email" placeholder="tucorreo@ejemplo.com" maxLength={254}/>
            </label>
            <div className="sale-diagnosis-honey" aria-hidden="true"><label>No completar <input name="website" type="text" tabIndex={-1} autoComplete="off"/></label></div>
            <label className="sale-diagnosis-privacy">
              <input required name="privacidad" type="checkbox" checked={form.privacidad} onChange={updateField}/>
              <span>He leído el <Link href="/aviso-de-privacidad">Aviso de Privacidad</Link> y autorizo el uso de mis datos para atender esta solicitud.</span>
            </label>
            <button className="sale-diagnosis-action-primary sale-diagnosis-submit" type="submit" disabled={status.type === 'submitting'}>
              {status.type === 'submitting' ? 'Enviando…' : 'Quiero mi revisión gratuita'} <span aria-hidden="true">↗</span>
            </button>
            <div className="sale-diagnosis-or"><span>O si lo prefieres</span></div>
            <button className="sale-diagnosis-whatsapp" type="button" onClick={goWhatsApp} disabled={status.type === 'submitting'}>Enviar mensaje por WhatsApp <span aria-hidden="true">↗</span></button>
            <p className="sale-diagnosis-form-notice">Se abrirá WhatsApp con un mensaje preparado. Tendrás que confirmar su envío.</p>
            {status.message && <p className={'sale-diagnosis-form-message is-' + status.type} aria-live="polite" role="status">{status.message}</p>}
          </form>
        </div>
      </section>
      {panelOpen && <button className="sd-drawer-backdrop" type="button" aria-label="Cerrar revisión y volver al contenido" onClick={() => setPanelOpen(false)} />}

      <section className="sale-diagnosis-deeper">
        <div className="sale-diagnosis-container sale-diagnosis-deeper-grid">
          <div>
            <p className="sale-diagnosis-eyebrow">¿QUIERES PROFUNDIZAR POR TU CUENTA?</p>
            <h2>Explora nuestro <span>Reporte de Vendibilidad.</span></h2>
            <p>Responde preguntas sobre precio, fotografías, exposición y respuesta de los compradores para obtener orientación adicional. Gratuito y sin registro.</p>
          </div>
          <Link className="sale-diagnosis-deeper-link" href="/herramientas/reporte-de-vendibilidad">Explorar el reporte <span aria-hidden="true">↗</span></Link>
        </div>
      </section>

      <div className="sale-diagnosis-mobile-cta">
        <button type="button" onClick={goContact}>Pedir revisión gratuita <span aria-hidden="true">↗</span></button>
      </div>
    </main>
  );
}
