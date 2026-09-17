const PROPERTY_TYPE_LABELS = {
  Casa: 'Casa',
  Depto: 'Departamento',
  Terreno: 'Terreno',
  Local: 'Local',
  Oficina: 'Oficina',
  Bodega: 'Bodega',
};

const STATE_NAMES = new Set([
  'nuevo leon',
  'n l',
  'nl',
]);

function normalizeLocationPart(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/gi, ' ')
    .trim()
    .toLowerCase();
}

function uniqueLocationParts(zone) {
  const seen = new Set();

  return String(zone || '')
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean)
    .filter((part) => {
      const normalized = normalizeLocationPart(part);
      if (!normalized || STATE_NAMES.has(normalized) || seen.has(normalized)) return false;
      seen.add(normalized);
      return true;
    });
}

export function getPropertySeoLocation(property) {
  const zoneParts = uniqueLocationParts(property?.zone);
  const municipalityParts = uniqueLocationParts(property?.municipio);
  const municipality = municipalityParts.at(-1) || '';
  const normalizedMunicipality = normalizeLocationPart(municipality);
  const colonia = zoneParts.find(
    (part) => normalizeLocationPart(part) !== normalizedMunicipality,
  );

  return [colonia, municipality || zoneParts[0]]
    .filter(Boolean)
    .filter((part, index, parts) => (
      parts.findIndex(
        (candidate) => normalizeLocationPart(candidate) === normalizeLocationPart(part),
      ) === index
    ))
    .join(', ');
}

export function buildPropertySeoTitle(property) {
  const type = PROPERTY_TYPE_LABELS[property?.type] || property?.type || 'Propiedad';
  const operation = property?.op === 'Renta' ? 'renta' : 'venta';
  const location = getPropertySeoLocation(property);
  const code = String(property?.id || '').trim();

  return [
    `${type} en ${operation}${location ? ` en ${location}` : ''}`,
    code,
  ].filter(Boolean).join(' | ');
}

export function buildPropertyMetaDescription(property) {
  const title = buildPropertySeoTitle(property).split(' | ')[0];
  const price = String(property?.price || '').trim();
  const code = String(property?.id || '').trim();
  const priceText = price ? ` por ${price}` : '';
  const reference = code ? ` Referencia ${code}.` : '';
  const suffix = ` Consulta fotos, características y disponibilidad.${reference}`;
  const fullDescription = `${title}${priceText}.${suffix}`;

  if (fullDescription.length <= 160) return fullDescription;

  const descriptionWithoutPrice = `${title}.${suffix}`;
  if (descriptionWithoutPrice.length <= 160) return descriptionWithoutPrice;

  const availableTitleLength = Math.max(1, 160 - suffix.length - 2);
  return `${title.slice(0, availableTitleLength).trimEnd()}….${suffix}`;
}
