import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import ForeignClientsForm from '@/components/ForeignClientsForm';
import TrustindexWidget from '@/components/TrustindexWidget';
import WhatsAppGateButton from '@/components/WhatsAppGateButton';
import { SITE_CONTACT } from '@/lib/siteConfig';

export const metadata = {
  title: 'Bienes raíces en Monterrey para extranjeros',
  description:
    'Compra, renta o invierte en Monterrey con Rednorte: atención en inglés y mandarín, búsqueda inmobiliaria, contratos y apoyo en trámites ante la SRE.',
  alternates: {
    canonical: '/servicios/clientes-extranjeros',
  },
  openGraph: {
    title: 'Bienes raíces en Monterrey para extranjeros | Rednorte',
    description:
      'Acompañamiento local para comprar, rentar, invertir o instalar una empresa en Nuevo León, con atención en inglés y mandarín.',
    url: '/servicios/clientes-extranjeros',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bienes raíces en Monterrey para extranjeros | Rednorte',
    description:
      'Búsqueda, negociación, documentación, SRE, renta corporativa e inversión inmobiliaria en Monterrey y Nuevo León.',
  },
};

const SRE_FEE_MXN = 5250;
const SRE_FEE_YEAR = 2026;

const servicePaths = [
  {
    eyebrow: 'COMPRAR',
    title: 'Compra una propiedad en Monterrey',
    description:
      'Buscamos en el inventario de Rednorte y en la red inmobiliaria, comparamos opciones y coordinamos oferta, documentación, notaría, firma y entrega.',
    href: '/servicios/clientes-extranjeros?need=comprar#asesoria-extranjeros',
    relatedHref: '/servicios/comprar-propiedad',
    relatedLabel: 'Conocer el servicio de compra →',
  },
  {
    eyebrow: 'RENTAR',
    title: 'Encuentra vivienda para ti o tu familia',
    description:
      'Te ayudamos a definir zonas, comparar propiedades, negociar condiciones, coordinar investigación, contrato e inventario de entrega.',
    href: '/servicios/clientes-extranjeros?need=rentar#asesoria-extranjeros',
    relatedHref: '/servicios/rentar-propiedad',
    relatedLabel: 'Conocer el servicio de renta →',
  },
  {
    eyebrow: 'INVERTIR',
    title: 'Analiza una inversión inmobiliaria',
    description:
      'Primero identificamos tu objetivo —flujo, plusvalía, patrimonio, preventa u otra estrategia— y después investigamos alternativas.',
    href: '/servicios/clientes-extranjeros?need=invertir#asesoria-extranjeros',
    relatedHref: '/servicios/inversion-inmobiliaria',
    relatedLabel: 'Conocer inversión y preventas →',
  },
  {
    eyebrow: 'EMPRESAS Y EJECUTIVOS',
    title: 'Inmuebles para operación y vivienda corporativa',
    description:
      'Apoyamos a empresas que llegan o se expanden en Nuevo León con oficinas, inmuebles industriales y vivienda para ejecutivos.',
    href: '/servicios/clientes-extranjeros?need=empresa#asesoria-extranjeros',
    relatedHref: '/servicios',
    relatedLabel: 'Ver soluciones para empresas →',
  },
];

const differentiators = [
  {
    title: 'Búsqueda más allá de nuestro inventario',
    description:
      'Consultamos propiedades de Rednorte y opciones disponibles mediante nuestra red de colaboración inmobiliaria.',
  },
  {
    title: 'Coordinación local de la operación',
    description:
      'Damos seguimiento a búsqueda, visitas, oferta, negociación, documentación, notaría, contrato, firma y entrega.',
  },
  {
    title: 'Atención directa en varios idiomas',
    description:
      'Brindamos atención directa en español, inglés y mandarín. Para otros idiomas podemos coordinar intérprete o traductor, sujeto a disponibilidad.',
  },
];

const sreDocuments = [
  'Pasaporte vigente',
  'Documento migratorio o información sobre la condición de estancia',
  'Domicilio actual y teléfono de contacto',
  'RFC y CURP, cuando correspondan',
  'Estado civil y régimen matrimonial',
  'Porcentaje que adquirirá cada comprador',
  'Forma de pago: crédito o recursos propios',
  'Escritura o datos del inmueble, cuando la propiedad ya esté identificada',
];

