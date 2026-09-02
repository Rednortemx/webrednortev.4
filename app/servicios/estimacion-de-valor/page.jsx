import Breadcrumb from '@/components/Breadcrumb';
import ServicePage from '@/components/servicios/ServicePage';
import ServicePageForm from '@/components/servicios/ServicePageForm';
import { contenidoEstimacion } from '@/components/servicios/contenidoEstimacion';
import { estilosEstimacion } from '@/components/servicios/estilosEstimacion';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = {
  title: 'Estimación de valor inmobiliario en Monterrey',
  description:
    'Conoce un rango orientativo del valor de venta de tu propiedad en Monterrey y Nuevo León. Analizamos ubicación, características, comparables y condiciones del mercado. No sustituye un avalúo.',
  alternates: { canonical: '/servicios/estimacion-de-valor' },
};

// Datos estructurados del servicio. Se declara como Service y no como
// producto: es asesoria, no algo que se compre en linea.
const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Estimación de valor inmobiliario',
  serviceType: 'Estimación de valor de propiedades',
  url: 'https://www.rednorte.mx/servicios/estimacion-de-valor',
  areaServed: { '@type': 'City', name: 'Monterrey y área metropolitana' },
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Rednorte Inmobiliaria',
    url: 'https://www.rednorte.mx/',
  },
};

export default function EstimacionDeValorServicioPage() {
  return (
    <div className="page-content">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbSchema([
              { label: 'Servicios', href: '/servicios' },
              { label: 'Estimación de valor' },
            ])
          ),
        }}
      />
      <Breadcrumb items={[{ label: 'Servicios', href: '/servicios' }, { label: 'Estimación de valor' }]} />
      <ServicePage
        contenido={contenidoEstimacion}
        estilos={estilosEstimacion}
        className="estimate-service-page"
      />
      <ServicePageForm formClass="estimate-service-lead-form" tipo="Estimación de valor (servicio)" />
    </div>
  );
}
