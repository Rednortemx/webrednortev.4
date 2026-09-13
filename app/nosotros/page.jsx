import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'Nosotros | Rednorte Inmobiliaria en Monterrey',
  description:
    'Conoce la historia de Rednorte Inmobiliaria, empresa regiomontana fundada en 2018 para profesionalizar la asesoría inmobiliaria mediante preparación, procesos, análisis y tecnología.',
  alternates: {
    canonical: '/nosotros',
  },
  openGraph: {
    title: 'Nosotros | Rednorte Inmobiliaria',
    description:
      'Desde 2018, Rednorte trabaja para elevar el estándar de la asesoría inmobiliaria en Nuevo León con preparación, procesos, análisis, tecnología y acompañamiento responsable.',
    url: '/nosotros',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nosotros | Rednorte Inmobiliaria',
    description:
      'Empresa inmobiliaria regiomontana fundada en 2018, enfocada en profesionalizar la asesoría inmobiliaria en Nuevo León.',
  },
};

const stats = [
  {
    value: 'Desde 2018',
    label: 'Empresa regiomontana',
  },
  {
    value: '310',
    label: 'Compraventas cerradas desde 2021',
  },
  {
    value: '+$1,500 MDP',
    label: 'En operaciones inmobiliarias cerradas desde 2021',
  },
  {
    value: '+30',
    label: 'Personas en el equipo',
  },
];

const pillars = [
  {
    number: '01',
    title: 'Preparación',
    description:
      'La calidad de la asesoría comienza con personas preparadas. Nuestro equipo participa en capacitación y coaching de forma continua para desarrollar mejores competencias inmobiliarias, comerciales y de atención al cliente.',
  },
  {
    number: '02',
    title: 'Proceso',
    description:
      'Una operación inmobiliaria no debe depender de improvisación. Trabajamos con metodología, seguimiento, documentación y responsabilidades claras desde el análisis inicial hasta el cierre.',
  },
  {
    number: '03',
    title: 'Análisis',
    description:
      'Las recomendaciones deben tener fundamentos. Utilizamos información del mercado, comparables, datos de propiedades y contexto de cada operación para ayudar a tomar decisiones mejor informadas.',
  },
  {
    number: '04',
    title: 'Tecnología',
    description:
      'Integramos CRM, automatización, análisis de datos, inteligencia artificial y conexiones mediante APIs. También desarrollamos herramientas propias para resolver necesidades concretas de nuestra operación y de nuestros clientes.',
  },
  {
    number: '05',
    title: 'Confianza',
    description:
      'Comunicamos oportunidades, riesgos, condiciones y límites con claridad. Nuestro trabajo no consiste en decirle al cliente lo que quiere escuchar, sino en darle información y acompañamiento para que pueda decidir.',
  },
];

const process = [
  {
    number: '01',
    title: 'Entendemos la necesidad',
    description:
      'Primero conocemos el objetivo, contexto, propiedad o búsqueda y las condiciones particulares de la operación.',
  },
  {
    number: '02',
    title: 'Analizamos información',
    description:
      'Revisamos mercado, alternativas, documentación disponible, precio, riesgos y variables relevantes para el caso.',
  },
  {
    number: '03',
    title: 'Definimos y ejecutamos',
    description:
      'Construimos una estrategia, utilizamos los canales y herramientas adecuados y damos seguimiento al proceso.',
  },
  {
    number: '04',
    title: 'Negociamos y coordinamos',
    description:
      'Acompañamos propuestas, negociación, documentación y participantes hasta la formalización y cierre.',
  },
];

const technology = [
  'CRM centralizado e inventario sincronizado',
  'Automatización de procesos y seguimiento',
  'Integraciones mediante APIs y sistemas propios',
  'Análisis de datos e inteligencia artificial aplicada',
  'Estimador de valor inmobiliario para propietarios',
  'Reporte de vendibilidad y herramientas de diagnóstico',
];

