const TYPE_LABELS = {
  Casa: { singular: 'casa', plural: 'casas' },
  Depto: { singular: 'departamento', plural: 'departamentos' },
  Oficina: { singular: 'oficina', plural: 'oficinas' },
  Local: { singular: 'local', plural: 'locales' },
  Terreno: { singular: 'terreno', plural: 'terrenos' },
  Bodega: { singular: 'bodega', plural: 'bodegas' },
};

const DEFINITIONS = [
  ['monterrey', 'Monterrey', 'departamentos-en-renta', 'Depto', 'Renta'],
  ['monterrey', 'Monterrey', 'casas-en-venta', 'Casa', 'Venta'],
  ['monterrey', 'Monterrey', 'departamentos-en-venta', 'Depto', 'Venta'],
  ['monterrey', 'Monterrey', 'oficinas-en-renta', 'Oficina', 'Renta'],
  ['santiago', 'Santiago', 'casas-en-venta', 'Casa', 'Venta'],
  ['monterrey', 'Monterrey', 'locales-en-renta', 'Local', 'Renta'],
  ['apodaca', 'Apodaca', 'casas-en-renta', 'Casa', 'Renta'],
  ['monterrey', 'Monterrey', 'terrenos-en-venta', 'Terreno', 'Venta'],
  ['san-pedro-garza-garcia', 'San Pedro Garza García', 'locales-en-renta', 'Local', 'Renta'],
  ['san-pedro-garza-garcia', 'San Pedro Garza García', 'departamentos-en-renta', 'Depto', 'Renta'],
  ['monterrey', 'Monterrey', 'casas-en-renta', 'Casa', 'Renta'],
  ['apodaca', 'Apodaca', 'casas-en-venta', 'Casa', 'Venta'],
  ['santiago', 'Santiago', 'terrenos-en-venta', 'Terreno', 'Venta'],
  ['santa-catarina', 'Santa Catarina', 'departamentos-en-renta', 'Depto', 'Renta'],
  ['santa-catarina', 'Santa Catarina', 'bodegas-en-renta', 'Bodega', 'Renta'],
];

function createLanding([municipalitySlug, municipality, categorySlug, type, operation]) {
  const labels = TYPE_LABELS[type];
  const operationLower = operation.toLowerCase();
  const heading = `${capitalize(labels.plural)} en ${operationLower} en ${municipality}`;
  const path = `/propiedades/${municipalitySlug}/${categorySlug}`;

  return {
    municipalitySlug,
    municipality,
    categorySlug,
    type,
    typeSingular: labels.singular,
    typePlural: labels.plural,
    operation,
    operationLower,
    heading,
    path,
    description: `Explora ${labels.plural} en ${operationLower} en ${municipality}, Nuevo León. Compara ubicación, precio, superficie y características en el inventario inmobiliario de Rednorte.`,
  };
}

function capitalize(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function normalize(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

export const PROPERTY_LANDING_PAGES = DEFINITIONS.map(createLanding);

export function findPropertyLandingPage(municipalitySlug, categorySlug) {
  return PROPERTY_LANDING_PAGES.find(
    (landing) => landing.municipalitySlug === municipalitySlug && landing.categorySlug === categorySlug,
  );
}

export function propertyMatchesLanding(property, landing) {
  return property.type === landing.type
    && property.op === landing.operation
    && normalize(property.municipio) === normalize(landing.municipality);
}

export function getRelatedPropertyLandings(current, limit = 6) {
  return PROPERTY_LANDING_PAGES
    .filter((landing) => landing.path !== current.path)
    .sort((a, b) => {
      const scoreA = Number(a.municipality === current.municipality) * 2
        + Number(a.type === current.type)
        + Number(a.operation === current.operation);
      const scoreB = Number(b.municipality === current.municipality) * 2
        + Number(b.type === current.type)
        + Number(b.operation === current.operation);
      return scoreB - scoreA;
    })
    .slice(0, limit);
}

export function getLandingNeighborhoods(properties, landing, limit = 8) {
  const municipality = normalize(landing.municipality);
  const stateNames = new Set(['nuevo leon', 'nuevo león', 'n.l.', 'nl']);

  return [...new Set(
    properties
      .filter((property) => propertyMatchesLanding(property, landing))
      .map((property) => String(property.zone || '').split(',')[0].trim())
      .filter((zone) => zone && normalize(zone) !== municipality && !stateNames.has(zone.toLowerCase())),
  )].slice(0, limit);
}
