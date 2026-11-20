import Link from 'next/link';
import { Fragment } from 'react';
import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import PropertyFilters from '@/components/PropertyFilters';
import PilotLandingHero from '@/components/impulsa/PilotLandingHero';
import PilotPropertyCatalog from '@/components/impulsa/PilotPropertyCatalog';
import PropertySearchAssistant, { PropertySearchAssistantProvider } from '@/components/impulsa/PropertySearchAssistant';
import pilotStyles from '@/components/impulsa/PilotLanding.module.css';
import { normalizePilotFilters, filterPilotProperties } from '@/lib/pilotPropertySearch.mjs';
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
import { PROPERTIES_PER_PAGE } from '@/lib/propertyPagination';
import { socialPreviewImage } from '@/lib/socialPreviews';

const SITE_URL = getCanonicalSiteUrl();

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
  const parsedPage = landing.path === '/propiedades/monterrey/casas-en-venta'
    ? normalizePilotFilters(sp).page
    : Number.parseInt(String(sp?.page || '1'), 10);
  const page = Number.isFinite(parsedPage) && parsedPage > 1 ? parsedPage : 1;
  const suffix = page > 1 ? ` — página ${page}` : '';
  const canonical = page > 1 ? `${landing.path}?page=${page}` : landing.path;
  const filterKeys = [
    'operacion', 'tipo', 'categoria', 'zona', 'precioMin', 'precioMax',
    'recamaras', 'banos', 'm2Min', 'm2Max', 'colonia', 'sort',
  ];
  const hasActiveFilters = filterKeys.some((key) => {
    const value = sp?.[key];
    return Array.isArray(value) ? value.some(Boolean) : Boolean(value);
  });
  const description = page > 1
    ? (landing.paginationDescription
        ? landing.paginationDescription(page)
        : `Explora la página ${page} de ${landing.typePlural} en ${landing.operationLower} en ${landing.municipality}, Nuevo León. Compara ubicación, precio y características.`)
    : landing.description;
  const pageTitle = `${landing.heading}${suffix}`;
  const title = page === 1 && landing.seoTitle
    ? { absolute: landing.seoTitle }
    : pageTitle;
  const socialTitle = page === 1 && landing.seoTitle ? landing.seoTitle : pageTitle;

  return {
    title,
    description,
    alternates: { canonical },
    robots: hasActiveFilters ? { index: false, follow: true } : undefined,
    openGraph: {
      title: socialTitle,
      description,
      url: canonical,
      type: 'website',
      images: [{
        url: socialPreviewImage('propiedades'),
        width: 1200,
        height: 630,
        alt: landing.heading,
      }],
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [socialPreviewImage('propiedades')],
    },
  };
}

function readFilter(searchParams, name, fallback) {
  return Object.prototype.hasOwnProperty.call(searchParams || {}, name)
    ? searchParams[name]
    : fallback;
}

