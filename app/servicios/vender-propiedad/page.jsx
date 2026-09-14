import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import SellPropertyForm from '@/components/SellPropertyForm';
import TrustindexWidget from '@/components/TrustindexWidget';
import { SITE_CONTACT } from '@/lib/siteConfig';

export const metadata = {
  title: 'Vender una propiedad en Monterrey',
  description:
    'Vende tu casa, departamento, terreno o inmueble comercial en Monterrey con estrategia de precio, promoción, negociación y acompañamiento de Rednorte.',
  alternates: {
    canonical: '/servicios/vender-propiedad',
  },
  openGraph: {
    title: 'Vende tu propiedad con estrategia | Rednorte Inmobiliaria',
    description:
      'Analizamos valor, vendibilidad, presentación, promoción y negociación para posicionar tu propiedad en el mercado de Monterrey.',
    url: '/servicios/vender-propiedad',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vende tu propiedad con estrategia | Rednorte Inmobiliaria',
    description:
      'Analizamos valor, vendibilidad, presentación, promoción y negociación para posicionar tu propiedad en el mercado de Monterrey.',
  },
};

const SALES_DATA = {
  soldProperties: 68,
  totalValueShort: '+$306 MDP',
  averageValueShort: '$4.5 MDP',
  totalValueExact: '$306,248,200 MXN',
  averageValueExact: '$4,503,650 MXN',
  period: 'del 1 de enero al 22 de agosto de 2026',
};

const processSteps = [
  {
    title: 'Entendemos tus objetivos',
    description:
      'Conocemos la propiedad, el motivo de venta, los tiempos esperados, las condiciones particulares y el resultado que buscas.',
  },
  {
    title: 'Analizamos valor y vendibilidad',
    description:
      'Revisamos ubicación, características, competencia, precio, presentación, documentación y demanda para identificar fortalezas y riesgos.',
  },
  {
    title: 'Definimos la estrategia comercial',
    description:
      'Acordamos posicionamiento, precio de salida, alcance del servicio, materiales, promoción y esquema de colaboración.',
  },
  {
    title: 'Preparamos y promovemos la propiedad',
    description:
      'Realizamos el levantamiento de información y fotografías y activamos las acciones que aporten valor a la estrategia.',
  },
  {
    title: 'Perfilamos, mostramos y negociamos',
    description:
      'Atendemos interesados, coordinamos visitas, recopilamos retroalimentación y acompañamos la recepción y negociación de ofertas.',
  },
  {
    title: 'Coordinamos el cierre',
    description:
      'Damos seguimiento a documentación, créditos, avalúos, contratos, notaría, pagos y demás participantes hasta concluir la operación.',
  },
];

const serviceGroups = [
  {
    title: 'Diagnóstico y estrategia',
    items: [
      'Estimación inicial de valor',
      'Análisis de propiedades comparables',
      'Evaluación de precio y posicionamiento',
      'Reporte de vendibilidad',
      'Estrategia personalizada',
      'Orientación fiscal inicial',
    ],
  },
  {
    title: 'Revisión y preparación',
    items: [
      'Levantamiento de información',
      'Revisión inicial de documentación',
      'Levantamiento fotográfico',
      'Elaboración de ficha comercial',
      'Video y drone cuando aporten valor',
      'Coordinación de gestorías cuando sean necesarias',
    ],
  },
  {
    title: 'Promoción y exposición',
    items: [
      'Inventario y canales de Rednorte',
      'Portales inmobiliarios',
      'Difusión digital',
      'Red de colaboración inmobiliaria',
      'Pauta pagada cuando la estrategia lo justifique',
      'Lona, letrero u open house cuando convenga',
    ],
  },
  {
    title: 'Prospectos y negociación',
    items: [
      'Atención de solicitudes',
      'Perfilamiento de clientes',
      'Coordinación de visitas',
      'Seguimiento a interesados',
      'Recepción y análisis de ofertas',
      'Negociación y reportes al propietario',
    ],
  },
  {
    title: 'Coordinación del cierre',
    items: [
      'Orientación inicial sobre crédito hipotecario',
      'Seguimiento de documentación',
      'Coordinación con bancos, valuadores y notarios',
      'Acompañamiento en contratos y formalización',
      'Seguimiento hasta el cierre y pago',
    ],
  },
];

