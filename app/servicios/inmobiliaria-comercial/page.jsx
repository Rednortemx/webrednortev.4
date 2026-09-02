import Breadcrumb from '@/components/Breadcrumb';
import ServicePage from '@/components/servicios/ServicePage';
import ServicePageForm from '@/components/servicios/ServicePageForm';
import { contenidoComercial } from '@/components/servicios/contenidoComercial';
import { estilosComercial } from '@/components/servicios/estilosComercial';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = {
  title: 'Inmobiliaria comercial en Monterrey',
  description:
    'Locales, oficinas, consultorios, edificios y terrenos comerciales en Monterrey y Nuevo León. Búsqueda para empresas y comercialización para propietarios con Rednorte Inmobiliaria.',
  alternates: { canonical: '/servicios/inmobiliaria-comercial' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Inmobiliaria comercial',
  serviceType: 'Corretaje inmobiliario comercial',
  url: 'https://www.rednorte.mx/servicios/inmobiliaria-comercial',
  areaServed: { '@type': 'City', name: 'Monterrey y área metropolitana' },
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Rednorte Inmobiliaria',
    url: 'https://www.rednorte.mx/',
  },
};

export default function InmobiliariaComercialPage() {
  return (
    <div className="page-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: 'Servicios', href: '/servicios' },
              { label: 'Inmobiliaria comercial' },
            ])
          ),
        }}
      />
      <Breadcrumb items={[{ label: 'Servicios', href: '/servicios' }, { label: 'Inmobiliaria comercial' }]} />
      <ServicePage
        contenido={contenidoComercial}
        estilos={estilosComercial}
        className="commercial-page"
      />
      <ServicePageForm formClass="commercial-lead-form" tipo="Inmobiliaria comercial" />
    </div>
  );
}
