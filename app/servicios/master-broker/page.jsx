import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import MasterBrokerForm from '@/components/MasterBrokerForm';
import TrustindexWidget from '@/components/TrustindexWidget';
import WhatsAppGateButton from '@/components/WhatsAppGateButton';

export const metadata = {
  title: 'Master Broker en Monterrey y Nuevo León',
  description:
    'Comercializa propiedades en venta con una estrategia exclusiva, coordinación central y una red inmobiliaria ampliada bajo la gestión de Rednorte.',
  alternates: {
    canonical: '/servicios/master-broker',
  },
  openGraph: {
    title: 'Servicio Master Broker en Monterrey | Rednorte',
    description:
      'Una sola estrategia, una coordinación central y una red inmobiliaria ampliada para vender propiedades en Nuevo León.',
    url: '/servicios/master-broker',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicio Master Broker en Monterrey | Rednorte',
    description:
      'Comercialización exclusiva con información uniforme, control de prospectos, reportes quincenales y negociación centralizada.',
  },
};

const useCases = [
  {
    title: 'Propiedades con múltiples intermediarios',
    description:
      'Cuando distintas publicaciones, precios o mensajes están fragmentando la comercialización y dificultando el seguimiento.',
  },
  {
    title: 'Inmuebles con exposición sin resultados',
    description:
      'Cuando una propiedad lleva tiempo en el mercado y requiere revisar precio, presentación, canales y estrategia.',
  },
  {
    title: 'Activos especializados o de alto valor',
    description:
      'Residencial, comercial, industrial, terrenos, edificios u otros inmuebles que necesitan una comunicación más controlada.',
  },
  {
    title: 'Desarrollos y conjuntos de unidades',
    description:
      'Proyectos que requieren materiales uniformes, seguimiento central y coordinación con distintos participantes.',
  },
  {
    title: 'Portafolios empresariales o institucionales',
    description:
      'Varias propiedades que deben manejarse con una sola metodología, reportes y responsable comercial.',
  },
  {
    title: 'Propietarios que buscan mayor coordinación',
    description:
      'Cuando el objetivo no es sumar publicaciones aisladas, sino ordenar la colaboración alrededor de una estrategia.',
  },
];

const processSteps = [
  {
    title: 'Evaluamos la propiedad',
    description:
      'Revisamos objetivo de venta, precio, documentación, condiciones de acceso, tiempo en mercado y viabilidad del modelo.',
  },
  {
    title: 'Definimos una estrategia única',
    description:
      'Acordamos posicionamiento, precio autorizado, materiales, canales, participantes y condiciones comerciales.',
  },
  {
    title: 'Activamos la red adecuada',
    description:
      'Rednorte selecciona inmobiliarias, asesores y aliados según el tipo de propiedad, zona y perfil del comprador esperado.',
  },
  {
    title: 'Centralizamos prospectos y negociación',
    description:
      'Toda solicitud, visita, oferta y contraoferta se registra y coordina mediante Rednorte para evitar duplicidad y desorden.',
  },
  {
    title: 'Coordinamos la formalización',
    description:
      'Damos seguimiento a documentación, comprador, crédito, valuación, notaría, firma, pagos y cierre de la operación.',
  },
];

const includedServices = [
  {
    title: 'Diagnóstico y posicionamiento',
    items: [
      'Estimación de valor y análisis comparativo',
      'Revisión del precio y condiciones de salida',
      'Evaluación de vendibilidad',
      'Estrategia comercial por propiedad o portafolio',
    ],
  },
  {
    title: 'Material comercial unificado',
    items: [
      'Levantamiento de información',
      'Fotografía y ficha comercial',
      'Video o drone cuando aporten valor',
      'Una sola descripción, precio y condiciones autorizadas',
    ],
  },
  {
    title: 'Promoción y exposición',
    items: [
      'Portales y canales digitales',
      'Presentación a la red de colaboración',
      'Pauta cuando Rednorte determine que es necesaria',
      'Open house o señalización cuando resulte conveniente',
    ],
  },
  {
    title: 'Control operativo',
    items: [
      'Registro de prospectos',
      'Coordinación de visitas',
      'Retroalimentación de interesados',
      'Control de información compartida con colaboradores',
    ],
  },
  {
    title: 'Ofertas y negociación',
    items: [
      'Recepción y análisis de ofertas',
      'Contraofertas y condiciones',
      'Canal único con el propietario',
      'Autorización previa de cambios relevantes',
    ],
  },
  {
    title: 'Seguimiento y cierre',
    items: [
      'Reportes quincenales',
      'Recomendaciones de ajuste',
      'Revisión documental inicial',
      'Coordinación notarial y acompañamiento al cierre',
    ],
  },
];