const faqs = [
  {
    question: '¿Cuánto cobra Rednorte por vender una propiedad?',
    answer:
      'Los honorarios normalmente se encuentran entre el 3% y el 5% del valor de la operación. El porcentaje depende del tipo de propiedad, alcance del servicio, estrategia comercial y esquema de colaboración. Antes de iniciar se establecen por escrito la estrategia, condiciones, honorarios y responsabilidades de las partes.',
  },
  {
    question: '¿Es obligatorio dar la propiedad en exclusiva?',
    answer:
      'No en todos los casos. Rednorte puede trabajar distintos esquemas de comercialización. La exclusividad sí es necesaria en estrategias Master Broker o cuando se requiere una coordinación comercial centralizada con una sola estrategia, información consistente y control de prospectos, visitas y negociaciones.',
  },
  {
    question: '¿Cuánto tiempo tarda en venderse una propiedad?',
    answer:
      'No existe un plazo universal. Depende del precio, ubicación, tipo de inmueble, estado, documentación, demanda, competencia, facilidad para realizar visitas y condiciones de negociación. Analizamos estas variables para plantear un escenario inicial y ajustar la estrategia según la respuesta real del mercado.',
  },
  {
    question: '¿Cómo se determina el precio de salida?',
    answer:
      'Revisamos las características del inmueble, ubicación, superficies, estado, oferta comparable, condiciones comerciales y comportamiento del mercado. El precio debe considerar cómo compite la propiedad y qué rango puede sostenerse con información disponible.',
  },
  {
    question: '¿Qué es una estrategia Master Broker?',
    answer:
      'Es un esquema en el que Rednorte concentra la coordinación de la comercialización y amplía la exposición mediante una red de colaboración inmobiliaria. La propiedad mantiene una estrategia central, información consistente, control de prospectos y seguimiento coordinado. Este modelo requiere exclusividad.',
  },
  {
    question: '¿Qué documentos necesito para vender?',
    answer:
      'Los requisitos varían según la propiedad y el propietario. Generalmente se revisan escritura, identificaciones, situación fiscal, predial, servicios, posibles gravámenes y documentación de condominio cuando corresponda. Notaría, bancos o autoridades pueden solicitar documentos adicionales.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.rednorte.mx/servicios/vender-propiedad#service',
      name: 'Venta y comercialización de propiedades',
      serviceType: 'Servicios inmobiliarios para propietarios',
      description:
        'Servicio de análisis, posicionamiento, promoción, negociación y coordinación de cierre para propietarios que desean vender un inmueble en Monterrey y Nuevo León.',
      url: 'https://www.rednorte.mx/servicios/vender-propiedad',
      areaServed: [
        { '@type': 'City', name: 'Monterrey' },
        { '@type': 'AdministrativeArea', name: 'Nuevo León' },
      ],
      provider: {
        '@type': 'RealEstateAgent',
        name: 'Rednorte Inmobiliaria',
        url: 'https://www.rednorte.mx/',
        telephone: '+52 81 1778 3953',
        address: {
          '@type': 'PostalAddress',
          streetAddress: `${SITE_CONTACT.address.streetAddress}, ${SITE_CONTACT.address.neighborhood}`,
          addressLocality: SITE_CONTACT.address.locality,
          addressRegion: SITE_CONTACT.address.region,
          postalCode: SITE_CONTACT.address.postalCode,
          addressCountry: 'MX',
        },
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Inicio',
          item: 'https://www.rednorte.mx/',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Servicios',
          item: 'https://www.rednorte.mx/servicios',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Vender una propiedad',
          item: 'https://www.rednorte.mx/servicios/vender-propiedad',
        },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: faqs.map((faq) => ({
        '@type': 'Question',
        name: faq.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.answer,
        },
      })),
    },
  ],
};

