import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'Herramientas inmobiliarias gratuitas | Rednorte',
  description:
    'Herramientas gratuitas de Rednorte para estimar el valor de venta de una propiedad y evaluar qué tan vendible es en Monterrey y Nuevo León.',
  alternates: { canonical: '/herramientas' },
  openGraph: {
    title: 'Herramientas inmobiliarias gratuitas | Rednorte',
    description:
      'Obtén una primera referencia sobre el valor y la vendibilidad de una propiedad.',
    url: '/herramientas',
    type: 'website',
  },
};

const tools = [
  {
    eyebrow: 'ESTIMACIÓN DE VALOR',
    title: 'Estima el valor de venta de tu propiedad',
    text:
      'Obtén una estimación inicial basada en ubicación, características de la propiedad y referencias del mercado inmobiliario.',
    href: '/herramientas/estimacion-de-valor',
    cta: 'Estimar valor →',
  },
  {
    eyebrow: 'REPORTE DE VENDIBILIDAD',
    title: 'Analiza qué tan vendible es tu propiedad',
    text:
      'Responde preguntas sobre precio, presentación, exposición y condiciones de comercialización para identificar qué factores pueden estar facilitando o frenando la venta.',
    href: '/herramientas/reporte-de-vendibilidad',
    cta: 'Analizar vendibilidad →',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.rednorte.mx/herramientas#webpage',
      url: 'https://www.rednorte.mx/herramientas',
      name: 'Herramientas inmobiliarias gratuitas | Rednorte',
      description:
        'Herramientas gratuitas para estimar valor de venta y analizar vendibilidad de propiedades.',
      isPartOf: { '@id': 'https://www.rednorte.mx/#website' },
      about: { '@id': 'https://www.rednorte.mx/#organization' },
      hasPart: [
        {
          '@type': 'WebApplication',
          name: 'Estimación de valor',
          url: 'https://www.rednorte.mx/herramientas/estimacion-de-valor',
          applicationCategory: 'BusinessApplication',
        },
        {
          '@type': 'WebApplication',
          name: 'Reporte de vendibilidad',
          url: 'https://www.rednorte.mx/herramientas/reporte-de-vendibilidad',
          applicationCategory: 'BusinessApplication',
        },
      ],
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.rednorte.mx/' },
        { '@type': 'ListItem', position: 2, name: 'Herramientas', item: 'https://www.rednorte.mx/herramientas' },
      ],
    },
  ],
};

export default function HerramientasPage() {
  return (
    <div className="quick-page tools-hub-page">
      <Breadcrumb items={[{ label: 'Herramientas' }]} />

      <section className="quick-hero quick-hero-centered">
        <div className="quick-shell">
          <p className="quick-eyebrow">HERRAMIENTAS GRATUITAS</p>
          <h1>Herramientas inmobiliarias gratuitas</h1>
          <p className="quick-hero-lead">
            Utiliza nuestras herramientas para obtener una primera referencia sobre el valor y la
            vendibilidad de una propiedad.
          </p>
          <p className="quick-disclaimer">
            Los resultados son orientativos y no sustituyen un avalúo ni un análisis inmobiliario personalizado.
          </p>
        </div>
      </section>

      <section className="tools-hub-list">
        <div className="quick-shell tools-hub-grid">
          {tools.map((tool) => (
            <Link className="tools-hub-card" href={tool.href} key={tool.title}>
              <p className="tools-hub-card-eyebrow">{tool.eyebrow}</p>
              <h2>{tool.title}</h2>
              <p>{tool.text}</p>
              <span>{tool.cta}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="quick-secondary-cta">
        <div className="quick-shell quick-secondary-cta-card">
          <div>
            <p className="quick-eyebrow">ANÁLISIS PERSONALIZADO</p>
            <h2>¿Necesitas un análisis más completo?</h2>
            <p>
              Si quieres revisar precio, comparables, estrategia de comercialización o condiciones
              particulares de tu propiedad, nuestro equipo puede ayudarte.
            </p>
          </div>
          <Link className="quick-btn quick-btn-primary" href="/contacto?motivo=estimacion">
            Solicitar análisis personalizado
          </Link>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
