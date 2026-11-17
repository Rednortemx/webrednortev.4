import Breadcrumb from '@/components/Breadcrumb';
import DiagnosticoVenta from '@/components/diagnostico-venta/DiagnosticoVenta';
import { serializeJsonLd } from '@/lib/security';
import '@/components/diagnostico-venta/diagnosticoVenta.css';

export const metadata = {
  title: '¿Por qué no se vende mi propiedad? | Rednorte Monterrey',
  description: '¿Tu propiedad no recibe consultas, visitas u ofertas? Descubre posibles causas y solicita una revisión inicial gratuita de tu anuncio con Rednorte en Monterrey.',
  alternates: { canonical: '/herramientas/por-que-no-se-vende' },
  openGraph: {
    title: '¿Por qué no se vende mi propiedad? | Rednorte',
    description: 'Identifica qué podría estar frenando tu venta y conoce cómo Rednorte revisaría tu anuncio. Revisión inicial gratuita y sin compromiso.',
    url: '/herramientas/por-que-no-se-vende',
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://www.rednorte.mx/herramientas/por-que-no-se-vende#webpage',
  name: '¿Por qué no se vende mi propiedad? | Rednorte',
  url: 'https://www.rednorte.mx/herramientas/por-que-no-se-vende',
  description: 'Orientación comercial sobre posibles causas de falta de consultas, visitas u ofertas y solicitud de una revisión inicial gratuita.',
  isPartOf: { '@id': 'https://www.rednorte.mx/#website' },
  about: { '@id': 'https://www.rednorte.mx/#organization' },
  inLanguage: 'es-MX',
};

export default function PorQueNoSeVendePage() {
  return (
    <div className="page-content tools-experience-page">
      <Breadcrumb items={[
        { label: 'Herramientas', href: '/herramientas' },
        { label: '¿Por qué no se vende mi propiedad?' },
      ]} />
      <DiagnosticoVenta />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    </div>
  );
}
