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

const AREA_DEFINITIONS = [
  {
    kind: 'area',
    municipalitySlug: 'san-pedro-garza-garcia',
    municipality: 'San Pedro Garza García',
    categorySlug: 'valle-oriente',
    areaName: 'Valle Oriente',
    settlements: ['Zona Valle Oriente', 'Del Valle Oriente'],
    heading: 'Propiedades en Valle Oriente, San Pedro Garza García',
    path: '/propiedades/san-pedro-garza-garcia/valle-oriente',
    seoTitle: 'Propiedades en Valle Oriente, San Pedro Garza García | Rednorte',
    description: 'Propiedades en venta y renta en Valle Oriente, San Pedro Garza García. Consulta departamentos, oficinas, casas y otros inmuebles disponibles con Rednorte.',
    heroCopy: 'Consulta propiedades actualmente disponibles en Valle Oriente, San Pedro Garza García. Explora opciones en venta y renta, compara tipos de inmueble, precios, superficies y características. El inventario se actualiza conforme las propiedades entran o salen del mercado.',
    paginationDescription: (page) => `Explora la página ${page} de propiedades en venta y renta en Valle Oriente, San Pedro Garza García. Compara tipos de inmueble, precios y características.`,
    fixedLocationLabel: 'Valle Oriente, San Pedro Garza García',
    servicePath: '/servicios',
    relatedPaths: [
      '/propiedades/san-pedro-garza-garcia/departamentos-en-renta',
      '/propiedades/san-pedro-garza-garcia/locales-en-renta',
    ],
    editorial: {
      title: 'Bienes raíces en Valle Oriente',
      copy: 'Valle Oriente combina vivienda vertical, oficinas, comercios y servicios dentro de uno de los corredores inmobiliarios más activos de San Pedro Garza García. La oferta disponible puede variar de forma importante según tipo de inmueble, superficie, torre, equipamiento y operación.',
      links: [
        {
          prefix: 'Consulta',
          anchor: 'cuánto cuesta rentar un departamento en San Pedro Garza García',
          href: '/insights/cuanto-cuesta-rentar-departamento-san-pedro',
          suffix: '.',
        },
        {
          prefix: 'Explora también',
          anchor: 'departamentos en renta en San Pedro Garza García',
          href: '/propiedades/san-pedro-garza-garcia/departamentos-en-renta',
          suffix: '.',
        },
      ],
    },
  },
];

const LANDING_OVERRIDES = {
  '/propiedades/monterrey/oficinas-en-renta': {
    seoTitle: 'Oficinas en renta en Monterrey, Nuevo León | Rednorte',
    description: 'Oficinas en renta en Monterrey, Nuevo León. Consulta espacios corporativos, ubicaciones, superficies, precios y características con Rednorte.',
    heroCopy: 'Consulta oficinas en renta actualmente disponibles en Monterrey, Nuevo León. Compara ubicaciones, superficies, precios, estacionamiento, equipamiento y características de espacios corporativos. El inventario de Rednorte se actualiza conforme las propiedades entran o salen del mercado.',
    servicePath: '/servicios/inmobiliaria-comercial',
    serviceCta: 'Quiero encontrar una oficina',
    relatedPaths: ['/propiedades/monterrey/locales-en-renta'],
    editorial: {
      title: 'Renta de oficinas en Monterrey',
      copy: 'El mercado de oficinas en Monterrey incluye espacios con perfiles muy distintos: desde oficinas pequeñas hasta pisos completos dentro de edificios corporativos. La renta puede variar de forma importante según ubicación, superficie, estado de entrega, estacionamiento, mantenimiento, equipamiento y características del edificio.',
      paragraphs: [
        'Antes de comparar dos oficinas conviene revisar si el precio publicado corresponde a una renta total o a una tarifa por metro cuadrado, y si conceptos como mantenimiento, IVA, estacionamiento o adecuaciones se cobran por separado.',
      ],
      links: [
        {
          prefix: 'Si buscas apoyo para localizar, comparar o negociar un espacio para tu empresa, conoce la',
          anchor: 'asesoría inmobiliaria comercial en Monterrey',
          href: '/servicios/inmobiliaria-comercial',
          suffix: ' de Rednorte.',
        },
      ],
    },
  },
  '/propiedades/apodaca/casas-en-venta': {
    seoTitle: 'Casas en venta en Apodaca, Nuevo León | Rednorte',
    description: 'Casas en venta en Apodaca, Nuevo León. Consulta inventario actualizado, precios, fraccionamientos, superficies y características con Rednorte.',
    heroCopy: 'Consulta casas en venta actualmente disponibles en Apodaca, Nuevo León. Compara precios, fraccionamientos, superficies, recámaras y características. El inventario de Rednorte se actualiza conforme las propiedades entran o salen del mercado.',
    serviceCta: 'Quiero comprar una propiedad',
    editorial: {
      title: 'Precios de casas en venta en Apodaca',
      copy: 'El inventario vigente permite comparar propiedades actualmente disponibles. Para entender el mercado completo, Rednorte analiza por separado precios publicados, rangos, recámaras, superficies y precio por metro cuadrado en Apodaca.',
      linkAnchor: 'cuánto cuesta comprar una casa en Apodaca',
      linkHref: '/insights/cuanto-cuesta-comprar-casa-apodaca',
      linkAfter: 'Consulta la metodología, fuentes y limitaciones del estudio antes de comparar una propiedad específica.',
    },
  },
  '/propiedades/san-pedro-garza-garcia/departamentos-en-renta': {
    seoTitle: 'Departamentos en renta en San Pedro Garza García | Rednorte',
    description: 'Departamentos en renta en San Pedro Garza García, Nuevo León. Consulta inventario actualizado, precios, zonas, superficies y características con Rednorte.',
    heroCopy: 'Consulta departamentos en renta actualmente disponibles en San Pedro Garza García. Compara precios, zonas, superficies, recámaras y características. El inventario de Rednorte se actualiza conforme las propiedades entran o salen del mercado.',
    editorial: {
      title: 'Renta de departamentos en San Pedro Garza García',
      copy: 'San Pedro Garza García reúne departamentos con perfiles muy distintos: desde unidades de una recámara hasta departamentos familiares y propiedades de alto ticket. El precio puede variar de forma importante según zona, superficie, número de recámaras, equipamiento, amenidades y si el mantenimiento está incluido.',
      linkAnchor: 'cuánto cuesta rentar un departamento en San Pedro Garza García',
      linkHref: '/insights/cuanto-cuesta-rentar-departamento-san-pedro',
      linkAfter: 'En ese análisis Rednorte compara publicaciones observadas por recámaras, zonas y precio por metro cuadrado.',
    },
  },
};

