import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'Herramientas inmobiliarias gratuitas | Rednorte',
  description:
    'Herramientas gratuitas de Rednorte para entender por qué no se vende una propiedad, estimar su valor y evaluar su vendibilidad en Monterrey y Nuevo León.',
  alternates: { canonical: '/herramientas' },
  openGraph: {
    title: 'Herramientas inmobiliarias gratuitas | Rednorte',
    description:
      'Identifica posibles obstáculos de comercialización, estima el valor y explora la vendibilidad de tu propiedad.',
    url: '/herramientas',
    type: 'website',
  },
};

const tools = [
  {
    number: '01',
    eyebrow: 'DIAGNÓSTICO DE COMERCIALIZACIÓN',
    title: 'Mi propiedad no se está vendiendo',
    text: 'Identifica tu situación, descubre posibles causas y solicita una revisión inicial gratuita de tu anuncio, sin compromiso.',
    href: '/herramientas/por-que-no-se-vende',
    cta: 'Descubrir qué puede estar pasando',
    meta: ['5 situaciones', 'Sin registro inicial', 'Revisión gratuita'],
  },
  {
    number: '02',
    eyebrow: 'ESTIMACIÓN DE VALOR',
    title: 'Quiero saber cuánto puede valer',
    text:
      'Construye un rango comercial orientativo con las características de tu propiedad y referencias comparables del mercado.',
    href: '/herramientas/estimacion-de-valor',
    cta: 'Comenzar estimación',
    meta: ['3 pasos', 'Resultado inmediato', 'Sin costo'],
  },
  {
    number: '03',
    eyebrow: 'REPORTE DE VENDIBILIDAD',
    title: 'Quiero saber qué frena la venta',
    text:
      'Identifica si el principal obstáculo está en el precio, la presentación, la exposición o la preparación de la propiedad.',
    href: '/herramientas/reporte-de-vendibilidad',
    cta: 'Iniciar diagnóstico',
    meta: ['10 preguntas', 'Menos de 2 min', 'Plan de acción'],
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
        'Herramientas gratuitas de diagnóstico de comercialización, estimación de valor y vendibilidad de inmuebles.',
      isPartOf: { '@id': 'https://www.rednorte.mx/#website' },
      about: { '@id': 'https://www.rednorte.mx/#organization' },
      hasPart: [
        {
          '@type': 'WebApplication',
          name: 'Diagnóstico de comercialización',
          url: 'https://www.rednorte.mx/herramientas/por-que-no-se-vende',
          applicationCategory: 'BusinessApplication',
        },
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

      <section className="tools-hub-hero">
        <div className="quick-shell tools-hub-hero-grid">
          <div className="tools-hub-hero-copy">
            <p className="quick-eyebrow">HERRAMIENTAS DE DECISIÓN</p>
            <h1>Decisiones inmobiliarias con más claridad.</h1>
            <p>
              Cuando una propiedad no se vende, conviene entender qué está pasando,
              revisar su posición en el mercado y decidir qué hacer después.
            </p>
          </div>
          <aside className="tools-hub-guide" aria-label="Guía para elegir una herramienta">
            <p>EMPIEZA POR TU PREGUNTA</p>
            <ol>
              <li><span>01</span><strong>¿Por qué no se vende?</strong></li>
              <li><span>02</span><strong>¿Cuánto puede valer?</strong></li>
              <li><span>03</span><strong>¿Qué tan vendible es?</strong></li>
            </ol>
            <small>Estas herramientas son gratuitas y ofrecen orientación inicial.</small>
          </aside>
        </div>
      </section>

      <section className="tools-hub-list">
        <div className="quick-shell">
          <div className="tools-hub-heading">
            <div>
              <p className="quick-eyebrow">ELIGE TU SIGUIENTE PASO</p>
              <h2>Una herramienta para cada momento.</h2>
            </div>
            <p>
              No necesitas conocimientos técnicos. Te guiamos paso a paso y te explicamos cómo
              interpretar el resultado.
            </p>
          </div>
          <div className="tools-hub-grid">
            {tools.map((tool) => (
              <Link className="tools-hub-card" href={tool.href} key={tool.title}>
                <div className="tools-hub-card-top">
                  <span>{tool.number}</span>
                  <p className="tools-hub-card-eyebrow">{tool.eyebrow}</p>
                </div>
                <h3>{tool.title}</h3>
                <p>{tool.text}</p>
                <ul aria-label="Características">
                  {tool.meta.map((item) => <li key={item}>{item}</li>)}
                </ul>
                <div className="tools-hub-card-cta">{tool.cta}<span aria-hidden="true">↗</span></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="quick-secondary-cta">
        <div className="quick-shell quick-secondary-cta-card">
          <div>
            <p className="quick-eyebrow">CUANDO NECESITES PROFUNDIZAR</p>
            <h2>De la referencia digital a una estrategia personal.</h2>
            <p>
              Revisamos comparables, precio, presentación y condiciones particulares de tu
              propiedad para convertir el resultado en un plan concreto.
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