const ecosystem = [
  {
    name: 'Ávalo Garantías Jurídicas',
    category: 'Investigación y protección de rentas',
    description:
      'Empresa especializada del ecosistema Rednorte para investigación de arrendatarios, contratos, garantías jurídicas y protección de rentas.',
    href: 'https://avalo.mx',
    external: true,
  },
  {
    name: 'SOC Roch',
    category: 'Crédito hipotecario',
    description:
      'Broker hipotecario aliado para orientar a compradores y apoyar la comparación y gestión de alternativas de financiamiento.',
  },
  {
    name: 'Patrimonista',
    category: 'Administración inmobiliaria',
    description:
      'Aliado especializado para clientes que necesitan servicios de administración inmobiliaria posteriores a una operación.',
    href: 'https://patrimonista.com/',
    external: true,
  },
  {
    name: 'Master Broker Network · MBN',
    category: 'Colaboración inmobiliaria',
    description:
      'Red de colaboración que permite ampliar la coordinación entre inmobiliarias y asesores cuando la estrategia de una propiedad lo requiere.',
    href: 'https://mbn.mx',
    external: true,
  },
  {
    name: 'CANACO Monterrey',
    category: 'Vinculación empresarial',
    description:
      'Rednorte es socio de CANACO Monterrey desde 2026, fortaleciendo su vinculación con la comunidad empresarial de Nuevo León.',
  },
  {
    name: 'Especialistas por operación',
    category: 'Notarías, valuadores y profesionales',
    description:
      'Coordinamos con notarías, valuadores y otros especialistas cuando su participación es necesaria para avanzar o formalizar una operación.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.rednorte.mx/nosotros#webpage',
      url: 'https://www.rednorte.mx/nosotros',
      name: 'Nosotros | Rednorte Inmobiliaria',
      description:
        'Historia, propósito, metodología, cultura y ecosistema de Rednorte Inmobiliaria, empresa fundada en Monterrey en 2018.',
      dateModified: '2026-09-02',
      mainEntity: {
        '@type': ['Organization', 'RealEstateAgent'],
        '@id': 'https://www.rednorte.mx/#organization',
        name: 'Rednorte Inmobiliaria',
        legalName: 'Red de Administración y Compraventa, S.A. de C.V.',
        url: 'https://www.rednorte.mx/',
        foundingDate: '2018-01',
        foundingLocation: {
          '@type': 'Place',
          name: 'Monterrey, Nuevo León, México',
        },
        founder: {
          '@id': 'https://www.rednorte.mx/nosotros#roque-avila',
        },
        numberOfEmployees: {
          '@type': 'QuantitativeValue',
          minValue: 30,
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'Nuevo León, México',
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Av. José Vasconcelos Ote. 215-7, Residencial San Agustín 1er Sector',
          addressLocality: 'San Pedro Garza García',
          addressRegion: 'Nuevo León',
          postalCode: '66260',
          addressCountry: 'MX',
        },
      },
    },
    {
      '@type': 'Person',
      '@id': 'https://www.rednorte.mx/nosotros#roque-avila',
      name: 'Roque Ávila',
      jobTitle: 'Fundador y Presidente',
      worksFor: {
        '@id': 'https://www.rednorte.mx/#organization',
      },
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          name: 'Brigham Young University–Idaho',
        },
        {
          '@type': 'CollegeOrUniversity',
          name: 'Universidad del Valle de México',
        },
      ],
      sameAs: ['https://www.linkedin.com/in/roqueavila/'],
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
          name: 'Nosotros',
          item: 'https://www.rednorte.mx/nosotros',
        },
      ],
    },
  ],
};

