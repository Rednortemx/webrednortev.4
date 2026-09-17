import Breadcrumb from '@/components/Breadcrumb';
import PropertyFilters from '@/components/PropertyFilters';
import PropertyLandingDirectory from '@/components/PropertyLandingDirectory';
import { fetchAllProperties, toPropertyCardData } from '@/lib/properties';

// Canonical is self-referencing per page (page 1 -> /propiedades, page N ->
// /propiedades?page=N) instead of always pointing back at page 1. A fixed
// canonical across every page would tell Google every paginated URL is a
// duplicate of page 1, which defeats the point of the real <a href>
// pagination links in PropertyFilters.jsx — those exist so Googlebot can
// actually reach the ~980 listings that live past page 1.
//
// Deliberately ignores the filter params (operacion, tipo, zona, precio...)
// here: folding every facet combination into its own canonical would index
// a combinatorial explosion of near-duplicate filtered views. Only the
// plain, unfiltered page sequence is meant to be crawled/indexed on its own;
// a filtered URL still canonicalizes to that same unfiltered page number.
export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const page = Number(sp?.page) || 1;
  const suffix = page > 1 ? ` — página ${page}` : '';

  return {
    title: `Propiedades en venta y renta en Monterrey${suffix}`,
    description: 'Explora casas, departamentos, locales, bodegas y terrenos en venta y renta en Monterrey y Nuevo León. Filtra por operación, zona, precio y más.',
    alternates: { canonical: page > 1 ? `/propiedades?page=${page}` : '/propiedades' },
  };
}

export default async function PropiedadesPage({ searchParams }) {
  const sp = await searchParams;
  const { properties, source } = await fetchAllProperties();
  const propertyCards = properties.map((property) => toPropertyCardData(property));

  const initialFilters = {
    operacion: sp?.operacion || '',
    tipo: sp?.tipo || '',
    categoria: sp?.categoria || '',
    zona: sp?.zona || '',
    precioMin: sp?.precioMin || '',
    precioMax: sp?.precioMax || '',
    recamaras: sp?.recamaras || '0',
    banos: sp?.banos || '0',
    page: sp?.page || '1',
  };

  return (
    <div className="page-content">
      <Breadcrumb items={[{ label: 'Propiedades' }]} />
      <div className="propiedades-heading">
        {source !== 'live' && (
          <div className="crm-indicator">
            <span className="crm-dot"></span> Inventario no disponible en este momento
          </div>
        )}
        <h1>Propiedades en venta y renta en Monterrey y Nuevo León</h1>
      </div>
      <PropertyLandingDirectory />
      <PropertyFilters properties={propertyCards} initialFilters={initialFilters} />
    </div>
  );
}
