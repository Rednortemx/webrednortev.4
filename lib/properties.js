// lib/properties.js
// Property inventory data layer, ported from the legacy index.html inline
// script (fallbackProperties, mapNocnokProperty, fetchLiveProperties).
// Runs server-side now (Server Components / route handlers) instead of in
// the browser, calling NOCNOK directly with the private API key, and always
// falling back to a small static list if NOCNOK is unavailable — this is
// expected in the migration sandbox, which has no NOCNOK_API_KEY.

export const fallbackProperties = [
  {
    id: 'RN-1482', title: 'Casa residencial', type: 'Casa', op: 'Venta',
    zone: 'San Pedro Garza García', price: '$6,500,000',
    rooms: 4, baths: 3.5, parking: 2, icon: '',
    imgs: [],
  },
  {
    id: 'RN-2034', title: 'Departamento moderno', type: 'Depto', op: 'Renta',
    zone: 'Valle Oriente, Monterrey', price: '$18,000/mes',
    rooms: 2, baths: 2, parking: 1, icon: '',
    imgs: [],
  },
  {
    id: 'RN-0891', title: 'Casa en coto privado', type: 'Casa', op: 'Venta',
    zone: 'Cumbres, Monterrey', price: '$4,200,000',
    rooms: 3, baths: 2.5, parking: 2, icon: '',
    imgs: [],
  },
  {
    id: 'RN-3310', title: 'Local comercial PB', type: 'Local', op: 'Renta',
    zone: 'San Nicolás de los Garza', price: '$22,000/mes',
    rooms: 0, baths: 1, parking: 3, icon: '',
    imgs: [],
  },
  {
    id: 'RN-1755', title: 'Bodega industrial', type: 'Bodega', op: 'Venta',
    zone: 'Apodaca, N.L.', price: '$12,000,000',
    rooms: 0, baths: 2, parking: 10, icon: '',
    imgs: [],
  },
  {
    id: 'RN-2298', title: 'Departamento de lujo', type: 'Depto', op: 'Venta',
    zone: 'San Pedro Garza García', price: '$9,800,000',
    rooms: 3, baths: 3, parking: 2, icon: '',
    imgs: [],
  },
];

const FALLBACK_TYPE_TO_CATEGORY = { Casa: 'Residencial', Depto: 'Residencial', Terreno: 'Residencial', Local: 'Comercial', Oficina: 'Comercial', Bodega: 'Industrial' };
fallbackProperties.forEach((p) => {
  if (p.category === undefined) p.category = FALLBACK_TYPE_TO_CATEGORY[p.type] || 'Residencial';
  if (p.rawPrice === undefined) p.rawPrice = parseFloat(String(p.price).replace(/[^\d.]/g, '')) || 0;
  if (p.constructionSize === undefined) p.constructionSize = 0;
  if (p.lotSize === undefined) p.lotSize = 0;
  if (p.municipio === undefined) p.municipio = p.zone || '';
  if (p.features === undefined) p.features = [];
  if (p.description === undefined) p.description = '';
  // Las propiedades de respaldo no tienen coordenadas; el mapa cae a
  // buscar por texto la zona.
  if (p.lat === undefined) p.lat = null;
  if (p.lng === undefined) p.lng = null;
});

const NOCNOK_TYPE_TO_LOCAL = {
  House: 'Casa', Apartment: 'Depto', Land: 'Terreno', Ranch: 'Casa', CountryHouse: 'Casa',
  Warehouse: 'Bodega', Shop: 'Local', MedicalOffice: 'Oficina', Office: 'Oficina',
  Building: 'Depto', Hotel: 'Local', IndustrialWarehouse: 'Bodega',
};
const NOCNOK_CATEGORY_TO_LOCAL = { Habitational: 'Residencial', Commercial: 'Comercial', Industrial: 'Industrial' };

// NOCNOK entrega las amenidades como códigos en inglés ("AirConditioner",
// "Pool"), y antes se pintaban tal cual en la ficha. Aquí se traducen al
// español. Si el CRM agrega una amenidad nueva que no esté en esta lista,
// translateFeature la separa en palabras para que al menos se lea bien
// ("SomeNewThing" -> "Some New Thing") en vez de salir pegada.
const NOCNOK_FEATURE_TO_LOCAL = {
  AirConditioner: 'Aire acondicionado',
  Balcony: 'Balcón',
  Ballroom: 'Salón de eventos',
  CCTV: 'Circuito cerrado (CCTV)',
  Cistern: 'Cisterna',
  ClosedAreaMall: 'Plaza comercial cerrada',
  ClubHouse: 'Casa club',
  CoveredParking: 'Estacionamiento techado',
  DisabledAccess: 'Acceso para personas con discapacidad',
  DoorMan: 'Portero',
  Elevator: 'Elevador',
  EquippedKitchen: 'Cocina equipada',
  EvaporativeCooler: 'Enfriador evaporativo',
  ExerciseRoom: 'Gimnasio',
  Furnished: 'Amueblado',
  GameArea: 'Área de juegos',
  Garage: 'Cochera',
  Garden: 'Jardín',
  GatedCommunity: 'Coto privado',
  Grill: 'Asador',
  GroundFloorBedroom: 'Recámara en planta baja',
  Heater: 'Calentador',
  HydroPneumaticSystem: 'Sistema hidroneumático',
  IndustrialPark: 'Parque industrial',
  IntegralKitchen: 'Cocina integral',
  Internet: 'Internet',
  IrrigationSystem: 'Sistema de riego',
  IsolatedRoof: 'Techo aislado',
  Jacuzzi: 'Jacuzzi',
  LaundryRoom: 'Cuarto de lavado',
  Library: 'Biblioteca',
  MaidRoom: 'Cuarto de servicio',
  ManeuveringArea: 'Área de maniobras',
  MetalSheetRoof: 'Techo de lámina',
  MetalicGate: 'Portón metálico',
  MovieTheater: 'Sala de cine',
  NaturalGas: 'Gas natural',
  NoPetsAllowed: 'No se aceptan mascotas',
  NoSmokingAllowed: 'No se permite fumar',
  OpenAreaMall: 'Plaza comercial abierta',
  Patio: 'Patio',
  PetsAllowed: 'Se aceptan mascotas',
  Pool: 'Alberca',
  PowerPlant: 'Planta de luz',
  Ramp: 'Rampa',
  ReinforcedFloor: 'Piso reforzado',
  RoofGarden: 'Roof garden',
  SecuritySystem: 'Sistema de seguridad',
  SeniorAccessibility: 'Accesibilidad para adultos mayores',
  SmokingAllowed: 'Se permite fumar',
  SolarPanels: 'Paneles solares',
  Spa: 'Spa',
  StorageRoom: 'Bodega',
  StudyRoom: 'Estudio',
  TVRoom: 'Sala de TV',
  Telephone: 'Teléfono',
  TennisCourt: 'Cancha de tenis',
  Terrace: 'Terraza',
  ToyLibrary: 'Ludoteca',
  Transformer: 'Transformador',
  TruckAccess: 'Acceso para camiones',
  Vigilance: 'Vigilancia',
  WeightScale: 'Báscula',
};