const processSteps = [
  {
    title: 'Entendemos tu necesidad',
    description:
      'Definimos objetivo, presupuesto, fecha, idioma, tipo de propiedad y condiciones relevantes para ti, tu familia o tu empresa.',
  },
  {
    title: 'Buscamos y comparamos',
    description:
      'Revisamos inventario propio y opciones de la red inmobiliaria para presentar alternativas acordes con tu perfil.',
  },
  {
    title: 'Organizamos documentación',
    description:
      'Explicamos los documentos y participantes que puede requerir la operación y coordinamos el trámite aplicable cuando corresponda.',
  },
  {
    title: 'Negociamos y formalizamos',
    description:
      'Acompañamos precio, condiciones, contrato, crédito, notaría, pagos y firma con las partes involucradas.',
  },
  {
    title: 'Coordinamos la entrega',
    description:
      'Damos seguimiento hasta la entrega del inmueble y podemos continuar apoyando en renta, reventa o una nueva operación.',
  },
];

const countries = [
  'Estados Unidos',
  'Corea del Sur',
  'China',
  'Brasil',
  'Rusia',
  'Canadá',
  'España',
  'Italia',
  'Perú',
  'Ecuador',
  'Colombia',
  'Venezuela',
  'Argentina',
  'Chile',
  'Francia',
  'Japón',
];

