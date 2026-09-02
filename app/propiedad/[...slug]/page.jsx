import { permanentRedirect, notFound } from 'next/navigation';
import { fetchAllProperties, findPropertyById } from '@/lib/properties';
import { buildPropertySlug } from '@/lib/slug';
import { extractLegacyCode, legacyCategoryTarget } from '@/lib/legacy';

// Todas las URLs viejas que cuelgan de /propiedad/.
//
// Es una ruta catch-all ([...slug]) a propósito: las URLs del sitio anterior
// traen varios segmentos —
// /propiedad/casa-en-venta/nuevo-leon/monterrey/independencia-id-nn-gzl347 —
// y con un solo [slug] no las capturaba, así que Google recibía 404 en las
// 462 fichas que todavía conoce.
//
// Se resuelve por regla, no URL por URL (ver lib/legacy.js):
//   1. Si la URL trae código del CRM, se busca esa propiedad y se manda a su
//      URL actual. La búsqueda no distingue mayúsculas.
//   2. Si es una ruta de categoría antigua, se manda a la lista ya filtrada.
//   3. Si no es ninguna de las dos, o la propiedad ya se retiró, 404.
//
// El redirect apunta SIEMPRE a la URL canónica que genera la app, nunca a una
// armada a mano desde el título viejo, para no encadenar redirecciones.
export default async function LegacyPropiedadRedirect({ params }) {
  const { slug } = await params;
  const ruta = Array.isArray(slug) ? slug.join('/') : String(slug || '');

  const codigo = extractLegacyCode(ruta);
  if (codigo) {
    const { properties } = await fetchAllProperties();
    const property = findPropertyById(properties, codigo);
    if (property) {
      permanentRedirect(`/propiedades/${buildPropertySlug(property)}`);
    }
    // La URL era una ficha, pero esa propiedad ya se retiró. Aquí se corta:
    // mandarla al listado filtrado seria una redireccion enganosa (el
    // visitante pidio UNA propiedad concreta que ya no existe) y le diria a
    // Google que la pagina se mudo, cuando en realidad desaparecio.
    notFound();
  }

  const listado = legacyCategoryTarget(ruta);
  if (listado) {
    permanentRedirect(listado);
  }

  notFound();
}
