import Link from 'next/link';
import Image from 'next/image';
import HomeHero from '@/components/HomeHero';
import CuratedProperties from '@/components/CuratedProperties';
import GoogleReviews from '@/components/GoogleReviews';
import FaqHome from '@/components/FaqHome';
import { faqSchema } from '@/lib/schema';
import { fetchAllProperties, toPropertyCardData } from '@/lib/properties';
import { serializeJsonLd } from '@/lib/security';
import { HOME_CURATED_PROPERTY_IDS, SITE_METRICS } from '@/lib/siteConfig';

export const metadata = {
  title: 'Rednorte Inmobiliaria | Propiedades en Monterrey y su Área Metropolitana',
  description: 'Compra, vende, renta o valúa propiedades residenciales, comerciales e industriales con Rednorte Inmobiliaria en Monterrey y Nuevo León.',
  alternates: { canonical: '/' },
};

function propsFilterHref(operacion, tipo, categoria) {
  const params = new URLSearchParams();
  if (operacion) params.set('operacion', operacion);
  if (tipo) params.set('tipo', tipo);
  if (categoria) params.set('categoria', categoria);
  const qs = params.toString();
  return qs ? `/propiedades?${qs}` : '/propiedades';
}

export default async function HomePage() {
  const { properties, source } = await fetchAllProperties();
  const homeMetrics = {
    ...SITE_METRICS,
    activeProperties: source === 'live'
      ? String(properties.length)
      : SITE_METRICS.activeProperties,
  };

  let featured = [];
  if (HOME_CURATED_PROPERTY_IDS.length >= 3) {
    const propertyMap = new Map(properties.map((property) => [String(property.id).toUpperCase(), property]));
    featured = HOME_CURATED_PROPERTY_IDS
      .map((id) => propertyMap.get(String(id).toUpperCase()))
      .filter((property) => property?.imgs?.length)
      .map((property) => toPropertyCardData(property, 1));
  }

  return (
    <main className="page-content home-refresh">
      {/* HERO */}
      <HomeHero metrics={homeMetrics} />

      {featured.length >= 3 && (
        <section className="home-featured" aria-labelledby="home-curated-title">
          <div className="container">
            <div className="home-section-intro">
              <div>
                <p className="section-label">Curaduría inmobiliaria</p>
                <h2 className="section-title" id="home-curated-title">Selección Rednorte</h2>
              </div>
              <div className="home-section-intro-copy">
                <p>Propiedades elegidas por su arquitectura, ubicación, fotografía y carácter.</p>
                <Link className="home-text-link" href="/propiedades">Explorar todo el inventario ↗</Link>
              </div>
            </div>
            <CuratedProperties properties={featured} />
          </div>
        </section>
      )}

      {/* CATEGORÍAS */}
      <section className="home-categories">
        <div className="container">
          <div className="home-section-intro">
            <div>
              <p className="section-label">Nuestro inventario</p>
              <h2 className="section-title">¿Qué tipo de propiedad buscas?</h2>
            </div>
            <div className="home-section-intro-copy">
              <p>Explora propiedades residenciales, comerciales e industriales en Monterrey y Nuevo León.</p>
              <Link className="home-text-link" href="/propiedades">Ver todas las propiedades ↗</Link>
            </div>
          </div>
          <div className="cats-grid">
            <Link className="cat-card" href={propsFilterHref('', '', 'Residencial')}>
              <div className="cat-icon"></div>
              <div className="cat-title">Residencial</div>
              <div className="cat-desc">Casas y departamentos en las mejores zonas de Nuevo León</div>
              <div className="cat-count">Ver propiedades</div>
            </Link>
            <Link className="cat-card" href={propsFilterHref('', '', 'Comercial')}>
              <div className="cat-icon"></div>
              <div className="cat-title">Comercial</div>
              <div className="cat-desc">Locales, oficinas y espacios comerciales estratégicos</div>
              <div className="cat-count">Ver propiedades</div>
            </Link>
            <Link className="cat-card" href={propsFilterHref('', '', 'Industrial')}>
              <div className="cat-icon"></div>
              <div className="cat-title">Industrial</div>
              <div className="cat-desc">Bodegas, naves y parques industriales en Nuevo León</div>
              <div className="cat-count">Ver propiedades</div>
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICIOS */}
      <section className="services-mini">
        <div className="container">
          <div className="home-section-intro home-section-intro--dark">
            <div>
              <p className="section-label">Servicios inmobiliarios</p>
              <h2 className="section-title">¿Cómo podemos ayudarte?</h2>
            </div>
            <div className="home-section-intro-copy">
              <p>Soluciones para comprar, vender, rentar e invertir en bienes raíces en Monterrey y Nuevo León.</p>
              <Link className="home-text-link" href="/servicios">Conocer todos los servicios ↗</Link>
            </div>
          </div>
          {/* Seis tarjetas. Comercial e industrial todavía no tienen página
              propia: mientras llegan apuntan a una página real y relacionada,
              para no dejar el enlace en 404. */}
          <div className="services-grid">
            <Link className="service-block" href="/servicios/vender-propiedad">
              <h3 className="service-name">Vender una propiedad</h3>
              <div className="service-desc">Analizamos el valor, la competencia y las condiciones del inmueble para definir una estrategia de posicionamiento, promoción y negociación hasta el cierre.</div>
              <span className="service-link">Quiero vender mi propiedad →</span>
            </Link>
            <Link className="service-block" href="/servicios/rentar-propiedad">
              <h3 className="service-name">Rentar una propiedad</h3>
              <div className="service-desc">Estimamos la renta, promovemos el inmueble, perfilamos e investigamos prospectos y coordinamos contrato, negociación y entrega.</div>
              <span className="service-link">Quiero rentar mi propiedad →</span>
            </Link>
            <Link className="service-block" href="/servicios/comprar-propiedad">
              <h3 className="service-name">Comprar una propiedad</h3>
              <div className="service-desc">Buscamos en nuestro inventario y en la red inmobiliaria para comparar opciones, negociar condiciones y acompañarte hasta la entrega.</div>
              <span className="service-link">Quiero comprar una propiedad →</span>
            </Link>
            <Link className="service-block" href="/servicios/inversion-inmobiliaria">
              <h3 className="service-name">Inversión inmobiliaria y preventas</h3>
              <div className="service-desc">Primero entendemos qué quieres lograr con tu inversión y después analizamos alternativas según flujo, plusvalía, patrimonio, preventa u otras estrategias.</div>
              <span className="service-link">Quiero analizar una inversión →</span>
            </Link>
            <Link className="service-block" href="/servicios/inmobiliaria-comercial">
              <h3 className="service-name">Inmobiliaria comercial</h3>
              <div className="service-desc">Asesoría para comprar, vender o rentar locales, oficinas, consultorios, edificios y otros espacios comerciales en Nuevo León.</div>
              <span className="service-link">Ver servicio comercial →</span>
            </Link>
            <Link className="service-block" href="/servicios/inmobiliaria-industrial">
              <h3 className="service-name">Inmobiliaria industrial</h3>
              <div className="service-desc">Búsqueda y comercialización de naves, bodegas, terrenos, patios, parques industriales y proyectos build-to-suit.</div>
              <span className="service-link">Ver servicio industrial →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* NOSOTROS MINI */}
      <section className="nosotros-mini">
        <div className="container">
          <div className="nosotros-grid">
            <div className="nosotros-img nosotros-brand-panel" aria-hidden="true">
              <div className="nosotros-brand-heading">
                <span>Rednorte</span>
                <span>Inmobiliaria</span>
              </div>
              <Image className="nosotros-brand-mark" src="/logo.png" alt="" width={940} height={870} />
              <p className="nosotros-brand-statement">Visión local.<br />Decisiones inteligentes.</p>
              <p className="nosotros-brand-disciplines">Residencial · Comercial · Industrial</p>
              <span className="nosotros-image-caption">Monterrey · Nuevo León</span>
            </div>
            <div className="nosotros-text">
              <p className="section-label">Quiénes somos</p>
              <p className="nosotros-since">Desde {SITE_METRICS.since}</p>
              <h2 className="section-title">Conectando personas con propiedades</h2>
              <p className="nosotros-lead">En Rednorte Inmobiliaria somos un equipo de asesores profesionales con profundo conocimiento del mercado de Nuevo León. Trabajamos con integridad, transparencia y resultados.</p>
              <ul className="nosotros-list">
                <li>Especialistas en residencial, comercial e industrial</li>
                <li>Cobertura en los 12 municipios principales de NL</li>
                <li>Red de más de 500 propiedades en inventario activo</li>
                <li>Proceso ágil y acompañamiento hasta el cierre</li>
              </ul>
              <Link className="home-editorial-button" href="/nosotros">Conoce Rednorte ↗</Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESENAS GOOGLE */}
      <GoogleReviews />

      {/* PREGUNTAS FRECUENTES */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqSchema()) }}
      />
      <FaqHome />
    </main>
  );
}
