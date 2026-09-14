import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import BuyPropertyForm from '@/components/BuyPropertyForm';
import TrustindexWidget from '@/components/TrustindexWidget';
import { SITE_CONTACT } from '@/lib/siteConfig';

export const metadata = {
  title: 'Comprar una propiedad en Monterrey y Nuevo León',
  description:
    'Rednorte te ayuda a encontrar, comparar, negociar y coordinar la compra de casas, departamentos, terrenos y otros inmuebles en Nuevo León, sin comisión para el comprador.',
  alternates: {
    canonical: '/servicios/comprar-propiedad',
  },
  openGraph: {
    title: 'Comprar una propiedad en Monterrey | Rednorte',
    description:
      'Busca en toda la red inmobiliaria, compara opciones con más información y recibe acompañamiento hasta la firma y entrega.',
    url: '/servicios/comprar-propiedad',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Comprar una propiedad en Monterrey | Rednorte',
    description:
      'Asesoría para buscar, comparar, negociar y coordinar la compra de una propiedad en Monterrey y Nuevo León.',
  },
};

const searchProfiles = [
  {
    title: 'Para vivir',
    description:
      'Casas y departamentos nuevos o usados para personas, parejas y familias que buscan un hogar acorde con su presupuesto y estilo de vida.',
  },
  {
    title: 'Para patrimonio',
    description:
      'Terrenos, quintas y propiedades que pueden formar parte de una estrategia patrimonial o de uso futuro.',
  },
  {
    title: 'Propiedad nueva o preventa',
    description:
      'Opciones terminadas, en construcción o en preventa, comparadas según necesidades, tiempos y condiciones de compra.',
  },
  {
    title: 'Para negocio o industria',
    description:
      'Locales, oficinas, bodegas, naves y terrenos para empresas, con acceso a páginas y asesoría especializadas.',
  },
];

const processSteps = [
  {
    title: 'Entendemos lo que necesitas',
    description:
      'Definimos uso, presupuesto, forma de pago, zonas, características indispensables, tiempos y nivel de flexibilidad.',
  },
  {
    title: 'Ordenamos la capacidad de compra',
    description:
      'Revisamos si la compra será de contado, con crédito o mixta, para enfocar la búsqueda en opciones realmente viables.',
  },
  {
    title: 'Buscamos en toda la red',
    description:
      'Consultamos inventario propio y opciones de otras inmobiliarias para no limitar la búsqueda a una sola cartera.',
  },
  {
    title: 'Comparamos alternativas',
    description:
      'Te ayudamos a contrastar precio, ubicación, características, mantenimiento, condiciones y documentación disponible.',
  },
  {
    title: 'Preparamos y negociamos la oferta',
    description:
      'Acompañamos carta oferta, precio, muebles, reparaciones, tiempos, entrega y demás condiciones aplicables.',
  },
  {
    title: 'Coordinamos hasta la entrega',
    description:
      'Damos seguimiento a documentación, crédito, avalúo, notaría, firma, pagos y entrega del inmueble.',
  },
];

const comparisonPoints = [
  {
    title: 'Precio y alternativas',
    description:
      'Comparamos el precio solicitado con otras opciones disponibles y con las condiciones particulares del inmueble.',
  },
  {
    title: 'Aspectos positivos y negativos',
    description:
      'Te compartimos nuestra opinión con claridad. La decisión final siempre es del comprador.',
  },
  {
    title: 'Condiciones de la operación',
    description:
      'Revisamos información inicial disponible y coordinamos la revisión definitiva con notaría, banco o especialistas cuando corresponde.',
  },
];

const avoidableMistakes = [
  'Empezar a buscar sin conocer la capacidad real de compra.',
  'Limitarse a un solo inventario o recibir opciones duplicadas sin un criterio común.',
  'Comparar únicamente el precio total y no las condiciones de cada propiedad.',
  'Hacer una oferta sin contemplar gastos de escrituración, avalúo o crédito.',
  'Avanzar sin revisar la documentación y los términos de la operación.',
];

