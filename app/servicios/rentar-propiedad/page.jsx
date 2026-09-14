import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import RentPropertyForm from '@/components/RentPropertyForm';
import TrustindexWidget from '@/components/TrustindexWidget';
import { SITE_CONTACT } from '@/lib/siteConfig';

export const metadata = {
  title: 'Rentar una propiedad en Monterrey',
  description:
    'Renta tu casa, departamento o inmueble comercial en Monterrey con estimación de renta, promoción, investigación de candidatos, contrato y entrega.',
  alternates: {
    canonical: '/servicios/rentar-propiedad',
  },
  openGraph: {
    title: 'Renta tu propiedad con estrategia e investigación | Rednorte Inmobiliaria',
    description:
      'Definimos el precio de renta, promovemos el inmueble, perfilamos e investigamos candidatos y coordinamos contrato y entrega.',
    url: '/servicios/rentar-propiedad',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Renta tu propiedad con estrategia e investigación | Rednorte Inmobiliaria',
    description:
      'Definimos el precio de renta, promovemos el inmueble, perfilamos e investigamos candidatos y coordinamos contrato y entrega.',
  },
};

const RENTAL_DATA = {
  rentedProperties: 331,
  monthlyRentSumShort: 'Más de $9.1 MDP',
  averageMonthlyRentShort: '$27,564',
  monthlyRentSumExact: '$9,123,608.02 MXN',
  averageMonthlyRentExact: '$27,563.77 MXN',
  minimumMonthlyRent: '$6,600 MXN',
  maximumMonthlyRent: '$170,000 MXN',
  period: 'del 1 de enero al 22 de agosto de 2026',
};

const processSteps = [
  {
    title: 'Entendemos la propiedad y tus objetivos',
    description:
      'Conocemos el inmueble, sus condiciones, disponibilidad, tipo de ocupación permitida, plazo esperado y prioridades del propietario.',
  },
  {
    title: 'Estimamos la renta y definimos el posicionamiento',
    description:
      'Revisamos características, ubicación, competencia y demanda para proponer un rango de renta y una estrategia congruente con el mercado.',
  },
  {
    title: 'Preparamos información y materiales',
    description:
      'Integramos la ficha comercial, revisamos documentación y realizamos el levantamiento fotográfico. Video, drone u otros recursos se utilizan cuando aportan valor.',
  },
  {
    title: 'Promovemos y atendemos interesados',
    description:
      'Publicamos en los canales definidos, activamos nuestra red de colaboración, atendemos solicitudes y coordinamos visitas.',
  },
  {
    title: 'Perfilamos e investigamos candidatos',
    description:
      'Primero entendemos el perfil de ocupación y después coordinamos una investigación especializada de los candidatos que avanzan en el proceso.',
  },
  {
    title: 'Negociamos y formalizamos',
    description:
      'Acordamos renta, depósito, plazo, mantenimiento, mascotas, mobiliario y demás condiciones; después coordinamos contrato y garantías.',
  },
  {
    title: 'Coordinamos la entrega',
    description:
      'Damos seguimiento a firma, pagos, llaves, inventario y evidencia del estado de entrega. Cuando existe garantía jurídica, el despacho puede gestionar el acta correspondiente.',
  },
];

const serviceGroups = [
  {
    title: 'Diagnóstico y estrategia de renta',
    items: [
      'Estimación inicial del precio de renta',
      'Análisis de oferta comparable',
      'Evaluación de posicionamiento',
      'Estrategia personalizada para el inmueble',
      'Orientación fiscal inicial para el arrendador',
      'Recomendaciones para preparar la propiedad',
    ],
  },
  {
    title: 'Preparación y promoción',
    items: [
      'Levantamiento de información',
      'Revisión inicial de documentación',
      'Levantamiento fotográfico',
      'Elaboración de ficha comercial',
      'Video y drone cuando aporten valor',
      'Pauta, lona u open house cuando la estrategia lo justifique',
    ],
  },
  {
    title: 'Exposición y atención de prospectos',
    items: [
      'Publicación dentro del inventario de Rednorte',
      'Promoción en portales inmobiliarios',
      'Difusión digital e interna',
      'Red de colaboración inmobiliaria',
      'Atención de solicitudes y coordinación de visitas',
      'Retroalimentación y reportes al propietario',
    ],
  },
  {
    title: 'Perfilamiento e investigación',
    items: [
      'Entrevista inicial para conocer el tipo de ocupación',
      'Revisión de identidad y documentación',
      'Análisis de capacidad de pago',
      'Investigación crediticia y jurídica mediante tercero especializado',
      'Revisión de referencias y fuentes de cumplimiento aplicables',
      'Recomendación del candidato al propietario',
    ],
  },
  {
    title: 'Negociación, contrato y garantías',
    items: [
      'Negociación de renta y depósito',
      'Definición de plazo, mantenimiento y condiciones de uso',
      'Coordinación del contrato de arrendamiento',
      'Garantía jurídica altamente recomendada',
      'Protección de pago cuando el producto contratado lo incluya',
      'Coordinación de firma y formalización',
    ],
  },
  {
    title: 'Entrega del inmueble',
    items: [
      'Verificación de pagos y documentos acordados',
      'Coordinación de entrega de llaves',
      'Inventario de mobiliario cuando corresponda',
      'Evidencia fotográfica del estado de entrega',
      'Acta de entrega cuando sea gestionada por el despacho jurídico',
      'Seguimiento inicial posterior a la firma',
    ],
  },
];

