const PILOT_PATH = '/propiedades/monterrey/casas-en-venta';
const SORTS = new Set(['recientes', 'precio-asc', 'precio-desc']);
const EXTRA_KEYS = ['colonia', 'precioMin', 'precioMax', 'recamaras', 'banos', 'm2Min', 'm2Max'];
const ATTRIBUTION_KEYS = new Set([
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id',
  'utm_source_platform', 'utm_creative_format', 'utm_marketing_tactic',
  'gclid', 'gbraid', 'wbraid',
]);

function scalar(input, key, fallback = '') {
  const value = typeof input?.get === 'function' ? input.get(key) : input?.[key];
  return String((Array.isArray(value) ? value[0] : value) ?? fallback).trim();
}

function textKey(value) {
  return String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase();
}

function amount(value) {
  const text = String(value ?? '').trim();
  if (!text || !/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(text)) return null;
  const number = Number(text.replaceAll(',', ''));
  return Number.isFinite(number) ? number : null;
}

function numericText(value) {
  const parsed = amount(value);
  return parsed === null ? value : String(parsed);
}

/** The segment belongs to the URL and cannot be changed through query parameters. */
export function normalizePilotFilters(input = {}) {
  const page = Number(scalar(input, 'page', '1'));
  const sort = scalar(input, 'sort', 'recientes');
  return {
    operacion: 'Venta',
    tipo: 'Casa',
    zona: 'Monterrey',
    colonia: scalar(input, 'colonia').slice(0, 120),
    precioMin: numericText(scalar(input, 'precioMin')),
    precioMax: numericText(scalar(input, 'precioMax')),
    recamaras: scalar(input, 'recamaras', '0') || '0',
    banos: scalar(input, 'banos', '0') || '0',
    m2Min: numericText(scalar(input, 'm2Min')),
    m2Max: numericText(scalar(input, 'm2Max')),
    sort: SORTS.has(sort) ? sort : 'recientes',
    page: Number.isSafeInteger(page) && page > 0 ? page : 1,
  };
}

export function validatePilotFilters(input = {}) {
  const filters = normalizePilotFilters(input);
  const errors = {};
  for (const key of ['precioMin', 'precioMax', 'm2Min', 'm2Max']) {
    if (filters[key] && amount(filters[key]) === null) {
      errors[key] = 'Escribe un número válido, sin signos ni letras.';
    }
  }
  for (const [min, max, label] of [
    ['precioMin', 'precioMax', 'El presupuesto máximo'],
    ['m2Min', 'm2Max', 'La superficie máxima'],
  ]) {
    if (filters[min] && filters[max] && !errors[min] && !errors[max]
      && amount(filters[min]) > amount(filters[max])) {
      errors[max] = `${label} debe ser igual o mayor al mínimo.`;
    }
  }
  for (const key of ['recamaras', 'banos']) {
    if (!/^\d+$/.test(filters[key]) || Number(filters[key]) > 99) {
      errors[key] = 'Selecciona una cantidad válida.';
    }
  }
  return { valid: Object.keys(errors).length === 0, errors };
}

function comparablePrice(property) {
  const price = Number(property.rawPrice);
  const currency = String(property.currency || 'MXN').trim().toUpperCase();
  return Number.isFinite(price) && price > 0 && currency === 'MXN' ? price : null;
}

/** Accepts mapped NocNok properties or their compact card representation. */
export function filterPilotProperties(properties, input = {}) {
  const filters = normalizePilotFilters(input);
  if (!validatePilotFilters(filters).valid) return [];
  const minPrice = amount(filters.precioMin);
  const maxPrice = amount(filters.precioMax);
  const minSurface = amount(filters.m2Min);
  const maxSurface = amount(filters.m2Max);
  const hasPrice = minPrice !== null || maxPrice !== null;
  const hasSurface = minSurface !== null || maxSurface !== null;
  const filtered = properties.filter((property) => {
    if (property.type !== 'Casa' || property.op !== 'Venta'
      || textKey(property.municipio) !== 'monterrey') return false;
    if (filters.colonia && textKey(property.settlement) !== textKey(filters.colonia)) return false;
    const price = comparablePrice(property);
    if (hasPrice && (price === null || (minPrice !== null && price < minPrice)
      || (maxPrice !== null && price > maxPrice))) return false;
    const rooms = Number(property.rooms) || 0;
    const baths = Number(property.baths) || 0;
    if (rooms < Number(filters.recamaras) || baths < Number(filters.banos)) return false;
    // Construction and land measure different things; never substitute lotSize here.
    const surface = Number(property.constructionSize);
    if (hasSurface && (!Number.isFinite(surface) || surface <= 0
      || (minSurface !== null && surface < minSurface)
      || (maxSurface !== null && surface > maxSurface))) return false;
    return true;
  });
  if (filters.sort === 'recientes') return filtered;
  const direction = filters.sort === 'precio-asc' ? 1 : -1;
  return filtered.sort((left, right) => {
    const a = comparablePrice(left);
    const b = comparablePrice(right);
    if (a === null) return b === null ? 0 : 1;
    if (b === null) return -1;
    return (a - b) * direction;
  });
}

function queryEntries(input) {
  if (typeof input === 'string') return new URLSearchParams(input).entries();
  if (input && typeof input.entries === 'function') return input.entries();
  return Object.entries(input || {}).map(([key, value]) => [key, Array.isArray(value) ? value[0] : value]);
}

/** Copies only search criteria and known attribution keys; never arbitrary form/contact parameters. */
export function buildPilotSearchHref({ basePath = PILOT_PATH, filters = {}, page = 1, searchParams } = {}) {
  const normalized = normalizePilotFilters({ ...filters, page });
  const params = new URLSearchParams();
  for (const [key, rawValue] of queryEntries(searchParams)) {
    const value = String(rawValue ?? '').trim();
    if (ATTRIBUTION_KEYS.has(key) && value && value.length <= 256
      && !/[@\u0000-\u001f\u007f]/.test(value)) params.set(key, value);
  }
  for (const key of EXTRA_KEYS) {
    const value = normalized[key];
    if (value && !(['recamaras', 'banos'].includes(key) && value === '0')) params.set(key, value);
  }
  if (normalized.sort !== 'recientes') params.set('sort', normalized.sort);
  if (normalized.page > 1) params.set('page', String(normalized.page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}