const faqs = [
  {
    question: '¿El comprador paga comisión a Rednorte?',
    answer:
      'No. El comprador no paga comisión a Rednorte por el acompañamiento estándar de búsqueda y compra. La comisión normalmente es cubierta por el propietario, desarrollador o parte que comercializa el inmueble. Cualquier servicio extraordinario tendría que acordarse previamente y por escrito.',
  },
  {
    question: '¿Rednorte muestra solamente propiedades de su inventario?',
    answer:
      'No. Revisamos el inventario de Rednorte y opciones disponibles mediante la red inmobiliaria. Nuestro objetivo es encontrar alternativas que se ajusten a la necesidad del comprador, no limitar la búsqueda a las propiedades que nosotros captamos directamente.',
  },
  {
    question: '¿Pueden ayudarme si necesito crédito hipotecario?',
    answer:
      'Sí. Podemos coordinarte con SOC Roch para revisar capacidad, preaprobación, alternativas de financiamiento, integración de expediente y seguimiento con la institución financiera. Las condiciones finales del crédito y del servicio del broker se confirman directamente con las partes correspondientes.',
  },
  {
    question: '¿Puedo comprar una propiedad nueva, usada o en preventa?',
    answer:
      'Sí. Rednorte puede buscar propiedades usadas, nuevas, desarrollos horizontales, departamentos en construcción y preventas. Cuando la compra tiene un objetivo de inversión, también podemos vincularte con nuestro servicio de inversión inmobiliaria para profundizar en rendimiento, riesgo y estrategia.',
  },
  {
    question: '¿Qué pasa si Rednorte detecta aspectos negativos en una propiedad?',
    answer:
      'Te compartimos nuestra opinión y explicamos los aspectos positivos y negativos que identifiquemos con la información disponible. No decidimos por ti ni prohibimos una compra; nuestro papel es ayudarte a tomar una decisión con mayor contexto. La decisión final siempre corresponde al comprador.',
  },
  {
    question: '¿Quién elige la notaría?',
    answer:
      'Normalmente el comprador puede elegir la notaría. Cuando la operación se realiza con crédito hipotecario, la institución financiera suele asignar o definir la notaría conforme a sus procesos. Rednorte coordina la comunicación y el avance con las partes involucradas.',
  },
  {
    question: '¿A quién se entrega el apartado o anticipo?',
    answer:
      'Depende de la estructura de la operación. El recurso puede entregarse al propietario, desarrollador, notaría u otra parte autorizada y, en ciertos casos, a Rednorte. Antes de realizar cualquier pago deben quedar claros el destinatario, concepto, condiciones y comprobante correspondiente.',
  },
  {
    question: '¿Qué apoyo recibo después de comprar?',
    answer:
      'Rednorte puede seguir apoyándote si posteriormente quieres rentar, vender o estimar nuevamente el valor de la propiedad. Para operaciones de renta también podemos coordinar investigación, contrato y protección jurídica mediante Ávalo, cuando aplique.',
  },
];

const serviceSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Service',
      '@id': 'https://www.rednorte.mx/servicios/comprar-propiedad#service',
      name: 'Asesoría para comprar una propiedad',
      serviceType: 'Búsqueda, comparación, negociación y coordinación de compra inmobiliaria',
      description:
        'Asesoría para comprar casas, departamentos, terrenos y otros inmuebles en Monterrey y Nuevo León, con búsqueda en la red inmobiliaria, apoyo hipotecario, negociación y coordinación hasta la entrega.',
      url: 'https://www.rednorte.mx/servicios/comprar-propiedad',
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
          name: 'Comprar una propiedad',
          item: 'https://www.rednorte.mx/servicios/comprar-propiedad',
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

