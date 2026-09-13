import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import WhatsAppGateButton from '@/components/WhatsAppGateButton';

export const metadata = {
  title: 'Equipo | Rednorte Inmobiliaria',
  description:
    'Conoce cómo trabaja el equipo de Rednorte Inmobiliaria en Monterrey y Nuevo León: preparación continua, procesos, análisis, tecnología y especialización para venta, renta, compra e inversión.',
  alternates: { canonical: '/equipo' },
  openGraph: {
    title: 'Equipo Rednorte | Inmobiliaria en Monterrey',
    description:
      'Un equipo inmobiliario con una forma común de trabajar: preparación, procesos, análisis, tecnología y acompañamiento.',
    url: '/equipo',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Equipo Rednorte | Inmobiliaria en Monterrey',
    description:
      'Conoce la forma de trabajo y las áreas de especialidad del equipo de Rednorte Inmobiliaria.',
  },
};

const pageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.rednorte.mx/equipo#webpage',
      url: 'https://www.rednorte.mx/equipo',
      name: 'Equipo Rednorte Inmobiliaria',
      description:
        'Página sobre la preparación, especialidades, procesos y forma de trabajo del equipo de Rednorte Inmobiliaria en Monterrey y Nuevo León.',
      about: {
        '@id': 'https://www.rednorte.mx/#organization',
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
          name: 'Equipo',
          item: 'https://www.rednorte.mx/equipo',
        },
      ],
    },
  ],
};

const workPillars = [
  {
    number: '01',
    title: 'Preparación continua',
    text:
      'Capacitación semanal, actualización de mercado y espacios de formación para fortalecer criterio, comunicación, negociación y ejecución.',
  },
  {
    number: '02',
    title: 'Procesos claros',
    text:
      'La operación se apoya en procesos compartidos para organizar información, seguimiento, documentación, citas, ofertas y cierres.',
  },
  {
    number: '03',
    title: 'Análisis antes de recomendar',
    text:
      'Buscamos entender la necesidad del cliente y revisar información de mercado antes de plantear una estrategia o alternativa.',
  },
  {
    number: '04',
    title: 'Tecnología como apoyo',
    text:
      'CRM, inventario sincronizado, automatización, herramientas propias y análisis de datos ayudan al asesor a trabajar con más información.',
  },
];

const specialties = [
  {
    title: 'Venta de propiedades',
    href: '/servicios/vender-propiedad',
    text: 'Estrategia de precio, comercialización, seguimiento, negociación y cierre.',
  },
  {
    title: 'Renta de propiedades',
    href: '/servicios/rentar-propiedad',
    text: 'Promoción, perfilamiento, investigación, negociación y formalización.',
  },
  {
    title: 'Compra de propiedades',
    href: '/servicios/comprar-propiedad',
    text: 'Búsqueda, comparación de alternativas, negociación y acompañamiento.',
  },
  {
    title: 'Inversión y preventas',
    href: '/servicios/inversion-inmobiliaria',
    text: 'Análisis de objetivos, escenarios, proyectos y alternativas de inversión.',
  },
  {
    title: 'Inmobiliaria comercial',
    href: '/servicios/inmobiliaria-comercial',
    text: 'Locales, oficinas, consultorios, edificios, terrenos y activos comerciales.',
  },
  {
    title: 'Inmobiliaria industrial',
    href: '/servicios/inmobiliaria-industrial',
    text: 'Naves, bodegas, terrenos, patios, parques y operaciones industriales.',
  },
];

const assignmentSteps = [
  {
    number: '01',
    title: 'Entendemos tu necesidad',
    text:
      'Primero identificamos qué buscas, qué tipo de operación es y cuáles son las variables importantes para ti.',
  },
  {
    number: '02',
    title: 'Identificamos el perfil adecuado',
    text:
      'La atención puede canalizarse con base en experiencia, especialidad, zona, idioma y características de la operación.',
  },
  {
    number: '03',
    title: 'El asesor trabaja con respaldo',
    text:
      'Cada operación puede apoyarse en coordinación, procesos, herramientas, aliados y recursos de Rednorte.',
  },
  {
    number: '04',
    title: 'Damos seguimiento',
    text:
      'Buscamos que la información, las citas, las ofertas y los siguientes pasos mantengan continuidad hasta concluir la operación.',
  },
];

