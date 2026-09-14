import { trackConversion, submitTrackedLead } from './conversions';

// Bridge for the two existing classic-script tools. No form data goes to track().
export function bindToolConversions(container, source) {
  let started = false;
  let completed = false;
  const start = () => {
    if (started) return;
    started = true;
    trackConversion('herramienta_iniciada', source);
  };
  const complete = () => {
    if (completed) return;
    completed = true;
    trackConversion('herramienta_completada', source);
  };
  window.rnToolLeads ||= {};
  window.rnToolLeads[source] = (options) => submitTrackedLead(options, source);
  const whatsapp = () => trackConversion('whatsapp_clic', source);
  container?.addEventListener('input', start);
  container?.addEventListener('change', start);
  window.addEventListener(`rn:${source}:complete`, complete);
  window.addEventListener(`rn:${source}:whatsapp`, whatsapp);
  return () => {
    container?.removeEventListener('input', start);
    container?.removeEventListener('change', start);
    window.removeEventListener(`rn:${source}:complete`, complete);
    window.removeEventListener(`rn:${source}:whatsapp`, whatsapp);
    delete window.rnToolLeads[source];
  };
}