export default function ComprarPropiedadPage() {
  return (
    <div className="page-content buy-page">
      <Breadcrumb
        items={[
          { label: 'Servicios', href: '/servicios' },
          { label: 'Comprar una propiedad' },
        ]}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="buy-hero">
        <div className="buy-shell buy-hero-grid">
          <div className="buy-hero-copy">
            <p className="section-label buy-label-light">SERVICIO PARA COMPRADORES</p>
            <h1>Compra una propiedad en Monterrey con asesoría para elegir mejor</h1>
            <p className="buy-hero-lead">
              No se trata de mostrarte más propiedades. Se trata de ayudarte a encontrar,
              comparar y negociar la opción que mejor se adapta a lo que necesitas.
            </p>
            <p className="buy-hero-support">
              Buscamos en el inventario de Rednorte y en toda la red inmobiliaria, acompañándote
              desde el perfilamiento inicial hasta la firma y entrega.
            </p>

            <div className="buy-actions">
              <Link
                className="buy-btn buy-btn-primary"
                href="#buscar-propiedad"
                data-event="buy_property_primary_cta_click"
              >
                Quiero encontrar una propiedad
              </Link>
              <Link
                className="buy-btn buy-btn-secondary"
                href="/propiedades"
                data-event="buy_property_inventory_click"
              >
                Ver propiedades disponibles
              </Link>
            </div>

            <p className="buy-no-fee-note">
              <strong>Sin comisión para el comprador:</strong> el acompañamiento estándar de
              Rednorte es cubierto normalmente por la parte que comercializa el inmueble.
            </p>
          </div>

          <aside className="buy-hero-panel" aria-label="Cómo comienza la búsqueda">
            <span>UNA BÚSQUEDA CON DIRECCIÓN</span>
            <h2>Primero entendemos tu necesidad</h2>
            <ol>
              <li>Definimos presupuesto, uso y características.</li>
              <li>Ordenamos la forma de pago o financiamiento.</li>
              <li>Buscamos opciones dentro y fuera de nuestro inventario.</li>
              <li>Comparamos, negociamos y coordinamos la compra.</li>
            </ol>
            <Link className="buy-inline-link buy-inline-link-light" href="#como-trabajamos">
              Conoce el proceso →
            </Link>
          </aside>
        </div>
      </section>

      <section className="buy-section buy-difference-section">
        <div className="buy-shell">
          <div className="buy-section-heading buy-section-heading-centered">
            <p className="section-label">ELEGIR MEJOR</p>
            <h2 className="buy-section-title">
              No se trata de enseñarte más propiedades. Se trata de ayudarte a elegir mejor.
            </h2>
            <p>
              Centralizamos la búsqueda, comparamos alternativas y compartimos nuestra opinión
              para que puedas decidir con más información.
            </p>
          </div>

          <div className="buy-difference-grid">
            <article className="buy-card">
              <span>01</span>
              <h3>Búsqueda en toda la red</h3>
              <p>
                No limitamos las opciones al inventario de Rednorte. Consultamos propiedades de
                otras inmobiliarias y actores del mercado.
              </p>
            </article>
            <article className="buy-card">
              <span>02</span>
              <h3>Opinión clara</h3>
              <p>
                Te explicamos aspectos positivos y negativos cuando los identificamos. La decisión
                final siempre es tuya.
              </p>
            </article>
            <article className="buy-card">
              <span>03</span>
              <h3>Acompañamiento hasta la entrega</h3>
              <p>
                Coordinamos oferta, negociación, documentación, crédito, notaría, firma y entrega
                con las partes involucradas.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="buy-section buy-commitment-section">
        <div className="buy-shell buy-commitment-grid">
          <div>
            <p className="section-label buy-label-light">COMPROMISO MUTUO</p>
            <h2 className="buy-section-title buy-title-light">
              Una búsqueda eficiente requiere tiempo, seguimiento y comunicación
            </h2>
          </div>
          <div>
            <p>
              El asesor se compromete a entender la necesidad, investigar opciones, organizar
              visitas y dar seguimiento. Para que ese trabajo sea efectivo, esperamos que el
              comprador centralice su búsqueda con Rednorte, comunique cambios y respete el tiempo
              invertido en el proceso.
            </p>
            <p>
              Si existe un acuerdo de representación, sus condiciones se establecen previamente y
              por escrito.
            </p>
          </div>
        </div>
      </section>

      <section className="buy-section buy-types-section">
        <div className="buy-shell">
          <div className="buy-section-heading">
            <p className="section-label">TIPOS DE BÚSQUEDA</p>
            <h2 className="buy-section-title">Una propiedad para cada objetivo</h2>
            <p>
              Atendemos compradores de vivienda, patrimonio, negocio e inversión en los principales
              mercados de Nuevo León.
            </p>
          </div>

          <div className="buy-types-grid">
            {searchProfiles.map((profile) => (
              <article className="buy-type-card" key={profile.title}>
                <h3>{profile.title}</h3>
                <p>{profile.description}</p>
              </article>
            ))}
          </div>

          <div className="buy-related-inline">
            <Link href="/servicios/inversion-inmobiliaria">
              ¿Buscas rendimiento o plusvalía? Conoce Inversión inmobiliaria →
            </Link>
            <Link href="/servicios/inmobiliaria-industrial">
              ¿Buscas una nave, bodega o terreno industrial? Ver servicio industrial →
            </Link>
          </div>
        </div>
      </section>

      <section className="buy-section" id="como-trabajamos">
        <div className="buy-shell">
          <div className="buy-section-heading">
            <p className="section-label">CÓMO TRABAJAMOS</p>
            <h2 className="buy-section-title">Del perfilamiento a la entrega</h2>
            <p>
              Un proceso ordenado ayuda a enfocar tiempo, comparar mejor y coordinar a todas las
              partes de la operación.
            </p>
          </div>

          <div className="buy-process-grid">
            {processSteps.map((step, index) => (
              <article className="buy-process-card" key={step.title}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="buy-section buy-comparison-section">
        <div className="buy-shell">
          <div className="buy-section-heading buy-section-heading-wide">
            <p className="section-label">ANTES DE DECIDIR</p>
            <h2 className="buy-section-title">Información para comparar con mayor claridad</h2>
            <p>
              Nuestro análisis es una orientación inmobiliaria inicial. La revisión jurídica,
              técnica o especializada definitiva corresponde a la notaría, banco o profesional que
              intervenga en cada operación.
            </p>
          </div>

          <div className="buy-comparison-grid">
            {comparisonPoints.map((point) => (
              <article className="buy-comparison-card" key={point.title}>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="buy-section buy-financing-section">
        <div className="buy-shell buy-financing-grid">
          <div className="buy-financing-copy">
            <p className="section-label">CRÉDITO HIPOTECARIO</p>
            <h2 className="buy-section-title">Define tu capacidad antes de enamorarte de una propiedad</h2>
            <p>
              Cuando necesitas financiamiento, podemos coordinarte con SOC Roch para revisar
              capacidad, preaprobación, alternativas de crédito, expediente y seguimiento con la
              institución financiera.
            </p>
            <p className="buy-disclaimer">
              La aprobación, tasas, condiciones y tiempos dependen de cada institución. El servicio
              hipotecario es prestado por el broker correspondiente.
            </p>
            <Link className="buy-btn buy-btn-dark" href="#buscar-propiedad">
              Quiero revisar mi forma de compra
            </Link>
          </div>

          <div className="buy-partner-card">
            <span>ALIADO HIPOTECARIO</span>
            <div className="buy-partner-logo">
              <Image
                src="/aliados/soc-roch.png"
                alt="SOC Roch, aliado hipotecario de Rednorte Inmobiliaria"
                width={949}
                height={221}
                sizes="(max-width: 720px) 260px, 360px"
              />
            </div>
            <p>
              Acompañamiento especializado para ordenar el expediente y comparar alternativas de
              financiamiento según el perfil del comprador.
            </p>
          </div>
        </div>
      </section>

      <section className="buy-section buy-negotiation-section">
        <div className="buy-shell buy-negotiation-grid">
          <div>
            <p className="section-label buy-label-light">OFERTA, DOCUMENTACIÓN Y CIERRE</p>
            <h2 className="buy-section-title buy-title-light">
              Negociamos las condiciones y coordinamos la operación
            </h2>
            <p>
              Te ayudamos a estructurar la oferta y negociar precio, muebles, reparaciones, fecha
              de entrega, apartado y tiempos de escrituración. También orientamos sobre gastos de
              compra, avalúo, crédito y honorarios notariales.
            </p>
          </div>

          <div className="buy-negotiation-list">
            <div>
              <strong>Revisión inicial</strong>
              <span>
                Documentación disponible, titularidad, predial, servicios, gravámenes y régimen de
                condominio cuando corresponda.
              </span>
            </div>
            <div>
              <strong>Notaría</strong>
              <span>
                Normalmente la elige el comprador; en operaciones con crédito, la institución
                financiera puede asignarla.
              </span>
            </div>
            <div>
              <strong>Entrega</strong>
              <span>
                Seguimiento a firma, pagos, documentación final y entrega de llaves conforme a lo
                acordado.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="buy-section buy-mistakes-section">
        <div className="buy-shell">
          <div className="buy-section-heading">
            <p className="section-label">ERRORES QUE AYUDAMOS A EVITAR</p>
            <h2 className="buy-section-title">Una compra importante merece orden y contexto</h2>
          </div>

          <ul className="buy-mistakes-grid">
            {avoidableMistakes.map((mistake) => (
              <li key={mistake}>{mistake}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="buy-section buy-continuity-section">
        <div className="buy-shell buy-continuity-grid">
          <div>
            <p className="section-label">DESPUÉS DE LA COMPRA</p>
            <h2 className="buy-section-title">La relación puede continuar</h2>
          </div>
          <div>
            <p>
              Si después quieres rentar, vender o volver a estimar el valor de la propiedad,
              Rednorte puede seguir acompañándote. Para rentas también podemos coordinar
              investigación, contrato y protección jurídica mediante Ávalo, cuando corresponda.
            </p>
            <div className="buy-related-actions">
              <Link href="/servicios/rentar-propiedad">Rentar una propiedad →</Link>
              <Link href="/servicios/vender-propiedad">Vender una propiedad →</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="buy-section buy-reviews-section">
        <div className="buy-shell">
          <div className="buy-section-heading buy-section-heading-centered">
            <p className="section-label">EXPERIENCIAS DE CLIENTES</p>
            <h2 className="buy-section-title">Lo que dicen quienes han trabajado con Rednorte</h2>
          </div>

          <div
            id="buy-property-reviews-slot"
            className="buy-reviews-slot"
            data-component="google-reviews"
          >
            <TrustindexWidget />
          </div>
        </div>
      </section>

      <section className="buy-section buy-faq-section">
        <div className="buy-shell">
          <div className="buy-section-heading buy-section-heading-centered">
            <p className="section-label">PREGUNTAS FRECUENTES</p>
            <h2 className="buy-section-title">Dudas comunes antes de comprar</h2>
          </div>

          <div className="buy-faq-list">
            {faqs.map((faq, index) => (
              <details className="buy-faq-item" key={faq.question} open={index === 0}>
                <summary>{faq.question}</summary>
                <div>
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>

          <div className="buy-centered-action">
            <Link className="buy-btn buy-btn-primary" href="/preguntas-frecuentes">
              Ver todas las preguntas frecuentes
            </Link>
          </div>
        </div>
      </section>

      <section className="buy-section buy-form-section" id="buscar-propiedad">
        <div className="buy-shell buy-form-layout">
          <div className="buy-form-copy">
            <p className="section-label buy-label-light">EMPECEMOS TU BÚSQUEDA</p>
            <h2 className="buy-section-title buy-title-light">Cuéntanos qué propiedad buscas</h2>
            <p>
              Comparte tus objetivos, presupuesto y características principales. Un integrante de
              Rednorte revisará la información para organizar el siguiente paso.
            </p>
            <ul>
              <li>La búsqueda no se limita a nuestro inventario.</li>
              <li>El comprador no paga comisión a Rednorte.</li>
              <li>Podemos coordinar crédito hipotecario si lo necesitas.</li>
            </ul>
          </div>

          <BuyPropertyForm />
        </div>
      </section>

      <section className="buy-section buy-related-section">
        <div className="buy-shell">
          <p className="section-label">SERVICIOS RELACIONADOS</p>
          <div className="buy-related-grid">
            <Link href="/propiedades">Ver propiedades disponibles</Link>
            <Link href="/servicios/inversion-inmobiliaria">Inversión inmobiliaria</Link>
            <Link href="/servicios/inmobiliaria-industrial">Inmobiliaria industrial</Link>
            <Link href="/servicios/rentar-propiedad">Rentar una propiedad</Link>
            <Link href="/servicios/vender-propiedad">Vender una propiedad</Link>
            <Link href="/contacto">Hablar con Rednorte</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
