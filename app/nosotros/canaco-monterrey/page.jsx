import Image from 'next/image';
import Link from 'next/link';
import Breadcrumb from '@/components/Breadcrumb';
import { serializeJsonLd } from '@/lib/security';

const CANACO_WELCOME_POST =
  'https://es.linkedin.com/posts/canacoservyturmonterrey_canacomonterrey-bienvenido-nuevosocio-activity-7496287677856768001-SoWw';

export const metadata = {
  title: 'Socio de CANACO Monterrey',
  description:
    'Rednorte Inmobiliaria forma parte de CANACO SERVYTUR Monterrey desde 2026. Conoce qué representa esta membresía para nuestra profesionalización, vinculación empresarial y participación en Nuevo León.',
  alternates: { canonical: '/nosotros/canaco-monterrey' },
  openGraph: {
    title: 'Rednorte Inmobiliaria, socio de CANACO Monterrey',
    description:
      'Rednorte se incorporó a CANACO SERVYTUR Monterrey en 2026 como parte de su estrategia de profesionalización y vinculación empresarial.',
    url: '/nosotros/canaco-monterrey',
    type: 'website',
    images: [{
      url: '/images/canaco/bienvenida-rednorte-canaco.jpeg',
      alt: 'CANACO SERVYTUR Monterrey da la bienvenida a Rednorte Inmobiliaria como nuevo socio',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rednorte Inmobiliaria, socio de CANACO Monterrey',
    description:
      'Rednorte se incorporó a CANACO SERVYTUR Monterrey en 2026 como parte de su estrategia de profesionalización y vinculación empresarial.',
    images: ['/images/canaco/bienvenida-rednorte-canaco.jpeg'],
  },
};

const facts = [
  ['Ingreso a CANACO Monterrey', '2026'],
  ['Fecha del certificado de socio', '10 de julio de 2026'],
  ['Giro reconocido por CANACO', 'Servicios inmobiliarios / Bienes raíces'],
  ['Cobertura principal de Rednorte', 'Monterrey y Nuevo León'],
];

const values = [
  ['Profesionalización empresarial',
   'La incorporación forma parte de una visión de Rednorte que busca fortalecer procesos, preparación, estructura y gobierno empresarial, además de la actividad comercial inmobiliaria.'],
  ['Vinculación con otros sectores',
   'CANACO reúne empresas de comercio, servicios y turismo. Para Rednorte, participar en esta comunidad permite aprender de otros giros y construir relaciones más allá del sector inmobiliario.'],
  ['Participación en la comunidad empresarial',
   'La membresía abre espacios para capacitación, networking, representación empresarial y colaboración con empresas y líderes de Nuevo León.'],
  ['Aportar, no solamente pertenecer',
   'El objetivo de Rednorte no es utilizar la membresía únicamente como distintivo, sino participar, aprender y sumar valor dentro de la comunidad empresarial.'],
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': 'https://www.rednorte.mx/nosotros/canaco-monterrey#webpage',
      url: 'https://www.rednorte.mx/nosotros/canaco-monterrey',
      name: 'Rednorte Inmobiliaria, socio de CANACO Monterrey',
      description:
        'Información sobre la incorporación de Rednorte Inmobiliaria a CANACO SERVYTUR Monterrey en 2026.',
      inLanguage: 'es-MX',
      datePublished: '2026-09-14',
      dateModified: '2026-09-14',
      about: { '@id': 'https://www.rednorte.mx/#organization' },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: 'https://www.rednorte.mx/images/canaco/bienvenida-rednorte-canaco.jpeg',
        width: 1280,
        height: 1600,
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://www.rednorte.mx/#organization',
      name: 'Rednorte Inmobiliaria',
      legalName: 'Red de Administración y Compraventa, S.A. de C.V.',
      url: 'https://www.rednorte.mx/',
      memberOf: {
        '@type': 'Organization',
        '@id': 'https://canaco.net/#organization',
        name: 'CANACO SERVYTUR Monterrey',
        url: 'https://canaco.net/',
      },
    },
    {
      '@type': 'Organization',
      '@id': 'https://canaco.net/#organization',
      name: 'CANACO SERVYTUR Monterrey',
      alternateName: 'Cámara Nacional de Comercio, Servicios y Turismo de Monterrey',
      url: 'https://canaco.net/',
      areaServed: { '@type': 'AdministrativeArea', name: 'Nuevo León' },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Inicio', item: 'https://www.rednorte.mx/' },
        { '@type': 'ListItem', position: 2, name: 'Nosotros', item: 'https://www.rednorte.mx/nosotros' },
        { '@type': 'ListItem', position: 3, name: 'CANACO Monterrey', item: 'https://www.rednorte.mx/nosotros/canaco-monterrey' },
      ],
    },
  ],
};

