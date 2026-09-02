import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'Servicios inmobiliarios en Monterrey',
  description:
    'Conoce los servicios de Rednorte Inmobiliaria para vender, rentar, comprar, invertir, estimar el valor de una propiedad y atender operaciones comerciales, industriales y clientes extranjeros en Nuevo León.',
  alternates: {
    canonical: '/servicios',
  },
  openGraph: {
    title: 'Servicios inmobiliarios en Monterrey | Rednorte',
    description:
      'Soluciones para propietarios, compradores, inversionistas y empresas: venta, renta, compra, inversión, comercial, industrial, estimación de valor, clientes extranjeros y Master Broker.',
    url: '/servicios',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Servicios inmobiliarios en Monterrey | Rednorte',
    description:
      'Servicios inmobiliarios para propietarios, compradores, inversionistas y empresas en Monterrey y Nuevo León.',
  },
};

const ownerServices = [
  {
    number: '01',
    title: 'Vender una propiedad',
    description:
      'Analizamos el valor, la competencia y las condiciones del inmueble para definir una estrategia de posicionamiento, promoción, negociación y cierre.',
    cta: 'Quiero vender mi propiedad',
    href: '/servicios/vender-propiedad',
  },
  {
    number: '02',
    title: 'Rentar una propiedad',
    description:
      'Estimamos la renta, promovemos el inmueble, perfilamos e investigamos prospectos y coordinamos negociación, contrato y entrega.',
    cta: 'Quiero rentar mi propiedad',
    href: '/servicios/rentar-propiedad',
  },
  {
    number: '03',
    title: 'Estimación de valor inmobiliario',
    description:
      'Obtén una referencia inicial y conoce los factores que influyen en el valor comercial de una propiedad antes de tomar una decisión.',
    cta: 'Conocer el servicio',
    href: '/servicios/estimacion-de-valor',
    destinoTemporal: '/herramientas/estimacion-de-valor',
  },
];

const buyerServices = [
  {
    number: '04',
    title: 'Comprar una propiedad',
    description:
      'Buscamos en nuestro inventario y en la red inmobiliaria para comparar opciones, negociar condiciones y acompañarte hasta la entrega.',
    cta: 'Quiero comprar una propiedad',
    href: '/servicios/comprar-propiedad',
  },
  {
    number: '05',
    title: 'Inversión inmobiliaria y preventas',
    description:
      'Primero entendemos qué quieres lograr con tu inversión y después analizamos alternativas según flujo, plusvalía, patrimonio, preventa u otras estrategias.',
    cta: 'Quiero analizar una inversión',
    href: '/servicios/inversion-inmobiliaria',
  },
  {
    number: '06',
    title: 'Clientes extranjeros',
    description:
      'Acompañamiento local para comprar, rentar o invertir en Nuevo León, incluyendo coordinación documental y gestión ante la SRE cuando resulte aplicable.',
    cta: 'Conocer atención internacional',
    href: '/servicios/clientes-extranjeros',
  },
];

const specializedServices = [
  {
    number: '07',
    title: 'Inmobiliaria comercial',
    description:
      'Asesoría para comprar, vender o rentar locales, oficinas, consultorios, edificios, terrenos y otros espacios comerciales.',
    cta: 'Ver servicio comercial',
    href: '/servicios/inmobiliaria-comercial',
    destinoTemporal: '/servicios/comercial-industrial',
  },
  {
    number: '08',
    title: 'Inmobiliaria industrial',
    description:
      'Búsqueda y comercialización de naves, bodegas, terrenos, patios, parques industriales y proyectos build-to-suit.',
    cta: 'Ver servicio industrial',
    href: '/servicios/inmobiliaria-industrial',
    destinoTemporal: '/servicios/comercial-industrial',
  },
  {
    number: '09',
    title: 'Master Broker',
    description:
      'Estrategia exclusiva de venta con coordinación centralizada de Rednorte y una red de colaboración inmobiliaria ampliada, incluyendo MBN cuando corresponde.',
    cta: 'Conocer Master Broker',
    href: '/servicios/master-broker',
  },
];

const allServices = [...ownerServices, ...buyerServices, ...specializedServices];

// Seis de los nueve servicios todavia no tienen pagina propia. Mientras
// llegan, su tarjeta apunta a `destinoTemporal` — una pagina real y
// relacionada — en vez de dejar el enlace en 404. Cuando llegue la pagina
// definitiva basta con borrar esa linea del servicio: el href de destino ya
// esta escrito y es el que usan los datos estructurados.
//
// El ItemList solo declara los servicios que YA tienen su pagina: anunciarle
// a Google una URL que devuelve 404 seria peor que no anunciarla.
const publishedServices = allServices.filter((s) => !s.destinoTemporal);

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      '@id': 'https://www.rednorte.mx/servicios#webpage',
      name: 'Servicios inmobiliarios de Rednorte Inmobiliaria',
      description:
        'Servicios inmobiliarios para propietarios, compradores, inversionistas, empresas y clientes extranjeros en Monterrey y Nuevo León.',
      url: 'https://www.rednorte.mx/servicios',
      isPartOf: {
        '@id': 'https://www.rednorte.mx/#website',
      },
      about: {
        '@type': 'RealEstateAgent',
        name: 'Rednorte Inmobiliaria',
        url: 'https://www.rednorte.mx/',
      },
    },
    {
      '@type': 'ItemList',
      '@id': 'https://www.rednorte.mx/servicios#service-list',
      name: 'Servicios inmobiliarios de Rednorte',
      numberOfItems: publishedServices.length,
      itemListElement: publishedServices.map((service, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: service.title,
        url: `https://www.rednorte.mx${service.href}`,
      })),
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
      ],
    },
  ],
};