export default function EquipoPage() {
  return (
    <div className="page-content team-interim-page">
      <Breadcrumb items={[{ label: 'Equipo' }]} />

      <section className="team-interim-hero">
        <div className="team-shell team-interim-hero-grid">
          <div>
            <p className="section-label team-label-light">EQUIPO REDNORTE</p>
            <h1>Un equipo inmobiliario con una forma común de trabajar</h1>
            <p className="team-interim-lead">
              En Rednorte reunimos profesionales inmobiliarios que trabajan con una misma base:
              preparación continua, procesos claros, análisis, tecnología y responsabilidad hacia
              el cliente.
            </p>
            <div className="team-hero-actions">
              <Link className="team-btn team-btn-primary" href="/contacto">
                Encontrar al asesor adecuado
              </Link>
              <Link className="team-btn team-btn-secondary" href="/nosotros">
                Conocer Rednorte
              </Link>
            </div>
          </div>

          <div className="team-interim-hero-panel">
            <p className="team-interim-kicker">MONTERREY Y NUEVO LEÓN</p>
            <h2>No todos los clientes necesitan al mismo tipo de asesor</h2>
            <p>
              Una operación residencial, una inversión, una nave industrial o una propiedad
              comercial requieren conversaciones y conocimientos distintos. Nuestro objetivo es
              conectar cada necesidad con el perfil adecuado y respaldarlo con la estructura de
              Rednorte.
            </p>
          </div>
        </div>
      </section>

      <section className="team-interim-principles">
        <div className="team-shell">
          <div className="team-section-heading">
            <p className="section-label">NUESTRA FORMA DE TRABAJAR</p>
            <h2>La calidad del servicio no debe depender de improvisación</h2>
            <p>
              Cada asesor conserva su experiencia y estilo personal, pero trabaja dentro de una
              estructura común que busca elevar la calidad de la asesoría.
            </p>
          </div>

          <div className="team-interim-principles-grid">
            {workPillars.map((item) => (
              <article className="team-interim-principle" key={item.title}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="team-interim-specialties">
        <div className="team-shell">
          <div className="team-section-heading team-section-heading-centered">
            <p className="section-label">ESPECIALIDADES</p>
            <h2>Un equipo para diferentes tipos de operación inmobiliaria</h2>
            <p>
              Rednorte atiende necesidades residenciales, de inversión, comerciales e industriales
              en Monterrey y distintos municipios de Nuevo León.
            </p>
          </div>

          <div className="team-interim-specialty-grid">
            {specialties.map((item) => (
              <Link className="team-interim-specialty-card" href={item.href} key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <span>Conocer servicio →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="team-interim-training">
        <div className="team-shell team-interim-training-grid">
          <div>
            <p className="section-label team-label-light">PREPARACIÓN PROFESIONAL</p>
            <h2>La capacitación forma parte de la operación de Rednorte</h2>
            <p>
              El equipo participa en capacitación general cada semana y los asesores de reciente
              incorporación cuentan con sesiones adicionales para conocer procesos, herramientas y
              criterios de trabajo.
            </p>
          </div>

          <div className="team-interim-training-cards">
            <article>
              <strong>Miércoles</strong>
              <span>Capacitación general del equipo</span>
            </article>
            <article>
              <strong>Viernes</strong>
              <span>Sesiones para asesores nuevos</span>
            </article>
            <article className="is-wide">
              <strong>EC0110.02</strong>
              <span>
                Parte del equipo ha concluido el proceso de certificación en Asesoría en
                Comercialización de Bienes Inmuebles.
              </span>
            </article>
          </div>
        </div>
      </section>

      <section className="team-interim-assignment">
        <div className="team-shell">
          <div className="team-section-heading">
            <p className="section-label">¿QUÉ ASESOR NECESITAS?</p>
            <h2>Primero entendemos la operación; después definimos quién puede ayudarte mejor</h2>
          </div>

          <div className="team-interim-assignment-grid">
            {assignmentSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="team-interim-tools">
        <div className="team-shell">
          <div className="team-section-heading team-section-heading-centered">
            <p className="section-label">RESPALDO DE OPERACIÓN</p>
            <h2>El asesor no trabaja solo</h2>
            <p>
              Dependiendo de la operación, el equipo puede apoyarse en recursos internos y aliados
              especializados para dar continuidad al proceso.
            </p>
          </div>

          <div className="team-interim-tool-grid">
            {[
              'CRM e inventario sincronizado',
              'Análisis de mercado',
              'Coordinación y seguimiento',
              'Herramientas y automatización',
              'Red de colaboración inmobiliaria',
              'Notarías, valuadores y brokers hipotecarios',
            ].map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="team-interim-cta">
        <div className="team-shell team-interim-cta-card">
          <div>
            <p className="section-label team-label-light">HABLEMOS DE TU OPERACIÓN</p>
            <h2>Te ayudamos a encontrar al asesor adecuado dentro de Rednorte</h2>
            <p>
              Cuéntanos si quieres comprar, vender, rentar o invertir y qué tipo de propiedad estás
              buscando. Nuestro equipo puede orientarte hacia el perfil más adecuado.
            </p>
          </div>
          <div className="team-final-actions">
            <Link className="team-btn team-btn-primary" href="/contacto">
              Contactar a Rednorte
            </Link>
            <WhatsAppGateButton className="team-btn team-btn-secondary" source="Equipo">
              WhatsApp
            </WhatsAppGateButton>
          </div>
        </div>
      </section>

      <section className="team-interim-careers">
        <div className="team-shell team-interim-careers-card">
          <div>
            <p className="section-label">CRECE CON REDNORTE</p>
            <h2>¿Quieres desarrollar tu carrera inmobiliaria con nosotros?</h2>
            <p>
              Conoce nuestra forma de trabajo, capacitación y oportunidades para profesionales que
              buscan desarrollarse en bienes raíces.
            </p>
          </div>
          <Link className="team-btn team-btn-outline-dark" href="/trabaja-con-nosotros">
            Trabaja con nosotros
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
    </div>
  );
}