export default function RednorteCanacoPage() {
  return (
    <div className="canaco-page">
      <Breadcrumb items={[{ label: 'Nosotros', href: '/nosotros' }, { label: 'CANACO Monterrey' }]} />

      <section className="canaco-hero">
        <div className="canaco-shell canaco-hero-grid">
          <div>
            <p className="canaco-eyebrow">VINCULACIÓN EMPRESARIAL</p>
            <h1>Rednorte Inmobiliaria, socio de CANACO Monterrey</h1>
            <p className="canaco-lead">
              Rednorte Inmobiliaria forma parte de CANACO SERVYTUR Monterrey desde 2026 como parte
              de su estrategia de profesionalización, vinculación empresarial y participación
              activa en la comunidad de negocios de Nuevo León.
            </p>
            <div className="canaco-actions">
              <a className="canaco-btn canaco-btn-primary"
                href={CANACO_WELCOME_POST}
                target="_blank" rel="noopener noreferrer">
                Ver publicación de CANACO
              </a>
              <Link className="canaco-btn canaco-btn-secondary" href="/nosotros">
                Conocer Rednorte
              </Link>
            </div>
          </div>

          <figure className="canaco-hero-media">
            <Image src="/images/canaco/bienvenida-rednorte-canaco.jpeg"
              alt="Publicación de bienvenida de CANACO SERVYTUR Monterrey a Rednorte Inmobiliaria"
              width={1280} height={1600} sizes="(max-width: 900px) calc(100vw - 40px), 42vw"
              priority />
            <figcaption>
              CANACO SERVYTUR Monterrey dio la bienvenida pública a Rednorte como nuevo socio,
              identificando su giro como servicios inmobiliarios / bienes raíces.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="canaco-proof">
        <div className="canaco-shell">
          <div className="canaco-section-heading">
            <p className="canaco-eyebrow">MEMBRESÍA CONFIRMADA</p>
            <h2>Una incorporación institucional, no un claim publicitario</h2>
            <p>
              La relación está respaldada por la publicación pública de bienvenida de CANACO
              Monterrey y por el certificado de socio emitido a la razón social de Rednorte en
              julio de 2026.
            </p>
          </div>
          <div className="canaco-fact-grid">
            {facts.map(([label, value]) => (
              <div className="canaco-fact" key={label}>
                <span>{label}</span><strong>{value}</strong>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="canaco-about">
        <div className="canaco-shell canaco-two-columns">
          <div>
            <p className="canaco-eyebrow">¿QUÉ ES CANACO MONTERREY?</p>
            <h2>Una cámara empresarial con presencia histórica en Nuevo León</h2>
          </div>
          <div>
            <p>
              CANACO SERVYTUR Monterrey es la Cámara Nacional de Comercio, Servicios y Turismo de
              Monterrey. De acuerdo con la propia Cámara, representa y defiende los intereses de
              empresas de los sectores comercio, servicios y turismo en Nuevo León.
            </p>
            <p>
              Su actividad incluye representación empresarial, soluciones para empresas,
              capacitación, comisiones, networking y espacios para generar conexiones entre
              compañías de distintos sectores.
            </p>
            <a className="canaco-text-link" href="https://canaco.net/nosotros-canaco-mty/"
              target="_blank" rel="noopener noreferrer">
              Conocer más sobre CANACO Monterrey →
            </a>
          </div>
        </div>
      </section>

      <section className="canaco-why">
        <div className="canaco-shell">
          <div className="canaco-section-heading canaco-centered">
            <p className="canaco-eyebrow">POR QUÉ REDNORTE SE INCORPORÓ</p>
            <h2>Formar parte de una comunidad empresarial más amplia</h2>
            <p>
              La membresía tiene sentido para Rednorte porque la profesionalización de una
              inmobiliaria no depende solamente de vender o rentar propiedades.
            </p>
          </div>
          <div className="canaco-value-grid">
            {values.map(([title, text]) => (
              <article key={title}><h3>{title}</h3><p>{text}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="canaco-event">
        <div className="canaco-shell">
          <div className="canaco-section-heading">
            <p className="canaco-eyebrow">BIENVENIDA A NUEVOS SOCIOS</p>
            <h2>Participación de Rednorte en el encuentro de bienvenida</h2>
            <p>
              Como parte de la incorporación, Rednorte participó en el encuentro de bienvenida a
              nuevos socios de CANACO Monterrey, un espacio orientado a presentar la comunidad,
              generar conexiones empresariales y formalizar la participación de nuevas empresas.
            </p>
          </div>

          <div className="canaco-gallery">
            <figure className="canaco-gallery-large">
              <div className="canaco-gallery-image">
                <Image src="/images/canaco/compromiso-canaco.webp"
                  alt="Presentación del compromiso de los nuevos socios durante el encuentro de CANACO Monterrey"
                  width={1086} height={1448} sizes="(max-width: 650px) calc(100vw - 32px), (max-width: 900px) calc(100vw - 40px), 62vw" />
              </div>
              <figcaption>Encuentro de bienvenida a nuevos socios de CANACO Monterrey.</figcaption>
            </figure>
            <figure>
              <div className="canaco-gallery-image">
                <Image src="/images/canaco/roque-canaco-evento-01.webp"
                  alt="Roque Ávila durante el encuentro de bienvenida de CANACO Monterrey"
                  width={1086} height={1448} sizes="(max-width: 650px) calc(100vw - 32px), (max-width: 900px) 46vw, 35vw" />
              </div>
              <figcaption>Roque Ávila durante el encuentro de bienvenida.</figcaption>
            </figure>
            <figure>
              <div className="canaco-gallery-image">
              <Image src="/images/canaco/roque-canaco-evento-02.webp"
                alt="Roque Ávila en el evento de nuevos socios de CANACO Monterrey"
                width={1086} height={1448} sizes="(max-width: 650px) calc(100vw - 32px), (max-width: 900px) 46vw, 35vw" />
              </div>
              <figcaption>Participación institucional de Rednorte en el evento de nuevos socios.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="canaco-meaning">
        <div className="canaco-shell canaco-meaning-card">
          <div>
            <p className="canaco-eyebrow canaco-eyebrow-light">QUÉ SIGNIFICA</p>
            <h2>La membresía suma contexto institucional a Rednorte</h2>
            <p>
              Para Rednorte, pertenecer a CANACO Monterrey representa participación en una
              comunidad empresarial, acceso a espacios de aprendizaje y conexión, y una relación
              más cercana con empresas de otros sectores de Nuevo León.
            </p>
          </div>
          <div>
            <p className="canaco-eyebrow canaco-eyebrow-light">QUÉ NO SIGNIFICA</p>
            <ul>
              <li>No significa que CANACO recomiende una operación inmobiliaria específica.</li>
              <li>No sustituye certificaciones profesionales de asesores inmobiliarios.</li>
              <li>No implica que CANACO garantice los servicios o resultados de Rednorte.</li>
              <li>La membresía debe presentarse como afiliación institucional, no como aval comercial.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="canaco-rednorte">
        <div className="canaco-shell canaco-two-columns">
          <div>
            <p className="canaco-eyebrow">REDNORTE EN NUEVO LEÓN</p>
            <h2>Una inmobiliaria regiomontana que busca elevar su estándar empresarial</h2>
          </div>
          <div>
            <p>
              Rednorte Inmobiliaria fue fundada en Monterrey en 2018 y trabaja en compraventa,
              renta, inversión, comercial, industrial y análisis inmobiliario en Nuevo León.
            </p>
            <p>
              La incorporación a CANACO Monterrey forma parte de una estrategia más amplia:
              fortalecer procesos, profesionalizar al equipo, utilizar mejor la tecnología y
              construir relaciones institucionales que aporten al desarrollo de la empresa.
            </p>
            <Link className="canaco-text-link" href="/nosotros">
              Conocer la historia de Rednorte →
            </Link>
          </div>
        </div>
      </section>

      <section className="canaco-sources">
        <div className="canaco-shell">
          <p className="canaco-eyebrow">FUENTES Y EVIDENCIA</p>
          <h2>Información verificable</h2>
          <ul>
            <li>
              <a href={CANACO_WELCOME_POST} target="_blank" rel="noopener noreferrer">
                CANACO SERVYTUR Monterrey — publicación pública de bienvenida a Rednorte
                Inmobiliaria como nuevo socio.
              </a>
            </li>
            <li>
              <a href="https://canaco.net/" target="_blank" rel="noopener noreferrer">
                CANACO Monterrey — información institucional, misión y representación empresarial.
              </a>
            </li>
            <li>
              Certificado de socio CANACO emitido a Red de Administración y Compraventa, S.A. de
              C.V., fechado el 10 de julio de 2026. Documento conservado por Rednorte.
            </li>
          </ul>
          <p className="canaco-source-note">
            El certificado no se publica porque contiene datos internos de afiliación.
          </p>
        </div>
      </section>

      <section className="canaco-final-cta">
        <div className="canaco-shell canaco-final-card">
          <div>
            <p className="canaco-eyebrow canaco-eyebrow-light">CONOCE REDNORTE</p>
            <h2>Procesos, preparación y vinculación empresarial</h2>
            <p>
              Conoce cómo trabaja Rednorte Inmobiliaria y la forma en que estamos construyendo una
              empresa inmobiliaria más profesional en Nuevo León.
            </p>
          </div>
          <div className="canaco-actions">
            <Link className="canaco-btn canaco-btn-primary" href="/nosotros">Conocer Rednorte</Link>
            <Link className="canaco-btn canaco-btn-secondary-light" href="/contacto">Contactarnos</Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(schema) }} />
    </div>
  );
}