function buildItemList(properties, page) {
  const start = (page - 1) * PROPERTIES_PER_PAGE;
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: properties.length,
    itemListElement: properties.slice(start, start + PROPERTIES_PER_PAGE).map((property, index) => ({
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
  const pilot = landing.path === '/propiedades/monterrey/casas-en-venta';
  const pilotFilters = pilot ? normalizePilotFilters(sp) : null;
  const page = pilot ? pilotFilters.page : Math.max(1, Number(sp?.page) || 1);
  const previewOnly = process.env.VERCEL_ENV !== 'production';
  const { properties, source } = await fetchAllProperties();
  const matchingProperties = properties.filter((property) => propertyMatchesLanding(property, landing));
  const resultProperties = pilot ? filterPilotProperties(matchingProperties, pilotFilters) : matchingProperties;
  const totalPages = pilot
    ? Math.max(1, Math.ceil(resultProperties.length / PROPERTIES_PER_PAGE))
    : Math.max(1, Math.ceil(matchingProperties.length / PROPERTIES_PER_PAGE));
  if (source === 'live' && page > totalPages) notFound();
  const inventoryProperties = landing.kind === 'area' ? matchingProperties : properties;
  const propertyCards = (pilot ? matchingProperties : inventoryProperties).map((property) => pilot
    ? { ...toPropertyCardData(property), currency: property.currency || 'MXN' }
    : toPropertyCardData(property));
  const neighborhoods = landing.kind === 'area' ? [] : getLandingNeighborhoods(properties, landing);
  const related = getRelatedPropertyLandings(landing);
  const servicePath = landing.servicePath || (landing.operation === 'Venta'
    ? '/servicios/comprar-propiedad'
    : '/servicios/rentar-propiedad');

  const baseFilters = landing.kind === 'area'
    ? {}
    : {
        operacion: landing.operation,
        tipo: landing.type,
        zona: landing.municipality,
      };
  const initialFilters = pilot ? pilotFilters : {
    operacion: readFilter(sp, 'operacion', baseFilters.operacion),
    tipo: readFilter(sp, 'tipo', baseFilters.tipo),
    categoria: readFilter(sp, 'categoria', ''),
    zona: landing.kind === 'area' ? '' : readFilter(sp, 'zona', baseFilters.zona),
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
  const PageScope = pilot ? PropertySearchAssistantProvider : Fragment;

  return (
    <PageScope>
    <div className={`page-content property-landing-page${pilot ? ` ${pilotStyles.page}` : ''}`} role={pilot ? 'main' : undefined}>
      {pilot && <a className={pilotStyles.skipLink} href="#impulsa-catalogo">Ir a las casas</a>}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema(breadcrumbItems)) }}
      />
      {source === 'live' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: pilot
            ? serializeJsonLd(buildItemList(resultProperties, page))
            : serializeJsonLd(buildItemList(matchingProperties, page)) }}
        />
      )}
      <Breadcrumb items={breadcrumbItems} />
      {pilot ? (
        <PilotLandingHero live={source === 'live'} propertyCount={matchingProperties.length} filters={initialFilters} previewOnly={previewOnly} />
      ) : (
      <header className="property-landing-hero">
        {source !== 'live' && (
          <div className="crm-indicator">
            <span className="crm-dot"></span> Inventario no disponible en este momento
          </div>
        )}
        <h1>{landing.heading}</h1>
        {source !== 'live' ? (
          <p>Inventario temporalmente no disponible. Estamos actualizando los datos de NocNok antes de mostrar propiedades.</p>
        ) : landing.heroCopy ? (
          <p>{landing.heroCopy}</p>
        ) : (
          <p>
            Consulta {landing.typePlural} en {landing.operationLower} actualmente disponibles en {landing.municipality}.
            Compara precios, zonas, superficies y características. El inventario se actualiza conforme las propiedades
            entran o salen del mercado.
          </p>
        )}
        {neighborhoods.length > 0 && (
          <div className="property-neighborhoods" aria-label="Zonas con inventario">
            <span>Zonas con inventario:</span>
            {neighborhoods.map((neighborhood) => <span key={neighborhood}>{neighborhood}</span>)}
          </div>
        )}
      </header>
      )}

      {source === 'live' ? (
        pilot ? (
          <div id="impulsa-catalogo" className={pilotStyles.catalogAnchor}>
            <PilotPropertyCatalog properties={propertyCards} initialFilters={initialFilters} basePath={landing.path} previewOnly={previewOnly} />
          </div>
        ) : (
        <PropertyFilters
          properties={propertyCards}
          initialFilters={initialFilters}
          basePath={landing.path}
          baseFilters={baseFilters}
          fixedLocationLabel={landing.fixedLocationLabel}
        />
        )
      ) : (
        <section id={pilot ? 'impulsa-catalogo' : undefined} className={pilot ? pilotStyles.unavailable : 'container'} aria-live="polite" style={pilot ? undefined : { padding: '4rem 0 6rem' }}>
          <h2>Inventario temporalmente no disponible</h2>
          <p>No mostraremos anuncios ni precios hasta que podamos confirmar su vigencia en NocNok.</p>
          {pilot && <PropertySearchAssistant variant="empty" filters={initialFilters} previewOnly={previewOnly} />}
        </section>
      )}

      {landing.editorial && (
        <section className="property-landing-editorial">
          <h2>{landing.editorial.title}</h2>
          <p>{landing.editorial.copy}</p>
          {landing.editorial.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {landing.editorial.links ? (
            landing.editorial.links.map((item) => (
              <p key={item.href}>
                {item.prefix}{' '}<Link href={item.href}>{item.anchor}</Link>{item.suffix}
              </p>
            ))
          ) : (
            <p>
              Consulta <Link href={landing.editorial.linkHref}>{landing.editorial.linkAnchor}</Link>.{' '}
              {landing.editorial.linkAfter}
            </p>
          )}
        </section>
      )}

      <section className="property-landing-support" style={pilot ? { gridTemplateColumns: "1fr" } : undefined}>
        {!pilot && <div>
          <span className="section-label">Asesoría inmobiliaria</span>
          <h2>¿Necesitas apoyo para encontrar la propiedad adecuada?</h2>
          <p>Te ayudamos a revisar opciones, validar información y avanzar con claridad durante el proceso.</p>
          <Link className="btn-secondary" href={servicePath}>{landing.serviceCta || 'Conoce nuestro servicio'}</Link>
        </div>}
        <nav aria-label="Búsquedas de propiedades relacionadas">
          <h2>Búsquedas relacionadas</h2>
          <div className="property-related-links">
            {related.map((item) => <Link key={item.path} href={item.path}>{item.heading}</Link>)}
          </div>
        </nav>
      </section>
    </div>
    </PageScope>
  );
}
