// lib/schema.js
// JSON-LD structured data (schema.org) shared across pages, so search
// engines and AI answer engines can parse who we are and what each
// property listing actually is, instead of just reading rendered text.

import { FAQS } from './faq';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.rednorte.mx';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Rednorte Inmobiliaria',
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/logo.png`,
    telephone: '+528117783953',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Av. José Vasconcelos Ote. 215-7, Residencial San Agustín 1er Sector',
      addressLocality: 'San Pedro Garza García',
      addressRegion: 'Nuevo León',
      postalCode: '66260',
      addressCountry: 'MX',
    },
    areaServed: {
      '@type': 'City',
      name: 'Monterrey y área metropolitana',
    },
    sameAs: [
      'https://www.facebook.com/rednorteinmobiliaria/',
      'https://www.instagram.com/rednortemx/',
      'https://www.linkedin.com/company/rednortemx/',
      'https://x.com/rednortemx',
      'https://www.tiktok.com/@rednortemx',
      'https://www.youtube.com/@rednorteinmobiliaria',
      'https://share.google/UFbLTlYjmYeX6h6zy',
    ],
  };
}

const RESIDENCE_TYPE = {
  Casa: 'House',
  Depto: 'Apartment',
};

// businessFunction follows the GoodRelations vocabulary schema.org reuses
// for Offer — LeaseOut for rentals, Sell for sales.
const BUSINESS_FUNCTION = {
  Venta: 'http://purl.org/goodrelations/v1#Sell',
  Renta: 'http://purl.org/goodrelations/v1#LeaseOut',
};

export function propertyListingSchema(property, canonicalUrl) {
  const floorSizeM2 = property.constructionSize || property.lotSize;

  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    name: property.title,
    url: canonicalUrl,
    description: property.description || undefined,
    image: property.imgs && property.imgs.length > 0 ? property.imgs : undefined,
    about: {
      '@type': RESIDENCE_TYPE[property.type] || 'Place',
      name: property.title,
      address: {
        '@type': 'PostalAddress',
        addressLocality: property.municipio || property.zone,
        addressRegion: 'Nuevo León',
        addressCountry: 'MX',
      },
      numberOfRooms: property.rooms || undefined,
      numberOfBathroomsTotal: property.baths || undefined,
      floorSize: floorSizeM2
        ? { '@type': 'QuantitativeValue', value: floorSizeM2, unitCode: 'MTK' }
        : undefined,
    },
    offers: {
      '@type': 'Offer',
      price: property.rawPrice || undefined,
      priceCurrency: 'MXN',
      availability: 'https://schema.org/InStock',
      businessFunction: BUSINESS_FUNCTION[property.op],
      url: canonicalUrl,
    },
  };
}

// Datos estructurados de las preguntas frecuentes. Es lo que permite que
// Google (y los buscadores con IA) puedan mostrar las respuestas
// directamente, en vez de solo enlazar la página.
export function faqSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((item) => ({
      '@type': 'Question',
      name: item.pregunta,
      acceptedAnswer: { '@type': 'Answer', text: item.respuesta },
    })),
  };
}

export function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: item.href ? `${SITE_URL}${item.href}` : undefined,
    })),
  };
}
