import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import PropertyGallery from '@/components/PropertyGallery';
import PropertySidebar from '@/components/PropertySidebar';
import PropertyCard from '@/components/PropertyCard';
import PropertyMap from '@/components/PropertyMap';
import { fetchAllProperties, findPropertyById } from '@/lib/properties';
import { getAdvisorForProperty, defaultAdvisor } from '@/lib/advisor';
import { buildPropertySlug, extractCodeFromSlug } from '@/lib/slug';
import { buildPropertyMetaDescription, buildPropertySeoTitle } from '@/lib/propertySeo';
import { propertyListingSchema, breadcrumbSchema } from '@/lib/schema';
import { getCanonicalSiteUrl, serializeJsonLd } from '@/lib/security';

const SITE_URL = getCanonicalSiteUrl();

// The URL is /propiedades/{palabras-descriptivas}-{CODIGO} — only the code
// at the end is ever used to look the property up (see lib/slug.js). This
// means a link someone already shared keeps resolving to the right property
// forever, even if its title/operation/zone later changes in the CRM and a
// freshly-generated link (e.g. from the listing page) would now use
// different descriptive words.

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const code = extractCodeFromSlug(slug);
  const { properties } = await fetchAllProperties();
  const property = findPropertyById(properties, code);

  if (!property) {
    return { title: 'Propiedad no encontrada' };
  }

  const title = buildPropertySeoTitle(property);
  const description = buildPropertyMetaDescription(property);
  const ogImage = property.imgs && property.imgs[0];

  return {
    // Evita añadir el sufijo global largo en las fichas del inventario.
    // El código del CRM hace inequívocas las propiedades similares.
    title: { absolute: title },
    description,
    alternates: { canonical: `/propiedades/${buildPropertySlug(property)}` },
    openGraph: {
      title,
      description,
      images: ogImage ? [{ url: ogImage }] : undefined,
    },
  };
}

export default async function PropiedadPage({ params }) {
  const { slug } = await params;
  const code = extractCodeFromSlug(slug);
  const { properties } = await fetchAllProperties();
  const property = findPropertyById(properties, code);

  if (!property) {
    notFound();
  }

  const advisor = (await getAdvisorForProperty(property.id)) || defaultAdvisor();
  const similar = properties.filter((p) => p.id !== property.id && p.category === property.category).slice(0, 3);
  const isRenta = property.op === 'Renta';

  const feats = [
    { val: property.rooms, name: 'Recámaras' },
    { val: property.baths, name: 'Baños' },
    { val: property.parking, name: 'Estacionamientos' },
    { val: property.lotSize ? `${property.lotSize} m²` : '—', name: 'Terreno' },
    { val: property.constructionSize ? `${property.constructionSize} m²` : '—', name: 'Construcción' },
    { val: property.municipio || (property.zone || '').split(',')[0], name: 'Municipio' },
  ];

  const breadcrumbItems = [{ label: 'Propiedades', href: '/propiedades' }, { label: property.title }];
  const canonicalUrl = `${SITE_URL}/propiedades/${buildPropertySlug(property)}`;

  return (
    <div className="page-content">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(propertyListingSchema(property, canonicalUrl)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema(breadcrumbItems)) }}
      />
      <Breadcrumb items={breadcrumbItems} />
      <div className="prop-detail">
        <div className="prop-detail-grid">
          <div>
            <PropertyGallery imgs={property.imgs} icon={property.icon} title={property.title} />
            <div className="prop-info" style={{ marginTop: '2rem' }}>
              <div className="prop-detail-badge"> {property.type} en {property.op}</div>
              <h1 className="prop-detail-title">{property.title}</h1>
              <p className="prop-detail-code"> Referencia: <strong>{property.id}</strong></p>
              <div className="prop-detail-price">{property.price}</div>
              <p className="prop-detail-price-sub">{isRenta ? 'Precio mensual' : 'Precio de venta'} · {property.type}</p>
              <div className="prop-features-grid">
                {feats.map((f) => (
                  <div className="prop-feature-item" key={f.name}>
                    <div className="prop-feature-val">{f.val}</div>
                    <div className="prop-feature-name">{f.name}</div>
                  </div>
                ))}
              </div>
              <p className="prop-section-title">Descripción</p>
              <p className="prop-description">{property.description || 'Sin descripción disponible.'}</p>
              <p className="prop-section-title">Amenidades</p>
              <div className="amenities-list">
                {property.features && property.features.length > 0 ? (
                  property.features.slice(0, 10).map((f, i) => <span className="amenity-chip" key={i}>{f}</span>)
                ) : (
                  <span className="amenity-chip">Sin amenidades registradas</span>
                )}
              </div>
              <PropertyMap property={property} />
              {similar.length > 0 && (
                <>
                  <p className="prop-section-title">Propiedades similares</p>
                  <div className="props-grid" style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))' }}>
                    {similar.map((p) => <PropertyCard key={p.id} property={p} />)}
                  </div>
                </>
              )}
            </div>
          </div>
          <PropertySidebar property={property} advisor={advisor} />
        </div>
      </div>
    </div>
  );
}
