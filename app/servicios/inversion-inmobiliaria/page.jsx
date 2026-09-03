import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import InvestmentAdvisoryForm from '@/components/InvestmentAdvisoryForm';
import InvestmentCalculator from '@/components/InvestmentCalculator';
import TrustindexWidget from '@/components/TrustindexWidget';

export const metadata = {
  title: 'Asesoría para invertir en bienes raíces en Monterrey',
  description:
    'Define tu perfil de inversionista, compara preventas y propiedades, analiza rendimiento, riesgos y financiamiento con Rednorte Inmobiliaria en Nuevo León.',
  alternates: {
    canonical: '/servicios/inversion-inmobiliaria',
  },
  openGraph: {
    title: 'Invierte con una estrategia alineada a tus objetivos | Rednorte',
    description:
      'No empezamos por mostrarte un proyecto. Primero entendemos si buscas flujo, plusvalía, patrimonio, flipping, densificación o crecimiento de activos.',
    url: '/servicios/inversion-inmobiliaria',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Invierte con una estrategia alineada a tus objetivos | Rednorte',
    description:
      'Compara propiedades, preventas, números y riesgos antes de tomar una decisión inmobiliaria en Nuevo León.',
  },
};

const investorProfiles = [
  {
    title: 'Flujo de efectivo',
    description:
      'Buscas una propiedad que produzca renta periódica y quieres entender rendimiento, vacancia, mantenimiento y demanda real.',
  },
  {
    title: 'Plusvalía',
    description:
      'Priorizas el crecimiento potencial del valor del inmueble y estás dispuesto a mantenerlo durante un horizonte determinado.',
  },
  {
    title: 'Patrimonial',
    description:
      'Quieres conservar capital en un activo inmobiliario, diversificar y dejar que la propiedad madure con el tiempo.',
  },
  {
    title: 'Flipping',
    description:
      'Buscas comprar, remodelar y vender; por eso importan el descuento de entrada, costo de obra, tiempo y precio probable de salida.',
  },
  {
    title: 'Densificación',
    description:
      'Analizas terrenos o propiedades con potencial para desarrollar departamentos, unidades rentables u otro proyecto de mayor densidad.',
  },
  {
    title: 'Crecimiento patrimonial',
    description:
      'Buscas adquirir activos por debajo de su valor de avalúo o de mercado para aumentar el valor de tu patrimonio o balance.',
  },
  {
    title: 'Inversión empresarial',
    description:
      'Una empresa puede adquirir uno o varios inmuebles para renta, operación, reserva patrimonial o fortalecimiento de sus activos.',
  },
  {
    title: 'Estrategia combinada',
    description:
      'Puedes buscar flujo y plusvalía, patrimonio y uso futuro, o combinar distintos objetivos dentro de una misma cartera.',
  },
];

const processSteps = [
  {
    title: 'Definimos tu perfil y objetivo',
    description:
      'Antes de hablar de propiedades entendemos qué quieres lograr, en cuánto tiempo, qué liquidez necesitas y qué nivel de riesgo puedes asumir.',
  },
  {
    title: 'Delimitamos capital y condiciones',
    description:
      'Revisamos recursos disponibles, enganche, financiamiento, capacidad de aportaciones, horizonte y necesidades personales o empresariales.',
  },
  {
    title: 'Elegimos la estrategia adecuada',
    description:
      'Determinamos si conviene analizar renta, preventa, terreno, flipping, densificación, activos con descuento u otra combinación.',
  },
  {
    title: 'Investigamos y comparamos alternativas',
    description:
      'No partimos de un solo proyecto. Buscamos opciones, revisamos mercado, condiciones, desarrolladores, contratos y competencia.',
  },
  {
    title: 'Modelamos números y riesgos',
    description:
      'Calculamos escenarios de rendimiento bruto y, cuando avanzamos, incorporamos gastos, vacancia, mantenimiento, impuestos y costos de entrada.',
  },
  {
    title: 'Negociamos y coordinamos la compra',
    description:
      'Acompañamos condiciones, financiamiento, documentación, revisión legal, firma y, en preventa, seguimiento hasta la entrega.',
  },
  {
    title: 'Activamos la siguiente etapa',
    description:
      'Después de comprar podemos apoyar con renta, protección jurídica, reventa o una nueva inversión. El servicio no incluye administración mensual.',
  },
];

