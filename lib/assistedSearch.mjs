export function createAssistedSearchForm() {
  return { name: '', phone: '', email: '', zone: '', budget: '', bedrooms: '', detail: '', privacy: false };
}

function formatAmount(value) {
  const amount = Number(String(value ?? '').replace(/[$,\s]/g, ''));
  return Number.isFinite(amount) && amount > 0
    ? new Intl.NumberFormat('es-MX', { maximumFractionDigits: 2 }).format(amount)
    : '';
}

export function assistedSearchPrefill(filters = {}) {
  const minimum = formatAmount(filters.precioMin);
  const maximum = formatAmount(filters.precioMax);
  const bedrooms = String(filters.recamaras || '');
  return {
    zone: String(filters.colonia || '').trim(),
    budget: minimum && maximum ? `De $${minimum} a $${maximum}`
      : maximum ? `Hasta $${maximum}` : minimum ? `Desde $${minimum}` : '',
    bedrooms: /^[1-5]$/.test(bedrooms) ? bedrooms : '',
  };
}

// Refresh filter-derived values when reopening without replacing a visitor's edits.
export function mergeAssistedSearchPrefill(form, filters, editedFields = new Set()) {
  const next = { ...form };
  for (const [field, value] of Object.entries(assistedSearchPrefill(filters))) {
    if (!editedFields.has(field)) next[field] = value;
  }
  return next;
}

export function validateAssistedSearch(form) {
  const errors = {};
  if (String(form.name || '').trim().length < 2) {
    errors.name = 'Escribe tu nombre con al menos dos caracteres.';
  }
  const phone = String(form.phone || '').trim();
  const digits = phone.replace(/\D/g, '');
  if (!/^\+?[\d\s().-]+$/.test(phone) || digits.length < 7 || digits.length > 15) {
    errors.phone = 'Escribe un teléfono válido de 7 a 15 dígitos. Puedes incluir el código de país.';
  }
  const email = String(form.email || '').trim();
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'Revisa el correo electrónico o deja este campo vacío.';
  }
  if (form.privacy !== true) {
    errors.privacy = 'Acepta el aviso para que podamos atender tu solicitud.';
  }
  return errors;
}

export function isAssistedSearchPreview(previewOnly, hostname = '') {
  const host = hostname.toLowerCase();
  return previewOnly === true || host.endsWith('.vercel.app') || host === 'localhost'
    || host.endsWith('.localhost') || host === '127.0.0.1' || host === '[::1]' || host === '::1';
}

export function assistedSearchNotes(form, filters = {}) {
  const minimum = formatAmount(filters.m2Min);
  const maximum = formatAmount(filters.m2Max);
  const surface = minimum && maximum ? `${minimum} a ${maximum} m²`
    : maximum ? `Hasta ${maximum} m²` : minimum ? `Desde ${minimum} m²` : 'Por definir';
  return [
    'Búsqueda asistida: casas en venta en Monterrey',
    `Zona o colonia preferida: ${form.zone.trim() || 'Por definir'}`,
    `Presupuesto: ${form.budget.trim() || 'Por definir'}`,
    `Recámaras mínimas: ${form.bedrooms || 'Indistinto'}`,
    `Baños mínimos: ${Number(filters.banos) > 0 ? filters.banos : 'Indistinto'}`,
    `Superficie buscada: ${surface}`,
    `Requisitos: ${form.detail.trim() || 'Sin requisitos adicionales'}`,
    'Landing: /propiedades/monterrey/casas-en-venta',
  ].join('\n');
}