function createLanding([municipalitySlug, municipality, categorySlug, type, operation]) {
  const labels = TYPE_LABELS[type];
  const operationLower = operation.toLowerCase();
  const heading = `${capitalize(labels.plural)} en ${operationLower} en ${municipality}`;
  const path = `/propiedades/${municipalitySlug}/${categorySlug}`;

  return {
    kind: 'segment',
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
    ...LANDING_OVERRIDES[path],
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

export const AREA_PROPERTY_LANDING_PAGES = AREA_DEFINITIONS;
export const PROPERTY_LANDING_PAGES = [...DEFINITIONS.map(createLanding), ...AREA_PROPERTY_LANDING_PAGES];

export function findPropertyLandingPage(municipalitySlug, categorySlug) {
  return PROPERTY_LANDING_PAGES.find(
    (landing) => landing.municipalitySlug === municipalitySlug && landing.categorySlug === categorySlug,
  );
}

export function propertyMatchesLanding(property, landing) {
  if (landing.kind === 'area') {
    const allowedSettlements = new Set(landing.settlements.map(normalize));
    return normalize(property.municipio) === normalize(landing.municipality)
      && allowedSettlements.has(normalize(property.settlement));
  }

  return property.type === landing.type
    && property.op === landing.operation
    && normalize(property.municipio) === normalize(landing.municipality);
}

export function findLandingForProperty(property) {
  return PROPERTY_LANDING_PAGES.find(
    (landing) => landing.kind === 'segment' && propertyMatchesLanding(property, landing),
  );
}

export function getLandingsForProperty(property, limit = 2) {
  const segment = findLandingForProperty(property);
  const area = PROPERTY_LANDING_PAGES.find(
    (landing) => landing.kind === 'area' && propertyMatchesLanding(property, landing),
  );

  return [segment, area].filter(Boolean).slice(0, limit);
}

export function getRelatedPropertyLandings(current, limit = 6) {
  const candidates = PROPERTY_LANDING_PAGES
    .filter((landing) => landing.path !== current.path
      && (current.kind === 'area' || landing.kind === 'segment'))
    .sort((a, b) => {
      const scoreA = Number(a.municipality === current.municipality) * 2
        + Number(a.type === current.type)
        + Number(a.operation === current.operation);
      const scoreB = Number(b.municipality === current.municipality) * 2
        + Number(b.type === current.type)
        + Number(b.operation === current.operation);
      return scoreB - scoreA;
    });

  if (!current.relatedPaths?.length) return candidates.slice(0, limit);

  const priority = new Map(current.relatedPaths.map((path, index) => [path, index]));
  return candidates
    .sort((a, b) => (priority.get(a.path) ?? Number.MAX_SAFE_INTEGER)
      - (priority.get(b.path) ?? Number.MAX_SAFE_INTEGER))
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