const strategies = [
  {
    title: 'Propiedades para renta',
    description:
      'Casas, departamentos y otros inmuebles terminados donde se analizan renta esperada, vacancia, mantenimiento y perfil del inquilino.',
  },
  {
    title: 'Preventa vertical',
    description:
      'Departamentos y proyectos de usos mixtos evaluados según desarrollador, precio por metro cuadrado, esquema de pagos, oferta futura y potencial de renta.',
  },
  {
    title: 'Preventa horizontal',
    description:
      'Casas nuevas y desarrollos habitacionales. Rednorte comercializa activamente opciones de Ruba y otros desarrolladores de vivienda horizontal.',
  },
  {
    title: 'Terrenos patrimoniales',
    description:
      'Activos pensados para conservar y madurar capital, donde el horizonte, accesos, servicios, normatividad y desarrollo de la zona son determinantes.',
  },
  {
    title: 'Propiedades para densificar',
    description:
      'Terrenos o inmuebles que pueden transformarse en departamentos, unidades rentables o proyectos con mayor aprovechamiento del suelo.',
  },
  {
    title: 'Flipping y remodelación',
    description:
      'Compra con descuento, presupuesto de adecuación, plazo de ejecución, impuestos, costo financiero y valor probable de reventa.',
  },
  {
    title: 'Renta de corto plazo',
    description:
      'Opciones donde deben estudiarse regulación, ocupación, operación, estacionalidad, equipamiento y costos de administración.',
  },
  {
    title: 'Comercial e industrial',
    description:
      'Locales, oficinas, bodegas, naves y terrenos con análisis de contrato, inquilino, ubicación, rendimiento y costos operativos.',
  },
  {
    title: 'Activos debajo de valor',
    description:
      'Oportunidades individuales o en paquete cuyo precio puede encontrarse por debajo de un avalúo o referencia de mercado, sujetas a revisión integral.',
  },
  {
    title: 'Portafolios inmobiliarios',
    description:
      'Combinación de varios activos para diversificar flujo, ubicación, tipo de inmueble y horizonte dentro de una estrategia patrimonial o empresarial.',
  },
];

const analysisModels = [
  {
    title: 'Renta y flujo',
    items: [
      'Renta mensual estimada',
      'Rendimiento bruto y neto',
      'Vacancia y absorción',
      'Mantenimiento y gastos recurrentes',
      'Perfil y profundidad de la demanda',
      'Liquidez de reventa',
    ],
  },
  {
    title: 'Preventa',
    items: [
      'Precio por metro cuadrado',
      'Experiencia del desarrollador',
      'Situación del terreno y permisos',
      'Contrato, cancelación y penalizaciones',
      'Esquema de pagos y fecha de entrega',
      'Oferta futura y potencial de renta',
    ],
  },
  {
    title: 'Densificación',
    items: [
      'Uso de suelo y capacidad constructiva',
      'Costo de adquisición y desarrollo',
      'Número de unidades potenciales',
      'Permisos, servicios y tiempos',
      'Precio o renta de salida',
      'Absorción y sensibilidad del proyecto',
    ],
  },
  {
    title: 'Flipping',
    items: [
      'Descuento de compra',
      'Costo de remodelación',
      'Impuestos y gastos de adquisición',
      'Tiempo de ejecución',
      'Precio probable de salida',
      'Margen y contingencia',
    ],
  },
  {
    title: 'Activos con descuento',
    items: [
      'Valor de avalúo y valor de mercado',
      'Condición física y jurídica',
      'Liquidez y profundidad de compradores',
      'Flujo actual o potencial',
      'Costo de regularización o adecuación',
      'Impacto patrimonial sujeto a revisión contable',
    ],
  },
  {
    title: 'Comercial e industrial',
    items: [
      'Renta, plazo y calidad del contrato',
      'Solidez del inquilino',
      'Cap rate o rendimiento',
      'Costos operativos',
      'Ubicación y corredores',
      'Riesgo de desocupación y reposición',
    ],
  },
];

