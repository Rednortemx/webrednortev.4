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
    title: 'Capacitación continua',
    text:
      'Sesiones semanales y formación adicional para asesores de reciente incorporación.',
  },
  {
    title: 'Procesos y herramientas',
    text:
      'CRM, inventario, automatización y recursos para organizar mejor la actividad comercial.',
  },
  {
    title: 'Acompañamiento',
    text:
      'Apoyo operativo y colaboración entre integrantes del equipo durante las operaciones.',
  },
  {
    title: 'Desarrollo profesional',
    text:
      'Un entorno orientado a fortalecer conocimientos, habilidades comerciales y experiencia inmobiliaria.',
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

      <section className="quick-hero quick-hero-centered">
        <div className="quick-shell">
          <p className="quick-eyebrow">ÚNETE AL EQUIPO</p>
          <h1>Trabaja con nosotros</h1>
          <p className="quick-hero-lead">
            Desarrolla tu carrera inmobiliaria dentro de una empresa enfocada en preparación,
            procesos, tecnología y colaboración.
          </p>
        </div>
      </section>

      <section className="careers-benefits">
        <div className="quick-shell">
          <div className="quick-section-heading quick-section-heading-centered">
            <p className="quick-eyebrow">REDNORTE COMO EQUIPO</p>
            <h2>Qué encontrarás en Rednorte</h2>
          </div>
          <div className="careers-benefit-grid">
            {benefits.map((item) => (
              <article key={item.title}>
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
            <p className="quick-eyebrow">ASESORÍA INMOBILIARIA</p>
            <h2>Buscamos responsabilidad, disposición para aprender y compromiso con el cliente</h2>
          </div>
          <p>
            La experiencia previa en bienes raíces puede ser útil, pero no es el único factor que
            consideramos. Nos interesa trabajar con personas dispuestas a prepararse, seguir
            procesos y desarrollarse profesionalmente.
          </p>
        </div>
      </section>

      <section className="careers-openings">
        <div className="quick-shell">
          <div className="quick-section-heading quick-section-heading-centered">
            <p className="quick-eyebrow">OPORTUNIDADES</p>
            <h2>Actualmente no tenemos vacantes específicas publicadas</h2>
            <p>
              Si te interesa integrarte a Rednorte, puedes enviarnos tu candidatura espontánea y la
              conservaremos para futuras oportunidades.
            </p>
          </div>

          <div className="careers-form-card">
            <h3>Enviar candidatura espontánea</h3>
            <CareersForm />
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </div>
  );
}
