import Link from 'next/link';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import PropertyFilters from '@/components/PropertyFilters';
import { fetchAllProperties, toPropertyCardData } from '@/lib/properties';
import { buildPropertySlug } from '@/lib/slug';
import { buildPropertySeoTitle } from '@/lib/propertySeo';
import {
  PROPERTY_LANDING_PAGES,
  findPropertyLandingPage,
  getLandingNeighborhoods,
  getRelatedPropertyLandings,
  propertyMatchesLanding,
} from '@/lib/propertyLandingPages';
import { breadcrumbSchema } from '@/lib/schema';
import { getCanonicalSiteUrl, serializeJsonLd } from '@/lib/security';

const SITE_URL = getCanonicalSiteUrl();
const PROPS_PER_PAGE = 12;

export const revalidate = 120;

export function generateStaticParams() {
  return PROPERTY_LANDING_PAGES.map((landing) => ({
    slug: landing.municipalitySlug,
    categoria: landing.categorySlug,
  }));
}

export async function generateMetadata({ params, searchParams }) {
  const { slug, categoria } = await params;
  const landing = findPropertyLandingPage(slug, categoria);

  if (!landing) {
    return { title: 'Búsqueda no disponible', robots: { index: false, follow: false } };
  }

  const sp = await searchParams;
  const parsedPage = Number.parseInt(String(sp?.page || '1'), 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 1 ? parsedPage : 1;
  const suffix = page > 1 ? ` — página ${page}` : '';
  const canonical = page > 1 ? `${landing.path}?page=${page}` : landing.path;
  const filterKeys = [
    'operacion', 'tipo', 'categoria', 'zona', 'precioMin', 'precioMax',
    'recamaras', 'banos', 'm2Min', 'm2Max',
  ];
  const hasActiveFilters = filterKeys.some((key) => {
    const value = sp?.[key];
    return Array.isArray(value) ? value.some(Boolean) : Boolean(value);
  });
  const description = page > 1
    ? `Explora la página ${page} de ${landing.typePlural} en ${landing.operationLower} en ${landing.municipality}, Nuevo León. Compara ubicación, precio y características.`
    : landing.description;

  return {
    title: `${landing.heading}${suffix}`,
    description,
    alternates: { canonical },
    robots: hasActiveFilters ? { index: false, follow: true } : undefined,
    openGraph: {
      title: `${landing.heading}${suffix}`,
      description,
      url: canonical,
      type: 'website',
    },
  };
}

function readFilter(searchParams, name, fallback) {
  return Object.prototype.hasOwnProperty.call(searchParams || {}, name)
    ? searchParams[name]
    : fallback;
}

function buildItemList(properties, page) {
  const start = (page - 1) * PROPS_PER_PAGE;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: properties.length,
    itemListElement: properties.slice(start, start + PROPS_PER_PAGE).map((property, index) => ({
      '@type': 'ListItem',
      position: start + index + 1,
      name: buildPropertySeoTitle(property),
      url: `${SITE_URL}/propiedades/${buildPropertySlug(property)}`,
    })),
  };
}

export default async function PropertyLandingPage({ params, searchParams }) {
  const { slug, categoria } = await params;
  const landing = findPropertyLandingPage(slug, categoria);
  if (!landing) notFound();

  const sp = await searchParams;
  const page = Math.max(1, Number(sp?.page) || 1);
  const { properties, source } = await fetchAllProperties();
  const matchingProperties = properties.filter((property) => propertyMatchesLanding(property, landing));
  const totalPages = Math.max(1, Math.ceil(matchingProperties.length / PROPS_PER_PAGE));
  if (source === 'live' && page > totalPages) notFound();
  const propertyCards = properties.map((property) => toPropertyCardData(property));
  const neighborhoods = getLandingNeighborhoods(properties, landing);
  const related = getRelatedPropertyLandings(landing);
  const servicePath = landing.operation === 'Venta'
    ? '/servicios/comprar-propiedad'
    : '/servicios/rentar-propiedad';

  const baseFilters = {
    operacion: landing.operation,
    tipo: landing.type,
    zona: landing.municipality,
  };
  const initialFilters = {
    operacion: readFilter(sp, 'operacion', baseFilters.operacion),
    tipo: readFilter(sp, 'tipo', baseFilters.tipo),
    categoria: readFilter(sp, 'categoria', ''),
    zona: readFilter(sp, 'zona', baseFilters.zona),
    precioMin: sp?.precioMin || '',
    precioMax: sp?.precioMax || '',
    recamaras: sp?.recamaras || '0',
    banos: sp?.banos || '0',
    m2Min: sp?.m2Min || '',
    m2Max: sp?.m2Max || '',
    page: sp?.page || '1',
  };
  const breadcrumbItems = [
    { label: 'Propiedades', href: '/propiedades' },
    { label: landing.heading },
  ];

  return (
    <div className="page-content property-landing-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema(breadcrumbItems)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildItemList(matchingProperties, page)) }}
      />
      <Breadcrumb items={breadcrumbItems} />
      <header className="property-landing-hero">
        {source !== 'live' && (
          <div className="crm-indicator">
            <span className="crm-dot"></span> Inventario no disponible en este momento
          </div>
        )}
        <h1>{landing.heading}</h1>
        <p>
          Consulta {landing.typePlural} en {landing.operationLower} actualmente disponibles en {landing.municipality}.
          Compara precios, zonas, superficies y características. El inventario se actualiza conforme las propiedades
          entran o salen del mercado.
        </p>
        {neighborhoods.length > 0 && (
          <div className="property-neighborhoods" aria-label="Zonas con inventario">
            <span>Zonas con inventario:</span>
            {neighborhoods.map((neighborhood) => <span key={neighborhood}>{neighborhood}</span>)}
          </div>
        )}
      </header>

      <PropertyFilters
        properties={propertyCards}
        initialFilters={initialFilters}
        basePath={landing.path}
        baseFilters={baseFilters}
      />

      <section className="property-landing-support">
        <div>
          <span className="section-label">Asesoría inmobiliaria</span>
          <h2>¿Necesitas apoyo para encontrar la propiedad adecuada?</h2>
          <p>Te ayudamos a revisar opciones, validar información y avanzar con claridad durante el proceso.</p>
          <Link className="btn-secondary" href={servicePath}>Conoce nuestro servicio</Link>
        </div>
        <nav aria-label="Búsquedas de propiedades relacionadas">
          <h2>Búsquedas relacionadas</h2>
          <div className="property-related-links">
            {related.map((item) => <Link key={item.path} href={item.path}>{item.heading}</Link>)}
          </div>
        </nav>
      </section>
    </div>
  );
}
