import Breadcrumb from '@/components/Breadcrumb';
import ServicePage from '@/components/servicios/ServicePage';
import ServicePageForm from '@/components/servicios/ServicePageForm';
import { contenidoIndustrial } from '@/components/servicios/contenidoIndustrial';
import { estilosIndustrial } from '@/components/servicios/estilosIndustrial';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = {
  title: 'Inmobiliaria industrial en Monterrey',
  description:
    'Naves, bodegas, terrenos, patios, parques industriales y build-to-suit en los corredores industriales de Nuevo León. Búsqueda para empresas y comercialización para propietarios.',
  alternates: { canonical: '/servicios/inmobiliaria-industrial' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Inmobiliaria industrial',
  serviceType: 'Corretaje inmobiliario industrial',
  url: 'https://www.rednorte.mx/servicios/inmobiliaria-industrial',
  areaServed: { '@type': 'City', name: 'Monterrey y área metropolitana' },
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Rednorte Inmobiliaria',
    url: 'https://www.rednorte.mx/',
  },
};

export default function InmobiliariaIndustrialPage() {
  return (
    <div className="page-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: 'Servicios', href: '/servicios' },
              { label: 'Inmobiliaria industrial' },
            ])
          ),
        }}
      />
      <Breadcrumb items={[{ label: 'Servicios', href: '/servicios' }, { label: 'Inmobiliaria industrial' }]} />
      <ServicePage
        contenido={contenidoIndustrial}
        estilos={estilosIndustrial}
        className="industrial-page"
      />
      <ServicePageForm formClass="industrial-lead-form" tipo="Inmobiliaria industrial" />
    </div>
  );
}
