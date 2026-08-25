// app/sitemap.js
// Generates /sitemap.xml. Only lists indexable routes — the noindex
// sections (equipo, insights, trabaja-con-nosotros) and their [slug]
// children are intentionally excluded, since they carry
// robots: { index: false } in their own metadata.
import { fetchAllProperties } from '@/lib/properties';
import { buildPropertySlug } from '@/lib/slug';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rednorte.mx';

const STATIC_ROUTES = [
  '',
  '/propiedades',
  '/servicios',
  '/servicios/vender-propiedad',
  '/servicios/rentar-propiedad',
  '/servicios/inversion-inmobiliaria',
  '/servicios/comercial-industrial',
  '/herramientas',
  '/herramientas/estimacion-de-valor',
  '/herramientas/reporte-de-vendibilidad',
  '/nosotros',
  '/contacto',
  '/preguntas-frecuentes',
  '/aviso-de-privacidad',
  '/politica-de-cookies',
  '/terminos-y-condiciones',
];

export default async function sitemap() {
  const staticEntries = STATIC_ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  let propertyEntries = [];
  try {
    const { properties, source } = await fetchAllProperties();
    if (source === 'live') {
      propertyEntries = properties.map((p) => ({
        url: `${SITE_URL}/propiedades/${buildPropertySlug(p)}`,
        lastModified: new Date(),
      }));
    }
  } catch {
    // sin inventario en vivo disponible, el sitemap solo incluye las rutas estáticas
  }

  return [...staticEntries, ...propertyEntries];
}
