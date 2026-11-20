'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { createLeadSubmitter } from '@/lib/conversions';
import styles from './PropertySearchAssistant.module.css';

const submitTrackedLead = createLeadSubmitter('comprar');
const EMPTY = { name: '', phone: '', email: '', zone: '', budget: '', bedrooms: '', detail: '', privacy: false };

export default function PropertySearchAssistant({ variant = 'inline', filters = {} }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const titleId = useId();
  const nameId = useId();
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!open) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => document.getElementById(nameId)?.focus());
    const onKey = (event) => {
      if (event.key === 'Escape') { setOpen(false); return; }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const focusable = [...dialogRef.current.querySelectorAll('button:not(:disabled), input:not(:disabled), textarea:not(:disabled), select:not(:disabled), a[href]')];
      if (!focusable.length) return;
      if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault(); focusable.at(-1).focus();
      } else if (!event.shiftKey && document.activeElement === focusable.at(-1)) {
        event.preventDefault(); focusable[0].focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus?.();
    };
  }, [open, nameId]);

  const openForm = () => {
    setStatus('idle'); setMessage('');
    setForm({
      ...EMPTY,
      zone: filters?.zona && filters.zona !== 'Monterrey' ? filters.zona : '',
      budget: filters?.precioMax ? `Hasta ${filters.precioMax}` : '',
      bedrooms: filters?.recamaras && filters.recamaras !== '0' ? filters.recamaras : '',
    });
    setOpen(true);
  };
  const change = (event) => {
    const { name, type, value, checked } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.privacy || status === 'sending') return;
    setStatus('sending'); setMessage('');

    // A preview de Vercel nunca envía prospectos ficticios a la hoja de producción.
    const hostname = window.location.hostname;
    if (hostname.endsWith('.vercel.app') || hostname === 'localhost') {
      setStatus('preview');
      setMessage('Puedes revisar toda la experiencia. Los envíos están desactivados únicamente en la vista previa.');
      return;
    }

    const notes = [
      'Búsqueda asistida: casas en venta en Monterrey',
      `Zona preferida: ${form.zone.trim() || 'Por definir'}`,
      `Presupuesto: ${form.budget.trim() || 'Por definir'}`,
      `Recámaras: ${form.bedrooms || 'Indistinto'}`,
      `Requisitos: ${form.detail.trim() || 'Sin requisitos adicionales'}`,
      'Landing: /propiedades/monterrey/casas-en-venta',
    ].join('\n');
    try {
      const response = await submitTrackedLead('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tipo: 'Comprar propiedad',
          nombre: form.name.trim(),
          telefono: form.phone.trim(),
          email: form.email.trim(),
          detalle: 'Búsqueda asistida de casas en venta en Monterrey',
          notas: notes,
        }),
      });
      if (!response.ok) throw new Error('Error en la solicitud');
      setStatus('success');
      setMessage('Recibimos tu solicitud. El equipo de Rednorte revisará la búsqueda.');
    } catch {
      setStatus('error');
      setMessage('No pudimos registrar la solicitud. Por favor inténtalo de nuevo.');
    }
  };

  const heading = variant === 'empty' ? '¿No hay coincidencias? Tu búsqueda puede continuar.' :
    variant === 'footer' ? 'Tu próxima casa puede estar más cerca de lo que imaginas.' :
      '¿No encontraste la casa que estabas buscando?';

  return (
    <>
      {variant === 'hero' ? (
        <button className={styles.heroButton} type="button" onClick={openForm}>
          Cuéntanos qué buscas <span aria-hidden="true">↗</span>
        </button>
      ) : (
        <aside className={`${styles.card} ${styles[variant] || ''}`}>
          <div className={styles.content}>
            <span className={styles.eyebrow}>✳ BÚSQUEDA PERSONALIZADA</span>
            <h2>{heading}</h2>
            <p>Cuéntanos tus prioridades. Un asesor de Rednorte puede ayudarte a revisar otras opciones disponibles en nuestra red inmobiliaria, según tu presupuesto y la zona que buscas.</p>
            <small>✓ Sin compromiso <span>·</span> Asesores reales de Rednorte</small>
          </div>
          <button type="button" className={styles.cardButton} onClick={openForm}>
            Recibir opciones personalizadas <span aria-hidden="true">↗</span>
          </button>
          <div className={styles.letter} aria-hidden="true">R</div>
        </aside>
      )}
      {open && (
        <div className={styles.overlay} onMouseDown={(event) => { if (event.target === event.currentTarget) setOpen(false); }}>
          <section className={styles.dialog} ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby={titleId}>
            <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Cerrar formulario">×</button>
            <span className={styles.dialogEyebrow}>REDNORTE · BÚSQUEDA PERSONALIZADA</span>
            <h2 id={titleId}>Cuéntanos cómo es la casa que estás buscando.</h2>
            <p className={styles.dialogSub}>Solo necesitamos algunos datos para revisar contigo alternativas que se adapten a tus necesidades.</p>
            {(status === 'success' || status === 'preview') ? (
              <div className={styles.result} role="status">
                <span aria-hidden="true">✓</span>
                <strong>{status === 'preview' ? 'Vista previa completada' : 'Solicitud registrada'}</strong>
                <p>{message}</p>
                <button type="button" onClick={() => setOpen(false)}>Cerrar</button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit}>
                <div className={styles.fields}>
                  <label>Zona o colonia de interés
                    <input name="zone" value={form.zone} onChange={change} maxLength={120} placeholder="Ej. Cumbres, Carretera Nacional" />
                  </label>
                  <label>Presupuesto aproximado
                    <input name="budget" value={form.budget} onChange={change} maxLength={80} placeholder="Ej. $4,000,000 a $6,000,000" />
                  </label>
                  <label>Recámaras
                    <select name="bedrooms" value={form.bedrooms} onChange={change}>
                      <option value="">Indistinto / por definir</option>
                      <option value="2">2 o más</option>
                      <option value="3">3 o más</option>
                      <option value="4">4 o más</option>
                    </select>
                  </label>
                  <label>Nombre completo *
                    <input id={nameId} name="name" value={form.name} onChange={change} maxLength={120} autoComplete="name" required minLength={2} placeholder="Tu nombre" />
                  </label>
                  <label>WhatsApp *
                    <input name="phone" value={form.phone} onChange={change} maxLength={40} type="tel" inputMode="tel" autoComplete="tel" required pattern="[+0-9() .-]{7,40}" placeholder="81 1234 5678" />
                  </label>
                  <label>Correo electrónico (opcional)
                    <input name="email" value={form.email} onChange={change} maxLength={254} type="email" autoComplete="email" placeholder="correo@ejemplo.com" />
                  </label>
                  <label className={styles.full}>¿Hay algo indispensable?
                    <textarea name="detail" value={form.detail} onChange={change} maxLength={550} rows={2} placeholder="Jardín, cochera, estudio, ubicación..." />
                  </label>
                </div>
                <label className={styles.privacy}>
                  <input name="privacy" type="checkbox" checked={form.privacy} onChange={change} required />
                  <span>He leído el <Link href="/aviso-de-privacidad" target="_blank">Aviso de Privacidad</Link> y autorizo el tratamiento de mis datos para atender esta búsqueda.</span>
                </label>
                {status === 'error' && <p role="alert" className={styles.error}>{message}</p>}
                <button type="submit" disabled={status === 'sending'} className={styles.submit}>
                  {status === 'sending' ? 'Procesando solicitud…' : 'Solicitar búsqueda personalizada'} <span aria-hidden="true">↗</span>
                </button>
                <p className={styles.disclaimer}>Sin compromiso. Un asesor de Rednorte dará seguimiento a tu solicitud.</p>
              </form>
            )}
          </section>
        </div>
      )}
    </>
  );
}