const faqs = [
  {
    question: '¿Cuánto cobra Rednorte por rentar una propiedad?',
    answer:
      'La comisión normalmente equivale a un mes de renta en contratos estándar. Cuando el contrato tiene una vigencia mayor a tres años o requiere una estructura especial, los honorarios pueden ser superiores según el plazo, tipo de inmueble y alcance del servicio. Las condiciones se acuerdan por escrito antes de iniciar.',
  },
  {
    question: '¿Es obligatorio dar la propiedad en exclusiva?',
    answer:
      'No. Rednorte puede trabajar con o sin exclusividad. Sin embargo, la exclusiva permite concentrar atención, inversión de recursos, información, prospectos y seguimiento bajo una sola estrategia, lo que genera una responsabilidad comercial más clara sobre la propiedad. La exclusiva no garantiza que el inmueble se rente en un plazo determinado.',
  },
  {
    question: '¿Cómo se determina el precio de renta?',
    answer:
      'Revisamos ubicación, características, estado, mobiliario, mantenimiento, oferta comparable, demanda y condiciones del mercado. El objetivo es posicionar la propiedad frente a su competencia real, no simplemente publicarla al precio esperado por el propietario.',
  },
  {
    question: '¿Cómo investigan a un posible arrendatario?',
    answer:
      'Todos los candidatos que avanzan como posibles arrendatarios pasan por una investigación. Mediante un tercero especializado se pueden revisar identidad vigente, capacidad de pago, score crediticio, referencias, antecedentes legales, cédulas profesionales cuando correspondan y fuentes nacionales e internacionales de cumplimiento. Como referencia, normalmente se busca una capacidad de pago cercana a tres veces la renta.',
  },
  {
    question: '¿Qué incluye la garantía jurídica de Ávalo?',
    answer:
      'Según el producto contratado, Ávalo puede realizar la investigación, elaborar el contrato y brindar protección jurídica durante la vigencia. También puede coordinar la recuperación extrajudicial o judicial del inmueble y ofrecer protección de pago de hasta cuatro meses de renta cuando esa cobertura se encuentre incluida. Alcances, requisitos, exclusiones y costos dependen del producto contratado.',
  },
  {
    question: '¿Quién paga la garantía jurídica?',
    answer:
      'Normalmente el costo se asigna al arrendatario, aunque las partes pueden acordar condiciones distintas. Rednorte recomienda la garantía jurídica para proteger al propietario, pero puede evaluar operaciones sin ella cuando las condiciones y documentación del caso lo permiten.',
  },
  {
    question: '¿Qué documentos necesito para rentar mi propiedad?',
    answer:
      'Generalmente solicitamos identificación oficial, documento que acredite la titularidad del inmueble —como escritura, predial o servicios a nombre del propietario—, reglamento cuando exista e inventario si la propiedad está amueblada. Si no hay inventario, Rednorte puede ayudar a elaborarlo. El caso puede requerir documentación adicional.',
  },
  {
    question: '¿Rednorte administra la propiedad después de rentarla?',
    answer:
      'El servicio estándar de Rednorte es corretaje inmobiliario y no incluye administración mensual, cobranza recurrente ni mantenimiento. Sí damos seguimiento inicial posterior a la firma y coordinamos la entrega. Si se contrata una garantía jurídica, la protección correspondiente opera conforme a sus propios términos.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.rednorte.mx/servicios/rentar-propiedad#service',
      name: 'Renta y comercialización de propiedades',
      serviceType: 'Servicios inmobiliarios para arrendadores',
      description:
        'Servicio de estimación de renta, promoción, perfilamiento, investigación, negociación, contrato y coordinación de entrega para propietarios en Monterrey y Nuevo León.',
      url: 'https://www.rednorte.mx/servicios/rentar-propiedad',
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
          name: 'Rentar una propiedad',
          item: 'https://www.rednorte.mx/servicios/rentar-propiedad',
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

export default function RentarPropiedadPage() {
  return (
    <div className="page-content rent-property-page">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <Breadcrumb
        items={[
          { label: 'Servicios', href: '/servicios' },
          { label: 'Rentar una propiedad' },
        ]}
      />

      <main>
        <section className="rent-hero">
          <div className="rent-shell rent-hero-grid">
            <div className="rent-hero-copy">
              <p className="section-label rent-label-light">Servicio para propietarios</p>
              <h1>Renta tu propiedad en Monterrey con estrategia e investigación de candidatos</h1>
              <p className="rent-hero-lead">
                Definimos el precio de renta, preparamos y promovemos el inmueble, perfilamos a los interesados y coordinamos investigación, contrato y entrega.
              </p>
              <p className="rent-hero-support">
                Casas, departamentos, terrenos, locales, oficinas, bodegas y naves industriales en Monterrey, su área metropolitana y otros municipios de Nuevo León.
              </p>
              <div className="rent-actions">
                <a
                  className="rent-btn rent-btn-primary"
                  href="#solicitar-renta"
                  data-event="rent_property_primary_cta_click"
                >
                  Quiero rentar mi propiedad
                </a>
                <a
                  className="rent-btn rent-btn-secondary"
                  href="#solicitar-estimacion-renta"
                  data-event="rent_property_estimate_click"
                >
                  Solicitar estimación de renta
                </a>
              </div>
              <a className="rent-inline-link rent-inline-link-light" href="#proteccion-juridica">
                Conocer la protección jurídica →
              </a>
            </div>

            <aside className="rent-hero-panel" aria-label="Proceso resumido de renta">
              <p className="rent-hero-panel-kicker">Una estrategia completa</p>
              <div className="rent-hero-path">
                <span>01</span><strong>Estimamos y posicionamos</strong>
                <span>02</span><strong>Promovemos y perfilamos</strong>
                <span>03</span><strong>Investigamos y negociamos</strong>
                <span>04</span><strong>Formalizamos y entregamos</strong>
              </div>
              <p>El objetivo no es encontrar cualquier inquilino, sino coordinar un proceso ordenado para proteger al propietario y a su inmueble.</p>
            </aside>
          </div>
        </section>

        <section className="rent-section rent-results-section" aria-labelledby="rent-results-title">
          <div className="rent-shell">
            <p className="section-label">Resultados 2026</p>
            <h2 id="rent-results-title" className="rent-section-title">Experiencia respaldada por arrendamientos cerrados</h2>
            <div className="rent-stats-grid">
              <article className="rent-stat-card">
                <strong>{RENTAL_DATA.rentedProperties}</strong>
                <span>Propiedades rentadas</span>
              </article>
              <article className="rent-stat-card">
                <strong>{RENTAL_DATA.monthlyRentSumShort}</strong>
                <span>Suma de rentas mensuales pactadas</span>
              </article>
              <article className="rent-stat-card">
                <strong>{RENTAL_DATA.averageMonthlyRentShort}</strong>
                <span>Renta mensual promedio</span>
              </article>
            </div>
            <p className="rent-method-note">
              Datos internos de operaciones de arrendamiento cerradas y registradas por Rednorte Inmobiliaria {RENTAL_DATA.period}. La suma de los montos mensuales pactados es {RENTAL_DATA.monthlyRentSumExact}; la renta mensual promedio es {RENTAL_DATA.averageMonthlyRentExact}, con un mínimo de {RENTAL_DATA.minimumMonthlyRent} y un máximo de {RENTAL_DATA.maximumMonthlyRent}. No incluye operaciones de compraventa ni representa ingresos de Rednorte.
            </p>
          </div>
        </section>

        <section className="rent-section" aria-labelledby="rent-positioning-title">
          <div className="rent-shell">
            <div className="rent-section-heading">
              <p className="section-label">Más que publicar</p>
              <h2 id="rent-positioning-title" className="rent-section-title">No solo buscamos un inquilino. Cuidamos el proceso para proteger tu propiedad.</h2>
              <p>Una renta mal posicionada, un candidato sin investigar o un contrato insuficiente pueden generar vacancia, incumplimientos y conflictos posteriores.</p>
            </div>
            <div className="rent-feature-grid rent-feature-grid-three">
              <article className="rent-feature-card">
                <span className="rent-feature-number">01</span>
                <h3>Precio y posicionamiento</h3>
                <p>Estimamos una renta congruente con la propiedad, su ubicación, competencia, mantenimiento y demanda.</p>
              </article>
              <article className="rent-feature-card">
                <span className="rent-feature-number">02</span>
                <h3>Perfilamiento e investigación</h3>
                <p>Entendemos cómo se ocupará el inmueble y coordinamos una investigación especializada de los candidatos que avanzan.</p>
              </article>
              <article className="rent-feature-card">
                <span className="rent-feature-number">03</span>
                <h3>Formalización y entrega</h3>
                <p>Negociamos condiciones, coordinamos contrato y garantías, verificamos pagos y acompañamos la entrega del inmueble.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="rent-section rent-dark-section" aria-labelledby="rent-process-title">
          <div className="rent-shell">
            <p className="section-label rent-label-light">Cómo trabajamos</p>
            <h2 id="rent-process-title" className="rent-section-title rent-title-light">Un proceso claro desde la estimación hasta la entrega</h2>
            <p className="rent-section-intro rent-copy-light">Cada inmueble y cada propietario requieren una estrategia distinta. Nuestro proceso organiza la comercialización y facilita decisiones con información.</p>
            <div className="rent-process-grid">
              {processSteps.map((step, index) => (
                <article className="rent-process-card" key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="rent-section" aria-labelledby="rent-includes-title">
          <div className="rent-shell">
            <div className="rent-section-heading">
              <p className="section-label">Servicio integral</p>
              <h2 id="rent-includes-title" className="rent-section-title">Lo que Rednorte puede hacer para rentar tu propiedad</h2>
              <p>El alcance se adapta al tipo de inmueble, su condición, ubicación y estrategia acordada. No todas las propiedades requieren exactamente las mismas acciones.</p>
            </div>
            <div className="rent-service-grid">
              {serviceGroups.map((group) => (
                <article className="rent-service-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => <li key={item}>{item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
            <p className="rent-callout-note">Video, drone, pauta, señalización, open house, gestorías y otras acciones se utilizan únicamente cuando las características del inmueble y la estrategia lo justifican.</p>
          </div>
        </section>

        <section className="rent-section rent-profile-section" aria-labelledby="rent-profile-title">
          <div className="rent-shell">
            <p className="section-label">Selección del arrendatario</p>
            <h2 id="rent-profile-title" className="rent-section-title">Perfilamiento e investigación no son lo mismo</h2>
            <div className="rent-strategy-grid">
              <article className="rent-strategy-card">
                <p className="rent-card-eyebrow">Primero entendemos</p>
                <h3>Perfilamiento</h3>
                <p>Conocemos el tipo de ocupación, número de ocupantes, actividad o uso permitido, plazo, mascotas, fechas y necesidades relevantes para la propiedad.</p>
                <ul>
                  <li>Ayuda a identificar compatibilidad con el inmueble.</li>
                  <li>Permite aclarar condiciones antes de una visita o propuesta.</li>
                  <li>No sustituye la investigación documental y financiera.</li>
                </ul>
              </article>
              <article className="rent-strategy-card rent-strategy-card-featured">
                <p className="rent-card-eyebrow">Después verificamos</p>
                <h3>Investigación</h3>
                <p>Todos los candidatos que avanzan como posibles arrendatarios pasan por una investigación coordinada con un tercero especializado.</p>
                <ul>
                  <li>Identidad y documentación vigente.</li>
                  <li>Capacidad de pago, normalmente cercana a una relación 3 a 1.</li>
                  <li>Score crediticio, referencias y antecedentes legales.</li>
                  <li>Cédulas profesionales y fuentes de cumplimiento cuando correspondan.</li>
                </ul>
                <p className="rent-small-disclaimer">El alcance de la investigación depende del tipo de persona, inmueble y producto contratado y se realiza conforme a la documentación y autorizaciones aplicables.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="proteccion-juridica" className="rent-section rent-protection-section" aria-labelledby="rent-protection-title">
          <div className="rent-shell rent-protection-grid">
            <div>
              <p className="section-label rent-label-light">Protección jurídica</p>
              <h2 id="rent-protection-title" className="rent-section-title rent-title-light">Más respaldo para el propietario durante el arrendamiento</h2>
              <p>Rednorte recomienda proteger la operación mediante una garantía jurídica especializada. Normalmente coordinamos este servicio con Ávalo.</p>
              <p>Dependiendo del producto contratado, el esquema puede incluir investigación, elaboración de contrato, protección jurídica y gestión de recuperación extrajudicial o judicial del inmueble.</p>
              <a className="rent-btn rent-btn-light" href="#solicitar-renta" data-event="rent_property_legal_protection_cta_click">Quiero conocer las opciones de protección</a>
            </div>
            <aside className="rent-protection-card">
              <span className="rent-tool-badge">Cobertura opcional</span>
              <strong>Hasta 4 meses</strong>
              <p>de protección de pago de renta cuando el producto contratado incluya esa cobertura y se cumplan sus requisitos.</p>
              <ul>
                <li>Aplicable a operaciones residenciales, comerciales e industriales según evaluación.</li>
                <li>El costo normalmente se asigna al arrendatario.</li>
                <li>Rednorte puede evaluar operaciones sin garantía bajo condiciones específicas.</li>
              </ul>
              <small>Ávalo presta el servicio jurídico. Alcances, requisitos, exclusiones y costos dependen del producto y contrato correspondiente.</small>
            </aside>
          </div>
        </section>

        <section className="rent-section rent-strategy-section" aria-labelledby="rent-exclusive-title">
          <div className="rent-shell">
            <p className="section-label">Una estrategia para cada propiedad</p>
            <h2 id="rent-exclusive-title" className="rent-section-title">Podemos trabajar con o sin exclusiva</h2>
            <div className="rent-strategy-grid">
              <article className="rent-strategy-card">
                <p className="rent-card-eyebrow">Esquema abierto</p>
                <h3>Sin exclusividad</h3>
                <p>Rednorte puede participar en la comercialización aun cuando el propietario trabaje con otros asesores o inmobiliarias.</p>
                <ul>
                  <li>Permite mantener varios canales de promoción.</li>
                  <li>Requiere coordinación para evitar datos o condiciones contradictorias.</li>
                  <li>La responsabilidad comercial puede quedar distribuida entre distintos participantes.</li>
                </ul>
              </article>
              <article className="rent-strategy-card rent-strategy-card-featured">
                <p className="rent-card-eyebrow">Mayor enfoque</p>
                <h3>Con exclusiva</h3>
                <p>La exclusiva permite concentrar recursos, información, prospectos y seguimiento bajo una sola estrategia coordinada por Rednorte.</p>
                <ul>
                  <li>Mayor foco de atención sobre la propiedad.</li>
                  <li>Información y condiciones consistentes.</li>
                  <li>Responsabilidad comercial más clara.</li>
                  <li>Seguimiento centralizado de visitas y propuestas.</li>
                </ul>
                <p className="rent-small-disclaimer">La exclusiva aumenta el nivel de compromiso y coordinación, pero no garantiza que la propiedad se rente en un plazo determinado.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="rent-section rent-fees-section" aria-labelledby="rent-fees-title">
          <div className="rent-shell rent-two-column">
            <div>
              <p className="section-label">Condiciones claras</p>
              <h2 id="rent-fees-title" className="rent-section-title">Honorarios de comercialización</h2>
              <p>En contratos estándar, la comisión normalmente equivale a <strong>un mes de renta</strong>.</p>
              <p>Cuando el contrato tiene una vigencia mayor a tres años o requiere una estructura especial, los honorarios pueden ser superiores según el plazo, tipo de inmueble, complejidad y alcance del servicio.</p>
              <p>Antes de iniciar, el propietario recibe claridad sobre estrategia, alcance, honorarios, vigencia, exclusividad cuando corresponda y responsabilidades de las partes.</p>
            </div>
            <aside className="rent-fee-card">
              <span>Comisión habitual</span>
              <strong>1 mes</strong>
              <p>Los contratos de más de tres años o con condiciones especiales se cotizan según su plazo y complejidad.</p>
            </aside>
          </div>
        </section>

        <section className="rent-section rent-info-section" aria-labelledby="rent-delivery-title">
          <div className="rent-shell rent-info-grid">
            <article className="rent-info-card">
              <p className="section-label">Formalización y entrega</p>
              <h2 id="rent-delivery-title">Coordinamos las condiciones hasta entregar el inmueble</h2>
              <p>Apoyamos la negociación y coordinación de depósito, primer mes, mantenimiento, plazo, incrementos, mascotas, servicios, reparaciones, mobiliario y fecha de entrega.</p>
              <ul>
                <li>Contrato y garantías.</li>
                <li>Verificación de pagos acordados.</li>
                <li>Entrega de llaves.</li>
                <li>Inventario y fotografías de entrega cuando corresponda.</li>
                <li>Acta de entrega gestionada por el despacho cuando aplica.</li>
              </ul>
              <p className="rent-small-disclaimer">El servicio estándar no incluye cambio de servicios, lectura de medidores ni administración mensual de la propiedad.</p>
            </article>
            <article className="rent-info-card">
              <p className="section-label">Documentación y orientación</p>
              <h2>¿Qué necesita el propietario para comenzar?</h2>
              <ul>
                <li>Identificación oficial vigente.</li>
                <li>Documento que acredite la titularidad del inmueble.</li>
                <li>Predial o servicios a nombre del propietario.</li>
                <li>Reglamento de condominio o del inmueble, cuando exista.</li>
                <li>Inventario si está amueblada; Rednorte puede ayudar a elaborarlo.</li>
              </ul>
              <p>También brindamos orientación inicial sobre obligaciones fiscales relacionadas con el arrendamiento. Esta orientación no sustituye la asesoría de un contador o especialista fiscal.</p>
            </article>
          </div>
        </section>

        <section className="rent-section rent-reviews-section" aria-labelledby="rent-reviews-title">
          <div className="rent-shell">
            <p className="section-label">Experiencias de clientes</p>
            <h2 id="rent-reviews-title" className="rent-section-title">Lo que dicen quienes han rentado con Rednorte</h2>
            <p className="rent-section-intro">Conoce experiencias reales de propietarios, arrendatarios y clientes que han recibido acompañamiento de nuestro equipo.</p>
            <div id="rent-property-reviews-slot" className="rent-reviews-slot" data-component="google-reviews">
              <TrustindexWidget />
            </div>
          </div>
        </section>

        <section className="rent-section rent-faq-section" aria-labelledby="rent-faq-title">
          <div className="rent-shell rent-faq-shell">
            <p className="section-label">Preguntas frecuentes</p>
            <h2 id="rent-faq-title" className="rent-section-title">Dudas comunes antes de rentar una propiedad</h2>
            <div className="rent-faq-list">
              {faqs.map((faq, index) => (
                <details className="rent-faq-item" key={faq.question} open={index === 0} data-event="rent_property_faq_expand">
                  <summary>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <strong>{faq.question}</strong>
                  </summary>
                  <div className="rent-faq-answer"><p>{faq.answer}</p></div>
                </details>
              ))}
            </div>
            <div className="rent-centered-action">
              <Link className="rent-inline-link" href="/preguntas-frecuentes">Ver todas las preguntas frecuentes →</Link>
            </div>
          </div>
        </section>

        <section id="solicitar-renta" className="rent-section rent-form-section" aria-labelledby="rent-form-title">
          <span id="solicitar-estimacion-renta" className="rent-anchor-target" aria-hidden="true" />
          <div className="rent-shell rent-form-grid">
            <div className="rent-form-copy">
              <p className="section-label rent-label-light">Hablemos de tu propiedad</p>
              <h2 id="rent-form-title" className="rent-section-title rent-title-light">Cuéntanos qué quieres rentar</h2>
              <p>Compártenos los datos principales del inmueble. Un integrante de Rednorte revisará la información y se comunicará contigo para conocer tus objetivos y definir el siguiente paso.</p>
              <div className="rent-form-points">
                <span>Estimación inicial de renta</span>
                <span>Estrategia de promoción</span>
                <span>Investigación y protección</span>
              </div>
            </div>
            <RentPropertyForm />
          </div>
        </section>

        <section className="rent-related-section" aria-labelledby="rent-related-title">
          <div className="rent-shell">
            <h2 id="rent-related-title">También puede interesarte</h2>
            <div className="rent-related-links">
              <Link href="/servicios/vender-propiedad">Vender una propiedad</Link>
              <Link href="/servicios/inversion-inmobiliaria">Inversión inmobiliaria</Link>
              <Link href="/servicios">Comercial e industrial</Link>
              <Link href="/propiedades">Propiedades disponibles</Link>
              <Link href="/preguntas-frecuentes">Preguntas frecuentes</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
