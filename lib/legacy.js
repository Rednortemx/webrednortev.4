// Rutas del sitio anterior que Google todavía conoce.
//
// Search Console reportó 537 URLs con incidencias, de las cuales 462 cuelgan
// de /propiedad/. En vez de escribir cientos de redirecciones a mano, aquí se
// resuelven por regla:
//
//   1. Fichas antiguas: la URL trae el código del CRM al final, después de
//      "-id-". Ese código es la llave para encontrar la propiedad actual y
//      mandar a su URL nueva.
//      /propiedad/casa-en-venta/nuevo-leon/monterrey/independencia-id-nn-gzl347
//                                                                  └─ NN-GZL347
//
//   2. Rutas de categoría: no traen código, son listados del sitio viejo
//      (45 en total). Se traducen a la lista de propiedades ya filtrada.
//      /propiedad/bodega-en-renta/nuevo-leon/santa-catarina
//        -> /propiedades?operacion=Renta&tipo=Bodega&zona=Santa Catarina

// Tipos del sitio anterior a los que usa el inventario actual.
const TIPO_LEGACY = {
  casa: 'Casa',
  departamento: 'Depto',
  terreno: 'Terreno',
  local: 'Local',
  oficina: 'Oficina',
  bodega: 'Bodega',
  nave: 'Bodega',      // "nave industrial" es bodega en el inventario actual
  edificio: 'Depto',   // NOCNOK clasifica Building como departamento
};

// El filtro de zona compara por texto contra la zona completa de la
// propiedad, así que aquí van los nombres tal como los escribe el CRM
// (con acentos incluidos).
const MUNICIPIO_LEGACY = {
  'monterrey': 'Monterrey',
  'san-pedro-garza-garcia': 'San Pedro Garza García',
  'san-nicolas-de-los-garza': 'San Nicolás de los Garza',
  'santa-catarina': 'Santa Catarina',
  'general-escobedo': 'General Escobedo',
  'salinas-victoria': 'Salinas Victoria',
  'apodaca': 'Apodaca',
  'guadalupe': 'Guadalupe',
  'garcia': 'García',
  'santiago': 'Santiago',
  'juarez': 'Juárez',
};

// Devuelve el código del CRM de una URL antigua de ficha, o '' si la ruta no
// es una ficha. Lo que distingue a una ficha es el "-id-" antes del código.
export function extractLegacyCode(path) {
  const limpio = String(path || '').replace(/^\/+|\/+$/g, '');
  if (!limpio) return '';

  const conId = limpio.match(/-id-([a-z0-9]+-[a-z0-9]+)$/i);
  if (conId) return conId[1].toUpperCase();

  // Formato corto que usó el sitio nuevo unas semanas: /propiedad/NN-HDU152
  if (!limpio.includes('/') && /^[a-z]{1,4}-[a-z0-9]+$/i.test(limpio)) {
    return limpio.toUpperCase();
  }

  return '';
}

// Traduce una ruta de categoría antigua a la lista filtrada equivalente.
// Devuelve '' si la ruta no sigue ese patrón, para no inventar destinos.
export function legacyCategoryTarget(path) {
  const limpio = String(path || '').replace(/^\/+|\/+$/g, '');
  if (!limpio) return '';

  const partes = limpio.split('/');
  const primera = partes[0] || '';

  // "casa-en-venta", "bodega-en-renta", "terreno-en-venta-y-renta"
  const m = primera.match(/^([a-z]+)-en-(venta-y-renta|renta-y-venta|venta|renta)$/i);
  if (!m) return '';

  const tipo = TIPO_LEGACY[m[1].toLowerCase()];
  if (!tipo) return '';

  const op = m[2].toLowerCase();
  const operacion = op === 'venta' ? 'Venta' : op === 'renta' ? 'Renta' : '';

  // El municipio, cuando viene, es el último segmento; el estado se ignora
  // porque el inventario es de Nuevo León.
  const posibleMunicipio = partes.length > 2 ? partes[partes.length - 1] : '';
  const zona = MUNICIPIO_LEGACY[posibleMunicipio.toLowerCase()] || '';

  const params = new URLSearchParams();
  if (operacion) params.set('operacion', operacion);
  params.set('tipo', tipo);
  if (zona) params.set('zona', zona);

  return `/propiedades?${params.toString()}`;
}

// Rutas fijas del sitio anterior. Se resuelven en middleware.js con un 301
// en un solo salto, sin pasar por el render de Next.
// Las llaves van en minúsculas: el middleware compara así para que /es-MX y
// /es-mx lleguen al mismo lado.
export const REDIRECTS_ESTATICOS = {
  '/home': '/',
  '/privacy': '/aviso-de-privacidad',
  '/contact': '/contacto',
  '/contactanos': '/contacto',
  '/properties': '/propiedades',
  '/nuestrascasas': '/propiedades',
  '/es-mx': '/',
  '/blog': '/insights',
  '/team': '/equipo',
  '/agents': '/equipo',
  '/agentes': '/equipo',
  '/nuestro-equipo': '/equipo',
  '/assets/img/favicon.ico': '/icon',
  // /favorites NO va aquí a propósito: el sitio nuevo no tiene favoritos, y
  // el anexo pide 410/noindex cuando la función se eliminó. Mandarla a
  // /propiedades le diría a Google que se mudó, cuando desapareció.
};