function ServiceCard({ service }) {
  return (
    <Link className="services-hub-card" href={service.destinoTemporal || service.href}>
      <span className="services-hub-number" aria-hidden="true">
        {service.number}
      </span>
      <h3>{service.title}</h3>
      <p>{service.description}</p>
      <span className="services-hub-link">{service.cta} →</span>
    </Link>
  );
}

function ServiceGroup({ label, title, description, services, id }) {
  return (
    <section className="services-hub-group" id={id}>
      <div className="services-hub-shell">
        <div className="services-hub-heading">
          <p className="section-label">{label}</p>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        <div className="services-hub-grid">
          {services.map((service) => (
            <ServiceCard key={service.href} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function ServiciosPage() {
  return (
    <div className="page-content services-hub-page">
      <Breadcrumb items={[{ label: 'Servicios' }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="services-hub-hero">
        <div className="services-hub-shell services-hub-hero-grid">
          <div>
            <p className="section-label services-hub-label-light">SERVICIOS INMOBILIARIOS</p>
            <h1>Servicios inmobiliarios en Monterrey para comprar, vender, rentar e invertir</h1>
            <p className="services-hub-hero-lead">
              Rednorte acompaña a propietarios, compradores, inversionistas y empresas con
              soluciones inmobiliarias adaptadas al objetivo de cada operación.
            </p>
            <p className="services-hub-hero-support">
              Explora nuestros servicios y encuentra el punto de entrada adecuado para tu
              propiedad, búsqueda o inversión en Nuevo León.
            </p>
            <div className="services-hub-actions">
              <Link className="services-hub-btn services-hub-btn-primary" href="#propietarios">
                Soy propietario
              </Link>
              <Link className="services-hub-btn services-hub-btn-secondary" href="#compradores">
                Quiero comprar o invertir
              </Link>
            </div>
          </div>

          <div className="services-hub-hero-panel">
            <span>9 SERVICIOS</span>
            <h2>Una estructura clara para necesidades distintas</h2>
            <ul>
              <li>Propietarios que quieren vender, rentar o conocer el valor de un inmueble.</li>
              <li>Compradores e inversionistas que buscan comparar y decidir con más información.</li>
              <li>Empresas y operaciones comerciales, industriales o de alta coordinación.</li>
            </ul>
            <Link className="services-hub-inline-link" href="/contacto">
              No sé qué servicio necesito →
            </Link>
          </div>
        </div>
      </section>

      <ServiceGroup
        id="propietarios"
        label="PARA PROPIETARIOS"
        title="Posiciona, comercializa o conoce mejor tu propiedad"
        description="Servicios para propietarios que necesitan definir precio, estrategia, promoción, investigación de prospectos o acompañamiento hasta el cierre."
        services={ownerServices}
      />

      <ServiceGroup
        id="compradores"
        label="PARA COMPRADORES E INVERSIONISTAS"
        title="Encuentra y analiza la opción que corresponde a tu objetivo"
        description="Búsqueda, comparación, negociación e inversión con acceso al inventario de Rednorte y a nuestra red inmobiliaria."
        services={buyerServices}
      />

      <ServiceGroup
        id="especializados"
        label="SERVICIOS ESPECIALIZADOS"
        title="Operaciones comerciales, industriales y de coordinación ampliada"
        description="Soluciones para empresas, propietarios, desarrolladores, instituciones y activos que requieren una estrategia más especializada."
        services={specializedServices}
      />

      <section className="services-hub-tools">
        <div className="services-hub-shell services-hub-tools-grid">
          <div>
            <p className="section-label">HERRAMIENTAS GRATUITAS</p>
            <h2>Empieza con información antes de tomar una decisión</h2>
            <p>
              Utiliza nuestras herramientas para obtener una referencia inicial sobre el valor o
              la vendibilidad de tu propiedad antes de hablar con un asesor.
            </p>
          </div>
          <div className="services-hub-tools-actions">
            <Link className="services-hub-tool-card" href="/herramientas/estimacion-de-valor">
              <strong>Estimación de valor</strong>
              <span>Obtén una referencia inicial del valor comercial de tu propiedad.</span>
              <b>Usar herramienta →</b>
            </Link>
            <Link className="services-hub-tool-card" href="/herramientas/reporte-de-vendibilidad">
              <strong>Reporte de vendibilidad</strong>
              <span>Evalúa precio, presentación, documentación y estrategia comercial.</span>
              <b>Generar diagnóstico →</b>
            </Link>
          </div>
        </div>
      </section>

      <section className="services-hub-final-cta">
        <div className="services-hub-shell services-hub-final-card">
          <div>
            <p className="section-label services-hub-label-light">¿NO SABES POR DÓNDE EMPEZAR?</p>
            <h2>Cuéntanos qué necesitas y te orientamos al servicio adecuado</h2>
            <p>
              Un integrante de Rednorte puede ayudarte a definir el siguiente paso según tu
              propiedad, objetivo, presupuesto o tipo de operación.
            </p>
          </div>
          <div className="services-hub-final-actions">
            <Link className="services-hub-btn services-hub-btn-primary" href="/contacto">
              Hablar con Rednorte
            </Link>
            <a
              className="services-hub-btn services-hub-btn-secondary"
              href="https://wa.me/528117783953"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