export default function VenderPropiedadPage() {
  return (
    <div className="page-content sell-property-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Breadcrumb
        items={[
          { label: 'Servicios', href: '/servicios' },
          { label: 'Vender una propiedad' },
        ]}
      />

      <main>
        <section className="sell-hero">
          <div className="sell-shell sell-hero-grid">
            <div className="sell-hero-copy">
              <p className="section-label sell-label-light">Servicio para propietarios</p>
              <h1>Vende tu propiedad en Monterrey con una estrategia diseñada para su mercado</h1>
              <p className="sell-hero-lead">
                Analizamos valor, competencia, presentación y demanda antes de definir cómo posicionar y comercializar cada inmueble.
              </p>
              <p className="sell-hero-support">
                Casas, departamentos, terrenos, locales, oficinas, bodegas y propiedades industriales en Monterrey, su área metropolitana y otros municipios de Nuevo León.
              </p>
              <div className="sell-actions">
                <a
                  className="sell-btn sell-btn-primary"
                  href="#solicitar-diagnostico"
                  data-event="sell_property_primary_cta_click"
                >
                  Quiero vender mi propiedad
                </a>
                <Link
                  className="sell-btn sell-btn-secondary"
                  href="/herramientas/estimacion-de-valor"
                  data-event="sell_property_valuation_click"
                >
                  Estimar el valor de mi propiedad
                </Link>
              </div>
              <Link
                className="sell-inline-link sell-inline-link-light"
                href="/herramientas/reporte-de-vendibilidad"
                data-event="sell_property_vendibility_click"
              >
                Evaluar qué tan vendible es mi propiedad →
              </Link>
            </div>

            <div className="sell-hero-panel" aria-label="Proceso de venta con Rednorte">
              <p className="sell-hero-panel-kicker">Una estrategia completa</p>
              <div className="sell-hero-path">
                <span>01</span><strong>Diagnóstico</strong>
                <span>02</span><strong>Posicionamiento</strong>
                <span>03</span><strong>Exposición</strong>
                <span>04</span><strong>Negociación y cierre</strong>
              </div>
              <p>
                No publicamos por publicar. Definimos qué necesita la propiedad para competir mejor en su mercado.
              </p>
            </div>
          </div>
        </section>

        <section className="sell-section sell-results-section" aria-labelledby="sell-results-title">
          <div className="sell-shell">
            <p className="section-label">Resultados 2026</p>
            <h2 id="sell-results-title" className="sell-section-title">Experiencia respaldada por operaciones cerradas</h2>
            <div className="sell-stats-grid">
              <article className="sell-stat-card">
                <strong>{SALES_DATA.soldProperties}</strong>
                <span>Propiedades vendidas</span>
              </article>
              <article className="sell-stat-card">
                <strong>{SALES_DATA.totalValueShort}</strong>
                <span>En valor de propiedades vendidas</span>
              </article>
              <article className="sell-stat-card">
                <strong>{SALES_DATA.averageValueShort}</strong>
                <span>Valor promedio por propiedad vendida</span>
              </article>
            </div>
            <p className="sell-method-note">
              Datos internos de operaciones de compraventa cerradas y registradas por Rednorte Inmobiliaria {SALES_DATA.period}. El valor total registrado es de {SALES_DATA.totalValueExact} y el valor promedio por operación es de {SALES_DATA.averageValueExact}. No incluye arrendamientos.
            </p>
          </div>
        </section>

        <section className="sell-section sell-positioning-section" aria-labelledby="sell-positioning-title">
          <div className="sell-shell">
            <div className="sell-section-heading">
              <p className="section-label">Más que publicar</p>
              <h2 id="sell-positioning-title" className="sell-section-title">No solo publicamos tu propiedad. La posicionamos para venderla.</h2>
              <p>
                Un precio mal definido, fotografías poco atractivas, documentación incompleta o una estrategia sin seguimiento pueden hacer que el inmueble pierda tiempo, interés y capacidad de negociación.
              </p>
            </div>
            <div className="sell-feature-grid sell-feature-grid-three">
              <article className="sell-feature-card">
                <span className="sell-feature-number">01</span>
                <h3>Precio y posicionamiento</h3>
                <p>Analizamos el inmueble, su ubicación, oferta comparable y condiciones del mercado para construir una estrategia de precio congruente.</p>
              </article>
              <article className="sell-feature-card">
                <span className="sell-feature-number">02</span>
                <h3>Presentación y preparación</h3>
                <p>Revisamos cómo comunicar mejor el valor de la propiedad y qué materiales o ajustes pueden fortalecer su presentación.</p>
              </article>
              <article className="sell-feature-card">
                <span className="sell-feature-number">03</span>
                <h3>Exposición y seguimiento</h3>
                <p>Seleccionamos canales, atendemos prospectos, coordinamos visitas y ajustamos la estrategia según la respuesta real del mercado.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="sell-section sell-dark-section" aria-labelledby="sell-process-title">
          <div className="sell-shell">
            <p className="section-label sell-label-light">Cómo trabajamos</p>
            <h2 id="sell-process-title" className="sell-section-title sell-title-light">Un proceso claro desde el análisis hasta el cierre</h2>
            <p className="sell-section-intro sell-copy-light">
              Cada propiedad necesita una estrategia diferente. Nuestro proceso permite tomar decisiones con información y mantener al propietario acompañado durante toda la comercialización.
            </p>
            <div className="sell-process-grid">
              {processSteps.map((step, index) => (
                <article className="sell-process-card" key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="sell-section" aria-labelledby="sell-includes-title">
          <div className="sell-shell">
            <div className="sell-section-heading">
              <p className="section-label">Servicio integral</p>
              <h2 id="sell-includes-title" className="sell-section-title">Lo que Rednorte puede hacer para comercializar tu propiedad</h2>
              <p>El alcance se adapta al tipo de inmueble, su condición, ubicación y estrategia acordada. No todas las propiedades necesitan exactamente las mismas acciones.</p>
            </div>
            <div className="sell-service-grid">
              {serviceGroups.map((group) => (
                <article className="sell-service-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <p className="sell-callout-note">
              Video, drone, pauta, open house, señalización, gestorías y otras acciones se utilizan únicamente cuando las características de la propiedad y la estrategia comercial lo justifican.
            </p>
          </div>
        </section>

        <section className="sell-section sell-strategy-section" aria-labelledby="sell-strategy-title">
          <div className="sell-shell">
            <p className="section-label">Una estrategia para cada propiedad</p>
            <h2 id="sell-strategy-title" className="sell-section-title">Elige el nivel de exposición y coordinación que necesita tu inmueble</h2>
            <div className="sell-strategy-grid">
              <article className="sell-strategy-card">
                <p className="sell-card-eyebrow">Esquema flexible</p>
                <h3>Comercialización coordinada por Rednorte</h3>
                <p>Analizamos, preparamos, promocionamos y damos seguimiento a la propiedad mediante los canales definidos para su estrategia.</p>
                <ul>
                  <li>La exclusividad no es obligatoria en todos los casos.</li>
                  <li>El alcance y las condiciones se acuerdan por escrito.</li>
                  <li>Se adapta a la complejidad y necesidades del inmueble.</li>
                </ul>
              </article>
              <article className="sell-strategy-card sell-strategy-card-featured">
                <p className="sell-card-eyebrow">Mayor coordinación</p>
                <h3>Estrategia Master Broker</h3>
                <p>Rednorte concentra la coordinación y amplía la exposición mediante una red de colaboración inmobiliaria.</p>
                <ul>
                  <li>Requiere exclusividad.</li>
                  <li>Mantiene una sola estrategia e información consistente.</li>
                  <li>Centraliza prospectos, visitas y negociaciones.</li>
                </ul>
                <p className="sell-small-disclaimer">
                  Una mayor exposición puede aumentar las oportunidades de contacto, pero no garantiza la venta, un precio específico ni un plazo determinado.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="sell-section sell-fees-section" aria-labelledby="sell-fees-title">
          <div className="sell-shell sell-two-column">
            <div>
              <p className="section-label">Condiciones claras</p>
              <h2 id="sell-fees-title" className="sell-section-title">Honorarios de comercialización</h2>
              <p>
                Los honorarios normalmente se encuentran entre el <strong>3% y el 5% del valor de la operación</strong>, dependiendo del tipo de propiedad, alcance del servicio, estrategia comercial y esquema de colaboración acordado.
              </p>
              <p>Antes de iniciar tendrás claridad sobre estrategia, alcance, honorarios, vigencia, exclusividad cuando corresponda y responsabilidades de las partes.</p>
            </div>
            <aside className="sell-fee-card">
              <span>Rango habitual</span>
              <strong>3%–5%</strong>
              <p>La exclusividad no es obligatoria en todos los servicios, pero sí en el esquema Master Broker.</p>
            </aside>
          </div>
        </section>

        <section className="sell-section sell-tools-section" aria-labelledby="sell-tools-title">
          <div className="sell-shell">
            <p className="section-label">Conoce mejor tu propiedad</p>
            <h2 id="sell-tools-title" className="sell-section-title">Empieza con información antes de tomar una decisión</h2>
            <div className="sell-tools-grid">
              <article className="sell-tool-card">
                <span className="sell-tool-badge">Herramienta gratuita</span>
                <h3>Estima el valor de tu propiedad</h3>
                <p>Obtén un rango inicial con base en las características del inmueble y referencias disponibles del mercado.</p>
                <Link className="sell-btn sell-btn-primary" href="/herramientas/estimacion-de-valor" data-event="sell_property_valuation_click">
                  Estimar el valor de mi propiedad
                </Link>
                <small>La estimación es informativa y no constituye un avalúo certificado, bancario, fiscal, judicial o catastral.</small>
              </article>
              <article className="sell-tool-card sell-tool-card-dark">
                <span className="sell-tool-badge">Diagnóstico gratuito</span>
                <h3>Descubre qué tan vendible es tu propiedad</h3>
                <p>Evalúa precio, presentación, fotografías, documentación y estrategia comercial para detectar qué puede estar ayudando o frenando su venta.</p>
                <Link className="sell-btn sell-btn-light" href="/herramientas/reporte-de-vendibilidad" data-event="sell_property_vendibility_click">
                  Obtener mi reporte de vendibilidad
                </Link>
                <small>El resultado es una orientación y no garantiza la venta, un precio o un plazo determinado.</small>
              </article>
            </div>
          </div>
        </section>

        <section className="sell-section" aria-labelledby="sell-followup-title">
          <div className="sell-shell sell-info-grid">
            <article className="sell-info-card">
              <p className="section-label">Seguimiento</p>
              <h2 id="sell-followup-title">Información para tomar decisiones durante la comercialización</h2>
              <p>Los reportes pueden incluir prospectos atendidos, visitas, retroalimentación, ofertas, observaciones de precio y siguientes acciones.</p>
              <p>El objetivo no es solamente enviar actividad, sino interpretar la respuesta del mercado para decidir si la estrategia debe mantenerse o ajustarse.</p>
            </article>
            <article className="sell-info-card">
              <p className="section-label">Antes de salir al mercado</p>
              <h2>¿Qué documentos pueden necesitarse?</h2>
              <ul>
                <li>Escritura o documento de propiedad.</li>
                <li>Identificación y situación fiscal.</li>
                <li>Predial, servicios y documentación de condominio.</li>
                <li>Información sobre gravámenes o créditos.</li>
                <li>Documentación adicional solicitada por notaría, banco o autoridad.</li>
              </ul>
              <p className="sell-small-disclaimer">La lista es orientativa y se revisa según cada operación.</p>
            </article>
          </div>
        </section>

        <section className="sell-section sell-reviews-section" aria-labelledby="sell-reviews-title">
          <div className="sell-shell">
            <p className="section-label">Experiencias de clientes</p>
            <h2 id="sell-reviews-title" className="sell-section-title">Lo que dicen quienes han trabajado con Rednorte</h2>
            <p className="sell-section-intro">Conoce experiencias reales de propietarios, compradores y clientes que han recibido acompañamiento de nuestro equipo.</p>
            <div id="sell-property-reviews-slot" data-component="google-reviews">
              <TrustindexWidget />
            </div>
          </div>
        </section>

        <section className="sell-section sell-faq-section" aria-labelledby="sell-faq-title">
          <div className="sell-shell sell-faq-shell">
            <p className="section-label">Preguntas frecuentes</p>
            <h2 id="sell-faq-title" className="sell-section-title">Dudas comunes antes de vender una propiedad</h2>
            <div className="sell-faq-list">
              {faqs.map((faq, index) => (
                <details className="sell-faq-item" key={faq.question} open={index === 0} data-event="sell_property_faq_expand">
                  <summary>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{faq.question}</strong>
                  </summary>
                  <div className="sell-faq-answer"><p>{faq.answer}</p></div>
                </details>
              ))}
            </div>
            <div className="sell-centered-action">
              <Link className="sell-inline-link" href="/preguntas-frecuentes">Ver todas las preguntas frecuentes →</Link>
            </div>
          </div>
        </section>

        <section id="solicitar-diagnostico" className="sell-section sell-form-section" aria-labelledby="sell-form-title">
          <div className="sell-shell sell-form-grid">
            <div className="sell-form-copy">
              <p className="section-label sell-label-light">Hablemos de tu propiedad</p>
              <h2 id="sell-form-title" className="sell-section-title sell-title-light">Cuéntanos qué quieres vender</h2>
              <p>Compártenos los datos principales del inmueble. Un integrante de Rednorte revisará la información y se comunicará contigo para conocer tus objetivos y definir el siguiente paso.</p>
              <div className="sell-form-points">
                <span>Diagnóstico inicial</span>
                <span>Estrategia personalizada</span>
                <span>Acompañamiento profesional</span>
              </div>
            </div>
            <SellPropertyForm />
          </div>
        </section>

        <section className="sell-related-section" aria-labelledby="sell-related-title">
          <div className="sell-shell">
            <h2 id="sell-related-title">También puede interesarte</h2>
            <div className="sell-related-links">
              <Link href="/herramientas/estimacion-de-valor">Estimación de valor</Link>
              <Link href="/herramientas/reporte-de-vendibilidad">Reporte de vendibilidad</Link>
              <Link href="/servicios/rentar-propiedad">Rentar una propiedad</Link>
              <Link href="/servicios/inversion-inmobiliaria">Inversión inmobiliaria</Link>
              <Link href="/servicios">Comercial e industrial</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