const controlPrinciples = [
  'Un solo precio autorizado',
  'Una sola ficha comercial',
  'Una sola estrategia de posicionamiento',
  'Un registro central de prospectos y visitas',
  'Un canal para ofertas, negociación y cambios',
];

const reportItems = [
  'Acciones de promoción realizadas',
  'Participantes activados en la estrategia',
  'Prospectos e informes recibidos',
  'Visitas y retroalimentación',
  'Ofertas, objeciones y condiciones planteadas',
  'Lectura del mercado y recomendaciones de ajuste',
];

const evaluationCriteria = [
  'Precio y condiciones comercialmente viables',
  'Documentación inicial suficiente',
  'Acceso razonable para fotografías y visitas',
  'Disposición para centralizar prospectos y negociaciones',
  'Ausencia de compromisos incompatibles con la exclusiva',
  'Colaboración del propietario durante la vigencia',
];

const faqs = [
  {
    question: '¿Qué es el servicio Master Broker de Rednorte?',
    answer:
      'Es un modelo de comercialización exclusiva para propiedades en venta. Rednorte define una sola estrategia, centraliza la información, selecciona a los participantes de la red, registra prospectos, coordina visitas, conduce las negociaciones y acompaña la operación hasta el cierre.',
  },
  {
    question: '¿La exclusiva es obligatoria?',
    answer:
      'Sí. La coordinación Master Broker requiere que Rednorte sea la única empresa responsable de administrar la estrategia durante una vigencia inicial de seis meses. Esto evita publicaciones, precios, ofertas y negociaciones paralelas. La vigencia puede renovarse por escrito.',
  },
  {
    question: '¿Cuál es la comisión del servicio?',
    answer:
      'La comisión es del 5% sobre el precio final de venta. El propietario paga una sola comisión a Rednorte; la participación de inmobiliarias, asesores o aliados se administra internamente sin generar una comisión adicional para el propietario. Los impuestos y condiciones de pago se precisan en el contrato.',
  },
  {
    question: '¿Qué tipo de propiedades pueden evaluarse?',
    answer:
      'Pueden evaluarse propiedades residenciales, comerciales, industriales, terrenos, edificios, desarrollos, conjuntos de unidades y portafolios de empresas o instituciones. La aceptación depende del precio, documentación, acceso, condiciones y viabilidad de la estrategia.',
  },
  {
    question: '¿Todas las inmobiliarias o integrantes de MBN participan?',
    answer:
      'No. Rednorte selecciona a los participantes que pueden aportar según el tipo de propiedad, zona, ticket y perfil del comprador esperado. La intervención de integrantes de la red o de MBN no es automática ni indiscriminada.',
  },
  {
    question: '¿Quién recibe y negocia las ofertas?',
    answer:
      'Rednorte funciona como canal central de comunicación y negociación. Los colaboradores pueden promover y presentar prospectos, pero no pueden modificar precio, pactar descuentos, recibir anticipos o comprometer al propietario sin la coordinación de Rednorte y la autorización correspondiente.',
  },
  {
    question: '¿Con qué frecuencia recibe información el propietario?',
    answer:
      'Rednorte entrega reportes quincenales que pueden incluir promoción, participantes activados, prospectos, visitas, retroalimentación, ofertas, objeciones y recomendaciones sobre precio o estrategia. La comunicación operativa puede mantenerse entre reportes cuando exista actividad relevante.',
  },
  {
    question: '¿Master Broker garantiza vender más rápido?',
    answer:
      'No. El modelo busca ampliar la exposición, ordenar la colaboración y mejorar el seguimiento, pero no garantiza la venta, un precio específico ni un plazo determinado. El resultado depende del inmueble, precio, condiciones, documentación, demanda y comportamiento del mercado.',
  },
];

const masterBrokerSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.rednorte.mx/servicios/master-broker#service',
      name: 'Servicio Master Broker de Rednorte',
      serviceType: 'Comercialización exclusiva y coordinada de propiedades en venta',
      description:
        'Rednorte centraliza la estrategia, promoción, red de colaboración, prospectos, visitas, negociación y cierre de propiedades en venta bajo un modelo Master Broker.',
      url: 'https://www.rednorte.mx/servicios/master-broker',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Nuevo León',
      },
      audience: [
        {
          '@type': 'Audience',
          audienceType: 'Propietarios de inmuebles',
        },
        {
          '@type': 'Audience',
          audienceType: 'Empresas, desarrolladores e instituciones con activos inmobiliarios',
        },
      ],
      provider: {
        '@type': 'RealEstateAgent',
        name: 'Rednorte Inmobiliaria',
        url: 'https://www.rednorte.mx/',
        telephone: '+52 81 1778 3953',
        address: {
          '@type': 'PostalAddress',
          streetAddress:
            'Av. José Vasconcelos Ote. 215, Local 7, Residencial San Agustín 1er Sector',
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
          name: 'Master Broker',
          item: 'https://www.rednorte.mx/servicios/master-broker',
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

export default function MasterBrokerPage() {
  return (
    <div className="page-content master-page">
      <Breadcrumb
        items={[
          { label: 'Servicios', href: '/servicios' },
          { label: 'Master Broker' },
        ]}
      />

      <main>
        <section className="master-hero">
          <div className="master-shell master-hero-grid">
            <div className="master-hero-copy">
              <p className="section-label master-label-light">COMERCIALIZACIÓN EXCLUSIVA</p>
              <h1>Master Broker para vender propiedades en Monterrey</h1>
              <p className="master-hero-lead">
                Una sola estrategia, una coordinación central y una red inmobiliaria ampliada.
              </p>
              <p className="master-hero-support">
                Rednorte organiza la promoción, participantes, prospectos, visitas, ofertas y
                negociación para mantener el control de la operación bajo un solo responsable.
              </p>
              <div className="master-actions">
                <Link
                  className="master-btn master-btn-primary"
                  href="#solicitar-evaluacion-master-broker"
                  data-event="master_broker_primary_cta_click"
                >
                  Solicitar evaluación Master Broker
                </Link>
                <Link
                  className="master-btn master-btn-secondary"
                  href="#portafolio-master-broker"
                  data-event="master_broker_portfolio_cta_click"
                >
                  Tengo un portafolio de propiedades
                </Link>
              </div>
              <p className="master-hero-note">
                Servicio para venta · Exclusividad inicial de 6 meses · Sujeto a evaluación previa
              </p>
            </div>

            <aside className="master-hero-panel">
              <span>MODELO COORDINADO</span>
              <h2>Mayor exposición sin perder el control</h2>
              <ol>
                <li>Un solo precio y una sola ficha comercial</li>
                <li>Participantes seleccionados según la propiedad</li>
                <li>Prospectos y visitas registrados por Rednorte</li>
                <li>Negociación centralizada con el propietario</li>
                <li>Reportes quincenales de actividad y mercado</li>
              </ol>
              <p>
                El modelo amplía la colaboración, pero Rednorte conserva la coordinación de toda
                la operación.
              </p>
            </aside>
          </div>
        </section>

        <section className="master-section master-use-cases-section">
          <div className="master-shell">
            <div className="master-section-heading master-section-heading-centered">
              <p className="section-label">CUÁNDO PUEDE CONVENIR</p>
              <h2 className="master-section-title">
                Una estrategia para propiedades que necesitan orden y coordinación
              </h2>
              <p>
                Master Broker no se asigna automáticamente. Primero revisamos si el inmueble,
                portafolio y condiciones pueden beneficiarse de una estrategia exclusiva y
                centralizada.
              </p>
            </div>
            <div className="master-use-cases-grid">
              {useCases.map((item, index) => (
                <article className="master-use-case-card" key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="master-section master-process-section">
          <div className="master-shell">
            <div className="master-section-heading master-section-heading-centered">
              <p className="section-label master-label-light">CÓMO FUNCIONA</p>
              <h2 className="master-section-title master-title-light">
                De la evaluación al cierre bajo una sola coordinación
              </h2>
            </div>
            <div className="master-process-grid">
              {processSteps.map((step, index) => (
                <article className="master-process-step" key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="master-section master-network-section">
          <div className="master-shell master-network-grid">
            <div>
              <p className="section-label">RED DE COLABORACIÓN</p>
              <h2 className="master-section-title">
                Varias capacidades comerciales, una sola estrategia
              </h2>
              <p className="master-section-intro">
                Rednorte puede integrar inmobiliarias, asesores y aliados que aporten al perfil de
                la propiedad. La selección depende del tipo de inmueble, ubicación, ticket y
                comprador esperado.
              </p>
              <ul className="master-check-list">
                <li>Rednorte dirige la estrategia y conserva la relación con el propietario.</li>
                <li>Los colaboradores reciben información y materiales comerciales uniformes.</li>
                <li>Toda visita, oferta y negociación debe canalizarse mediante Rednorte.</li>
                <li>La red se activa de manera selectiva, no indiscriminada.</li>
              </ul>
            </div>

            <aside className="master-mbn-card">
              <span>MBN · MASTER BROKER NETWORK</span>
              <h3>Colaboración inmobiliaria en Nuevo León</h3>
              <p>
                MBN conecta inmobiliarias, brokers y aliados estratégicos que buscan colaborar con
                mayor orden y profesionalismo. En una estrategia Master Broker, Rednorte puede
                integrar participantes de MBN cuando su perfil aporte a la comercialización.
              </p>
              <p className="master-mbn-note">
                MBN no sustituye a Rednorte ni participa automáticamente en todas las operaciones.
                La coordinación del servicio permanece en Rednorte.
              </p>
              <a
                className="master-btn master-btn-mbn"
                href="https://mbn.mx/"
                target="_blank"
                rel="noopener noreferrer"
                data-event="master_broker_mbn_link_click"
              >
                Conocer MBN
              </a>
            </aside>
          </div>
        </section>

        <section className="master-section master-included-section">
          <div className="master-shell">
            <div className="master-section-heading">
              <p className="section-label">QUÉ INCLUYE</p>
              <h2 className="master-section-title">
                Una estrategia comercial completa y coordinada
              </h2>
              <p>
                Las acciones se definen según el inmueble. Video, drone, pauta, open house,
                señalización y producciones especiales se aplican cuando Rednorte determina que
                pueden aportar valor.
              </p>
            </div>
            <div className="master-included-grid">
              {includedServices.map((group) => (
                <article className="master-included-card" key={group.title}>
                  <h3>{group.title}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="master-section master-control-section">
          <div className="master-shell master-control-grid">
            <div className="master-control-card">
              <p className="section-label">CONTROL DE INFORMACIÓN</p>
              <h2 className="master-section-title">Una sola versión de la propiedad</h2>
              <p>
                La estrategia evita precios distintos, descripciones contradictorias, prospectos
                duplicados y negociaciones paralelas.
              </p>
              <ul className="master-principles-list">
                {controlPrinciples.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="master-report-card">
              <p className="section-label">REPORTES QUINCENALES</p>
              <h2 className="master-section-title">Actividad con lectura comercial</h2>
              <p>
                El propietario recibe información sobre lo realizado y sobre la respuesta que el
                mercado está dando a la estrategia.
              </p>
              <ul>
                {reportItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="master-section master-conditions-section">
          <div className="master-shell">
            <div className="master-section-heading master-section-heading-centered">
              <p className="section-label">CONDICIONES DEL SERVICIO</p>
              <h2 className="master-section-title">
                Claridad antes de activar la estrategia
              </h2>
            </div>

            <div className="master-conditions-grid">
              <article className="master-condition-card master-condition-card-featured">
                <span>COMISIÓN</span>
                <strong>5%</strong>
                <h3>Sobre el precio final de venta</h3>
                <p>
                  El propietario paga una sola comisión a Rednorte. La distribución con
                  colaboradores se administra internamente sin crear una comisión adicional.
                </p>
                <small>
                  Los impuestos aplicables, momento de pago y demás condiciones se detallan en el
                  contrato.
                </small>
              </article>

              <article className="master-condition-card">
                <span>EXCLUSIVIDAD</span>
                <strong>6 meses</strong>
                <h3>Vigencia inicial renovable</h3>
                <p>
                  La exclusiva permite que Rednorte coordine publicaciones, prospectos, visitas,
                  ofertas y negociación bajo una sola estrategia.
                </p>
              </article>

              <article className="master-condition-card">
                <span>ALCANCE</span>
                <strong>Todo tipo</strong>
                <h3>Propiedades y portafolios</h3>
                <p>
                  Residencial, comercial, industrial, terrenos, edificios, desarrollos, conjuntos
                  de unidades y activos empresariales o institucionales.
                </p>
              </article>
            </div>

            <div className="master-evaluation-box">
              <div>
                <p className="section-label master-label-light">EVALUACIÓN PREVIA</p>
                <h2 className="master-section-title master-title-light">
                  No todas las propiedades ingresan automáticamente
                </h2>
                <p>
                  Para asumir la coordinación, Rednorte revisa que existan condiciones razonables
                  para ejecutar la estrategia.
                </p>
              </div>
              <ul>
                {evaluationCriteria.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="master-section master-reviews-section">
          <div className="master-shell">
            <div className="master-section-heading master-section-heading-centered">
              <p className="section-label">EXPERIENCIAS DE CLIENTES</p>
              <h2 className="master-section-title">
                Acompañamiento y coordinación durante la operación
              </h2>
            </div>
            <div
              id="master-broker-reviews-slot"
              className="master-reviews-slot"
              data-component="google-reviews"
            >
              <TrustindexWidget />
            </div>
          </div>
        </section>

        <section className="master-section master-faq-section">
          <div className="master-shell">
            <div className="master-section-heading master-section-heading-centered">
              <p className="section-label">PREGUNTAS FRECUENTES</p>
              <h2 className="master-section-title">Dudas sobre el modelo Master Broker</h2>
            </div>
            <div className="master-faq-list">
              {faqs.map((faq, index) => (
                <details className="master-faq-item" key={faq.question} open={index === 0}>
                  <summary data-event="master_broker_faq_expand">
                    <span>{faq.question}</span>
                    <span className="master-faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>
            <div className="master-faq-action">
              <Link className="master-btn master-btn-dark" href="/preguntas-frecuentes">
                Ver todas las preguntas frecuentes
              </Link>
            </div>
          </div>
        </section>

        <section className="master-form-section" id="solicitar-evaluacion-master-broker">
          <span id="portafolio-master-broker" className="master-form-anchor" aria-hidden="true" />
          <div className="master-shell master-form-grid">
            <div className="master-form-copy">
              <p className="section-label master-label-light">EVALUACIÓN MASTER BROKER</p>
              <h2>Cuéntanos sobre la propiedad o portafolio</h2>
              <p>
                Revisaremos la información inicial para determinar si el modelo puede ser adecuado
                y definir el siguiente paso.
              </p>
              <ul>
                <li>Evaluación preliminar sin compromiso.</li>
                <li>El servicio se activa únicamente mediante acuerdo por escrito.</li>
                <li>La solicitud no implica aceptación automática de la propiedad.</li>
              </ul>
              <WhatsAppGateButton
                className="master-inline-link master-inline-link-light"
                source="Master Broker"
              >
                Hablar directamente por WhatsApp →
              </WhatsAppGateButton>
            </div>
            <MasterBrokerForm />
          </div>
        </section>

        <section className="master-section master-related-section">
          <div className="master-shell">
            <div className="master-section-heading master-section-heading-centered">
              <p className="section-label">SERVICIOS RELACIONADOS</p>
              <h2 className="master-section-title">Otras formas de trabajar con Rednorte</h2>
            </div>
            <div className="master-related-grid">
              <Link href="/servicios/vender-propiedad">
                <span>Venta</span>
                <strong>Vender una propiedad</strong>
                <p>Estrategia de comercialización adaptada al inmueble y al propietario.</p>
              </Link>
              <Link href="/herramientas/estimacion-de-valor">
                <span>Valor</span>
                <strong>Estimación de valor</strong>
                <p>Conoce cómo compite la propiedad antes de definir el precio de salida.</p>
              </Link>
              <Link href="/servicios/comercial-industrial">
                <span>Industrial</span>
                <strong>Inmobiliaria industrial</strong>
                <p>Venta de naves, bodegas, terrenos, patios y activos especializados.</p>
              </Link>
              <Link href="/servicios/comercial-industrial">
                <span>Comercial</span>
                <strong>Inmobiliaria comercial</strong>
                <p>Venta de locales, oficinas, edificios, terrenos y espacios comerciales.</p>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(masterBrokerSchema) }}
      />
    </div>
  );
}