const presaleReviewItems = [
  'Experiencia, proyectos anteriores y reputación del desarrollador',
  'Situación jurídica del terreno, gravámenes, permisos y estructura de la operación',
  'Avance de obra, fecha estimada de entrega y riesgo de retraso',
  'Precio por metro cuadrado y comparación con alternativas',
  'Esquema de pagos, enganche, mensualidades, bonos y condiciones especiales',
  'Contrato, cláusulas de cancelación, penalizaciones y obligaciones de las partes',
  'Inventario disponible, competencia y oferta futura de la zona',
  'Amenidades, mantenimiento, reglamento y administración futura',
  'Disponibilidad de servicios e infraestructura',
  'Demanda de renta, perfil de inquilino y escenario de reventa',
];

const faqs = [
  {
    question: '¿Cómo sé qué tipo de inversión inmobiliaria me conviene?',
    answer:
      'Primero definimos qué quieres lograr: flujo mensual, plusvalía, patrimonio, flipping, densificación, uso futuro, diversificación o crecimiento de activos. Una propiedad puede ser excelente para un objetivo y poco adecuada para otro. Después revisamos capital, horizonte, liquidez y tolerancia al riesgo para elegir la estrategia y los inmuebles que vale la pena analizar.',
  },
  {
    question: '¿Existe un presupuesto mínimo para invertir?',
    answer:
      'No existe un monto universal porque Rednorte analiza desde vivienda horizontal y departamentos hasta terrenos, inmuebles comerciales, industriales, propiedades para remodelar y activos en paquete. El presupuesto debe evaluarse junto con el objetivo, enganche, financiamiento, horizonte y capacidad de sostener gastos o periodos sin flujo.',
  },
  {
    question: '¿Una preventa siempre es una buena inversión?',
    answer:
      'No. Una preventa puede ser adecuada para quien busca un esquema de pagos y apreciación a mediano plazo, pero puede ser inconveniente para quien necesita flujo inmediato o baja tolerancia a retrasos. Revisamos proyecto, desarrollador, contrato, precio, oferta futura, renta probable y riesgos antes de recomendar avanzar. Si una opción no es adecuada para tu perfil, te lo decimos.',
  },
  {
    question: '¿Cómo calcula Rednorte el rendimiento de una propiedad?',
    answer:
      'El análisis inicial suele comenzar con rendimiento bruto: renta anual entre inversión. Cuando una opción avanza, profundizamos con mantenimiento, vacancia, predial, seguros, gastos de adquisición, adecuaciones, financiamiento e impuestos aplicables para construir un escenario neto o más cercano al rendimiento real.',
  },
  {
    question: '¿Rednorte trabaja para una sola desarrolladora?',
    answer:
      'No. En vivienda horizontal comercializamos activamente opciones de Ruba y otros desarrolladores. Para preventa vertical y otros formatos, normalmente investigamos el mercado cuando conocemos el objetivo del cliente y comparamos alternativas, en lugar de comenzar con un proyecto fijo. Cuando existe una relación comercial o comisión, se comunica con transparencia.',
  },
  {
    question: '¿Quién paga la comisión cuando compro una propiedad?',
    answer:
      'En la mayoría de las operaciones la comisión de Rednorte es cubierta por el vendedor o desarrollador, por lo que el comprador normalmente no paga un honorario adicional. Si una asesoría especial requiere una estructura distinta, se informará y acordará por escrito antes de realizarla.',
  },
  {
    question: '¿Rednorte revisa la parte legal de una preventa?',
    answer:
      'Realizamos una revisión inicial de la información disponible, explicamos puntos comerciales del contrato y coordinamos la intervención de abogados, notarios u otros especialistas cuando corresponde. La asesoría inmobiliaria no sustituye un dictamen jurídico, fiscal, contable o financiero independiente.',
  },
  {
    question: '¿Puedo invertir utilizando crédito hipotecario?',
    answer:
      'Sí, dependiendo del inmueble, etapa y perfil del solicitante. Rednorte puede realizar una orientación inicial y canalizar al cliente con SOC Roch para analizar opciones hipotecarias. La aprobación, tasas, montos y condiciones dependen de cada institución financiera y del perfil del cliente.',
  },
  {
    question: '¿Me ayudan después de comprar?',
    answer:
      'Sí. En preventas acompañamos el proceso hasta la entrega. Después podemos ayudar a comercializar la propiedad en renta, coordinar una garantía jurídica con Ávalo o apoyar una futura reventa. Rednorte no ofrece administración mensual de propiedades como parte de este servicio.',
  },
  {
    question: '¿La plusvalía o el rendimiento están garantizados?',
    answer:
      'No. Podemos analizar comportamiento histórico, oferta futura, demanda, riesgos y construir escenarios, pero la plusvalía, renta, ocupación, liquidez y rendimiento futuro no pueden garantizarse. Toda inversión debe evaluarse según sus supuestos, costos, horizonte y condiciones de mercado.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.rednorte.mx/servicios/inversion-inmobiliaria#service',
      name: 'Asesoría para inversión inmobiliaria y preventas',
      serviceType: 'Asesoría inmobiliaria para inversionistas',
      description:
        'Servicio para identificar el perfil del inversionista, investigar y comparar propiedades, preventas y estrategias de inversión en Nuevo León, analizar rendimiento y riesgos y acompañar compra y entrega.',
      url: 'https://www.rednorte.mx/servicios/inversion-inmobiliaria',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Nuevo León',
      },
      provider: {
        '@type': 'RealEstateAgent',
        name: 'Rednorte Inmobiliaria',
        url: 'https://www.rednorte.mx/',
        telephone: '+52 81 1778 3953',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Av. José Vasconcelos Ote. 215, Local 7, Residencial San Agustín 1er Sector',
          addressLocality: 'San Pedro Garza García',
          addressRegion: 'Nuevo León',
          postalCode: '66260',
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
          name: 'Inversión inmobiliaria',
          item: 'https://www.rednorte.mx/servicios/inversion-inmobiliaria',
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

export default function InversionInmobiliariaPage() {
  return (
    <div className="page-content invest-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Breadcrumb
        items={[
          { label: 'Servicios', href: '/servicios' },
          { label: 'Inversión inmobiliaria' },
        ]}
      />

      <main>
        <section className="invest-hero">
          <div className="invest-shell invest-hero-grid">
            <div className="invest-hero-copy">
              <p className="section-label invest-label-light">Asesoría para inversionistas</p>
              <h1>Invierte en bienes raíces con una estrategia alineada a tus objetivos</h1>
              <p className="invest-hero-lead">
                No empezamos por mostrarte un proyecto. Primero entendemos si buscas flujo, plusvalía, patrimonio, flipping, densificación o crecimiento de activos.
              </p>
              <p className="invest-hero-support">
                Analizamos propiedades terminadas, preventas verticales y horizontales, terrenos, inmuebles para renta, oportunidades para remodelar, activos comerciales, industriales e inversiones individuales o en paquete en Nuevo León.
              </p>

              <div className="invest-actions">
                <a
                  className="invest-btn invest-btn-primary"
                  href="#solicitar-analisis"
                  data-event="investment_primary_cta_click"
                >
                  Quiero analizar una inversión
                </a>
                <a
                  className="invest-btn invest-btn-secondary"
                  href="#perfil-inversionista"
                  data-event="investment_profile_cta_click"
                >
                  Identificar mi perfil
                </a>
              </div>

              <Link className="invest-inline-link invest-inline-link-light" href="/propiedades">
                Ver propiedades disponibles →
              </Link>
            </div>

            <aside className="invest-hero-panel" aria-label="Método de inversión Rednorte">
              <p className="invest-hero-panel-kicker">La propiedad viene después del objetivo</p>
              <div className="invest-hero-path">
                <span>01</span>
                <strong>Definir qué quieres lograr</strong>
                <span>02</span>
                <strong>Elegir la estrategia adecuada</strong>
                <span>03</span>
                <strong>Comparar números, riesgos y alternativas</strong>
                <span>04</span>
                <strong>Acompañar compra, entrega y siguiente etapa</strong>
              </div>
              <p>
                Una inversión puede ser adecuada para un objetivo y poco conveniente para otro. Por eso cada recomendación debe partir de tu perfil.
              </p>
            </aside>
          </div>
        </section>

        <section id="perfil-inversionista" className="invest-section invest-profile-section">
          <div className="invest-shell">
            <div className="invest-section-heading invest-section-heading-wide">
              <p className="section-label">Antes de elegir una propiedad</p>
              <h2 className="invest-section-title">Primero identificamos qué tipo de inversionista eres</h2>
              <p>
                Un terreno puede ser una excelente inversión para quien busca patrimonio o densificación y una mala opción para quien necesita flujo inmediato. Lo mismo ocurre con una preventa, una propiedad para remodelar o un activo comercial. Puedes combinar objetivos, pero primero necesitamos reconocerlos.
              </p>
            </div>

            <div className="invest-profile-grid">
              {investorProfiles.map((profile, index) => (
                <article className="invest-profile-card" key={profile.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{profile.title}</h3>
                  <p>{profile.description}</p>
                </article>
              ))}
            </div>

            <div className="invest-centered-action">
              <a className="invest-btn invest-btn-primary" href="#solicitar-analisis">
                Quiero identificar mi estrategia
              </a>
            </div>
          </div>
        </section>

        <section className="invest-section invest-dark-section">
          <div className="invest-shell">
            <div className="invest-section-heading">
              <p className="section-label invest-label-light">Metodología Rednorte</p>
              <h2 className="invest-section-title invest-title-light">Del objetivo a una decisión comparada</h2>
              <p className="invest-copy-light">
                Nuestro trabajo no consiste en mostrar inventario indiscriminadamente. Construimos un proceso para reducir decisiones impulsivas y comparar alternativas con criterios acordes al tipo de inversión.
              </p>
            </div>

            <div className="invest-process-grid">
              {processSteps.map((step, index) => (
                <article className="invest-process-card" key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="invest-section">
          <div className="invest-shell">
            <div className="invest-section-heading invest-section-heading-wide">
              <p className="section-label">Estrategias que analizamos</p>
              <h2 className="invest-section-title">No existe una sola forma de invertir en inmuebles</h2>
              <p>
                El presupuesto, horizonte, liquidez y objetivo cambian completamente el tipo de activo que conviene estudiar. Por eso esta página no establece un monto mínimo universal ni limita la asesoría a un solo formato.
              </p>
            </div>

            <div className="invest-strategy-grid">
              {strategies.map((strategy) => (
                <article className="invest-strategy-card" key={strategy.title}>
                  <h3>{strategy.title}</h3>
                  <p>{strategy.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="invest-section invest-models-section">
          <div className="invest-shell">
            <div className="invest-section-heading invest-section-heading-wide">
              <p className="section-label">Cada estrategia se calcula diferente</p>
              <h2 className="invest-section-title">Las métricas correctas dependen del objetivo</h2>
              <p>
                El rendimiento bruto es un buen punto de partida, pero no basta. Cuando una opción avanza, incorporamos costos, riesgos y variables específicas para construir un escenario más cercano a la realidad.
              </p>
            </div>

            <div className="invest-analysis-grid">
              {analysisModels.map((model) => (
                <article className="invest-analysis-card" key={model.title}>
                  <h3>{model.title}</h3>
                  <ul>
                    {model.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="invest-section invest-calculator-section">
          <div className="invest-shell invest-calculator-layout">
            <div className="invest-calculator-copy">
              <p className="section-label">Calculadora inicial</p>
              <h2 className="invest-section-title">Construye un escenario de rendimiento por renta</h2>
              <p>
                Ingresa los datos principales para estimar rendimiento bruto, flujo neto y rendimiento neto aproximado. Es una herramienta de orientación: no sustituye un análisis financiero, fiscal o legal personalizado.
              </p>
              <ul>
                <li>El rendimiento bruto compara renta anual contra inversión total.</li>
                <li>El escenario neto descuenta vacancia y gastos operativos capturados.</li>
                <li>No incorpora plusvalía, financiamiento ni impuestos sobre ingresos.</li>
              </ul>
            </div>

            <InvestmentCalculator />
          </div>
        </section>

        <section className="invest-section invest-presale-section">
          <div className="invest-shell invest-presale-grid">
            <div>
              <p className="section-label invest-label-light">Preventas con criterio</p>
              <h2 className="invest-section-title invest-title-light">No estamos casados con una sola desarrolladora</h2>
              <p className="invest-copy-light">
                En vivienda horizontal comercializamos activamente opciones de Ruba y otros desarrolladores. En preventa vertical y otros formatos, normalmente investigamos el mercado después de conocer el objetivo del cliente y presentamos alternativas, en lugar de empezar por un proyecto fijo.
              </p>
              <p className="invest-copy-light">
                Si una preventa no corresponde con tu estrategia, horizonte o tolerancia al riesgo, te lo decimos. La recomendación debe partir de tu perfil, no de la necesidad de colocar una unidad.
              </p>
              <div className="invest-presale-note">
                En la mayoría de las operaciones, la comisión es cubierta por el desarrollador o vendedor. Las relaciones comerciales y cualquier excepción se informan con transparencia.
              </div>
            </div>

            <div className="invest-presale-checklist">
              <h3>¿Qué revisamos antes de recomendar una preventa?</h3>
              <ul>
                {presaleReviewItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="invest-section">
          <div className="invest-shell">
            <div className="invest-section-heading">
              <p className="section-label">Empresas y portafolios</p>
              <h2 className="invest-section-title">Activos inmobiliarios para fortalecer patrimonio y valor empresarial</h2>
              <p>
                También asesoramos a empresas que buscan adquirir uno o varios inmuebles para renta, operación, reserva patrimonial o crecimiento de activos. El análisis puede incluir oportunidades por debajo de valor de avalúo o mercado, siempre considerando condición, liquidez, costos y riesgos.
              </p>
            </div>

            <div className="invest-corporate-grid">
              <article>
                <h3>Adquisición individual</h3>
                <p>Un inmueble específico para operación, renta, patrimonio o desarrollo futuro.</p>
              </article>
              <article>
                <h3>Compra en paquete</h3>
                <p>Varias unidades o activos que requieren revisión de precio, condición, flujo y estrategia de salida.</p>
              </article>
              <article>
                <h3>Compra debajo de referencia</h3>
                <p>Comparación contra avalúos, mercado y costos necesarios para materializar el valor potencial.</p>
              </article>
              <article>
                <h3>Impacto empresarial</h3>
                <p>La repercusión contable, fiscal y financiera debe ser validada por los especialistas de la empresa.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="invest-section invest-support-section">
          <div className="invest-shell">
            <div className="invest-section-heading invest-section-heading-wide">
              <p className="section-label">Acompañamiento completo</p>
              <h2 className="invest-section-title">De la búsqueda a la entrega y la puesta en operación</h2>
            </div>

            <div className="invest-support-grid">
              <article>
                <h3>Negociación</h3>
                <p>Buscamos descuentos, planes de pago, bonos, equipamiento y condiciones favorables cuando existe margen comercial.</p>
              </article>
              <article>
                <h3>Financiamiento</h3>
                <p>Realizamos orientación inicial y podemos canalizar con SOC Roch para analizar opciones hipotecarias sujetas a aprobación.</p>
              </article>
              <article>
                <h3>Revisión y coordinación</h3>
                <p>Revisamos información inicial y coordinamos abogados, notarios y especialistas cuando la operación requiere mayor profundidad.</p>
              </article>
              <article>
                <h3>Seguimiento hasta la entrega</h3>
                <p>En preventas acompañamos la comunicación y los momentos clave desde la separación hasta la entrega del inmueble.</p>
              </article>
              <article>
                <h3>Renta y protección jurídica</h3>
                <p>Después de comprar, Rednorte puede comercializar el inmueble en renta y coordinar una garantía jurídica mediante Ávalo.</p>
              </article>
              <article>
                <h3>Reventa y siguiente inversión</h3>
                <p>Podemos apoyar una futura reventa o ayudarte a evaluar cómo integrar el activo dentro de una cartera más amplia.</p>
              </article>
            </div>

            <p className="invest-callout-note">
              Rednorte no ofrece administración mensual de propiedades como parte de este servicio. La asesoría inmobiliaria tampoco sustituye asesoría jurídica, fiscal, contable o financiera independiente.
            </p>
          </div>
        </section>

        <section className="invest-section invest-reviews-section">
          <div className="invest-shell">
            <div className="invest-section-heading invest-section-heading-centered">
              <p className="section-label">Experiencias de clientes</p>
              <h2 className="invest-section-title">Decisiones acompañadas por el equipo de Rednorte</h2>
            </div>

            <div
              id="investment-reviews-slot"
              className="invest-reviews-slot"
              data-component="google-reviews"
            >
              <TrustindexWidget />
            </div>
          </div>
        </section>

        <section className="invest-section invest-faq-section">
          <div className="invest-shell">
            <div className="invest-section-heading invest-section-heading-centered">
              <p className="section-label">Preguntas frecuentes</p>
              <h2 className="invest-section-title">Dudas antes de invertir en bienes raíces</h2>
              <p>Respuestas sobre perfiles, preventas, rendimiento, financiamiento, comisiones y riesgos.</p>
            </div>

            <div className="invest-faq-list">
              {faqs.map((faq, index) => (
                <details
                  className="invest-faq-item"
                  key={faq.question}
                  open={index === 0}
                  data-event="investment_faq_expand"
                >
                  <summary>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{faq.question}</strong>
                    <i aria-hidden="true">+</i>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className="invest-centered-action">
              <Link className="invest-btn invest-btn-primary" href="/preguntas-frecuentes">
                Ver todas las preguntas frecuentes
              </Link>
            </div>
          </div>
        </section>

        <section id="solicitar-analisis" className="invest-section invest-form-section">
          <div className="invest-shell invest-form-grid">
            <div className="invest-form-copy">
              <p className="section-label invest-label-light">Hablemos de tus objetivos</p>
              <h2 className="invest-section-title invest-title-light">Cuéntanos qué buscas lograr con tu inversión</h2>
              <p className="invest-copy-light">
                No necesitas llegar con una propiedad elegida ni con un presupuesto cerrado. Comparte tus objetivos y condiciones para que un integrante de Rednorte pueda ayudarte a definir el siguiente paso.
              </p>
              <div className="invest-form-points">
                <span>Perfil y objetivos</span>
                <span>Estrategias e inmuebles de interés</span>
                <span>Horizonte, capital y financiamiento</span>
                <span>Investigación y comparación de alternativas</span>
              </div>
            </div>

            <InvestmentAdvisoryForm />
          </div>
        </section>

        <section className="invest-section invest-related-section">
          <div className="invest-shell">
            <div className="invest-section-heading">
              <p className="section-label">También puede interesarte</p>
              <h2 className="invest-section-title">Explora otros recursos de Rednorte</h2>
            </div>

            <div className="invest-related-grid">
              <Link href="/propiedades">Ver propiedades disponibles</Link>
              <Link href="/servicios">Inmuebles comerciales e industriales</Link>
              <Link href="/servicios/rentar-propiedad">Rentar una propiedad</Link>
              <Link href="/herramientas/estimacion-de-valor">Estimación de valor</Link>
              <Link href="/nosotros">Conoce Rednorte</Link>
              <Link href="/contacto">Hablar con un asesor</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