function EcosystemCard({ item }) {
  const content = (
    <>
      <span>{item.category}</span>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      {item.href && <b>Conocer más →</b>}
    </>
  );

  if (item.href && item.external) {
    return (
      <a
        className="about-ecosystem-card"
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return <div className="about-ecosystem-card">{content}</div>;
}

export default function NosotrosPage() {
  return (
    <div className="page-content about-page">
      <Breadcrumb items={[{ label: 'Nosotros' }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <section className="about-hero">
        <div className="about-shell about-hero-grid">
          <div>
            <p className="section-label about-label-light">REDNORTE INMOBILIARIA</p>
            <h1>Profesionalizar la asesoría inmobiliaria desde Monterrey</h1>
            <p className="about-hero-lead">
              Rednorte nació en enero de 2018 con una idea sencilla: para ofrecer una mejor
              asesoría inmobiliaria necesitamos personas mejor preparadas, procesos más claros y
              una empresa dispuesta a hacerse responsable de cómo trabaja.
            </p>
            <p className="about-hero-support">
              Hoy acompañamos a propietarios, compradores, arrendadores, inversionistas y
              empresas en todo Nuevo León combinando preparación, análisis, tecnología y
              experiencia local.
            </p>
            <div className="about-actions">
              <Link className="about-btn about-btn-primary" href="/servicios">
                Conocer nuestros servicios
              </Link>
              <Link className="about-btn about-btn-secondary" href="/equipo">
                Conocer al equipo
              </Link>
            </div>
          </div>

          <aside className="about-hero-card">
            <span>NACIMOS EN MONTERREY</span>
            <h2>Conocemos Nuevo León.</h2>
            <p>
              Somos una empresa orgullosamente regiomontana, con sede en San Pedro Garza García
              y cobertura inmobiliaria en todo Nuevo León.
            </p>
            <dl>
              <div>
                <dt>Fundación</dt>
                <dd>Enero de 2018</dd>
              </div>
              <div>
                <dt>Sede</dt>
                <dd>San Pedro Garza García</dd>
              </div>
              <div>
                <dt>Equipo</dt>
                <dd>Más de 30 personas</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="about-story">
        <div className="about-shell about-story-grid">
          <div className="about-story-heading">
            <p className="section-label">NUESTRA HISTORIA</p>
            <h2>De cinco personas y 9 m² a una empresa construida alrededor de la preparación</h2>
          </div>

          <div className="about-story-copy">
            <p>
              Rednorte comenzó en enero de 2018 con cinco personas en una oficina de apenas 9 m²
              dentro de Zari Business Center, en Calzada San Pedro. El objetivo desde el inicio no
              fue simplemente publicar propiedades: fue construir una forma más profesional de
              prestar asesoría inmobiliaria.
            </p>
            <p>
              La idea surgió después de observar un contraste. En servicios financieros, vender
              seguros o productos de inversión requería capacitación, licencias y procesos. Al
              entrar al sector inmobiliario en 2017, nuestro fundador encontró un mercado donde la
              preparación de quien asesoraba podía variar enormemente, aun cuando las decisiones
              involucraban una parte importante del patrimonio de una persona o empresa.
            </p>
            <p>
              Rednorte se construyó para trabajar sobre ese problema. Con el tiempo llegaron más
              personas, nuevos procesos, herramientas y siete espacios de oficina distintos hasta
              llegar a nuestra sede actual en Av. José Vasconcelos. La empresa ha cambiado y
              evolucionado, pero el propósito continúa siendo el mismo: elevar el nivel de la
              asesoría inmobiliaria.
            </p>
          </div>
        </div>
      </section>

      <section className="about-results" aria-labelledby="about-results-title">
        <div className="about-shell">
          <div className="about-section-heading about-section-heading-centered">
            <p className="section-label">RECORRIDO Y EXPERIENCIA</p>
            <h2 id="about-results-title">Resultados construidos operación por operación</h2>
            <p>
              Preferimos hablar de trayectoria con datos verificables y periodos definidos, no con
              cifras aisladas de inventario que cambian todos los días.
            </p>
          </div>

          <div className="about-stats-grid">
            {stats.map((stat) => (
              <div className="about-stat" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>

          <p className="about-methodology-note">
            * Las 310 compraventas corresponden a operaciones cerradas y registradas por Rednorte
            entre el 1 de enero de 2021 y el 2 de septiembre de 2026. El monto superior a $1,500
            millones corresponde al valor acumulado registrado en el portafolio de operaciones de
            compraventa y arrendamiento cerradas por Rednorte durante el mismo periodo. 2026 es un
            año en curso. Estas cifras no representan ingresos ni comisiones de Rednorte.
          </p>
        </div>
      </section>

      <section className="about-purpose">
        <div className="about-shell about-purpose-grid">
          <article className="about-purpose-card about-purpose-card-dark">
            <p className="section-label about-label-light">MISIÓN</p>
            <h2>Mejor asesoría comienza con mejores profesionales</h2>
            <p>
              Profesionalizar la asesoría inmobiliaria mediante personas mejor preparadas,
              procesos claros, análisis, tecnología y acompañamiento responsable, para ayudar a
              propietarios, compradores e inversionistas a tomar mejores decisiones inmobiliarias.
            </p>
          </article>

          <article className="about-purpose-card">
            <p className="section-label">VISIÓN</p>
            <h2>Elevar el estándar inmobiliario en Nuevo León</h2>
            <p>
              Construir una empresa referente por la preparación de sus asesores, la calidad de
              sus procesos, el uso responsable de tecnología y la confianza de sus clientes,
              contribuyendo a elevar el estándar de la asesoría inmobiliaria en Nuevo León.
            </p>
          </article>
        </div>
      </section>

      <section className="about-pillars">
        <div className="about-shell">
          <div className="about-section-heading">
            <p className="section-label">CÓMO ENTENDEMOS LA PROFESIONALIZACIÓN</p>
            <h2>Cinco pilares que guían nuestra forma de trabajar</h2>
          </div>

          <div className="about-pillars-grid">
            {pillars.map((pillar) => (
              <article className="about-pillar-card" key={pillar.title}>
                <span>{pillar.number}</span>
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-process-section">
        <div className="about-shell">
          <div className="about-section-heading about-section-heading-centered">
            <p className="section-label">UN MÉTODO, DIFERENTES OPERACIONES</p>
            <h2>Cómo trabaja Rednorte</h2>
            <p>
              Cada servicio tiene particularidades, pero nuestra forma de abordar una operación
              parte de la misma lógica.
            </p>
          </div>

          <div className="about-process-grid">
            {process.map((step) => (
              <article className="about-process-card" key={step.title}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="about-culture-tech">
        <div className="about-shell about-culture-tech-grid">
          <article className="about-culture-card">
            <p className="section-label">PREPARACIÓN CONTINUA</p>
            <h2>La calidad del servicio depende de la preparación de quien asesora</h2>
            <p>
              En Rednorte la capacitación no es una actividad ocasional. Nuestro equipo participa
              en sesiones de formación y coaching todas las semanas, con sesiones adicionales
              cuando la operación o el mercado lo requieren.
            </p>
            <p>
              Buscamos que los asesores entiendan mejor el mercado, hagan mejores preguntas,
              analicen información, documenten correctamente las operaciones y puedan explicar con
              claridad las alternativas que tiene cada cliente.
            </p>
            <Link href="/trabaja-con-nosotros" className="about-inline-link">
              ¿Quieres formar parte de Rednorte? →
            </Link>
          </article>

          <article className="about-tech-card">
            <p className="section-label about-label-light">TECNOLOGÍA APLICADA</p>
            <h2>Herramientas construidas alrededor de nuestra operación</h2>
            <p>
              La tecnología nos ayuda a procesar información, organizar inventario, analizar
              propiedades y mejorar el seguimiento. No sustituye el criterio ni la responsabilidad
              del asesor: los complementa.
            </p>
            <ul>
              {technology.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <div className="about-tech-links">
              <Link href="/herramientas/estimacion-de-valor">Estimación de valor →</Link>
              <Link href="/herramientas/reporte-de-vendibilidad">Reporte de vendibilidad →</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="about-ecosystem">
        <div className="about-shell">
          <div className="about-section-heading">
            <p className="section-label">ECOSISTEMA REDNORTE</p>
            <h2>Especialistas y aliados alrededor de una operación inmobiliaria</h2>
            <p>
              No pretendemos resolver todas las especialidades dentro de una sola empresa.
              Coordinamos con empresas y profesionales que complementan nuestro trabajo cuando una
              operación lo necesita.
            </p>
          </div>

          <div className="about-ecosystem-grid">
            {ecosystem.map((item) => (
              <EcosystemCard item={item} key={item.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="about-founder">
        <div className="about-shell about-founder-grid">
          <div className="about-founder-media">
            <Image
              src="/equipo/roque-avila.jpg"
              alt="Roque Ávila, fundador y presidente de Rednorte Inmobiliaria"
              width={1024}
              height={1024}
              sizes="(max-width: 800px) 100vw, 42vw"
            />
          </div>

          <div className="about-founder-copy">
            <p className="section-label">FUNDADOR</p>
            <h2>Roque Ávila</h2>
            <h3>Fundador y Presidente de Rednorte</h3>
            <p>
              Roque Ávila se dedica al sector inmobiliario desde 2017 y fundó Rednorte en enero de
              2018 con el objetivo de elevar el nivel de profesionalización de la asesoría
              inmobiliaria.
            </p>
            <p>
              Antes de Rednorte tuvo su primera experiencia profesional en Estados Unidos dentro
              del sector de servicios financieros, comercializando seguros, servicios legales
              prepagados e inversiones bajo esquemas que requerían capacitación y licencias para
              cada producto. Esa experiencia influyó en la manera en que concibió la preparación y
              responsabilidad profesional dentro de Rednorte.
            </p>
            <p>
              Ha estudiado en Brigham Young University–Idaho y la Universidad del Valle de México.
              También es fundador de Ávalo, Legalbit y Vinkia.
            </p>
            <div className="about-founder-actions">
              <a
                className="about-btn about-btn-outline"
                href="https://www.linkedin.com/in/roqueavila/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver LinkedIn
              </a>
              <Link className="about-inline-link" href="/equipo/roque-avila">
                Conocer a Roque Ávila →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="about-local">
        <div className="about-shell about-local-card">
          <div>
            <p className="section-label about-label-light">ORGULLOSAMENTE REGIOMONTANOS</p>
            <h2>Nacimos en Monterrey. Conocemos Nuevo León.</h2>
            <p>
              Trabajamos en todo el estado y mantenemos una presencia especialmente fuerte en
              Monterrey y su área metropolitana. Nuestro conocimiento local se complementa con una
              red de colaboración que nos permite atender operaciones residenciales, comerciales e
              industriales.
            </p>
          </div>

          <dl className="about-company-facts">
            <div>
              <dt>Nombre comercial</dt>
              <dd>Rednorte Inmobiliaria</dd>
            </div>
            <div>
              <dt>Razón social</dt>
              <dd>Red de Administración y Compraventa, S.A. de C.V.</dd>
            </div>
            <div>
              <dt>Fundación</dt>
              <dd>Enero de 2018</dd>
            </div>
            <div>
              <dt>Sede</dt>
              <dd>
                Av. José Vasconcelos Ote. 215-7, Residencial San Agustín 1er Sector, San Pedro
                Garza García, N.L. 66260
              </dd>
            </div>
            <div>
              <dt>Cobertura</dt>
              <dd>Nuevo León</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="about-final-cta">
        <div className="about-shell about-final-card">
          <div>
            <p className="section-label about-label-light">SIGUIENTE PASO</p>
            <h2>¿En qué podemos ayudarte?</h2>
            <p>
              Explora nuestros servicios, conoce las propiedades disponibles o habla con nuestro
              equipo para identificar el siguiente paso adecuado para tu operación.
            </p>
          </div>
          <div className="about-final-actions">
            <Link className="about-btn about-btn-primary" href="/servicios">
              Vender o rentar una propiedad
            </Link>
            <Link className="about-btn about-btn-secondary" href="/servicios/comprar-propiedad">
              Comprar o invertir
            </Link>
            <Link className="about-inline-link about-inline-link-light" href="/equipo">
              Conocer al equipo →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
