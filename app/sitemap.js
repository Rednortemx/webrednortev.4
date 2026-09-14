// app/sitemap.js
// Generates /sitemap.xml. Only lists indexable routes. Dynamic team,
// Insight and property URLs are generated from their canonical data sources.
import { fetchAllProperties } from '@/lib/properties';
import { buildPropertySlug } from '@/lib/slug';
import { teamMembers } from '@/lib/teamMembers';
import { getPublishedInsights } from '@/lib/insights';
import { getCanonicalSiteUrl } from '@/lib/security';

const SITE_URL = getCanonicalSiteUrl();

const STATIC_ROUTES = [
  '',
  '/propiedades',
  '/servicios',
  '/servicios/vender-propiedad',
  '/servicios/comprar-propiedad',
  '/servicios/rentar-propiedad',
  '/servicios/inversion-inmobiliaria',
  '/servicios/estimacion-de-valor',
  '/servicios/inmobiliaria-comercial',
  '/servicios/inmobiliaria-industrial',
  '/servicios/clientes-extranjeros',
  '/servicios/master-broker',
  '/herramientas',
  '/herramientas/estimacion-de-valor',
  '/herramientas/reporte-de-vendibilidad',
  '/insights',
  '/reportes',
  '/reportes/mercado-inmobiliario-monterrey-nuevo-leon-2026',
  '/nosotros',
  '/nosotros/canaco-monterrey',
  '/equipo',
  '/contacto',
  '/preguntas-frecuentes',
  '/aviso-de-privacidad',
  '/politica-de-cookies',
  '/terminos-y-condiciones',
];

export default async function sitemap() {
  // No enviamos lastModified porque hoy no existe una fecha fiable por URL.
  // Usar la hora de cada solicitud haría parecer que las 584 páginas cambiaron
  // continuamente, aunque su contenido siga igual.
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
  }));

  const teamEntries = teamMembers.map((member) => ({
    url: `${SITE_URL}/equipo/${member.slug}`,
  }));

  const insightEntries = getPublishedInsights().map((insight) => ({
    url: `${SITE_URL}/insights/${insight.slug}`,
    lastModified: insight.updatedAt,
  }));

  let propertyEntries = [];
  try {
    const { properties, source } = await fetchAllProperties();
    if (source === 'live') {
      propertyEntries = properties.map((p) => ({
        url: `${SITE_URL}/propiedades/${buildPropertySlug(p)}`,
      }));
    }
  } catch {
    // sin inventario en vivo disponible, el sitemap solo incluye las rutas estáticas
  }

  return [...staticEntries, ...teamEntries, ...insightEntries, ...propertyEntries];
}