export function translateFeature(code) {
  if (!code) return '';
  const known = NOCNOK_FEATURE_TO_LOCAL[code];
  if (known) return known;
  return String(code).replace(/([a-z0-9])([A-Z])/g, '$1 $2');
}

export function mapNocnokProperty(p) {
  const isRenta = !!p.isRent && !p.isSale;
  const priceNum = isRenta ? p.rentPrice : p.salePrice;
  const priceText = priceNum != null
    ? '$' + Math.round(priceNum).toLocaleString('es-MX') + (isRenta ? '/mes' : '')
    : (p.salePriceText || p.rentPriceText || 'Precio a consultar');
  const zoneParts = [p.settlement, p.municipality || p.county, p.state].filter(Boolean);
  return {
    id: p.code,
    title: p.title || (NOCNOK_TYPE_TO_LOCAL[p.type] || 'Propiedad'),
    type: NOCNOK_TYPE_TO_LOCAL[p.type] || 'Casa',
    category: NOCNOK_CATEGORY_TO_LOCAL[p.category] || 'Residencial',
    op: isRenta ? 'Renta' : 'Venta',
    zone: zoneParts.join(', ') || 'Nuevo León',
    price: priceText,
    rawPrice: priceNum || 0,
    rooms: p.bedrooms || 0,
    baths: p.bathrooms || 0,
    parking: p.parkingSpaces || 0,
    icon: '',
    imgs: p.pictureUrls || [],
    description: p.description || '',
    constructionSize: p.constructionSize || 0,
    lotSize: p.lotSize || 0,
    municipio: p.municipality || p.county || '',
    features: (p.features || []).map(translateFeature),
    // NOCNOK guarda el punto exacto en geolocation; unas pocas propiedades
    // no traen el campo, y en esas el mapa cae a buscar la zona por texto.
    lat: Number.isFinite(p.geolocation?.lat) ? p.geolocation.lat : null,
    lng: Number.isFinite(p.geolocation?.lon) ? p.geolocation.lon : null,
  };
}

/**
 * Fetches the full live inventory from NOCNOK (looping pages, same as the
 * legacy fetchLiveProperties), falling back to the small static list on any
 * error — including the expected 401/network failure in this sandbox, which
 * has no NOCNOK_API_KEY configured.
 */
export async function fetchAllProperties() {
  const apiKey = process.env.NOCNOK_API_KEY;
  if (!apiKey) {
    return { properties: fallbackProperties, source: 'fallback' };
  }

  try {
    let allItems = [];
    let pageNumber = 1;
    const pageSize = 100;
    let totalPages = 1;
    const MAX_PAGES = 10;

    do {
      const res = await fetch('https://api.nocnok.com/v1/sites/properties/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey },
        body: JSON.stringify({ pageNumber, pageSize, sortBy: 'CreatedAt', sortDirection: 'Descending' }),
        next: { revalidate: 120 },
      });
      if (!res.ok) throw new Error('Respuesta no válida de NOCNOK: ' + res.status);
      const json = await res.json();
      const data = json && json.data;
      if (!data) throw new Error('Respuesta sin datos');
      allItems = allItems.concat(data.items || []);
      totalPages = data.pageCount || 1;
      pageNumber++;
    } while (pageNumber <= totalPages && pageNumber <= MAX_PAGES);

    if (allItems.length === 0) throw new Error('Sin propiedades en la respuesta');
    return { properties: allItems.map(mapNocnokProperty), source: 'live' };
  } catch (err) {
    console.warn('No se pudo cargar el inventario en vivo desde NOCNOK, usando datos de respaldo.', err);
    return { properties: fallbackProperties, source: 'fallback' };
  }
}

export function findPropertyById(properties, id) {
  if (!id) return null;
  const upper = String(id).toUpperCase();
  return properties.find((p) => String(p.id).toUpperCase() === upper) || null;
}
