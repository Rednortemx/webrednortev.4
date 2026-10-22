// Inventario para Athena, el asistente de IA.
//
// Lee el mismo snapshot que ya usa el sitio (fetchAllProperties, cacheado
// por unstable_cache durante 120 s), así que este canal no le agrega ni una
// llamada a NOCNOK: reparte una copia de lo que ya está en memoria. La llave
// NOCNOK_API_KEY se queda donde está, en Vercel, y nunca sale de aquí.

import { fetchAllProperties } from '@/lib/properties';
import { fetchLuxuryProperties } from '@/lib/luxuryProperties';
import { json, revisarAcceso } from '@/lib/athena';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const FICHA = 'https://www.rednorte.mx/propiedad/';

// El asistente necesita describir y ubicar, no renderizar la ficha completa:
// se queda fuera todo lo pesado (el resto de las fotos, la geolocalización)
// para que la respuesta no cargue megas que nadie va a leer.
function paraAthena(p, esLuxury) {
  return {
    id: p.id,
    // Luxury no es un tipo de propiedad: es una seleccion curada que
    // aprueba el hub de asesores. Sin esta marca, el asistente no puede
    // contestar "cuales son las Luxury" sin inventarselo.
    luxury: esLuxury,
    title: p.title,
    type: p.type,
    category: p.category,
    op: p.op,
    colonia: p.colonia,
    municipio: p.municipio,
    zone: p.zone,
    price: p.price,
    rawPrice: p.rawPrice,
    currency: p.currency,
    rooms: p.rooms,
    baths: p.baths,
    parking: p.parking,
    constructionSize: p.constructionSize,
    lotSize: p.lotSize,
    description: p.description,
    features: p.features,
    img: Array.isArray(p.imgs) && p.imgs.length ? p.imgs[0] : '',
    url: p.id ? FICHA + String(p.id).toLowerCase() : '',
  };
}

export async function GET(req) {
  const cortar = revisarAcceso(req);
  if (cortar) return cortar;

  // Las dos salen de cache compartido, asi que esto no agrega llamadas
  // ni a NOCNOK ni al hub.
  const [{ properties, source }, lujo] = await Promise.all([
    fetchAllProperties(),
    fetchLuxuryProperties(),
  ]);
  const idsLuxury = new Set(
    lujo.properties.map((p) => String(p.id || '').toUpperCase()),
  );

  // 'fallback' significa que NOCNOK no respondió y esto es el puñado de
  // propiedades de respaldo del sitio. Se avisa en la respuesta para que el
  // asistente no presente ocho propiedades como si fueran el catálogo.
  return json({
    actualizado: new Date().toISOString(),
    fuente: source,
    total: properties.length,
    // Si la curacion no respondio, se dice. "No hay Luxury" y "no pude
    // consultar cuales son Luxury" son cosas distintas, y el asistente
    // tiene que poder distinguirlas en vez de afirmar la primera.
    luxury_disponible: lujo.source === 'live',
    luxury_total: lujo.properties.length,
    propiedades: properties.map((p) =>
      paraAthena(p, idsLuxury.has(String(p.id || '').toUpperCase()))),
  }, 200);
}
