import Breadcrumb from '@/components/Breadcrumb';
import ServicePage from '@/components/servicios/ServicePage';
import ServicePageForm from '@/components/servicios/ServicePageForm';
import ServiceEditorialNav from '@/components/servicios/ServiceEditorialNav';
import { contenidoEstimacion } from '@/components/servicios/contenidoEstimacion';
import { estilosEstimacion } from '@/components/servicios/estilosEstimacion';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = {
  title: { absolute: 'Estimación de valor de propiedad en Monterrey | Rednorte' },
  description:
    'Obtén una estimación inicial del valor de tu propiedad en Monterrey. Analizamos ubicación y características para darte una primera referencia comercial.',
  alternates: { canonical: '/servicios/estimacion-de-valor' },
};

const contenidoEstimacionSeo = contenidoEstimacion.replace(
  '<p class="estimate-service-hero-disclaimer">La estimación es informativa y no sustituye un avalúo profesional, bancario, fiscal, judicial o catastral.</p>',
  '<p class="estimate-service-hero-disclaimer">La estimación es informativa y no sustituye un avalúo profesional, bancario, fiscal, judicial o catastral.</p><p class="estimate-service-hero-support">¿Quieres entender cómo se estima el valor de una casa? Consulta nuestra guía sobre <a href="/insights/cuanto-vale-mi-casa-monterrey">cuánto vale una casa en Monterrey</a>.</p>',
);

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
    <div className="page-content service-editorial service-editorial--estimate">
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
      <ServiceEditorialNav active="other" />
      <ServicePage
        contenido={contenidoEstimacionSeo}
        estilos={estilosEstimacion}
        className="estimate-service-page"
      />
      <ServicePageForm formClass="estimate-service-lead-form" tipo="Estimación de valor (servicio)" />
    </div>
  );
}