const faqs = [
  {
    question: '¿Una persona extranjera puede comprar una propiedad en Monterrey?',
    answer:
      'Sí. Antes de avanzar debe revisarse la nacionalidad del comprador, ubicación del inmueble, forma de adquisición y estructura jurídica aplicable. En operaciones fuera de la zona restringida puede corresponder el convenio de renuncia ante la Secretaría de Relaciones Exteriores. Rednorte coordina la parte inmobiliaria y el trámite aplicable con las partes de la operación.',
  },
  {
    question: '¿Qué incluye la gestión sin costo del convenio ante la SRE?',
    answer: `Para clientes extranjeros que compran su propiedad con Rednorte, no cobramos honorarios por preparar y gestionar el convenio de renuncia ante la SRE cuando resulte aplicable. El derecho gubernamental vigente en ${SRE_FEE_YEAR} es de $${SRE_FEE_MXN.toLocaleString('es-MX')} MXN y lo paga el comprador. No se incluyen notaría, impuestos, traducciones, apostillas ni servicios de terceros. Los importes oficiales pueden cambiar.`,
  },
  {
    question: '¿Qué documentos se necesitan para iniciar el trámite ante la SRE?',
    answer:
      'De manera general pueden solicitarse pasaporte, documento migratorio o condición de estancia, domicilio y teléfono, RFC, CURP, estado civil y régimen matrimonial, porcentaje de adquisición, forma de pago y datos del inmueble. La lista definitiva depende del caso y de los requisitos oficiales vigentes.',
  },
  {
    question: '¿En qué idiomas brinda atención Rednorte?',
    answer:
      'Rednorte brinda atención directa en español, inglés y mandarín. Para otros idiomas podemos coordinar apoyo de intérprete o traductor, sujeto a disponibilidad, alcance y posibles costos de terceros.',
  },
  {
    question: '¿Puedo rentar una propiedad si todavía no tengo historial crediticio en México?',
    answer:
      'Sí es posible evaluar el caso. Rednorte puede coordinar la investigación con Ávalo utilizando documentación de México y, cuando corresponda, información del país de origen. La aprobación depende del perfil, capacidad de pago, documentos y condiciones de la operación.',
  },
  {
    question: '¿Atienden rentas corporativas y vivienda para ejecutivos?',
    answer:
      'Sí. Apoyamos a empresas que necesitan vivienda para ejecutivos o contratos corporativos. Revisamos la necesidad, buscamos opciones, negociamos condiciones y coordinamos investigación, contrato, inventario y entrega. El servicio se concentra en la operación inmobiliaria y no constituye un programa integral de relocation.',
  },
  {
    question: '¿El comprador extranjero paga comisión a Rednorte?',
    answer:
      'En la operación estándar, el comprador no paga comisión adicional a Rednorte; normalmente la cubre el vendedor o desarrollador que comercializa el inmueble. Si una operación excepcional requiere honorarios directos, el alcance y costo deben acordarse previamente y por escrito.',
  },
  {
    question: '¿Un extranjero puede obtener crédito hipotecario en México?',
    answer:
      'Depende de su residencia, ingresos, documentación y de las políticas de cada institución financiera. Rednorte puede coordinar una revisión inicial de alternativas con SOC Roch, sin garantizar aprobación, tasa, monto o condiciones específicas.',
  },
  {
    question: '¿Rednorte ofrece un servicio completo de relocation?',
    answer:
      'Por ahora nuestro alcance se concentra en bienes raíces: búsqueda de vivienda o inmueble empresarial, visitas, negociación, documentación, contrato, firma y entrega. No gestionamos como servicio estándar escuelas, mudanza, cuentas bancarias, transporte o trámites migratorios ajenos a la operación inmobiliaria.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.rednorte.mx/servicios/clientes-extranjeros#service',
      name: 'Servicios inmobiliarios para clientes extranjeros en Monterrey',
      serviceType:
        'Compra, renta, inversión y búsqueda de inmuebles para personas y empresas extranjeras',
      description:
        'Acompañamiento inmobiliario en Monterrey y Nuevo León para personas y empresas extranjeras, con atención en inglés y mandarín, búsqueda, negociación, documentación y coordinación de trámites aplicables.',
      url: 'https://www.rednorte.mx/servicios/clientes-extranjeros',
      areaServed: {
        '@type': 'AdministrativeArea',
        name: 'Nuevo León',
      },
      audience: [
        {
          '@type': 'Audience',
          audienceType: 'Compradores y arrendatarios extranjeros',
        },
        {
          '@type': 'Audience',
          audienceType: 'Inversionistas internacionales',
        },
        {
          '@type': 'Audience',
          audienceType: 'Empresas extranjeras y ejecutivos trasladados',
        },
        {
          '@type': 'Audience',
          audienceType: 'Mexicanos que viven en el extranjero',
        },
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
          name: 'Clientes extranjeros',
          item: 'https://www.rednorte.mx/servicios/clientes-extranjeros',
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

export default function ClientesExtranjerosPage() {
  return (
    <div className="page-content foreign-page">
      <Breadcrumb
        items={[
          { label: 'Servicios', href: '/servicios' },
          { label: 'Clientes extranjeros' },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <main>
        <section className="foreign-hero">
          <div className="foreign-shell foreign-hero-grid">
            <div className="foreign-hero-copy">
              <p className="section-label foreign-label-light">
                SERVICIO PARA CLIENTES INTERNACIONALES
              </p>
              <h1>Bienes raíces en Monterrey para clientes extranjeros</h1>
              <p className="foreign-hero-lead">
                Comprar o rentar en otro país implica mucho más que encontrar una propiedad.
              </p>
              <p className="foreign-hero-support">
                Rednorte coordina la búsqueda, negociación, documentación y participantes de la
                operación para que puedas decidir con información y acompañamiento local.
              </p>

              <div className="foreign-actions">
                <a
                  className="foreign-btn foreign-btn-primary"
                  href="/servicios/clientes-extranjeros?need=comprar#asesoria-extranjeros"
                  data-event="foreign_buy_cta_click"
                >
                  Quiero comprar en Monterrey
                </a>
                <a
                  className="foreign-btn foreign-btn-secondary"
                  href="/servicios/clientes-extranjeros?need=rentar#asesoria-extranjeros"
                  data-event="foreign_rent_cta_click"
                >
                  Busco una propiedad en renta
                </a>
              </div>

              <div className="foreign-hero-links">
                <a
                  href="/servicios/clientes-extranjeros?need=invertir#asesoria-extranjeros"
                  data-event="foreign_invest_cta_click"
                >
                  Quiero invertir en Nuevo León →
                </a>
                <a
                  href="/servicios/clientes-extranjeros?need=empresa#asesoria-extranjeros"
                  data-event="foreign_company_cta_click"
                >
                  Apoyo para mi empresa o ejecutivos →
                </a>
              </div>
            </div>

            <aside className="foreign-hero-panel" aria-label="Atención para clientes extranjeros">
              <span>ATENCIÓN MULTILINGÜE</span>
              <h2>
                <span lang="es">Español</span>, <span lang="en">English</span> y{' '}
                <span lang="zh-Hans">中文</span>
              </h2>
              <p>
                Atención directa en español, inglés y mandarín. Para otros idiomas podemos
                coordinar intérprete o traductor, sujeto a disponibilidad.
              </p>
              <ol>
                <li>Definimos tu necesidad y presupuesto.</li>
                <li>Buscamos en toda la red inmobiliaria.</li>
                <li>Coordinamos documentación y negociación.</li>
                <li>Acompañamos hasta la firma y entrega.</li>
              </ol>
              <Link className="foreign-inline-link foreign-inline-link-light" href="#como-trabajamos">
                Conoce el proceso →
              </Link>
            </aside>
          </div>
        </section>

        <section className="foreign-section foreign-paths-section">
          <div className="foreign-shell">
            <div className="foreign-section-heading foreign-section-heading-centered">
              <p className="section-label">¿EN QUÉ PODEMOS AYUDARTE?</p>
              <h2 className="foreign-section-title">Una ruta para cada necesidad inmobiliaria</h2>
              <p>
                Personas, familias, inversionistas y empresas pueden comenzar desde un mismo punto
                y continuar con el servicio especializado que corresponda.
              </p>
            </div>

            <div className="foreign-path-grid">
              {servicePaths.map((path) => (
                <article className="foreign-path-card" key={path.title}>
                  <span>{path.eyebrow}</span>
                  <h3>{path.title}</h3>
                  <p>{path.description}</p>
                  <div className="foreign-path-actions">
                    <a href={path.href}>Solicitar asesoría →</a>
                    <Link href={path.relatedHref}>{path.relatedLabel}</Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="foreign-section">
          <div className="foreign-shell">
            <div className="foreign-section-heading foreign-section-heading-centered">
              <p className="section-label">ACOMPAÑAMIENTO LOCAL</p>
              <h2 className="foreign-section-title">Más que encontrar una propiedad</h2>
              <p>
                Nuestro trabajo es ordenar la operación, explicar sus etapas y mantener coordinadas
                a las personas e instituciones que intervienen.
              </p>
            </div>

            <div className="foreign-difference-grid">
              {differentiators.map((item, index) => (
                <article className="foreign-card" key={item.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="foreign-section foreign-sre-section" id="tramite-sre">
          <div className="foreign-shell foreign-sre-grid">
            <div className="foreign-sre-copy">
              <p className="section-label foreign-label-light">COMPRADORES EXTRANJEROS</p>
              <h2 className="foreign-section-title foreign-title-light">
                Gestión del convenio ante la SRE sin honorarios para clientes de Rednorte
              </h2>
              <p>
                Cuando la compra requiera el convenio de renuncia para adquirir un inmueble fuera
                de la zona restringida, Rednorte prepara y gestiona el trámite sin cobrar honorarios
                de gestoría a los clientes extranjeros que compran con nosotros.
              </p>
              <div className="foreign-sre-fee">
                <span>Derecho gubernamental vigente en {SRE_FEE_YEAR}</span>
                <strong>${SRE_FEE_MXN.toLocaleString('es-MX')} MXN</strong>
                <small>Lo paga el comprador directamente. El importe oficial puede cambiar.</small>
              </div>
              <p className="foreign-sre-disclaimer">
                No se incluyen impuestos, gastos notariales, traducciones, apostillas, avalúos ni
                servicios de terceros. El trámite aplicable depende de la ubicación del inmueble,
                nacionalidad, forma de adquisición y estructura jurídica de la operación.
              </p>
              <div className="foreign-sre-links">
                <a
                  href="https://portales.sre.gob.mx/tramites-dgaj/art-27-constitucional/convenio-de-renuncia-para-la-adquisicion-de-inmuebles-fuera-de-la-zona-restringida"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar trámite oficial de la SRE →
                </a>
                <a
                  href="https://portales.sre.gob.mx/tramites-dgaj/art-27-constitucional/costos-y-tiempos"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Consultar costos oficiales vigentes →
                </a>
              </div>
            </div>

            <aside className="foreign-documents-card">
              <span>DOCUMENTACIÓN ORIENTATIVA</span>
              <h3>Información que puede solicitarse</h3>
              <ul>
                {sreDocuments.map((document) => (
                  <li key={document}>{document}</li>
                ))}
              </ul>
              <small>
                La lista definitiva se confirma según el caso y los requisitos oficiales vigentes.
                Los documentos se solicitan posteriormente por un canal adecuado; no deben enviarse
                mediante el formulario general de esta página.
              </small>
            </aside>
          </div>
        </section>

        <section className="foreign-section foreign-rent-section">
          <div className="foreign-shell foreign-two-column">
            <div>
              <p className="section-label">RENTA Y VIVIENDA CORPORATIVA</p>
              <h2 className="foreign-section-title">
                Opciones para personas, familias y ejecutivos trasladados
              </h2>
              <p className="foreign-section-intro">
                Definimos ubicación, presupuesto, fecha, características y condiciones del contrato.
                Después buscamos, coordinamos visitas y acompañamos la negociación y entrega.
              </p>
              <Link className="foreign-inline-link" href="/servicios/rentar-propiedad">
                Conocer el servicio para rentar una propiedad →
              </Link>
            </div>

            <div className="foreign-rent-cards">
              <article>
                <h3>Investigación y contrato</h3>
                <p>
                  Rednorte puede coordinar con Ávalo la investigación de personas extranjeras,
                  incluso utilizando documentación de su país de origen, así como contrato y
                  protección jurídica cuando corresponda.
                </p>
              </article>
              <article>
                <h3>Rentas corporativas</h3>
                <p>
                  Atendemos empresas que rentan vivienda para sus ejecutivos y coordinamos la
                  revisión de la persona moral, condiciones, contrato, inventario y entrega.
                </p>
              </article>
              <article>
                <h3>Alcance inmobiliario</h3>
                <p>
                  Nuestro servicio se concentra en la propiedad y la operación. Por ahora no
                  gestionamos escuelas, mudanza, cuentas bancarias, transporte u otros servicios de
                  relocation integral.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="foreign-section foreign-company-section">
          <div className="foreign-shell foreign-company-grid">
            <div>
              <p className="section-label foreign-label-light">EMPRESAS INTERNACIONALES</p>
              <h2 className="foreign-section-title foreign-title-light">
                Soluciones inmobiliarias para nuevas operaciones y expansión en Nuevo León
              </h2>
              <p>
                Podemos ayudar a una empresa a buscar oficinas, naves, bodegas, terrenos, patios y
                vivienda para ejecutivos, conectando cada necesidad con el servicio especializado de
                Rednorte.
              </p>
            </div>
            <div className="foreign-company-links">
              <Link href="/servicios/inmobiliaria-comercial">Oficinas y espacios comerciales →</Link>
              <Link href="/servicios/inmobiliaria-industrial">Naves, bodegas y terrenos industriales →</Link>
              <a href="/servicios/clientes-extranjeros?need=ejecutivos#asesoria-extranjeros">
                Vivienda para ejecutivos →
              </a>
            </div>
          </div>
        </section>

        <section className="foreign-section" id="como-trabajamos">
          <div className="foreign-shell">
            <div className="foreign-section-heading foreign-section-heading-centered">
              <p className="section-label">CÓMO TRABAJAMOS</p>
              <h2 className="foreign-section-title">Del primer contacto a la entrega</h2>
              <p>
                Un proceso ordenado permite comprender la operación, anticipar documentos y coordinar
                cada etapa con mayor claridad.
              </p>
            </div>

            <div className="foreign-process-grid">
              {processSteps.map((step, index) => (
                <article className="foreign-process-card" key={step.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="foreign-section foreign-experience-section">
          <div className="foreign-shell foreign-experience-grid">
            <div>
              <p className="section-label">EXPERIENCIA INTERNACIONAL</p>
              <h2 className="foreign-section-title">
                Hemos acompañado a clientes de distintos países en Monterrey
              </h2>
              <p className="foreign-section-intro">
                Cada operación es diferente. La experiencia con perfiles internacionales nos ayuda a
                identificar necesidades de comunicación, documentación y coordinación desde el inicio.
                También acompañamos a mexicanos que viven fuera del país y desean comprar o invertir
                en Nuevo León.
              </p>
            </div>
            <div className="foreign-country-list" aria-label="Países de clientes atendidos">
              {countries.map((country) => (
                <span key={country}>{country}</span>
              ))}
              <span>Entre otros</span>
            </div>
          </div>
        </section>

        <section className="foreign-section foreign-reviews-section">
          <div className="foreign-shell">
            <div className="foreign-section-heading foreign-section-heading-centered">
              <p className="section-label">EXPERIENCIAS DE CLIENTES</p>
              <h2 className="foreign-section-title">Opiniones de clientes internacionales</h2>
            </div>
            <div
              id="foreign-clients-reviews-slot"
              className="foreign-reviews-slot"
              data-component="google-reviews"
            >
              <TrustindexWidget />
            </div>
          </div>
        </section>

        <section className="foreign-section foreign-faq-section">
          <div className="foreign-shell">
            <div className="foreign-section-heading foreign-section-heading-centered">
              <p className="section-label">PREGUNTAS FRECUENTES</p>
              <h2 className="foreign-section-title">Dudas sobre bienes raíces para extranjeros</h2>
            </div>

            <div className="foreign-faq-list">
              {faqs.map((faq, index) => (
                <details className="foreign-faq-item" key={faq.question} open={index === 0}>
                  <summary>
                    <span>{faq.question}</span>
                    <span className="foreign-faq-icon" aria-hidden="true">+</span>
                  </summary>
                  <p>{faq.answer}</p>
                </details>
              ))}
            </div>

            <div className="foreign-faq-action">
              <Link className="foreign-btn foreign-btn-dark" href="/preguntas-frecuentes">
                Ver todas las preguntas frecuentes
              </Link>
            </div>
          </div>
        </section>

        <section className="foreign-form-section" id="asesoria-extranjeros">
          <div className="foreign-shell foreign-form-grid">
            <div className="foreign-form-copy">
              <p className="section-label foreign-label-light">ASESORÍA PARA EXTRANJEROS</p>
              <h2>Cuéntanos qué necesitas en Monterrey o Nuevo León</h2>
              <p>
                Comparte tu objetivo, país de origen, idioma, fecha y presupuesto. Un integrante de
                Rednorte se comunicará contigo para definir el siguiente paso.
              </p>
              <ul>
                <li>Compra, renta e inversión.</li>
                <li>Oficinas e inmuebles industriales.</li>
                <li>Vivienda para ejecutivos.</li>
                <li>Orientación sobre documentación y SRE.</li>
              </ul>
              <p className="foreign-form-privacy-note">
                No envíes pasaporte, CURP, RFC, documento migratorio, escrituras ni otros documentos
                sensibles mediante este formulario. Después de revisar tu caso te indicaremos el
                canal adecuado.
              </p>
              <WhatsAppGateButton
                className="foreign-inline-link foreign-inline-link-light"
                source="Clientes extranjeros"
              >
                Hablar por WhatsApp →
              </WhatsAppGateButton>
            </div>
            <ForeignClientsForm />
          </div>
        </section>

        <section className="foreign-section foreign-related-section">
          <div className="foreign-shell">
            <div className="foreign-section-heading">
              <p className="section-label">SERVICIOS RELACIONADOS</p>
              <h2 className="foreign-section-title">Continúa según tu objetivo</h2>
            </div>
            <div className="foreign-related-grid">
              <Link href="/servicios/comprar-propiedad">Comprar una propiedad →</Link>
              <Link href="/servicios/rentar-propiedad">Rentar una propiedad →</Link>
              <Link href="/servicios/inversion-inmobiliaria">Inversión y preventas →</Link>
              <Link href="/servicios/inmobiliaria-comercial">Inmobiliaria comercial →</Link>
              <Link href="/servicios/inmobiliaria-industrial">Inmobiliaria industrial →</Link>
              <Link href="/herramientas/estimacion-de-valor">Estimación de valor →</Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
