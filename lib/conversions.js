import { track } from '@vercel/analytics';
import { readPrivacyConsent } from './privacyConsent';

const EVENTS = new Set(['formulario_enviado', 'whatsapp_clic', 'busqueda_realizada', 'filtros_aplicados', 'herramienta_iniciada', 'herramienta_completada']);
const SOURCES = new Set(['contacto', 'whatsapp', 'comprar', 'rentar', 'vender', 'inversion', 'extranjeros', 'master_broker', 'empleo', 'servicio', 'cita', 'inicio', 'inventario', 'estimador', 'vendibilidad']);

// Only fixed labels are accepted. Never forward form values, URLs or messages.
export function trackConversion(name, source) {
  if (typeof window === 'undefined' || !EVENTS.has(name) || !SOURCES.has(source)) return;
  if (readPrivacyConsent()?.optional !== true) return;
  try { track(name, { origen: source }); } catch { /* Measurement cannot break a contact. */ }
}

export async function submitTrackedLead(options, source) {
  const permittedAtStart = readPrivacyConsent()?.optional === true;
  const response = await fetch('/api/leads', options);
  if (response.ok && permittedAtStart) trackConversion('formulario_enviado', source);
  return response;
}

export function createLeadSubmitter(source) {
  return (_url, options) => submitTrackedLead(options, source);
}

export function beforeAnalyticsSend(event) {
  if (readPrivacyConsent()?.optional !== true) return null;
  try {
    const url = new URL(event.url);
    url.search = '';
    url.hash = '';
    return { ...event, url: url.toString() };
  } catch { return null; }
}
