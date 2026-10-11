import Breadcrumb from '@/components/Breadcrumb';
import CareersForm from '@/components/CareersForm';

// Marked noindex per the migration plan — the vacancy list below is still
// empty, same as the previous version of this page. The spontaneous
// application form IS real content and stays fully functional.
export const metadata = {
  title: 'Trabaja con nosotros | Rednorte Inmobiliaria',
  description:
    'Conoce cómo es trabajar en Rednorte Inmobiliaria y envía tu candidatura para desarrollarte como asesor inmobiliario o integrarte a nuestro equipo en Monterrey.',
  robots: { index: false, follow: false },
  alternates: { canonical: '/trabaja-con-nosotros' },
  openGraph: {
    title: 'Trabaja con nosotros | Rednorte Inmobiliaria',
    description:
      'Capacitación, procesos, tecnología y desarrollo profesional en bienes raíces.',
    url: '/trabaja-con-nosotros',
    type: 'website',
  },
};

const benefits = [
  {
    number: '01',
    title: 'Capacitación continua',
    text:
      'Sesiones semanales y formación adicional para asesores de reciente incorporación.',
  },
  {
    number: '02',
    title: 'Procesos y herramientas',
    text:
      'CRM, inventario, automatización y recursos para organizar mejor la actividad comercial.',
  },
  {
    number: '03',
    title: 'Acompañamiento',
    text:
      'Apoyo operativo y colaboración entre integrantes del equipo durante las operaciones.',
  },
  {
    number: '04',
    title: 'Desarrollo profesional',
    text:
      'Un entorno orientado a fortalecer conocimientos, habilidades comerciales y experiencia inmobiliaria.',
  },
];

const profilePoints = [
  'Responsabilidad y seguimiento de compromisos',
  'Disposición para aprender y aplicar procesos',
  'Comunicación clara y vocación de servicio',
  'Interés real por desarrollarse en bienes raíces',
];

const applicationSteps = [
  {
    number: '01',
    title: 'Comparte tu perfil',
    text: 'Cuéntanos qué área te interesa y por qué quieres integrarte a Rednorte.',
  },
  {
    number: '02',
    title: 'Revisamos la afinidad',
    text: 'Consideramos experiencia, habilidades, objetivos y compatibilidad con nuestra forma de trabajo.',
  },
  {
    number: '03',
    title: 'Te contactamos cuando exista oportunidad',
    text: 'Si surge una posición relacionada con tu perfil, podremos retomar tu candidatura.',
  },
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebPage',
      '@id': 'https://www.rednorte.mx/trabaja-con-nosotros#webpage',
      url: 'https://www.rednorte.mx/trabaja-con-nosotros',
      name: 'Trabaja con nosotros | Rednorte Inmobiliaria',
      about: { '@id': 'https://www.rednorte.mx/#organization' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.rednorte.mx/' },
        { '@type': 'ListItem', position: 2, name: 'Trabaja con nosotros', item: 'https://www.rednorte.mx/trabaja-con-nosotros' },
      ],
    },
  ],
};

export default function TrabajaConNosotrosPage() {
  return (
    <div className="quick-page careers-page">
      <Breadcrumb items={[{ label: 'Trabaja con nosotros' }]} />

      <section className="careers-hero">
        <div className="quick-shell careers-hero-grid">
          <div className="careers-hero-copy">
            <p className="quick-eyebrow">CRECE CON REDNORTE</p>
            <h1>Construye una carrera inmobiliaria con estructura.</h1>
            <p>
              Buscamos personas que quieran aprender, trabajar con procesos y acompañar decisiones
              inmobiliarias con responsabilidad.
            </p>
            <a className="careers-btn careers-btn-primary" href="#candidatura">
              Compartir mi perfil
            </a>
          </div>
          <aside className="careers-hero-note" aria-label="Lo que valoramos en Rednorte">
            <p>LO QUE VALORAMOS</p>
            <ol>
              <li><span>01</span><strong>Compromiso con el cliente</strong></li>
              <li><span>02</span><strong>Aprendizaje continuo</strong></li>
              <li><span>03</span><strong>Disciplina comercial</strong></li>
            </ol>
            <small>La experiencia suma; la actitud, el criterio y el seguimiento también cuentan.</small>
          </aside>
        </div>
      </section>

      <section className="careers-benefits">
        <div className="quick-shell">
          <div className="careers-section-heading">
            <div>
              <p className="quick-eyebrow">REDNORTE COMO EQUIPO</p>
              <h2>Herramientas para hacer mejor el trabajo.</h2>
            </div>
            <p>
              Combinamos formación, tecnología y colaboración para que cada integrante pueda
              desarrollar criterio y ejecutar con orden.
            </p>
          </div>
          <div className="careers-benefit-grid">
            {benefits.map((item) => (
              <article key={item.title}>
                <span>{item.number}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-profile">
        <div className="quick-shell careers-profile-card">
          <div>
            <p className="quick-eyebrow">EL PERFIL</p>
            <h2>No buscamos solamente experiencia.</h2>
            <p>
              La trayectoria en bienes raíces puede ser útil, pero no es el único factor. Nos
              interesa la forma en que una persona aprende, se organiza y responde ante el cliente.
            </p>
          </div>
          <ul>
            {profilePoints.map((point) => <li key={point}>{point}</li>)}
          </ul>
        </div>
      </section>

      <section className="careers-process">
        <div className="quick-shell">
          <div className="careers-section-heading">
            <div>
              <p className="quick-eyebrow">CANDIDATURA ESPONTÁNEA</p>
              <h2>Un proceso simple y transparente.</h2>
            </div>
            <p>
              Aunque hoy no exista una vacante específica, puedes presentarte para futuras
              oportunidades relacionadas con tu perfil.
            </p>
          </div>
          <div className="careers-process-grid">
            {applicationSteps.map((step) => (
              <article key={step.number}>
                <span>{step.number}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="careers-openings" id="candidatura">
        <div className="quick-shell careers-application-grid">
          <div className="careers-application-copy">
            <p className="quick-eyebrow">COMPARTE TU PERFIL</p>
            <h2>Actualmente no tenemos vacantes específicas publicadas.</h2>
            <p>
              Puedes enviarnos tu candidatura espontánea. La revisaremos como referencia para
              futuras oportunidades en asesoría, operaciones, administración o marketing.
            </p>
            <div className="careers-application-note">
              <strong>Antes de enviar</strong>
              <span>Indica el área que te interesa y cuéntanos brevemente qué puedes aportar al equipo.</span>
            </div>
          </div>

          <div className="careers-form-card">
            <p className="careers-form-kicker">CANDIDATURA ESPONTÁNEA</p>
            <h3>Queremos conocerte</h3>
            <p className="careers-form-intro">Completa tus datos y comparte el área en la que te gustaría desarrollarte.</p>
            <CareersForm />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
