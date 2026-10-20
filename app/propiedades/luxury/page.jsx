import Breadcrumb from '@/components/Breadcrumb';
import PropertyFilters from '@/components/PropertyFilters';
import { fetchLuxuryProperties } from '@/lib/luxuryProperties';
import { toPropertyCardData } from '@/lib/properties';
import { socialMetadata } from '@/lib/socialPreviews';

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  const parsedPage = Number.parseInt(String(sp?.page || '1'), 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 1 ? parsedPage : 1;
  const canonical = page > 1 ? `/propiedades/luxury?page=${page}` : '/propiedades/luxury';
  const filterKeys = ['tipo', 'zona', 'precioMin', 'precioMax', 'recamaras', 'banos', 'm2Min', 'm2Max'];
  const hasActiveFilters = filterKeys.some((key) => {
    const value = sp?.[key];
    return Array.isArray(value) ? value.some(Boolean) : Boolean(value);
  });
  const social = socialMetadata('luxury', canonical);

  return {
    title: `Luxury Properties en Monterrey y Nuevo León${page > 1 ? ` — página ${page}` : ''}`,
    description:
      'Colección de casas, departamentos y quintas de lujo en venta, seleccionadas por Rednorte Inmobiliaria y verificadas en nuestro inventario vigente.',
    alternates: { canonical },
    robots: hasActiveFilters ? { index: false, follow: true } : undefined,
    ...social,
    openGraph: { ...social.openGraph, url: canonical },
  };
}

export default async function LuxuryPropertiesPage({ searchParams }) {
  const sp = await searchParams;
  const { properties, source, approvedCount } = await fetchLuxuryProperties();
  const propertyCards = properties.map((property) => toPropertyCardData(property));

  const initialFilters = {
    operacion: 'Venta',
    tipo: sp?.tipo || '',
    categoria: 'Residencial',
    zona: sp?.zona || '',
    precioMin: sp?.precioMin || '',
    precioMax: sp?.precioMax || '',
    recamaras: sp?.recamaras || '0',
    banos: sp?.banos || '0',
    m2Min: sp?.m2Min || '',
    m2Max: sp?.m2Max || '',
    page: sp?.page || '1',
  };

  return (
    <main className="page-content properties-catalog-refresh luxury-properties-page">
      <Breadcrumb items={[{ label: 'Propiedades', href: '/propiedades' }, { label: 'Luxury' }]} />
      <header className="properties-catalog-hero">
        <div className="propiedades-heading">
          {source !== 'live' && (
            <div className="crm-indicator">
              <span className="crm-dot"></span> Colección temporalmente no disponible
            </div>
          )}
          <span className="catalog-eyebrow">Selección editorial Rednorte</span>
          <div className="catalog-heading-grid">
            <h1>Luxury Properties</h1>
            <div className="catalog-heading-aside">
              <p>
                Casas, departamentos y quintas en venta, seleccionadas por su ubicación,
                presentación y calidad de ficha.
              </p>
              {source === 'live' && (
                <span>{propertyCards.length} propiedades disponibles</span>
              )}
            </div>
          </div>
        </div>
      </header>

      {source === 'live' && propertyCards.length > 0 ? (
        <PropertyFilters
          properties={propertyCards}
          initialFilters={initialFilters}
          basePath="/propiedades/luxury"
          baseFilters={{ operacion: 'Venta', categoria: 'Residencial' }}
        />
      ) : (
        <section className="container" style={{ padding: '5rem 0 7rem' }}>
          <p className="section-label">Colección Luxury</p>
          <h2 className="section-title">Estamos actualizando la selección</h2>
          <p>
            Las propiedades se mostrarán nuevamente cuando podamos confirmar su disponibilidad
            en el inventario vigente.
          </p>
          {approvedCount > 0 && <p>{approvedCount} propiedades permanecen aprobadas internamente.</p>}
        </section>
      )}
    </main>
  );
}
