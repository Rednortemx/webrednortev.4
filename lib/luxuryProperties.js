import { unstable_cache } from 'next/cache';
import { fetchAllProperties } from '@/lib/properties';

const DEFAULT_CURATION_URL =
  'https://rednorte-advisor-hub.lovable.app/api/public/properties/luxury';

function normalizedId(value) {
  return typeof value === 'string' ? value.trim().toUpperCase() : '';
}

export function selectLuxuryProperties(properties, propertyIds) {
  const inventory = new Map(
    (Array.isArray(properties) ? properties : []).map((property) => [
      normalizedId(property?.id),
      property,
    ]),
  );

  return (Array.isArray(propertyIds) ? propertyIds : [])
    .map((id) => inventory.get(normalizedId(id)))
    .filter(Boolean);
}

const fetchApprovedLuxuryIds = unstable_cache(
  async () => {
    const endpoint = process.env.LUXURY_CURATION_URL || DEFAULT_CURATION_URL;
    const response = await fetch(endpoint, {
      headers: { accept: 'application/json' },
      cache: 'no-store',
      signal: AbortSignal.timeout(8_000),
    });

    if (!response.ok) throw new Error(`Curación Luxury no disponible: ${response.status}`);

    const payload = await response.json();
    if (!payload?.available || !Array.isArray(payload.propertyIds)) {
      throw new Error('Respuesta inválida de curación Luxury');
    }

    const propertyIds = [...new Set(payload.propertyIds.map(normalizedId).filter(Boolean))];
    if (payload.count !== propertyIds.length) {
      throw new Error('Conteo inconsistente de curación Luxury');
    }
    return propertyIds;
  },
  ['rednorte-public-luxury-selection-v1'],
  { revalidate: 300 },
);

export async function fetchLuxuryProperties() {
  try {
    const [{ properties, source }, propertyIds] = await Promise.all([
      fetchAllProperties(),
      fetchApprovedLuxuryIds(),
    ]);

    if (source !== 'live') {
      return { properties: [], source: 'unavailable', approvedCount: propertyIds.length };
    }

    return {
      properties: selectLuxuryProperties(properties, propertyIds),
      source: 'live',
      approvedCount: propertyIds.length,
    };
  } catch (error) {
    console.warn(
      JSON.stringify({
        event: 'luxury_catalog_unavailable',
        message: error instanceof Error ? error.message : 'Error desconocido',
      }),
    );
    return { properties: [], source: 'unavailable', approvedCount: 0 };
  }
}
