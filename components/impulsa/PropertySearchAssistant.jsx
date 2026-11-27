'use client';

import { createContext, useContext, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { createLeadSubmitter } from '@/lib/conversions';
import {
  assistedSearchNotes,
  createAssistedSearchForm,
  isAssistedSearchPreview,
  mergeAssistedSearchPrefill,
  validateAssistedSearch,
} from '@/lib/assistedSearch.mjs';
import styles from './PropertySearchAssistant.module.css';

const submitTrackedLead = createLeadSubmitter('comprar');
const SearchDraftContext = createContext(null);

// Scoped to the landing: drafts move between its CTAs but never enter storage.
export function PropertySearchAssistantProvider({ children }) {
  const [form, setForm] = useState(createAssistedSearchForm);
  const editedFields = useRef(new Set());
  return (
    <SearchDraftContext.Provider value={{ form, setForm, editedFields }}>
      {children}
    </SearchDraftContext.Provider>
  );
}

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

function AdvisorIcon() {
  return <svg viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6 5h20v15H14l-6 5v-5H6z" /><path d="M11 10h10M11 15h7" /></svg>;
}

export default function PropertySearchAssistant({ variant = 'inline', filters = {}, previewOnly = false }) {
  const [open, setOpen] = useState(false);
  const sharedDraft = useContext(SearchDraftContext);
  const [localForm, setLocalForm] = useState(createAssistedSearchForm);
  const localEditedFields = useRef(new Set());
  const { form, setForm, editedFields } = sharedDraft || {
    form: localForm, setForm: setLocalForm, editedFields: localEditedFields,
  };
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const id = useId();
  const titleId = `${id}-title`;
  const introId = `${id}-intro`;
  const dialogRef = useRef(null);
  const titleRef = useRef(null);
  const optionalRef = useRef(null);
  const sendingRef = useRef(false);
  const complete = status === 'success' || status === 'preview';

  useEffect(() => {
    if (!open) return undefined;
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    // The native top layer keeps the dialog above the hero, navigation and cards.
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    const frame = requestAnimationFrame(() => {
      dialog.scrollTop = 0;
      titleRef.current?.focus({ preventScroll: true });
    });
    return () => {
      cancelAnimationFrame(frame);
      if (dialog.open) dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus?.({ preventScroll: true });
    };
  }, [open]);

  useEffect(() => {
    if (!open || !complete) return;
    dialogRef.current.scrollTop = 0;
    titleRef.current?.focus({ preventScroll: true });
  }, [open, complete]);

  const openForm = () => {
    setForm((current) => mergeAssistedSearchPrefill(current, filters, editedFields.current));
    setErrors({});
    if (status === 'error') { setStatus('idle'); setMessage(''); }
    setOpen(true);
  };

  const startAgain = () => {
    editedFields.current.clear();
    setForm(mergeAssistedSearchPrefill(createAssistedSearchForm(), filters));
    setStatus('idle');
    setMessage('');
    setErrors({});
    requestAnimationFrame(() => titleRef.current?.focus({ preventScroll: true }));
  };

  const change = (event) => {
    const { name, type, value, checked } = event.target;
    editedFields.current.add(name);
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[name];
      return next;
    });
    if (status === 'error') { setStatus('idle'); setMessage(''); }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sendingRef.current) return;
    const validation = validateAssistedSearch(form);
    setErrors(validation);
    const invalid = Object.keys(validation)[0];
    if (invalid) {
      if (validation.email && optionalRef.current) optionalRef.current.open = true;
      requestAnimationFrame(() => document.getElementById(`${id}-${invalid}`)?.focus());
      return;
    }

    // The server flag also protects previews using a custom domain. The hostname
    // check remains a fallback for Vercel and local previews. Never send test leads.
    if (isAssistedSearchPreview(previewOnly, window.location.hostname)) {
      setStatus('preview');
      setMessage('Esta es una demostración. Tu solicitud no se ha enviado. En la página publicada, el equipo de Rednorte podrá dar seguimiento a tu búsqueda.');
      return;
    }

    sendingRef.current = true;
    setStatus('sending');
    setMessage('');
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
          notas: assistedSearchNotes(form, filters),
        }),
      });
      if (!response.ok) {
        setStatus('error');
        setMessage(response.status === 429
          ? 'Hemos recibido varias solicitudes. Espera unos minutos e inténtalo de nuevo; tus datos siguen aquí.'
          : 'No pudimos enviar tu solicitud. Tus datos siguen aquí para que puedas intentarlo de nuevo.');
        return;
      }
      setStatus('success');
      setMessage('Recibimos tus preferencias. El equipo de Rednorte revisará tu búsqueda y te contactará en el número que compartiste.');
      editedFields.current.clear();
      setForm(mergeAssistedSearchPrefill(createAssistedSearchForm(), filters));
    } catch {
      setStatus('error');
      setMessage('No pudimos conectar. Revisa tu conexión e inténtalo de nuevo; conservamos lo que escribiste.');
    } finally {
      sendingRef.current = false;
    }
  };

  const fieldError = (name) => errors[name] ? <span id={`${id}-${name}-error`} className={styles.fieldError}>{errors[name]}</span> : null;

  const keepKeyboardInDialog = (event) => {
    if (event.key !== 'Tab' || event.ctrlKey || event.metaKey || event.altKey) return;
    const controls = Array.from(dialogRef.current.querySelectorAll(
      'button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), a[href], summary',
    )).filter((element) => element.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (event.shiftKey && (document.activeElement === first || document.activeElement === titleRef.current)) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  };

  return (
    <>
      {variant === 'hero' ? (
        <button className={styles.heroButton} type="button" onClick={openForm} aria-haspopup="dialog">
          Quiero asesoría <ArrowIcon />
        </button>
      ) : (
        <aside className={`${styles.card} ${styles[variant] || ''}`}>
          <span className={styles.cardIcon}><AdvisorIcon /></span>
          <div className={styles.content}>
            <span className={styles.eyebrow}>Búsqueda personalizada</span>
            <h2>{variant === 'empty' ? 'Podemos ayudarte a seguir buscando.' : '¿No encontraste lo que buscas?'}</h2>
            <p>Cuéntanos tu presupuesto y la zona que te interesa. Un asesor de Rednorte te ayudará a revisar otras opciones.</p>
            {variant !== 'inline' && <small>Atención personalizada <span aria-hidden="true">·</span> Sin compromiso</small>}
          </div>
          <button type="button" className={styles.cardButton} onClick={openForm} aria-haspopup="dialog">
            Hablar con un asesor <ArrowIcon />
          </button>
        </aside>
      )}
      <dialog
        className={styles.dialog}
        ref={dialogRef}
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={introId}
        onKeyDown={keepKeyboardInDialog}
        onCancel={(event) => { event.preventDefault(); setOpen(false); }}
        onClose={() => setOpen(false)}
      >
        <div className={styles.dialogBody}>
          <button type="button" className={styles.close} onClick={() => setOpen(false)} aria-label="Cerrar formulario">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" /></svg>
          </button>
          <span className={styles.dialogEyebrow}>Rednorte · Asesoría personalizada</span>
          <h2 id={titleId} ref={titleRef} tabIndex={-1}>{complete ? (status === 'preview' ? 'Vista previa completada.' : 'Solicitud registrada.') : 'Busquemos una casa para ti.'}</h2>
          <p id={introId} className={styles.dialogSub}>{complete ? message : 'Comparte tus preferencias y un asesor revisará contigo alternativas para tu búsqueda.'}</p>
          {complete ? (
            <div className={styles.result}>
              <span className={styles.resultIcon} aria-hidden="true"><svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="m5 12 4 4L19 6" /></svg></span>
              <p>{status === 'preview' ? 'Puedes volver al catálogo y seguir probando los filtros.' : 'Mientras tanto, puedes seguir explorando las casas del catálogo.'}</p>
              <button className={styles.submit} type="button" onClick={() => setOpen(false)}>Volver al catálogo <ArrowIcon /></button>
              <button className={styles.textButton} type="button" onClick={startAgain}>Iniciar otra solicitud</button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate aria-busy={status === 'sending'}>
              <div className={styles.context} aria-label="Búsqueda actual"><span>Casa</span><span>Venta</span><span>Monterrey</span></div>
              <p className={styles.requiredNote}>Nombre, WhatsApp y autorización son obligatorios.</p>
              {Object.keys(errors).length > 0 && <p role="alert" className={styles.error}>Revisa los datos marcados para continuar.</p>}
              <fieldset className={styles.formFields} disabled={status === 'sending'}>
                <legend className={styles.visuallyHidden}>Datos para solicitar asesoría</legend>
                <div className={styles.fields}>
                  <div className={styles.field}>
                    <label htmlFor={`${id}-name`}>Tu nombre <span aria-hidden="true">*</span></label>
                    <input id={`${id}-name`} name="name" value={form.name} onChange={change} maxLength={120} autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${id}-name-error` : undefined} placeholder="¿Cómo te llamas?" />
                    {fieldError('name')}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor={`${id}-phone`}>WhatsApp de contacto <span aria-hidden="true">*</span></label>
                    <input id={`${id}-phone`} name="phone" value={form.phone} onChange={change} maxLength={40} type="tel" inputMode="tel" autoComplete="tel" required aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${id}-phone-error` : undefined} placeholder="Ej. 81 1234 5678" />
                    {fieldError('phone')}
                  </div>
                  <div className={styles.field}>
                    <label htmlFor={`${id}-zone`}>Zona o colonia <span className={styles.optionalLabel}>(opcional)</span></label>
                    <input id={`${id}-zone`} name="zone" value={form.zone} onChange={change} maxLength={120} placeholder="Ej. Cumbres" />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor={`${id}-budget`}>Presupuesto <span className={styles.optionalLabel}>(opcional)</span></label>
                    <input id={`${id}-budget`} name="budget" value={form.budget} onChange={change} maxLength={80} placeholder="Monto o rango aproximado" />
                  </div>
                </div>
                <details ref={optionalRef} className={styles.optional}>
                  <summary>Agregar preferencias <span>Opcional</span><svg viewBox="0 0 20 20" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m5 7.5 5 5 5-5" /></svg></summary>
                  <div className={styles.fields}>
                    <div className={styles.field}>
                      <label htmlFor={`${id}-bedrooms`}>Recámaras mínimas</label>
                      <select id={`${id}-bedrooms`} name="bedrooms" value={form.bedrooms} onChange={change}>
                        <option value="">Por definir</option>
                        <option value="1">1 o más</option>
                        <option value="2">2 o más</option>
                        <option value="3">3 o más</option>
                        <option value="4">4 o más</option>
                        <option value="5">5 o más</option>
                      </select>
                    </div>
                    <div className={styles.field}>
                      <label htmlFor={`${id}-email`}>Correo electrónico</label>
                      <input id={`${id}-email`} name="email" value={form.email} onChange={change} maxLength={254} type="email" autoComplete="email" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${id}-email-error` : undefined} placeholder="correo@ejemplo.com" />
                      {fieldError('email')}
                    </div>
                    <div className={`${styles.field} ${styles.full}`}>
                      <label htmlFor={`${id}-detail`}>¿Qué es indispensable para ti?</label>
                      <textarea id={`${id}-detail`} name="detail" value={form.detail} onChange={change} maxLength={550} rows={3} placeholder="Jardín, cochera, estudio, cercanía a tu trabajo…" />
                    </div>
                  </div>
                </details>
                <label className={styles.privacy} htmlFor={`${id}-privacy`}>
                  <input id={`${id}-privacy`} name="privacy" type="checkbox" checked={form.privacy} onChange={change} required aria-invalid={Boolean(errors.privacy)} aria-describedby={errors.privacy ? `${id}-privacy-error` : undefined} />
                  <span>He leído el <Link href="/aviso-de-privacidad" target="_blank" rel="noopener">Aviso de Privacidad<span className={styles.visuallyHidden}> (abre en una nueva pestaña)</span></Link> y autorizo el tratamiento de mis datos para atender esta búsqueda.</span>
                </label>
                {fieldError('privacy')}
                {status === 'error' && <p role="alert" className={styles.error}>{message}</p>}
                <button type="submit" disabled={status === 'sending'} className={styles.submit}>
                  {status === 'sending' ? 'Enviando solicitud…' : 'Solicitar asesoría'} <ArrowIcon />
                </button>
              </fieldset>
              <p className={styles.disclaimer} aria-live="polite">{status === 'sending' ? 'Estamos enviando tu solicitud.' : 'Sin compromiso. Te contactaremos para conocer mejor tu búsqueda.'}</p>
            </form>
          )}
        </div>
      </dialog>
    </>
  );
}
