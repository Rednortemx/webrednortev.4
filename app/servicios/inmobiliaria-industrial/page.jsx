import Breadcrumb from '@/components/Breadcrumb';
import ServicePage from '@/components/servicios/ServicePage';
import ServicePageForm from '@/components/servicios/ServicePageForm';
import ServiceEditorialNav from '@/components/servicios/ServiceEditorialNav';
import { contenidoIndustrial } from '@/components/servicios/contenidoIndustrial';
import { estilosIndustrial } from '@/components/servicios/estilosIndustrial';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata = {
  title: { absolute: 'Inmobiliaria industrial en Monterrey y Nuevo León | Rednorte' },
  description:
    'Asesoría inmobiliaria industrial en Monterrey y Nuevo León para comprar, rentar, vender o comercializar naves, bodegas, terrenos, patios y parques industriales.',
  alternates: { canonical: '/servicios/inmobiliaria-industrial' },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Inmobiliaria industrial',
  serviceType: 'Corretaje inmobiliario industrial',
  url: 'https://www.rednorte.mx/servicios/inmobiliaria-industrial',
  areaServed: [
    { '@type': 'City', name: 'Monterrey' },
    { '@type': 'AdministrativeArea', name: 'Nuevo León' },
  ],
  provider: {
    '@type': 'RealEstateAgent',
    name: 'Rednorte Inmobiliaria',
    url: 'https://www.rednorte.mx/',
  },
};

const contenidoIndustrialSeo = contenidoIndustrial.replace(
  '<h2 class="industrial-section-title">Asesoría para empresas y propietarios</h2>',
  '<h2 class="industrial-section-title">Asesoría para empresas y propietarios</h2><p>Rednorte trabaja como asesor inmobiliario industrial para empresas y propietarios que necesitan localizar, comprar, rentar, vender o comercializar inmuebles industriales en Monterrey y Nuevo León.</p>',
);

export default function InmobiliariaIndustrialPage() {
  return (
    <div className="page-content service-editorial service-editorial--industrial">
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
      <ServiceEditorialNav active="other" />
      <ServicePage
        contenido={contenidoIndustrialSeo}
        estilos={estilosIndustrial}
        className="industrial-page"
      />
      <ServicePageForm formClass="industrial-lead-form" tipo="Inmobiliaria industrial" />
    </div>
  );
}
