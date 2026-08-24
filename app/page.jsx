import Link from 'next/link';
import Image from 'next/image';
import HeroSearch from '@/components/HeroSearch';
import FeaturedCarousel from '@/components/FeaturedCarousel';
import { fetchAllProperties } from '@/lib/properties';

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
  const { properties } = await fetchAllProperties();
  const featured = properties.slice(0, 10);

  return (
    <div className="page-content">
      {/* HERO */}
      <section className="hero">
        <div className="hero-inner">
          <div>
            <div className="hero-badge"> Especialistas inmobiliarios en Monterrey</div>
            <h1>Compra, vende, renta e invierte en Monterrey</h1>
            <p className="hero-highlight" style={{ color: '#f0a882', fontWeight: 600, marginTop: '0.25rem' }}>Residencial, comercial e industrial en Nuevo León.</p>
            <p>Rednorte Inmobiliaria combina asesoría, datos y marketing para ayudarte a tomar mejores decisiones inmobiliarias.</p>
            <div className="hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-num">520+</div>
                <div className="hero-stat-label">Propiedades activas</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">35</div>
                <div className="hero-stat-label">Integrantes en el equipo</div>
              </div>
              <div className="hero-stat">
                <div className="hero-stat-num">Desde 2018</div>
                <div className="hero-stat-label">Operando en Nuevo León</div>
              </div>
            </div>
          </div>
          <HeroSearch />
        </div>
      </section>

      {/* PROPIEDADES DESTACADAS */}
      <section>
        <div className="container">
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 className="section-title">Propiedades destacadas</h2>
            </div>
            <Link style={{ fontSize: '14px', fontWeight: 600, color: 'var(--terracota)', textDecoration: 'none' }} href="/propiedades">Ver todo el inventario →</Link>
          </div>
          <FeaturedCarousel properties={featured} />
        </div>
      </section>

      {/* CATEGORÍAS */}
      <section style={{ background: 'var(--crema-dark)', padding: '3.5rem 0' }}>
        <div className="container">
          <div className="section-header center">
            <p className="section-label">Nuestro inventario</p>
            <h2 className="section-title">¿Qué tipo de propiedad buscas?</h2>
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
          <div className="section-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <p className="section-label" style={{ color: '#e07a4a' }}>Lo que hacemos</p>
              <h2 className="section-title">Nuestros servicios</h2>
              <p className="section-sub">Asesoría integral en bienes raíces residenciales, comerciales e industriales en todo Nuevo León.</p>
            </div>
            <Link style={{ fontSize: '14px', fontWeight: 600, color: 'var(--terracota)', textDecoration: 'none' }} href="/servicios">Ver todos →</Link>
          </div>
          <div className="services-grid">
            <div className="service-block">
              <div className="service-icon"></div>
              <div className="service-name">Venta de propiedades</div>
              <div className="service-desc">Comercializamos tu propiedad con estrategia de marketing digital, valuación profesional y red de compradores activos.</div>
              <Link className="service-link" href="/servicios/vender-propiedad">Más información →</Link>
            </div>
            <div className="service-block">
              <div className="service-icon"></div>
              <div className="service-name">Renta de propiedades</div>
              <div className="service-desc">Encontramos el arrendatario ideal y gestionamos contratos, garantías y administración del arrendamiento.</div>
              <Link className="service-link" href="/servicios/rentar-propiedad">Más información →</Link>
            </div>
            <div className="service-block">
              <div className="service-icon"></div>
              <div className="service-name">Asesoría para inversionistas</div>
              <div className="service-desc">Análisis de mercado, identificación de oportunidades y estrategias de portafolio inmobiliario.</div>
              <Link className="service-link" href="/servicios/inversion-inmobiliaria">Más información →</Link>
            </div>
            <div className="service-block">
              <div className="service-icon"></div>
              <div className="service-name">Propiedades industriales</div>
              <div className="service-desc">Naves industriales, bodegas y parques logísticos en los principales corredores de Nuevo León.</div>
              <Link className="service-link" href="/servicios/comercial-industrial">Más información →</Link>
            </div>
            <div className="service-block">
              <div className="service-icon"></div>
              <div className="service-name">Propiedades comerciales</div>
              <div className="service-desc">Locales en planta baja, pisos de oficinas y espacios mixtos en ubicaciones estratégicas.</div>
              <Link className="service-link" href="/servicios/comercial-industrial">Más información →</Link>
            </div>
            <div className="service-block">
              <div className="service-icon"></div>
              <div className="service-name">Valuación gratuita</div>
              <div className="service-desc">Conoce el valor real de mercado de tu inmueble con nuestro análisis profesional sin costo.</div>
              <Link className="service-link" href="/herramientas/estimacion-de-valor">Solicitar valuación →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* NOSOTROS MINI */}
      <section className="nosotros-mini">
        <div className="container">
          <div className="nosotros-grid">
            <div className="nosotros-img">
              <Image src="/equipo.jpg" alt="Equipo Rednorte Inmobiliaria" width={800} height={600} style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '16px' }} />
            </div>
            <div className="nosotros-text">
              <p className="section-label">Quiénes somos</p>
              <h2 className="section-title">Más de 8 años conectando personas con propiedades</h2>
              <p style={{ fontSize: '14.5px', color: 'var(--cafe)', lineHeight: 1.7, marginBottom: '1rem' }}>En Rednorte Inmobiliaria somos un equipo de asesores profesionales con profundo conocimiento del mercado de Nuevo León. Trabajamos con integridad, transparencia y resultados.</p>
              <ul className="nosotros-list">
                <li>Especialistas en residencial, comercial e industrial</li>
                <li>Cobertura en los 12 municipios principales de NL</li>
                <li>Red de más de 500 propiedades en inventario activo</li>
                <li>Proceso ágil y acompañamiento hasta el cierre</li>
              </ul>
              <Link className="btn-primary" href="/nosotros" style={{ marginTop: '0.5rem', display: 'inline-block', textDecoration: 'none' }}>Conoce al equipo →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* RESENAS GOOGLE */}
      <section style={{ background: 'var(--crema-dark)', padding: '4rem 0' }}>
        <div className="container">
          <div className="section-header center">
            <p className="section-label">Lo que dicen de nosotros</p>
            <h2 className="section-title">Reseñas en Google</h2>
            <p className="section-sub">Con más de 130 opiniones de clientes que confiaron en Rednorte.</p>
          </div>
          <script defer async src="https://cdn.trustindex.io/loader.js?db141467684f733ab946e322bd8"></script>
          <div className="trustindex-widget" data-widget-id="db141467684f733ab946e322bd8"></div>
        </div>
      </section>

      {/* ENLACES RAPIDOS */}
      <section className="quick-links-section">
        <div className="container">
          <div className="section-header center">
            <p className="section-label">Informacion util</p>
            <h2 className="section-title">Tambien puede interesarte</h2>
            <p className="section-sub">Resuelve dudas frecuentes o conoce las oportunidades para unirte al equipo Rednorte.</p>
          </div>
          <div className="quick-links-grid">
            <Link className="quick-link-card" href="/preguntas-frecuentes">
              <span className="quick-link-label">FAQ</span>
              <h3>Preguntas frecuentes</h3>
              <p>Encuentra respuestas rapidas sobre compra, venta, renta, valuaciones y el proceso de asesoria.</p>
              <span className="quick-link-action">Ver FAQ -&gt;</span>
            </Link>
            <Link className="quick-link-card" href="/trabaja-con-nosotros">
              <span className="quick-link-label">Bolsa de trabajo</span>
              <h3>Unete a Rednorte</h3>
              <p>Consulta vacantes y envia tu candidatura para formar parte del equipo inmobiliario.</p>
              <span className="quick-link-action">Ver bolsa de trabajo -&gt;</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
